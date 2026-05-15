export const PHASES = {
  SETUP: "Setup",
  ROLL_FOR_ORDER: "Roll For Order",
  KICK_OPEN_DOOR: "Kick Open The Door",
  COMBAT: "Combat",
  LOOT_BODY: "Loot The Body",
  LOOK_OR_LOOT: "Look For Trouble / Loot The Room",
  CHARITY: "Charity",
};
 
export function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}
 
const doorCards = [
  { id: "d-m1",  deck: "door", type: "monster", name: "Potted Plant",          level: 1,  treasures: 1, badStuff: "Lose 1 level." },
  { id: "d-m2",  deck: "door", type: "monster", name: "Drooling Slime",        level: 1,  treasures: 1, badStuff: "Lose your footgear." },
  { id: "d-m3",  deck: "door", type: "monster", name: "Maul Rat",              level: 1,  treasures: 1, badStuff: "Lose your headgear." },
  { id: "d-m4",  deck: "door", type: "monster", name: "Rats on a Stick",       level: 1,  treasures: 1, badStuff: "Lose 1 level." },
  { id: "d-m5",  deck: "door", type: "monster", name: "Goblin",                level: 1,  treasures: 1, badStuff: "Lose 1 level." },
  { id: "d-m6",  deck: "door", type: "monster", name: "Flower Child",          level: 1,  treasures: 1, badStuff: "Nothing happens. You still lost." },
  { id: "d-m7",  deck: "door", type: "monster", name: "Baby Dragon",           level: 1,  treasures: 1, badStuff: "Lose 1 level." },
  { id: "d-m8",  deck: "door", type: "monster", name: "Crabs",                 level: 1,  treasures: 1, badStuff: "Lose your footgear." },
  { id: "d-m9",  deck: "door", type: "monster", name: "Large Angry Chicken",   level: 2,  treasures: 1, badStuff: "Lose 1 level." },
  { id: "d-m10", deck: "door", type: "monster", name: "Shrieking Geek",        level: 2,  treasures: 1, badStuff: "Lose your class card." },
  { id: "d-m11", deck: "door", type: "monster", name: "Flying Frogs",          level: 2,  treasures: 2, badStuff: "Lose 1 level." },
  { id: "d-m12", deck: "door", type: "monster", name: "Axe Maniac",            level: 2,  treasures: 1, badStuff: "Lose your hand weapon." },
  { id: "d-m13", deck: "door", type: "monster", name: "Worms",                 level: 2,  treasures: 1, badStuff: "Lose 1 level." },
  { id: "d-m14", deck: "door", type: "monster", name: "Smelly Hippie",         level: 2,  treasures: 1, badStuff: "Lose 1 level." },
  { id: "d-m15", deck: "door", type: "monster", name: "Annoying Dwarf",        level: 2,  treasures: 1, badStuff: "Lose 1 level." },
  { id: "d-m16", deck: "door", type: "monster", name: "Tentacled Whatsis",     level: 3,  treasures: 1, badStuff: "Lose 1 level." },
  { id: "d-m17", deck: "door", type: "monster", name: "Suck-Up Slime",         level: 3,  treasures: 1, badStuff: "Lose your armor." },
  { id: "d-m18", deck: "door", type: "monster", name: "Orc",                   level: 3,  treasures: 1, badStuff: "Lose 1 level." },
  { id: "d-m19", deck: "door", type: "monster", name: "Vile Gelatinous Blob",  level: 3,  treasures: 2, badStuff: "Lose your armor." },
  { id: "d-m20", deck: "door", type: "monster", name: "Skeleton",              level: 3,  treasures: 1, badStuff: "Lose 1 level." },
  { id: "d-m21", deck: "door", type: "monster", name: "Big Foot Jr.",          level: 3,  treasures: 1, badStuff: "Lose 1 level." },
  { id: "d-m22", deck: "door", type: "monster", name: "Leprechaun",            level: 4,  treasures: 2, badStuff: "Lose 2 cards from your hand." },
  { id: "d-m23", deck: "door", type: "monster", name: "Snails of Speed",       level: 4,  treasures: 2, badStuff: "Lose 1 level." },
  { id: "d-m24", deck: "door", type: "monster", name: "Amazon",                level: 4,  treasures: 2, badStuff: "Lose your hand weapons." },
  { id: "d-m25", deck: "door", type: "monster", name: "Tequila Mockingbird",   level: 4,  treasures: 2, badStuff: "Lose 1 level." },
  { id: "d-m26", deck: "door", type: "monster", name: "Trolley Problem",       level: 4,  treasures: 2, badStuff: "Lose 1 level." },
  { id: "d-m27", deck: "door", type: "monster", name: "Swamp Troll",           level: 4,  treasures: 1, badStuff: "Lose 1 level." },
  { id: "d-m28", deck: "door", type: "monster", name: "Ghoul",                 level: 5,  treasures: 2, badStuff: "Lose 1 level." },
  { id: "d-m29", deck: "door", type: "monster", name: "Undead Halfling",       level: 5,  treasures: 2, badStuff: "Lose 1 level." },
  { id: "d-m30", deck: "door", type: "monster", name: "Bureaucrats",           level: 6,  treasures: 2, badStuff: "Lose 1 level." },
  { id: "d-m31", deck: "door", type: "monster", name: "Harpies",               level: 6,  treasures: 2, badStuff: "Lose 2 levels." },
  { id: "d-m32", deck: "door", type: "monster", name: "Ogre",                  level: 6,  treasures: 2, badStuff: "Lose 1 level." },
  { id: "d-m33", deck: "door", type: "monster", name: "Lawyers",               level: 6,  treasures: 2, badStuff: "Lose 2 cards from your hand." },
  { id: "d-m34", deck: "door", type: "monster", name: "Demon Flame",           level: 7,  treasures: 2, badStuff: "Lose your armor." },
  { id: "d-m35", deck: "door", type: "monster", name: "Undead Horse",          level: 7,  treasures: 2, badStuff: "Lose your footgear and 1 level." },
  { id: "d-m36", deck: "door", type: "monster", name: "Gelatinous Octahedron", level: 8,  treasures: 3, badStuff: "Lose your armor." },
  { id: "d-m37", deck: "door", type: "monster", name: "Gazebo",                level: 8,  treasures: 2, badStuff: "Lose 2 levels." },
  { id: "d-m38", deck: "door", type: "monster", name: "Wight Brothers",        level: 8,  treasures: 3, badStuff: "Lose 3 levels." },
  { id: "d-m39", deck: "door", type: "monster", name: "Face Sucker",           level: 8,  treasures: 2, badStuff: "Lose your headgear." },
  { id: "d-m40", deck: "door", type: "monster", name: "Vampire Bat",           level: 8,  treasures: 2, badStuff: "Lose 1 level." },
  { id: "d-m41", deck: "door", type: "monster", name: "Ancient Lich",          level: 9,  treasures: 3, badStuff: "Lose 2 levels." },
  { id: "d-m42", deck: "door", type: "monster", name: "Troll",                 level: 9,  treasures: 2, badStuff: "Lose 2 levels." },
  { id: "d-m43", deck: "door", type: "monster", name: "Floating Nose",         level: 10, treasures: 3, badStuff: "Lose your race card." },
  { id: "d-m44", deck: "door", type: "monster", name: "Net Troll",             level: 10, treasures: 3, badStuff: "Lose 2 levels." },
  { id: "d-m45", deck: "door", type: "monster", name: "Bigfoot",               level: 10, treasures: 3, badStuff: "Lose your footgear." },
  { id: "d-m46", deck: "door", type: "monster", name: "Mind Flayer",           level: 11, treasures: 3, badStuff: "Lose your class card." },
  { id: "d-m47", deck: "door", type: "monster", name: "Wannabe Vampire",       level: 12, treasures: 3, badStuff: "Lose 3 levels." },
  { id: "d-m48", deck: "door", type: "monster", name: "Tongue Demon",          level: 12, treasures: 3, badStuff: "Lose your class card." },
  { id: "d-m49", deck: "door", type: "monster", name: "Enraged Bovine",        level: 12, treasures: 3, badStuff: "Lose 2 levels." },
  { id: "d-m50", deck: "door", type: "monster", name: "Stoned Golem",          level: 13, treasures: 3, badStuff: "Lose 2 levels." },
  { id: "d-m51", deck: "door", type: "monster", name: "Hippogriff",            level: 14, treasures: 3, badStuff: "Lose 2 levels." },
  { id: "d-m52", deck: "door", type: "monster", name: "Chocolate Moose",       level: 14, treasures: 3, badStuff: "Lose 2 levels." },
  { id: "d-m53", deck: "door", type: "monster", name: "Squidzilla",            level: 16, treasures: 4, badStuff: "You die. Lose all equipped items." },
  { id: "d-m54", deck: "door", type: "monster", name: "Dimensional Horror",    level: 16, treasures: 4, badStuff: "Lose 3 levels." },
  { id: "d-m55", deck: "door", type: "monster", name: "Plutonium Dragon",      level: 18, treasures: 4, badStuff: "You die. Lose all equipped items." },
  { id: "d-m56", deck: "door", type: "monster", name: "Ancient Dragon",        level: 20, treasures: 5, badStuff: "You die. Lose all equipped items." },
 
  // CLASSES (8)
  { id: "d-c1", deck: "door", type: "class", name: "Warrior",  effect: "Discard any card to add +1 to your combat. You win all ties." },
  { id: "d-c2", deck: "door", type: "class", name: "Wizard",   effect: "Once per combat, ignore one negative card played against you." },
  { id: "d-c3", deck: "door", type: "class", name: "Cleric",   effect: "+3 combat bonus against Undead monsters. Discard a card to aid an ally." },
  { id: "d-c4", deck: "door", type: "class", name: "Thief",    effect: "Backstab: reduce another player's combat strength by 2, once per combat." },
  { id: "d-c5", deck: "door", type: "class", name: "Ranger",   effect: "+1 bonus against Animals. Once per game, auto-escape any monster." },
  { id: "d-c6", deck: "door", type: "class", name: "Bard",     effect: "Once per turn, discard a card to draw 2 cards." },
  { id: "d-c7", deck: "door", type: "class", name: "Paladin",  effect: "+2 combat bonus. Once per game, automatically escape any monster." },
  { id: "d-c8", deck: "door", type: "class", name: "Druid",    effect: "+2 bonus vs. Animal/Plant monsters. May equip one extra item." },
 
  // RACES (8)
  { id: "d-r1", deck: "door", type: "race", name: "Elf",       effect: "Gain 1 level every time you help another player win combat." },
  { id: "d-r2", deck: "door", type: "race", name: "Dwarf",     effect: "Carry one extra Big item. +1 combat vs. Underground monsters." },
  { id: "d-r3", deck: "door", type: "race", name: "Halfling",  effect: "Once per combat, discard 1 card to re-roll your Run Away die." },
  { id: "d-r4", deck: "door", type: "race", name: "Gnome",     effect: "Hand limit is 6 instead of 5. +1 combat vs. Mechanical monsters." },
  { id: "d-r5", deck: "door", type: "race", name: "Orc",       effect: "+2 combat bonus when fighting alone. May use an extra weapon." },
  { id: "d-r6", deck: "door", type: "race", name: "Half-Breed",effect: "Pick two races — you count as both simultaneously." },
  { id: "d-r7", deck: "door", type: "race", name: "Lizard Man",effect: "+1 combat vs. monsters level 6+. Your tail counts as a weapon (+1)." },
  { id: "d-r8", deck: "door", type: "race", name: "Centaur",   effect: "Free extra equipment slot. +2 bonus when running away." },
 
  // CURSES (20) — playable on any player from hand (you must be outside combat)
  { id: "d-cu1",  deck: "door", type: "curse", name: "Curse! Lose a Level",          effect: "Lose 1 level. Never below Level 1.", targetable: true },
  { id: "d-cu2",  deck: "door", type: "curse", name: "Curse! Lose Your Armor",       effect: "Discard equipped armor (if any).", targetable: true },
  { id: "d-cu3",  deck: "door", type: "curse", name: "Curse! Lose Your Headgear",    effect: "Discard equipped headgear (if any).", targetable: true },
  { id: "d-cu4",  deck: "door", type: "curse", name: "Curse! Lose Your Footgear",    effect: "Discard equipped footgear (if any).", targetable: true },
  { id: "d-cu5",  deck: "door", type: "curse", name: "Curse! Lose a Weapon",         effect: "Discard one equipped hand weapon (if any).", targetable: true },
  { id: "d-cu6",  deck: "door", type: "curse", name: "Curse! Lose Your Race",        effect: "Discard your race card. You become human.", targetable: true },
  { id: "d-cu7",  deck: "door", type: "curse", name: "Curse! Lose Your Class",       effect: "Discard your class card. You become classless.", targetable: true },
  { id: "d-cu8",  deck: "door", type: "curse", name: "Curse! Chicken on Your Head",  effect: "Lose 1 level.", targetable: true },
  { id: "d-cu9",  deck: "door", type: "curse", name: "Curse! Duck of Doom",          effect: "Lose 1 level.", targetable: true },
  { id: "d-cu10", deck: "door", type: "curse", name: "Curse! Lose 2 Levels",         effect: "Lose 2 levels. Never below Level 1.", targetable: true },
  { id: "d-cu11", deck: "door", type: "curse", name: "Curse! Malign Mirror",         effect: "Lose 1 level.", targetable: true },
  { id: "d-cu12", deck: "door", type: "curse", name: "Curse! Truly Obnoxious Curse", effect: "Lose 1 level.", targetable: true },
  { id: "d-cu13", deck: "door", type: "curse", name: "Curse! Tax Collector",         effect: "Lose 1 level.", targetable: true },
  { id: "d-cu14", deck: "door", type: "curse", name: "Curse! Book of Curses",        effect: "Lose 1 level.", targetable: true },
  { id: "d-cu15", deck: "door", type: "curse", name: "Curse! Bad Smell",             effect: "Lose 1 level.", targetable: true },
  { id: "d-cu16", deck: "door", type: "curse", name: "Curse! Face Freeze",           effect: "Lose 1 level.", targetable: true },
  { id: "d-cu17", deck: "door", type: "curse", name: "Curse! Change Class",          effect: "Discard class card (if any).", targetable: true },
  { id: "d-cu18", deck: "door", type: "curse", name: "Curse! Lose a Big Item",       effect: "Discard a big item; otherwise lose 1 level.", targetable: true },
  { id: "d-cu19", deck: "door", type: "curse", name: "Curse! Sword Geek",            effect: "Discard equipped hand weapon (if any).", targetable: true },
  { id: "d-cu20", deck: "door", type: "curse", name: "Curse! Ancient Grudge",        effect: "Lose 1 level.", targetable: true },
];
 
