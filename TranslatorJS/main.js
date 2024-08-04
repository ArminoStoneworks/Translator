// Articles and irregular verbs mapping
const articles = {
  the: "'l",
};

const irregularVerbs = {
  ate: "eated",
  slept: "sleeped",
  would: "willed",
};

const customSuffixes = {
  Jaramah: {
    ing: "'am",
    ed: "'iyam",
    s: "'ah",
    es: "'uh",
    en: "'na",
    n: "'esh",
    ly: "'ren",
    y: "'el",
    ment: "'raj",
  },
  Zonrazeh: {
    ing: "'am",
    ed: "'iyam",
    s: "'ah",
    es: "'uh",
    en: "'na",
    n: "'esh",
    ly: "'ren",
    y: "'el",
    ment: "'raj",
  },
};

// Custom script mapping
const languageScript = {
  0: "·",
  1: "১",
  2: "१",
  3: "௨",
  4: "๘",
  5: "𓂅",
  6: "ḇ",
  7: "θ",
  8: "ʎ",
  9: "੯",
  10: "১·",
  A: "Ӄ",
  E: "Ʒ",
  K: "x̄",
  Y: "Ɣ",
  I: "Ɣ",
  O: "𐡊",
  U: "𐡐",
  S: "पऽ",
  B: "ⵖ",
  D: "ܠ",
  V: "ᔱ",
  T: "Y",
  P: "ᖿ",
  J: "¿",
  Z: "ⴼ",
  M: "ᚖ",
  N: "ሐ",
  L: "ᒬ",
  R: "U",
  W: "𐡐ᔱ",
  F: "ɨ",
  G: "𐡄",
  ",": ",",
  ".": ".",
  "'": "'",
  ";": ";",
  ":": ":",
  "-": "-",
  "!": "!",
  "?": "?",
  "(": "(",
  ")": ")",
  "[": "[",
  "]": "]",
  "{": "{",
  "}": "}",
  "<": "<",
  ">": ">",
  "/": "/",
  '"': '"',
  "\\": "\\",
  "|": "|",
  "`": "`",
  "~": "~",
  OO: "𐡐",
  KH: "ऽ",
  TH: "𐤇",
  SH: "𐤉",
};

// Function to convert text to custom script
function convertToScript(text) {
  return Array.from(text)
    .map((char) => languageScript[char.toUpperCase()] || char)
    .join("");
}

function btnClicked() {
  const inputText = document.getElementById("inputText").value.toLowerCase();
  const selectedLanguage = document.getElementById("language").value;

  let translatedText = "";
  const words = inputText.split(" ");

  for (let i = 0; i < words.length; i++) {
    let word = words[i];

    // Check if the word is an article and the selected language is Zonrazeh
    if (selectedLanguage === "Zonrazeh" && articles[word]) {
      const nextWord = words[i + 1];
      if (nextWord) {
        // Translate the next word and attach the article as a suffix for Zonrazeh
        const translatedNextWord = translateWord(nextWord, selectedLanguage);
        translatedText += translatedNextWord + articles[word] + " ";
        i++; // Skip the next word as it's already handled
      }
    } else {
      // Standard translation process
      const translatedWord = translateWord(word, selectedLanguage);
      translatedText += translatedWord + " ";
    }
  }

  document.getElementById("translatedText").innerText = translatedText.trim();
  document.getElementById("scriptText").innerText = convertToScript(
    translatedText.trim()
  );
}

function translateWord(word, language) {
  // Check for exact matches in translation data first
  if (translationData[word]) {
    return translationData[word][language];
  }

  // Check for irregular verbs
  const { rootWord, suffix } = getRootWordAndSuffix(word);
  const translatedRootWord = translationData[rootWord]
    ? translationData[rootWord][language]
    : rootWord;

  return applyCustomSuffix(translatedRootWord, suffix, language);
}

function getRootWordAndSuffix(word) {
  // Check for irregular verbs first
  if (irregularVerbs[word]) {
    word = irregularVerbs[word];
  }

  // Suffix check
  if (word.endsWith("ing")) {
    return { rootWord: word.slice(0, -3), suffix: "ing" };
  } else if (word.endsWith("ed")) {
    return { rootWord: word.slice(0, -2), suffix: "ed" };
  } else if (word.endsWith("s")) {
    return { rootWord: word.slice(0, -1), suffix: "s" };
  } else if (word.endsWith("es")) {
    return { rootWord: word.slice(0, -2), suffix: "es" };
  } else if (word.endsWith("n")) {
    return { rootWord: word.slice(0, -1), suffix: "n" };
  } else if (word.endsWith("en")) {
    return { rootWord: word.slice(0, -2), suffix: "en" };
  } else if (word.endsWith("ly")) {
    return { rootWord: word.slice(0, -2), suffix: "ly" };
  } else if (word.endsWith("y")) {
    return { rootWord: word.slice(0, -1), suffix: "y" };
  } else if (word.endsWith("ment")) {
    return { rootWord: word.slice(0, -4), suffix: "ment" };
  }

  return { rootWord: word, suffix: "" };
}

function applyCustomSuffix(word, suffix, language) {
  if (!suffix) return word;

  const customSuffix = customSuffixes[language][suffix];
  return word + (customSuffix || suffix); // Use custom suffix or default to original if not defined
}

// Translation data structure

