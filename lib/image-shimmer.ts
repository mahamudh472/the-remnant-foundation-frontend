const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <filter id="b"><feGaussianBlur stdDeviation="20"/></filter>
  <rect width="100%" height="100%" fill="oklch(0.7518 0.108 213.86)" filter="url(#b)"/>
</svg>`

export const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str)

export const shimmerBlur = (w = 700, h = 475) =>
  `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`
