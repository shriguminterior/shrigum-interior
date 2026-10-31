import { readFile, mkdir, writeFile, access, unlink } from 'node:fs/promises';
const source = await readFile(new URL('../src/content.ts', import.meta.url), 'utf8');
const files = [...new Set(source.match(/(?:c1605f_|11062b_)[a-zA-Z0-9_~.-]+\.(?:jpg|png)|09ae773c4a5f4b1b9ef2ff2be32c0bb9\.jpg/g))];
const directory = new URL('../public/assets/', import.meta.url);
await mkdir(directory, { recursive: true });
const failures = [];
let completed = 0;
async function download(file) {
  const logo = file.includes('8e73fc1') || file.includes('f56de250');
  const outputFile = logo ? file : file.replace(/\.(png|jpg)$/, '.webp');
  const target = new URL(outputFile, directory);
  try { await access(target); completed++; return; } catch {}
  const original = `https://static.wixstatic.com/media/${file}`;
  const url = logo ? original : `${original}/v1/fit/w_1400,h_1100,q_80/${outputFile}`;
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(45000) });
    if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) throw new Error(`HTTP ${response.status}`);
    await writeFile(target, new Uint8Array(await response.arrayBuffer()));
    if (!logo) { try { await unlink(new URL(file, directory)); } catch (error) { if (error.code !== 'ENOENT') throw error; } }
    completed++;
  } catch (error) { failures.push({ file, error: String(error) }); }
}
// Bound concurrency to avoid exhausting the source host or local network.
for (let i = 0; i < files.length; i += 5) await Promise.all(files.slice(i, i + 5).map(download));
console.log(`Downloaded ${completed}/${files.length} original website assets.`);
if (failures.length) { console.error(failures); process.exitCode = 1; }
