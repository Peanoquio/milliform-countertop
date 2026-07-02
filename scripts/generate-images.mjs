#!/usr/bin/env node
/**
 * Generate Milliform's site imagery with Google "Nano Banana"
 * (Gemini 2.5 Flash Image), then crop/resize to the exact dimensions the
 * layout expects and write WebP files into public/images/.
 *
 * Setup (one time):
 *   npm install            # installs @google/genai + sharp (devDeps)
 *   export GEMINI_API_KEY=your_key_here     # or put it in a local .env file
 *
 * Run:
 *   npm run gen:images               # generate any images that don't exist yet
 *   npm run gen:images -- --force    # regenerate everything
 *   npm run gen:images -- hero workshop   # only specific files (by name stem)
 *
 * Get a key: https://aistudio.google.com/apikey
 */
import { writeFile, mkdir, access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import IMAGES from './image-manifest.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'images');
const MODEL = 'gemini-2.5-flash-image'; // a.k.a. "Nano Banana"

// --- Minimal .env loader (no dependency) ----------------------------------
async function loadDotEnv() {
  try {
    const raw = await readFile(path.join(ROOT, '.env'), 'utf8');
    for (const line of raw.split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
      if (m && !process.env[m[1]]) {
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
      }
    }
  } catch {
    /* no .env — fine */
  }
}

const fileExists = (p) =>
  access(p, constants.F_OK).then(
    () => true,
    () => false
  );

async function main() {
  await loadDotEnv();

  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.GOOGLE_GENAI_API_KEY;

  if (!apiKey) {
    console.error(
      '\n✗ No API key found.\n' +
        '  Set one of GEMINI_API_KEY / GOOGLE_API_KEY (env var or .env file).\n' +
        '  Get a key at https://aistudio.google.com/apikey\n'
    );
    process.exit(1);
  }

  // Lazy-import optional deps so the missing-key path above stays friendly.
  let GoogleGenAI, sharp;
  try {
    ({ GoogleGenAI } = await import('@google/genai'));
    sharp = (await import('sharp')).default;
  } catch (e) {
    console.error(
      '\n✗ Missing dependencies. Run:  npm install\n' +
        `  (need @google/genai and sharp)\n  ${e.message}\n`
    );
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const force = args.includes('--force');
  const onlyStems = args.filter((a) => !a.startsWith('--'));

  await mkdir(OUT_DIR, { recursive: true });
  const ai = new GoogleGenAI({ apiKey });

  let made = 0;
  let skipped = 0;
  let failed = 0;

  const targets = IMAGES.filter((img) => {
    if (onlyStems.length === 0) return true;
    const stem = img.file.replace(/\.webp$/, '');
    return onlyStems.some((s) => stem.includes(s));
  });

  for (const img of targets) {
    const outPath = path.join(OUT_DIR, img.file);

    if (!force && (await fileExists(outPath))) {
      console.log(`• skip   ${img.file} (exists — use --force to regenerate)`);
      skipped++;
      continue;
    }

    const aspectHint = ` Composition aspect ratio approximately ${img.width}:${img.height}.`;
    process.stdout.write(`… make   ${img.file}  — ${img.label} `);

    try {
      const res = await ai.models.generateContent({
        model: MODEL,
        contents: img.prompt + aspectHint,
      });

      const parts = res?.candidates?.[0]?.content?.parts ?? [];
      const imagePart = parts.find((p) => p.inlineData?.data);

      if (!imagePart) {
        const textPart = parts.find((p) => p.text)?.text || 'no image returned';
        throw new Error(`model returned no image (${textPart.slice(0, 120)})`);
      }

      const inputBuf = Buffer.from(imagePart.inlineData.data, 'base64');

      // Crop/resize to the exact layout dimensions and encode WebP.
      const webp = await sharp(inputBuf)
        .resize(img.width, img.height, { fit: 'cover', position: 'attention' })
        .webp({ quality: 82 })
        .toBuffer();

      await writeFile(outPath, webp);
      console.log(`✓ ${(webp.length / 1024).toFixed(0)} kB`);
      made++;
    } catch (err) {
      console.log(`✗ ${err.message}`);
      failed++;
    }
  }

  console.log(
    `\nDone. ${made} generated, ${skipped} skipped, ${failed} failed.` +
      (failed ? ' Re-run to retry the failures.' : '')
  );
  if (failed) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
