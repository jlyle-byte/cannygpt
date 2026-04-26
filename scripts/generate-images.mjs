// One-shot generator for app/icon.png and app/apple-icon.png.
// Run with: node scripts/generate-images.mjs
//
// Produces a gold five-pointed star on a pure black circle, gold inner
// border, white outer ring. The Toon badge reduced to its essence.
//
// resvg-js (npm build) doesn't decode woff2; we don't need fonts here so
// no decompression. The icons are pure SVG geometry.

import { Resvg } from "@resvg/resvg-js";
import { writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const APP_DIR = join(ROOT, "app");

const PALETTE = {
  bg: "#0a0a0a",
  gold: "#f5c518",
  white: "#ffffff",
};

function renderSvg(svg, outPath, width) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: width },
    background: "rgba(0,0,0,0)",
  });
  const png = resvg.render().asPng();
  return writeFile(outPath, png).then(() => console.log("wrote", outPath));
}

// ----- Avatar / favicon -----------------------------------------------------
function avatarSvg() {
  // Drawn on a 512×512 logical canvas; resvg resizes to the requested width.
  // Concentric layout from outside in:
  //   r=256 white outer ring background
  //   r=246 gold inner border
  //   r=232 black disc
  //   gold five-pointed star centred, scaled
  //
  // Star geometry copied from texasrangerai's Avatar.tsx (32×32 viewBox)
  // and scaled into the 512 canvas, centred at 256,256 with star radius
  // ~ 0.62 of disc radius.
  const cx = 256;
  const cy = 256;
  const r = 144; // outer star radius
  const inner = r * 0.4;
  // 10 alternating outer/inner points starting at 12 o'clock.
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    const radius = i % 2 === 0 ? r : inner;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    pts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <circle cx="${cx}" cy="${cy}" r="256" fill="${PALETTE.white}"/>
  <circle cx="${cx}" cy="${cy}" r="246" fill="${PALETTE.gold}"/>
  <circle cx="${cx}" cy="${cy}" r="232" fill="${PALETTE.bg}"/>
  <polygon points="${pts.join(" ")}" fill="${PALETTE.gold}"/>
</svg>`;
}

await mkdir(APP_DIR, { recursive: true });
await renderSvg(avatarSvg(), join(APP_DIR, "icon.png"), 512);
await renderSvg(avatarSvg(), join(APP_DIR, "apple-icon.png"), 180);

console.log("Done.");
