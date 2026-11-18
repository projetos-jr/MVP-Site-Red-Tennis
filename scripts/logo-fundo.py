import cv2, numpy as np
from scipy import ndimage as ndi
img = cv2.imread("up-edsr.png").astype(np.float32) / 255.0  # BGR
H, W = img.shape[:2]
# 1) cor-para-alfa contra o branco (como o "Color to Alpha" do GIMP)
a = np.max(1.0 - img, axis=2)
a = np.clip((a - 0.035) / (1 - 0.035), 0, 1)  # ruído quase branco vira transparente
safe = np.maximum(a, 1e-4)[..., None]
cor = np.clip((img - (1 - safe)) / safe, 0, 1)
# 2) partes claras FECHADAS (linhas da quadra, brilhos internos) ficam opacas com a cor original
claro = img.min(axis=2) > 0.80
rot, n = ndi.label(claro)
borda = set(np.unique(np.concatenate([rot[0], rot[-1], rot[:, 0], rot[:, -1]]))) - {0}
fechado = claro & ~np.isin(rot, list(borda))
# só o que é FINO (linhas da quadra): some com uma erosão de 5 px. Miolos de letra e manchas grandes ficam de fora.
rf, nf = ndi.label(fechado)
grosso = ndi.binary_erosion(fechado, iterations=5)
manter = [i for i in range(1, nf + 1) if not grosso[rf == i].any() and (rf == i).sum() > 60]
fechado = np.isin(rf, manter)
fechado = ndi.binary_dilation(fechado, iterations=1)
a = np.where(fechado, 1.0, a)
cor = np.where(fechado[..., None], img, cor)
# 3) silhueta para o adesivo: tudo que é visível, sem buracos, dilatado e arredondado
vis = a > 0.16
vis = ndi.binary_fill_holes(ndi.binary_closing(vis, iterations=3))
lab, n = ndi.label(vis)
tam = ndi.sum(vis, lab, range(1, n + 1))
vis = np.isin(lab, [i + 1 for i, t in enumerate(tam) if t > 400])
pad = 26
visp = np.pad(vis, pad)
dist = ndi.distance_transform_edt(~visp)
sil = np.clip((15.5 - dist) / 1.5, 0, 1)  # borda branca de ~14 px (em 4x) com antisserrilhado
sil = cv2.GaussianBlur(sil.astype(np.float32), (0, 0), 0.8)
imgp = np.pad(img, ((pad, pad), (pad, pad), (0, 0)), constant_values=1.0)
# remove um eventual halo cinza: dentro do adesivo, o logo sobre papel branco
ades = np.dstack([imgp[..., 2], imgp[..., 1], imgp[..., 0], sil])
plain = np.dstack([cor[..., 2], cor[..., 1], cor[..., 0], a])
# recorta a transparência sobrando
def recorta(rgba, m=4):
    ys, xs = np.where(rgba[..., 3] > 0.01)
    return rgba[max(0, ys.min() - m):ys.max() + m + 1, max(0, xs.min() - m):xs.max() + m + 1]
from PIL import Image
for nome, arr in [("logo-transparente.png", recorta(plain)), ("logo-adesivo.png", recorta(ades))]:
    Image.fromarray((arr * 255 + 0.5).astype(np.uint8), "RGBA").save(nome)
    print(nome, arr.shape)
