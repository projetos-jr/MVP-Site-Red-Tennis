/**
 * Shaders do saibro (GLSL ES 1.0, roda em WebGL1 e WebGL2).
 *
 * Coordenadas: tudo em pixels CSS, origem no canto superior esquerdo,
 * x para a direita, y para baixo, z para cima (altura sobre o piso).
 */

export const VERT = /* glsl */ `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

/** Gera, uma vez, a textura de ruído periódica (512 px) do saibro. */
export const NOISE_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;

float hash(vec2 p, float per) {
  p = mod(p, per);
  p = fract(p * vec2(0.1031, 0.1030));
  p += dot(p, p.yx + 33.33);
  return fract((p.x + p.y) * p.x);
}
float vnoise(vec2 x, float per) {
  vec2 i = floor(x);
  vec2 f = fract(x);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i, per);
  float b = hash(i + vec2(1.0, 0.0), per);
  float c = hash(i + vec2(0.0, 1.0), per);
  float d = hash(i + vec2(1.0, 1.0), per);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 x, float per) {
  float s = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) {
    s += a * vnoise(x, per);
    x *= 2.0; per *= 2.0; a *= 0.5;
  }
  return s;
}
void main() {
  vec2 uv = vUv;
  // R: grão fino (granulado do pó de tijolo)
  float grain = vnoise(uv * 256.0, 256.0) * 0.6 + vnoise(uv * 128.0, 128.0) * 0.4;
  // G: ondulação larga (fbm)
  float broad = fbm(uv * 4.0, 4.0);
  // B: riscos do vassourão (anisotrópico, alongado em x)
  float streak = vnoise(vec2(uv.x * 6.0, uv.y * 180.0), 6.0) * 0.55 + vnoise(vec2(uv.x * 12.0, uv.y * 360.0), 12.0) * 0.45;
  // A: pintas (grãos maiores claros e escuros)
  float sp = hash(floor(uv * 512.0), 512.0);
  gl_FragColor = vec4(grain, broad, streak, sp);
}
`;

