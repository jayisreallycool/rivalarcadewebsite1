/**
 * Search landing pages. Each targets one search intent with its own angle, copy and FAQ —
 * no templated keyword swaps. Add new ones here only when there is something distinct to say.
 */
export interface SeoPage {
  slug: string;
  keyword: string;
  title: string;
  description: string;
  kicker: string;
  h1: string;
  intro: string;
  highlightGames: string[];
  sections: { h: string; p: string[]; bullets?: string[] }[];
  faq: { q: string; a: string }[];
  related: string[];
}

export const SEO_PAGES: SeoPage[] = [
  {
    slug: 'free-online-competitive-games',
    keyword: 'free online competitive games',
    title: 'Free Online Competitive Games — Play Ranked 1v1s Free',
    description: 'Free online competitive games you can play in your browser: ranked 1v1 duels, five-player arenas and scheduled cups on identical seeds. No downloads, no entry fees, no pay-to-win.',
    kicker: 'Free competitive games',
    h1: 'Free online competitive games that are actually fair',
    intro: 'Most “free” competitive games make you pay somewhere — for power, for entry or for time. RivalArcade is free from top to bottom: twelve 3D skill games, ranked 1v1 duels, live arenas and cups, all free to enter, with prizes paid in a cosmetic currency by the house.',
    highlightGames: ['dunk-rush', 'fight-night', 'brick-blitz', 'cyber-reflex'],
    sections: [
      { h: 'What “free” means here', p: ['Every game, every mode and every cup in RivalArcade costs nothing to play. Rival Coin contests have no entry fee — the prizes come from the house, not from other players — so there is nothing to lose but rating points.', 'Rival Coins can’t be bought, so the competitive side can’t be bought either. They only unlock cosmetics, and no cosmetic changes how a game plays.'] },
      { h: 'Competition formats', p: ['RivalArcade turns short arcade games into proper competition:'], bullets: ['1v1 duels — one rival, the same seed, one run each. Higher score wins and rated duels move your RivalRank.', 'Live Arena — up to five players on one seed; the top three split a coin pool 50/30/20.', 'Cups — scheduled score-attack tournaments where the top seven are paid and the champion takes an exclusive cosmetic.', 'Practice — unlimited, solo and free on random seeds for learning.'] },
      { h: 'Why the same seed matters', p: ['In most arcade games each run is random, so a leaderboard mostly rewards luck and volume. In RivalArcade every player in a contest gets the identical game seed: the same bricks, the same fruit, the same targets in the same places. The only difference between two scores is how the two players played.'] },
      { h: 'Built for short sessions', p: ['Timed games last 60 seconds; endless games last as long as you survive. You can play a ranked duel while waiting for a coffee, and a cup run takes one attempt.'] },
    ],
    faq: [
      { q: 'Are there any paid entry fees?', a: 'No. All Rival Coin contests are free to enter and the house pays the prizes.' },
      { q: 'Can I pay to get stronger?', a: 'No. Rival Coins can’t be bought and only unlock cosmetics, which never affect gameplay or scoring.' },
      { q: 'Do I play real people?', a: 'Competitive modes match you against other players on the same seed. Practice is solo.' },
    ],
    related: ['/competitions', '/how-it-works', '/competitive-multiplayer-games'],
  },
  {
    slug: 'browser-gaming-platform',
    keyword: 'browser gaming platforms',
    title: 'Browser Gaming Platform — 12 Competitive 3D Games, No Download',
    description: 'RivalArcade is a browser gaming platform with 12 competitive 3D skill games, accounts, ranks, friends and a cosmetic store — all in Safari or Chrome. No app store, no install.',
    kicker: 'Browser gaming platform',
    h1: 'A full gaming platform that lives in your browser',
    intro: 'A browser game is one thing. A browser gaming platform has accounts, progression, social features and a reason to come back tomorrow. RivalArcade packs twelve 3D games, a ranked ladder, friends, notifications, a season pass and a cosmetic store into a site you open in Safari or Chrome.',
    highlightGames: ['canopy-swing', 'neon-dash', 'gem-surge', 'sky-stack'],
    sections: [
      { h: 'Everything a platform needs', p: ['RivalArcade isn’t a page of disconnected mini-games. One account carries across everything:'], bullets: ['A profile with your 3D avatar, RivalRank tier, level and stats', 'Friends, player search, blocking and private profiles', 'An in-app notification inbox for results, friend requests and rank changes', 'Daily and weekly challenges, 29 achievements and a season pass', 'A store with 74 cosmetics across six rarity tiers'] },
      { h: 'Real 3D in a browser tab', p: ['Every game is rendered in full 3D, most from a first-person view with your own avatar’s arms in shot. The renderer adapts to your device: capable GPUs get studio lighting and soft shadows, older phones automatically get lighter settings so the game stays smooth.'] },
      { h: 'Why browser-first', p: ['No app-store download means you can share a link and a friend can be playing seconds later. Updates arrive the moment they ship — no patch to install. And you can add RivalArcade to your home screen for a full-screen, app-like experience.'] },
      { h: 'Tips for the best experience', p: ['Open RivalArcade directly in Safari or Chrome rather than inside a social app’s built-in browser, keep your browser up to date and close heavy tabs before a ranked match.'] },
    ],
    faq: [
      { q: 'Which browsers work?', a: 'Current versions of Safari, Chrome, Edge and Firefox on phones, tablets and desktops.' },
      { q: 'Is there an app to download?', a: 'No download is needed. You can add RivalArcade to your home screen from your browser’s share menu.' },
      { q: 'Does my progress save?', a: 'Yes. Your account, rank, coins and cosmetics are stored on RivalArcade’s servers and follow you to any device you sign in on.' },
    ],
    related: ['/browser-based-gaming', '/games', '/about'],
  },
  {
    slug: 'online-gaming-competitions',
    keyword: 'online gaming competitions',
    title: 'Online Gaming Competitions — Free 1v1s, Arenas & Cups',
    description: 'Enter free online gaming competitions every day: 1v1 duels, five-player live arenas and scheduled cups where every player gets the same seed and one run.',
    kicker: 'Online competitions',
    h1: 'Online gaming competitions you can enter right now',
    intro: 'You don’t need a team, a schedule or a sign-up sheet to compete in RivalArcade. Pick a game, pick a format and you’re in a competition — against one rival, four rivals or a whole cup field.',
    highlightGames: ['dunk-rush', 'neon-dash', 'cyber-reflex', 'gem-surge'],
    sections: [
      { h: 'Three formats, one rule', p: ['Whatever the format, every entrant plays the identical seed and gets one run. That single rule is what makes a competition worth winning.'], bullets: ['1v1 duel: you play your run now, your rival plays the same seed, results arrive when both are done.', 'Live Arena: up to five players; 1st, 2nd and 3rd split a 70 RC pool 35/21/14.', 'Cup: a scheduled window, one run on the cup seed, a 600 RC pool across the top seven and a cosmetic for the champion.'] },
      { h: 'Scheduled cups', p: ['Cups rotate across games, each with its own badge and prize — the Neon Dash Grand Prix, the Sub-Zero 3-Point Shootout in Dunk Rush, the Matrix Reflex Championship, the Gem Surge Flash Cup and the Canopy Swing Classic. The Leagues tab in the app shows what’s open now.'] },
      { h: 'Crowns and leagues', p: ['Competitive results also earn crowns: +1 for a 1v1 win, +2 / +1 for 1st and 2nd in a Live Arena, and +3 / +2 / +1 for the top three in a cup. Crowns move you through the leagues from Bronze to Champion.'] },
      { h: 'Integrity checks', p: ['All scoring happens on the server. The app sends a run token and a score — never a reward or a result — and the server rejects scores that are faster or higher than the game allows. Unusually large jumps are reviewed before prizes are paid.'] },
    ],
    faq: [
      { q: 'How often are competitions held?', a: '1v1s and arenas are available whenever you want to play. Cups run on their own schedule, from three-hour flash cups to 24-hour majors.' },
      { q: 'What happens if I close the app mid-run?', a: 'Each competitive entry gets one run, and the score you had when you left counts.' },
      { q: 'What if two players tie?', a: 'A tied 1v1 pays each player 10 RC. Tied places in arenas and cups share the prize for those places.' },
    ],
    related: ['/tournaments', '/online-gaming-tournaments', '/competitions'],
  },
  {
    slug: 'free-esports-games',
    keyword: 'free esports games',
    title: 'Free Esports Games for Your Phone and Browser',
    description: 'Free esports-style games with ranked ladders, seasons, cups and leaderboards — RivalArcade brings competitive structure to quick 3D skill games you can play in a browser.',
    kicker: 'Free esports games',
    h1: 'Esports structure, arcade speed, zero cost',
    intro: 'Esports isn’t only about huge titles and pro teams. What makes a game competitive is structure: a fair format, a rating that means something, seasons, tournaments and a leaderboard worth climbing. RivalArcade builds all of that around quick 3D skill games anyone can pick up.',
    highlightGames: ['fight-night', 'brick-blitz', 'beat-tiles', 'slice-storm'],
    sections: [
      { h: 'A real ranked ladder', p: ['RivalRank is an Elo-style rating: everyone starts at 1200, rated 1v1s move it up or down depending on who you beat, and five placement matches put you into one of eight tiers — Bronze, Silver, Gold, Platinum, Diamond, Master, Grandmaster and Rival Elite.'] },
      { h: 'Seasons', p: ['Competitive seasons run by calendar quarter. At each new season ratings are softly reset halfway back toward 1200, and your previous season’s final and peak ratings are kept in your history.'] },
      { h: 'Tournaments', p: ['Scheduled cups are the tournament layer: a fixed window, one run each on the cup seed, prizes for the top seven and an exclusive cosmetic for the champion.'] },
      { h: 'Skill ceilings', p: ['Each game has simple controls and a high ceiling. In Dunk Rush the flame ball turns a 2-point swish into a 6; in Cyber Reflex the last ten seconds double every point; in Brick Blitz the shot clock shrinks from nine seconds to five as the stages get harder. Small edges decide matches.'] },
    ],
    faq: [
      { q: 'Is RivalArcade an esports title?', a: 'RivalArcade is a competitive arcade platform with esports-style structure — ranked play, seasons, cups and leaderboards — built around quick skill games.' },
      { q: 'Do I need a gaming PC?', a: 'No. RivalArcade runs in a phone or desktop browser and adapts its 3D quality to your device.' },
      { q: 'Are there per-game rankings?', a: 'Yes. Alongside your overall RivalRank you have a rating for each game, and the leaderboards can show the best players per game.' },
    ],
    related: ['/gaming-leaderboards', '/tournaments', '/progression'],
  },
  {
    slug: 'gaming-rewards',
    keyword: 'gaming rewards',
    title: 'Gaming Rewards — Earn Coins & Cosmetics by Playing',
    description: 'Earn gaming rewards just by playing: daily login streaks, daily and weekly challenges, 29 achievements, a season pass and cup prizes. Rival Coins unlock 74 cosmetics. No purchases needed.',
    kicker: 'Gaming rewards',
    h1: 'Gaming rewards you earn, not buy',
    intro: 'In RivalArcade every reward comes from playing. Log in, finish challenges, win matches and place in cups to earn Rival Coins and XP, then spend them on gear for your 3D avatar. There’s no shortcut to buy — which is exactly why rare items mean something.',
    highlightGames: ['canopy-swing', 'axe-spin', 'prism-hop', 'dunk-rush'],
    sections: [
      { h: 'Where rewards come from', p: [], bullets: ['A 1,000 RC welcome grant for new accounts', 'Daily login: 50 RC plus 10 RC per streak day, up to 100 RC', 'A fresh set of daily challenges every day', 'Weekly challenges from 400 to 600 RC, reset every Monday 00:00 UTC', '29 achievements worth 50 to 2,000 RC', '1v1, arena and cup prizes', 'A season pass with free and VIP reward tracks'] },
      { h: 'What rewards buy', p: ['Rival Coins unlock cosmetics: hair, tops, bottoms, shoes, headwear, eyewear, back gear, trails, emotes and banners. Prices follow rarity, from 500 RC for a Common item to 75,000–90,000 RC for a Mythic.'] },
      { h: 'A fair economy', p: ['Gameplay rewards are capped at 2,000 RC per UTC day, and rewarded matches against the same opponent are limited to three a day. Those limits stop farming and win-trading, so a Mythic item reflects weeks of real play — around seven to eight weeks of regular, active play by RivalArcade’s own economy model.'] },
      { h: 'What rewards are not', p: ['Rival Coins have no cash value. They can’t be bought, withdrawn, sold or transferred, and they’re never staked on a match.'] },
    ],
    faq: [
      { q: 'Can I buy Rival Coins?', a: 'No. Rival Coins can only be earned by playing.' },
      { q: 'Do rewards affect gameplay?', a: 'No. Everything you can unlock is cosmetic.' },
      { q: 'Is there a daily limit?', a: 'Yes — gameplay rewards are capped at 2,000 RC per UTC day.' },
    ],
    related: ['/rival-coins', '/rewards', '/progression'],
  },
  {
    slug: 'competitive-multiplayer-games',
    keyword: 'competitive multiplayer games',
    title: 'Competitive Multiplayer Games in Your Browser — Free',
    description: 'Competitive multiplayer games without lag or matchmaking queues: RivalArcade’s 1v1s, five-player arenas and cups put every player on the identical seed. Free to play in a browser.',
    kicker: 'Competitive multiplayer',
    h1: 'Multiplayer competition without the lag',
    intro: 'Real-time multiplayer lives and dies on connection quality. RivalArcade takes a different approach: every player in a match plays the same seed on their own device, and the server compares the results. No ping advantage, no desync — just who played better.',
    highlightGames: ['fight-night', 'dunk-rush', 'brick-blitz', 'neon-dash'],
    sections: [
      { h: 'How asynchronous multiplayer works', p: ['When you enter a 1v1 you play your run immediately. Your rival plays the identical seed — the same pattern, the same targets, the same timing — and when both runs are in, the higher score wins. Results appear in your Results tab and your notification inbox.', 'Because nobody is waiting on a live connection, a slow network can’t cost you a match, and you never sit in a lobby.'] },
      { h: 'Formats', p: [], bullets: ['1v1 duels for head-to-head rating', 'Live Arenas for up to five players, top three paid', 'Cups for a whole field on one seed'] },
      { h: 'Anti-cheat by architecture', p: ['The server times every run and computes every score, reward and rating. Impossible scores are rejected and suspicious jumps are reviewed. Accounts require a verified mobile number, one account per number.'] },
      { h: 'Anti win-trading', p: ['Rewarded matches against the same opponent are limited to three per day, so friends can’t farm each other for coins or rating.'] },
    ],
    faq: [
      { q: 'Do I need to be online at the same time as my opponent?', a: 'No. Each player plays the same seed on their own time; the result settles when both runs are in.' },
      { q: 'What if no one accepts my 1v1?', a: 'If nobody joins within 24 hours, the challenge closes and nothing is lost.' },
      { q: 'Can I challenge friends?', a: 'You can add friends, see their profiles and compare on the friends leaderboard.' },
    ],
    related: ['/competitions', '/free-online-competitive-games', '/community'],
  },
  {
    slug: 'online-gaming-tournaments',
    keyword: 'online gaming tournaments',
    title: 'Online Gaming Tournaments — Free Cups With Cosmetic Prizes',
    description: 'Free online gaming tournaments with exclusive cosmetic prizes. RivalArcade cups give every player one run on the same seed; the top seven are paid and the champion takes the cup item.',
    kicker: 'Online tournaments',
    h1: 'Online tournaments with one run to prove it',
    intro: 'A RivalArcade cup is the purest kind of tournament: one seed, one run each, everyone judged on exactly the same game. When the window closes, the leaderboard is final.',
    highlightGames: ['neon-dash', 'dunk-rush', 'cyber-reflex', 'canopy-swing'],
    sections: [
      { h: 'The cup format', p: ['Cups are score-attack tournaments. You join during the cup window and play one run on the cup seed. Your score goes on the cup leaderboard; when the window closes, the cup settles automatically.'], bullets: ['Free to enter', 'One run per player', 'A 600 RC pool shared by the top seven', 'An exclusive cosmetic for the champion (or 300 RC if they already own it)', '+3 / +2 / +1 crowns for the top three'] },
      { h: 'Current cup rotation', p: ['Cups currently rotate across five games, each with its own champion prize:'], bullets: ['Neon Dash Grand Prix (Daily Cup) — Phoenix Crimson Flare trail', 'Sub-Zero 3-Point Shootout in Dunk Rush (Pro Bracket) — Aureus Court Cleats', 'Matrix Reflex Championship in Cyber Reflex (Weekly Major) — Velocity Aviators', 'Gem Surge Flash Cup (Flash) — Arcade 1989 Windbreaker', 'Canopy Swing Classic (New Game Cup) — Jade Spirit Blade'] },
      { h: 'How to prepare', p: ['Practice is free and unlimited on random seeds, so warm up first. Read the ready card for the scoring chips — knowing which actions are worth 3 or 5 points is often the difference between 4th and 1st.'] },
    ],
    faq: [
      { q: 'How long does a cup last?', a: 'It depends on the cup — from three-hour flash cups to 24-hour majors.' },
      { q: 'Can I replay my cup run?', a: 'No. Each player gets exactly one run on the cup seed.' },
      { q: 'Are bracket tournaments available?', a: 'Not yet. Cups are score-attack today; bracket formats are not built yet.' },
    ],
    related: ['/tournaments', '/online-gaming-competitions', '/rewards'],
  },
  {
    slug: 'browser-based-gaming',
    keyword: 'browser-based gaming',
    title: 'Browser-Based Gaming in 3D — Play Instantly on Any Device',
    description: 'Browser-based gaming has caught up: RivalArcade runs full 3D skill games in Safari and Chrome with adaptive graphics, touch controls and instant updates. Play free, no install.',
    kicker: 'Browser-based gaming',
    h1: 'Browser-based gaming, rendered in full 3D',
    intro: 'Browser games used to mean flat Flash clones. Modern browsers can run real 3D, and RivalArcade uses it: first-person games with your own avatar’s arms in view, dynamic lighting, particle effects and physics — all from a link.',
    highlightGames: ['canopy-swing', 'brick-blitz', 'fight-night', 'beat-tiles'],
    sections: [
      { h: 'Designed for touch first', p: ['Every control is a natural phone gesture: flick to shoot in Dunk Rush, swipe lanes in Neon Dash, drag and release to aim in Brick Blitz, hold and let go in Canopy Swing, swipe to slice in Slice Storm. On desktop the same games play with a mouse.'] },
      { h: 'Adaptive graphics', p: ['Capable GPUs get studio lighting, soft shadows and reflections. Weaker GPUs get standard materials and fewer lights. If a phone’s driver refuses the first graphics settings, the renderer retries with plainer ones — and if 3D still can’t start, the help screen gives device-specific steps.'] },
      { h: 'Instant updates', p: ['There’s nothing to patch. New games, balance changes and fixes are live as soon as they ship — like the Canopy Swing launch, the Brick Blitz stage update and the new How to Play cards.'] },
      { h: 'Install-free, but app-like', p: ['Add RivalArcade to your home screen and it opens full screen, edge to edge, with its own icon.'] },
    ],
    faq: [
      { q: 'Will it drain my battery?', a: 'RivalArcade lowers frame rate and effects on weaker devices and pauses music when the app is in the background. Rounds are short by design.' },
      { q: 'Why won’t 3D load inside TikTok or Instagram?', a: 'In-app browsers often limit graphics. Open the link in Safari or Chrome instead.' },
      { q: 'Does it work offline?', a: 'No — competitive play and saving progress need a connection.' },
    ],
    related: ['/browser-gaming-platform', '/games', '/faq'],
  },
  {
    slug: 'gaming-leaderboards',
    keyword: 'gaming leaderboards',
    title: 'Gaming Leaderboards — Season, Weekly, Friends & Per-Game',
    description: 'RivalArcade gaming leaderboards rank players by season rating, all-time peak, wins, win streak, XP, this week, this month, friends and per game — built only from settled results.',
    kicker: 'Gaming leaderboards',
    h1: 'Leaderboards that are built from real results',
    intro: 'A leaderboard is only as honest as the scores behind it. RivalArcade’s boards are built exclusively from settled, server-judged results, and banned players never appear on them.',
    highlightGames: ['dunk-rush', 'gem-surge', 'axe-spin', 'cyber-reflex'],
    sections: [
      { h: 'Every way to rank', p: [], bullets: ['Season rating — your current RivalRank', 'All-time peak — the highest rating you’ve ever reached', 'Wins and win streak', 'XP — who has played the most', 'This week and this month', 'Friends — just you and the people you’ve added', 'Per game — the best Dunk Rush player, the best Brick Blitz player and so on'] },
      { h: 'Why same-seed scores belong on a leaderboard', p: ['Because contest entrants play identical seeds, scores within a contest are directly comparable. Combined with server-side timing and scoring, that keeps the top of each board meaningful.'] },
      { h: 'The podium', p: ['The top three on each board stand on a podium with their 3D avatars — so the best players are also the best-dressed.'] },
      { h: 'Climbing tips', p: ['Your per-game ratings show where you’re strongest. Focus ranked play there, use free practice to improve the rest and watch for the bonus actions each game labels on screen.'] },
    ],
    faq: [
      { q: 'How often do leaderboards update?', a: 'They’re built from settled results, so a match counts as soon as it settles.' },
      { q: 'Can I hide from the leaderboards?', a: 'You can make your profile private and block players.' },
      { q: 'Do practice runs count?', a: 'No. Leaderboards use settled competitive results.' },
    ],
    related: ['/progression', '/free-esports-games', '/community'],
  },
  {
    slug: 'free-gaming-community',
    keyword: 'free gaming communities',
    title: 'Free Gaming Community — Friends, Rivals & Creator Cups',
    description: 'Join a free gaming community built around fair competition: add friends, compare on friends leaderboards, follow RivalArcade news and creator events. Safe by default, with blocking and reports.',
    kicker: 'Free gaming community',
    h1: 'A gaming community built on fair play',
    intro: 'Communities form around shared moments — a buzzer-beater swish, a cup won on the last run, a Mythic finally unlocked. RivalArcade gives players those moments and the tools to share them, for free.',
    highlightGames: ['slice-storm', 'sky-stack', 'prism-hop', 'neon-dash'],
    sections: [
      { h: 'In the app', p: [], bullets: ['Player search and friend requests', 'Friends leaderboard', 'Public profiles with 3D avatars, rank and stats', 'Notifications for results, requests, level-ups and rank changes', 'Private profiles, blocking and rate-limited reporting'] },
      { h: 'Beyond the app', p: ['Follow RivalArcade’s news and newsletter for cup announcements, feature updates and guides. Creators can apply to host sponsored competitions and get their own tracked invite links.'] },
      { h: 'Safety', p: ['Blocked players can’t find you in search or send you requests. Reports go to the RivalArcade team for review, and players who are suspended disappear from every leaderboard.'] },
      { h: 'Bring your friends', p: ['Share an invite link from the Invite page. Friends open the game straight from your link, and you can add each other in the app.'] },
    ],
    faq: [
      { q: 'Is there in-app chat?', a: 'Not yet. Direct messaging isn’t built yet; friends, profiles and leaderboards are.' },
      { q: 'Can I join as a creator?', a: 'Yes — apply on the Creator Partnerships page.' },
      { q: 'How do I report someone?', a: 'Use the report option on their profile in the app.' },
    ],
    related: ['/community', '/invite', '/creators'],
  },
];

export const seoPage = (slug: string) => SEO_PAGES.find((p) => p.slug === slug);
