/**
 * Product facts used across the marketing site. Every number here is taken from the RivalArcade
 * app's own source (lib/economy.ts, lib/rivalrank.ts, lib/progression.ts, lib/cosmetics-catalog.ts,
 * the game components). When the app changes, update this file — never invent figures.
 */

export type GameId = 'neon-dash' | 'dunk-rush' | 'cyber-reflex' | 'gem-surge' | 'brick-blitz' | 'canopy-swing' | 'fight-night' | 'sky-stack' | 'axe-spin' | 'beat-tiles' | 'slice-storm' | 'prism-hop';

export interface Game {
  id: GameId;
  title: string;
  genre: string;
  blurb: string;
  goal: string;
  controls: string[];
  points: { label: string; value: string }[];
  ends: string;
  color: string;
  tags: string[];
  /** A scheduled cup in the app that runs on this game, if any. */
  cup?: { title: string; badge: string; prize: string; description: string };
  tip: string;
}

export const GAMES: Game[] = [
  {
    id: 'brick-blitz', title: 'Brick Blitz', genre: 'Aim & launch', color: '#38bdf8', tags: ['Puzzle', 'Endless'],
    blurb: 'Endless volleys and power-ups. Hold back the wall as long as you can.',
    goal: 'Break bricks before the creeping wall reaches the red line. Aim fast — it moves while you aim.',
    controls: ['Drag to aim — dots show the path', 'Let go to fire the volley', 'Tap to fast-forward'],
    points: [{ label: 'Brick', value: '1' }, { label: 'Row survived', value: '1' }, { label: 'Tough brick / star', value: '3' }, { label: 'Gold brick', value: '5' }, { label: 'Row clear', value: '+2' }, { label: 'Board clear', value: '5' }],
    ends: 'Endless — the run ends when the wall reaches the line with no shields left.',
    tip: 'Quick shots under two seconds score a bonus point, and a shot clock fires for you anyway — so aim with intent, then commit.',
  },
  {
    id: 'dunk-rush', title: 'Dunk Rush', genre: 'Flick basketball', color: '#f97316', tags: ['Sports', 'Timed'],
    blurb: 'Drag and release to shoot. Swish for 2, light the flame ball for 6.',
    goal: 'Sink as many baskets as you can before the clock runs out.',
    controls: ['Drag up — a longer pull shoots farther', 'Slide left or right while pulling to aim', 'Let go to shoot, pull back down to cancel'],
    points: [{ label: 'Swish', value: '2' }, { label: 'Bank / rim shot', value: '1' }, { label: '3 swishes in a row', value: 'Flame ball' }, { label: 'Flame-ball swish', value: '6' }],
    ends: '60-second round on the shot clock. The hoop starts moving as you go.',
    cup: { title: 'Sub-Zero 3-Point Shootout', badge: 'Pro Bracket', prize: 'Aureus Court Cleats', description: 'Moving-hoop swish frenzy — the champion takes Aureus Court Cleats.' },
    tip: 'Swishes are worth double and three in a row lights the flame ball. Consistent power beats hero shots.',
  },
  {
    id: 'canopy-swing', title: 'Canopy Swing', genre: 'Hold & swing', color: '#4ade80', tags: ['Action', 'Endless'],
    blurb: 'Hook a vine, swing, let go and fly. Keep your momentum.',
    goal: 'Hook vine to vine across the river, left to right. Outrun the fire. Don’t fall in.',
    controls: ['Hold anywhere to fire the hook at the vine in reach', 'Let go to fly — you keep all your speed', 'Release on the upswing to clear several vines'],
    points: [{ label: 'Every 2 m travelled', value: '1' }, { label: 'Berry', value: '+3' }],
    ends: 'Four stages, Slow to Crazy. The fire wall or one splash ends the run.',
    cup: { title: 'Canopy Swing Classic', badge: 'New Game Cup', prize: 'Jade Spirit Blade', description: 'Same jungle for everyone. Swing the furthest to take the Jade Spirit Blade.' },
    tip: 'Hanging around brings the fire wall in from the left. Momentum is score — let go on the upswing.',
  },
  {
    id: 'fight-night', title: 'FightNight', genre: 'Boxing', color: '#ef4444', tags: ['Sports', 'Action'],
    blurb: 'Jab, slip and land haymakers. Read his guard, counter his punches, go for the KO.',
    goal: 'Knock him out — or win on health after three rounds.',
    controls: ['Tap to jab', 'Swipe up for a haymaker', 'Swipe down to block'],
    points: [{ label: 'Jab', value: '1' }, { label: 'Haymaker', value: '3' }, { label: 'Counter', value: '+2' }, { label: 'Slip', value: '+1' }, { label: 'KO win', value: '+20' }],
    ends: 'Three 45-second rounds. A KO ends it early.',
    tip: 'Counters and slips add up faster than you think. Patience sets up the knockout bonus.',
  },
  {
    id: 'sky-stack', title: 'Sky Stack', genre: 'Tap timing', color: '#f472b6', tags: ['Timing', 'Endless'],
    blurb: 'Tap to drop each slab. Perfect drops keep the tower wide — how high can you go?',
    goal: 'Tap to drop each slab on the tower. Overhang gets sliced off.',
    controls: ['Tap to drop'],
    points: [{ label: 'Slab', value: '1' }, { label: 'Perfect', value: '+1' }, { label: '3 perfects', value: 'Grows back' }, { label: '5 perfects', value: '×2' }],
    ends: 'Miss the tower and it’s over.',
    tip: 'Three perfects in a row grow the slab back. Rhythm matters more than speed.',
  },
  {
    id: 'axe-spin', title: 'Axe Spin', genre: 'Tap timing', color: '#f59e0b', tags: ['Timing', 'Endless'],
    blurb: 'Throw axes into the spinning log. Hit another axe and it’s over.',
    goal: 'Throw every axe into the spinning log. Never hit another axe.',
    controls: ['Tap to throw'],
    points: [{ label: 'Axe', value: '1' }, { label: 'Golden apple', value: '+2' }, { label: 'Log smashed', value: '+3' }, { label: 'Boss log', value: '+5' }],
    ends: 'One clang and it’s over.',
    tip: 'Watch the gaps, not the axes. Apples are worth the wait only when the gap is clean.',
  },
  {
    id: 'beat-tiles', title: 'Beat Tiles', genre: 'Rhythm', color: '#c084fc', tags: ['Rhythm', 'Endless'],
    blurb: 'Tap the tiles to play the song. Faster and faster — don’t miss a beat.',
    goal: 'Tap the lowest tile, every time. Never tap an empty lane.',
    controls: ['Tap the tile'],
    points: [{ label: 'Tile', value: '1' }, { label: 'In the beat zone', value: '+1' }, { label: '5 perfects', value: '×2' }],
    ends: 'A wrong tap or a missed tile ends it.',
    tip: 'Always hit the lowest tile first. Tapping inside the beat zone doubles what each tile is worth.',
  },
  {
    id: 'slice-storm', title: 'Slice Storm', genre: 'Swipe', color: '#fb923c', tags: ['Action', 'Endless'],
    blurb: 'Swipe to slice flying fruit. Chain combos, dodge the bombs.',
    goal: 'Swipe to slice every fruit. Never slice a bomb.',
    controls: ['Swipe to slice'],
    points: [{ label: 'Fruit', value: '1' }, { label: '3+ in one swipe', value: '+1 each' }, { label: 'Star fruit', value: '5' }],
    ends: 'Three missed fruit or one bomb.',
    tip: 'Wait a beat for fruit to cluster, then take three or more in a single swipe for the combo bonus.',
  },
  {
    id: 'prism-hop', title: 'Prism Hop', genre: 'Tap timing', color: '#a855f7', tags: ['Puzzle', 'Endless'],
    blurb: 'Hop through spinning rings — only through your own colour.',
    goal: 'Tap to hop up. Only pass through your own colour.',
    controls: ['Tap to hop'],
    points: [{ label: 'Star', value: '1' }, { label: 'Rainbow orb', value: 'New colour' }, { label: '5 stars, no pause', value: '×2' }],
    ends: 'The wrong colour or falling off ends it.',
    tip: 'Rainbow orbs change your colour — read the next ring before you grab one.',
  },
  {
    id: 'neon-dash', title: 'Neon Dash', genre: 'Swipe runner', color: '#ec4899', tags: ['Action', 'Timed'],
    blurb: 'Swipe lanes, jump and slide down a neon highway.',
    goal: 'Dodge. Grab crystals. Survive 60 seconds.',
    controls: ['Swipe sideways to change lane', 'Swipe up to jump', 'Swipe down to slide'],
    points: [{ label: 'Dodge', value: '1' }, { label: 'Crystal', value: '1' }, { label: 'Close call', value: '+1' }, { label: 'Gold crystal', value: '3' }, { label: '5 clean', value: '×2' }],
    ends: '60 seconds, three shields.',
    cup: { title: 'Neon Dash Grand Prix', badge: 'Daily Cup', prize: 'Phoenix Crimson Flare trail', description: 'Best run on the cup seed takes 1st and the Phoenix Crimson Flare trail.' },
    tip: 'Close calls score a bonus point. Five clean dodges in a row double your points.',
  },
  {
    id: 'cyber-reflex', title: 'Cyber Reflex', genre: 'Tap & slash', color: '#14b8a6', tags: ['Reflex', 'Timed'],
    blurb: 'Hit targets dead-centre, chain perfects, dodge hazards.',
    goal: 'Hit each node before its ring closes.',
    controls: ['Tap a node', 'Slash across several', 'Never hit red nodes'],
    points: [{ label: 'Node', value: '1' }, { label: 'As ring closes', value: '+1' }, { label: 'Gold node', value: '3' }, { label: 'Red node', value: '−2' }, { label: '5 in a row', value: '×2' }, { label: 'Last 10s', value: '×2' }],
    ends: '60-second round with more, faster nodes as it goes.',
    cup: { title: 'Matrix Reflex Championship', badge: 'Weekly Major', prize: 'Velocity Aviators', description: 'Same targets for the whole field. Fastest hands win.' },
    tip: 'The last ten seconds are clutch time — every point is doubled, so save your focus.',
  },
  {
    id: 'gem-surge', title: 'Gem Surge', genre: 'Match-3', color: '#c084fc', tags: ['Puzzle', 'Timed'],
    blurb: 'Build power gems, chain cascades — and never run out of moves.',
    goal: 'Match three or more gems. Build power gems. Don’t run out of moves.',
    controls: ['Swipe to swap', 'Or tap two gems', 'Chain cascades'],
    points: [{ label: 'Gem', value: '1' }, { label: 'Cascade', value: '+1 a gem' }, { label: '4 → Line', value: '+1' }, { label: 'L/T → Bomb', value: '+2' }, { label: '5 → Prism', value: '+3' }],
    ends: 'Two minutes (+5 s per timer gem), or no moves left.',
    cup: { title: 'Gem Surge Flash Cup', badge: 'Flash', prize: 'Arcade 1989 Windbreaker', description: 'A short sprint cup on one shared board.' },
    tip: 'Matches low on the board set off cascades, and every cascade step adds a point per gem.',
  },
];

