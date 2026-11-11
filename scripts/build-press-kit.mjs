// Builds public/press/rivalarcade-press-kit.zip from brand assets, real screenshots and a fact sheet.
// Requires the `zip` CLI (preinstalled on macOS/Linux). Run: npm run press-kit
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const out = path.join(root, 'public/press');
const stage = fs.mkdtempSync(path.join(root, '.press-'));
const kit = path.join(stage, 'RivalArcade-Press-Kit');
const put = (src, dest) => { fs.mkdirSync(path.dirname(path.join(kit, dest)), { recursive: true }); fs.copyFileSync(path.join(root, src), path.join(kit, dest)); };

put('public/press/rivalarcade-mark.svg', 'logo/rivalarcade-crest.svg');
put('public/press/rivalarcade-wordmark.png', 'logo/rivalarcade-wordmark.png');
for (const s of ['icon-192.png', 'icon-512.png']) put('public/brand/' + s, 'logo/' + s);
for (const f of fs.readdirSync(path.join(root, 'public/screens'))) put('public/screens/' + f, 'screenshots/' + f);
for (const f of fs.readdirSync(path.join(root, 'public/games')).filter((f) => !f.includes('-sm'))) put('public/games/' + f, 'game-art/' + f);

const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://rivalarcade.example';
fs.writeFileSync(path.join(kit, 'FACT-SHEET.txt'), `RIVALARCADE — FACT SHEET
=======================
Play: https://rivalarcade.vercel.app
Website: ${site}

WHAT IT IS
RivalArcade is a free competitive arcade that runs in the browser. Players compete in 12 skill games
in 1v1 duels, live arenas and scheduled cups, climb the RivalRank ladder and collect cosmetics.

KEY FACTS
- 12 skill games (3D and arcade): Neon Dash, Dunk Rush, Cyber Reflex, Gem Surge, Brick Blitz, Canopy Swing,
  Fight Night, Sky Stack, Axe Spin, Beat Tiles, Slice Storm, Prism Hop.
- Free to play, no download, runs in a web browser.
- Duels use the exact same game seed for both players, so the result is skill, not luck.
- RivalRank: 8 tiers from Bronze to Rival Elite.
- Rival Coins are an in-game currency earned by playing. They are not purchasable and have no cash value.
- 74 cosmetics across 6 rarities; cosmetics are cosmetic only (no gameplay advantage).

BRAND
- Name: RivalArcade (one word, capital R and A).
- Colours: black #07070A, gold #E9B949 (gradient #FFF1B8 to #8A5A0C).
- Typeface: Lilita One (headings), Nunito (body).
- Please do not recolour, stretch or add effects to the crest or wordmark.

USAGE
Screenshots and art in this kit may be used in editorial coverage of RivalArcade.
Figures such as player counts are intentionally not included; ask us for current, verified numbers.

CONTACT
Partnerships and media: ${site}/contact  ·  Creators: ${site}/creators
`);

const zip = path.join(out, 'rivalarcade-press-kit.zip');
fs.rmSync(zip, { force: true });
execFileSync('zip', ['-r', '-q', zip, 'RivalArcade-Press-Kit'], { cwd: stage });
fs.rmSync(stage, { recursive: true, force: true });
console.log('Wrote', path.relative(root, zip), (fs.statSync(zip).size / 1024 / 1024).toFixed(1) + ' MB');
