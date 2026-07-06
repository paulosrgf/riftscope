// Listas usadas pelo gerador mock. Nomes de campeão precisam bater
// exatamente com o "id" usado pelo Data Dragon (sem espaço/acento).
const CHAMPIONS = [
  "Thresh",
  "Vex",
  "Morgana",
  "Karthus",
  "Mordekaiser",
  "Evelynn",
  "Nocturne",
  "Yone",
  "Zed",
  "Viego",
  "Aphelios",
  "Jinx",
  "LeeSin",
  "Volibear",
];

const ITEMS = [
  3078, 3153, 6672, 3031, 3072, 3814, 3020, 3157, 3165, 4645, 6653, 3143, 3068,
  3075,
];

const SPELLS = [
  "SummonerFlash",
  "SummonerDot",
  "SummonerHeal",
  "SummonerBarrier",
  "SummonerExhaust",
  "SummonerTeleport",
  "SummonerSmite",
];

const RUNE_TREES = [
  "Precision",
  "Domination",
  "Sorcery",
  "Resolve",
  "Inspiration",
];

const RANKS = [
  "IRON",
  "BRONZE",
  "SILVER",
  "GOLD",
  "PLATINUM",
  "EMERALD",
  "DIAMOND",
];

const QUEUES = [
  { id: 420, name: "Ranked Solo/Duo" },
  { id: 440, name: "Ranked Flex" },
  { id: 400, name: "Normal Draft" },
  { id: 450, name: "ARAM" },
];

const NAME_PARTS_1 = [
  "Night",
  "Void",
  "Phantom",
  "Grim",
  "Shadow",
  "Raven",
  "Bleak",
  "Wither",
  "Doom",
  "Hollow",
];
const NAME_PARTS_2 = [
  "Raven",
  "Walker",
  "Queen",
  "Reaper",
  "Fang",
  "Widow",
  "Wraith",
  "Thorn",
  "Sorrow",
  "Blight",
];

module.exports = {
  CHAMPIONS,
  ITEMS,
  SPELLS,
  RUNE_TREES,
  RANKS,
  QUEUES,
  NAME_PARTS_1,
  NAME_PARTS_2,
};
