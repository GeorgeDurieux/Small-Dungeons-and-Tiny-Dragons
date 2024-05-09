export let items = [
  {
    id: 1,
    name: 'fists',
    class: 'weapon',
    emoji: '🤜🏼',
    damage: '0',
    attacks: 2,
  },
  {
    id: 2,
    name: 'dagger',
    class: 'weapon',
    emoji: '🗡️',
    damage: '4',
    attacks: 1,
    description: 'damage: 1d4', 
    cost: 5
  },
  {
    id: 3,
    name: 'axe',
    class: 'weapon',
    emoji: '🪓',
    damage: '8',
    attacks: 1,
    description: 'damage: 1d8', 
    cost: 15
  },
  {
    id: 4,
    name: 'paired blades',
    class: 'weapon',
    emoji: '⚔️',
    damage: '6',
    attacks: 2,
    description: 'damage: 1d6, attacks: 2 ( If not using shield )', 
    cost: 30
  },
  {
    id: 5,
    name: 'chainmail',
    class: 'armour',
    emoji: '⛓️',
    armour: 20,
    description: 'armour: 30', 
    cost: 60
  },
  {
    id: 6,
    name: 'full plate',
    class: 'armour',
    emoji: '🧥',
    armour: 50,
    description: 'armour: 60',
    cost: 150
  },
  {
    id: 7,
    name: 'shield',
    class: 'shield',
    emoji: '🛡️',
    armour: 30,
    description: 'shield: 20',
    cost: 30
  },
  {
    id: 8,
    name: 'minor potion',
    class: 'potion',
    emoji: '🧴',
    healing: 25,
    description: 'healing: 25, one use',
    cost: 10
  },
  {
    id: 9,
    name: 'medium potion',
    class: 'potion',
    emoji: '🧴',
    healing: 50
  },
  {
    id: 10,
    name: 'major potion',
    class: 'potion',
    emoji: '🧴',
    healing: 100
  },
  {id: 11,
    name: 'key',
    class: 'quest',
    emoji: '🗝️',
    description: 'Key for an old door',
  },
  {
    id: 12,
    name: 'amulet',
    class: 'quest',
    emoji: '⚜️',
    description: 'Old amulet. Offers protection from fire attacks',
  },
  {
    id: 13,
    name: 'orb',
    class: 'quest',
    emoji: '🔮',
    description: 'The Orb of Valoran!',
  }
]

export const skeletonConfig = {
  name: "Skeleton",
  recurring: true,
  health: 15,
  damage: '6',
  lvl: 1,
  defence: 30,
  xp: 10,
  gold: 25,
  image: "../img/skeletons.jpg"
};

export const owlbearConfig = {
  name: "Owlbear",
  health: 50,
  damage: '12',
  lvl: 5,
  defence: 30,
  xp: 50,
  gold: 0,
  image: "../img/owlbear.jpg"
};

export const golemConfig = {
  name: "Golem",
  health: 80,
  damage: '12',
  lvl: 5,
  defence: 20,
  xp: 50,
  gold: 500,
  image: "../img/crystal.jpg"
} 

export const elementalConfig = {
  name: "Elemental",
  health: 50,
  damage: '12',
  lvl: 8,
  defence: 100,
  xp: 60,
  gold: 0,
  image: "../img/purple-lightning.jpg"
};

export const shadeConfig = {
  name: "Shade",
  health: 10,
  damage: '10',
  lvl: 6,
  defence: 150,
  xp: 60,
  gold: 0,
  image: "../img/shadow.jpg"
};

export const elementalRevivedConfig = {
  name: "Elemental-Revived",
  health: 30,
  damage: '12',
  lvl: 8,
  defence: 80,
  xp: 40,
  gold: 0,
  image: "../img/purple-lightning.jpg"
};

export const orcConfig = {
  name: "Orc",
  recurring: true,
  health: 30,
  damage: '10',
  lvl: 3,
  defence:25,
  xp: 30,
  gold: 100,
  image: "../img/orc.jpg"
};

export const warlordConfig = {
  name: "Warlord",
  health: 60,
  damage: '12',
  lvl: 6,
  defence:50,
  xp: 50,
  gold: 400,
  image: "../img/orc.jpg"
};

export const elementalAwakenedConfig = {
  name: "Elemental-Awakened",
  health: 150,
  damage: '12',
  lvl: 8,
  defence: 100,
  xp: 150,
  gold: 0,
  image: "../img/purple-lightning.jpg"
};

export const sorcererConfig = {
  name: "Sorcerer",
  health: 35,
  damage: '6',
  lvl: 10,
  defence: 10,
  xp: 80,
  gold: 0,
  image: "../img/purple-lightning.jpg"
};

export const dragonConfig = {
  name: "Dragon",
  health: 250,
  damage: '12',
  lvl: 10,
  defence: 25,
  xp: 200,
  gold: 0,
  image: "../img/lava.jpg"
};

export const riddles = [
  {
    id: 1,
    text: `I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?`,
    answers: [ 
      'Echo', 
      'Whisper', 
      'Shadow', 
      'Silence'
    ],
    correctAnswer: 'Silence'
  },
  {
    id: 2,
    text: `I am taken from a mine, and shut up in a wooden case, from which I am never released, and yet I am used by almost every person. What am I?`,
    answers: [ 
      'Coal', 
      'Diamond', 
      'Gold', 
      'Lead'
    ],
    correctAnswer: 'Lead'
  },
  {
    id: 3,
    text: `The more you take, the more you leave behind. What am I?`,
    answers: [ 
      'Breaths', 
      'Steps', 
      'Shadows', 
      'Echoes'
    ],
    correctAnswer: 'Steps'
  },
  {
    id: 4,
    text: `I am greater than the gods, more evil than the devils, the poor have me, the rich need me, and if you eat me, you'll die. What am I?`,
    answers: [ 
      'Darkness', 
      'Greed', 
      'Nothing', 
      'Hunger'
    ],
    correctAnswer: 'Nothing'
  },
  {
    id: 5,
    text: `I never was, am always to be. No one ever saw me, nor ever will. And yet, I am the confidence of all, to live and breathe on this terrestrial ball. What am I?`,
    answers: [ 
      'Tommorrow', 
      'Hope', 
      'Destiny', 
      'Time'
    ],
    correctAnswer: 'Tommorrow'
  }
]

export const colors = [
  'red',  
  'yellow',
  'green',
  'blue',    
  'purple'
]

