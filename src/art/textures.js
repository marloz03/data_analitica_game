// Procedural pixel-art textures for "Reinicia el Servidor".
// All sprites are painted at runtime from string grids so no external assets
// are needed. Palette inspired by Banco Guayaquil corporate identity
// (deep navy blue + orange).

export const PALETTE = {
  navy: 0x003d7a,
  navyDark: 0x002550,
  navyLight: 0x0a4d8c,
  orange: 0xff6b00,
  orangeLight: 0xffa654,
  white: 0xffffff,
  cream: 0xfff7e1,
  red: 0xe63946,
  redDark: 0x8a1c2b,
  yellow: 0xffd23f,
  green: 0x22c55e,
  cyan: 0x7ec8e3,
  grayLight: 0xbcbcbc,
  gray: 0x888888,
  grayDark: 0x444444,
  black: 0x1a1a1a,
  skin: 0xf4c8a8,
  skinDark: 0xc69874,
  hair: 0x332211,
  hairGray: 0xb5b5b5,
  pants: 0x2a2f3a,
  shoes: 0x1a1a1a,
  glass: 0x6fb7ff,
  carpet: 0x1d3a5f,
};

const CHARS = {
  '.': null, // transparent
  ' ': null,
  s: PALETTE.skin,
  S: PALETTE.skinDark,
  H: PALETTE.hair,
  G: PALETTE.hairGray,
  W: PALETTE.white,
  C: PALETTE.cream,
  N: PALETTE.navy,
  n: PALETTE.navyLight,
  D: PALETTE.navyDark,
  O: PALETTE.orange,
  o: PALETTE.orangeLight,
  K: PALETTE.black,
  P: PALETTE.pants,
  R: PALETTE.red,
  r: PALETTE.redDark,
  Y: PALETTE.yellow,
  E: PALETTE.green,
  B: PALETTE.cyan,
  M: PALETTE.gray,
  L: PALETTE.grayDark,
  g: PALETTE.grayLight,
  Q: PALETTE.glass,
  T: PALETTE.carpet,
};

function paint(scene, key, rows) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  const w = rows[0].length;
  const h = rows.length;
  for (let y = 0; y < h; y++) {
    const row = rows[y];
    for (let x = 0; x < w; x++) {
      const ch = row[x];
      const color = CHARS[ch];
      if (color === null || color === undefined) continue;
      g.fillStyle(color, 1);
      g.fillRect(x, y, 1, 1);
    }
  }
  g.generateTexture(key, w, h);
  g.destroy();
}

// ------------------------ SPRITES ------------------------

// Player: data analyst, 16x24
const PLAYER = [
  '................',
  '................',
  '.....HHHHHH.....',
  '....HHHHHHHH....',
  '....HssssssH....',
  '....HsKssKsH....', // eyes
  '....HssssssH....',
  '....Hssoosss....', // mouth (orange)
  '.....SsssS......',
  '.....NNNN.......', // neck
  '....NNNNNN......',
  '...NNNNNNNN.....',
  '..NNNOOOONNN....', // orange ID/badge
  '..NNNNNNNNNN....',
  '..NNNNNNNNNN....',
  '..NNNNNNNNNN....',
  '..NNNNNNNNNN....',
  '...PPPPPPPP.....',
  '...PPPPPPPP.....',
  '...PPP..PPP.....',
  '...PPP..PPP.....',
  '...PPP..PPP.....',
  '...KKK..KKK.....',
  '...KKK..KKK.....',
];

// Architect enemy: glasses, casual blazer (grayish), 16x24
const ARCHITECT = [
  '................',
  '................',
  '.....HHHHHH.....',
  '....HHHHHHHH....',
  '....HssssssH....',
  '....MKMMMKMM....', // glasses (gray frames + black lens)
  '....HssssssH....',
  '.....sssss......',
  '.....SsssS......',
  '.....MMMM.......', // tie (gray)
  '....MMMMMM......',
  '...MMMMNMMMM....', // blazer with shirt center
  '..MMMMNNNMMMM...',
  '..MMMMNWNMMMM...',
  '..MMMMNNNMMMM...',
  '..MMMMMMMMMMM...',
  '..MMMMMMMMMMM...',
  '...PPPPPPPP.....',
  '...PPPPPPPP.....',
  '...PPP..PPP.....',
  '...PPP..PPP.....',
  '...PPP..PPP.....',
  '...KKK..KKK.....',
  '...KKK..KKK.....',
];

