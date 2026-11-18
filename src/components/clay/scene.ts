import { MAIN_FRAG, NOISE_FRAG, TRAIL_FRAG, VERT } from "./shaders";

/**
 * Motor do saibro: um campo de altura iluminado, renderizado em WebGL puro.
 * Sem dependências. Renderiza só quando algo muda; parado, não gasta GPU.
 */

export type Layout = {
  /** Cruzamento em T das linhas, em px CSS dentro do canvas. */
  t: { x: number; y: number };
  /** Raio da bola em px. */
  ballR: number;
  /** Largura da linha em px. */
  lineW: number;
  /** x da lateral simples; -1 sem lateral. */
  sideX: number;
  /** y da base da rede (fora da tela, acima). */
  netY: number;
  /** Escala: px por metro. */
  k: number;
};

export type Luz = { modo: "dia" | "noite"; hora: number };

type Prog = { p: WebGLProgram; u: Record<string, WebGLUniformLocation | null> };
type Alvo = { fb: WebGLFramebuffer; tex: WebGLTexture; w: number; h: number };

const TRAIL_SCALE = 0.25;

/** Hora decimal atual em São Paulo. */
export function horaSP(d = new Date()): number {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(d);
  const h = Number(partes.find((x) => x.type === "hour")?.value ?? 17);
  const m = Number(partes.find((x) => x.type === "minute")?.value ?? 0);
  return h + m / 60;
}

export function ehNoite(h: number) {
  return h < 6.3 || h >= 18.6;
}

/**
 * Sol para a quadra no hemisfério sul: nasce a leste (direita), passa ao norte
 * (atrás da rede, no alto da tela) e se põe a oeste. Devolve a direção para o sol.
 */
export function sol(h: number): [number, number, number] {
  const f = Math.min(1, Math.max(0, (h - 6.3) / (18.6 - 6.3)));
  const alto = Math.pow(Math.sin(Math.PI * f), 0.8);
  const el = ((7 + 60 * alto) * Math.PI) / 180;
  // direção das sombras na tela: de manhã para baixo e à esquerda, de tarde para baixo e à direita
  const lado = Math.cos(Math.PI * f) * 0.62;
  const dx = -lado;
  const dy = Math.sqrt(1 - lado * lado);
  const c = Math.cos(el);
  return [-dx * c, -dy * c, Math.sin(el)];
}

/** Cor do sol pela hora: frio de manhã, neutro ao meio-dia, dourado no fim da tarde. */
function corDoSol(h: number): [number, number, number] {
  const f = Math.min(1, Math.max(0, (h - 6.3) / (18.6 - 6.3)));
  const baixo = 1 - Math.sin(Math.PI * f);
  return [1.0 + 0.1 * baixo, 0.92 - 0.12 * baixo, 0.82 - 0.3 * baixo];
}

export class ClayScene {
  private gl: WebGLRenderingContext;
  private canvas: HTMLCanvasElement;
  private main!: Prog;
  private trailP!: Prog;
  private buf!: WebGLBuffer;
  private noise!: WebGLTexture;
  private trails: [Alvo, Alvo] | null = null;
  private dpr = 1;
  private w = 1;
  private h = 1;
  private layout: Layout = { t: { x: 600, y: 600 }, ballR: 24, lineW: 18, sideX: -1, netY: -400, k: 400 };
  private luz: Luz = { modo: "dia", hora: 17 };
  private raf = 0;
  private visivel = true;
  private t0 = performance.now();
  private ultimo = performance.now();
  private parado = false;
  private perdido = false;
  /** Chamado se o navegador derrubar o contexto WebGL (pouca memória, troca de app). */
  onPerda?: () => void;
  private aoPerder = (e: Event) => {
    e.preventDefault();
    this.perdido = true;
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    if (!this.parado) this.onPerda?.();
  };

  // estado vivo
  private mouse = { x: -9999, y: -9999, e: 0, px: -9999, py: -9999, ativo: false };
  private stampA = { x: -9999, y: -9999 };
  private stampB = { x: -9999, y: -9999 };
  private stampForca = 0;
  private sweep = -1;
  private semMexer = 0;
  private marcas = 0;
  private bola = { z: 0, vz: 0, spin: [0.4, 0.2, 0.9] as [number, number, number], vs: 0 };
  private onda = { x: 0, y: 0, t: 99, a: 0 };
  private intro = 1;
  private desenho = 1;
  private grain = 0.035;

  /** Chamado quando a bola toca o chão (para som ou haptics no futuro). */
  onQuique?: (forca: number) => void;

