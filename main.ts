import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const sentence =
  "Rent-a-Grandma: grandmothers on demand who video-call your kids, scold them lovingly, and make sure they eat — because every startup needs a mother.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const target = join(outDir, "entry.txt");
writeFileSync(target, sentence, "utf8");

if (sentence.length > 200) {
  throw new Error(`Sentence is ${sentence.length} characters, over the 200 limit`);
}
if (sentence.includes("\n")) {
  throw new Error("Sentence must be a single line with no newline");
}

const written = readFileSync(target, "utf8");
if (written !== sentence) {
  throw new Error("entry.txt does not match the sentence exactly");
}

const byteCount = Buffer.byteLength(written, "utf8");
console.log(
  `Wrote entry.txt: ${written.length} characters, ${byteCount} bytes (UTF-8) -> ${target}`,
);