export const gameById = (id: string) => GAMES.find((g) => g.id === id);

/** Scoring rules shared by every game (lib/scoring.ts in the app). */
export const SCORING_RULES = [
  { title: '1 point per action', text: 'Every normal action — a basket, a brick, a slab, a dodge — is worth one point. No hidden multipliers.' },
  { title: 'Specials say so', text: 'Swishes, perfect timing and bank shots add a bonus point. Gold items are worth 3 and jackpots 5.' },
  { title: 'ON FIRE ×2', text: 'Five in a row and you’re on fire: points are doubled until the streak breaks.' },
  { title: 'CLUTCH ×2', text: 'The last ten seconds of a timed round double every point — and it stacks with ON FIRE.' },
];

export const MODES = [
  { id: 'practice', title: 'Practice', text: 'Solo and free on a random seed. Learn the controls, earn a few Rival Coins and XP, no opponent and no pressure.' },
  { id: 'duel', title: '1v1 Duels', text: 'You and a rival play the identical seed, one run each. Higher score wins. Rated duels move your RivalRank.' },
  { id: 'arena', title: 'Live Arena', text: 'Up to five players on one seed. The top three split a Rival Coin pool 50 / 30 / 20.' },
  { id: 'cup', title: 'Cups', text: 'Scheduled score-attack tournaments: one run each on the cup seed. The top seven are paid and the champion takes the cup’s cosmetic.' },
];