/** Atualiza o rastro (marcas de deslize) e passa o vassourão. */
export const TRAIL_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D uPrev;
uniform vec2 uRes;      // tamanho do hero em px CSS
uniform vec2 uA;        // segmento do cursor (px CSS)
uniform vec2 uB;
uniform float uR;       // raio do carimbo
uniform float uStrength;
uniform float uSweep;   // posição do vassourão em px (x) ou -1
void main() {
  vec2 p = vec2(vUv.x, 1.0 - vUv.y) * uRes;
  float prev = texture2D(uPrev, vUv).r;
  vec2 pa = p - uA;
  vec2 ba = uB - uA;
  float h = clamp(dot(pa, ba) / max(dot(ba, ba), 0.001), 0.0, 1.0);
  float d = length(pa - ba * h);
  float s = exp(-d * d / (uR * uR)) * uStrength;
  float v = min(1.0, prev + s * (1.0 - prev));
  if (uSweep > -1.0) {
    // o vassourão anda da esquerda para a direita e deixa o pó liso
    v *= smoothstep(uSweep - 90.0, uSweep, p.x);
  }
  gl_FragColor = vec4(v, v, v, 1.0);
}
`;

export const MAIN_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;

uniform vec2 uRes;
uniform sampler2D uNoise;
uniform sampler2D uTrail;
uniform float uTime;

uniform float uLineW;     // largura da linha (px)
uniform vec2 uT;          // cruzamento em T (px)
uniform float uDraw;      // 0..1 desenho das linhas na entrada
uniform float uSideX;     // x da lateral simples (px) ou -1
uniform float uNetY;      // y da base da rede (px, pode ser negativo)
uniform float uNetH;      // altura da rede (px)
uniform float uMesh;      // tamanho da malha (px)

uniform vec3 uSun;        // direção para o sol (normalizada)
uniform vec3 uSunCol;
uniform vec3 uAmb;
uniform float uNight;     // 0 dia, 1 noite
uniform vec4 uL0;         // refletores: xy px, z altura px, w intensidade
uniform vec4 uL1;
uniform vec4 uL2;
uniform vec4 uL3;

uniform vec4 uBall;       // xy px, z altura px, w raio px
uniform vec3 uSpin;       // rotação da bola (ângulos)
uniform vec3 uMouse;      // xy px, energia 0..1
uniform vec4 uRipple;     // xy px, tempo desde o quique (s), amplitude
uniform float uIntro;     // 0..1 entrada da luz
uniform float uGrain;

// ---------------------------------------------------------------- relevo
float ripple(vec2 p) {
  if (uRipple.w <= 0.0) return 0.0;
  float t = uRipple.z;
  float d = length(p - uRipple.xy);
  float front = t * 520.0;
  float env = exp(-t * 2.2) * uRipple.w;
  float ring = sin((d - front) * 0.045) * exp(-abs(d - front) * 0.012);
  return ring * env * 9.0 * smoothstep(front + 40.0, front - 60.0, d);
}

float crumple(vec2 p) {
  float e = uMouse.z;
  if (e < 0.003) return 0.0;
  float d = length(p - uMouse.xy);
  float a = e * exp(-d * d / (2.0 * 190.0 * 190.0));
  if (a < 0.002) return 0.0;
  vec2 q = p / 230.0;
  vec2 w = vec2(texture2D(uNoise, q * 0.21 + 0.31).g, texture2D(uNoise, q * 0.21 + 0.67).g);
  float n = texture2D(uNoise, q * 0.35 + (w - 0.5) * 0.9 + uTime * 0.004).g;
  float ridged = 1.0 - abs(n * 2.0 - 1.0);
  return a * (ridged * ridged) * 42.0;
}

float heightAt(vec2 p) {
  float g = texture2D(uNoise, p / 150.0).r;
  float u = texture2D(uNoise, p / 1100.0).g;
  float h = (g - 0.5) * 2.4 + (u - 0.5) * 7.0;
  float tr = texture2D(uTrail, vec2(p.x / uRes.x, 1.0 - p.y / uRes.y)).r;
  h -= tr * 6.0;
  h += crumple(p);
  h += ripple(p);
  return h;
}

// ---------------------------------------------------------------- linhas
float box(vec2 p, vec2 a, vec2 b) {
  // retângulo de a até b, com borda suave de 1 px
  vec2 lo = smoothstep(a - 0.7, a + 0.7, p);
  vec2 hi = smoothstep(b + 0.7, b - 0.7, p);
  return lo.x * lo.y * hi.x * hi.y;
}

float lines(vec2 p) {
  float w = uLineW * 0.5;
  // borda de tinta irregular
  float rough = (texture2D(uNoise, p / 40.0).g - 0.5) * 1.6;
  vec2 q = p + rough;
  float m = 0.0;
  // linha de saque (horizontal), desenha da esquerda até a lateral
  float endX = uSideX > 0.0 ? uSideX + w : uRes.x + 10.0;
  float drawX = mix(-10.0, endX, smoothstep(0.0, 0.7, uDraw));
  m = max(m, box(q, vec2(-10.0, uT.y - w), vec2(drawX, uT.y + w)));
  // linha central de saque: sobe do T em direção à rede
  float drawY = mix(uT.y, -10.0, smoothstep(0.35, 1.0, uDraw));
  m = max(m, box(q, vec2(uT.x - w, drawY), vec2(uT.x + w, uT.y)));
  // lateral simples, vertical
  if (uSideX > 0.0) {
    float sy = mix(uRes.y + 10.0, -10.0, smoothstep(0.2, 0.9, uDraw));
    m = max(m, box(q, vec2(uSideX - w, sy), vec2(uSideX + w, uRes.y + 10.0)));
  }
  return m;
}

// ---------------------------------------------------------------- sombras
// Sombra da rede para uma luz na direção L (normalizada, z>0) a partir do ponto p.
float netShadow(vec3 L, vec2 p, float soft) {
  if (L.y >= -0.0005) return 0.0;
  float t = (uNetY - p.y) / L.y;
  if (t <= 0.0) return 0.0;
  vec3 q = vec3(p, 0.0) + t * L;
  float xs = q.x / max(uRes.x, 1.0) * 2.0 - 0.6;
  float z = q.z + uNetH * 0.08 * (1.0 - clamp(xs * xs, 0.0, 1.0));
  q.x += sin(z / uMesh * 0.9 + q.x * 0.002) * uMesh * 0.12;
  float dist = t;
  float blur = 0.6 + dist * soft;
  float tapeH = uMesh * 1.3;
  if (z > uNetH + blur * 2.0) return 0.0;
  // fita branca no topo
  float tape = smoothstep(uNetH - tapeH - blur, uNetH - tapeH + blur, z) * smoothstep(uNetH + blur, uNetH - blur, z);
  // malha: fios horizontais e verticais
  vec2 mq = vec2(q.x, z) / uMesh;
  vec2 f = abs(fract(mq) - 0.5);
  float thread = 0.1;
  float bw = blur / uMesh;
  float mx = smoothstep(0.5 - thread - bw, 0.5 - thread + bw, f.x);
  float my = smoothstep(0.5 - thread - bw, 0.5 - thread + bw, f.y);
  float mesh = max(mx, my);
  // fios somem (viram cinza médio) quando a penumbra é maior que a malha
  mesh = mix(mesh, 0.38, smoothstep(0.22, 0.6, bw));
  float body = smoothstep(-blur, blur, z) * smoothstep(uNetH - tapeH + blur, uNetH - tapeH - blur, z);
  return max(tape * 0.92, mesh * body * 0.82);
}

// Sombra da bola (esfera de raio r com centro a zc de altura) no ponto p.
float ballShadowDir(vec2 p, vec3 L, float soft) {
  float r = uBall.w;
  if (r < 0.5) return 0.0;
  float zc = uBall.z + r;
  vec2 c = uBall.xy - L.xy / max(L.z, 0.05) * zc;
  vec2 dir = normalize(L.xy + vec2(0.0001));
  vec2 d = p - c;
  float along = dot(d, dir) * max(L.z, 0.08);
  float perp = dot(d, vec2(-dir.y, dir.x));
  float e = length(vec2(along, perp)) / r;
  float blur = 0.08 + zc * soft / r;
  return 1.0 - smoothstep(1.0 - blur, 1.0 + blur, e);
}

float ballShadowPoint(vec2 p, vec4 light) {
  float r = uBall.w;
  if (r < 0.5) return 0.0;
  float zc = uBall.z + r;
  vec3 lp = light.xyz;
  vec2 c = uBall.xy + (uBall.xy - lp.xy) * zc / max(lp.z - zc, 1.0);
  vec2 away = uBall.xy - lp.xy;
  float distL = length(away);
  vec2 dir = away / max(distL, 0.001);
  float stretch = 1.0 + distL / lp.z;
  vec2 d = p - c;
  float along = dot(d, dir) / stretch;
  float perp = dot(d, vec2(-dir.y, dir.x));
  float e = length(vec2(along, perp)) / r;
  float blur = 0.25 + zc / r * 0.05;
  return (1.0 - smoothstep(1.0 - blur, 1.0 + blur, e)) * light.w;
}

// ---------------------------------------------------------------- bola
vec3 rotateV(vec3 v, vec3 a) {
  float cx = cos(a.x), sx = sin(a.x);
  float cy = cos(a.y), sy = sin(a.y);
  float cz = cos(a.z), sz = sin(a.z);
  v = vec3(v.x, cx * v.y - sx * v.z, sx * v.y + cx * v.z);
  v = vec3(cy * v.x + sy * v.z, v.y, -sy * v.x + cy * v.z);
  v = vec3(cz * v.x - sz * v.y, sz * v.x + cz * v.y, v.z);
  return v;
}

vec4 ball(vec2 p, vec3 L, vec3 lightCol, vec3 amb) {
  if (uBall.w < 0.5) return vec4(0.0);
  float r = uBall.w * (1.0 + uBall.z * 0.0009);
  vec2 d = (p - uBall.xy) / r;
  float rr = dot(d, d);
  if (rr > 1.15) return vec4(0.0);
  float edge = 1.0 - smoothstep(1.0 - 1.6 / r, 1.0 + 0.6 / r, sqrt(rr));
  // feltro: borda fofa
  float fuzz = (texture2D(uNoise, p / 6.0).r - 0.5);
  edge = clamp(edge + fuzz * 0.12 * smoothstep(0.85, 1.0, sqrt(rr)), 0.0, 1.0);
  if (edge <= 0.0) return vec4(0.0);
  vec3 n = vec3(d.x, d.y, sqrt(max(0.0, 1.0 - rr)));
  vec3 nl = rotateV(n, uSpin);
  // costura: interseção da esfera com a sela z = k(x² - y²)
  float s = nl.z - 0.72 * (nl.x * nl.x - nl.y * nl.y);
  float seam = 1.0 - smoothstep(0.045, 0.085, abs(s));
  vec3 felt = vec3(0.62, 0.80, 0.07);
  felt *= 0.86 + 0.28 * texture2D(uNoise, p / 3.0 + uSpin.xy).r;
  vec3 col = mix(felt, vec3(0.97, 0.97, 0.90), seam);
  float lam = max(dot(n, L), 0.0);
  float wrap = max((dot(n, L) + 0.35) / 1.35, 0.0);
  float sheen = pow(1.0 - n.z, 2.5) * 0.35;
  vec3 lit = col * (amb * 1.4 + lightCol * mix(lam, wrap, 0.55)) + sheen * lightCol * 0.6;
  // oclusão no contato
  lit *= mix(1.0, 0.82, smoothstep(0.4, -0.6, n.y * 0.0 + dot(n, vec3(0.0, 0.0, 1.0)) - 0.6));
  return vec4(lit, edge);
}

// ---------------------------------------------------------------- tons
vec3 aces(vec3 x) {
  return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
}

vec3 clayAlbedo(vec2 p, float tr) {
  vec4 n = texture2D(uNoise, p / 512.0);
  vec4 n2 = texture2D(uNoise, p / 160.0 + 0.5);
  vec3 c1 = vec3(0.44, 0.066, 0.020);
  vec3 c2 = vec3(0.52, 0.086, 0.028);
  vec3 c3 = vec3(0.34, 0.052, 0.017);
  float b = texture2D(uNoise, p / 2100.0).g;
  vec3 col = mix(c3, c2, smoothstep(0.25, 0.75, b));
  col = mix(col, c1, smoothstep(0.3, 0.8, n2.g) * 0.5);
  // riscos do vassourão
  float st = texture2D(uNoise, vec2(p.x / 1400.0, p.y / 1400.0)).b;
  col *= 0.94 + 0.12 * st;
  // grão
  col *= 0.86 + 0.28 * n2.r;
  // pintas claras e escuras
  float sp = texture2D(uNoise, p / 512.0 * 1.0).a;
  col = mix(col, vec3(0.72, 0.26, 0.10), step(0.985, sp) * 0.7);
  col = mix(col, vec3(0.20, 0.05, 0.02), step(sp, 0.012) * 0.6);
  // pó compactado onde alguém deslizou: mais escuro e liso
  col *= 1.0 - tr * 0.22;
  return col;
}

void main() {
  vec2 p = vec2(vUv.x, 1.0 - vUv.y) * uRes;

  float e = 1.5;
  float h = heightAt(p);
  float hx = heightAt(p + vec2(e, 0.0));
  float hy = heightAt(p + vec2(0.0, e));
  vec3 N = normalize(vec3(-(hx - h) / e, -(hy - h) / e, 1.0));
  vec2 refr = vec2(hx - h, hy - h) * 2.2;

  float tr = texture2D(uTrail, vec2(p.x / uRes.x, 1.0 - p.y / uRes.y)).r;
  vec3 alb = clayAlbedo(p + refr, tr);

  float lm = lines(p + refr);
  float dust = texture2D(uNoise, p / 90.0).g;
  vec3 paint = vec3(0.86, 0.84, 0.80) * (0.9 + 0.1 * dust);
  // pó de saibro por cima da tinta, mais onde alguém pisou
  paint = mix(paint, alb * 1.25, clamp(0.12 + tr * 0.75 + (dust - 0.5) * 0.25, 0.0, 1.0));
  alb = mix(alb, paint, lm);

  // ------------------------------------------------ luz do sol
  vec3 L = normalize(uSun);
  float sunVis = 1.0 - uNight;
  float diff = max(dot(N, L), 0.0);
  float flatDiff = max(L.z, 0.0);
  // relevo realçado: razão entre o relevo e o plano
  float relief = diff / max(flatDiff, 0.05);
  float sh = 1.0 - netShadow(L, p, 0.0035);
  sh *= 1.0 - ballShadowDir(p, L, 0.012) * 0.85;
  vec3 light = uAmb + uSunCol * flatDiff * pow(relief, 1.35) * sh * sunVis;

  // ------------------------------------------------ refletores
  if (uL0.w + uL1.w + uL2.w + uL3.w > 0.0005) {
    vec3 acc = vec3(0.0);
    vec4 Ls[4];
    Ls[0] = uL0; Ls[1] = uL1; Ls[2] = uL2; Ls[3] = uL3;
    float R = max(uRes.x, uRes.y) * 0.42;
    for (int i = 0; i < 4; i++) {
      vec4 l = Ls[i];
      vec3 lv = l.xyz - vec3(p, 0.0);
      vec3 ld = normalize(lv);
      // poça de luz: queda radial no plano da quadra
      float r = length(l.xy - p) / R;
      float pool = l.w * (exp(-r * r * 2.4) * 0.9 + 0.1 / (1.0 + r * r * 6.0));
      float dd = max(dot(N, ld), 0.0) / max(ld.z, 0.05);
      float s = 1.0 - ballShadowPoint(p, l) * 0.7;
      acc += vec3(1.0, 0.94, 0.84) * pool * mix(1.0, pow(dd, 1.4), 0.9) * s;
    }
    float ns = 1.0 - netShadow(normalize(uL0.xyz - vec3(p, 0.0)), p, 0.03) * 0.5;
    light += acc * ns;
  }

  vec3 col = alb * light;

  // ------------------------------------------------ bola
  vec3 bl = mix(uSunCol * sunVis, vec3(1.0, 0.95, 0.86) * 0.9, uNight);
  vec3 bL = normalize(mix(L, normalize(vec3(-0.2, -0.6, 0.75)), uNight));
  vec4 b = ball(p, bL, bl, uAmb + 0.04);
  // à noite a bola recebe a luz da poça onde está
  b.rgb *= mix(1.0, clamp(dot(light, vec3(0.3, 0.5, 0.2)) * 2.6, 0.25, 1.05), uNight);
  col = mix(col, b.rgb, b.a);

  // ------------------------------------------------ acabamento
  col *= 0.98;
  // noite: sombras puxam para o azul, luzes para o quente
  float lum = dot(col, vec3(0.3, 0.55, 0.15));
  col = mix(col, col * vec3(0.78, 0.86, 1.25) + vec3(0.0, 0.004, 0.012), uNight * smoothstep(0.25, 0.0, lum));
  col = aces(col);
  col = pow(col, vec3(1.0 / 2.2));
  // vinheta suave
  vec2 vq = (p / uRes - 0.5) * vec2(uRes.x / uRes.y, 1.0);
  col *= 1.0 - dot(vq, vq) * 0.22;
  // grão de filme
  float fg = fract(sin(dot(p + fract(uTime * 7.13) * 91.0, vec2(12.9898, 78.233))) * 43758.5453);
  col += (fg - 0.5) * uGrain;
  // entrada: a luz chega
  col = mix(vec3(0.43, 0.13, 0.06), col, uIntro);
  gl_FragColor = vec4(col, 1.0);
}
`;
