import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

// Use the original striped AW symbol so the brand stays readable in a small tab.
const logo = await readFile("public/images/logo.svg", "utf8");
const shapes = [...logo.matchAll(/<polygon class="st1" points="([^"]+)"\s*\/>/g)]
  .map((match) => `<polygon points="${match[1]}"/>`).join("");
if (!shapes) throw new Error("V původním logu chybí symbol AW.");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 110"><title>AWCLEAN</title><rect width="110" height="110" rx="18" fill="#fff"/><g fill="#0089CF" transform="translate(0 27)">${shapes}</g></svg>\n`;
await writeFile("public/images/favicon.svg", svg);
for (const size of [32, 180, 192]) {
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(`public/images/favicon-${size}.png`);
}
const png = await sharp(Buffer.from(svg)).resize(32, 32).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header[6] = 32;
header[7] = 32;
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png.length, 14);
header.writeUInt32LE(22, 18);
await writeFile("public/favicon.ico", Buffer.concat([header, png]));
