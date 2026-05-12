// Bundles the whole game into a single self-contained game.html file
// (Phaser + all sources inlined). Open it directly on a phone — no server
// needed, no internet needed.
//
// Run: node build.mjs

import { readFileSync, writeFileSync } from 'node:fs';

const ORDER = [
  'src/art/textures.js',
  'src/level/level1.js',
  'src/entities/Enemy.js',
  'src/entities/ArchitectEnemy.js',
  'src/entities/SecurityEnemy.js',
  'src/entities/Player.js',
  'src/entities/Boss.js',
  'src/scenes/BootScene.js',
  'src/scenes/MenuScene.js',
  'src/scenes/HUDScene.js',
  'src/scenes/GameScene.js',
  'src/scenes/VictoryScene.js',
  'src/scenes/GameOverScene.js',
  'src/main.js',
];

function stripModuleSyntax(source) {
  // Drop `import { ... } from '...';` (handles multi-line)
  let out = source.replace(/^import\s+[^;]+;\s*?\n?/gm, '');
  // Drop `export ` prefix (keep the declaration)
  out = out.replace(/^export\s+(?=(?:const|let|var|class|function|async))/gm, '');
  return out;
}

const phaser = readFileSync('vendor/phaser.min.js', 'utf8');
const parts = ORDER.map((f) => `// === ${f} ===\n${stripModuleSyntax(readFileSync(f, 'utf8'))}`);
const bundle = parts.join('\n\n');

const html = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
    />
    <meta name="theme-color" content="#003D7A" />
    <title>Reinicia el Servidor — Banco Guayaquil</title>
    <style>
      html, body {
        margin: 0; padding: 0; height: 100%;
        background: #000814;
        overflow: hidden;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
        color: #e6f0ff;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        user-select: none;
        touch-action: none;
        overscroll-behavior: none;
      }
      #game { position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; }
      #game canvas { display: block; image-rendering: pixelated; image-rendering: crisp-edges; }
    </style>
  </head>
  <body>
    <div id="game"></div>
    <script>${phaser}</script>
    <script>
${bundle}
    </script>
  </body>
</html>
`;

writeFileSync('game.html', html);
const sizeMb = (html.length / 1024 / 1024).toFixed(2);
console.log(`Wrote game.html (${sizeMb} MB)`);