export const RANK_TIERS = [
  { name: 'Bronze', min: 0, color: '#c98a52' },
  { name: 'Silver', min: 1150, color: '#cfd6e0' },
  { name: 'Gold', min: 1250, color: '#f2c14e' },
  { name: 'Platinum', min: 1350, color: '#67e8d4' },
  { name: 'Diamond', min: 1450, color: '#7cc4ff' },
  { name: 'Master', min: 1550, color: '#c084fc' },
  { name: 'Grandmaster', min: 1700, color: '#fb7185' },
  { name: 'Rival Elite', min: 1850, color: '#fde68a' },
];

/** From lib/economy.ts. */
export const ECONOMY = {
  dailyCap: 2000,
  signupBonus: 1000,
  login: { base: 50, perStreakDay: 10, max: 100 },
  practice: { min: 4, max: 12, dailyCap: 300 },
  duel: { win: 20, tie: 10, played: 3 },
  arenaPool: 70,
  arenaSplit: [35, 21, 14],
  cupPool: 600,
  sameOpponentDaily: 3,
  vipCost: 5000,
};

export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';
export const RARITY: Record<Rarity, { label: string; color: string; price: [number, number]; finish: string; availability: string }> = {
  common: { label: 'Common', color: '#a1a1aa', price: [500, 1000], finish: 'Matte', availability: 'Very accessible' },
  uncommon: { label: 'Uncommon', color: '#4ade80', price: [1500, 3000], finish: 'Gloss', availability: 'Accessible' },
  rare: { label: 'Rare', color: '#38bdf8', price: [5000, 9000], finish: 'Gloss', availability: 'Moderate' },
  epic: { label: 'Epic', color: '#c084fc', price: [15000, 25000], finish: 'Metal', availability: 'Difficult' },
  legendary: { label: 'Legendary', color: '#fbbf24', price: [40000, 65000], finish: 'Chrome', availability: 'Very difficult' },
  mythic: { label: 'Mythic', color: '#f472b6', price: [75000, 90000], finish: 'Holo', availability: 'Extremely difficult' },
};
export const RARITY_ORDER: Rarity[] = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic'];

