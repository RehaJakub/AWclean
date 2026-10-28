// Selže, pokud některý obrázek ve složce (výchozí dist) nese GPS (EXIF IFD0 tag 0x8825 GPSInfo).
import { readdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
const root = process.argv[2] ?? "dist";
function hasGps(exif: Buffer): boolean {
  const tiff = exif.subarray(exif.indexOf("Exif\0\0") === 0 ? 6 : 0);
  const le = tiff.toString("latin1", 0, 2) === "II";
  const u16 = (o: number) => (le ? tiff.readUInt16LE(o) : tiff.readUInt16BE(o));
  const ifd0 = le ? tiff.readUInt32LE(4) : tiff.readUInt32BE(4);
  for (let i = 0; i < u16(ifd0); i++) if (u16(ifd0 + 2 + i * 12) === 0x8825) return true;
  return false;
}
const files = readdirSync(root, { recursive: true, encoding: "utf8" }).filter((f) => /\.(jpe?g|webp|png|avif)$/i.test(f));
const withGps: string[] = [];
for (const file of files) {
  const { exif } = await sharp(join(root, file)).metadata();
  if (exif && hasGps(exif)) withGps.push(file);
}
if (withGps.length) {
  console.error(`GPS v ${withGps.length} obrázcích, např. ${withGps.slice(0, 3).join(", ")}`);
  process.exit(1);
}
console.log(`Bez GPS: ${files.length} obrázků.`);