const treasureCards = [
  { id: "t-h1", deck: "treasure", type: "item", name: "Horned Helmet",           slot: "headgear", bonus: 1, value: 600 },
  { id: "t-h2", deck: "treasure", type: "item", name: "Pointy Hat of Power",     slot: "headgear", bonus: 2, value: 600 },
  { id: "t-h3", deck: "treasure", type: "item", name: "Helm of Courage",         slot: "headgear", bonus: 1, value: 300 },
  { id: "t-h4", deck: "treasure", type: "item", name: "Bad-Ass Bandana",         slot: "headgear", bonus: 1, value: 100 },
  { id: "t-h5", deck: "treasure", type: "item", name: "Spiked Helmet",           slot: "headgear", bonus: 2, value: 400 },
  { id: "t-h6", deck: "treasure", type: "item", name: "Coonskin Cap",            slot: "headgear", bonus: 1, value: 400 },
  { id: "t-h7", deck: "treasure", type: "item", name: "Broad Hat",               slot: "headgear", bonus: 1, value: 300 },
  { id: "t-h8", deck: "treasure", type: "item", name: "Viking Helmet",           slot: "headgear", bonus: 2, value: 400 },
  { id: "t-a1", deck: "treasure", type: "item", name: "Leather Armor",           slot: "armor", bonus: 1, value: 200 },
  { id: "t-a2", deck: "treasure", type: "item", name: "Chain Mail Bikini",       slot: "armor", bonus: 2, value: 400 },
  { id: "t-a3", deck: "treasure", type: "item", name: "Plate Armor",             slot: "armor", bonus: 3, value: 600 },
  { id: "t-a4", deck: "treasure", type: "item", name: "Mithril Armor",           slot: "armor", bonus: 3, value: 600, big: true },
  { id: "t-a5", deck: "treasure", type: "item", name: "Flaming Armor",           slot: "armor", bonus: 2, value: 400 },
  { id: "t-a6", deck: "treasure", type: "item", name: "Hauberk of Hovering",     slot: "armor", bonus: 2, value: 300 },
  { id: "t-a7", deck: "treasure", type: "item", name: "Chainmail of Confusion",  slot: "armor", bonus: 1, value: 200 },
  { id: "t-a8", deck: "treasure", type: "item", name: "Crystal Armor",           slot: "armor", bonus: 3, value: 600 },
  { id: "t-f1", deck: "treasure", type: "item", name: "Boots of Butt-Kicking",       slot: "footgear", bonus: 2, value: 400 },
  { id: "t-f2", deck: "treasure", type: "item", name: "Boots of Running Really Fast", slot: "footgear", bonus: 3, value: 400 },
  { id: "t-f3", deck: "treasure", type: "item", name: "Sandals of Sneaking",          slot: "footgear", bonus: 1, value: 200 },
  { id: "t-f4", deck: "treasure", type: "item", name: "Wishing Boots",                slot: "footgear", bonus: 1, value: 500 },
  { id: "t-f5", deck: "treasure", type: "item", name: "Hiking Boots",                 slot: "footgear", bonus: 1, value: 200 },
  { id: "t-f6", deck: "treasure", type: "item", name: "Kneepads of Allure",           slot: "footgear", bonus: 1, value: 400 },
  { id: "t-f7", deck: "treasure", type: "item", name: "Pointy Shoes",                 slot: "footgear", bonus: 1, value: 200 },
  { id: "t-f8", deck: "treasure", type: "item", name: "Slippery Boots",               slot: "footgear", bonus: 1, value: 300 },
  { id: "t-w1",  deck: "treasure", type: "item", name: "Short Sword",                    slot: "hand", hands: 1, bonus: 2, value: 400 },
  { id: "t-w2",  deck: "treasure", type: "item", name: "Dagger",                          slot: "hand", hands: 1, bonus: 1, value: 200 },
  { id: "t-w3",  deck: "treasure", type: "item", name: "Longsword",                       slot: "hand", hands: 1, bonus: 3, value: 500 },
  { id: "t-w4",  deck: "treasure", type: "item", name: "Hammer of Kneecapping",           slot: "hand", hands: 1, bonus: 3, value: 400 },
  { id: "t-w5",  deck: "treasure", type: "item", name: "Spiky Knees",                     slot: "hand", hands: 1, bonus: 1, value: 200 },
  { id: "t-w6",  deck: "treasure", type: "item", name: "Rat on a Stick",                  slot: "hand", hands: 1, bonus: 1, value: 200 },
  { id: "t-w7",  deck: "treasure", type: "item", name: "Flaming Sword",                   slot: "hand", hands: 1, bonus: 4, value: 600 },
  { id: "t-w8",  deck: "treasure", type: "item", name: "Rapier of Unfairness",             slot: "hand", hands: 1, bonus: 3, value: 500 },
  { id: "t-w9",  deck: "treasure", type: "item", name: "Wand of Dowsing",                  slot: "hand", hands: 1, bonus: 1, value: 300 },
  { id: "t-w10", deck: "treasure", type: "item", name: "Gentlemen's Club",                 slot: "hand", hands: 1, bonus: 2, value: 300 },
  { id: "t-w11", deck: "treasure", type: "item", name: "Singing and Dancing Sword",        slot: "hand", hands: 1, bonus: 3, value: 500 },
  { id: "t-w12", deck: "treasure", type: "item", name: "Flail of Speed",                   slot: "hand", hands: 1, bonus: 2, value: 400 },
  { id: "t-w13", deck: "treasure", type: "item", name: "Mace of Cruelty",                  slot: "hand", hands: 1, bonus: 3, value: 400 },
  { id: "t-w14", deck: "treasure", type: "item", name: "Blade of Carnage",                 slot: "hand", hands: 1, bonus: 4, value: 600 },
  { id: "t-w15", deck: "treasure", type: "item", name: "Big Rock",                        slot: "hand", hands: 2, bonus: 3, value: 0,   big: true },
  { id: "t-w16", deck: "treasure", type: "item", name: "Huge Rock",                       slot: "hand", hands: 2, bonus: 4, value: 0,   big: true },
  { id: "t-w17", deck: "treasure", type: "item", name: "Bastard Sword",                   slot: "hand", hands: 2, bonus: 4, value: 600, big: true },
  { id: "t-w18", deck: "treasure", type: "item", name: "Chainsaw of Bloody Dismemberment", slot: "hand", hands: 2, bonus: 3, value: 600, big: true },
  { id: "t-w19", deck: "treasure", type: "item", name: "Bow of Unfair Advantage",          slot: "hand", hands: 2, bonus: 5, value: 600 },
  { id: "t-w20", deck: "treasure", type: "item", name: "Staff of Napalm",                  slot: "hand", hands: 2, bonus: 4, value: 600 },
  { id: "t-o1", deck: "treasure", type: "item", name: "Tuba of Charm",            slot: "other", bonus: 2, value: 200 },
  { id: "t-o2", deck: "treasure", type: "item", name: "Cheese Grater of Peace",   slot: "other", bonus: 2, value: 100 },
  { id: "t-o3", deck: "treasure", type: "item", name: "Shield of Ubiquity",        slot: "other", bonus: 1, value: 300 },
  { id: "t-o4", deck: "treasure", type: "item", name: "Cloak of Obscurity",        slot: "other", bonus: 1, value: 400 },
  { id: "t-o5", deck: "treasure", type: "item", name: "Buckler of Swashbuckling",  slot: "other", bonus: 1, value: 200 },
  { id: "t-o6", deck: "treasure", type: "item", name: "Whacky Wand",               slot: "other", bonus: 2, value: 300 },
  { id: "t-s1",  deck: "treasure", type: "oneshot", name: "Magic Missile",                        bonus: 5, value: 300, effect: "Use in combat for +5." },
  { id: "t-s2",  deck: "treasure", type: "oneshot", name: "Potion of Studliness",                 bonus: 2, value: 200, effect: "Use in combat for +2." },
  { id: "t-s3",  deck: "treasure", type: "oneshot", name: "Potion of Halitosis",                  bonus: 2, value: 100, effect: "Use in combat for +2." },
  { id: "t-s4",  deck: "treasure", type: "oneshot", name: "Freeze Potion",                        bonus: 2, value: 200, effect: "Use in combat for +2." },
  { id: "t-s5",  deck: "treasure", type: "oneshot", name: "Loaded Die",                           bonus: 1, value: 300, effect: "Use in combat for +1." },
  { id: "t-s6",  deck: "treasure", type: "oneshot", name: "Holy Ammo",                            bonus: 3, value: 300, effect: "Use in combat for +3." },
  { id: "t-s7",  deck: "treasure", type: "oneshot", name: "Elixir of Stupidity",                  bonus: 3, value: 200, effect: "Use in combat for +3." },
  { id: "t-s8",  deck: "treasure", type: "oneshot", name: "Boiling Water",                        bonus: 3, value: 100, effect: "Use in combat for +3." },
  { id: "t-s9",  deck: "treasure", type: "oneshot", name: "Flask of Glue",                        bonus: 2, value: 200, effect: "Use in combat for +2." },
  { id: "t-s10", deck: "treasure", type: "oneshot", name: "Deus Ex Machina",                      bonus: 5, value: 500, effect: "Use in combat for +5." },
  { id: "t-s11", deck: "treasure", type: "oneshot", name: "Pretty Balloons",                      bonus: 1, value: 100, effect: "Use in combat for +1." },
  { id: "t-s12", deck: "treasure", type: "oneshot", name: "Instant Illness",                      bonus: 2, value: 100, effect: "Use in combat for +2." },
  { id: "t-s13", deck: "treasure", type: "oneshot", name: "Wand of Inappropriate Transformation", bonus: 3, value: 200, effect: "Use in combat for +3." },
  { id: "t-s14", deck: "treasure", type: "oneshot", name: "Nasty Tasting Sports Drink",           bonus: 2, value: 200, effect: "Use in combat for +2." },
  { id: "t-s15", deck: "treasure", type: "oneshot", name: "Portable Hole",                        bonus: 4, value: 300, effect: "Use in combat for +4." },
  { id: "t-s16", deck: "treasure", type: "oneshot", name: "Acid Potion",                          bonus: 3, value: 200, effect: "Use in combat for +3." },
  { id: "t-s17", deck: "treasure", type: "oneshot", name: "Throwing Boulders Potion",             bonus: 4, value: 300, effect: "Use in combat for +4." },
  { id: "t-s18", deck: "treasure", type: "oneshot", name: "Potion of Comeliness",                 bonus: 2, value: 200, effect: "Use in combat for +2." },
  { id: "t-s19", deck: "treasure", type: "oneshot", name: "Flaming Poison Potion",                bonus: 3, value: 300, effect: "Use in combat for +3." },
  { id: "t-s20", deck: "treasure", type: "oneshot", name: "Yuppie Water",                         bonus: 1, value: 100, effect: "Use in combat for +1." },
  { id: "t-lv1",  deck: "treasure", type: "levelup", name: "Go Up a Level", effect: "Gain 1 level. Cannot reach Level 10 this way." },
  { id: "t-lv2",  deck: "treasure", type: "levelup", name: "Go Up a Level", effect: "Gain 1 level. Cannot reach Level 10 this way." },
  { id: "t-lv3",  deck: "treasure", type: "levelup", name: "Go Up a Level", effect: "Gain 1 level. Cannot reach Level 10 this way." },
  { id: "t-lv4",  deck: "treasure", type: "levelup", name: "Go Up a Level", effect: "Gain 1 level. Cannot reach Level 10 this way." },
  { id: "t-lv5",  deck: "treasure", type: "levelup", name: "Go Up a Level", effect: "Gain 1 level. Cannot reach Level 10 this way." },
  { id: "t-lv6",  deck: "treasure", type: "levelup", name: "Go Up a Level", effect: "Gain 1 level. Cannot reach Level 10 this way." },
  { id: "t-lv7",  deck: "treasure", type: "levelup", name: "Go Up a Level", effect: "Gain 1 level. Cannot reach Level 10 this way." },
  { id: "t-lv8",  deck: "treasure", type: "levelup", name: "Go Up a Level", effect: "Gain 1 level. Cannot reach Level 10 this way." },
  { id: "t-lv9",  deck: "treasure", type: "levelup", name: "Go Up a Level", effect: "Gain 1 level. Cannot reach Level 10 this way." },
  { id: "t-lv10", deck: "treasure", type: "levelup", name: "Go Up a Level", effect: "Gain 1 level. Cannot reach Level 10 this way." },
  { id: "t-lv11", deck: "treasure", type: "levelup", name: "Go Up a Level", effect: "Gain 1 level. Cannot reach Level 10 this way." },
  { id: "t-lv12", deck: "treasure", type: "levelup", name: "Go Up a Level", effect: "Gain 1 level. Cannot reach Level 10 this way." },
  { id: "t-lv13", deck: "treasure", type: "levelup", name: "Go Up a Level", effect: "Gain 1 level. Cannot reach Level 10 this way." },
  { id: "t-lv14", deck: "treasure", type: "levelup", name: "Go Up a Level", effect: "Gain 1 level. Cannot reach Level 10 this way." },
];
 
