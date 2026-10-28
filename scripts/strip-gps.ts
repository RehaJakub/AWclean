// Bezeztrátově odstraní EXIF (včetně GPS polohy zakázek) z WebP a JPEG ve složce (výchozí public).
// Obraz se nepřekódovává: z WebP se vyjme blok EXIF, z JPEG segment APP1 Exif.
// Pokud EXIF určoval otočení fotky, zůstane jen tento jediný údaj (Orientation), aby se fotka neotočila.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
/** Orientation (tag 0x0112) z IFD0 TIFF dat EXIF; 1 = bez otočení. */
function orientationOf(tiff: Buffer): number {
  const le = tiff.toString("latin1", 0, 2) === "II";
  const u16 = (offset: number) => (le ? tiff.readUInt16LE(offset) : tiff.readUInt16BE(offset));
  const ifd0 = le ? tiff.readUInt32LE(4) : tiff.readUInt32BE(4);
  for (let i = 0; i < u16(ifd0); i++) if (u16(ifd0 + 2 + i * 12) === 0x0112) return u16(ifd0 + 2 + i * 12 + 8);
  return 1;
}
/** Minimální TIFF/EXIF jen s Orientation. */
function orientationExif(orientation: number): Buffer {
  const tiff = Buffer.alloc(26);
  tiff.write("II*\0", 0, "latin1");
  tiff.writeUInt32LE(8, 4);
  tiff.writeUInt16LE(1, 8);
  tiff.writeUInt16LE(0x0112, 10);
  tiff.writeUInt16LE(3, 12);
  tiff.writeUInt32LE(1, 14);
  tiff.writeUInt16LE(orientation, 18);
  tiff.writeUInt32LE(0, 22);
  return tiff;
}
function stripWebp(file: Buffer): Buffer | null {
  if (file.toString("latin1", 0, 4) !== "RIFF" || file.toString("latin1", 8, 12) !== "WEBP") return null;
  const chunks: Buffer[] = [];
  let removed = false;
  let orientation = 1;
  for (let offset = 12; offset + 8 <= file.length; ) {
    const size = file.readUInt32LE(offset + 4);
    const end = offset + 8 + size + (size % 2);
    const type = file.toString("latin1", offset, offset + 4);
    if (type === "EXIF") {
      removed = true;
      const exif = file.subarray(offset + 8, offset + 8 + size);
      orientation = orientationOf(exif.subarray(exif.toString("latin1", 0, 6) === "Exif\0\0" ? 6 : 0));
    } else chunks.push(Buffer.from(file.subarray(offset, end)));
    offset = end;
  }
  if (!removed) return null;
  // VP8X: smazat příznak „obsahuje EXIF“ (bit 3).
  const vp8x = chunks.find((chunk) => chunk.toString("latin1", 0, 4) === "VP8X");
  if (orientation !== 1) {
    if (!vp8x) throw new Error("WebP s otočením bez VP8X");
    const exif = orientationExif(orientation);
    const chunk = Buffer.alloc(8 + exif.length);
    chunk.write("EXIF", 0, "latin1");
    chunk.writeUInt32LE(exif.length, 4);
    exif.copy(chunk, 8);
    chunks.push(chunk);
  } else if (vp8x) vp8x[8] &= ~0x08;
  const body = Buffer.concat(chunks);
  const header = Buffer.alloc(12);
  header.write("RIFF", 0, "latin1");
  header.writeUInt32LE(body.length + 4, 4);
  header.write("WEBP", 8, "latin1");
  return Buffer.concat([header, body]);
}
function stripJpeg(file: Buffer): Buffer | null {
  if (file[0] !== 0xff || file[1] !== 0xd8) return null;
  const parts: Buffer[] = [file.subarray(0, 2)];
  let offset = 2;
  let removed = false;
  while (offset + 4 <= file.length && file[offset] === 0xff && file[offset + 1] !== 0xda) {
    const length = file.readUInt16BE(offset + 2);
    const segment = file.subarray(offset, offset + 2 + length);
    if (file[offset + 1] === 0xe1 && segment.toString("latin1", 4, 10) === "Exif\0\0") {
      if (orientationOf(segment.subarray(10)) !== 1) throw new Error("JPEG s otočením zatím nepodporován");
      removed = true;
    }
    else parts.push(segment);
    offset += 2 + length;
  }
  if (!removed) return null;
  parts.push(file.subarray(offset));
  return Buffer.concat(parts);
}
const root = process.argv[2] ?? "public";
let count = 0;
for (const name of readdirSync(root, { recursive: true, encoding: "utf8" })) {
  if (!/\.(webp|jpe?g)$/i.test(name)) continue;
  const path = join(root, name);
  const source = readFileSync(path);
  const stripped = /\.webp$/i.test(name) ? stripWebp(source) : stripJpeg(source);
  if (stripped) {
    writeFileSync(path, stripped);
    count++;
  }
}
console.log(`EXIF odstraněn z ${count} obrázků v ${root}.`);