// Security enemy: vest with padlock, 16x24
const SECURITY = [
  '................',
  '................',
  '.....HHHHHH.....',
  '....HHHHHHHH....',
  '....HssssssH....',
  '....HsRssRsH....', // red eyes (alert)
  '....HssssssH....',
  '.....sssss......',
  '.....SsssS......',
  '.....KKKK.......', // black collar
  '....KKKKKK......',
  '...KKKYYYKKK....', // padlock yellow
  '..KKKKYKYKKKK...',
  '..KKKKYYYKKKK...',
  '..KKKKKKKKKKK...',
  '..KKKKKKKKKKK...',
  '..KKKKKKKKKKK...',
  '...PPPPPPPP.....',
  '...PPPPPPPP.....',
  '...PPP..PPP.....',
  '...PPP..PPP.....',
  '...PPP..PPP.....',
  '...KKK..KKK.....',
  '...KKK..KKK.....',
];

// Boss: Fernando Vargas - gerente arquitectura de datos.
// Gray hair on sides, balding crown, navy suit with red tie.
// 24x32
const BOSS = [
  '........................',
  '........................',
  '........ssssssss........', // bald top (skin)
  '.......sssssssssss......',
  '......sssssssssssss.....', // calva incipiente
  '......GGsssssssssGG.....', // gray hair sides only
  '......GGsssssssssGG.....',
  '......GsssssssssssG.....',
  '......GsKKssssKKsssG....', // eyes
  '......GsssssssssssG.....',
  '......GsssWWWWWsssG.....', // mustache-ish (no, white = teeth row)
  '......GssssoooosssG.....', // mouth
  '.......SssssssssssS.....',
  '........SSssssSSss......',
  '.........NNNNNNNN.......', // neck/collar
  '......NNNNNNNNNNNNNN....', // suit shoulders
  '.....NNNNNNWNNNNNNNNN...',
  '....NNNNNNWWWNNNNNNNNN..',
  '....NNNNNNWRWNNNNNNNNN..', // red tie center
  '....NNNNNNWRWNNNNNNNNN..',
  '....NNNNNNWRWNNNNNNNNN..',
  '....NNNNNNWRWNNNNNNNNN..',
  '....NNNNNNNRNNNNNNNNNN..',
  '....NNNNNNNRNNNNNNNNNN..',
  '....NNNNNNNNNNNNNNNNNN..',
  '....NNNNNNNNNNNNNNNNNN..',
  '....NNNNNNNNNNNNNNNNNN..',
  '.....PPPPPPPPPPPPPPPP...',
  '.....PPPPPPPPPPPPPPPP...',
  '.....PPPPP....PPPPPP....',
  '.....KKKK......KKKKK....',
  '.....KKKK......KKKKK....',
];

// USB bullet — small stick, 10x4
const USB = [
  '..MMMMMMM.',
  '.MMWWWWWMM',
  '.MMWWWWWMM',
  '..MMMMMMM.',
];

// UML bullet — small framed diagram, 10x10
const UML = [
  'MMMMMMMMMM',
  'MWWWWWWWWM',
  'MWKKKWKKKM',
  'MWKKKWKKKM',
  'MWWWWWWWWM',
  'MWKKKWKKKM',
  'MWKKKWKKKM',
  'MWKKKWKKKM',
  'MWWWWWWWWM',
  'MMMMMMMMMM',
];

// SQL ray bullet — horizontal lightning, 16x6
const SQL = [
  '......YYY.......',
  '.....YOOY.......',
  '.YYYYOOOYYYYY...',
  '...YYYOOOOYYY...',
  '......YOOY......',
  '......YYY.......',
];

// Heart — HP, 10x9
const HEART = [
  '.RR..RR...',
  'RrRRRrRR..',
  'RrrrrrRR..',
  'RrrrrrRR..',
  '.RrrrrR...',
  '..RrrR....',
  '...RR.....',
  '..........',
  '..........',
];

