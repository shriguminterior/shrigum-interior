import { readFile, mkdir, writeFile, access } from 'node:fs/promises';
// Keep original Wix identifiers only in the recovery manifest. The website
// and local files use descriptive names, including shared gallery images.
const files = JSON.parse(await readFile(new URL('./wix-assets.json', import.meta.url), 'utf8'));
const directory = new URL('../public/assets/', import.meta.url);
await mkdir(directory, { recursive: true });
const failures = [];
let completed = 0;
async function download({ file, source }) {
  const target = new URL(file, directory);
  try { await access(target); completed++; return; } catch {}
  const original = `https://static.wixstatic.com/media/${source}`;
  const url = `${original}/v1/fit/w_1400,h_1100,q_80/${file}`;
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(45000) });
    if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) throw new Error(`HTTP ${response.status}`);
    await writeFile(target, new Uint8Array(await response.arrayBuffer()));
    completed++;
  } catch (error) { failures.push({ file, error: String(error) }); }
}
// Bound concurrency to avoid exhausting the source host or local network.
for (let i = 0; i < files.length; i += 5) await Promise.all(files.slice(i, i + 5).map(download));
console.log(`Downloaded ${completed}/${files.length} original website assets.`);
if (failures.length) { console.error(failures); process.exitCode = 1; }
