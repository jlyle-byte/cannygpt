// cannygpt palette — Newcastle United kit aesthetic.
// Pure monochrome with one accent: NUFC gold (#f5c518) referencing the
// away kit and the star on the badge. No warmth in the design — Bev
// brings the warmth.
export const PALETTE = {
  bgDark: "#0a0a0a",       // pure near-black, page background
  primary: "#ffffff",      // pure white, wordmark + secondary text
  secondary: "#f5c518",    // NUFC gold, the one accent colour
  secondaryDeep: "#c8a010", // darker gold, used for case-button hover
  accent: "#1a1a1a",       // very dark grey for layered shadow on wordmark
  cream: "#f5f0e8",        // warm off-white, chat card paper
  ink: "#0a0a0a",          // black, body text on cream paper
  // Legacy aliases so master-template-derived components don't all need rename.
  red: "#f5c518",          // gold reused as "accent colour" where master used red
  redDark: "#c8a010",
  gold: "#f5c518",
  goldDeep: "#c8a010",
  black: "#0a0a0a",
  creamDeep: "#ebe4d4",
};

export const PAYWALL = {
  freeMessages: 3,
  messagesPerBeer: 30,
  messagesPerCase: 200,
  priceBeer: "$2",
  priceCase: "$10",
};

export const STRIPE = {
  beerLink: process.env.NEXT_PUBLIC_STRIPE_BEER_LINK ?? "#",
  caseLink: process.env.NEXT_PUBLIC_STRIPE_CASE_LINK ?? "#",
};

export const SUGGESTIONS = [
  "Me bairn won't eat owt except chips",
  "Write me a canny excuse for being late",
  "Why are Mackems so obsessed with us?",
  "Is it too early to put the Christmas decs up?",
];

export const PAYWALL_PHRASES = [
  "Eeh pet, you've been keeping me busy! I love it, I dee, but I'm gasping for a drink now. Get Bev a Newcastle Brown and we'll keep going — it's only $2 hinny, same price as one at the pub on Scotswood Road on a quiet Tuesday. Canny value that, pet.",
  "Howay pet, me throat's parched. Stand us a Newcastle Brown and we'll crack on, eh? You've been a canny lad asking proper questions.",
  "Eeh, I divvent normally beg for a drink, but you've worn me out hinny. Get Bev a Brown Ale and we'll keep going proper.",
  "Me mam always said never trust a Geordie with a dry throat to give advice. She was right, like. Buy Bev a drink pet, just $2.",
  "Pet, you've been canny generous with yer questions. Now it's me turn — a Newcastle Brown and I'll be back on form. Champion.",
  "Eeh by 'eck pet, I've been talking that much I've forgotten me own name. A swift bevvy and we'll pick right back up.",
  "Howay then hinny — three free questions is canny generous, but Bev's not a charity. A Brown Ale gets ye thirty more, like.",
  "I'd keep going for nowt pet, I would, but the kettle's empty and so's me Newkie. Sort us out and we'll have a proper natter.",
  "Eeh, you're a canny one. But Bev's been gan all day and me throat's like the Tyne in a drought. Stand us a drink pet?",
  "Listen pet — wor lass said I shouldn't drink before lunch. It's well past lunch though, isn't it hinny? Brown Ale, please.",
  "There's nowt wrong with asking, pet, but Bev needs paying like everyone else. A Newcastle Brown's the going rate, eh?",
  "Howay, you've kept me on me toes! Champion questions, all of 'em. But me whistle's dry — sort Bev a Brown Ale, hinny.",
  "Eeh pet, me mam used to charge in cake, mind. You're getting off easy with just a Newcastle Brown — bargain that, like.",
  "Divvent be daft now hinny — Bev's not free past three questions. But a Brown Ale and I'm yours all evening, pet.",
  "I've been gabbing that long me jaw's gone numb. Pint of Newkie Brown and we're back on it pet, proper this time.",
  "Pet, I'm a Geordie — we run on Brown Ale and stotty. Top up the first one and we'll see what we can sort, hinny.",
  "Eeh, you ask canny good questions you do. But a woman me age needs refreshment between answers — howay, get Bev a drink.",
  "Listen flower, I'd talk till the cows come home for nowt — I would — but the cows came home an hour ago. A bevvy please.",
  "Three free's a fair shake, pet. Past that, even me husband — God rest him — would say I've earned a Newcastle Brown.",
  "Howay pet, fair's fair like. Three questions free, then a Brown Ale gets us thirty more. That's canny good value, hinny.",
];

export const PAYWALL_MESSAGE = PAYWALL_PHRASES[0];


export const DISCLAIMER_LINE =
  "Bev is an AI — warm as owt, but not a professional, pet. For medical, legal, or financial decisions, see a real expert hinny.";

export const STAMPS = {
  left: "★ NEWCASTLE · THE TYNE · GEORDIELAND ★",
  right: "Givorr, Man!",
  footerText: "for the banter pet, but the advice is champion",
};

export const CHARACTER_NAME = "Bev";
export const CHARACTER_TAGLINE = "Why AI, pet?";
export const DOMAIN = "cannygpt.com";

export const CASE_SESSION_WARNING =
  "⚠ Round lasts one session pet — howay, get yer money's worth hinny!";