// Floor tile — carpet, 16x8 (subtle pattern)
const FLOOR = [
  'TTTTTTTTTTTTTTTT',
  'TTTTTTTTTTTTTTTT',
  'TLTTTLTTTLTTTLTT',
  'TTTTTTTTTTTTTTTT',
  'TTTLTTTLTTTLTTTL',
  'TTTTTTTTTTTTTTTT',
  'TTTTTTTTTTTTTTTT',
  'LLLLLLLLLLLLLLLL',
];

// Ceiling/wall corporate panel - 16x16 (used as background, navy + dotted)
const WALL_DATA = [
  'NNNNNNNNNNNNNNNN',
  'NnnnnnnnnnnnnnnN',
  'Nn.O...........N',
  'Nn.............N',
  'Nn....O........N',
  'NnnnnnnnnnnnnnnN',
  'Nn............ON',
  'Nn.............N',
  'Nn..O..........N',
  'NnnnnnnnnnnnnnnN',
  'Nn.............N',
  'Nn.......O.....N',
  'Nn.............N',
  'NnnnnnnnnnnnnnnN',
  'NnnnnnnnnnnnnnnN',
  'NNNNNNNNNNNNNNNN',
];

// Architecture wall: UML scribbles, 16x16
const WALL_ARCH = [
  'LLLLLLLLLLLLLLLL',
  'LMMMMMMMMMMMMMML',
  'LMWMWMWMWMWMWMML',
  'LMWKWKWKWKWKWMML',
  'LMWMWMWMWMWMWMML',
  'LMMMMMMMMMMMMMML',
  'LMWKKKKWKKKKWMML',
  'LMMMMMMMMMMMMMML',
  'LMWMWMWMWMWMWMML',
  'LMWKWKWKWKWKWMML',
  'LMWMWMWMWMWMWMML',
  'LMMMMMMMMMMMMMML',
  'LMWKKKKWKKKKWMML',
  'LMMMMMMMMMMMMMML',
  'LMMMMMMMMMMMMMML',
  'LLLLLLLLLLLLLLLL',
];

// Security wall: dark with red lights, 16x16
const WALL_SEC = [
  'KKKKKKKKKKKKKKKK',
  'KLLLLLLLLLLLLLLK',
  'KLLLRLLLLLRLLLLK',
  'KLLLLLLLLLLLLLLK',
  'KLLLLLLLLLLLLLLK',
  'KLLLLLLLLLLLLLLK',
  'KLLLLLLRLLLLLLLK',
  'KLLLLLLLLLLLLLLK',
  'KLLLLLLLLLLLLLLK',
  'KLLLRLLLLLLLLLLK',
  'KLLLLLLLLLLLLLLK',
  'KLLLLLLLLLLLRLLK',
  'KLLLLLLLLLLLLLLK',
  'KLLLLLLLLLLLLLLK',
  'KLLLLLLLLLLLLLLK',
  'KKKKKKKKKKKKKKKK',
];

// IT server room wall: rack lines + green/red lights, 16x16
const WALL_TI = [
  'KKKKKKKKKKKKKKKK',
  'KLLLLLLLLLLLLLLK',
  'KLMMMMMMMMMMMMLK',
  'KLMEMEMEMRMEMELK',
  'KLMMMMMMMMMMMMLK',
  'KLMMMMMMMMMMMMLK',
  'KLMEMRMEMEMEMELK',
  'KLMMMMMMMMMMMMLK',
  'KLMMMMMMMMMMMMLK',
  'KLMEMEMRMEMEMELK',
  'KLMMMMMMMMMMMMLK',
  'KLMMMMMMMMMMMMLK',
  'KLMRMEMEMEMEMELK',
  'KLMMMMMMMMMMMMLK',
  'KLLLLLLLLLLLLLLK',
  'KKKKKKKKKKKKKKKK',
];