  /** Só liga com GPU: em renderização por software o saibro pesaria na CPU do aparelho. */
  static suportado(software = false): boolean {
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl", { failIfMajorPerformanceCaveat: !software });
      if (!gl) return false;
      if (software) return true;
      // alguns navegadores entregam WebGL por software sem acusar o "caveat"
      const info = gl.getExtension("WEBGL_debug_renderer_info");
      const nome = String(gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER));
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      return !/swiftshader|llvmpipe|softpipe|software|basic render/i.test(nome);
    } catch {
      return false;
    }
  }

  constructor(canvas: HTMLCanvasElement, opts: { dprMax?: number; escala?: number; software?: boolean } = {}) {
    this.canvas = canvas;
    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: Boolean(opts.software),
      powerPreference: "high-performance",
      failIfMajorPerformanceCaveat: !opts.software,
    });
    if (!gl) throw new Error("WebGL indisponível");
    this.gl = gl;
    canvas.addEventListener("webglcontextlost", this.aoPerder);
    const escala = opts.escala ?? 1;
    this.dpr = Math.min(window.devicePixelRatio || 1, opts.dprMax ?? 1.5) * escala;
    this.init();
  }

  private compila(tipo: number, src: string) {
    const gl = this.gl;
    const s = gl.createShader(tipo)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      throw new Error("shader: " + gl.getShaderInfoLog(s));
    }
    return s;
  }

  private programa(frag: string, nomes: string[]): Prog {
    const gl = this.gl;
    const p = gl.createProgram()!;
    gl.attachShader(p, this.compila(gl.VERTEX_SHADER, VERT));
    gl.attachShader(p, this.compila(gl.FRAGMENT_SHADER, frag));
    gl.bindAttribLocation(p, 0, "aPos");
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error("link: " + gl.getProgramInfoLog(p));
    const u: Prog["u"] = {};
    for (const n of nomes) u[n] = gl.getUniformLocation(p, n);
    return { p, u };
  }

  private alvo(w: number, h: number, repetir = false): Alvo {
    const gl = this.gl;
    const tex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    const wrap = repetir ? gl.REPEAT : gl.CLAMP_TO_EDGE;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap);
    const fb = gl.createFramebuffer()!;
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return { fb, tex, w, h };
  }

  private init() {
    const gl = this.gl;
    this.buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    // textura de ruído: gerada uma vez na GPU
    const np = this.programa(NOISE_FRAG, []);
    const n = this.alvo(512, 512, true);
    gl.bindFramebuffer(gl.FRAMEBUFFER, n.fb);
    gl.viewport(0, 0, 512, 512);
    gl.useProgram(np.p);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, n.tex);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    this.noise = n.tex;

    this.trailP = this.programa(TRAIL_FRAG, ["uPrev", "uRes", "uA", "uB", "uR", "uStrength", "uSweep"]);
    this.main = this.programa(MAIN_FRAG, [
      "uRes", "uNoise", "uTrail", "uTime", "uLineW", "uT", "uDraw", "uSideX", "uNetY", "uNetH", "uMesh",
      "uSun", "uSunCol", "uAmb", "uNight", "uL0", "uL1", "uL2", "uL3", "uBall", "uSpin", "uMouse", "uRipple",
      "uIntro", "uGrain",
    ]);
  }

  /** Ajusta o tamanho do canvas ao elemento (px CSS). */
  resize(w: number, h: number) {
    w = Math.max(1, Math.round(w));
    h = Math.max(1, Math.round(h));
    // mesmo tamanho: nada a refazer (e o rastro do cursor continua)
    if (this.trails && w === this.w && h === this.h) return;
    this.w = w;
    this.h = h;
    this.canvas.width = Math.round(this.w * this.dpr);
    this.canvas.height = Math.round(this.h * this.dpr);
    const tw = Math.max(8, Math.round(this.w * TRAIL_SCALE));
    const th = Math.max(8, Math.round(this.h * TRAIL_SCALE));
    // libera as texturas do tamanho anterior antes de criar as novas
    for (const t of this.trails ?? []) {
      this.gl.deleteFramebuffer(t.fb);
      this.gl.deleteTexture(t.tex);
    }
    this.trails = [this.alvo(tw, th), this.alvo(tw, th)];
    for (const t of this.trails) {
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, t.fb);
      this.gl.clearColor(0, 0, 0, 1);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    this.pede();
  }

  setLayout(l: Layout) {
    this.layout = l;
    this.pede();
  }

  setLuz(l: Luz) {
    this.luz = l;
    this.pede();
  }

  /** Entrada: a luz chega, as linhas se desenham, a bola cai e quica. */
  entrada() {
    this.intro = 0;
    this.desenho = 0;
    this.bola.z = 620;
    this.bola.vz = 0;
    this.bola.vs = 6;
    this.pede();
  }

  /** Estado final sem animação (movimento reduzido, still). */
  repouso() {
    this.intro = 1;
    this.desenho = 1;
    this.bola.z = 0;
    this.bola.vz = 0;
    this.pede();
  }

  ponteiro(x: number, y: number) {
    const m = this.mouse;
    if (!m.ativo) {
      m.px = x;
      m.py = y;
      m.x = x;
      m.y = y;
      m.ativo = true;
    }
    const v = Math.hypot(x - m.px, y - m.py);
    m.px = x;
    m.py = y;
    m.e = Math.min(1, m.e + v / 320);
    this.stampA = { ...this.stampB.x < -9000 ? { x, y } : this.stampB };
    this.stampB = { x, y };
    this.stampForca = Math.min(0.55, v / 90);
    this.semMexer = 0;
    this.sweep = -1;
    this.pede();
  }

  saiu() {
    this.mouse.ativo = false;
    this.stampB = { x: -9999, y: -9999 };
  }

  /** Clique na bola: ela sobe e quica. */
  quica() {
    this.bola.vz = Math.max(this.bola.vz, 0) + 1500;
    this.bola.vs = 9;
    this.pede();
  }

  /** Passa o vassourão já. */
  varrer() {
    if (this.marcas > 0.01) this.sweep = 0;
    this.pede();
  }

  setVisivel(v: boolean) {
    this.visivel = v;
    if (v) this.pede();
  }

  pede() {
    if (this.parado || this.perdido || this.raf || !this.visivel) return;
    this.raf = requestAnimationFrame((t) => this.quadro(t));
  }

  destruir() {
    this.parado = true;
    this.canvas.removeEventListener("webglcontextlost", this.aoPerder);
    cancelAnimationFrame(this.raf);
    const ext = this.gl.getExtension("WEBGL_lose_context");
    ext?.loseContext();
  }

  private passo(dt: number): boolean {
    let vivo = false;
    // entrada
    if (this.intro < 1) {
      this.intro = Math.min(1, this.intro + dt / 1.1);
      vivo = true;
    }
    if (this.desenho < 1) {
      this.desenho = Math.min(1, this.desenho + dt / 1.6);
      vivo = true;
    }
    // energia do amassado decai: o saibro volta a ficar liso
    if (this.mouse.e > 0.002) {
      this.mouse.e *= Math.pow(0.12, dt);
      vivo = true;
    } else this.mouse.e = 0;
    // marcas e vassourão
    if (this.stampForca > 0.001) {
      this.marcas = Math.min(1, this.marcas + this.stampForca * 0.2);
      vivo = true;
    }
    this.semMexer += dt;
    if (this.sweep < 0 && this.marcas > 0.05 && this.semMexer > 3.2) this.sweep = 0;
    if (this.sweep >= 0) {
      this.sweep += dt * 0.75;
      vivo = true;
      if (this.sweep > 1.25) {
        this.sweep = -1;
        this.marcas = 0;
      }
    }
    // física da bola
    const b = this.bola;
    if (b.z > 0 || b.vz !== 0) {
      b.vz -= 3400 * dt;
      b.z += b.vz * dt;
      if (b.z <= 0) {
        b.z = 0;
        const forca = Math.abs(b.vz);
        if (forca > 140) {
          b.vz = forca * 0.56;
          this.onda = { x: this.layout.t.x, y: this.layout.t.y, t: 0, a: Math.min(1.2, forca / 1600) };
          this.onQuique?.(forca);
        } else b.vz = 0;
      }
      vivo = true;
    }
    if (b.vs > 0.01) {
      b.spin[0] += b.vs * dt * 0.6;
      b.spin[2] += b.vs * dt * 0.35;
      b.vs *= Math.pow(0.25, dt);
      vivo = true;
    }
    if (this.onda.t < 3.5) {
      this.onda.t += dt;
      vivo = true;
    }
    return vivo;
  }

  private quadro(agora: number) {
    this.raf = 0;
    if (this.parado) return;
    const dt = Math.min(0.05, (agora - this.ultimo) / 1000);
    this.ultimo = agora;
    const vivo = this.passo(dt);
    this.desenha((agora - this.t0) / 1000);
    if (vivo) this.pede();
  }

  /** Desenha um quadro (também usado para gerar imagens paradas). */
  desenha(tempo = 0) {
    const gl = this.gl;
    if (!this.trails) return;
    // 1) rastro
    const [a, b] = this.trails;
    gl.bindFramebuffer(gl.FRAMEBUFFER, b.fb);
    gl.viewport(0, 0, b.w, b.h);
    gl.useProgram(this.trailP.p);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, a.tex);
    const u = this.trailP.u;
    gl.uniform1i(u.uPrev, 0);
    gl.uniform2f(u.uRes, this.w, this.h);
    gl.uniform2f(u.uA, this.stampA.x, this.stampA.y);
    gl.uniform2f(u.uB, this.stampB.x, this.stampB.y);
    gl.uniform1f(u.uR, Math.max(16, this.layout.lineW * 1.2));
    gl.uniform1f(u.uStrength, this.stampForca);
    gl.uniform1f(u.uSweep, this.sweep < 0 ? -1 : this.sweep * (this.w + 200) - 100);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    this.trails = [b, a];
    this.stampForca = 0;
    this.stampA = { ...this.stampB };

    // 2) saibro
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    const m = this.main;
    gl.useProgram(m.p);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.noise);
    gl.uniform1i(m.u.uNoise, 0);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, b.tex);
    gl.uniform1i(m.u.uTrail, 1);

    const L = this.layout;
    gl.uniform2f(m.u.uRes, this.w, this.h);
    gl.uniform1f(m.u.uTime, tempo);
    gl.uniform1f(m.u.uLineW, L.lineW);
    gl.uniform2f(m.u.uT, L.t.x, L.t.y);
    gl.uniform1f(m.u.uDraw, this.desenho);
    gl.uniform1f(m.u.uSideX, L.sideX);
    gl.uniform1f(m.u.uNetY, L.netY);
    gl.uniform1f(m.u.uNetH, 0.95 * L.k);
    gl.uniform1f(m.u.uMesh, 0.075 * L.k);

    const noite = this.luz.modo === "noite";
    const hs = noite ? 17.5 : this.luz.hora;
    const s = sol(hs);
    gl.uniform3f(m.u.uSun, s[0], s[1], s[2]);
    const c = corDoSol(hs);
    gl.uniform3f(m.u.uSunCol, c[0] * 1.15, c[1] * 1.15, c[2] * 1.15);
    gl.uniform1f(m.u.uNight, noite ? 1 : 0);
    if (noite) gl.uniform3f(m.u.uAmb, 0.012, 0.012, 0.02);
    else gl.uniform3f(m.u.uAmb, 0.22 * c[2] + 0.06, 0.21, 0.24);
    // refletores: perto do quadro e mais baixos que na vida real, para desenhar as poças de luz
    const W = this.w;
    const Hh = this.h;
    gl.uniform4f(m.u.uL0, W * 0.24, Hh * 0.12, 2.2 * L.k, 0.62);
    gl.uniform4f(m.u.uL1, W * 0.84, Hh * 0.02, 2.4 * L.k, 0.52);
    gl.uniform4f(m.u.uL2, W * 0.06, Hh * 1.1, 2.4 * L.k, 0.2);
    gl.uniform4f(m.u.uL3, W * 1.0, Hh * 1.0, 2.6 * L.k, 0.26);

    gl.uniform4f(m.u.uBall, L.t.x, L.t.y, this.bola.z, L.ballR);
    gl.uniform3f(m.u.uSpin, this.bola.spin[0], this.bola.spin[1], this.bola.spin[2]);
    gl.uniform3f(m.u.uMouse, this.mouse.x, this.mouse.y, this.mouse.e);
    if (this.mouse.ativo) {
      this.mouse.x += (this.mouse.px - this.mouse.x) * 0.35;
      this.mouse.y += (this.mouse.py - this.mouse.y) * 0.35;
    }
    gl.uniform4f(m.u.uRipple, this.onda.x, this.onda.y, this.onda.t, this.onda.t < 3.5 ? this.onda.a : 0);
    gl.uniform1f(m.u.uIntro, 1 - Math.pow(1 - this.intro, 3));
    gl.uniform1f(m.u.uGrain, this.grain);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  /** Para gerar imagens paradas: carimba um rastro e um amassado fixos. */
  marcaManual(pontos: { x: number; y: number }[], forca = 0.5) {
    for (let i = 1; i < pontos.length; i++) {
      this.stampA = pontos[i - 1];
      this.stampB = pontos[i];
      this.stampForca = forca;
      this.desenha(0);
    }
  }

  amassado(x: number, y: number, e: number) {
    this.mouse = { x, y, e, px: x, py: y, ativo: false };
  }

  setGrain(g: number) {
    this.grain = g;
  }
}