export interface Cosmetic { id: string; name: string; rarity: Rarity; slot: string }
const SLOT: Record<string, string> = { hair: 'Hair', shirt: 'Top', pants: 'Bottoms', shoes: 'Shoes', headwear: 'Headwear', eyewear: 'Eyewear', back: 'Back gear', trail: 'Trail', pose: 'Emote', banner: 'Banner' };
const RAW: [string, string, Rarity][] = [["hair_short_fade","Precision Fade","common"],["hair_spiky_punk","Volt Spikes","common"],["hair_waves","Flowing Waves","common"],["hair_high_pony","Striker Ponytail","common"],["hair_afro_puff","Solar Puffs","uncommon"],["hair_cyber_undercut","Cyber Undercut","epic"],["hair_dreadlocks","Rival Dreadlocs","rare"],["hair_neon_mohawk","Riot Neon Mohawk","epic"],["hair_space_buns","Twin Nova Buns","rare"],["shirt_starter_jersey","Rival-01 Athleisure","common"],["shirt_street_hoodie","Sub-Zero Hoodie","common"],["shirt_cyber_jumpsuit","Vector Carbon Top","rare"],["shirt_retro_tracksuit","Arcade 1989 Windbreaker","rare"],["shirt_champion_jacket","Apex Gold Bomber","legendary"],["shirt_neon_mech","Exo-Weave Vest","mythic"],["shirt_checker_retro","Checkpoint Racer Tee","common"],["shirt_circuit_tee","Motherboard Circuit Tee","rare"],["shirt_camo_shell","Night-Ops Camo Shell","rare"],["shirt_inferno_jersey","Inferno Jersey #99","epic"],["shirt_deep_space","Deep Space Hoodie","epic"],["shirt_diamond_royale","Diamond Royale Jacket","legendary"],["shirt_aurora_holo","Aurora Holo Coat","mythic"],["pants_cargo_joggers","Flex Cargo Joggers","common"],["pants_athletic_shorts","Court Rush Shorts","common"],["pants_cyber_greaves","Sub-Orbital Tech Pants","rare"],["pants_gold_trim","Champion Track Slacks","epic"],["pants_raw_denim","Indigo Raw Denim","common"],["pants_urban_camo","Urban Camo Cargos","rare"],["pants_afterburner","Afterburner Track Pants","epic"],["pants_prism_leggings","Prism Flex Leggings","legendary"],["shoes_high_tops","Vortex High-Tops","common"],["shoes_neon_runners","Laser-Trac Lows","rare"],["shoes_cyber_boots","Grav-Boots 3000","epic"],["shoes_gold_cleats","Aureus Court Cleats","legendary"],["shoes_retro_canvas","Retro Canvas Lows","common"],["shoes_glacier_kicks","Glacier Kicks","rare"],["shoes_magma_step","Magma Step Runners","epic"],["shoes_void_walkers","Void Walkers","mythic"],["headwear_snapback","Rival Pro Snapback","common"],["headwear_beanie","Skater Slouch Beanie","uncommon"],["headwear_neon_band","Nitro Sweatband","uncommon"],["headwear_cyber_visor","Gridlock HUD Visor","epic"],["headwear_crown","Apex Crown of Glory","mythic"],["headwear_frost_beanie","Frostbite Knit Beanie","rare"],["headwear_lava_snapback","Lava Flow Snapback","rare"],["headwear_bassline_cans","Bassline Studio Cans","epic"],["headwear_obsidian_crown","Obsidian Warlord Crown","legendary"],["headwear_seraph_halo","Seraph Halo","mythic"],["eyewear_pixel_shades","8-Bit Pixel Shades","uncommon"],["eyewear_cyber_hud","Targeting Monocle","rare"],["eyewear_speed_shades","Velocity Aviators","epic"],["eyewear_round_specs","Scholar Round Specs","common"],["eyewear_ruby_shades","Ruby Laser Shades","rare"],["eyewear_prism_visor","Prism Wrap Visor","legendary"],["back_cyber_wings","Plasma Light Wings","mythic"],["back_katana","Shadow Katana Scabbard","epic"],["back_skateboard","Grip-Tape Hoverboard","rare"],["back_jade_blade","Jade Spirit Blade","epic"],["back_midnight_cape","Midnight Champion Cape","epic"],["back_ember_wings","Ember Phoenix Wings","legendary"],["back_rocket_pack","Rocket Jetpack MK-II","legendary"],["trail_cyan_spark","Cyan Ion Trail","rare"],["trail_crimson_burn","Phoenix Crimson Flare","epic"],["trail_golden_dust","Stardust Aureum","legendary"],["trail_bubblepop","Bubblepop Trail","rare"],["trail_matrix_rain","Matrix Rain","epic"],["trail_rainbow_rush","Rainbow Rush","legendary"],["trail_void_rift","Void Rift","mythic"],["pose_ready","Combat Ready","common"],["pose_victory_flex","Champion Flex","uncommon"],["pose_peace_sign","Chill Peace","uncommon"],["banner_rookie","Arcade Grid","common"],["banner_neon_city","Neo-Tokyo Sunset","uncommon"],["banner_grandmaster","Grandmaster Gold","legendary"]];
export const COSMETICS: Cosmetic[] = RAW.map(([id, name, rarity]) => ({ id, name, rarity, slot: SLOT[id.split('_')[0]] }));
export const itemImage = (id: string) => `/items/${id}.webp`;
export const cosmetic = (id: string) => COSMETICS.find((c) => c.id === id)!;