// Desk: 32x10
const DESK = [
  'LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL',
  'LMMMMMMMMMMMMMMMMMMMMMMMMMMMMMML',
  'LMggggggggggggggggggggggggggggML',
  'LMggggggggggggggggggggggggggggML',
  'LMMMMMMMMMMMMMMMMMMMMMMMMMMMMMML',
  'LM..........................MML',
  'LM..........................MML',
  'LM..........................MML',
  'LM..........................MML',
  'LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL',
];

// Monitor with dashboard, 14x12 (placed on top of desks)
const MONITOR = [
  'LLLLLLLLLLLLLL',
  'LKKKKKKKKKKKKL',
  'LKNNNNNNNNNNKL',
  'LKNYYYYYYYYNKL',
  'LKNYBBYYBBYNKL',
  'LKNYBBYYBBYNKL',
  'LKNYYYYYYYYNKL',
  'LKNOOOEEYYYNKL',
  'LKNNNNNNNNNNKL',
  'LKKKKKKKKKKKKL',
  '..LLLLLLLLLL..',
  '...LLLLLLLL...',
];

// Server rack, 24x40
const SERVER = [
  'LLLLLLLLLLLLLLLLLLLLLLLL',
  'LMMMMMMMMMMMMMMMMMMMMMML',
  'LMKKKKKKKKKKKKKKKKKKKKML',
  'LMKEEKKKKKKKKKKKKKKKEKML',
  'LMKKKKKKKKKKKKKKKKKKKKML',
  'LMKKKKKKKKKKKKKKKKKKKKML',
  'LMMMMMMMMMMMMMMMMMMMMMML',
  'LMKKKKKKKKKKKKKKKKKKKKML',
  'LMKKKEEKKKKKKKKKKKKKEKML',
  'LMKKKKKKKKKKKKKKKKKKKKML',
  'LMKKKKKKKKKKKKKKKKKKKKML',
  'LMMMMMMMMMMMMMMMMMMMMMML',
  'LMKKKKKKKKKKKKKKKKKKKKML',
  'LMKEKKKKKKKKKKKKKKEEKKML',
  'LMKKKKKKKKKKKKKKKKKKKKML',
  'LMKKKKKKKKKKKKKKKKKKKKML',
  'LMMMMMMMMMMMMMMMMMMMMMML',
  'LMKKKKKKKKKKKKKKKKKKKKML',
  'LMKKKKKKEEKKKKKKKKKEEKML',
  'LMKKKKKKKKKKKKKKKKKKKKML',
  'LMKKKKKKKKKKKKKKKKKKKKML',
  'LMMMMMMMMMMMMMMMMMMMMMML',
  'LMKKKKKKKKKKKKKKKKKKKKML',
  'LMKEEKKKKKKKKEEKKKKKKKML',
  'LMKKKKKKKKKKKKKKKKKKKKML',
  'LMKKKKKKKKKKKKKKKKKKKKML',
  'LMMMMMMMMMMMMMMMMMMMMMML',
  'LMKKKKKKKKKKKKKKKKKKKKML',
  'LMKKKKKKKKKKKKKKKKKKKKML',
  'LMKKKKKKKKKKKKKKKKKKEKML',
  'LMKKKKKKKKKEEKKKKKKKKKML',
  'LMMMMMMMMMMMMMMMMMMMMMML',
  'LMKKKKKKKKKKKKKKKKKKKKML',
  'LMKKKEKKKKKKKKKKKKKKEKML',
  'LMKKKKKKKKKKKKKKKKKKKKML',
  'LMKKKKKKKKKKKKKKKKKKKKML',
  'LMMMMMMMMMMMMMMMMMMMMMML',
  'LLLLLLLLLLLLLLLLLLLLLLLL',
  'LLMMMMMMMMMMMMMMMMMMMMLL',
  'LLLLLLLLLLLLLLLLLLLLLLLL',
];