function shuffle(cards) {
  const copy = cards.map((card, index) => ({
    ...card,
    instanceId: `${card.id}-${Date.now()}-${index}-${Math.random()}`,
  }));
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
 
export function makePlayer(id, name, isMe = false) {
  return {
    id, name, isMe,
    level: 1,
    race: null,
    classCard: null,
    hand: [],
    inPlay: [],
    equipped: { headgear: null, armor: null, footgear: null, hand1: null, hand2: null, other: [] },
    dead: false,
    eliminated: false,
  };
}
 
function draw(deck, discard = []) {
  if (deck.length > 0) return { card: deck[0], deck: deck.slice(1), discard };
  if (discard.length > 0) {
    const reshuffled = shuffle(discard);
    return { card: reshuffled[0], deck: reshuffled.slice(1), discard: [] };
  }
  return { card: null, deck: [], discard: [] };
}
 
function dealStartingHands(players, doorDeck, treasureDeck) {
  const nextPlayers = players.map(p => ({ ...p, hand: [] }));
  let dd = doorDeck, td = treasureDeck;
  nextPlayers.forEach(player => {
    for (let i = 0; i < 4; i++) {
      const d = draw(dd); dd = d.deck; if (d.card) player.hand.push(d.card);
      const t = draw(td); td = t.deck; if (t.card) player.hand.push(t.card);
    }
  });
  return { players: nextPlayers, doorDeck: dd, treasureDeck: td };
}
 
export function createBotGame(botCount = 3) {
  const names = ["Bot 1", "Bot 2", "Bot 3", "Bot 4", "Bot 5"];
  const players = [makePlayer("p1", "You", true)];
  for (let i = 0; i < botCount; i++) players.push(makePlayer(`bot${i + 1}`, names[i]));
 
  let doorDeck = shuffle(doorCards);
  let treasureDeck = shuffle(treasureCards);
  const dealt = dealStartingHands(players, doorDeck, treasureDeck);
 
  // Bots roll immediately; player hasn't rolled yet
  const setupRolls = {};
  dealt.players.filter(p => !p.isMe).forEach(p => { setupRolls[p.id] = rollDie(); });
 
  return {
    mode: "bots",
    players: dealt.players,
    setupRolls,
    tieBreakGroups: [],
    turnOrder: [],
    activePlayerId: null,
    phase: PHASES.ROLL_FOR_ORDER,
    doorDeck: dealt.doorDeck, treasureDeck: dealt.treasureDeck,
    doorDiscard: [], treasureDiscard: [],
    tableCards: [], combat: null, winner: null, lootBody: null,
    log: [
      "Game started! Each player draws 4 Door + 4 Treasure cards.",
      "Click 'Roll for Turn Order' to roll the die!",
    ],
    lastDoorWasMonster: false,
    pendingCurseTarget: null,
    pendingEquip: null,
  };
}
 
export function createLocalGame() {
  const players = [makePlayer("p1", "You", true)];
  let doorDeck = shuffle(doorCards);
  let treasureDeck = shuffle(treasureCards);
  const dealt = dealStartingHands(players, doorDeck, treasureDeck);
  return {
    mode: "local", players: dealt.players, setupRolls: { p1: 1 },
    tieBreakGroups: [], turnOrder: [{ playerId: "p1", name: "You", roll: 1 }],
    activePlayerId: "p1", phase: PHASES.KICK_OPEN_DOOR,
    doorDeck: dealt.doorDeck, treasureDeck: dealt.treasureDeck,
    doorDiscard: [], treasureDiscard: [],
    tableCards: [], combat: null, winner: null, lootBody: null,
    log: ["Solo game started! Equip items before kicking the door."],
    lastDoorWasMonster: false, pendingCurseTarget: null, pendingEquip: null,
  };
}
 
// ─── ROLL FOR ORDER ───────────────────────────────────────────────────────────
export function playerRollForOrder(game) {
  if (game.phase !== PHASES.ROLL_FOR_ORDER) return game;
  const myRoll = rollDie();
  const newRolls = { ...game.setupRolls, p1: myRoll };
  return resolveOrderRolls(game, newRolls, `You rolled ${myRoll}!`);
}
 
function resolveOrderRolls(game, newRolls, prefix = "") {
  const entries = game.players.map(p => ({ playerId: p.id, name: p.name, roll: newRolls[p.id] ?? 0 }));
  // Find ties
  const rollCounts = {};
  entries.forEach(e => { rollCounts[e.roll] = (rollCounts[e.roll] || 0) + 1; });
  const tiedValues = Object.keys(rollCounts).filter(v => rollCounts[v] > 1).map(Number);
 
  if (tiedValues.length > 0) {
    const tieGroups = tiedValues.map(v => entries.filter(e => e.roll === v).map(e => e.playerId));
    const tiedNames = tieGroups.flat().map(pid => game.players.find(p => p.id === pid)?.name).join(", ");
    return {
      ...game,
      setupRolls: newRolls,
      tieBreakGroups: tieGroups,
      log: [`${prefix} Ties detected among: ${tiedNames}! Tied players must re-roll. Click 'Re-roll Tie-Break'.`, ...game.log],
    };
  }
 
  return finalizeOrder(game, newRolls, prefix);
}
 
export function resolveTieBreak(game) {
  if (!game.tieBreakGroups.length) return game;
  const tieGroups = [...game.tieBreakGroups];
  const newRolls = { ...game.setupRolls };
  const messages = [];
 
  const newTieGroups = [];
  for (const group of tieGroups) {
    group.forEach(pid => { newRolls[pid] = rollDie(); });
    const rolls = group.map(pid => newRolls[pid]);
    const rollMsg = group.map((pid, i) => `${game.players.find(p => p.id === pid)?.name} rolled ${rolls[i]}`).join(", ");
    messages.push(`Tie-break: ${rollMsg}`);
 
    // Check if still tied
    const rollCounts = {};
    rolls.forEach(v => { rollCounts[v] = (rollCounts[v] || 0) + 1; });
    const stillTied = Object.keys(rollCounts).filter(v => rollCounts[v] > 1).map(Number);
    if (stillTied.length > 0) {
      stillTied.forEach(v => {
        const stillTiedPids = group.filter((pid, i) => rolls[i] === v);
        newTieGroups.push(stillTiedPids);
      });
    }
  }
 
  if (newTieGroups.length > 0) {
    const tiedNames = newTieGroups.flat().map(pid => game.players.find(p => p.id === pid)?.name).join(", ");
    return {
      ...game,
      setupRolls: newRolls,
      tieBreakGroups: newTieGroups,
      log: [...messages, `Still tied: ${tiedNames}. Re-roll again!`, ...game.log],
    };
  }
 
  return finalizeOrder({ ...game, tieBreakGroups: [] }, newRolls, messages.join(" | "));
}
 
function finalizeOrder(game, rollMap, prefix = "") {
  const entries = game.players.map(p => ({ playerId: p.id, name: p.name, roll: rollMap[p.id] ?? 0 }));
  const sorted = [...entries].sort((a, b) => b.roll - a.roll);
  const orderStr = sorted.map((e, i) => `${i + 1}. ${e.name} (rolled ${e.roll})`).join(", ");
  return {
    ...game,
    setupRolls: rollMap,
    tieBreakGroups: [],
    turnOrder: sorted,
    activePlayerId: sorted[0].playerId,
    phase: PHASES.KICK_OPEN_DOOR,
    log: [`${prefix} Turn order: ${orderStr}. ${sorted[0].name} goes first!`, ...game.log],
  };
}
 
export function getCombatBonus(player) {
  const cards = [
    player.equipped.headgear, player.equipped.armor, player.equipped.footgear,
    player.equipped.hand1, player.equipped.hand2, ...(player.equipped.other || []),
  ];
  return cards.reduce((sum, card) => sum + (card?.bonus || 0), 0);
}
 
export function getCombatStrength(player) {
  return player.level + getCombatBonus(player);
}
 
function updatePlayer(game, playerId, updater) {
  return { ...game, players: game.players.map(p => p.id === playerId ? updater(p) : p) };
}
 
function updateActivePlayer(game, updater) {
  return updatePlayer(game, game.activePlayerId, updater);
}
 
// ─── KICK OPEN THE DOOR ──────────────────────────────────────────────────────
export function kickOpenDoor(game) {
  if (game.phase !== PHASES.KICK_OPEN_DOOR) return game;
  const pulled = draw(game.doorDeck, game.doorDiscard);
  const card = pulled.card;
  if (!card) return { ...game, log: ["The door deck is empty!", ...game.log] };
 
  let next = { ...game, doorDeck: pulled.deck, doorDiscard: pulled.discard, tableCards: [card, ...game.tableCards] };
 
  if (card.type === "monster") {
    next = {
      ...next,
      phase: PHASES.COMBAT,
      lastDoorWasMonster: true,
      combat: { monster: card, oneShots: [], extraBonus: 0 },
      log: [`FACE UP — ${card.name} (Lv ${card.level}) attacks! Win for ${card.treasures} Treasure${card.treasures !== 1 ? "s" : ""}.`, ...next.log],
    };
  } else if (card.type === "curse") {
    next = applyCurse(next, card, game.activePlayerId);
    next = { ...next, phase: PHASES.LOOK_OR_LOOT, lastDoorWasMonster: false, log: [`FACE UP — ${card.name}! ${card.effect}`, ...next.log] };
  } else {
    next = updateActivePlayer(next, p => ({ ...p, hand: [card, ...p.hand] }));
    next = { ...next, phase: PHASES.LOOK_OR_LOOT, lastDoorWasMonster: false,
      tableCards: next.tableCards.filter(c => c.instanceId !== card.instanceId),
      log: [`FACE UP — ${card.name} drawn. Goes to your hand (can't use immediately).`, ...next.log] };
  }
  return next;
}
 
// ─── APPLY CURSE to a specific target player ─────────────────────────────────
function applyCurse(game, card, targetPlayerId) {
  let next = game;
  const name = card.name;
  const up = (fn) => updatePlayer(next, targetPlayerId, fn);
 
  if (name.includes("Lose 2 Level")) next = up(p => ({ ...p, level: Math.max(1, p.level - 2) }));
  else if (name.includes("Lose a Level") || name.includes("Duck") || name.includes("Chicken") ||
           name.includes("Malign") || name.includes("Obnoxious") || name.includes("Tax") ||
           name.includes("Book") || name.includes("Bad Smell") || name.includes("Face Freeze") ||
           name.includes("Ancient")) next = up(p => ({ ...p, level: Math.max(1, p.level - 1) }));
  else if (name.includes("Headgear")) next = up(p => ({ ...p, equipped: { ...p.equipped, headgear: null } }));
  else if (name.includes("Footgear")) next = up(p => ({ ...p, equipped: { ...p.equipped, footgear: null } }));
  else if (name.includes("Lose Your Armor")) next = up(p => ({ ...p, equipped: { ...p.equipped, armor: null } }));
  else if (name.includes("Lose a Weapon") || name.includes("Sword Geek")) next = up(p => ({ ...p, equipped: { ...p.equipped, hand1: null } }));
  else if (name.includes("Lose Your Race")) next = up(p => ({ ...p, race: null }));
  else if (name.includes("Lose Your Class") || name.includes("Change Class")) next = up(p => ({ ...p, classCard: null }));
  else if (name.includes("Big Item")) {
    const target = next.players.find(p => p.id === targetPlayerId);
    const hasBig = [target?.equipped.hand1, target?.equipped.hand2, ...(target?.equipped.other || [])].some(c => c?.big);
    if (!hasBig) next = up(p => ({ ...p, level: Math.max(1, p.level - 1) }));
  }
  return {
    ...next,
    doorDiscard: [card, ...next.doorDiscard],
    tableCards: next.tableCards.filter(c => c.instanceId !== card.instanceId),
  };
}
 
export function lootRoom(game) {
  if (game.phase !== PHASES.LOOK_OR_LOOT || game.lastDoorWasMonster) return game;
  const pulled = draw(game.doorDeck, game.doorDiscard);
  if (!pulled.card) return game;
  let next = { ...game, doorDeck: pulled.deck, doorDiscard: pulled.discard };
  next = updateActivePlayer(next, p => ({ ...p, hand: [pulled.card, ...p.hand] }));
  return { ...next, phase: PHASES.CHARITY, log: ["Looted the room — 1 face-down Door card to hand.", ...next.log] };
}
 
export function lookForTrouble(game, cardInstanceId) {
  if (game.phase !== PHASES.LOOK_OR_LOOT || game.lastDoorWasMonster) return game;
  const player = game.players.find(p => p.id === game.activePlayerId);
  const monster = player?.hand.find(c => c.instanceId === cardInstanceId && c.type === "monster");
  if (!monster) return { ...game, log: ["Select a monster from your hand first.", ...game.log] };
  let next = updateActivePlayer(game, p => ({ ...p, hand: p.hand.filter(c => c.instanceId !== monster.instanceId) }));
  return {
    ...next, phase: PHASES.COMBAT, lastDoorWasMonster: true,
    combat: { monster, oneShots: [], extraBonus: 0 },
    tableCards: [monster, ...next.tableCards],
    log: [`You challenged ${monster.name}! Lv ${monster.level} — ${monster.treasures} Treasure${monster.treasures !== 1 ? "s" : ""}.`, ...next.log],
  };
}
 
// ─── USE CARD ─────────────────────────────────────────────────────────────────
// Curses: any player can play them on any target as long as the caster is NOT the active combatant
// targetPlayerId: who the curse targets (if null, defaults to active player)
export function useCard(game, cardInstanceId, targetPlayerId = null) {
  const me = game.players.find(p => p.isMe);
  if (!me) return game;
  const card = me.hand.find(c => c.instanceId === cardInstanceId);
  if (!card) return game;
 
  // CURSES — can play on anyone, as long as I'm not in active combat
  if (card.type === "curse") {
    const iAmActiveCombatant = (game.phase === PHASES.COMBAT || game.phase === "Run Away") && game.activePlayerId === me.id;
    if (iAmActiveCombatant) return { ...game, log: ["You can't play curses while you're in active combat!", ...game.log] };
    const target = targetPlayerId || game.activePlayerId;
    const targetPlayer = game.players.find(p => p.id === target);
    let next = updatePlayer(game, me.id, p => ({ ...p, hand: p.hand.filter(c => c.instanceId !== card.instanceId) }));
    next = applyCurse(next, card, target);
    return { ...next, log: [`Played ${card.name} on ${targetPlayer?.name || "target"}! ${card.effect}`, ...next.log] };
  }
 
  // For all other card types, must be your turn
  if (me.id !== game.activePlayerId) return { ...game, log: ["It's not your turn.", ...game.log] };
 
  if (card.type === "class") {
    if (game.phase === PHASES.COMBAT || game.phase === "Run Away") return { ...game, log: ["Can't change class during combat.", ...game.log] };
    const oldClass = me.classCard;
    return updateActivePlayer({
      ...game,
      log: ["You are now a " + card.name + "!" + (oldClass ? " (" + oldClass.name + " discarded)" : ""), ...game.log],
      doorDiscard: oldClass ? [oldClass, ...game.doorDiscard] : game.doorDiscard,
    }, p => ({
      ...p, classCard: card,
      hand: p.hand.filter(c => c.instanceId !== card.instanceId),
      inPlay: [card, ...p.inPlay.filter(c => c.instanceId !== oldClass?.instanceId)],
    }));
  }
  if (card.type === "race") {
    if (game.phase === PHASES.COMBAT || game.phase === "Run Away") return { ...game, log: ["Can't change race during combat.", ...game.log] };
    const oldRace = me.race;
    return updateActivePlayer({
      ...game,
      log: ["You are now " + card.name + "!" + (oldRace ? " (" + oldRace.name + " discarded)" : ""), ...game.log],
      doorDiscard: oldRace ? [oldRace, ...game.doorDiscard] : game.doorDiscard,
    }, p => ({
      ...p, race: card,
      hand: p.hand.filter(c => c.instanceId !== card.instanceId),
      inPlay: [card, ...p.inPlay.filter(c => c.instanceId !== oldRace?.instanceId)],
    }));
  }
  if (card.type === "levelup") {
    if (game.phase === PHASES.COMBAT || game.phase === "Run Away") return { ...game, log: ["Can't use Go Up a Level during combat.", ...game.log] };
    return updateActivePlayer({
      ...game, treasureDiscard: [card, ...game.treasureDiscard],
      log: [`Used Go Up a Level — +1 level (max 9 this way).`, ...game.log],
    }, p => ({ ...p, level: Math.min(9, p.level + 1), hand: p.hand.filter(c => c.instanceId !== card.instanceId) }));
  }
  if (card.type === "item") {
    if (game.phase === PHASES.COMBAT || game.phase === "Run Away") return { ...game, log: ["Can't equip items during combat!", ...game.log] };
    return equipItem(game, card);
  }
  if (card.type === "oneshot") {
    if (game.phase !== PHASES.COMBAT) return { ...game, log: [`${card.name} can only be used during your combat turn.`, ...game.log] };
    const next = updateActivePlayer(game, p => ({ ...p, hand: p.hand.filter(c => c.instanceId !== card.instanceId) }));
    return {
      ...next, combat: { ...next.combat, oneShots: [...(next.combat?.oneShots || []), card] },
      treasureDiscard: [card, ...next.treasureDiscard],
      log: [`Used ${card.name} in combat for +${card.bonus || 0}!`, ...next.log],
    };
  }
  return { ...game, log: [`${card.name} cannot be played right now.`, ...game.log] };
}
 
function equipItem(game, card) {
  const me = game.players.find(p => p.id === game.activePlayerId);
  const eq = {
    headgear: me.equipped.headgear,
    armor: me.equipped.armor,
    footgear: me.equipped.footgear,
    hand1: me.equipped.hand1,
    hand2: me.equipped.hand2,
    other: [...(me.equipped.other || [])],
  };

  let conflictSlots = [];

  if (card.slot === "hand") {
    const isTwo = (card.hands || 1) === 2;
    const h1IsTwo = (eq.hand1?.hands || 1) === 2;

    if (isTwo) {
      if (!eq.hand1 && !eq.hand2) {
        eq.hand1 = card;
      } else {
        conflictSlots = [
          ...(eq.hand1 ? ["hand1"] : []),
          ...(eq.hand2 ? ["hand2"] : []),
        ];
      }
    } else {
      if (h1IsTwo) {
        conflictSlots = ["hand1"];
      } else if (!eq.hand1) {
        eq.hand1 = card;
      } else if (!eq.hand2) {
        eq.hand2 = card;
      } else {
        conflictSlots = ["hand1", "hand2"];
      }
    }
  } else if (card.slot === "armor") {
    if (eq.armor) conflictSlots = ["armor"];
    else eq.armor = card;
  } else if (card.slot === "headgear") {
    if (eq.headgear) conflictSlots = ["headgear"];
    else eq.headgear = card;
  } else if (card.slot === "footgear") {
    if (eq.footgear) conflictSlots = ["footgear"];
    else eq.footgear = card;
  } else if (card.slot === "other") {
    // "Other" items have no slot requirements — unlimited
    eq.other.push(card);
  }

  if (conflictSlots.length > 0) {
    return {
      ...game,
      pendingEquip: { card, conflictSlots },
      log: [`Slot${conflictSlots.length > 1 ? "s" : ""} full! Choose which item to replace, or cancel.`, ...game.log],
    };
  }

  return updateActivePlayer(
    { ...game, log: [`Equipped ${card.name} (+${card.bonus || 0}).`, ...game.log] },
    p => ({
      ...p,
      equipped: eq,
      hand: p.hand.filter(c => c.instanceId !== card.instanceId),
      inPlay: [card, ...p.inPlay],
    })
  );
}

// ─── CONFIRM EQUIPMENT REPLACE ────────────────────────────────────────────────
export function confirmEquipReplace(game, slotToReplace) {
  if (!game.pendingEquip) return game;
  const { card } = game.pendingEquip;

  return updateActivePlayer(
    { ...game, pendingEquip: null, log: [`Replaced ${slotToReplace} with ${card.name}.`, ...game.log] },
    p => {
      const eq = {
        headgear: p.equipped.headgear,
        armor: p.equipped.armor,
        footgear: p.equipped.footgear,
        hand1: p.equipped.hand1,
        hand2: p.equipped.hand2,
        other: [...(p.equipped.other || [])],
      };

      const returnToHand = [];
      const replacedCard = eq[slotToReplace];
      if (replacedCard) returnToHand.push(replacedCard);

      // If equipping a 2-hand weapon, also clear the other hand slot
      if (card.slot === "hand" && (card.hands || 1) === 2) {
        const otherSlot = slotToReplace === "hand1" ? "hand2" : "hand1";
        const otherCard = eq[otherSlot];
        if (otherCard) returnToHand.push(otherCard);
        eq[otherSlot] = null;
      }

      eq[slotToReplace] = card;

      const returnIds = new Set(returnToHand.map(c => c.instanceId));
      const newHand = [
        ...returnToHand,
        ...p.hand.filter(c => c.instanceId !== card.instanceId),
      ];
      const newInPlay = [
        card,
        ...p.inPlay.filter(c => !returnIds.has(c.instanceId) && c.instanceId !== card.instanceId),
      ];

      return { ...p, equipped: eq, hand: newHand, inPlay: newInPlay };
    }
  );
}

// ─── CANCEL PENDING EQUIP ─────────────────────────────────────────────────────
export function cancelEquip(game) {
  return { ...game, pendingEquip: null, log: ["Equip cancelled.", ...game.log] };
}

// ─── DISCARD A CARD FROM HAND ─────────────────────────────────────────────────
export function discardCard(game, cardInstanceId) {
  const me = game.players.find(p => p.isMe);
  if (!me) return game;
  const card = me.hand.find(c => c.instanceId === cardInstanceId);
  if (!card) return game;

  let next = updatePlayer(game, me.id, p => ({
    ...p, hand: p.hand.filter(c => c.instanceId !== cardInstanceId),
  }));

  return {
    ...next,
    doorDiscard: card.deck === "door" ? [card, ...next.doorDiscard] : next.doorDiscard,
    treasureDiscard: card.deck === "treasure" ? [card, ...next.treasureDiscard] : next.treasureDiscard,
    log: [`Discarded ${card.name}.`, ...next.log],
  };
}

// ─── GIVE CARD TO LOWEST-LEVEL PLAYER (charity) ───────────────────────────────
export function giveToCharity(game, cardInstanceId) {
  const me = game.players.find(p => p.isMe);
  if (!me) return game;
  const card = me.hand.find(c => c.instanceId === cardInstanceId);
  if (!card) return game;

  const others = game.players.filter(p => p.id !== me.id && !p.eliminated);
  if (others.length === 0) return discardCard(game, cardInstanceId);

  const lowestLevel = Math.min(...others.map(p => p.level));
  const charityTarget = others.find(p => p.level === lowestLevel);

  let next = updatePlayer(game, me.id, p => ({ ...p, hand: p.hand.filter(c => c.instanceId !== cardInstanceId) }));
  next = updatePlayer(next, charityTarget.id, p => ({ ...p, hand: [card, ...p.hand] }));

  return { ...next, log: [`Gave ${card.name} to ${charityTarget.name} (lowest level).`, ...next.log] };
}

// ─── SELL ITEMS FOR GOLD / LEVELS ─────────────────────────────────────────────
// 1,000 gold = 1 level. Can be done multiple times. Cannot reach Level 10 by selling.
export function sellItems(game, cardInstanceIds) {
  const me = game.players.find(p => p.isMe);
  if (!me || me.id !== game.activePlayerId) {
    return { ...game, log: ["It's not your turn.", ...game.log] };
  }
  if (game.phase === PHASES.COMBAT || game.phase === "Run Away") {
    return { ...game, log: ["Can't sell items during combat.", ...game.log] };
  }

  const soldCards = cardInstanceIds
    .map(id => me.hand.find(c => c.instanceId === id))
    .filter(c => c && c.type === "item");

  if (soldCards.length === 0) {
    return { ...game, log: ["No valid items selected to sell.", ...game.log] };
  }

  const totalValue = soldCards.reduce((sum, c) => sum + (c.value || 0), 0);
  const levelsGained = Math.floor(totalValue / 1000);

  if (levelsGained < 1) {
    return { ...game, log: [`Only ${totalValue} gold — need at least 1,000 gold to sell for a level.`, ...game.log] };
  }

  const soldIds = new Set(soldCards.map(c => c.instanceId));
  let next = updatePlayer(game, me.id, p => ({
    ...p,
    level: Math.min(9, p.level + levelsGained),
    hand: p.hand.filter(c => !soldIds.has(c.instanceId)),
  }));

  return {
    ...next,
    treasureDiscard: [...soldCards, ...next.treasureDiscard],
    log: [
      `Sold ${soldCards.map(c => c.name).join(", ")} for ${totalValue} gold → +${levelsGained} level${levelsGained !== 1 ? "s" : ""}! (Max 9 by selling)`,
      ...next.log,
    ],
  };
}
 
// ─── RESOLVE COMBAT ──────────────────────────────────────────────────────────
export function resolveCombat(game) {
  if (game.phase !== PHASES.COMBAT || !game.combat) return game;
  const player = game.players.find(p => p.id === game.activePlayerId);
  const oneShotBonus = game.combat.oneShots.reduce((sum, c) => sum + (c.bonus || 0), 0);
  const extra = game.combat.extraBonus || 0;
  const playerStrength = getCombatStrength(player) + oneShotBonus + extra;
  const monsterStrength = game.combat.monster.level;
 
  if (playerStrength > monsterStrength) {
    let next = updateActivePlayer(game, p => ({ ...p, level: Math.min(10, p.level + 1) }));
    let { treasureDeck, treasureDiscard } = next;
    const rewards = [];
    for (let i = 0; i < (game.combat.monster.treasures || 1); i++) {
      const pulled = draw(treasureDeck, treasureDiscard);
      treasureDeck = pulled.deck; treasureDiscard = pulled.discard;
      if (pulled.card) rewards.push(pulled.card);
    }
    next = { ...next, treasureDeck, treasureDiscard };
    next = updateActivePlayer(next, p => ({ ...p, hand: [...rewards, ...p.hand] }));
    const updatedPlayer = next.players.find(p => p.id === next.activePlayerId);
    const hasWon = updatedPlayer.level >= 10 && !updatedPlayer.eliminated;
    return {
      ...next, phase: PHASES.CHARITY, winner: hasWon ? next.activePlayerId : null,
      combat: null, lastDoorWasMonster: false,
      doorDiscard: [game.combat.monster, ...next.doorDiscard],
      tableCards: next.tableCards.filter(c => c.instanceId !== game.combat.monster.instanceId),
      log: [
        hasWon ? `🏆 VICTORY! You defeated ${game.combat.monster.name} and reached Level 10! YOU WIN!`
               : `Defeated ${game.combat.monster.name}! (${playerStrength} vs ${monsterStrength}) +1 level, +${rewards.length} Treasure${rewards.length !== 1 ? "s" : ""}!`,
        ...next.log,
      ],
    };
  }
  return { ...game, log: [`Still losing: ${playerStrength} vs ${monsterStrength}. Must EXCEED monster strength. Use a one-shot or Run Away.`, ...game.log] };
}
 
// ─── RUN AWAY ─────────────────────────────────────────────────────────────────
// Roll 5+ to escape. Others can play cards to modify the roll (handled via extraBonus in combat state).
export function initiateRunAway(game) {
  if (game.phase !== PHASES.COMBAT || !game.combat) return game;
  const roll = rollDie();
  const runAwayModifier = game.combat.runAwayBonus || 0;
  const effectiveRoll = roll + runAwayModifier;
  const escaped = effectiveRoll >= 5;
 
  if (escaped) {
    return {
      ...game, phase: PHASES.CHARITY, combat: null, lastDoorWasMonster: false,
      doorDiscard: [game.combat.monster, ...game.doorDiscard],
      tableCards: game.tableCards.filter(c => c.instanceId !== game.combat.monster.instanceId),
      log: [`🎲 Rolled ${roll}${runAwayModifier ? ` (+${runAwayModifier} modifier) = ${effectiveRoll}` : ""} — ESCAPED from ${game.combat.monster.name}!`, ...game.log],
    };
  }
 
  // Failed — apply bad stuff
  let next = applyBadStuff(game, game.combat.monster);
  const player = next.players.find(p => p.id === next.activePlayerId);
 
  if (player?.dead) {
    // Draw 4 door + 4 treasure on death
    let { doorDeck, doorDiscard, treasureDeck, treasureDiscard } = next;
    const deathCards = [];
    for (let i = 0; i < 4; i++) {
      const d = draw(doorDeck, doorDiscard); doorDeck = d.deck; doorDiscard = d.discard; if (d.card) deathCards.push(d.card);
      const t = draw(treasureDeck, treasureDiscard); treasureDeck = t.deck; treasureDiscard = t.discard; if (t.card) deathCards.push(t.card);
    }
    next = { ...next, doorDeck, doorDiscard, treasureDeck, treasureDiscard };
 
    const lootOrder = [...next.players]
      .filter(p => p.id !== next.activePlayerId)
      .sort((a, b) => {
        if (b.level !== a.level) return b.level - a.level;
        return rollDie() - rollDie(); // ties by die
      })
      .map(p => p.id);
 
    return {
      ...next, phase: PHASES.LOOT_BODY, combat: null, lastDoorWasMonster: false,
      lootBody: { deadPlayerId: next.activePlayerId, cards: deathCards, lootOrder, lootIndex: 0 },
      doorDiscard: [game.combat.monster, ...next.doorDiscard],
      tableCards: next.tableCards.filter(c => c.instanceId !== game.combat.monster.instanceId),
      log: [
        `💀 Rolled ${roll}${runAwayModifier ? ` (+${runAwayModifier}) = ${effectiveRoll}` : ""} — DEAD! Bad Stuff: ${game.combat.monster.badStuff}`,
        `Drew 4 Door + 4 Treasure cards. Other players loot the body (highest level first)!`,
        ...next.log,
      ],
    };
  }
 
  return {
    ...next, phase: PHASES.CHARITY, combat: null, lastDoorWasMonster: false,
    doorDiscard: [game.combat.monster, ...next.doorDiscard],
    tableCards: next.tableCards.filter(c => c.instanceId !== game.combat.monster.instanceId),
    log: [`🎲 Rolled ${roll}${runAwayModifier ? ` (+${runAwayModifier}) = ${effectiveRoll}` : ""} — FAILED to escape! Bad Stuff: ${game.combat.monster.badStuff}`, ...next.log],
  };
}
 
function applyBadStuff(game, monster) {
  const bs = monster.badStuff || "";
  let next = game;
  if (bs.includes("die") || bs.includes("You die")) {
    next = updateActivePlayer(next, p => ({
      ...p, dead: true, eliminated: true,
      equipped: { headgear: null, armor: null, footgear: null, hand1: null, hand2: null, other: [] },
      inPlay: [], classCard: null, race: null, hand: [],
    }));
    return next;
  }
  if (bs.includes("Lose 3")) return updateActivePlayer(next, p => ({ ...p, level: Math.max(1, p.level - 3) }));
  if (bs.includes("Lose 2")) return updateActivePlayer(next, p => ({ ...p, level: Math.max(1, p.level - 2) }));
  if (bs.includes("Lose 1") || bs.includes("Lose a level")) return updateActivePlayer(next, p => ({ ...p, level: Math.max(1, p.level - 1) }));
  if (bs.includes("footgear")) return updateActivePlayer(next, p => ({ ...p, equipped: { ...p.equipped, footgear: null } }));
  if (bs.includes("headgear")) return updateActivePlayer(next, p => ({ ...p, equipped: { ...p.equipped, headgear: null } }));
  if (bs.includes("armor")) return updateActivePlayer(next, p => ({ ...p, equipped: { ...p.equipped, armor: null } }));
  if (bs.includes("class card")) return updateActivePlayer(next, p => ({ ...p, classCard: null }));
  if (bs.includes("race card")) return updateActivePlayer(next, p => ({ ...p, race: null }));
  if (bs.includes("hand weapons")) return updateActivePlayer(next, p => ({ ...p, equipped: { ...p.equipped, hand1: null, hand2: null } }));
  if (bs.includes("hand weapon")) return updateActivePlayer(next, p => ({ ...p, equipped: { ...p.equipped, hand1: null } }));
  if (bs.includes("cards from your hand")) return updateActivePlayer(next, p => ({ ...p, hand: p.hand.slice(2) }));
  return next;
}
 
// ─── LOOT THE BODY ───────────────────────────────────────────────────────────
export function lootBodyNext(game) {
  if (game.phase !== PHASES.LOOT_BODY || !game.lootBody) return game;
  const { cards, lootOrder, lootIndex } = game.lootBody;
  if (cards.length === 0 || lootIndex >= lootOrder.length) return finishLooting(game);
 
  const takerId = lootOrder[lootIndex];
  const taker = game.players.find(p => p.id === takerId);
  const takenCard = cards[0];
  const remainingCards = cards.slice(1);
  let next = updatePlayer(game, takerId, p => ({ ...p, hand: [takenCard, ...p.hand] }));
  const newIndex = lootIndex + 1;
 
  if (remainingCards.length === 0 || newIndex >= lootOrder.length) {
    return finishLooting({ ...next, lootBody: { ...game.lootBody, cards: remainingCards, lootIndex: newIndex } });
  }
  const nextTaker = game.players.find(p => p.id === lootOrder[newIndex]);
  return {
    ...next, lootBody: { ...game.lootBody, cards: remainingCards, lootIndex: newIndex },
    log: [`${taker?.name} looted a card. Next: ${nextTaker?.name}.`, ...next.log],
  };
}
 
function finishLooting(game) {
  const { cards } = game.lootBody || {};
  let next = { ...game, lootBody: null };
  if (cards?.length) {
    next = { ...next,
      doorDiscard: [...cards.filter(c => c.deck === "door"), ...next.doorDiscard],
      treasureDiscard: [...cards.filter(c => c.deck === "treasure"), ...next.treasureDiscard],
    };
  }
  const idx = next.turnOrder.findIndex(t => t.playerId === next.activePlayerId);
  const nextEntry = next.turnOrder[(idx + 1) % next.turnOrder.length];
  return {
    ...next, activePlayerId: nextEntry.playerId, phase: PHASES.KICK_OPEN_DOOR, lastDoorWasMonster: false,
    log: [`Body looted. ${nextEntry.name}'s turn!`, ...next.log],
  };
}
 
// ─── CHARITY / END TURN ──────────────────────────────────────────────────────
export function finishCharity(game) {
  if (game.phase !== PHASES.CHARITY) return game;
  if (game.winner) return game;
 
  const active = game.players.find(p => p.id === game.activePlayerId);
  const handLimit = active?.race?.name === "Gnome" ? 6 : 5;
 
  // Must discard or give away excess cards before ending turn
  if (active && active.hand.length > handLimit) {
    return {
      ...game,
      log: [
        `Hand limit is ${handLimit}! You have ${active.hand.length} cards — discard or give away ${active.hand.length - handLimit} card(s) before ending your turn.`,
        ...game.log,
      ],
    };
  }
 
  const idx = game.turnOrder.findIndex(t => t.playerId === game.activePlayerId);
  const nextEntry = game.turnOrder[(idx + 1) % game.turnOrder.length] || game.turnOrder[0];
  return {
    ...game,
    activePlayerId: nextEntry.playerId,
    phase: PHASES.KICK_OPEN_DOOR,
    lastDoorWasMonster: false,
    log: [`${nextEntry.name}'s turn — equip items before kicking the door!`, ...game.log],
  };
}