/**
 * Folds the Expo web build into a single self-contained HTML file, so it can
 * be published somewhere that serves exactly one file with no external
 * requests allowed.
 *
 * Only assets the app actually reaches for get inlined: the Ionicons face (the
 * only icon family imported) and the small navigation PNGs. The other icon
 * fonts are referenced by the vendored bundle but never requested, so leaving
 * them out saves ~4MB.
 */
const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, '..', 'dist');
const OUT = process.argv[2];

if (!OUT) {
  console.error('usage: node scripts/build-single-file.js <output.html> [--fragment]');
  console.error('  run `npm run export:web` first — this reads dist/');
  process.exit(1);
}
if (!fs.existsSync(DIST)) {
  console.error(`no build found at ${DIST}. Run \`npm run export:web\` first.`);
  process.exit(1);
}

const MIME = { '.ttf': 'font/ttf', '.png': 'image/png', '.otf': 'font/otf' };

const bundlePath = fs
  .readdirSync(path.join(DIST, '_expo/static/js/web'))
  .filter((f) => f.endsWith('.js'))
  .map((f) => path.join(DIST, '_expo/static/js/web', f))[0];

let bundle = fs.readFileSync(bundlePath, 'utf8');

const refs = [...new Set(bundle.match(/\/assets\/[A-Za-z0-9_/@.-]*\.(ttf|png|jpg|otf)/g) || [])];

let inlined = 0;
let inlinedBytes = 0;
for (const ref of refs) {
  const file = path.join(DIST, ref);
  if (!fs.existsSync(file)) continue;
  const isPng = ref.endsWith('.png');
  const isIonicons = ref.includes('Ionicons');
  if (!isPng && !isIonicons) continue; // other icon families are never rendered

  const buf = fs.readFileSync(file);
  const uri = `data:${MIME[path.extname(ref)]};base64,${buf.toString('base64')}`;
  bundle = bundle.split(ref).join(uri);
  inlined += 1;
  inlinedBytes += buf.length;
}

// Any remaining asset path would be a network request the host will refuse;
// point them at an empty data URI so a miss is silent rather than a console error.
const leftover = [...new Set(bundle.match(/"\/assets\/[A-Za-z0-9_/@.-]*\.(ttf|png|jpg|otf)"/g) || [])];
for (const quoted of leftover) {
  bundle = bundle.split(quoted).join('"data:font/ttf;base64,"');
}

// A literal </script> inside the bundle would close the tag early.
const closers = (bundle.match(/<\/script/gi) || []).length;
bundle = bundle.replace(/<\/script/gi, '<\\/script');

// Fragment mode: emit page content only, for a host that supplies its own
// <!doctype>/<head>/<body> skeleton.
if (process.argv.includes('--fragment')) {
  const fragment = `<title>Rocket Practice</title>
<style>
  /* react-native-web's recommended reset, plus an explicit ground. The app
     commits to one dark world, so the background is painted here rather than
     inherited from whatever the host paints behind the page. */
  html, body { height: 100%; margin: 0; }
  body { overflow: hidden; background: #0B0B0F; }
  #root { display: flex; height: 100%; flex: 1; }
</style>
<div id="root"></div>
<script>
try {
  if (location.protocol !== 'file:' && location.pathname !== '/') {
    history.replaceState(null, '', '/');
  }
} catch (e) {
  /* opaque origin: let the router see what it sees */
}
</script>
<script>
${bundle}
</script>`;
  fs.writeFileSync(OUT, fragment);
  console.log(`assets inlined : ${inlined} (${(inlinedBytes / 1024).toFixed(0)} KB raw)`);
  console.log(`assets stubbed : ${leftover.length}`);
  console.log(`output         : ${OUT} (${(fs.statSync(OUT).size / 1024 / 1024).toFixed(2)} MB, fragment)`);
  process.exit(0);
}

let html = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
html = html.replace(/<link rel="icon"[^>]*>/, '');

// expo-router resolves the initial route from location.pathname, so the app
// only matches its routes when served at the site root. A single-file preview
// can be served from any path, so normalise it before the bundle boots.
// Wrapped: a sandboxed, opaque-origin host will refuse replaceState, and that
// must not stop the app from starting.
const shim = `<script>
try {
  if (location.protocol !== 'file:' && location.pathname !== '/') {
    history.replaceState(null, '', '/');
  }
} catch (e) {
  /* opaque origin: fall through and let the router see what it sees */
}
</script>`;
html = html.replace('<div id="root"></div>', `<div id="root"></div>\n${shim}`);
// Replacer FUNCTION, not a string: the bundle contains "$&" sequences, and a
// string replacement expands those to the matched <script src=...></script>
// tag, injecting stray closing tags that end the inline script early.
html = html.replace(/<script src="[^"]*"\s*defer><\/script>/, () => `<script>\n${bundle}\n</script>`);

fs.writeFileSync(OUT, html);

console.log(`assets inlined : ${inlined} (${(inlinedBytes / 1024).toFixed(0)} KB raw)`);
console.log(`assets stubbed : ${leftover.length}`);
console.log(`script closers : ${closers} escaped`);
console.log(`output         : ${OUT} (${(fs.statSync(OUT).size / 1024 / 1024).toFixed(2)} MB)`);