export const COLLECTIONS = [
  { name: 'Neon Circuit', tagline: 'Wired for the grid.', items: ['shirt_neon_mech', 'headwear_cyber_visor', 'hair_cyber_undercut', 'shirt_circuit_tee'] },
  { name: 'Inferno', tagline: 'Bring the heat.', items: ['shirt_inferno_jersey', 'shoes_magma_step', 'back_ember_wings', 'headwear_lava_snapback'] },
  { name: 'Frostbite', tagline: 'Ice in the veins.', items: ['shirt_aurora_holo', 'shoes_glacier_kicks', 'headwear_frost_beanie', 'trail_cyan_spark'] },
  { name: 'Royal Gold', tagline: 'Built for champions.', items: ['headwear_crown', 'shirt_champion_jacket', 'shoes_gold_cleats', 'headwear_seraph_halo'] },
  { name: 'Void', tagline: 'From the far side.', items: ['shoes_void_walkers', 'trail_void_rift', 'headwear_obsidian_crown', 'back_katana'] },
  { name: 'Street Classics', tagline: 'Everyday legends.', items: ['headwear_snapback', 'pants_raw_denim', 'shirt_checker_retro', 'back_skateboard'] },
];

export const SEASON_PASS = [
  { tier: 1, xp: 100, free: '200 Rival Coins', vip: '8-Bit Pixel Shades' },
  { tier: 2, xp: 250, free: '300 Rival Coins', vip: 'Cyan Ion Trail' },
  { tier: 3, xp: 450, free: 'Skater Slouch Beanie', vip: '600 Rival Coins' },
  { tier: 4, xp: 700, free: '500 Rival Coins', vip: 'Vector Carbon Top' },
  { tier: 5, xp: 1000, free: 'Champion Flex Emote', vip: 'Plasma Light Wings' },
];