const translationData = {
  bed: {
    Jaramah: "tahkt",
    Zonrazeh: "takt",
  },
  will: {
    Jaramah: "ehb",
    Zonrazeh: "eb",
  },
  your: {
    Jaramah: "tohro",
    Zonrazeh: "thooro",
  },
  should: {
    Jaramah: "shayad",
    Zonrazeh: "shayad",
  },
  could: {
    Jaramah: "yuuri",
    Zonrazeh: "yuuri",
  },
  body: {
    Jaramah: "bahdahn",
    Zonrazeh: "badan",
  },
  bone: {
    Jaramah: "khoon",
    Zonrazeh: "khoon",
  },
  tooth: {
    Jaramah: "dahn",
    Zonrazeh: "dan",
  },
  teeth: {
    Jaramah: "dahnah",
    Zonrazeh: "dana",
  },
  ear: {
    Jaramah: "ghoosh",
    Zonrazeh: "goosh",
  },
  eye: {
    Jaramah: "zheh",
    Zonrazeh: "zasho",
  },
  foot: {
    Jaramah: "uran",
    Zonrazeh: "uwad",
  },
  hand: {
    Jaramah: "oosan",
    Zonrazeh: "usan",
  },
  head: {
    Jaramah: "ras",
    Zonrazeh: "tado",
  },
  heart: {
    Jaramah: "lob",
    Zonrazeh: "slai",
  },
  limb: {
    Jaramah: "ur",
    Zonrazeh: "gaib",
  },
  mouth: {
    Jaramah: "aahm",
    Zonrazeh: "maa",
  },
  mind: {
    Jaramah: "maghz",
    Zonrazeh: "elesen",
  },
  brain: {
    Jaramah: "maghz",
    Zonrazeh: "elesen",
  },
  nose: {
    Jaramah: "prom",
    Zonrazeh: "anf",
  },
  face: {
    Jaramah: "sur",
    Zonrazeh: "yim",
  },
  direction: {
    Jaramah: "sur",
    Zonrazeh: "yim",
  },
  orientation: {
    Jaramah: "sur",
    Zonrazeh: "yim",
  },
  horn: {
    Jaramah: "shak",
    Zonrazeh: "badin",
  },
  antler: {
    Jaramah: "shok",
    Zonrazeh: "dajak",
  },
  tongue: {
    Jaramah: "zaf",
    Zonrazeh: "rehal",
  },
  veins: {
    Jaramah: "badya",
    Zonrazeh: "bada",
  },
  blood: {
    Jaramah: "beya",
    Zonrazeh: "bea",
  },
  air: {
    Jaramah: "joo",
    Zonrazeh: "ju",
  },
  amethyst: {
    Jaramah: "yazhed",
    Zonrazeh: "yazhid",
  },
  andesite: {
    Jaramah: "klon",
    Zonrazeh: "bired",
  },
  brick: {
    Jaramah: "tloop",
    Zonrazeh: "tup",
  },
  coal: {
    Jaramah: "mang",
    Zonrazeh: "haba",
  },
  copper: {
    Jaramah: "hakoog",
    Zonrazeh: "hakug",
  },
  diamond: {
    Jaramah: "almas",
    Zonrazeh: "haajmy",
  },
  diorite: {
    Jaramah: "shlon",
    Zonrazeh: "izdene",
  },
  electricity: {
    Jaramah: "bargh",
    Zonrazeh: "vushafa",
  },
  ember: {
    Jaramah: "desh",
    Zonrazeh: "bary",
  },
  emerald: {
    Jaramah: "halmas",
    Zonrazeh: "hadu",
  },
  fire: {
    Jaramah: "vush",
    Zonrazeh: "vush",
  },
  flame: {
    Jaramah: "fesh",
    Zonrazeh: "esh",
  },
  glass: {
    Jaramah: "sheesheh",
    Zonrazeh: "jaam",
  },
  gold: {
    Jaramah: "talah",
    Zonrazeh: "hamya",
  },
  granite: {
    Jaramah: "ghlon",
    Zonrazeh: "shedeken",
  },
  iron: {
    Jaramah: "ahan",
    Zonrazeh: "hasda",
  },
  lapis: {
    Jaramah: "behlon",
    Zonrazeh: "haaj",
  },
  lava: {
    Jaramah: "vishazh",
    Zonrazeh: "sraha",
  },
  lightning: {
    Jaramah: "rhaad",
    Zonrazeh: "dejyr",
  },
  mineral: {
    Jaramah: "hahlon",
    Zonrazeh: "ha",
  },
  paper: {
    Jaramah: "kha",
    Zonrazeh: "thel",
  },
  quartz: {
    Jaramah: "qilon",
    Zonrazeh: "haja",
  },
  redstone: {
    Jaramah: "rhelon",
    Zonrazeh: "habaru",
  },
  rock: {
    Jaramah: "loni",
    Zonrazeh: "ra",
  },
  ruby: {
    Jaramah: "dalmas",
    Zonrazeh: "habea",
  },
  quicksand: {
    Jaramah: "worja",
    Zonrazeh: "jeat",
  },
  shiningsand: {
    Jaramah: "shohk",
    Zonrazeh: "seejar",
  },
  sand: {
    Jaramah: "amook",
    Zonrazeh: "ram",
  },
  ediblesand: {
    Jaramah: "yimmeh",
    Zonrazeh: "fokhda",
  },
  sandstone: {
    Jaramah: "shilon",
    Zonrazeh: "ramhas",
  },
  sapphire: {
    Jaramah: "salmas",
    Zonrazeh: "shagaf",
  },
  silver: {
    Jaramah: "manghani",
    Zonrazeh: "manghani",
  },
  stone: {
    Jaramah: "lon",
    Zonrazeh: "hasda",
  },
  tear: {
    Jaramah: "tahb",
    Zonrazeh: "nar",
  },
  water: {
    Jaramah: "sigta",
    Zonrazeh: "sigtam",
  },
  wealth: {
    Jaramah: "waj",
    Zonrazeh: "uaj",
  },
  wind: {
    Jaramah: "bahd",
    Zonrazeh: "jun",
  },
  wood: {
    Jaramah: "choob",
    Zonrazeh: "daj",
  },
  essence: {
    Jaramah: "vas",
    Zonrazeh: "vare",
  },
  core: {
    Jaramah: "vas",
    Zonrazeh: "vare",
  },
  substance: {
    Jaramah: "zheb",
    Zonrazeh: "kanasab",
  },
  matter: {
    Jaramah: "zheb",
    Zonrazeh: "kanasab",
  },
  riverbank: {
    Jaramah: "radha",
    Zonrazeh: "radha",
  },
  bar: {
    Jaramah: "guefa",
    Zonrazeh: "guefa",
  },
  basin: {
    Jaramah: "asbacri",
    Zonrazeh: "asbakry",
  },
  bay: {
    Jaramah: "oojan",
    Zonrazeh: "ojan",
  },
  beach: {
    Jaramah: "ahjarram",
    Zonrazeh: "ajaram",
  },
  chasm: {
    Jaramah: "jak",
    Zonrazeh: "jak",
  },
  valley: {
    Jaramah: "anjo",
    Zonrazeh: "jajoo",
  },
  canyon: {
    Jaramah: "brata",
    Zonrazeh: "brata",
  },
  cape: {
    Jaramah: "kapeh",
    Zonrazeh: "kape",
  },
  cave: {
    Jaramah: "hasahu",
    Zonrazeh: "hasahu",
  },
  coast: {
    Jaramah: "vehr'ram",
    Zonrazeh: "iyula",
  },
  country: {
    Jaramah: "ilrajed",
    Zonrazeh: "ilrajed",
  },
  desert: {
    Jaramah: "ankoo",
    Zonrazeh: "anda",
  },
  eclipse: {
    Jaramah: "jalim",
    Zonrazeh: "jalim",
  },
  environment: {
    Jaramah: "jan",
    Zonrazeh: "jan",
  },
  field: {
    Jaramah: "ta",
    Zonrazeh: "ta",
  },
  forest: {
    Jaramah: "doon",
    Zonrazeh: "dun",
  },
  hill: {
    Jaramah: "tijid",
    Zonrazeh: "tijid",
  },
  island: {
    Jaramah: "jira",
    Zonrazeh: "zeera",
  },
  lake: {
    Jaramah: "sirdar",
    Zonrazeh: "murifaji",
  },
  land: {
    Jaramah: "majmaj",
    Zonrazeh: "bejartaj",
  },
  location: {
    Jaramah: "amenoh",
    Zonrazeh: "ameno",
  },
  moon: {
    Jaramah: "krishan",
    Zonrazeh: "kameersa",
  },
  mountain: {
    Jaramah: "jad",
    Zonrazeh: "jad",
  },
  mountainrange: {
    Jaramah: "mekjad",
    Zonrazeh: "mekjad",
  },
  f: {
    Jaramah: "ooda",
    Zonrazeh: "weeda",
  },
  nether: {
    Jaramah: "navur",
    Zonrazeh: "navur",
  },
  ocean: {
    Jaramah: "ahjan",
    Zonrazeh: "ajan",
  },
  sea: {
    Jaramah: "ahjtatoon",
    Zonrazeh: "ajtatun",
  },
  peninsula: {
    Jaramah: "vearal",
    Zonrazeh: "vearal",
  },
  place: {
    Jaramah: "da",
    Zonrazeh: "da",
  },
  plains: {
    Jaramah: "kor",
    Zonrazeh: "kor",
  },
  grasslands: {
    Jaramah: "kor",
    Zonrazeh: "kor",
  },
  plateau: {
    Jaramah: "krib",
    Zonrazeh: "krib",
  },
  pond: {
    Jaramah: "ahjin",
    Zonrazeh: "ajin",
  },
  ravine: {
    Jaramah: "fehrda",
    Zonrazeh: "ferda",
  },
  river: {
    Jaramah: "ahjen",
    Zonrazeh: "ajen",
  },
  heavens: {
    Jaramah: "shafa",
    Zonrazeh: "shafa",
  },
  sky: {
    Jaramah: "haam",
    Zonrazeh: "haam",
  },
  sun: {
    Jaramah: "asham",
    Zonrazeh: "ahsem",
  },
  sunlight: {
    Jaramah: "vusham",
    Zonrazeh: "vusham",
  },
  star: {
    Jaramah: "bash",
    Zonrazeh: "bash",
  },
  strait: {
    Jaramah: "shaseh",
    Zonrazeh: "ahjasm",
  },
  swamp: {
    Jaramah: "teolash",
    Zonrazeh: "teolash",
  },
  tide: {
    Jaramah: "ipyapeh",
    Zonrazeh: "ipiape",
  },
  currents: {
    Jaramah: "ipyapeh",
    Zonrazeh: "ipiape",
  },
  tower: {
    Jaramah: "tawak",
    Zonrazeh: "tauak",
  },
  volcano: {
    Jaramah: "arall",
    Zonrazeh: "aral",
  },
  waterfall: {
    Jaramah: "ahjamav",
    Zonrazeh: "ajamav",
  },
  reality: {
    Jaramah: "tabanaj",
    Zonrazeh: "tabanaj",
  },
  universe: {
    Jaramah: "rajnaj",
    Zonrazeh: "rajnaj",
  },
  world: {
    Jaramah: "tabaha",
    Zonrazeh: "tabaha",
  },
  earth: {
    Jaramah: "tabaha",
    Zonrazeh: "tabaha",
  },
  arena: {
    Jaramah: "galej",
    Zonrazeh: "galej",
  },
  capital: {
    Jaramah: "haralam",
    Zonrazeh: "harash",
  },
  chamber: {
    Jaramah: "sehkim",
    Zonrazeh: "sekim",
  },
  citadel: {
    Jaramah: "jadaseh",
    Zonrazeh: "jadasee",
  },
  farm: {
    Jaramah: "thesehi",
    Zonrazeh: "thesehi",
  },
  fort: {
    Jaramah: "feman",
    Zonrazeh: "feema",
  },
  house: {
    Jaramah: "sehu",
    Zonrazeh: "sehu",
  },
  home: {
    Jaramah: "nuhzer",
    Zonrazeh: "berak",
  },
  library: {
    Jaramah: "joon",
    Zonrazeh: "joonat",
  },
  market: {
    Jaramah: "kawat",
    Zonrazeh: "khasri",
  },
  mine: {
    Jaramah: "sgimeh",
    Zonrazeh: "shesruj",
  },
  room: {
    Jaramah: "nenav",
    Zonrazeh: "nenav",
  },
  shop: {
    Jaramah: "sooj",
    Zonrazeh: "suj",
  },
  store: {
    Jaramah: "mateh",
    Zonrazeh: "mateh",
  },
  site: {
    Jaramah: "gis",
    Zonrazeh: "gis",
  },
  stable: {
    Jaramah: "tabit",
    Zonrazeh: "tabit",
  },
  storage: {
    Jaramah: "ajajreh",
    Zonrazeh: "ajajre",
  },
  city: {
    Jaramah: "setvahj",
    Zonrazeh: "eshvi",
  },
  town: {
    Jaramah: "setvahj",
    Zonrazeh: "eshvi",
  },
  village: {
    Jaramah: "damah",
    Zonrazeh: "dama",
  },
  way: {
    Jaramah: "ieg",
    Zonrazeh: "eka",
  },
  trail: {
    Jaramah: "ieg",
    Zonrazeh: "eka",
  },
  road: {
    Jaramah: "ieg",
    Zonrazeh: "eka",
  },
  route: {
    Jaramah: "ieg",
    Zonrazeh: "eka",
  },
  afternoon: {
    Jaramah: "foot",
    Zonrazeh: "fut",
  },
  season: {
    Jaramah: "bahkri",
    Zonrazeh: "hejal",
  },
  calendar: {
    Jaramah: "gohnje",
    Zonrazeh: "jedyn",
  },
  timeofday: {
    Jaramah: "yahm",
    Zonrazeh: "yam",
  },
  day: {
    Jaramah: "deen",
    Zonrazeh: "dyn",
  },
  era: {
    Jaramah: "ahmdai",
    Zonrazeh: "jahan",
  },
  evening: {
    Jaramah: "mahk",
    Zonrazeh: "mak",
  },
  morning: {
    Jaramah: "deeta",
    Zonrazeh: "deva",
  },
  night: {
    Jaramah: "shindu",
    Zonrazeh: "shindu",
  },
  midnight: {
    Jaramah: "bel'shi",
    Zonrazeh: "bel'shi",
  },
  dawn: {
    Jaramah: "vamun",
    Zonrazeh: "vamun",
  },
  dusk: {
    Jaramah: "ilak",
    Zonrazeh: "ilak",
  },
  noon: {
    Jaramah: "bel'yahm",
    Zonrazeh: "bel'yam",
  },
  time: {
    Jaramah: "ahm",
    Zonrazeh: "am",
  },
  week: {
    Jaramah: "desadeen",
    Zonrazeh: "desadyn",
  },
  month: {
    Jaramah: "jadeen",
    Zonrazeh: "jadyn",
  },
  year: {
    Jaramah: "tajadeen",
    Zonrazeh: "tajadyn",
  },
  decade: {
    Jaramah: "jahje",
    Zonrazeh: "century",
  },
  ahanan: {
    Jaramah: "millenia",
    Zonrazeh: "sorfor",
  },
  period: {
    Jaramah: "shakam",
    Zonrazeh: "shakam",
  },
  moment: {
    Jaramah: "baram",
    Zonrazeh: "baram",
  },
  forever: {
    Jaramah: "darom",
    Zonrazeh: "rohsam",
  },
  never: {
    Jaramah: "zoram",
    Zonrazeh: "zoram",
  },
  now: {
    Jaramah: "soran",
    Zonrazeh: "sawor",
  },
  later: {
    Jaramah: "jooha",
    Zonrazeh: "juha",
  },
  soon: {
    Jaramah: "kadeh",
    Zonrazeh: "kade",
  },
  early: {
    Jaramah: "udeek",
    Zonrazeh: "udyk",
  },
  god: {
    Jaramah: "verjah",
    Zonrazeh: "verjah",
  },
  leadteacher: {
    Jaramah: "waj",
    Zonrazeh: "wajoh",
  },
  sectleader: {
    Jaramah: "waj",
    Zonrazeh: "wajoh",
  },
  understander: {
    Jaramah: "hambed",
    Zonrazeh: "habmed",
  },
  knowledgeable: {
    Jaramah: "nemen",
    Zonrazeh: "nemen",
  },
  priest: {
    Jaramah: "hambed",
    Zonrazeh: "habmed",
  },
  follower: {
    Jaramah: "zaniyyu",
    Zonrazeh: "zaniyyu",
  },
  believer: {
    Jaramah: "zaniyyu",
    Zonrazeh: "zaniyyu",
  },
  temple: {
    Jaramah: "majeo",
    Zonrazeh: "mae'bad",
  },
  prayer: {
    Jaramah: "manev",
    Zonrazeh: "manev",
  },
  spectre: {
    Jaramah: "shahbah",
    Zonrazeh: "shaba",
  },
  spirit: {
    Jaramah: "shahbah",
    Zonrazeh: "shaba",
  },
  ghost: {
    Jaramah: "shahbah",
    Zonrazeh: "shaba",
  },
  soul: {
    Jaramah: "muru",
    Zonrazeh: "mura",
  },
  prophet: {
    Jaramah: "vaktshoor",
    Zonrazeh: "vaktshoor",
  },
  messiah: {
    Jaramah: "vaktshoor",
    Zonrazeh: "vaktshoor",
  },
  benevolent: {
    Jaramah: "jenehr",
    Zonrazeh: "jener",
  },
  malevolent: {
    Jaramah: "kakehr",
    Zonrazeh: "kaker",
  },
  magic: {
    Jaramah: "nazyk",
    Zonrazeh: "kaker",
  },
  seer: {
    Jaramah: "meydyr",
    Zonrazeh: "meydyr",
  },
  oracle: {
    Jaramah: "meydyr",
    Zonrazeh: "meydyr",
  },
  ritual: {
    Jaramah: "tahk",
    Zonrazeh: "tak",
  },
  savory: {
    Jaramah: "letee y",
    Zonrazeh: "leeta",
  },
  sweet: {
    Jaramah: "tabik",
    Zonrazeh: "tabyk",
  },
  salty: {
    Jaramah: "toolee",
    Zonrazeh: "tal",
  },
  bitter: {
    Jaramah: "mau",
    Zonrazeh: "mau",
  },
  sour: {
    Jaramah: "asi",
    Zonrazeh: "asi",
  },
  umami: {
    Jaramah: "letee y",
    Zonrazeh: "leeta",
  },
  bread: {
    Jaramah: "teyas",
    Zonrazeh: "teyoos",
  },
  bakedpotato: {
    Jaramah: "bijetarro",
    Zonrazeh: "bijetarro",
  },
  beetrootsoup: {
    Jaramah: "hadatu'maka",
    Zonrazeh: "hadatu'maka",
  },
  cake: {
    Jaramah: "rujtabik",
    Zonrazeh: "rujtabik",
  },
  chickenmeat: {
    Jaramah: "tidis",
    Zonrazeh: "tedat",
  },
  chorusfruit: {
    Jaramah: "resatu",
    Zonrazeh: "roosatoo",
  },
  cookie: {
    Jaramah: "taki",
    Zonrazeh: "taky",
  },
  drink: {
    Jaramah: "gehrt",
    Zonrazeh: "gert",
  },
  liquid: {
    Jaramah: "hresab",
    Zonrazeh: "hresab",
  },
  goldencarrot: {
    Jaramah: "hamiatorr",
    Zonrazeh: "hamyatorr",
  },
  honey: {
    Jaramah: "ifajalaji",
    Zonrazeh: "mwesar",
  },
  juice: {
    Jaramah: "leetu",
    Zonrazeh: "lytu",
  },
  mushroom: {
    Jaramah: "vamtar",
    Zonrazeh: "vamtar",
  },
  pastry: {
    Jaramah: "tabik",
    Zonrazeh: "tabyk",
  },
  pie: {
    Jaramah: "bita",
    Zonrazeh: "batee",
  },
  pork: {
    Jaramah: "gondis",
    Zonrazeh: "goni",
  },
  pumpkinpie: {
    Jaramah: "kurib'bita",
    Zonrazeh: "koorebat",
  },
  steak: {
    Jaramah: "kofaltis",
    Zonrazeh: "kofaltis",
  },
  beef: {
    Jaramah: "kofaltis",
    Zonrazeh: "kofaltis",
  },
  rabbitstew: {
    Jaramah: "b'nuui'maka",
    Zonrazeh: "banoomak",
  },
  ramen: {
    Jaramah: "ramohj",
    Zonrazeh: "ramoj",
  },
  food: {
    Jaramah: "atev",
    Zonrazeh: "ateba",
  },
  happiness: {
    Jaramah: "hamul",
    Zonrazeh: "hamul",
  },
  sadness: {
    Jaramah: "warr",
    Zonrazeh: "uar",
  },
  anger: {
    Jaramah: "tegiz",
    Zonrazeh: "tegiz",
  },
  wistfulness: {
    Jaramah: "lesh",
    Zonrazeh: "lesh",
  },
  loneliness: {
    Jaramah: "botu",
    Zonrazeh: "botu",
  },
  excitement: {
    Jaramah: "wakiya",
    Zonrazeh: "uakya",
  },
  nervousness: {
    Jaramah: "sithaz",
    Zonrazeh: "sithaz",
  },
  worry: {
    Jaramah: "jilseg",
    Zonrazeh: "jilseg",
  },
  calmness: {
    Jaramah: "gahri",
    Zonrazeh: "gari",
  },
  jealousy: {
    Jaramah: "oormal",
    Zonrazeh: "urmal",
  },
  hunger: {
    Jaramah: "joonee",
    Zonrazeh: "juny",
  },
  desire: {
    Jaramah: "ar",
    Zonrazeh: "ar",
  },
  lust: {
    Jaramah: "berwama",
    Zonrazeh: "barwama",
  },
  shame: {
    Jaramah: "yepreh",
    Zonrazeh: "yepre",
  },
  passion: {
    Jaramah: "habbei",
    Zonrazeh: "habey",
  },
  surprise: {
    Jaramah: "taha",
    Zonrazeh: "taha",
  },
  despair: {
    Jaramah: "vohara",
    Zonrazeh: "vohara",
  },
  gratitude: {
    Jaramah: "param",
    Zonrazeh: "param",
  },
  bee: {
    Jaramah: "hedan",
    Zonrazeh: "hedan",
  },
  bird: {
    Jaramah: "tiyr",
    Zonrazeh: "tyr",
  },
  chicken: {
    Jaramah: "bokdir",
    Zonrazeh: "boktyr",
  },
  camel: {
    Jaramah: "krashahn",
    Zonrazeh: "karoomal",
  },
  cat: {
    Jaramah: "mersa",
    Zonrazeh: "meav",
  },
  cow: {
    Jaramah: "kofal",
    Zonrazeh: "kofal",
  },
  dog: {
    Jaramah: "deewad",
    Zonrazeh: "difid",
  },
  dove: {
    Jaramah: "dehme",
    Zonrazeh: "dena",
  },
  dragon: {
    Jaramah: "dirme",
    Zonrazeh: "derna",
  },
  falcon: {
    Jaramah: "metir",
    Zonrazeh: "metyr",
  },
  fish: {
    Jaramah: "wud",
    Zonrazeh: "wud",
  },
  fox: {
    Jaramah: "kigeh",
    Zonrazeh: "kige",
  },
  horse: {
    Jaramah: "dareb",
    Zonrazeh: "merkab",
  },
  llama: {
    Jaramah: "leahmo",
    Zonrazeh: "leamo",
  },
  lizard: {
    Jaramah: "lusehr",
    Zonrazeh: "luser",
  },
  pig: {
    Jaramah: "gomb",
    Zonrazeh: "gomb",
  },
  rabbit: {
    Jaramah: "bamwe",
    Zonrazeh: "bnuuy",
  },
  sheep: {
    Jaramah: "fereh",
    Zonrazeh: "fere",
  },
  snake: {
    Jaramah: "beshyk",
    Zonrazeh: "beshyk",
  },
  rat: {
    Jaramah: "fareh",
    Zonrazeh: "fare",
  },
  viper: {
    Jaramah: "sijeer",
    Zonrazeh: "sijyr",
  },
  wolf: {
    Jaramah: "kari",
    Zonrazeh: "kary",
  },
  monkey: {
    Jaramah: "kor",
    Zonrazeh: "kor",
  },
  worm: {
    Jaramah: "kasena",
    Zonrazeh: "begasem",
  },
  clearsky: {
    Jaramah: "ekaam",
    Zonrazeh: "ekaam",
  },
  rain: {
    Jaramah: "tari",
    Zonrazeh: "tary",
  },
  raincloud: {
    Jaramah: "gebam",
    Zonrazeh: "gebam",
  },
  cloud: {
    Jaramah: "gahsh",
    Zonrazeh: "gash",
  },
  fog: {
    Jaramah: "sareen",
    Zonrazeh: "saryn",
  },
  mist: {
    Jaramah: "tareh",
    Zonrazeh: "tare",
  },
  storm: {
    Jaramah: "ahjaam",
    Zonrazeh: "ajaam",
  },
  drought: {
    Jaramah: "fossra",
    Zonrazeh: "fosra",
  },
  flood: {
    Jaramah: "wezeh",
    Zonrazeh: "ueze",
  },
  snow: {
    Jaramah: "sirook",
    Zonrazeh: "siruk",
  },
  acacia: {
    Jaramah: "akasya",
    Zonrazeh: "akasya",
  },
  apple: {
    Jaramah: "tafaha",
    Zonrazeh: "tafaha",
  },
  apricot: {
    Jaramah: "jagah",
    Zonrazeh: "jaga",
  },
  azalea: {
    Jaramah: "rodesa",
    Zonrazeh: "rodesa",
  },
  beetroot: {
    Jaramah: "hadatu",
    Zonrazeh: "hadatu",
  },
  bloomblossom: {
    Jaramah: "sormja",
    Zonrazeh: "soomeej",
  },
  birch: {
    Jaramah: "betu",
    Zonrazeh: "betu",
  },
  bluet: {
    Jaramah: "tizara",
    Zonrazeh: "tizara",
  },
  carrot: {
    Jaramah: "torr",
    Zonrazeh: "tor",
  },
  cherry: {
    Jaramah: "zakra",
    Zonrazeh: "zakra",
  },
  cornflower: {
    Jaramah: "karenzara",
    Zonrazeh: "karenzara",
  },
  daisy: {
    Jaramah: "tiza",
    Zonrazeh: "tiza",
  },
  dandelion: {
    Jaramah: "bazara",
    Zonrazeh: "bazara",
  },
  fruit: {
    Jaramah: "edu",
    Zonrazeh: "edu",
  },
  vegetable: {
    Jaramah: "edu",
    Zonrazeh: "edu",
  },
  flower: {
    Jaramah: "zara",
    Zonrazeh: "zara",
  },
  jungle_tree: {
    Jaramah: "ruzu",
    Zonrazeh: "ruzu",
  },
  lilac: {
    Jaramah: "syros",
    Zonrazeh: "syros",
  },
  lily: {
    Jaramah: "saba",
    Zonrazeh: "saba",
  },
  melon: {
    Jaramah: "olen",
    Zonrazeh: "olen",
  },
  oak: {
    Jaramah: "kuwehr",
    Zonrazeh: "kuer",
  },
  orchid: {
    Jaramah: "urak",
    Zonrazeh: "urak",
  },
  peony: {
    Jaramah: "basi",
    Zonrazeh: "basi",
  },
  plant: {
    Jaramah: "tu",
    Zonrazeh: "tu",
  },
  potato: {
    Jaramah: "harro",
    Zonrazeh: "haro",
  },
  poppy: {
    Jaramah: "anuzara",
    Zonrazeh: "anuzara",
  },
  pumpkin: {
    Jaramah: "kurib",
    Zonrazeh: "kurib",
  },
  wildrose: {
    Jaramah: "tadef",
    Zonrazeh: "tadef",
  },
  rose: {
    Jaramah: "uri",
    Zonrazeh: "uri",
  },
  sunflower: {
    Jaramah: "alshamzara",
    Zonrazeh: "alshamzara",
  },
  spice: {
    Jaramah: "alamar",
    Zonrazeh: "alamar",
  },
  spout: {
    Jaramah: "pihrih",
    Zonrazeh: "piri",
  },
  sapling: {
    Jaramah: "pihrih",
    Zonrazeh: "piri",
  },
  spruce: {
    Jaramah: "s'prooz",
    Zonrazeh: "s'pruz",
  },
  tulip: {
    Jaramah: "huza",
    Zonrazeh: "huza",
  },
  tomato: {
    Jaramah: "greto",
    Zonrazeh: "greto",
  },
  tree: {
    Jaramah: "suh",
    Zonrazeh: "yorba",
  },
  wheat: {
    Jaramah: "thew",
    Zonrazeh: "theu",
  },
  witherrose: {
    Jaramah: "bakuri",
    Zonrazeh: "bakuri",
  },
  being: {
    Jaramah: "umo",
    Zonrazeh: "sabjen",
  },
  sentient: {
    Jaramah: "umo",
    Zonrazeh: "sabjen",
  },
  creature: {
    Jaramah: "umo",
    Zonrazeh: "sabjen",
  },
  human: {
    Jaramah: "jiraf",
    Zonrazeh: "efan",
  },
  child: {
    Jaramah: "gep",
    Zonrazeh: "erel",
  },
  parent: {
    Jaramah: "owaj",
    Zonrazeh: "mahka",
  },
  person: {
    Jaramah: "Jaramah",
    Zonrazeh: "Zonrazeh",
  },
  people: {
    Jaramah: "taleyu",
    Zonrazeh: "taleyoo",
  },
  male: {
    Jaramah: "rel",
    Zonrazeh: "rel",
  },
  female: {
    Jaramah: "ra",
    Zonrazeh: "era",
  },
  man: {
    Jaramah: "etoo",
    Zonrazeh: "deratu",
  },
  woman: {
    Jaramah: "enra",
    Zonrazeh: "ajorkar",
  },
  husband: {
    Jaramah: "shrel",
    Zonrazeh: "derdimej",
  },
  wife: {
    Jaramah: "shrea",
    Zonrazeh: "dokumaj",
  },
  father: {
    Jaramah: "mabak",
    Zonrazeh: "kowame",
  },
  mother: {
    Jaramah: "tara",
    Zonrazeh: "dera",
  },
  dad: {
    Jaramah: "dagda",
    Zonrazeh: "gadag",
  },
  mom: {
    Jaramah: "mbobo",
    Zonrazeh: "mata",
  },
  brother: {
    Jaramah: "derel",
    Zonrazeh: "derel",
  },
  sister: {
    Jaramah: "dera",
    Zonrazeh: "dera",
  },
  nephew: {
    Jaramah: "degebrel",
    Zonrazeh: "degebrel",
  },
  niece: {
    Jaramah: "degrebra",
    Zonrazeh: "degrebra",
  },
  aunt: {
    Jaramah: "kantara",
    Zonrazeh: "kantara",
  },
  uncle: {
    Jaramah: "kantarel",
    Zonrazeh: "kantarel",
  },
  son: {
    Jaramah: "koja",
    Zonrazeh: "gebrel",
  },
  daughter: {
    Jaramah: "koje",
    Zonrazeh: "gebra",
  },
  malecousin: {
    Jaramah: "ganel",
    Zonrazeh: "kanrel",
  },
  femalecousin: {
    Jaramah: "genla",
    Zonrazeh: "kanra",
  },
  grandfather: {
    Jaramah: "tankab",
    Zonrazeh: "taltarel",
  },
  grandmother: {
    Jaramah: "tabo",
    Zonrazeh: "taltara",
  },
  grandson: {
    Jaramah: "bremsa",
    Zonrazeh: "talgebrel",
  },
  granddaughter: {
    Jaramah: "brasa",
    Zonrazeh: "talgebra",
  },
  spouse: {
    Jaramah: "loosija",
    Zonrazeh: "shejeru",
  },
  bro: {
    Jaramah: "bado",
    Zonrazeh: "mowa",
  },
  folk: {
    Jaramah: "sondabi",
    Zonrazeh: "romkas",
  },
  ethnicgroup: {
    Jaramah: "sondabi",
    Zonrazeh: "romkas",
  },
  forefather: {
    Jaramah: "rarbem",
    Zonrazeh: "khomsta",
  },
  king: {
    Jaramah: "shah",
    Zonrazeh: "emir",
  },
  ruler: {
    Jaramah: "shah",
    Zonrazeh: "emir",
  },
  queen: {
    Jaramah: "emsha",
    Zonrazeh: "emira",
  },
  master: {
    Jaramah: "raleem",
    Zonrazeh: "rashat",
  },
  slave: {
    Jaramah: "sewin",
    Zonrazeh: "sewna",
  },
  spy: {
    Jaramah: "numeb",
    Zonrazeh: "numen",
  },
  warrior: {
    Jaramah: "haleem",
    Zonrazeh: "halam",
  },
  soldier: {
    Jaramah: "esdru",
    Zonrazeh: "isrew",
  },
  hero: {
    Jaramah: "talakom",
    Zonrazeh: "talakom",
  },
  sculptor: {
    Jaramah: "ajwoo",
    Zonrazeh: "ajwaoo",
  },
  servant: {
    Jaramah: "abyu",
    Zonrazeh: "abyu",
  },
  speaker: {
    Jaramah: "tarjadh",
    Zonrazeh: "tarjad",
  },
  nomad: {
    Jaramah: "wotu",
    Zonrazeh: "uotu",
  },
  citizen: {
    Jaramah: "looma",
    Zonrazeh: "leema",
  },
  cook: {
    Jaramah: "janon",
    Zonrazeh: "janon",
  },
  pastor: {
    Jaramah: "wajoh",
    Zonrazeh: "wajoh",
  },
  liar: {
    Jaramah: "uwamal",
    Zonrazeh: "uamal",
  },
  idiot: {
    Jaramah: "fakah / fak",
    Zonrazeh: "faka",
  },
  steward: {
    Jaramah: "mejasra",
    Zonrazeh: "bersi",
  },
  maneater: {
    Jaramah: "derakar",
    Zonrazeh: "winowar",
  },
  cannibal: {
    Jaramah: "derakar",
    Zonrazeh: "winowar",
  },
  dear: {
    Jaramah: "ifajalaji",
    Zonrazeh: "mwesar",
  },
  sweetie: {
    Jaramah: "ifajalaji",
    Zonrazeh: "mwesar",
  },
  bastard: {
    Jaramah: "goka",
    Zonrazeh: "jegjeg",
  },
  scout: {
    Jaramah: "sewat",
    Zonrazeh: "sey",
  },
  fellow: {
    Jaramah: "etoo",
    Zonrazeh: "deratu",
  },
  guy: {
    Jaramah: "etoo",
    Zonrazeh: "deratu",
  },
  maiden: {
    Jaramah: "eya",
    Zonrazeh: "eya",
  },
  hick: {
    Jaramah: "tola",
    Zonrazeh: "tola",
  },
  bumpkin: {
    Jaramah: "tola",
    Zonrazeh: "tola",
  },
  redneck: {
    Jaramah: "tola",
    Zonrazeh: "tola",
  },
  friend: {
    Jaramah: "lokeh",
    Zonrazeh: "loke",
  },
  sesholeader: {
    Jaramah: "sewo",
    Zonrazeh: "sewo",
  },
  mayor: {
    Jaramah: "mudir",
    Zonrazeh: "sitsho",
  },
  captain: {
    Jaramah: "tadahn",
    Zonrazeh: "tadan",
  },
  sergeant: {
    Jaramah: "abehan",
    Zonrazeh: "abehan",
  },
  officer: {
    Jaramah: "ekashal",
    Zonrazeh: "ekashal",
  },
  lieutenant: {
    Jaramah: "tadja",
    Zonrazeh: "karwus",
  },
  general: {
    Jaramah: "nulak",
    Zonrazeh: "nulak",
  },
  admiral: {
    Jaramah: "imeal",
    Zonrazeh: "safleer",
  },
  governor: {
    Jaramah: "satrap",
    Zonrazeh: "yimrase",
  },
  vizier: {
    Jaramah: "vizier",
    Zonrazeh: "wakar",
  },
  robe: {
    Jaramah: "turjam",
    Zonrazeh: "borjam",
  },
  pants: {
    Jaramah: "terim'asu",
    Zonrazeh: "terimasu",
  },
  shirt: {
    Jaramah: "etoor'asu",
    Zonrazeh: "eturasu",
  },
  belt: {
    Jaramah: "shehen",
    Zonrazeh: "shehen",
  },
  shoe: {
    Jaramah: "wadav",
    Zonrazeh: "uadav",
  },
  hat: {
    Jaramah: "tero",
    Zonrazeh: "tero",
  },
  cloak: {
    Jaramah: "hif",
    Zonrazeh: "hif",
  },
  armor: {
    Jaramah: "dosheh",
    Zonrazeh: "doshe",
  },
  accessory: {
    Jaramah: "felek",
    Zonrazeh: "felek",
  },
  glasses: {
    Jaramah: "medjaam",
    Zonrazeh: "medjaam",
  },
  clothing: {
    Jaramah: "asu",
    Zonrazeh: "asu",
  },
  scarf: {
    Jaramah: "yimhif",
    Zonrazeh: "yimhif",
  },
  art: {
    Jaramah: "suweya",
    Zonrazeh: "sueya",
  },
  artifact: {
    Jaramah: "kem'atu",
    Zonrazeh: "kem'atu",
  },
  book: {
    Jaramah: "wihkur",
    Zonrazeh: "wadisda",
  },
  box: {
    Jaramah: "gef",
    Zonrazeh: "gef",
  },
  container: {
    Jaramah: "gef",
    Zonrazeh: "gef",
  },
  bell: {
    Jaramah: "oopock",
    Zonrazeh: "upok",
  },
  canoe: {
    Jaramah: "matoomwi",
    Zonrazeh: "melishua",
  },
  casket: {
    Jaramah: "nilagef",
    Zonrazeh: "nilagef",
  },
  cart: {
    Jaramah: "kereh",
    Zonrazeh: "kere",
  },
  coin: {
    Jaramah: "atuwar",
    Zonrazeh: "atuar",
  },
  compass: {
    Jaramah: "reyolet",
    Zonrazeh: "reolet",
  },
  cup: {
    Jaramah: "ohn",
    Zonrazeh: "on",
  },
  bowl: {
    Jaramah: "ohn",
    Zonrazeh: "on",
  },
  cradle: {
    Jaramah: "yors",
    Zonrazeh: "yors",
  },
  crown: {
    Jaramah: "kasash",
    Zonrazeh: "kasash",
  },
  door: {
    Jaramah: "tehr",
    Zonrazeh: "ter",
  },
  flag: {
    Jaramah: "tasah",
    Zonrazeh: "tasa",
  },
  goods: {
    Jaramah: "paru",
    Zonrazeh: "paru",
  },
  hammer: {
    Jaramah: "neru",
    Zonrazeh: "neru",
  },
  hook: {
    Jaramah: "barook",
    Zonrazeh: "baruk",
  },
  lock: {
    Jaramah: "kalath",
    Zonrazeh: "kalath",
  },
  map: {
    Jaramah: "kafsar",
    Zonrazeh: "jawe",
  },
  menu: {
    Jaramah: "fahkal",
    Zonrazeh: "fakal",
  },
  currency: {
    Jaramah: "jarazehat",
    Zonrazeh: "jarazehat",
  },
  money: {
    Jaramah: "at",
    Zonrazeh: "at",
  },
  pen: {
    Jaramah: "dahoof",
    Zonrazeh: "dahuf",
  },
  brew: {
    Jaramah: "wobreh",
    Zonrazeh: "uobre",
  },
  building: {
    Jaramah: "deken",
    Zonrazeh: "deken",
  },
  oven: {
    Jaramah: "vusehu",
    Zonrazeh: "vusehu",
  },
  poem: {
    Jaramah: "delos",
    Zonrazeh: "delos",
  },
  portrait: {
    Jaramah: "talyjem",
    Zonrazeh: "talyjem",
  },
  pulpit: {
    Jaramah: "jeyool",
    Zonrazeh: "jeyul",
  },
  stick: {
    Jaramah: "kas",
    Zonrazeh: "kas",
  },
  staff: {
    Jaramah: "kas",
    Zonrazeh: "kas",
  },
  rod: {
    Jaramah: "kas",
    Zonrazeh: "kas",
  },
  saw: {
    Jaramah: "sadaf",
    Zonrazeh: "sadaf",
  },
  scroll: {
    Jaramah: "fosthel",
    Zonrazeh: "fosthel",
  },
  ship: {
    Jaramah: "jasoo",
    Zonrazeh: "jawoo",
  },
  quarterstaff: {
    Jaramah: "sadahef",
    Zonrazeh: "sadahef",
  },
  sword: {
    Jaramah: "dafor",
    Zonrazeh: "shamshir",
  },
  table: {
    Jaramah: "dahef",
    Zonrazeh: "dahef",
  },
  tent: {
    Jaramah: "enshu",
    Zonrazeh: "enshu",
  },
  stitch: {
    Jaramah: "danen",
    Zonrazeh: "danen",
  },
  thread: {
    Jaramah: "danen",
    Zonrazeh: "danen",
  },
  woven: {
    Jaramah: "danen",
    Zonrazeh: "danen",
  },
  string: {
    Jaramah: "yimu",
    Zonrazeh: "yeemeen",
  },
  wheel: {
    Jaramah: "abethi",
    Zonrazeh: "abethy",
  },
  army: {
    Jaramah: "airzoo",
    Zonrazeh: "eyrzu",
  },
  brotherhood: {
    Jaramah: "derelajadh",
    Zonrazeh: "derelajad",
  },
  militia: {
    Jaramah: "aira",
    Zonrazeh: "eyra",
  },
  seyohdom: {
    Jaramah: "seyohadh",
    Zonrazeh: "seyohad",
  },
  clan: {
    Jaramah: "seso",
    Zonrazeh: "wesho",
  },
  coalition: {
    Jaramah: "verah",
    Zonrazeh: "vera",
  },
  convocation: {
    Jaramah: "jadres",
    Zonrazeh: "jadres",
  },
  forum: {
    Jaramah: "jadres",
    Zonrazeh: "jadres",
  },
  congress: {
    Jaramah: "jadres",
    Zonrazeh: "jadres",
  },
  group: {
    Jaramah: "malet",
    Zonrazeh: "malet",
  },
  council: {
    Jaramah: "desaan",
    Zonrazeh: "desaan",
  },
  empire: {
    Jaramah: "yimra",
    Zonrazeh: "yimra",
  },
  family: {
    Jaramah: "tooroz",
    Zonrazeh: "rebetilah",
  },
  government: {
    Jaramah: "iladh",
    Zonrazeh: "ilad",
  },
  gathering: {
    Jaramah: "jarazehteja",
    Zonrazeh: "jarazehteja",
  },
  fellowship: {
    Jaramah: "hanad",
    Zonrazeh: "hanad",
  },
  commonwealth: {
    Jaramah: "desuo",
    Zonrazeh: "desuo",
  },
  kingdom: {
    Jaramah: "kesiradh",
    Zonrazeh: "keshrad",
  },
  navy: {
    Jaramah: "tahbi",
    Zonrazeh: "tahbi",
  },
  knights: {
    Jaramah: "fasag",
    Zonrazeh: "fasag",
  },
  rank: {
    Jaramah: "zu",
    Zonrazeh: "zu",
  },
  row: {
    Jaramah: "zu",
    Zonrazeh: "zu",
  },
  line: {
    Jaramah: "zu",
    Zonrazeh: "zu",
  },
  religion: {
    Jaramah: "mehyan",
    Zonrazeh: "mehyan",
  },
  system: {
    Jaramah: "mejahs",
    Zonrazeh: "sortadrabar",
  },
  vocabulary: {
    Jaramah: "kaned",
    Zonrazeh: "kaned",
  },
  word: {
    Jaramah: "dahm",
    Zonrazeh: "gem",
  },
  sentence: {
    Jaramah: "gemmal",
    Zonrazeh: "gemal",
  },
  language: {
    Jaramah: "yutarj",
    Zonrazeh: "yutarj",
  },
  paragraph: {
    Jaramah: "mektad",
    Zonrazeh: "mektad",
  },
  script: {
    Jaramah: "gemakeh",
    Zonrazeh: "gemake",
  },
  letter: {
    Jaramah: "naak",
    Zonrazeh: "naak",
  },
  dialect: {
    Jaramah: "yatarj",
    Zonrazeh: "yatarj",
  },
  square: {
    Jaramah: "leht",
    Zonrazeh: "let",
  },
  cube: {
    Jaramah: "letas",
    Zonrazeh: "letas",
  },
  circle: {
    Jaramah: "tuar",
    Zonrazeh: "tuar",
  },
  sphere: {
    Jaramah: "tuaras",
    Zonrazeh: "tuaras",
  },
  starshape: {
    Jaramah: "eseti",
    Zonrazeh: "eseti",
  },
  triangle: {
    Jaramah: "gifu",
    Zonrazeh: "gifu",
  },
  pyramid: {
    Jaramah: "gifuas",
    Zonrazeh: "gifuas",
  },
  droplet: {
    Jaramah: "ahjti",
    Zonrazeh: "ajty",
  },
  war: {
    Jaramah: "serli",
    Zonrazeh: "sil",
  },
  burial: {
    Jaramah: "jend",
    Zonrazeh: "jend",
  },
  funeral: {
    Jaramah: "ajhmwe",
    Zonrazeh: "jend",
  },
  ballad: {
    Jaramah: "weshootej",
    Zonrazeh: "weshootajoo",
  },
  celebration: {
    Jaramah: "awabadah",
    Zonrazeh: "auabada",
  },
  act: {
    Jaramah: "wohu",
    Zonrazeh: "uohu",
  },
  assistance: {
    Jaramah: "wesh",
    Zonrazeh: "wesha",
  },
  bandit: {
    Jaramah: "towaj",
    Zonrazeh: "arasir",
  },
  pirate: {
    Jaramah: "towaj",
    Zonrazeh: "arasir",
  },
  boundary: {
    Jaramah: "ehd",
    Zonrazeh: "ed",
  },
  center: {
    Jaramah: "jak",
    Zonrazeh: "jak",
  },
  charity: {
    Jaramah: "thiee",
    Zonrazeh: "thiy",
  },
  corner: {
    Jaramah: "kijar",
    Zonrazeh: "kijar",
  },
  angle: {
    Jaramah: "kijar",
    Zonrazeh: "kijar",
  },
  cost: {
    Jaramah: "kebe",
    Zonrazeh: "kebe",
  },
  coronation: {
    Jaramah: "yolekesh",
    Zonrazeh: "yolekesh",
  },
  democracy: {
    Jaramah: "ilmoyu",
    Zonrazeh: "ilmoyu",
  },
  department: {
    Jaramah: "maltekar",
    Zonrazeh: "erzdat",
  },
  destiny: {
    Jaramah: "doahn",
    Zonrazeh: "doan",
  },
  difference: {
    Jaramah: "ya",
    Zonrazeh: "ya",
  },
  variation: {
    Jaramah: "ya",
    Zonrazeh: "ya",
  },
  document: {
    Jaramah: "ezithel",
    Zonrazeh: "ezithel",
  },
  dregs: {
    Jaramah: "rai",
    Zonrazeh: "ray",
  },
  excess: {
    Jaramah: "geh",
    Zonrazeh: "ge",
  },
  residue: {
    Jaramah: "rai",
    Zonrazeh: "ray",
  },
  emirate: {
    Jaramah: "yimra",
    Zonrazeh: "yimra",
  },
  event: {
    Jaramah: "eeda",
    Zonrazeh: "yda",
  },
  fortune: {
    Jaramah: "jaseda",
    Zonrazeh: "jaseda",
  },
  glory: {
    Jaramah: "daf",
    Zonrazeh: "daf",
  },
  holiness: {
    Jaramah: "maeh'adh",
    Zonrazeh: "maead",
  },
  intelligence: {
    Jaramah: "menden",
    Zonrazeh: "menden",
  },
  awareness: {
    Jaramah: "menden",
    Zonrazeh: "menden",
  },
  cognitive: {
    Jaramah: "menden",
    Zonrazeh: "menden",
  },
  interval: {
    Jaramah: "dai",
    Zonrazeh: "day",
  },
  majesty: {
    Jaramah: "itath",
    Zonrazeh: "itath",
  },
  method: {
    Jaramah: "baheleh",
    Zonrazeh: "bahele",
  },
  miracle: {
    Jaramah: "behek",
    Zonrazeh: "behek",
  },
  municipality: {
    Jaramah: "lenekash",
    Zonrazeh: "lenekash",
  },
  mirage: {
    Jaramah: "siudef",
    Zonrazeh: "syudef",
  },
  picture: {
    Jaramah: "jehm",
    Zonrazeh: "jem",
  },
  image: {
    Jaramah: "jehm",
    Zonrazeh: "jem",
  },
  point: {
    Jaramah: "tarajdah",
    Zonrazeh: "tarshadja",
  },
  peak: {
    Jaramah: "tarajdah",
    Zonrazeh: "tarshadja",
  },
  position: {
    Jaramah: "darah'el",
    Zonrazeh: "darael",
  },
  power: {
    Jaramah: "sheek",
    Zonrazeh: "shyk",
  },
  property: {
    Jaramah: "preeor",
    Zonrazeh: "pryor",
  },
  occurance: {
    Jaramah: "ohil",
    Zonrazeh: "ohil",
  },
  part: {
    Jaramah: "shak",
    Zonrazeh: "shak",
  },
  politicalparty: {
    Jaramah: "ojemalet",
    Zonrazeh: "ojemalet",
  },
  pattern: {
    Jaramah: "dar",
    Zonrazeh: "dar",
  },
  refugee: {
    Jaramah: "desayoo",
    Zonrazeh: "desayu",
  },
  region: {
    Jaramah: "yar",
    Zonrazeh: "yaj",
  },
  domain: {
    Jaramah: "yar",
    Zonrazeh: "yaj",
  },
  realm: {
    Jaramah: "yar",
    Zonrazeh: "yaj",
  },
  revolution: {
    Jaramah: "hakuo",
    Zonrazeh: "hakuo",
  },
  uprising: {
    Jaramah: "hakuo",
    Zonrazeh: "hakuo",
  },
  rights: {
    Jaramah: "d'savab",
    Zonrazeh: "dsavab",
  },
  scandal: {
    Jaramah: "kupteg",
    Zonrazeh: "kupteg",
  },
  shadow: {
    Jaramah: "sel",
    Zonrazeh: "sel",
  },
  scenery: {
    Jaramah: "mejan",
    Zonrazeh: "mejan",
  },
  sexualorientation: {
    Jaramah: "vureyim",
    Zonrazeh: "vureyim",
  },
  shard: {
    Jaramah: "shahg",
    Zonrazeh: "shag",
  },
  step: {
    Jaramah: "lip",
    Zonrazeh: "lip",
  },
  wisdom: {
    Jaramah: "olinadh",
    Zonrazeh: "olinad",
  },
  hate: {
    Jaramah: "gat",
    Zonrazeh: "gat",
  },
  rebellion: {
    Jaramah: "negek",
    Zonrazeh: "negek",
  },
  illness: {
    Jaramah: "muramb",
    Zonrazeh: "muramb",
  },
  tradition: {
    Jaramah: "kemmen",
    Zonrazeh: "kemmen",
  },
  culture: {
    Jaramah: "najazer",
    Zonrazeh: "najazar",
  },
  mess: {
    Jaramah: "adujira",
    Zonrazeh: "palak",
  },
  history: {
    Jaramah: "amakesh",
    Zonrazeh: "amakesh",
  },
  chronicle: {
    Jaramah: "amakesh",
    Zonrazeh: "amakesh",
  },
  zest: {
    Jaramah: "zikan",
    Zonrazeh: "zikan",
  },
  nature: {
    Jaramah: "kavunen",
    Zonrazeh: "kavunen",
  },
  ecosystem: {
    Jaramah: "kavunen",
    Zonrazeh: "kavunen",
  },
  resolve: {
    Jaramah: "badad",
    Zonrazeh: "badad",
  },
  experience: {
    Jaramah: "seyadh",
    Zonrazeh: "seyad",
  },
  expertise: {
    Jaramah: "seyadh",
    Zonrazeh: "seyad",
  },
  plan: {
    Jaramah: "kenem",
    Zonrazeh: "kenem",
  },
  design: {
    Jaramah: "deraya",
    Zonrazeh: "deraya",
  },
  mystery: {
    Jaramah: "uja",
    Zonrazeh: "uja",
  },
  fact: {
    Jaramah: "los",
    Zonrazeh: "los",
  },
  virtue: {
    Jaramah: "mabaris",
    Zonrazeh: "mabaris",
  },
  principle: {
    Jaramah: "mabaris",
    Zonrazeh: "mabaris",
  },
  rule: {
    Jaramah: "kesir",
    Zonrazeh: "kesyr",
  },
  law: {
    Jaramah: "kesireo",
    Zonrazeh: "kesireo",
  },
  peace: {
    Jaramah: "yesish",
    Zonrazeh: "yesish",
  },
  dedication: {
    Jaramah: "saideh",
    Zonrazeh: "saide",
  },
  prosperity: {
    Jaramah: "sasaluo",
    Zonrazeh: "sasaluo",
  },
  expression: {
    Jaramah: "edaeh",
    Zonrazeh: "edae",
  },
  abandonment: {
    Jaramah: "fles",
    Zonrazeh: "fles",
  },
  accusation: {
    Jaramah: "vetab",
    Zonrazeh: "vetab",
  },
  embrace: {
    Jaramah: "hadaj",
    Zonrazeh: "hadaj",
  },
  hug: {
    Jaramah: "hahd",
    Zonrazeh: "had",
  },
  adaption: {
    Jaramah: "nilood",
    Zonrazeh: "nilud",
  },
  agreement: {
    Jaramah: "kohf",
    Zonrazeh: "ghasem",
  },
  proposal: {
    Jaramah: "kohf",
    Zonrazeh: "ghasem",
  },
  deal: {
    Jaramah: "kohf",
    Zonrazeh: "ghasem",
  },
  allowance: {
    Jaramah: "kavon",
    Zonrazeh: "kavon",
  },
  announcement: {
    Jaramah: "bleeden",
    Zonrazeh: "blyden",
  },
  answer: {
    Jaramah: "tohol",
    Zonrazeh: "tohol",
  },
  apology: {
    Jaramah: "aima",
    Zonrazeh: "ayma",
  },
  ascent: {
    Jaramah: "ohdan",
    Zonrazeh: "odan",
  },
  presence: {
    Jaramah: "ihlen",
    Zonrazeh: "ilen",
  },
  attendance: {
    Jaramah: "ihlen",
    Zonrazeh: "ilen",
  },
  question: {
    Jaramah: "pek",
    Zonrazeh: "pek",
  },
  authority: {
    Jaramah: "ash",
    Zonrazeh: "ash",
  },
  ban: {
    Jaramah: "hagiv",
    Zonrazeh: "hagiv",
  },
  prohibition: {
    Jaramah: "hagiv",
    Zonrazeh: "hagiv",
  },
  restriction: {
    Jaramah: "hagiv",
    Zonrazeh: "hagiv",
  },
  battle: {
    Jaramah: "takoo",
    Zonrazeh: "taku",
  },
  struggle: {
    Jaramah: "takoo",
    Zonrazeh: "taku",
  },
  existence: {
    Jaramah: "naj",
    Zonrazeh: "naj",
  },
  contention: {
    Jaramah: "dalash",
    Zonrazeh: "dalash",
  },
  beginning: {
    Jaramah: "nadih",
    Zonrazeh: "nadi",
  },
  belief: {
    Jaramah: "awuhe",
    Zonrazeh: "auhe",
  },
  betrayal: {
    Jaramah: "sihill",
    Zonrazeh: "sihil",
  },
  blessing: {
    Jaramah: "jahz",
    Zonrazeh: "jaz",
  },
  birth: {
    Jaramah: "umahd",
    Zonrazeh: "umad",
  },
  boast: {
    Jaramah: "sraju",
    Zonrazeh: "sraju",
  },
  break: {
    Jaramah: "braht",
    Zonrazeh: "brat",
  },
  breath: {
    Jaramah: "jan",
    Zonrazeh: "jan",
  },
  burn: {
    Jaramah: "avreadh",
    Zonrazeh: "avread",
  },
  call: {
    Jaramah: "banoon",
    Zonrazeh: "banun",
  },
  care: {
    Jaramah: "sed",
    Zonrazeh: "sed",
  },
  load: {
    Jaramah: "relu",
    Zonrazeh: "relu",
  },
  cause: {
    Jaramah: "lehah",
    Zonrazeh: "leha",
  },
  throw: {
    Jaramah: "kaheh",
    Zonrazeh: "kahe",
  },
  cast: {
    Jaramah: "kaheh",
    Zonrazeh: "kahe",
  },
  change: {
    Jaramah: "ejom",
    Zonrazeh: "ejom",
  },
  transform: {
    Jaramah: "ejom",
    Zonrazeh: "ejom",
  },
  charm: {
    Jaramah: "hill",
    Zonrazeh: "hil",
  },
  choice: {
    Jaramah: "dabah",
    Zonrazeh: "daba",
  },
  chorus: {
    Jaramah: "voseress",
    Zonrazeh: "voseres",
  },
  claim: {
    Jaramah: "makeed",
    Zonrazeh: "makyd",
  },
  climb: {
    Jaramah: "dejad",
    Zonrazeh: "dejad",
  },
  close: {
    Jaramah: "kap",
    Zonrazeh: "kap",
  },
  collection: {
    Jaramah: "wikee",
    Zonrazeh: "uiky",
  },
  combination: {
    Jaramah: "rezahn",
    Zonrazeh: "rezan",
  },
  suicide: {
    Jaramah: "eynehr",
    Zonrazeh: "eyner",
  },
  connection: {
    Jaramah: "wasehl",
    Zonrazeh: "uasel",
  },
  command: {
    Jaramah: "amwa",
    Zonrazeh: "amadoo",
  },
  consumption: {
    Jaramah: "edih",
    Zonrazeh: "edi",
  },
  continuance: {
    Jaramah: "sasal",
    Zonrazeh: "sasal",
  },
  conquest: {
    Jaramah: "gavera",
    Zonrazeh: "gavera",
  },
  cooperation: {
    Jaramah: "ooka",
    Zonrazeh: "uka",
  },
  count: {
    Jaramah: "keneh",
    Zonrazeh: "kene",
  },
  measure: {
    Jaramah: "keneh",
    Zonrazeh: "kene",
  },
  corruption: {
    Jaramah: "shages",
    Zonrazeh: "iyutfan",
  },
  cover: {
    Jaramah: "avel",
    Zonrazeh: "avel",
  },
  creation: {
    Jaramah: "gehr",
    Zonrazeh: "ger",
  },
  cut: {
    Jaramah: "sick",
    Zonrazeh: "sik",
  },
  slice: {
    Jaramah: "sick",
    Zonrazeh: "sik",
  },
  rend: {
    Jaramah: "sick",
    Zonrazeh: "sik",
  },
  curse: {
    Jaramah: "kyt",
    Zonrazeh: "kayt",
  },
  damage: {
    Jaramah: "sadeh",
    Zonrazeh: "sade",
  },
  damn: {
    Jaramah: "duradh",
    Zonrazeh: "durad",
  },
  dance: {
    Jaramah: "nadeh",
    Zonrazeh: "nade",
  },
  debt: {
    Jaramah: "okih",
    Zonrazeh: "oki",
  },
  declaration: {
    Jaramah: "tobaan",
    Zonrazeh: "tobaan",
  },
  defense: {
    Jaramah: "hagah",
    Zonrazeh: "haga",
  },
  designation: {
    Jaramah: "serarj",
    Zonrazeh: "pom",
  },
  category: {
    Jaramah: "serarj",
    Zonrazeh: "pom",
  },
  classification: {
    Jaramah: "serarj",
    Zonrazeh: "pom",
  },
  departure: {
    Jaramah: "ahjek",
    Zonrazeh: "ajek",
  },
  descent: {
    Jaramah: "dekan",
    Zonrazeh: "dekan",
  },
  destruction: {
    Jaramah: "vashah",
    Zonrazeh: "vasha",
  },
  decision: {
    Jaramah: "bah",
    Zonrazeh: "ba",
  },
  conclusion: {
    Jaramah: "bah",
    Zonrazeh: "ba",
  },
  death: {
    Jaramah: "bak",
    Zonrazeh: "bak",
  },
  hole: {
    Jaramah: "gik",
    Zonrazeh: "gik",
  },
  division: {
    Jaramah: "shak",
    Zonrazeh: "shak",
  },
  split: {
    Jaramah: "shak",
    Zonrazeh: "shak",
  },
  dodge: {
    Jaramah: "ijanah",
    Zonrazeh: "ijana",
  },
  drain: {
    Jaramah: "gooeh",
    Zonrazeh: "gue",
  },
  dream: {
    Jaramah: "mayak",
    Zonrazeh: "mayak",
  },
  drown: {
    Jaramah: "shiov",
    Zonrazeh: "shyov",
  },
  meal: {
    Jaramah: "kat",
    Zonrazeh: "kat",
  },
  elevation: {
    Jaramah: "alee",
    Zonrazeh: "aly",
  },
  embarrass: {
    Jaramah: "ryu",
    Zonrazeh: "ryu",
  },
  wall: {
    Jaramah: "nen",
    Zonrazeh: "nen",
  },
  barrier: {
    Jaramah: "nen",
    Zonrazeh: "nen",
  },
  danger: {
    Jaramah: "teru",
    Zonrazeh: "teru",
  },
  end: {
    Jaramah: "deneh",
    Zonrazeh: "dene",
  },
  entrance: {
    Jaramah: "ind",
    Zonrazeh: "ind",
  },
  existance: {
    Jaramah: "jeradh",
    Zonrazeh: "jerad",
  },
  expectation: {
    Jaramah: "eka",
    Zonrazeh: "eka",
  },
  explosion: {
    Jaramah: "arbak",
    Zonrazeh: "arbak",
  },
  exploration: {
    Jaramah: "yefad",
    Zonrazeh: "yefad",
  },
  fall: {
    Jaramah: "ma(v)",
    Zonrazeh: "mav",
  },
  fear: {
    Jaramah: "sij",
    Zonrazeh: "sij",
  },
  feed: {
    Jaramah: "kat",
    Zonrazeh: "kat",
  },
  emotion: {
    Jaramah: "kanef",
    Zonrazeh: "kanef",
  },
  feeling: {
    Jaramah: "sav",
    Zonrazeh: "sav",
  },
  fight: {
    Jaramah: "gav",
    Zonrazeh: "gav",
  },
  completion: {
    Jaramah: "ri'den",
    Zonrazeh: "ryden",
  },
  flow: {
    Jaramah: "hreh",
    Zonrazeh: "hre",
  },
  flight: {
    Jaramah: "fid",
    Zonrazeh: "fid",
  },
  following: {
    Jaramah: "zan",
    Zonrazeh: "zan",
  },
  freedom: {
    Jaramah: "hamiradh",
    Zonrazeh: "hamirad",
  },
  frown: {
    Jaramah: "buwap",
    Zonrazeh: "buap",
  },
  force: {
    Jaramah: "uvash",
    Zonrazeh: "uvash",
  },
  gild: {
    Jaramah: "nilid",
    Zonrazeh: "nilid",
  },
  adornment: {
    Jaramah: "nilid",
    Zonrazeh: "nilid",
  },
  embellishment: {
    Jaramah: "nilid",
    Zonrazeh: "nilid",
  },
  gift: {
    Jaramah: "keja",
    Zonrazeh: "keja",
  },
  glow: {
    Jaramah: "sahd",
    Zonrazeh: "sad",
  },
  going: {
    Jaramah: "ihpil",
    Zonrazeh: "ipil",
  },
  governance: {
    Jaramah: "wesha",
    Zonrazeh: "il",
  },
  grasp: {
    Jaramah: "snik",
    Zonrazeh: "snik",
  },
  growth: {
    Jaramah: "barwan",
    Zonrazeh: "emsahj",
  },
  expansion: {
    Jaramah: "barwan",
    Zonrazeh: "emsahj",
  },
  guard: {
    Jaramah: "mak",
    Zonrazeh: "mak",
  },
  guidance: {
    Jaramah: "reoh",
    Zonrazeh: "reo",
  },
  harvest: {
    Jaramah: "shikshaz",
    Zonrazeh: "shikshaz",
  },
  hartred: {
    Jaramah: "gatraz",
    Zonrazeh: "gatraz",
  },
  possession: {
    Jaramah: "aja",
    Zonrazeh: "aja",
  },
  faith: {
    Jaramah: "ali",
    Zonrazeh: "aly",
  },
  sex: {
    Jaramah: "voor",
    Zonrazeh: "vur",
  },
  heal: {
    Jaramah: "selu",
    Zonrazeh: "selu",
  },
  heat: {
    Jaramah: "sra",
    Zonrazeh: "sra",
  },
  help: {
    Jaramah: "wesh",
    Zonrazeh: "wesha",
  },
  shelter: {
    Jaramah: "numu",
    Zonrazeh: "numu",
  },
  refuge: {
    Jaramah: "numu",
    Zonrazeh: "numu",
  },
  den: {
    Jaramah: "numu",
    Zonrazeh: "numu",
  },
  hit: {
    Jaramah: "fahb",
    Zonrazeh: "fab",
  },
  strike: {
    Jaramah: "fahb",
    Zonrazeh: "fab",
  },
  hope: {
    Jaramah: "hara",
    Zonrazeh: "hara",
  },
  imagination: {
    Jaramah: "yoowill",
    Zonrazeh: "yuil",
  },
  immsersion: {
    Jaramah: "shukez",
    Zonrazeh: "shukez",
  },
  implication: {
    Jaramah: "pifeeyeh",
    Zonrazeh: "pifye",
  },
  information: {
    Jaramah: "den",
    Zonrazeh: "den",
  },
  instruction: {
    Jaramah: "sool",
    Zonrazeh: "sul",
  },
  union: {
    Jaramah: "des",
    Zonrazeh: "des",
  },
  journey: {
    Jaramah: "sdahal",
    Zonrazeh: "kafoosat",
  },
  jump: {
    Jaramah: "bant",
    Zonrazeh: "bant",
  },
  kill: {
    Jaramah: "kak",
    Zonrazeh: "kak",
  },
  kiss: {
    Jaramah: "sukki",
    Zonrazeh: "sukki",
  },
  knowledge: {
    Jaramah: "men",
    Zonrazeh: "men",
  },
  lead: {
    Jaramah: "oh",
    Zonrazeh: "oh",
  },
  lie: {
    Jaramah: "uwama(v)",
    Zonrazeh: "uamav",
  },
  like: {
    Jaramah: "ihma",
    Zonrazeh: "ima",
  },
  hobby: {
    Jaramah: "ihma",
    Zonrazeh: "ima",
  },
  crush: {
    Jaramah: "ihma",
    Zonrazeh: "ima",
  },
  interest: {
    Jaramah: "ihma",
    Zonrazeh: "ima",
  },
  life: {
    Jaramah: "kawoom",
    Zonrazeh: "kavum",
  },
  lonliness: {
    Jaramah: "botu",
    Zonrazeh: "botu",
  },
  look: {
    Jaramah: "wakav",
    Zonrazeh: "uakav",
  },
  loss: {
    Jaramah: "geh",
    Zonrazeh: "ge",
  },
  love: {
    Jaramah: "damati",
    Zonrazeh: "damarro",
  },
  lull: {
    Jaramah: "asreh",
    Zonrazeh: "asre",
  },
  manifestation: {
    Jaramah: "alendim",
    Zonrazeh: "alendim",
  },
  manipulation: {
    Jaramah: "ameder",
    Zonrazeh: "ameder",
  },
  massacre: {
    Jaramah: "vespez",
    Zonrazeh: "vespez",
  },
  meat: {
    Jaramah: "tis",
    Zonrazeh: "tis",
  },
  flesh: {
    Jaramah: "tis",
    Zonrazeh: "tis",
  },
  meeting: {
    Jaramah: "vehr",
    Zonrazeh: "ver",
  },
  unity: {
    Jaramah: "vehr",
    Zonrazeh: "ver",
  },
  might: {
    Jaramah: "mal",
    Zonrazeh: "mal",
  },
  move: {
    Jaramah: "tahp",
    Zonrazeh: "tap",
  },
  name: {
    Jaramah: "nan",
    Zonrazeh: "nan",
  },
  notice: {
    Jaramah: "hameh",
    Zonrazeh: "hame",
  },
  nourishment: {
    Jaramah: "kadef",
    Zonrazeh: "kadef",
  },
  offense: {
    Jaramah: "agah",
    Zonrazeh: "aga",
  },
  office: {
    Jaramah: "ekash",
    Zonrazeh: "ekash",
  },
  opening: {
    Jaramah: "hosh",
    Zonrazeh: "hosh",
  },
  oppression: {
    Jaramah: "oma",
    Zonrazeh: "oma",
  },
  ordination: {
    Jaramah: "tafal",
    Zonrazeh: "tafal",
  },
  ownership: {
    Jaramah: "ajat",
    Zonrazeh: "ajat",
  },
  order: {
    Jaramah: "dabah",
    Zonrazeh: "daba",
  },
  request: {
    Jaramah: "lepek",
    Zonrazeh: "lepek",
  },
  perseverance: {
    Jaramah: "gan",
    Zonrazeh: "gan",
  },
  sermon: {
    Jaramah: "tarez",
    Zonrazeh: "tarez",
  },
  paranoia: {
    Jaramah: "katru",
    Zonrazeh: "katru",
  },
  placement: {
    Jaramah: "po'adh",
    Zonrazeh: "poad",
  },
  protection: {
    Jaramah: "howan",
    Zonrazeh: "houan",
  },
  protest: {
    Jaramah: "demed",
    Zonrazeh: "demed",
  },
  pull: {
    Jaramah: "feh",
    Zonrazeh: "fe",
  },
  attraction: {
    Jaramah: "feh",
    Zonrazeh: "fe",
  },
  push: {
    Jaramah: "thah",
    Zonrazeh: "thah",
  },
  repulsion: {
    Jaramah: "thah",
    Zonrazeh: "thah",
  },
  purchase: {
    Jaramah: "veruk",
    Zonrazeh: "veruk",
  },
  pursuit: {
    Jaramah: "seetoo",
    Zonrazeh: "sytu",
  },
  reach: {
    Jaramah: "hanah",
    Zonrazeh: "hana",
  },
  reception: {
    Jaramah: "ruvul",
    Zonrazeh: "ruvul",
  },
  recognition: {
    Jaramah: "senmen",
    Zonrazeh: "senmen",
  },
  observation: {
    Jaramah: "yimib",
    Zonrazeh: "yimib",
  },
  consideration: {
    Jaramah: "yimib",
    Zonrazeh: "yimib",
  },
  memory: {
    Jaramah: "vansu",
    Zonrazeh: "vansu",
  },
  reminder: {
    Jaramah: "adekaheh",
    Zonrazeh: "adekahe",
  },
  renew: {
    Jaramah: "das",
    Zonrazeh: "das",
  },
  revive: {
    Jaramah: "das",
    Zonrazeh: "das",
  },
  repetition: {
    Jaramah: "tarab",
    Zonrazeh: "tarab",
  },
  requirement: {
    Jaramah: "ekez",
    Zonrazeh: "ekez",
  },
  rest: {
    Jaramah: "zotahp",
    Zonrazeh: "zotap",
  },
  return: {
    Jaramah: "tarakeja",
    Zonrazeh: "tarakeja",
  },
  rise: {
    Jaramah: "etooripil",
    Zonrazeh: "eturipil",
  },
  rotation: {
    Jaramah: "wouu",
    Zonrazeh: "uouu",
  },
  reign: {
    Jaramah: "kesir",
    Zonrazeh: "kesyr",
  },
  run: {
    Jaramah: "ruwj",
    Zonrazeh: "korev",
  },
  sight: {
    Jaramah: "med",
    Zonrazeh: "med",
  },
  search: {
    Jaramah: "abhah",
    Zonrazeh: "abha",
  },
  appearance: {
    Jaramah: "dim",
    Zonrazeh: "dim",
  },
  service: {
    Jaramah: "ahbe",
    Zonrazeh: "abe",
  },
  portion: {
    Jaramah: "awa",
    Zonrazeh: "awa",
  },
  allotment: {
    Jaramah: "awa",
    Zonrazeh: "awa",
  },
  shroud: {
    Jaramah: "leyn",
    Zonrazeh: "leyn",
  },
  shit: {
    Jaramah: "oonk",
    Zonrazeh: "unk",
  },
  poop: {
    Jaramah: "oonk",
    Zonrazeh: "unk",
  },
  shot: {
    Jaramah: "sook",
    Zonrazeh: "zok",
  },
  projectile: {
    Jaramah: "sook",
    Zonrazeh: "zok",
  },
  song: {
    Jaramah: "vos",
    Zonrazeh: "vos",
  },
  sleep: {
    Jaramah: "anu",
    Zonrazeh: "anu",
  },
  smell: {
    Jaramah: "nahf",
    Zonrazeh: "naf",
  },
  odor: {
    Jaramah: "nahf",
    Zonrazeh: "naf",
  },
  smile: {
    Jaramah: "kiweh",
    Zonrazeh: "kiue",
  },
  speech: {
    Jaramah: "baan",
    Zonrazeh: "baan",
  },
  voice: {
    Jaramah: "baan",
    Zonrazeh: "baan",
  },
  stand: {
    Jaramah: "shahov",
    Zonrazeh: "shahov",
  },
  stay: {
    Jaramah: "mah",
    Zonrazeh: "ma",
  },
  theft: {
    Jaramah: "dajsi",
    Zonrazeh: "dajsi",
  },
  stew: {
    Jaramah: "makah",
    Zonrazeh: "maka",
  },
  strength: {
    Jaramah: "shem",
    Zonrazeh: "shem",
  },
  virility: {
    Jaramah: "dath",
    Zonrazeh: "dath",
  },
  health: {
    Jaramah: "dath",
    Zonrazeh: "dath",
  },
  toughness: {
    Jaramah: "shem",
    Zonrazeh: "shem",
  },
  rigidity: {
    Jaramah: "shem",
    Zonrazeh: "shem",
  },
  sweep: {
    Jaramah: "ales",
    Zonrazeh: "ales",
  },
  submission: {
    Jaramah: "halveh",
    Zonrazeh: "halve",
  },
  swim: {
    Jaramah: "kwah",
    Zonrazeh: "kua",
  },
  sync: {
    Jaramah: "zamun",
    Zonrazeh: "zamun",
  },
  tandem: {
    Jaramah: "zamun",
    Zonrazeh: "zamun",
  },
  responsibility: {
    Jaramah: "bashef",
    Zonrazeh: "bashef",
  },
  taste: {
    Jaramah: "besh",
    Zonrazeh: "besh",
  },
  talk: {
    Jaramah: "pah",
    Zonrazeh: "pa",
  },
  conversation: {
    Jaramah: "pah",
    Zonrazeh: "pa",
  },
  discussion: {
    Jaramah: "respah",
    Zonrazeh: "respa",
  },
  teaching: {
    Jaramah: "lahn",
    Zonrazeh: "lan",
  },
  story: {
    Jaramah: "melendi",
    Zonrazeh: "melendi",
  },
  tendency: {
    Jaramah: "soom",
    Zonrazeh: "sum",
  },
  origin: {
    Jaramah: "soom",
    Zonrazeh: "sum",
  },
  thirst: {
    Jaramah: "alatas",
    Zonrazeh: "alatas",
  },
  thought: {
    Jaramah: "tahd",
    Zonrazeh: "tad",
  },
  toll: {
    Jaramah: "dahn",
    Zonrazeh: "dan",
  },
  ring: {
    Jaramah: "dahn",
    Zonrazeh: "dan",
  },
  sound: {
    Jaramah: "dahn",
    Zonrazeh: "dan",
  },
  annoyance: {
    Jaramah: "plaeh",
    Zonrazeh: "plae",
  },
  menace: {
    Jaramah: "plaeh",
    Zonrazeh: "plae",
  },
  scourge: {
    Jaramah: "plaeh",
    Zonrazeh: "plae",
  },
  trade: {
    Jaramah: "jalad",
    Zonrazeh: "jalad",
  },
  training: {
    Jaramah: "befid",
    Zonrazeh: "befid",
  },
  translation: {
    Jaramah: "genil",
    Zonrazeh: "genil",
  },
  trip: {
    Jaramah: "sdahal",
    Zonrazeh: "kafoosat",
  },
  travel: {
    Jaramah: "sdahal",
    Zonrazeh: "kafoosat",
  },
  treasure: {
    Jaramah: "raskalah",
    Zonrazeh: "raskala",
  },
  trick: {
    Jaramah: "assal",
    Zonrazeh: "asal",
  },
  trust: {
    Jaramah: "loha",
    Zonrazeh: "loha",
  },
  attempt: {
    Jaramah: "sikih",
    Zonrazeh: "siki",
  },
  understanding: {
    Jaramah: "habmenal",
    Zonrazeh: "habmenal",
  },
  use: {
    Jaramah: "wav",
    Zonrazeh: "uav",
  },
  view: {
    Jaramah: "tin",
    Zonrazeh: "tin",
  },
  gaze: {
    Jaramah: "tin",
    Zonrazeh: "tin",
  },
  violence: {
    Jaramah: "agesh",
    Zonrazeh: "agesh",
  },
  wait: {
    Jaramah: "heneh",
    Zonrazeh: "hene",
  },
  walk: {
    Jaramah: "jaden",
    Zonrazeh: "jaden",
  },
  want: {
    Jaramah: "ar",
    Zonrazeh: "ar",
  },
  watch: {
    Jaramah: "sedwakav",
    Zonrazeh: "seduakav",
  },
  weakness: {
    Jaramah: "fahm",
    Zonrazeh: "fam",
  },
  garb: {
    Jaramah: "asu",
    Zonrazeh: "asu",
  },
  whine: {
    Jaramah: "shuwib",
    Zonrazeh: "shuib",
  },
  victory: {
    Jaramah: "nal",
    Zonrazeh: "nal",
  },
  wish: {
    Jaramah: "sobash",
    Zonrazeh: "sobash",
  },
  work: {
    Jaramah: "veth",
    Zonrazeh: "veth",
  },
  occupation: {
    Jaramah: "veth",
    Zonrazeh: "veth",
  },
  job: {
    Jaramah: "veth",
    Zonrazeh: "veth",
  },
  welcome: {
    Jaramah: "alindoh",
    Zonrazeh: "alindo",
  },
  writing: {
    Jaramah: "akesh",
    Zonrazeh: "akesh",
  },
  yell: {
    Jaramah: "tahgel",
    Zonrazeh: "tagel",
  },
  abandon: {
    Jaramah: "veleh",
    Zonrazeh: "felej",
  },
  accuse: {
    Jaramah: "vetabij",
    Zonrazeh: "wetabij",
  },
  accept: {
    Jaramah: "hadaj",
    Zonrazeh: "hadaj",
  },
  adopt: {
    Jaramah: "hadaj",
    Zonrazeh: "hadaj",
  },
  adapt: {
    Jaramah: "nilooj",
    Zonrazeh: "niluj",
  },
  agree: {
    Jaramah: "gofej",
    Zonrazeh: "gofej",
  },
  consent: {
    Jaramah: "gofej",
    Zonrazeh: "gofej",
  },
  allow: {
    Jaramah: "kavahaj",
    Zonrazeh: "kavaj",
  },
  angry: {
    Jaramah: "tegej",
    Zonrazeh: "tegej",
  },
  anger: {
    Jaramah: "tegej",
    Zonrazeh: "tegej",
  },
  announce: {
    Jaramah: "kodahj",
    Zonrazeh: "kardaj",
  },
  answer: {
    Jaramah: "barjoo",
    Zonrazeh: "tooj",
  },
  apologize: {
    Jaramah: "amarahaj",
    Zonrazeh: "aimarej",
  },
  ascend: {
    Jaramah: "bahdo",
    Zonrazeh: "kemarsa",
  },
  rise: {
    Jaramah: "eturipij",
    Zonrazeh: "eturipij",
  },
  ask: {
    Jaramah: "pekooj",
    Zonrazeh: "pikuj",
  },
  attend: {
    Jaramah: "ilnaj",
    Zonrazeh: "ilnaj",
  },
  present: {
    Jaramah: "ilnaj",
    Zonrazeh: "ilnaj",
  },
  authorize: {
    Jaramah: "asheej",
    Zonrazeh: "ashyj",
  },
  permit: {
    Jaramah: "asheej",
    Zonrazeh: "ashyj",
  },
  let: {
    Jaramah: "asheej",
    Zonrazeh: "ashyj",
  },
  ban: {
    Jaramah: "hagij",
    Zonrazeh: "hagij",
  },
  forbidden: {
    Jaramah: "hagij",
    Zonrazeh: "hagij",
  },
  prohibit: {
    Jaramah: "hagij",
    Zonrazeh: "hagij",
  },
  be: {
    Jaramah: "aj",
    Zonrazeh: "ajwa",
  },
  am: {
    Jaramah: "aj",
    Zonrazeh: "ajwa",
  },
  are: {
    Jaramah: "aj",
    Zonrazeh: "ajwa",
  },
  is: {
    Jaramah: "aj",
    Zonrazeh: "ajwa",
  },
  ashamed: {
    Jaramah: "yeprej",
    Zonrazeh: "yeprej",
  },
  peace: {
    Jaramah: "yesej",
    Zonrazeh: "yesej",
  },
  contend: {
    Jaramah: "dalaj",
    Zonrazeh: "dalaj",
  },
  trouble: {
    Jaramah: "dalaj",
    Zonrazeh: "dalaj",
  },
  thankful: {
    Jaramah: "parhej",
    Zonrazeh: "parhej",
  },
  grateful: {
    Jaramah: "parhej",
    Zonrazeh: "parhej",
  },
  lost: {
    Jaramah: "mawaj",
    Zonrazeh: "mauaj",
  },
  nervous: {
    Jaramah: "sithaj",
    Zonrazeh: "sitaj",
  },
  become: {
    Jaramah: "yolej",
    Zonrazeh: "yulaj",
  },
  befriend: {
    Jaramah: "lokej",
    Zonrazeh: "jokel",
  },
  begin: {
    Jaramah: "nadij",
    Zonrazeh: "joodin",
  },
  start: {
    Jaramah: "nadij",
    Zonrazeh: "joodin",
  },
  believe: {
    Jaramah: "awuhej",
    Zonrazeh: "auhej",
  },
  betray: {
    Jaramah: "sihilej",
    Zonrazeh: "sihilej",
  },
  bless: {
    Jaramah: "jazelij",
    Zonrazeh: "jazelij",
  },
  bloom: {
    Jaramah: "urej",
    Zonrazeh: "urej",
  },
  blossom: {
    Jaramah: "urej",
    Zonrazeh: "urej",
  },
  flourish: {
    Jaramah: "sarmooj",
    Zonrazeh: "sarmooj",
  },
  blow: {
    Jaramah: "jooj",
    Zonrazeh: "juj",
  },
  born: {
    Jaramah: "umaj",
    Zonrazeh: "umaj",
  },
  brag: {
    Jaramah: "srajooj",
    Zonrazeh: "srajuj",
  },
  boast: {
    Jaramah: "srajooj",
    Zonrazeh: "srajuj",
  },
  break: {
    Jaramah: "brataj",
    Zonrazeh: "brataj",
  },
  breath: {
    Jaramah: "janooj",
    Zonrazeh: "januj",
  },
  brew: {
    Jaramah: "wobretej",
    Zonrazeh: "uobretej",
  },
  build: {
    Jaramah: "dekenej",
    Zonrazeh: "dekenej",
  },
  burn: {
    Jaramah: "avrej",
    Zonrazeh: "avrej",
  },
  bury: {
    Jaramah: "jendej",
    Zonrazeh: "jendej",
  },
  buy: {
    Jaramah: "ehrkaj",
    Zonrazeh: "erkaj",
  },
  call: {
    Jaramah: "banooj",
    Zonrazeh: "banuj",
  },
  calm: {
    Jaramah: "garij",
    Zonrazeh: "garij",
  },
  care: {
    Jaramah: "sedej",
    Zonrazeh: "sedej",
  },
  carry: {
    Jaramah: "relooj",
    Zonrazeh: "reluj",
  },
  cause: {
    Jaramah: "lehaj",
    Zonrazeh: "lehaj",
  },
  make: {
    Jaramah: "kalij",
    Zonrazeh: "kalij",
  },
  bring: {
    Jaramah: "lehaj",
    Zonrazeh: "lehaj",
  },
  cast: {
    Jaramah: "kahej",
    Zonrazeh: "kahej",
  },
  fling: {
    Jaramah: "kahej",
    Zonrazeh: "kahej",
  },
  throw: {
    Jaramah: "kahej",
    Zonrazeh: "kahej",
  },
  celebrate: {
    Jaramah: "awabadaj",
    Zonrazeh: "auabadaj",
  },
  change: {
    Jaramah: "ejoj",
    Zonrazeh: "ejoj",
  },
  transform: {
    Jaramah: "ejoj",
    Zonrazeh: "ejoj",
  },
  charm: {
    Jaramah: "hilij",
    Zonrazeh: "hilij",
  },
  seduce: {
    Jaramah: "hilij",
    Zonrazeh: "hilij",
  },
  choose: {
    Jaramah: "torej",
    Zonrazeh: "torej",
  },
  claim: {
    Jaramah: "makij",
    Zonrazeh: "makij",
  },
  clean: {
    Jaramah: "shuhaj",
    Zonrazeh: "shuhaj",
  },
  clear: {
    Jaramah: "woje",
    Zonrazeh: "veshij",
  },
  cloudy: {
    Jaramah: "gaj",
    Zonrazeh: "gaj",
  },
  obscure: {
    Jaramah: "gaj",
    Zonrazeh: "gaj",
  },
  climb: {
    Jaramah: "dejaj",
    Zonrazeh: "dejaj",
  },
  close: {
    Jaramah: "kapej",
    Zonrazeh: "kapej",
  },
  collect: {
    Jaramah: "vesheej",
    Zonrazeh: "uikyj",
  },
  combine: {
    Jaramah: "rej",
    Zonrazeh: "rej",
  },
  come: {
    Jaramah: "ahbej",
    Zonrazeh: "kumbala",
  },
  suicide: {
    Jaramah: "eynerej",
    Zonrazeh: "eynerej",
  },
  command: {
    Jaramah: "amaj",
    Zonrazeh: "amaj",
  },
  connect: {
    Jaramah: "waselaj",
    Zonrazeh: "uaselaj",
  },
  consume: {
    Jaramah: "edij",
    Zonrazeh: "edij",
  },
  use: {
    Jaramah: "waj",
    Zonrazeh: "uaj",
  },
  continue: {
    Jaramah: "sasaj",
    Zonrazeh: "sasaj",
  },
  conquer: {
    Jaramah: "gaveraj",
    Zonrazeh: "gaveraj",
  },
  cook: {
    Jaramah: "janej",
    Zonrazeh: "yumum",
  },
  cool: {
    Jaramah: "kej",
    Zonrazeh: "koj",
  },
  worktogether: {
    Jaramah: "ukaj",
    Zonrazeh: "ukaj",
  },
  comply: {
    Jaramah: "ukaj",
    Zonrazeh: "ukaj",
  },
  cooperate: {
    Jaramah: "ukaj",
    Zonrazeh: "ukaj",
  },
  count: {
    Jaramah: "kenooj",
    Zonrazeh: "kenuj",
  },
  measure: {
    Jaramah: "kenooj",
    Zonrazeh: "kenuj",
  },
  corrupt: {
    Jaramah: "shegej",
    Zonrazeh: "shegej",
  },
  cover: {
    Jaramah: "avlaj",
    Zonrazeh: "awaj",
  },
  conceal: {
    Jaramah: "avlaj",
    Zonrazeh: "awaj",
  },
  cradle: {
    Jaramah: "yorshej",
    Zonrazeh: "yorshej",
  },
  create: {
    Jaramah: "gerej",
    Zonrazeh: "gerej",
  },
  crush: {
    Jaramah: "leehej",
    Zonrazeh: "lyhej",
  },
  press: {
    Jaramah: "leehej",
    Zonrazeh: "lyhej",
  },
  cry: {
    Jaramah: "wahaj",
    Zonrazeh: "uahaj",
  },
  cut: {
    Jaramah: "sikej",
    Zonrazeh: "sikej",
  },
  curse: {
    Jaramah: "kytej",
    Zonrazeh: "kaitej",
  },
  damage: {
    Jaramah: "sadej",
    Zonrazeh: "sadej",
  },
  damn: {
    Jaramah: "duraj",
    Zonrazeh: "duraj",
  },
  dance: {
    Jaramah: "nadeej",
    Zonrazeh: "nadyj",
  },
  declare: {
    Jaramah: "tobanaj",
    Zonrazeh: "tobanaj",
  },
  dedicate: {
    Jaramah: "saibej",
    Zonrazeh: "saibej",
  },
  consecrate: {
    Jaramah: "saibej",
    Zonrazeh: "saibej",
  },
  defend: {
    Jaramah: "hagaj",
    Zonrazeh: "hagaj",
  },
  designate: {
    Jaramah: "kishelej",
    Zonrazeh: "kishelej",
  },
  classify: {
    Jaramah: "kishelej",
    Zonrazeh: "kishelej",
  },
  categorize: {
    Jaramah: "kishelej",
    Zonrazeh: "kishelej",
  },
  depart: {
    Jaramah: "ajekej",
    Zonrazeh: "ajekej",
  },
  descend: {
    Jaramah: "dekaj",
    Zonrazeh: "dekaj",
  },
  desire: {
    Jaramah: "ojaj",
    Zonrazeh: "ojaj",
  },
  design: {
    Jaramah: "daraj",
    Zonrazeh: "darja",
  },
  destroy: {
    Jaramah: "vashaj",
    Zonrazeh: "wooshaj",
  },
  despair: {
    Jaramah: "waredej",
    Zonrazeh: "uaredej",
  },
  determine: {
    Jaramah: "baj",
    Zonrazeh: "baj",
  },
  decide: {
    Jaramah: "baj",
    Zonrazeh: "baj",
  },
  conclude: {
    Jaramah: "baj",
    Zonrazeh: "baj",
  },
  die: {
    Jaramah: "bakaj",
    Zonrazeh: "bakaj",
  },
  dig: {
    Jaramah: "gikej",
    Zonrazeh: "gikej",
  },
  divide: {
    Jaramah: "shakej",
    Zonrazeh: "shakej",
  },
  do: {
    Jaramah: "bej",
    Zonrazeh: "bej",
  },
  dodge: {
    Jaramah: "ijanaj",
    Zonrazeh: "ijalj",
  },
  avoid: {
    Jaramah: "ijanaj",
    Zonrazeh: "ijalj",
  },
  drain: {
    Jaramah: "guej",
    Zonrazeh: "guej",
  },
  dream: {
    Jaramah: "mayadej",
    Zonrazeh: "mayadej",
  },
  drink: {
    Jaramah: "sakim",
    Zonrazeh: "ajukwa",
  },
  drop: {
    Jaramah: "poroj",
    Zonrazeh: "poroj",
  },
  drown: {
    Jaramah: "shij",
    Zonrazeh: "shij",
  },
  dry: {
    Jaramah: "thyej",
    Zonrazeh: "thyej",
  },
  dessicate: {
    Jaramah: "thyej",
    Zonrazeh: "thyej",
  },
  blast: {
    Jaramah: "thyej",
    Zonrazeh: "thyej",
  },
  waste: {
    Jaramah: "thyej",
    Zonrazeh: "thyej",
  },
  eat: {
    Jaramah: "udaj",
    Zonrazeh: "oshaj",
  },
  elevate: {
    Jaramah: "alisej",
    Zonrazeh: "alisej",
  },
  lift: {
    Jaramah: "alisej",
    Zonrazeh: "alisej",
  },
  embarrass: {
    Jaramah: "riyooj",
    Zonrazeh: "riyuj",
  },
  enclose: {
    Jaramah: "neeneej",
    Zonrazeh: "neej",
  },
  surround: {
    Jaramah: "neeneej",
    Zonrazeh: "neej",
  },
  corral: {
    Jaramah: "neeneej",
    Zonrazeh: "neej",
  },
  endanger: {
    Jaramah: "terooj",
    Zonrazeh: "teruj",
  },
  end: {
    Jaramah: "denzaj",
    Zonrazeh: "denzaj",
  },
  enter: {
    Jaramah: "indaj",
    Zonrazeh: "indaj",
  },
  exceed: {
    Jaramah: "geaoj",
    Zonrazeh: "geaoj",
  },
  pass: {
    Jaramah: "meij",
    Zonrazeh: "meij",
  },
  excite: {
    Jaramah: "wakaj",
    Zonrazeh: "uakaj",
  },
  exist: {
    Jaramah: "hasteh",
    Zonrazeh: "hasteh",
  },
  expect: {
    Jaramah: "ekaj",
    Zonrazeh: "ekaj",
  },
  explode: {
    Jaramah: "arbaj",
    Zonrazeh: "arbaj",
  },
  explore: {
    Jaramah: "ifaj",
    Zonrazeh: "yefaj",
  },
  express: {
    Jaramah: "idaj",
    Zonrazeh: "ouor",
  },
  communicate: {
    Jaramah: "idaj",
    Zonrazeh: "ouor",
  },
  fall: {
    Jaramah: "nej",
    Zonrazeh: "lojdahri",
  },
  farm: {
    Jaramah: "thej",
    Zonrazeh: "thej",
  },
  fear: {
    Jaramah: "sijej",
    Zonrazeh: "sijej",
  },
  feed: {
    Jaramah: "katej",
    Zonrazeh: "katej",
  },
  emotion: {
    Jaramah: "kanej",
    Zonrazeh: "kanej",
  },
  feel: {
    Jaramah: "saj",
    Zonrazeh: "saj",
  },
  fight: {
    Jaramah: "gavej",
    Zonrazeh: "gavej",
  },
  finish: {
    Jaramah: "ridenj",
    Zonrazeh: "ridenj",
  },
  flow: {
    Jaramah: "hrej",
    Zonrazeh: "hrej",
  },
  fly: {
    Jaramah: "fidej",
    Zonrazeh: "fidej",
  },
  follow: {
    Jaramah: "fedakheen",
    Zonrazeh: "fedakhin",
  },
  forget: {
    Jaramah: "yulipuj",
    Zonrazeh: "yulipuj",
  },
  free: {
    Jaramah: "karas u",
    Zonrazeh: "behajbej",
  },
  frown: {
    Jaramah: "buwapaj",
    Zonrazeh: "buapaj",
  },
  force: {
    Jaramah: "uvaj",
    Zonrazeh: "uvaj",
  },
  coerce: {
    Jaramah: "uvaj",
    Zonrazeh: "uvaj",
  },
  strongarm: {
    Jaramah: "uvaj",
    Zonrazeh: "uvaj",
  },
  herd: {
    Jaramah: "tejaj",
    Zonrazeh: "tejaj",
  },
  shepherd: {
    Jaramah: "tejaj",
    Zonrazeh: "tejaj",
  },
  gather: {
    Jaramah: "tejaj",
    Zonrazeh: "tejaj",
  },
  gild: {
    Jaramah: "nilij",
    Zonrazeh: "nilij",
  },
  embellish: {
    Jaramah: "nilij",
    Zonrazeh: "nilij",
  },
  give: {
    Jaramah: "kejaj",
    Zonrazeh: "kejaj",
  },
  gift: {
    Jaramah: "kejaj",
    Zonrazeh: "kejaj",
  },
  glow: {
    Jaramah: "sadaj",
    Zonrazeh: "sadaj",
  },
  go: {
    Jaramah: "ihpij",
    Zonrazeh: "ipij",
  },
  govern: {
    Jaramah: "eelaj",
    Zonrazeh: "oolaj",
  },
  grasp: {
    Jaramah: "snij",
    Zonrazeh: "snij",
  },
  grow: {
    Jaramah: "sarmooj",
    Zonrazeh: "sarmooj",
  },
  prosper: {
    Jaramah: "sarmooj",
    Zonrazeh: "sarmooj",
  },
  guard: {
    Jaramah: "makhaj",
    Zonrazeh: "makhaj",
  },
  guide: {
    Jaramah: "reohaj",
    Zonrazeh: "reohaj",
  },
  happen: {
    Jaramah: "ohilaj",
    Zonrazeh: "ohilaj",
  },
  happy: {
    Jaramah: "hamulaj",
    Zonrazeh: "hamulaj",
  },
  delight: {
    Jaramah: "hamulaj",
    Zonrazeh: "hamulaj",
  },
  harvest: {
    Jaramah: "shikshaj",
    Zonrazeh: "shikshaj",
  },
  hate: {
    Jaramah: "gatraj",
    Zonrazeh: "gatraj",
  },
  hold: {
    Jaramah: "ajaj",
    Zonrazeh: "ajaj",
  },
  faith: {
    Jaramah: "aleoj",
    Zonrazeh: "aleoj",
  },
  sex: {
    Jaramah: "artabaj",
    Zonrazeh: "buraj",
  },
  heal: {
    Jaramah: "seluej",
    Zonrazeh: "seluej",
  },
  hear: {
    Jaramah: "dej",
    Zonrazeh: "dej",
  },
  heat: {
    Jaramah: "sraj",
    Zonrazeh: "sraj",
  },
  help: {
    Jaramah: "alooj",
    Zonrazeh: "akoej",
  },
  aid: {
    Jaramah: "alooj",
    Zonrazeh: "akoej",
  },
  hide: {
    Jaramah: "numuj",
    Zonrazeh: "numuj",
  },
  hit: {
    Jaramah: "faboj",
    Zonrazeh: "faboj",
  },
  house: {
    Jaramah: "sehej sej",
    Zonrazeh: "sehej",
  },
  contain: {
    Jaramah: "sehej sej",
    Zonrazeh: "sehej",
  },
  hope: {
    Jaramah: "arahj",
    Zonrazeh: "gesfan",
  },
  hunger: {
    Jaramah: "junij",
    Zonrazeh: "junij",
  },
  imagine: {
    Jaramah: "jemej",
    Zonrazeh: "jemej",
  },
  immerse: {
    Jaramah: "shukej",
    Zonrazeh: "shukej",
  },
  imply: {
    Jaramah: "pifiej",
    Zonrazeh: "pifiej",
  },
  inform: {
    Jaramah: "denej",
    Zonrazeh: "denej",
  },
  instruct: {
    Jaramah: "sulej",
    Zonrazeh: "sulej",
  },
  demonstrate: {
    Jaramah: "sulej",
    Zonrazeh: "sulej",
  },
  show: {
    Jaramah: "sulej",
    Zonrazeh: "sulej",
  },
  join: {
    Jaramah: "burdaj",
    Zonrazeh: "desaj",
  },
  journey: {
    Jaramah: "rujipij",
    Zonrazeh: "rujipij",
  },
  jump: {
    Jaramah: "bantej",
    Zonrazeh: "bantej",
  },
  keep: {
    Jaramah: "werej",
    Zonrazeh: "yutyu",
  },
  kill: {
    Jaramah: "kagej",
    Zonrazeh: "kagej",
  },
  kiss: {
    Jaramah: "sukkej",
    Zonrazeh: "sukkej",
  },
  know: {
    Jaramah: "menaj",
    Zonrazeh: "menaj",
  },
  lay: {
    Jaramah: "pyaj",
    Zonrazeh: "pyaj",
  },
  place: {
    Jaramah: "pyaj",
    Zonrazeh: "pyaj",
  },
  put: {
    Jaramah: "pyaj",
    Zonrazeh: "pyaj",
  },
  learn: {
    Jaramah: "naj",
    Zonrazeh: "naj",
  },
  lie: {
    Jaramah: "uwamaj",
    Zonrazeh: "ooamaj",
  },
  like: {
    Jaramah: "imaj",
    Zonrazeh: "imaj",
  },
  listen: {
    Jaramah: "tedej",
    Zonrazeh: "tedej",
  },
  live: {
    Jaramah: "joh",
    Zonrazeh: "beah",
  },
  remain: {
    Jaramah: "joh",
    Zonrazeh: "beah",
  },
  last: {
    Jaramah: "joh",
    Zonrazeh: "beah",
  },
  locate: {
    Jaramah: "amenonaj",
    Zonrazeh: "amenonaj",
  },
  lock: {
    Jaramah: "kalaj",
    Zonrazeh: "kalaj",
  },
  secure: {
    Jaramah: "tabit",
    Zonrazeh: "tabit",
  },
  lonely: {
    Jaramah: "bitooj",
    Zonrazeh: "bituj",
  },
  look: {
    Jaramah: "wakaj",
    Zonrazeh: "uakaj",
  },
  lose: {
    Jaramah: "guij",
    Zonrazeh: "wajk",
  },
  love: {
    Jaramah: "shej",
    Zonrazeh: "shej",
  },
  lull: {
    Jaramah: "asrej",
    Zonrazeh: "asrej",
  },
  lust: {
    Jaramah: "serij",
    Zonrazeh: "serij",
  },
  horny: {
    Jaramah: "serij",
    Zonrazeh: "serij",
  },
  construct: {
    Jaramah: "kalij",
    Zonrazeh: "kalij",
  },
  manifest: {
    Jaramah: "alendimej",
    Zonrazeh: "alendimej",
  },
  materialize: {
    Jaramah: "alendimej",
    Zonrazeh: "alendimej",
  },
  manipulate: {
    Jaramah: "andej",
    Zonrazeh: "andej",
  },
  massacre: {
    Jaramah: "vespej",
    Zonrazeh: "vespej",
  },
  meet: {
    Jaramah: "veraj",
    Zonrazeh: "veraj",
  },
  unite: {
    Jaramah: "veraj",
    Zonrazeh: "veraj",
  },
  move: {
    Jaramah: "debaj",
    Zonrazeh: "sahmdu",
  },
  get: {
    Jaramah: "weja",
    Zonrazeh: "brumak",
  },
  namecall: {
    Jaramah: "nanaj",
    Zonrazeh: "nanaj",
  },
  notice: {
    Jaramah: "hamedaj",
    Zonrazeh: "hamedaj",
  },
  nourish: {
    Jaramah: "kadej",
    Zonrazeh: "kadej",
  },
  offend: {
    Jaramah: "agahaj",
    Zonrazeh: "agahaj",
  },
  officiate: {
    Jaramah: "ekatej",
    Zonrazeh: "ekatej",
  },
  open: {
    Jaramah: "hoshaj",
    Zonrazeh: "hoshaj",
  },
  oppress: {
    Jaramah: "omaj",
    Zonrazeh: "omaj",
  },
  smother: {
    Jaramah: "omaj",
    Zonrazeh: "omaj",
  },
  pusharound: {
    Jaramah: "omaj",
    Zonrazeh: "omaj",
  },
  ordain: {
    Jaramah: "tafalej",
    Zonrazeh: "tafalej",
  },
  order: {
    Jaramah: "dabaj",
    Zonrazeh: "dabaj",
  },
  own: {
    Jaramah: "ajataj",
    Zonrazeh: "ajataj",
  },
  owe: {
    Jaramah: "okij",
    Zonrazeh: "okij",
  },
  responsibility: {
    Jaramah: "okij",
    Zonrazeh: "okij",
  },
  persevere: {
    Jaramah: "ganej",
    Zonrazeh: "ganej",
  },
  picture: {
    Jaramah: "jemej",
    Zonrazeh: "jemej",
  },
  pour: {
    Jaramah: "vrishij",
    Zonrazeh: "vrishij",
  },
  pray: {
    Jaramah: "manelej",
    Zonrazeh: "manelej",
  },
  preach: {
    Jaramah: "tarej",
    Zonrazeh: "tarej",
  },
  pretend: {
    Jaramah: "suwapoj",
    Zonrazeh: "suapoj",
  },
  protect: {
    Jaramah: "howanaj",
    Zonrazeh: "houanaj",
  },
  object: {
    Jaramah: "demej",
    Zonrazeh: "demej",
  },
  protest: {
    Jaramah: "demej",
    Zonrazeh: "demej",
  },
  pull: {
    Jaramah: "fej",
    Zonrazeh: "fej",
  },
  push: {
    Jaramah: "thaj",
    Zonrazeh: "thaj",
  },
  pursue: {
    Jaramah: "sitooj",
    Zonrazeh: "situj",
  },
  quiet: {
    Jaramah: "anej",
    Zonrazeh: "anej",
  },
  raise: {
    Jaramah: "ohdrenej",
    Zonrazeh: "odrenej",
  },
  reach: {
    Jaramah: "hanaj",
    Zonrazeh: "hanaj",
  },
  read: {
    Jaramah: "ahdenaj",
    Zonrazeh: "adenaj",
  },
  rebel: {
    Jaramah: "kuwakej",
    Zonrazeh: "kuwokej",
  },
  receive: {
    Jaramah: "weja",
    Zonrazeh: "brumak",
  },
  recognize: {
    Jaramah: "senmenej",
    Zonrazeh: "senmenej",
  },
  regard: {
    Jaramah: "yimij",
    Zonrazeh: "yimij",
  },
  consider: {
    Jaramah: "yimij",
    Zonrazeh: "yimij",
  },
  observe: {
    Jaramah: "yimij",
    Zonrazeh: "yimij",
  },
  remember: {
    Jaramah: "vansooj",
    Zonrazeh: "vansuj",
  },
  remind: {
    Jaramah: "adekahej",
    Zonrazeh: "adekahej",
  },
  renew: {
    Jaramah: "dasaj",
    Zonrazeh: "dasaj",
  },
  revive: {
    Jaramah: "dasaj",
    Zonrazeh: "dasaj",
  },
  repeat: {
    Jaramah: "tarabej",
    Zonrazeh: "tarabej",
  },
  request: {
    Jaramah: "lepekooj",
    Zonrazeh: "lepekuj",
  },
  require: {
    Jaramah: "gahj",
    Zonrazeh: "ekej",
  },
  need: {
    Jaramah: "gahj",
    Zonrazeh: "ekej",
  },
  rest: {
    Jaramah: "sotaj",
    Zonrazeh: "sotaj",
  },
  return: {
    Jaramah: "tarakej",
    Zonrazeh: "tarakej",
  },
  rotate: {
    Jaramah: "wouj",
    Zonrazeh: "wouj",
  },
  revolve: {
    Jaramah: "wouj",
    Zonrazeh: "wouj",
  },
  rule: {
    Jaramah: "ajumak",
    Zonrazeh: "ajoomakesn",
  },
  run: {
    Jaramah: "korej",
    Zonrazeh: "korej",
  },
  sad: {
    Jaramah: "waredej",
    Zonrazeh: "uaredej",
  },
  save: {
    Jaramah: "gethej",
    Zonrazeh: "gethej",
  },
  scatter: {
    Jaramah: "diaspora",
    Zonrazeh: "diapora",
  },
  search: {
    Jaramah: "abhaj",
    Zonrazeh: "abhaj",
  },
  see: {
    Jaramah: "medaj",
    Zonrazeh: "medaj",
  },
  seek: {
    Jaramah: "winej",
    Zonrazeh: "uinej",
  },
  seem: {
    Jaramah: "dimej",
    Zonrazeh: "dimej",
  },
  appear: {
    Jaramah: "dimej",
    Zonrazeh: "dimej",
  },
  serve: {
    Jaramah: "ahbej",
    Zonrazeh: "abej",
  },
  share: {
    Jaramah: "awabej",
    Zonrazeh: "auabej",
  },
  shroud: {
    Jaramah: "lehyej",
    Zonrazeh: "leyej",
  },
  shit: {
    Jaramah: "barooj",
    Zonrazeh: "barooja",
  },
  poop: {
    Jaramah: "barooj",
    Zonrazeh: "barooja",
  },
  defecate: {
    Jaramah: "barooj",
    Zonrazeh: "barooja",
  },
  shoot: {
    Jaramah: "zokaj",
    Zonrazeh: "zokaj",
  },
  shop: {
    Jaramah: "sujej",
    Zonrazeh: "sujej",
  },
  sing: {
    Jaramah: "vosej",
    Zonrazeh: "vosej",
  },
  slack: {
    Jaramah: "ksej",
    Zonrazeh: "ksej",
  },
  neglect: {
    Jaramah: "ksej",
    Zonrazeh: "ksej",
  },
  lazy: {
    Jaramah: "ksej",
    Zonrazeh: "ksej",
  },
  sleep: {
    Jaramah: "khab",
    Zonrazeh: "anuj",
  },
  smell: {
    Jaramah: "nafij",
    Zonrazeh: "nafij",
  },
  smile: {
    Jaramah: "kiwej",
    Zonrazeh: "kiuej",
  },
  speak: {
    Jaramah: "baanaj",
    Zonrazeh: "baanaj",
  },
  talk: {
    Jaramah: "baanaj",
    Zonrazeh: "baanaj",
  },
  spy: {
    Jaramah: "numenaj",
    Zonrazeh: "numenaj",
  },
  stabilize: {
    Jaramah: "thabeej",
    Zonrazeh: "thabyj",
  },
  fixup: {
    Jaramah: "thabeej",
    Zonrazeh: "thabyj",
  },
  stand: {
    Jaramah: "shahoj",
    Zonrazeh: "shahoj",
  },
  stay: {
    Jaramah: "mahaj",
    Zonrazeh: "mahaj",
  },
  steal: {
    Jaramah: "dajsyej",
    Zonrazeh: "dajsyej",
  },
  stop: {
    Jaramah: "bosij",
    Zonrazeh: "bosij",
  },
  stew: {
    Jaramah: "makej",
    Zonrazeh: "makej",
  },
  soak: {
    Jaramah: "makej",
    Zonrazeh: "makej",
  },
  simmer: {
    Jaramah: "makej",
    Zonrazeh: "makej",
  },
  strength: {
    Jaramah: "dathkejaj",
    Zonrazeh: "dathkejaj",
  },
  strengthen: {
    Jaramah: "sheyolej",
    Zonrazeh: "sheyolej",
  },
  shock: {
    Jaramah: "tahaj",
    Zonrazeh: "tahaj",
  },
  surprise: {
    Jaramah: "tahaj",
    Zonrazeh: "tahaj",
  },
  submit: {
    Jaramah: "atanaj",
    Zonrazeh: "atanaj",
  },
  swear: {
    Jaramah: "murabej",
    Zonrazeh: "murabej",
  },
  oath: {
    Jaramah: "murabej",
    Zonrazeh: "murabej",
  },
  sweep: {
    Jaramah: "aleshej",
    Zonrazeh: "aleshej",
  },
  swim: {
    Jaramah: "kwashaj",
    Zonrazeh: "kuashaj",
  },
  tandem: {
    Jaramah: "zamuj",
    Zonrazeh: "zamuj",
  },
  sync: {
    Jaramah: "zamuj",
    Zonrazeh: "zamuj",
  },
  take: {
    Jaramah: "ajekej",
    Zonrazeh: "ajekej",
  },
  deal: {
    Jaramah: "bashefej",
    Zonrazeh: "bashefej",
  },
  taste: {
    Jaramah: "beshij",
    Zonrazeh: "beshij",
  },
  teach: {
    Jaramah: "lanawaj",
    Zonrazeh: "surtkayo",
  },
  tell: {
    Jaramah: "paj",
    Zonrazeh: "paj",
  },
  say: {
    Jaramah: "paj",
    Zonrazeh: "paj",
  },
  story: {
    Jaramah: "delej",
    Zonrazeh: "delej",
  },
  tend: {
    Jaramah: "saj",
    Zonrazeh: "saj",
  },
  thirst: {
    Jaramah: "alataj",
    Zonrazeh: "alataj",
  },
  think: {
    Jaramah: "tadeej",
    Zonrazeh: "tadej",
  },
  toll: {
    Jaramah: "dandaj",
    Zonrazeh: "dandaj",
  },
  ring: {
    Jaramah: "dandaj",
    Zonrazeh: "dandaj",
  },
  torment: {
    Jaramah: "plah'yaj",
    Zonrazeh: "playaj",
  },
  scourge: {
    Jaramah: "plah'yaj",
    Zonrazeh: "playaj",
  },
  annoy: {
    Jaramah: "plah'yaj",
    Zonrazeh: "playaj",
  },
  trade: {
    Jaramah: "jalaj",
    Zonrazeh: "jalaj",
  },
  barter: {
    Jaramah: "jalaj",
    Zonrazeh: "jalaj",
  },
  train: {
    Jaramah: "befij",
    Zonrazeh: "befij",
  },
  translate: {
    Jaramah: "geniluj",
    Zonrazeh: "geniluj",
  },
  travel: {
    Jaramah: "kafoos",
    Zonrazeh: "sdalaf",
  },
  treasure: {
    Jaramah: "raskalaj",
    Zonrazeh: "raskalaj",
  },
  cherish: {
    Jaramah: "raskalaj",
    Zonrazeh: "raskalaj",
  },
  trick: {
    Jaramah: "asaj",
    Zonrazeh: "asaj",
  },
  trust: {
    Jaramah: "lohaj",
    Zonrazeh: "lohaj",
  },
  try: {
    Jaramah: "sikhij",
    Zonrazeh: "sikij",
  },
  understand: {
    Jaramah: "habmenaj",
    Zonrazeh: "habmenaj",
  },
  utilize: {
    Jaramah: "waj",
    Zonrazeh: "uaj",
  },
  vary: {
    Jaramah: "yaj",
    Zonrazeh: "yaj",
  },
  differ: {
    Jaramah: "yaj",
    Zonrazeh: "yaj",
  },
  view: {
    Jaramah: "tinij",
    Zonrazeh: "tinij",
  },
  gaze: {
    Jaramah: "tinij",
    Zonrazeh: "tinij",
  },
  violent: {
    Jaramah: "agej",
    Zonrazeh: "agej",
  },
  wait: {
    Jaramah: "henej",
    Zonrazeh: "henej",
  },
  patient: {
    Jaramah: "henej",
    Zonrazeh: "henej",
  },
  wake: {
    Jaramah: "ahsohoj",
    Zonrazeh: "asohoj",
  },
  walk: {
    Jaramah: "jadej",
    Zonrazeh: "jadej",
  },
  want: {
    Jaramah: "arz",
    Zonrazeh: "arz",
  },
  wander: {
    Jaramah: "wotej",
    Zonrazeh: "uotej",
  },
  watch: {
    Jaramah: "sedwakaj",
    Zonrazeh: "seduakaj",
  },
  weaken: {
    Jaramah: "fayolej",
    Zonrazeh: "fayolej",
  },
  wear: {
    Jaramah: "asooj",
    Zonrazeh: "asuj",
  },
  wet: {
    Jaramah: "bisoj",
    Zonrazeh: "bisoj",
  },
  moisten: {
    Jaramah: "bisoj",
    Zonrazeh: "bisoj",
  },
  whine: {
    Jaramah: "shuwij",
    Zonrazeh: "shuij",
  },
  win: {
    Jaramah: "nalaj",
    Zonrazeh: "nalaj",
  },
  wish: {
    Jaramah: "sobashaj",
    Zonrazeh: "sobashaj",
  },
  nostalgic: {
    Jaramah: "soleshej",
    Zonrazeh: "soleshej",
  },
  wistful: {
    Jaramah: "soleshej",
    Zonrazeh: "soleshej",
  },
  work: {
    Jaramah: "vethej",
    Zonrazeh: "vethej",
  },
  worry: {
    Jaramah: "jilsej",
    Zonrazeh: "jilsej",
  },
  weave: {
    Jaramah: "danej",
    Zonrazeh: "danej",
  },
  welcome: {
    Jaramah: "laraj",
    Zonrazeh: "laraj",
  },
  write: {
    Jaramah: "akaj",
    Zonrazeh: "akaj",
  },
  yell: {
    Jaramah: "tagej",
    Zonrazeh: "tagej",
  },
  yield: {
    Jaramah: "atanaj",
    Zonrazeh: "atanaj",
  },
  acquiese: {
    Jaramah: "atanaj",
    Zonrazeh: "atanaj",
  },
  color: {
    Jaramah: "rang",
    Zonrazeh: "rang",
  },
  black: {
    Jaramah: "seeyah",
    Zonrazeh: "seeyah",
  },
  blue: {
    Jaramah: "ahbi",
    Zonrazeh: "ahbi",
  },
  brown: {
    Jaramah: "ghaveh",
    Zonrazeh: "ghaveh",
  },
  cyan: {
    Jaramah: "firuz",
    Zonrazeh: "firuz",
  },
  gray: {
    Jaramah: "royah",
    Zonrazeh: "royah",
  },
  green: {
    Jaramah: "sabz",
    Zonrazeh: "sabz",
  },
  indigo: {
    Jaramah: "radah",
    Zonrazeh: "radah",
  },
  lightblue: {
    Jaramah: "sahbi",
    Zonrazeh: "sahbi",
  },
  lightgray: {
    Jaramah: "soyah",
    Zonrazeh: "soyah",
  },
  magenta: {
    Jaramah: "sharbati",
    Zonrazeh: "sharbati",
  },
  orange: {
    Jaramah: "narenji",
    Zonrazeh: "narenji",
  },
  pink: {
    Jaramah: "surati",
    Zonrazeh: "surati",
  },
  purple: {
    Jaramah: "banafsh",
    Zonrazeh: "banafsh",
  },
  red: {
    Jaramah: "habat",
    Zonrazeh: "habat",
  },
  golden: {
    Jaramah: "tahaleed",
    Zonrazeh: "tahaleed",
  },
  white: {
    Jaramah: "sefeed",
    Zonrazeh: "sefeed",
  },
  yellow: {
    Jaramah: "zahrld",
    Zonrazeh: "zahrld",
  },
  north: {
    Jaramah: "hara",
    Zonrazeh: "hara",
  },
  east: {
    Jaramah: "keju",
    Zonrazeh: "keju",
  },
  south: {
    Jaramah: "nara",
    Zonrazeh: "nara",
  },
  west: {
    Jaramah: "teju",
    Zonrazeh: "teju",
  },
  northern: {
    Jaramah: "harayim",
    Zonrazeh: "harayim",
  },
  eastern: {
    Jaramah: "kejuyim",
    Zonrazeh: "kejuyim",
  },
  southern: {
    Jaramah: "narayim",
    Zonrazeh: "narayim",
  },
  western: {
    Jaramah: "tejuyim",
    Zonrazeh: "tejuyim",
  },
  left: {
    Jaramah: "chaap",
    Zonrazeh: "chaap",
  },
  right: {
    Jaramah: "eight",
    Zonrazeh: "eyt",
  },
  apart: {
    Jaramah: "shakim",
    Zonrazeh: "shakim",
  },
  separate: {
    Jaramah: "shakim",
    Zonrazeh: "shakim",
  },
  alone: {
    Jaramah: "shakim",
    Zonrazeh: "shakim",
  },
  together: {
    Jaramah: "res",
    Zonrazeh: "res",
  },
  top: {
    Jaramah: "ohd",
    Zonrazeh: "od",
  },
  bottom: {
    Jaramah: "dek",
    Zonrazeh: "dek",
  },
  on: {
    Jaramah: "ak",
    Zonrazeh: "ak",
  },
  off: {
    Jaramah: "okh",
    Zonrazeh: "ok",
  },
  inside: {
    Jaramah: "lak",
    Zonrazeh: "lak",
  },
  outside: {
    Jaramah: "kil",
    Zonrazeh: "kil",
  },
  high: {
    Jaramah: "yeemra",
    Zonrazeh: "yeemra",
  },
  low: {
    Jaramah: "terim",
    Zonrazeh: "terim",
  },
  near: {
    Jaramah: "haswe",
    Zonrazeh: "uotar",
  },
  far: {
    Jaramah: "huhbah",
    Zonrazeh: "hoba",
  },
  front: {
    Jaramah: "ood",
    Zonrazeh: "ud",
  },
  back: {
    Jaramah: "ard",
    Zonrazeh: "ird",
  },
  behind: {
    Jaramah: "ard",
    Zonrazeh: "ird",
  },
  up: {
    Jaramah: "ihr",
    Zonrazeh: "ir",
  },
  down: {
    Jaramah: "zeh",
    Zonrazeh: "ze",
  },
  over: {
    Jaramah: "eturo",
    Zonrazeh: "eturo",
  },
  under: {
    Jaramah: "mab",
    Zonrazeh: "mab",
  },
  middle: {
    Jaramah: "nakh",
    Zonrazeh: "ersul",
  },
  mid: {
    Jaramah: "nakh",
    Zonrazeh: "ersul",
  },
  between: {
    Jaramah: "nakh",
    Zonrazeh: "ersul",
  },
  central: {
    Jaramah: "jakeh",
    Zonrazeh: "jake",
  },
  closedistance: {
    Jaramah: "wakej",
    Zonrazeh: "uakej",
  },
  beside: {
    Jaramah: "dah",
    Zonrazeh: "da",
  },
  border: {
    Jaramah: "nafar",
    Zonrazeh: "nafar",
  },
  outskirts: {
    Jaramah: "nafar",
    Zonrazeh: "nafar",
  },
  edge: {
    Jaramah: "nafar",
    Zonrazeh: "nafar",
  },
  far: {
    Jaramah: "nafar",
    Zonrazeh: "nafar",
  },
  beyond: {
    Jaramah: "sijoo",
    Zonrazeh: "siju",
  },
  large: {
    Jaramah: "booj",
    Zonrazeh: "boojat",
  },
  small: {
    Jaramah: "naooj",
    Zonrazeh: "naoot",
  },
  beautiful: {
    Jaramah: "magh",
    Zonrazeh: "mag",
  },
  ugly: {
    Jaramah: "baj",
    Zonrazeh: "boor",
  },
  tall: {
    Jaramah: "lid",
    Zonrazeh: "di'al",
  },
  short: {
    Jaramah: "gesh",
    Zonrazeh: "ges",
  },
  light: {
    Jaramah: "jan",
    Zonrazeh: "jana",
  },
  bright: {
    Jaramah: "feb",
    Zonrazeh: "jana",
  },
  dark: {
    Jaramah: "kakik",
    Zonrazeh: "kakik",
  },
  tan: {
    Jaramah: "tevik",
    Zonrazeh: "tewik",
  },
  pale: {
    Jaramah: "elis",
    Zonrazeh: "elis",
  },
  handsome: {
    Jaramah: "moso",
    Zonrazeh: "meksitar",
  },
  pretty: {
    Jaramah: "kor",
    Zonrazeh: "kor",
  },
  aggressive: {
    Jaramah: "gavev",
    Zonrazeh: "gavev",
  },
  placid: {
    Jaramah: "bok",
    Zonrazeh: "bok",
  },
  meek: {
    Jaramah: "bok",
    Zonrazeh: "bok",
  },
  tranquil: {
    Jaramah: "antih",
    Zonrazeh: "anti",
  },
  upset: {
    Jaramah: "ekis",
    Zonrazeh: "ekis",
  },
  careful: {
    Jaramah: "sedaf",
    Zonrazeh: "sedaf",
  },
  careless: {
    Jaramah: "sedek",
    Zonrazeh: "sedek",
  },
  generous: {
    Jaramah: "hijam",
    Zonrazeh: "hijam",
  },
  miserly: {
    Jaramah: "tameh",
    Zonrazeh: "tame",
  },
  just: {
    Jaramah: "ter",
    Zonrazeh: "ter",
  },
  unjust: {
    Jaramah: "zotehr",
    Zonrazeh: "zoter",
  },
  nice: {
    Jaramah: "asra",
    Zonrazeh: "asra",
  },
  kind: {
    Jaramah: "asra",
    Zonrazeh: "asra",
  },
  mean: {
    Jaramah: "aska",
    Zonrazeh: "aska",
  },
  brave: {
    Jaramah: "kisrau",
    Zonrazeh: "kewro",
  },
  cowardly: {
    Jaramah: "gikeh",
    Zonrazeh: "gike",
  },
  chaste: {
    Jaramah: "nik",
    Zonrazeh: "nik",
  },
  lecherous: {
    Jaramah: "fezik",
    Zonrazeh: "fezik",
  },
  promiscuous: {
    Jaramah: "fezik",
    Zonrazeh: "fezik",
  },
  religious: {
    Jaramah: "maev",
    Zonrazeh: "maev",
  },
  irreligious: {
    Jaramah: "vomaev",
    Zonrazeh: "vomaev",
  },
  brazen: {
    Jaramah: "kisha",
    Zonrazeh: "kisha",
  },
  bold: {
    Jaramah: "kisha",
    Zonrazeh: "kisha",
  },
  cheeky: {
    Jaramah: "kisha",
    Zonrazeh: "kisha",
  },
  immodest: {
    Jaramah: "kisha",
    Zonrazeh: "kisha",
  },
  audacious: {
    Jaramah: "kisha",
    Zonrazeh: "kisha",
  },
  timid: {
    Jaramah: "numeh",
    Zonrazeh: "nume",
  },
  shy: {
    Jaramah: "numeh",
    Zonrazeh: "nume",
  },
  polite: {
    Jaramah: "numeh",
    Zonrazeh: "nume",
  },
  modest: {
    Jaramah: "numeh",
    Zonrazeh: "nume",
  },
  smart: {
    Jaramah: "shaf",
    Zonrazeh: "shaf",
  },
  stupid: {
    Jaramah: "gorgorg",
    Zonrazeh: "zabe",
  },
  virtuous: {
    Jaramah: "rishi",
    Zonrazeh: "ryshy",
  },
  corrupt: {
    Jaramah: "shegeh",
    Zonrazeh: "shege",
  },
  charming: {
    Jaramah: "hili",
    Zonrazeh: "hyly",
  },
  seductive: {
    Jaramah: "hili",
    Zonrazeh: "hyly",
  },
  loyal: {
    Jaramah: "avee",
    Zonrazeh: "avy",
  },
  repulsive: {
    Jaramah: "mawak",
    Zonrazeh: "mawak",
  },
  contentious: {
    Jaramah: "dal",
    Zonrazeh: "dal",
  },
  rude: {
    Jaramah: "dal",
    Zonrazeh: "dal",
  },
  disagreeable: {
    Jaramah: "dal",
    Zonrazeh: "dal",
  },
  agreeable: {
    Jaramah: "gov",
    Zonrazeh: "gov",
  },
  amicable: {
    Jaramah: "gov",
    Zonrazeh: "gov",
  },
  compatible: {
    Jaramah: "gov",
    Zonrazeh: "gov",
  },
  collected: {
    Jaramah: "wik",
    Zonrazeh: "uik",
  },
  neat: {
    Jaramah: "wik",
    Zonrazeh: "uik",
  },
  organized: {
    Jaramah: "wik",
    Zonrazeh: "uik",
  },
  scattered: {
    Jaramah: "palik",
    Zonrazeh: "palik",
  },
  disorderly: {
    Jaramah: "palik",
    Zonrazeh: "palik",
  },
  authoritative: {
    Jaramah: "ashaf",
    Zonrazeh: "ashaf",
  },
  traitorous: {
    Jaramah: "sibih",
    Zonrazeh: "sibi",
  },
  wise: {
    Jaramah: "oleem",
    Zonrazeh: "jarbajar",
  },
  sage: {
    Jaramah: "hambed",
    Zonrazeh: "hambed",
  },
  foolish: {
    Jaramah: "abal",
    Zonrazeh: "abal",
  },
  happy: {
    Jaramah: "amuli",
    Zonrazeh: "amuly",
  },
  sad: {
    Jaramah: "wareh",
    Zonrazeh: "ware",
  },
  angry: {
    Jaramah: "tegk",
    Zonrazeh: "tegk",
  },
  wistful: {
    Jaramah: "leshek",
    Zonrazeh: "leshek",
  },
  lonely: {
    Jaramah: "biyu",
    Zonrazeh: "biu",
  },
  excited: {
    Jaramah: "wakih",
    Zonrazeh: "uaki",
  },
  nervous: {
    Jaramah: "sith",
    Zonrazeh: "sith",
  },
  worried: {
    Jaramah: "jis",
    Zonrazeh: "jis",
  },
  calm: {
    Jaramah: "gard",
    Zonrazeh: "gard",
  },
  jealous: {
    Jaramah: "oorim",
    Zonrazeh: "urim",
  },
  hungry: {
    Jaramah: "joomib",
    Zonrazeh: "jumib",
  },
  desirous: {
    Jaramah: "ojeh",
    Zonrazeh: "oje",
  },
  lustful: {
    Jaramah: "seril",
    Zonrazeh: "seril",
  },
  ashamed: {
    Jaramah: "yepehr",
    Zonrazeh: "yeper",
  },
  passionate: {
    Jaramah: "habib",
    Zonrazeh: "habib",
  },
  grateful: {
    Jaramah: "peren",
    Zonrazeh: "peren",
  },
  expectant: {
    Jaramah: "ekaf",
    Zonrazeh: "ekaf",
  },
  fearful: {
    Jaramah: "sijaf",
    Zonrazeh: "sijaf",
  },
  hateful: {
    Jaramah: "gataf",
    Zonrazeh: "gataf",
  },
  hopeful: {
    Jaramah: "haraf",
    Zonrazeh: "haraf",
  },
  surprised: {
    Jaramah: "tath",
    Zonrazeh: "tath",
  },
  wrath: {
    Jaramah: "gaz",
    Zonrazeh: "gaz",
  },
  mercy: {
    Jaramah: "asren",
    Zonrazeh: "erahul",
  },
  desperate: {
    Jaramah: "harek",
    Zonrazeh: "harek",
  },
  hopeless: {
    Jaramah: "harek",
    Zonrazeh: "harek",
  },
  boastful: {
    Jaramah: "srajaf",
    Zonrazeh: "srajaf",
  },
  resolute: {
    Jaramah: "baden",
    Zonrazeh: "baden",
  },
  paranoid: {
    Jaramah: "ander",
    Zonrazeh: "sovander",
  },
  apologetic: {
    Jaramah: "ayam",
    Zonrazeh: "ayam",
  },
  cold: {
    Jaramah: "khe",
    Zonrazeh: "ke",
  },
  hot: {
    Jaramah: "seer",
    Zonrazeh: "syr",
  },
  cool: {
    Jaramah: "tikeh",
    Zonrazeh: "tike",
  },
  warm: {
    Jaramah: "tiseer",
    Zonrazeh: "tisyr",
  },
  wet: {
    Jaramah: "bis",
    Zonrazeh: "bis",
  },
  dry: {
    Jaramah: "thyeh",
    Zonrazeh: "thye",
  },
  empty: {
    Jaramah: "ek",
    Zonrazeh: "ek",
  },
  full: {
    Jaramah: "afu",
    Zonrazeh: "afu",
  },
  bad: {
    Jaramah: "ku",
    Zonrazeh: "ku",
  },
  good: {
    Jaramah: "eytu",
    Zonrazeh: "eytu",
  },
  old: {
    Jaramah: "kem",
    Zonrazeh: "damht",
  },
  new: {
    Jaramah: "som",
    Zonrazeh: "surutaf",
  },
  private: {
    Jaramah: "vit",
    Zonrazeh: "vit",
  },
  public: {
    Jaramah: "koop",
    Zonrazeh: "kup",
  },
  strong: {
    Jaramah: "sheh",
    Zonrazeh: "she",
  },
  tough: {
    Jaramah: "sheh",
    Zonrazeh: "she",
  },
  weak: {
    Jaramah: "fah",
    Zonrazeh: "fa",
  },
  fragile: {
    Jaramah: "fah",
    Zonrazeh: "fa",
  },
  clean: {
    Jaramah: "shoos",
    Zonrazeh: "shus",
  },
  dirty: {
    Jaramah: "fek",
    Zonrazeh: "fek",
  },
  wealthy: {
    Jaramah: "waj",
    Zonrazeh: "uaj",
  },
  poor: {
    Jaramah: "ryoog",
    Zonrazeh: "ryug",
  },
  victorious: {
    Jaramah: "naladh",
    Zonrazeh: "nalad",
  },
  defeated: {
    Jaramah: "zehr",
    Zonrazeh: "zer",
  },
  failed: {
    Jaramah: "zehr",
    Zonrazeh: "zer",
  },
  free: {
    Jaramah: "hameer",
    Zonrazeh: "hamyr",
  },
  bound: {
    Jaramah: "hakh",
    Zonrazeh: "hak",
  },
  confined: {
    Jaramah: "hakh",
    Zonrazeh: "hak",
  },
  holy: {
    Jaramah: "maeh",
    Zonrazeh: "mae",
  },
  unholy: {
    Jaramah: "vomaeh",
    Zonrazeh: "vomae",
  },
  fertile: {
    Jaramah: "mu",
    Zonrazeh: "mu",
  },
  abundant: {
    Jaramah: "mu",
    Zonrazeh: "mu",
  },
  barren: {
    Jaramah: "peh",
    Zonrazeh: "pe",
  },
  scarce: {
    Jaramah: "peh",
    Zonrazeh: "pe",
  },
  eternal: {
    Jaramah: "inajaj",
    Zonrazeh: "majwa",
  },
  forever: {
    Jaramah: "inajaj",
    Zonrazeh: "majwa",
  },
  temporary: {
    Jaramah: "opeh",
    Zonrazeh: "ope",
  },
  fleeting: {
    Jaramah: "opeh",
    Zonrazeh: "ope",
  },
  transitory: {
    Jaramah: "opeh",
    Zonrazeh: "ope",
  },
  loud: {
    Jaramah: "kom",
    Zonrazeh: "kom",
  },
  quiet: {
    Jaramah: "an",
    Zonrazeh: "an",
  },
  turbulent: {
    Jaramah: "shivih",
    Zonrazeh: "shivi",
  },
  still: {
    Jaramah: "gewa",
    Zonrazeh: "keta",
  },
  long: {
    Jaramah: "fosh",
    Zonrazeh: "fos",
  },
  late: {
    Jaramah: "koot",
    Zonrazeh: "kut",
  },
  important: {
    Jaramah: "ras",
    Zonrazeh: "ras",
  },
  trivial: {
    Jaramah: "jok",
    Zonrazeh: "jok",
  },
  essential: {
    Jaramah: "varah",
    Zonrazeh: "sendi",
  },
  nonessential: {
    Jaramah: "vajok",
    Zonrazeh: "vajok",
  },
  vast: {
    Jaramah: "asaan",
    Zonrazeh: "asaan",
  },
  huge: {
    Jaramah: "asaan",
    Zonrazeh: "asaan",
  },
  tiny: {
    Jaramah: "ti",
    Zonrazeh: "ty",
  },
  puny: {
    Jaramah: "ti",
    Zonrazeh: "ty",
  },
  known: {
    Jaramah: "menaja",
    Zonrazeh: "menaja",
  },
  unknown: {
    Jaramah: "pekmen",
    Zonrazeh: "pekmen",
  },
  deep: {
    Jaramah: "mahg",
    Zonrazeh: "mag",
  },
  lower: {
    Jaramah: "mahg",
    Zonrazeh: "mag",
  },
  shallow: {
    Jaramah: "hisha",
    Zonrazeh: "hisha",
  },
  upper: {
    Jaramah: "hisha",
    Zonrazeh: "hisha",
  },
  opposite: {
    Jaramah: "yukal",
    Zonrazeh: "yukal",
  },
  identical: {
    Jaramah: "toofill",
    Zonrazeh: "tufil",
  },
  same: {
    Jaramah: "toofill",
    Zonrazeh: "tufil",
  },
  virile: {
    Jaramah: "dathadh",
    Zonrazeh: "dathad",
  },
  healthy: {
    Jaramah: "dathadh",
    Zonrazeh: "dathad",
  },
  unhealthy: {
    Jaramah: "vodathadh",
    Zonrazeh: "vodathad",
  },
  sick: {
    Jaramah: "vodathadh",
    Zonrazeh: "vodathad",
  },
  hidden: {
    Jaramah: "noom",
    Zonrazeh: "num",
  },
  secret: {
    Jaramah: "noom",
    Zonrazeh: "num",
  },
  open: {
    Jaramah: "hos",
    Zonrazeh: "hos",
  },
  closed: {
    Jaramah: "kabeh",
    Zonrazeh: "kabe",
  },
  acquired: {
    Jaramah: "bav",
    Zonrazeh: "bav",
  },
  learned: {
    Jaramah: "bav",
    Zonrazeh: "bav",
  },
  innate: {
    Jaramah: "vab",
    Zonrazeh: "vab",
  },
  flat: {
    Jaramah: "sidel",
    Zonrazeh: "sidel",
  },
  rough: {
    Jaramah: "okk",
    Zonrazeh: "okk",
  },
  unifying: {
    Jaramah: "besha",
    Zonrazeh: "bershal",
  },
  famous: {
    Jaramah: "besha",
    Zonrazeh: "bershal",
  },
  popular: {
    Jaramah: "besha",
    Zonrazeh: "bershal",
  },
  divisive: {
    Jaramah: "shakev",
    Zonrazeh: "shakev",
  },
  unpopular: {
    Jaramah: "shakev",
    Zonrazeh: "shakev",
  },
  controversial: {
    Jaramah: "shakev",
    Zonrazeh: "shakev",
  },
  great: {
    Jaramah: "toj y",
    Zonrazeh: "taj",
  },
  mediocre: {
    Jaramah: "gemeh",
    Zonrazeh: "geme",
  },
  glorious: {
    Jaramah: "dafav",
    Zonrazeh: "dafav",
  },
  likable: {
    Jaramah: "imit",
    Zonrazeh: "imit",
  },
  unlikable: {
    Jaramah: "imak",
    Zonrazeh: "imak",
  },
  belligerent: {
    Jaramah: "tak",
    Zonrazeh: "tak",
  },
  peaceful: {
    Jaramah: "woobam",
    Zonrazeh: "woobamat",
  },
  adaptable: {
    Jaramah: "niloo",
    Zonrazeh: "nilu",
  },
  curious: {
    Jaramah: "peka",
    Zonrazeh: "peka",
  },
  unfriendly: {
    Jaramah: "zolokev",
    Zonrazeh: "zolokev",
  },
  friendly: {
    Jaramah: "lokev",
    Zonrazeh: "lokev",
  },
  caring: {
    Jaramah: "seti",
    Zonrazeh: "sety",
  },
  uncaring: {
    Jaramah: "zoseti",
    Zonrazeh: "zosety",
  },
  believing: {
    Jaramah: "aweh",
    Zonrazeh: "awe",
  },
  disbelieving: {
    Jaramah: "zoaweh",
    Zonrazeh: "zoaue",
  },
  cooperative: {
    Jaramah: "yukoh",
    Zonrazeh: "yuko",
  },
  rebellious: {
    Jaramah: "kuwa",
    Zonrazeh: "kuwas",
  },
  hardworking: {
    Jaramah: "guveth",
    Zonrazeh: "guveth",
  },
  lazy: {
    Jaramah: "kseh",
    Zonrazeh: "kse",
  },
  offensive: {
    Jaramah: "agav",
    Zonrazeh: "agav",
  },
  defensive: {
    Jaramah: "hakk",
    Zonrazeh: "hakk",
  },
  necessary: {
    Jaramah: "elik",
    Zonrazeh: "elik",
  },
  unnecessary: {
    Jaramah: "zoelk",
    Zonrazeh: "zoelk",
  },
  clear: {
    Jaramah: "vesh",
    Zonrazeh: "vesh",
  },
  transparent: {
    Jaramah: "vesh",
    Zonrazeh: "vesh",
  },
  obvious: {
    Jaramah: "vesh",
    Zonrazeh: "vesh",
  },
  opaque: {
    Jaramah: "kok",
    Zonrazeh: "kok",
  },
  vague: {
    Jaramah: "kok",
    Zonrazeh: "kok",
  },
  pure: {
    Jaramah: "keesh",
    Zonrazeh: "kysh",
  },
  fresh: {
    Jaramah: "keesh",
    Zonrazeh: "kysh",
  },
  spoiled: {
    Jaramah: "bahk",
    Zonrazeh: "bak",
  },
  rotten: {
    Jaramah: "bahk",
    Zonrazeh: "bak",
  },
  creative: {
    Jaramah: "gerah",
    Zonrazeh: "gera",
  },
  destructive: {
    Jaramah: "vas",
    Zonrazeh: "vas",
  },
  thoughtful: {
    Jaramah: "tadafu",
    Zonrazeh: "tadafu",
  },
  thoughtless: {
    Jaramah: "tadek",
    Zonrazeh: "tadek",
  },
  official: {
    Jaramah: "ekeh",
    Zonrazeh: "eke",
  },
  unofficial: {
    Jaramah: "zoek",
    Zonrazeh: "zoek",
  },
  dead: {
    Jaramah: "bakav",
    Zonrazeh: "bakav",
  },
  alive: {
    Jaramah: "kajav",
    Zonrazeh: "kajav",
  },
  faithful: {
    Jaramah: "aleahf",
    Zonrazeh: "aleaf",
  },
  unfaithful: {
    Jaramah: "alek",
    Zonrazeh: "alek",
  },
  emotional: {
    Jaramah: "kanaf",
    Zonrazeh: "kanaf",
  },
  sensitive: {
    Jaramah: "kanaf",
    Zonrazeh: "kanaf",
  },
  callous: {
    Jaramah: "kanek",
    Zonrazeh: "kanek",
  },
  insensitive: {
    Jaramah: "kanek",
    Zonrazeh: "kanek",
  },
  extant: {
    Jaramah: "jad",
    Zonrazeh: "jad",
  },
  nonexistant: {
    Jaramah: "zojad",
    Zonrazeh: "zojad",
  },
  restful: {
    Jaramah: "sotaf",
    Zonrazeh: "sotaf",
  },
  restless: {
    Jaramah: "sotek",
    Zonrazeh: "sotek",
  },
  prayerful: {
    Jaramah: "manaf",
    Zonrazeh: "manaf",
  },
  helpful: {
    Jaramah: "akev",
    Zonrazeh: "akev",
  },
  bountiful: {
    Jaramah: "mumekyu",
    Zonrazeh: "mumekyu",
  },
  accusatory: {
    Jaramah: "vedar",
    Zonrazeh: "vedar",
  },
  repetitive: {
    Jaramah: "tarara",
    Zonrazeh: "tarara",
  },
  deceptive: {
    Jaramah: "ava",
    Zonrazeh: "ava",
  },
  servile: {
    Jaramah: "abet",
    Zonrazeh: "abet",
  },
  informative: {
    Jaramah: "denev",
    Zonrazeh: "denev",
  },
  crazy: {
    Jaramah: "dumi",
    Zonrazeh: "dumy",
  },
  mad: {
    Jaramah: "dumi",
    Zonrazeh: "dumy",
  },
  instructive: {
    Jaramah: "sulek",
    Zonrazeh: "sulek",
  },
  sing: {
    Jaramah: "voshil",
    Zonrazeh: "voshil",
  },
  song: {
    Jaramah: "voshil",
    Zonrazeh: "voshil",
  },
  protective: {
    Jaramah: "hoen",
    Zonrazeh: "hoen",
  },
  draining: {
    Jaramah: "gooem",
    Zonrazeh: "guem",
  },
  dreamy: {
    Jaramah: "mai",
    Zonrazeh: "may",
  },
  dreamlike: {
    Jaramah: "mai",
    Zonrazeh: "june",
  },
  violent: {
    Jaramah: "agh",
    Zonrazeh: "ag",
  },
  thirsty: {
    Jaramah: "altah",
    Zonrazeh: "alta",
  },
  secure: {
    Jaramah: "akal",
    Zonrazeh: "akal",
  },
  tricky: {
    Jaramah: "asafu",
    Zonrazeh: "asafu",
  },
  trusting: {
    Jaramah: "lohafu",
    Zonrazeh: "lohafu",
  },
  useful: {
    Jaramah: "ijatratab",
    Zonrazeh: "rowatra",
  },
  useless: {
    Jaramah: "borahsca",
    Zonrazeh: "hurslat",
  },
  underperform: {
    Jaramah: "borahsca",
    Zonrazeh: "hurslat",
  },
  smelly: {
    Jaramah: "nafeed",
    Zonrazeh: "nafyd",
  },
  odious: {
    Jaramah: "nafeed",
    Zonrazeh: "nafyd",
  },
  talkative: {
    Jaramah: "baanem",
    Zonrazeh: "baanem",
  },
  tasty: {
    Jaramah: "gubes",
    Zonrazeh: "gubes",
  },
  insightful: {
    Jaramah: "gumed",
    Zonrazeh: "gumed",
  },
  sleepy: {
    Jaramah: "anujek",
    Zonrazeh: "anujek",
  },
  responsible: {
    Jaramah: "bashefadh",
    Zonrazeh: "bashefad",
  },
  explosive: {
    Jaramah: "abav",
    Zonrazeh: "abav",
  },
  firm: {
    Jaramah: "dajek",
    Zonrazeh: "dajek",
  },
  persisting: {
    Jaramah: "dajek",
    Zonrazeh: "dajek",
  },
  everlasting: {
    Jaramah: "dajek",
    Zonrazeh: "dajek",
  },
  murderous: {
    Jaramah: "kegeh",
    Zonrazeh: "kege",
  },
  cognizant: {
    Jaramah: "menak",
    Zonrazeh: "menak",
  },
  aware: {
    Jaramah: "menak",
    Zonrazeh: "menak",
  },
  rich: {
    Jaramah: "ataja",
    Zonrazeh: "ataja",
  },
  decisive: {
    Jaramah: "baz",
    Zonrazeh: "baz",
  },
  mobile: {
    Jaramah: "tabah",
    Zonrazeh: "tabah",
  },
  exploratory: {
    Jaramah: "yefii",
    Zonrazeh: "yefy",
  },
  immersive: {
    Jaramah: "shuik",
    Zonrazeh: "shuik",
  },
  damnable: {
    Jaramah: "dur",
    Zonrazeh: "dur",
  },
  damned: {
    Jaramah: "dur",
    Zonrazeh: "dur",
  },
  beloved: {
    Jaramah: "shevah",
    Zonrazeh: "sheva",
  },
  loving: {
    Jaramah: "shevah",
    Zonrazeh: "sheva",
  },
  lively: {
    Jaramah: "kav",
    Zonrazeh: "kav",
  },
  mature: {
    Jaramah: "wobah",
    Zonrazeh: "uoba",
  },
  patient: {
    Jaramah: "hened",
    Zonrazeh: "hened",
  },
  awake: {
    Jaramah: "ahsohol",
    Zonrazeh: "asohol",
  },
  watchful: {
    Jaramah: "sedwah",
    Zonrazeh: "sedua",
  },
  civic: {
    Jaramah: "lena",
    Zonrazeh: "lena",
  },
  presentation: {
    Jaramah: "ilenem",
    Zonrazeh: "ilenem",
  },
  whining: {
    Jaramah: "shuaf",
    Zonrazeh: "shuaf",
  },
  wishful: {
    Jaramah: "sobashaf",
    Zonrazeh: "sobashaf",
  },
  oppressive: {
    Jaramah: "omasan",
    Zonrazeh: "omasan",
  },
  unmade: {
    Jaramah: "zokalih",
    Zonrazeh: "zokali",
  },
  final: {
    Jaramah: "denos",
    Zonrazeh: "denos",
  },
  utmost: {
    Jaramah: "denos",
    Zonrazeh: "denos",
  },
  last: {
    Jaramah: "menik",
    Zonrazeh: "nenek",
  },
  mighty: {
    Jaramah: "malem",
    Zonrazeh: "malem",
  },
  dense: {
    Jaramah: "zeya",
    Zonrazeh: "zeya",
  },
  forbidden: {
    Jaramah: "hagi",
    Zonrazeh: "hagi",
  },
  foremost: {
    Jaramah: "ooda",
    Zonrazeh: "uda",
  },
  prominent: {
    Jaramah: "ooda",
    Zonrazeh: "uda",
  },
  regal: {
    Jaramah: "ita",
    Zonrazeh: "ita",
  },
  magestic: {
    Jaramah: "ita",
    Zonrazeh: "ita",
  },
  stately: {
    Jaramah: "ita",
    Zonrazeh: "ita",
  },
  steady: {
    Jaramah: "tabit",
    Zonrazeh: "tabit",
  },
  royal: {
    Jaramah: "itayos",
    Zonrazeh: "itayos",
  },
  sexy: {
    Jaramah: "vurii",
    Zonrazeh: "vury",
  },
  possessive: {
    Jaramah: "ajoav",
    Zonrazeh: "ajoav",
  },
  imaginative: {
    Jaramah: "yuv",
    Zonrazeh: "yuv",
  },
  forgetful: {
    Jaramah: "yuliv",
    Zonrazeh: "yuliv",
  },
  okay: {
    Jaramah: "no",
    Zonrazeh: "not",
  },
  acceptable: {
    Jaramah: "no",
    Zonrazeh: "not",
  },
  probable: {
    Jaramah: "aljes",
    Zonrazeh: "aljes",
  },
  certain: {
    Jaramah: "shehal",
    Zonrazeh: "shehal",
  },
  definite: {
    Jaramah: "valal",
    Zonrazeh: "valal",
  },
  often: {
    Jaramah: "mekmehr",
    Zonrazeh: "mekmer",
  },
  frequent: {
    Jaramah: "mekmehr",
    Zonrazeh: "mekmer",
  },
  rare: {
    Jaramah: "tinish",
    Zonrazeh: "tinish",
  },
  infrequent: {
    Jaramah: "vomekmehr",
    Zonrazeh: "vomekmer",
  },
  questionable: {
    Jaramah: "peksof",
    Zonrazeh: "peksof",
  },
  possible: {
    Jaramah: "ohilal",
    Zonrazeh: "ohilal",
  },
  impossible: {
    Jaramah: "vohilal",
    Zonrazeh: "vohilal",
  },
  likely: {
    Jaramah: "guwal",
    Zonrazeh: "gual",
  },
  unlikely: {
    Jaramah: "kuwal",
    Zonrazeh: "kual",
  },
  cutting: {
    Jaramah: "sikis",
    Zonrazeh: "sikis",
  },
  fast: {
    Jaramah: "sagoov",
    Zonrazeh: "saguv",
  },
  flowing: {
    Jaramah: "hres",
    Zonrazeh: "hres",
  },
  gradual: {
    Jaramah: "liben",
    Zonrazeh: "liben",
  },
  rapid: {
    Jaramah: "eejik",
    Zonrazeh: "yjik",
  },
  slight: {
    Jaramah: "kageh",
    Zonrazeh: "kage",
  },
  slow: {
    Jaramah: "kadin",
    Zonrazeh: "kadin",
  },
  steady: {
    Jaramah: "jatam",
    Zonrazeh: "jatam",
  },
  sudden: {
    Jaramah: "hag",
    Zonrazeh: "hag",
  },
  graceful: {
    Jaramah: "hrev",
    Zonrazeh: "hrev",
  },
  sweeping: {
    Jaramah: "alesi",
    Zonrazeh: "alesy",
  },
  lost: {
    Jaramah: "mawim",
    Zonrazeh: "mauim",
  },
  forgotten: {
    Jaramah: "taeh",
    Zonrazeh: "tae",
  },
  vanished: {
    Jaramah: "taeh",
    Zonrazeh: "tae",
  },
  physical: {
    Jaramah: "kanaz",
    Zonrazeh: "kanaz",
  },
  spiritual: {
    Jaramah: "nazera",
    Zonrazeh: "nazera",
  },
  eccentric: {
    Jaramah: "wedjeni",
    Zonrazeh: "uedjeny",
  },
  cursed: {
    Jaramah: "kiyet",
    Zonrazeh: "kyet",
  },
  lucky: {
    Jaramah: "hazi",
    Zonrazeh: "hazy",
  },
  suspicious: {
    Jaramah: "ehmos",
    Zonrazeh: "emos",
  },
  delicious: {
    Jaramah: "kewih",
    Zonrazeh: "keui",
  },
  chaotic: {
    Jaramah: "dan",
    Zonrazeh: "dan",
  },
  orderly: {
    Jaramah: "shih",
    Zonrazeh: "shi",
  },
  common: {
    Jaramah: "aohl",
    Zonrazeh: "aol",
  },
  uncommon: {
    Jaramah: "tinish",
    Zonrazeh: "tinish",
  },
  wonderful: {
    Jaramah: "ambam",
    Zonrazeh: "ambam",
  },
  horrible: {
    Jaramah: "akat",
    Zonrazeh: "akat",
  },
  sacred: {
    Jaramah: "sih",
    Zonrazeh: "shih",
  },
  sacrifice: {
    Jaramah: "sikegeh",
    Zonrazeh: "sikegeh",
  },
  profane: {
    Jaramah: "lehrfek",
    Zonrazeh: "lerfek",
  },
  greater: {
    Jaramah: "val",
    Zonrazeh: "val",
  },
  dominant: {
    Jaramah: "val",
    Zonrazeh: "val",
  },
  prime: {
    Jaramah: "val",
    Zonrazeh: "val",
  },
  optimal: {
    Jaramah: "val",
    Zonrazeh: "val",
  },
  lesser: {
    Jaramah: "bel",
    Zonrazeh: "beel",
  },
  secondary: {
    Jaramah: "bel",
    Zonrazeh: "beel",
  },
  suboptimal: {
    Jaramah: "bel",
    Zonrazeh: "beel",
  },
  submissive: {
    Jaramah: "bel",
    Zonrazeh: "beel",
  },
  safe: {
    Jaramah: "geteh",
    Zonrazeh: "gete",
  },
  dangerous: {
    Jaramah: "deruv",
    Zonrazeh: "teruv",
  },
  wrong: {
    Jaramah: "mock",
    Zonrazeh: "mok",
  },
  moral: {
    Jaramah: "eytu",
    Zonrazeh: "eytu",
  },
  evil: {
    Jaramah: "teej",
    Zonrazeh: "teejar",
  },
  best: {
    Jaramah: "valgoo",
    Zonrazeh: "valgu",
  },
  worst: {
    Jaramah: "valkoo",
    Zonrazeh: "valku",
  },
  true: {
    Jaramah: "loh",
    Zonrazeh: "lo",
  },
  false: {
    Jaramah: "sih",
    Zonrazeh: "sih",
  },
  special: {
    Jaramah: "kimek",
    Zonrazeh: "kimek",
  },
  honor: {
    Jaramah: "oma",
    Zonrazeh: "oma",
  },
  overall: {
    Jaramah: "nulak",
    Zonrazeh: "nulak",
  },
  nonspecific: {
    Jaramah: "nulak",
    Zonrazeh: "nulak",
  },
  local: {
    Jaramah: "jeru",
    Zonrazeh: "dat",
  },
  regional: {
    Jaramah: "jeru",
    Zonrazeh: "dat",
  },
  zonal: {
    Jaramah: "jeru",
    Zonrazeh: "dat",
  },
  philosophy: {
    Jaramah: "mayahase",
    Zonrazeh: "mayahase",
  },
  a: {
    Jaramah: "ve",
    Zonrazeh: "vej",
  },
  an: {
    Jaramah: "ve",
    Zonrazeh: "vej",
  },
  the: {
    Jaramah: "zeh",
    Zonrazeh: "l",
  },
  i: {
    Jaramah: "mut",
    Zonrazeh: "vo",
  },
  me: {
    Jaramah: "mut",
    Zonrazeh: "vo",
  },
  we: {
    Jaramah: "manah",
    Zonrazeh: "votu",
  },
  us: {
    Jaramah: "mahta",
    Zonrazeh: "von",
  },
  you: {
    Jaramah: "toh",
    Zonrazeh: "thoo",
  },
  it: {
    Jaramah: "oona",
    Zonrazeh: "su",
  },
  they: {
    Jaramah: "oona",
    Zonrazeh: "su",
  },
  he: {
    Jaramah: "mawde",
    Zonrazeh: "ju",
  },
  she: {
    Jaramah: "mawdo",
    Zonrazeh: "shu",
  },
  is: {
    Jaramah: "hast",
    Zonrazeh: "hast",
  },
  and: {
    Jaramah: "jo",
    Zonrazeh: "bak",
  },
  individual: {
    Jaramah: "lehr",
    Zonrazeh: "ler",
  },
  self: {
    Jaramah: "lehr",
    Zonrazeh: "ler",
  },
  any: {
    Jaramah: "boh",
    Zonrazeh: "bo",
  },
  each: {
    Jaramah: "tot",
    Zonrazeh: "tot",
  },
  every: {
    Jaramah: "tol",
    Zonrazeh: "tol",
  },
  noone: {
    Jaramah: "zoler",
    Zonrazeh: "zoler",
  },
  nobody: {
    Jaramah: "zoler",
    Zonrazeh: "zoler",
  },
  oneself: {
    Jaramah: "melehr",
    Zonrazeh: "meler",
  },
  themself: {
    Jaramah: "oonalehr",
    Zonrazeh: "suler",
  },
  university: {
    Jaramah: "rajnajset",
    Zonrazeh: "rajnajset",
  },
  either: {
    Jaramah: "boadh",
    Zonrazeh: "boad",
  },
  both: {
    Jaramah: "totadh",
    Zonrazeh: "totad",
  },
  someof: {
    Jaramah: "ezi",
    Zonrazeh: "ezi",
  },
  all: {
    Jaramah: "dahb",
    Zonrazeh: "monoyoas",
  },
  many: {
    Jaramah: "mek",
    Zonrazeh: "mek",
  },
  few: {
    Jaramah: "sahn",
    Zonrazeh: "san",
  },
  plenty: {
    Jaramah: "moomek",
    Zonrazeh: "mumek",
  },
  none: {
    Jaramah: "ber",
    Zonrazeh: "wat",
  },
  single: {
    Jaramah: "taladh",
    Zonrazeh: "talad",
  },
  multiple: {
    Jaramah: "naladh",
    Zonrazeh: "nalad",
  },
  several: {
    Jaramah: "sajam",
    Zonrazeh: "malad",
  },
  little: {
    Jaramah: "sajam",
    Zonrazeh: "malad",
  },
  bit: {
    Jaramah: "sajam",
    Zonrazeh: "malad",
  },
  lot: {
    Jaramah: "kenadh",
    Zonrazeh: "kenad",
  },
  ton: {
    Jaramah: "kenadh",
    Zonrazeh: "kenad",
  },
  most: {
    Jaramah: "vas",
    Zonrazeh: "vas",
  },
  other: {
    Jaramah: "nurwar",
    Zonrazeh: "asdal",
  },
  else: {
    Jaramah: "nurwar",
    Zonrazeh: "asdal",
  },
  remaining: {
    Jaramah: "nurwar",
    Zonrazeh: "asdal",
  },
  in: {
    Jaramah: "ik",
    Zonrazeh: "ik",
  },
  out: {
    Jaramah: "ru",
    Zonrazeh: "ru",
  },
  at: {
    Jaramah: "ak",
    Zonrazeh: "ak",
  },
  to: {
    Jaramah: "kah",
    Zonrazeh: "ka",
  },
  from: {
    Jaramah: "ejh",
    Zonrazeh: "weta",
  },
  towards: {
    Jaramah: "jameh",
    Zonrazeh: "yimi",
  },
  across: {
    Jaramah: "vir",
    Zonrazeh: "vir",
  },
  through: {
    Jaramah: "as",
    Zonrazeh: "as",
  },
  between: {
    Jaramah: "jarar",
    Zonrazeh: "jarar",
  },
  among: {
    Jaramah: "lakal",
    Zonrazeh: "lakal",
  },
  may: {
    Jaramah: "lu",
    Zonrazeh: "ul",
  },
  away: {
    Jaramah: "eda",
    Zonrazeh: "eda",
  },
  about: {
    Jaramah: "ib",
    Zonrazeh: "ib",
  },
  regarding: {
    Jaramah: "ib",
    Zonrazeh: "ib",
  },
  concerning: {
    Jaramah: "ib",
    Zonrazeh: "ib",
  },
  as: {
    Jaramah: "deh",
    Zonrazeh: "dee",
  },
  because: {
    Jaramah: "tanak",
    Zonrazeh: "tanak",
  },
  though: {
    Jaramah: "ibell",
    Zonrazeh: "ibel",
  },
  if: {
    Jaramah: "sah",
    Zonrazeh: "sa",
  },
  as: {
    Jaramah: "sohta",
    Zonrazeh: "shemshe",
  },
  besides: {
    Jaramah: "daha",
    Zonrazeh: "daha",
  },
  even: {
    Jaramah: "daha",
    Zonrazeh: "daha",
  },
  so: {
    Jaramah: "daha",
    Zonrazeh: "daha",
  },
  before: {
    Jaramah: "telram",
    Zonrazeh: "telram",
  },
  previous: {
    Jaramah: "raf",
    Zonrazeh: "raf",
  },
  earlier: {
    Jaramah: "raf",
    Zonrazeh: "raf",
  },
  lasttime: {
    Jaramah: "raf",
    Zonrazeh: "raf",
  },
  after: {
    Jaramah: "lem",
    Zonrazeh: "lem",
  },
  dueto: {
    Jaramah: "okya",
    Zonrazeh: "okya",
  },
  otherwise: {
    Jaramah: "zobaram",
    Zonrazeh: "zobaram",
  },
  until: {
    Jaramah: "tayem",
    Zonrazeh: "tayem",
  },
  while: {
    Jaramah: "ameh",
    Zonrazeh: "ame",
  },
  also: {
    Jaramah: "sheo",
    Zonrazeh: "sheo",
  },
  too: {
    Jaramah: "sheo",
    Zonrazeh: "sheo",
  },
  well: {
    Jaramah: "sheo",
    Zonrazeh: "sheo",
  },
  however: {
    Jaramah: "ena",
    Zonrazeh: "ena",
  },
  rather: {
    Jaramah: "tabad",
    Zonrazeh: "tabad",
  },
  into: {
    Jaramah: "lakah",
    Zonrazeh: "laka",
  },
  again: {
    Jaramah: "nuram",
    Zonrazeh: "nuram",
  },
  instead: {
    Jaramah: "asdabu",
    Zonrazeh: "asdabu",
  },
  too: {
    Jaramah: "sij",
    Zonrazeh: "sij",
  },
  somuch: {
    Jaramah: "khesa",
    Zonrazeh: "kejarta",
  },
  excessively: {
    Jaramah: "khesa",
    Zonrazeh: "kejarta",
  },
  overly: {
    Jaramah: "khesa",
    Zonrazeh: "kejarta",
  },
  can: {
    Jaramah: "yuu",
    Zonrazeh: "yuu",
  },
  beingable: {
    Jaramah: "yuadh",
    Zonrazeh: "yuad",
  },
  not: {
    Jaramah: "ber",
    Zonrazeh: "wat",
  },
  for: {
    Jaramah: "ahn",
    Zonrazeh: "ahn",
  },
  nor: {
    Jaramah: "ovoh",
    Zonrazeh: "ovo",
  },
  but: {
    Jaramah: "tek",
    Zonrazeh: "beg",
  },
  or: {
    Jaramah: "o",
    Zonrazeh: "o",
  },
  yet: {
    Jaramah: "sen",
    Zonrazeh: "sen",
  },
  so: {
    Jaramah: "kanat",
    Zonrazeh: "kanat",
  },
  therefore: {
    Jaramah: "kanat",
    Zonrazeh: "kanat",
  },
  thus: {
    Jaramah: "kanat",
    Zonrazeh: "kanat",
  },
  once: {
    Jaramah: "belam",
    Zonrazeh: "talos",
  },
  formerly: {
    Jaramah: "belam",
    Zonrazeh: "talos",
  },
  already: {
    Jaramah: "rafam",
    Zonrazeh: "rafam",
  },
  more: {
    Jaramah: "mal",
    Zonrazeh: "mal",
  },
  very: {
    Jaramah: "tal",
    Zonrazeh: "tal",
  },
  extreme: {
    Jaramah: "tal",
    Zonrazeh: "tal",
  },
  high: {
    Jaramah: "tal",
    Zonrazeh: "tal",
  },
  only: {
    Jaramah: "eka",
    Zonrazeh: "eka",
  },
  just: {
    Jaramah: "eka",
    Zonrazeh: "eka",
  },
  merely: {
    Jaramah: "eka",
    Zonrazeh: "eka",
  },
  here: {
    Jaramah: "henek",
    Zonrazeh: "henek",
  },
  there: {
    Jaramah: "tenek",
    Zonrazeh: "tenek",
  },
  thing: {
    Jaramah: "sahb",
    Zonrazeh: "sab",
  },
  stuff: {
    Jaramah: "yeg",
    Zonrazeh: "yeg",
  },
  some: {
    Jaramah: "koh",
    Zonrazeh: "ko",
  },
  certain: {
    Jaramah: "koh",
    Zonrazeh: "ko",
  },
  something: {
    Jaramah: "kosab",
    Zonrazeh: "kosab",
  },
  nothing: {
    Jaramah: "zosab",
    Zonrazeh: "zosab",
  },
  zero: {
    Jaramah: "alen",
    Zonrazeh: "alen",
  },
  void: {
    Jaramah: "alen",
    Zonrazeh: "alen",
  },
  null: {
    Jaramah: "alen",
    Zonrazeh: "alen",
  },
  who: {
    Jaramah: "ki",
    Zonrazeh: "ki",
  },
  what: {
    Jaramah: "chi",
    Zonrazeh: "chi",
  },
  where: {
    Jaramah: "kojah",
    Zonrazeh: "kojah",
  },
  why: {
    Jaramah: "cherah",
    Zonrazeh: "cherah",
  },
  when: {
    Jaramah: "kay",
    Zonrazeh: "kay",
  },
  which: {
    Jaramah: "kodoom",
    Zonrazeh: "kodoom",
  },
  how: {
    Jaramah: "chetor",
    Zonrazeh: "chetor",
  },
  zero: {
    Jaramah: "abahs",
    Zonrazeh: "abahs",
  },
  one: {
    Jaramah: "oja",
    Zonrazeh: "oja",
  },
  two: {
    Jaramah: "kherin",
    Zonrazeh: "kherin",
  },
  three: {
    Jaramah: "sehru",
    Zonrazeh: "sehru",
  },
  four: {
    Jaramah: "gwar",
    Zonrazeh: "gwar",
  },
  five: {
    Jaramah: "fosahl",
    Zonrazeh: "fosahl",
  },
  six: {
    Jaramah: "shish",
    Zonrazeh: "shish",
  },
  seven: {
    Jaramah: "gust",
    Zonrazeh: "gust",
  },
  eight: {
    Jaramah: "ejdu",
    Zonrazeh: "ejdu",
  },
  nine: {
    Jaramah: "kha",
    Zonrazeh: "kha",
  },
  ten: {
    Jaramah: "usm",
    Zonrazeh: "usm",
  },
  please: {
    Jaramah: "deras",
    Zonrazeh: "deras",
  },
  thankyou: {
    Jaramah: "parehat",
    Zonrazeh: "parehat",
  },
  thanks: {
    Jaramah: "pareh",
    Zonrazeh: "pareh",
  },
  yes: {
    Jaramah: "me",
    Zonrazeh: "dutr",
  },
  no: {
    Jaramah: "ber",
    Zonrazeh: "wat",
  },
  hi: {
    Jaramah: "salam",
    Zonrazeh: "salam",
  },
  hello: {
    Jaramah: "salam",
    Zonrazeh: "salam",
  },
  greetings: {
    Jaramah: "salamat",
    Zonrazeh: "salamat",
  },
  farewell: {
    Jaramah: "ajekna",
    Zonrazeh: "ajekna",
  },
  bye: {
    Jaramah: "jeko",
    Zonrazeh: "jeko",
  },
  goodbye: {
    Jaramah: "yesiska",
    Zonrazeh: "yesiska",
  },
  understood: {
    Jaramah: "kenu",
    Zonrazeh: "kenu",
  },
  gotcha: {
    Jaramah: "kenu",
    Zonrazeh: "kenu",
  },
  affirmative: {
    Jaramah: "kenu",
    Zonrazeh: "kenu",
  },
  atleast: {
    Jaramah: "aktios",
    Zonrazeh: "aktios",
  },
  goodluck: {
    Jaramah: "senkaj",
    Zonrazeh: "senkaj",
  },
  freak: {
    Jaramah: "khanab",
    Zonrazeh: "khanab",
  },
  weirdo: {
    Jaramah: "khanab",
    Zonrazeh: "khanab",
  },
  monster: {
    Jaramah: "khanab",
    Zonrazeh: "khanab",
  },
  aberration: {
    Jaramah: "khanab",
    Zonrazeh: "khanab",
  },
  rebel: {
    Jaramah: "sil'gov",
    Zonrazeh: "sil'gov",
  },
  traitor: {
    Jaramah: "sil'gov",
    Zonrazeh: "sil'gov",
  },
  asshole: {
    Jaramah: "dagik",
    Zonrazeh: "kakgik",
  },
  shitter: {
    Jaramah: "dagik",
    Zonrazeh: "kakgik",
  },
  shithead: {
    Jaramah: "dagik",
    Zonrazeh: "kakgik",
  },
  fuck: {
    Jaramah: "vurzh",
    Zonrazeh: "vurz",
  },
  darn: {
    Jaramah: "kyt",
    Zonrazeh: "kayt",
  },
  goddamit: {
    Jaramah: "verjah durajii",
    Zonrazeh: "verjah durajii",
  },
  hundred: {
    Jaramah: "bai",
    Zonrazeh: "bai",
  },
  thousand: {
    Jaramah: "pai",
    Zonrazeh: "pai",
  },
  million: {
    Jaramah: "sai",
    Zonrazeh: "sai",
  },
  billion: {
    Jaramah: "shai",
    Zonrazeh: "shai",
  },
};