// Door with BG-style frame (navy + orange), 20x32
const DOOR = [
  'NNNNNNNNNNNNNNNNNNNN',
  'NOOOOOOOOOOOOOOOOOON',
  'NOQQQQQQQQQQQQQQQQON',
  'NOQQQQQQQQQQQQQQQQON',
  'NOQQNNNNNNNNNNNNQQON',
  'NOQQNDDDDDDDDDDNQQON',
  'NOQQNDDDDDDDDDDNQQON',
  'NOQQNDDDDDDDDDDNQQON',
  'NOQQNDDDDDDDDDDNQQON',
  'NOQQNDDDDDDDDDDNQQON',
  'NOQQNDDDDDDDDDDNQQON',
  'NOQQNDDDDDDDDDDNQQON',
  'NOQQNDDDOODDDDDNQQON',
  'NOQQNDDDOODDDDDNQQON',
  'NOQQNDDDDDDDDDDNQQON',
  'NOQQNDDDDDDDDDDNQQON',
  'NOQQNDDDDDDDDDDNQQON',
  'NOQQNDDDDDDDDDDNQQON',
  'NOQQNDDDDDDDDDDNQQON',
  'NOQQNDDDDDDDDDDNQQON',
  'NOQQNDDDDDDDDDDNQQON',
  'NOQQNDDDDDDDDDDNQQON',
  'NOQQNDDDDDDDDDDNQQON',
  'NOQQNDDDDDDDDDDNQQON',
  'NOQQNDDDDDDDDDDNQQON',
  'NOQQNDDDDDDDDDDNQQON',
  'NOQQNDDDDDDDDDDNQQON',
  'NOQQNNNNNNNNNNNNQQON',
  'NOQQQQQQQQQQQQQQQQON',
  'NOQQQQQQQQQQQQQQQQON',
  'NOOOOOOOOOOOOOOOOOON',
  'NNNNNNNNNNNNNNNNNNNN',
];

// Coffee machine, 14x18
const COFFEE = [
  '..LLLLLLLLLLLL',
  '..LMMMMMMMMMML',
  '..LMKKKKKKMMML',
  '..LMKEKKEKMMML',
  '..LMKKKKKKMMML',
  '..LMMMMMMMMMML',
  '..LMggggggMMML',
  '..LMgWWWWgMMML',
  '..LMgWNNWgMMML',
  '..LMgWWWWgMMML',
  '..LMggggggMMML',
  '..LMMMMMMMMMML',
  '..LMRMMMMMMMML',
  '..LMMMMMMMMMML',
  '..LMMMMMMMMMML',
  '..LLLLLLLLLLLL',
  '...LL......LL.',
  '...LL......LL.',
];

// KPI Board (whiteboard with chart), 32x20
const KPI = [
  'LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL',
  'LWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWL',
  'LWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWL',
  'LWWKKKKKKKKKKKKKKKKKKKKKKKKKKWWL',
  'LWWK........................KWWL',
  'LWWK.........OOOO...........KWWL',
  'LWWK.......OO....OO.........KWWL',
  'LWWK......O........O........KWWL',
  'LWWK....OO..........OOO.....KWWL',
  'LWWK..OO...............OO...KWWL',
  'LWWKOO....................OOKWWL',
  'LWWK........................KWWL',
  'LWWKKKKKKKKKKKKKKKKKKKKKKKKKKWWL',
  'LWWWWNNNNNNWWWWWWWWWWWWWWWWWWWWL',
  'LWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWL',
  'LWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWL',
  'LWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWL',
  'LWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWL',
  'LWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWL',
  'LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL',
];

// Big red restart button on pedestal, 28x28
const RESTART_BTN = [
  '............................',
  '............................',
  '..........RRRRRRRR..........',
  '........RRRrrrrrrRRR........',
  '.......RRrrrrrrrrrrRR.......',
  '......RRrrrrWWWWrrrrRR......',
  '.....RRrrrWWWWWWWWrrrRR.....',
  '.....RrrrWWKKKKKKWWrrrR.....',
  '....RrrrWWKWWWWWWKWWrrrR....',
  '....RrrrWKWWKKKKWWKWrrrR....',
  '....RrrrWKWKKKKKKWKWrrrR....',
  '....RrrrWKWKWWWWKKWKrrrR....',
  '....RrrrWKWKWNNWKKWKrrrR....',
  '....RrrrWKWKWNNWKKWKrrrR....',
  '....RrrrWKWKWWWWKKWKrrrR....',
  '....RrrrWKWKKKKKKWKWrrrR....',
  '....RrrrWWKWWWWWWKWWrrrR....',
  '.....RrrrWWKKKKKKWWrrrR.....',
  '.....RRrrrWWWWWWWWrrrRR.....',
  '......RRrrrrWWWWrrrrRR......',
  '.......RRrrrrrrrrrrRR.......',
  '........RRRrrrrrrRRR........',
  '..........RRRRRRRR..........',
  '...........LLLLLL...........',
  '..........LLLLLLLL..........',
  '.........LLLLLLLLLL.........',
  '.........LLLLLLLLLL.........',
  '............................',
];