export const WEEKLY_CHALLENGES = [
  { title: 'Duelist', text: 'Win 10 1v1 duels this week', reward: 600 },
  { title: 'Competitor', text: 'Finish 20 competitive matches', reward: 450 },
  { title: 'Cup Run', text: 'Play 3 cup runs', reward: 450 },
  { title: 'Regular', text: 'Play on 5 different days', reward: 450 },
  { title: 'Taskmaster', text: 'Claim 12 daily challenges', reward: 450 },
  { title: 'Grinder', text: 'Finish 40 runs in any mode', reward: 400 },
];

export const ACHIEVEMENT_GROUPS = [
  { group: 'Victories', items: ['First Victory', 'Contender', 'Veteran', 'Centurion', 'Champion'] },
  { group: 'Streaks', items: ['Heating Up', 'Unstoppable', 'Untouchable'] },
  { group: 'Participation', items: ['First Competition', 'Getting Started', 'Regular', 'Committed', 'Dedicated', 'Lifer'] },
  { group: 'Progression', items: ['Level 10', 'Level 25', 'Level 50', 'Level 100'] },
  { group: 'Elite', items: ['Master', 'Grandmaster', 'Rival Elite'] },
  { group: 'Ranked', items: ['Rising Star', 'Elite', 'Crowned'] },
  { group: 'Cups', items: ['Cup Winner', 'Cup Dynasty'] },
  { group: 'Social', items: ['First Friend', 'Squad'] },
];

/** XP needed to go from level L to L+1. */
export const xpForLevel = (l: number) => 200 + 25 * (l - 1);

