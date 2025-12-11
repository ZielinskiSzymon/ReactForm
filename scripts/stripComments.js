const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "../src");
const backupRoot = path.resolve(__dirname, "../comment_backups");
const exts = [".js", ".jsx", ".ts", ".tsx", ".css", ".scss", ".html", ".md"];

function walk(dir, cb) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const f of files) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) walk(full, cb);
    else cb(full);
  }
}

if (!fs.existsSync(root)) {
  console.error("src/ not found");
  process.exit(1);
}

if (!fs.existsSync(backupRoot)) fs.mkdirSync(backupRoot, { recursive: true });

const changed = [];
walk(root, (file) => {
  const ext = path.extname(file).toLowerCase();
  if (!exts.includes(ext)) return;
  const rel = path.relative(root, file);
  const bakPath = path.join(backupRoot, rel);
  const bakDir = path.dirname(bakPath);
  if (!fs.existsSync(bakDir)) fs.mkdirSync(bakDir, { recursive: true });
  const original = fs.readFileSync(file, "utf8");
  fs.writeFileSync(bakPath, original, "utf8");

  let s = original;
  // remove block comments /* ... */
  s = s.replace(/\/\*[\s\S]*?\*\//g, "");
  // remove HTML comments <!-- ... -->
  s = s.replace(/<!--([\s\S]*?)-->/g, "");
  // remove line comments (//...) but try to avoid removing inside strings roughly
  s = s.replace(/(^|[^\\:\"'`])\/\/.*$/gm, "$1");
  // Trim excessive blank lines generated
  s = s.replace(/\n{3,}/g, "\n\n");

  if (s !== original) {
    fs.writeFileSync(file, s, "utf8");
    changed.push(rel);
  }
});

console.log("Backups saved to:", backupRoot);
console.log("Files changed:", changed.length);
for (const f of changed) console.log("-", f);

if (changed.length === 0) process.exit(0);
process.exit(0);