// Window with city view, 32x20
const WINDOW = [
  'LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL',
  'LQQQQQQQQQQQQQLQQQQQQQQQQQQQQQQL',
  'LQQQQQQQQQQQQQLQQQQQQQQQQQQQQQQL',
  'LQQQQQQQQQQQQQLQQQQQQQQQQQQQQQQL',
  'LQQQQQQQQQQQQQLQQQQQQQQQQQQQQQQL',
  'LQQQQQQNNQQQQQLQQQQNNNNQQQQQQQQL',
  'LQQQQQNNNNQQQQLQQQNNNNNNQQQQQQQL',
  'LQQQNNNNNNNQQQLQQNNNNNNNNQQQQQQL',
  'LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL',
  'LQQQQQQQQQQQQQLQQQQQQQQQQQQQQQQL',
  'LQQQQQQQQQQQQQLQQQQQQQQQQQQQQQQL',
  'LQQQQQQQQQQQQQLQQQQQQQQQQQQQQQQL',
  'LQQYQQQQQQQQQQLQQQQQYQQQQQYQQQQL',
  'LQQQQQQQQQQQQQLQQQQQQQQQQQQQQQQL',
  'LQQQQQYQQQQYQQLQYQQQQQQQQQQQQYQL',
  'LQQQQQQQQQQQQQLQQQQQQQQQQQQQQQQL',
  'LQQQYQQQQQQQQYLQQQQQQQYQQQQQQQQL',
  'LQQQQQQQQQQQQQLQQQQQQQQQQQQQQQQL',
  'LQQQQQQQQQQQQQLQQQQQQQQQQQQQQQQL',
  'LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL',
];

// BG logo small (decorative), 24x10
const LOGO = [
  '........................',
  '..NNNNNN....NNN....NNNNN',
  '..NNDDDN..NDDDDN..NDDDDD',
  '..NN..NN.NNN..NN.NNN....',
  '..NNNNNN.NNN..NN.NNN..NN',
  '..NNDDDD.NNN..NN.NNN..NN',
  '..NN..NN.NNN..NN.NNN..NN',
  '..NN..NN..NDDDDN..NDDDDD',
  '..NNNNNN....NNN....NNNNN',
  '........OOOOOOOOOO......',
];

// Platform piece (corporate accent, navy with orange stripe), 32x8
const PLATFORM = [
  'LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL',
  'NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN',
  'NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOON',
  'NDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDN',
  'NDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDN',
  'NDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDN',
  'NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN',
  'LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL',
];

export const TEXTURES = {
  player: PLAYER,
  architect: ARCHITECT,
  security: SECURITY,
  boss: BOSS,
  usb: USB,
  uml: UML,
  sql: SQL,
  heart: HEART,
  floor: FLOOR,
  'wall-data': WALL_DATA,
  'wall-arch': WALL_ARCH,
  'wall-sec': WALL_SEC,
  'wall-ti': WALL_TI,
  desk: DESK,
  monitor: MONITOR,
  server: SERVER,
  door: DOOR,
  coffee: COFFEE,
  kpi: KPI,
  restartBtn: RESTART_BTN,
  window: WINDOW,
  logo: LOGO,
  platform: PLATFORM,
};

export function createAllTextures(scene) {
  for (const [key, rows] of Object.entries(TEXTURES)) {
    paint(scene, key, rows);
  }
  // Solid 1x1 white used for gradients/overlays
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  g.fillStyle(0xffffff, 1);
  g.fillRect(0, 0, 1, 1);
  g.generateTexture('px', 1, 1);
  g.destroy();
}