export const FAQ: { q: string; a: string; group: string }[] = [
  { group: 'Getting started', q: 'What is RivalArcade?', a: 'RivalArcade is a free competitive arcade platform that runs in your phone or desktop browser. It has twelve short 3D skill games — from Dunk Rush basketball to Brick Blitz and FightNight boxing — with 1v1 duels, five-player live arenas, scheduled cups, a ranked ladder called RivalRank, Rival Coins and a cosmetic store for your 3D avatar.' },
  { group: 'Getting started', q: 'Is RivalArcade free?', a: 'Yes. Every game and every match mode is free to play. Rival Coin contests are free to enter and the prizes are paid by the house, so you never stake coins.' },
  { group: 'Getting started', q: 'Do I need to download anything?', a: 'No. RivalArcade runs in the browser — Safari, Chrome, Edge or Firefox. You can add it to your home screen for an app-like experience. For the best 3D performance, open it in your browser rather than inside a social app’s built-in browser.' },
  { group: 'Getting started', q: 'Why does sign-up ask for a phone number?', a: 'Each account is tied to one verified mobile number (sign-in is by phone code or Google, then phone verification). It keeps matches fair and makes multiple accounts much harder. Internet/VoIP numbers may not be accepted.' },
  { group: 'Fair play', q: 'Is it pay-to-win?', a: 'No. Rival Coins only buy cosmetics — outfits, trails, banners and emotes. Nothing you can unlock changes how a game plays or scores.' },
  { group: 'Fair play', q: 'How are matches kept fair?', a: 'Everyone in a contest plays the identical game seed, so the board, the targets and the pattern are the same for every player. Runs are timed and judged by the server; the app only sends a run token and a score, and scores the game couldn’t produce are rejected.' },
  { group: 'Fair play', q: 'What happens if I close the game mid-run?', a: 'Each competitive entry gets one run, and the score you had when you left counts. Practice is unlimited.' },
  { group: 'Rival Coins', q: 'Are Rival Coins worth real money?', a: 'No. Rival Coins are a cosmetic-only currency. They can’t be bought, withdrawn, sold or transferred between players, and they’re never staked on a match.' },
  { group: 'Rival Coins', q: 'How do I earn Rival Coins?', a: 'Daily logins, daily and weekly challenges, achievements, practice runs, duels, arenas and cups all pay Rival Coins. New accounts get a 1,000 RC welcome grant. Gameplay rewards are capped at 2,000 RC per UTC day.' },
  { group: 'Competitions', q: 'How do cups work?', a: 'Cups are scheduled score-attack tournaments. Everyone gets one run on the cup seed; when the window closes, the top seven places share a Rival Coin pool and the champion also takes that cup’s cosmetic prize.' },
  { group: 'Competitions', q: 'How does RivalRank work?', a: 'RivalRank is an Elo-style rating that moves with rated 1v1 results. After five placement matches you land in one of eight tiers, from Bronze to Rival Elite. Seasons run quarterly, with a soft reset halfway back toward 1200.' },
  { group: 'Technical', q: 'The 3D games won’t load. What can I do?', a: 'Update your browser, close other tabs and open RivalArcade in Safari or Chrome rather than an in-app browser. The game automatically switches to lighter 3D settings on older devices, and the help screen shows device-specific steps if it still can’t start.' },
  { group: 'This website', q: 'Is this website the game?', a: 'No — this is RivalArcade’s official news and information site. The game lives at rivalarcade.vercel.app, and every Play button here takes you straight there.' },
  { group: 'This website', q: 'Are there referral rewards?', a: 'Invite links are live so you can bring friends in. Any referral reward will be granted and verified inside the RivalArcade app only — this website never shows or holds balances.' },
];

export const NAV = [
  { href: '/games', label: 'Games' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/competitions', label: 'Compete' },
  { href: '/rewards', label: 'Rewards' },
  { href: '/news', label: 'News' },
  { href: '/community', label: 'Community' },
];

export const FOOTER_GROUPS = [
  { title: 'Play', links: [{ href: '/games', label: 'All games' }, { href: '/how-it-works', label: 'How it works' }, { href: '/competitions', label: 'Competitions' }, { href: '/tournaments', label: 'Tournaments' }, { href: '/progression', label: 'Player progression' }, { href: '/invite', label: 'Invite friends' }] },
  { title: 'Rewards', links: [{ href: '/rival-coins', label: 'Rival Coins' }, { href: '/rewards', label: 'Rewards & cosmetics' }, { href: '/gaming-leaderboards', label: 'Leaderboards' }, { href: '/gaming-rewards', label: 'Gaming rewards' }] },
  { title: 'Read', links: [{ href: '/news', label: 'News' }, { href: '/blog', label: 'Gaming blog' }, { href: '/newsletter', label: 'Newsletter' }, { href: '/newsletter/archive', label: 'Newsletter archive' }, { href: '/faq', label: 'FAQ' }] },
  { title: 'Company', links: [{ href: '/about', label: 'About' }, { href: '/community', label: 'Community' }, { href: '/creators', label: 'Creator partnerships' }, { href: '/advertise', label: 'Advertise & sponsor' }, { href: '/press', label: 'Press kit' }, { href: '/contact', label: 'Contact' }] },
];
