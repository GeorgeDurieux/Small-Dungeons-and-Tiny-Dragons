const textNodes = [
  {
    id: 0,
    text: `
    As the battle rages on, you find yourself overwhelmed by the ferocity of your opponent's attacks. Despite your best efforts, a fierce blow strikes you, sending waves of pain coursing through your body. With each passing moment, the odds of victory seem to slip further from your grasp.
    
    Realizing that the tide of battle has turned against you, you make a split-second decision to retreat, your survival instinct driving you to escape the looming threat. Summoning all your strength, you muster the resolve to turn and flee, leaving the battlefield behind you.
    
    As you make your escape, the adrenaline coursing through your veins dulls the pain of your wounds, allowing you to put distance between yourself and the relentless adversary. With each step, you draw further from danger, a sense of relief washing over you as you navigate the treacherous terrain.
    
    Though battered and bruised, you emerge from the skirmish with a newfound sense of determination, resolved to regroup and prepare for the challenges that lie ahead. The decision to flee may have spared you from certain defeat, but the memory of the encounter serves as a reminder of the perils that await in your quest for glory.`,
    options: [
      {
        text: 'Return to Oakhurst',
        nextNode: 1
      }
    ]
  },
  {
    id: 1,
    text: 'You find yourself standing at the edge of a bustling marketplace in the quaint town of Oakhurst. The air is filled with the aroma of roasted meats and the sound of merchants haggling over prices. As you take in the sights and sounds, a weathered parchment catches your eye, pinned to a nearby notice board.',
    options: [
      {
        text: 'Go to find an Inn',
        nextNode: 2
      },
      {
        text: 'Go to talk with a merchant',
        nextNode: 3
      },
      {
        text: 'Read the parchment',
        nextNode: 4,
        requiredState: (currentState) => !currentState.gotQuest 
      },
      {
        text: "Go to Professor Eldrath's house",
        nextNode: 6,
        requiredState: (currentState) => currentState.gotQuest && (!currentState.talkedWithProfessor || !currentState.exploredLibrary || !currentState.investigatedLaboratory)
      },
      {
        text: 'Leave the city',
        nextNode: 11,
        requiredState: (currentState) => !currentState.talkedWithProfessor
      },
      {
        text: 'Embark on the quest for the Orb of Valoran!',
        nextNode: 12,
        requiredState: (currentState) => currentState.talkedWithProfessor
      }
    ]
  },
  {
    id: 2,
    text: `You make your way to the local inn, its doors welcoming you with a warm embrace. Inside, the air is thick with the scent of ale and hearty stew. You find a cozy corner by the fireplace and settle in, listening to the tales of fellow travelers and adventurers. As the night wears on, you find yourself embroiled in lively conversation, sharing stories and swapping tips for the road ahead.`,
    options: [
      {
        text: 'Return to the marketplace',
        nextNode: 1
      },
      {
        text: 'Go to talk with a merchant',
        nextNode: 3
      }
    ]
  },
  {
    id: 3,
    text: `You approach a nearby merchant, his stall overflowing with trinkets and baubles. He greets you with a toothy grin, eager to make a sale. You peruse his wares, each item telling a story of distant lands and forgotten treasures. After some haggling, you walk away with a few useful supplies and newfound knowledge of the town's gossip.`,
    options: [
      {
        text: 'Return to the marketplace',
        nextNode: 1
      },
      {
        text: 'Go to find an Inn',
        nextNode: 2
      }
    ]
  },
  {
    id: 4,
    text: 'Upon closer inspection, you read the contents of the parchment:',
    options: [
      
    ]
  },
  {
    id: 5,
    text: 'As you finish reading, a sense of excitement washes over you. The call to adventure beckons, and the promise of glory and riches fuels your determination. Will you answer the call and embark on this perilous quest?',
    options: [
      {
        text: 'Go to find an Inn',
        nextNode: 2
      },
      {
        text: 'Go to talk with a merchant',
        nextNode: 3
      },
      {
        text: "Go to Professor Eldrath's house",
        nextNode: 6,
        requiredState: (currentState) => !currentState.talkedWithProfessor || !currentState.exploredLibrary || !currentState.exploredLibrary
      },
      {
        text: 'Leave the city',
        nextNode: 11
      }
    ]
  },
  {
    id: 6,
    text: 'Intrigued by the mention of Professor Eldrath, you decide to seek out the scholar at his residence. The winding streets of Oakhurst lead you to a modest house nestled among towering oak trees. You knock on the door, your heart pounding with anticipation. As the door creaks open, you are greeted by the sight of the professor, his eyes alight with curiosity.',
    options: [
      {
        text: 'Return to the marketplace',
        nextNode: 1
      },
      {
        text: 'Speak with the Professor',
        nextNode: 7,
        requiredState: (currentState) => !currentState.talkedWithProfessor,
        setState: { talkedWithProfessor: true }
      },
      {
        text: ' Search the Surroundings',
        nextNode: 8,
        requiredState: (currentState) => !currentState.searchedSurroundings && currentState.talkedWithProfessor,
        setState: { searchedSurroundings: true }
      },
      {
        text: 'Investigate the Laboratory',
        nextNode: 9,
        requiredState: (currentState) => !currentState.investigatedLaboratory && currentState.talkedWithProfessor,
        setState: { investigatedLaboratory: true }
      },
      {
        text: 'Explore the Library',
        nextNode: 10,
        requiredState: (currentState) => !currentState.exploredLibrary && currentState.talkedWithProfessor,
        setState: { exploredLibrary: true }
      }
    ]
  },
  {
    id: 7,
    text: 'You engage in conversation with Professor Eldrath, the renowned scholar, to delve deeper into the mysteries surrounding the Orb of Valorian. The Professor eagerly shares his knowledge, recounting tales of ancient civilizations and lost relics. His insights guide you towards your quest, offering clues and advice on where to begin your journey. As you listen intently, a sense of determination fills your heart, fueling your resolve to uncover the secrets of the legendary artifact.',
    options: [
      {
        text: 'Return to the marketplace',
        nextNode: 1
      },
      {
        text: ' Search the Surroundings',
        nextNode: 8,
        requiredState: (currentState) => !currentState.searchedSurroundings,
        setState: { searchedSurroundings: true }
      },
      {
        text: 'Investigate the Laboratory',
        nextNode: 9,
        requiredState: (currentState) => !currentState.investigatedLaboratory,
        setState: { investigatedLaboratory: true }
      },
      {
        text: 'Explore the Library',
        nextNode: 10,
        requiredState: (currentState) => !currentState.exploredLibrary,
        setState: { exploredLibrary: true }
      }
    ]
  },
  {
    id: 8,
    text: `You venture beyond the confines of the Professor's residence, exploring the surrounding area for hidden secrets and forgotten treasures. Amongst the towering oak trees and winding paths, you come across a secluded clearing shrouded in eerie mist. Curiosity propels you forward, despite the ominous atmosphere. Suddenly, you stumble upon an ancient altar, its surface etched with arcane symbols. As you approach, a surge of dark energy lashes out, causing you to recoil in pain. However, amidst the danger, you feel a surge of adrenaline and determination. Despite the brief setback, you emerge stronger and more experienced, ready to face the challenges that lie ahead on your quest for the Orb of Valorian.`,
    options: [
      {
        text: 'Return to the marketplace',
        nextNode: 1
      },
      {
        text: 'Investigate the Laboratory',
        nextNode: 9,
        requiredState: (currentState) => !currentState.investigatedLaboratory,
        setState: { investigatedLaboratory: true }
      },
      {
        text: 'Explore the Library',
        nextNode: 10,
        requiredState: (currentState) => !currentState.exploredLibrary,
        setState: { exploredLibrary: true }
      }
    ]
  },
  {
    id: 9,
    text: `You step into the Professor's laboratory, a realm of bubbling potions, crackling energy, and arcane symbols. You examine the intricate apparatuses and curious contraptions, searching for clues amidst the alchemical experiments. As you scour the shelves of the laboratory, your eyes alight upon a small vial nestled amidst a clutter of arcane artifacts. The liquid within glimmers with a faint, soothing light, hinting at its potent properties. With cautious fingers, you grasp the vial and examine its contents. A healing potion, crafted with care and imbued with the essence of rejuvenation, lies within your grasp. Though its effects may be fleeting, the potion promises respite in times of dire need. With gratitude in your heart, you pocket the vial, knowing that it may yet prove invaluable on your journey through the perilous lands that await.`,
    options: [
      {
        text: 'Return to the marketplace',
        nextNode: 1
      },
      {
        text: ' Search the Surroundings',
        nextNode: 8,
        requiredState: (currentState) => !currentState.searchedSurroundings,
        setState: { searchedSurroundings: true }
      },
      {
        text: 'Explore the Library',
        nextNode: 10,
        requiredState: (currentState) => !currentState.exploredLibrary,
        setState: { exploredLibrary: true }
      }
    ]
  },
  {
    id: 10,
    text: `You enter the Professor's vast library, its shelves lined with dusty tomes and ancient manuscripts. You scour the pages for any mention of the Orb of Valorian, poring over texts that speak of forgotten lore and mythical artifacts. Amongst the stacks, you uncover fragments of knowledge, each piece adding to the puzzle of the relic's whereabouts.  You leaf through the pages, absorbing ancient lore and forgotten histories. Amidst the musty scent of parchment, you uncover tantalizing clues about the Orb of Valorian's whereabouts. As you delve deeper into the archives, you feel a sense of excitement building, knowing that within these hallowed halls lie the keys to unlocking the mystery.`,
    options: [
      {
        text: 'Return to the marketplace',
        nextNode: 1
      },
      {
        text: ' Search the Surroundings',
        nextNode: 8,
        requiredState: (currentState) => !currentState.searchedSurroundings,
        setState: { searchedSurroundings: true }
      },
      {
        text: 'Investigate the Laboratory',
        nextNode: 9,
        requiredState: (currentState) => !currentState.investigatedLaboratory,
        setState: { investigatedLaboratory: true }
      }
    ]
  },
  {
    id: 11,
    text: `Feeling hesitant about engaging in a potentially dangerous quest, you cast a wary glance at the parchment's cryptic message. Doubts cloud your mind as you weigh the risks against the allure of adventure. With a heavy heart, you turn away from the bustling streets of Oakhurst, the distant promise of the Orb of Valorian fading from your thoughts. As you venture beyond the city walls, uncertainty gnaws at your resolve. Yet, a sense of relief washes over you, knowing that for now, you've chosen the path of caution. Perhaps another day, another opportunity will beckon you back into the realm of adventure.`,
    options: [
      {
        text: 'Return to Oakhurst',
        nextNode: 1
      },
      {
        text: 'Embark on a Wilderness Expedition',
        nextNode: 13,
        requiredState: (currentState) => !currentState.owlbearKilled
      },
      {
        text: 'Continue the Wilderness Expedition',
        nextNode: 16,
        requiredState: (currentState) => currentState.owlbearKilled && !currentState.altarFound,
        setState: { altarFound: true }
      },
      {
        text: 'Seek Guidance from a Wise Hermit',
        nextNode: 17,
        requiredState: (currentState) => !currentState.hermitVisited,
        setState: { hermitVisited: true }
      },
      {
        text: 'Explore Forgotten Ruins',
        nextNode: 18,
        requiredState: (currentState) => !currentState.ruinsCleared
      },
      {
        text: 'Venture to the temple of Valorian',
        nextNode: 21,
        requiredState: (currentState) => currentState.hermitVisited && !currentState.templeCleared
      },
      {
        text: `Visit the Archmage's Observatory`,
        nextNode: 28,
        requiredState: (currentState) => currentState.talkedWithProfessor && !currentState.observatoryCleared
      },
      {
        text: 'Go to the City of Ancients',
        nextNode: 40,
        requiredState: (currentState) => currentState.cityDiscovered && !currentState.raidersKilled
      },
      {
        text: 'Go to the City of Ancients',
        nextNode: 42,
        requiredState: (currentState) => currentState.cityDiscovered && currentState.raidersKilled
      }
    ]
  },
  {
    id: 12,
    text: `After conversing with Professor Eldrath and gathering valuable information about the Orb of Valorian, you find a renewed sense of purpose stirring within you. The weight of the ancient relic's significance presses upon your shoulders as you bid farewell to Oakhurst's familiar streets. With each step away from the town, anticipation builds in your chest, mingling with determination to uncover the relic's secrets. Armed with newfound knowledge and resolve, you embark on a journey fraught with peril and possibility. The road ahead is fraught with challenges, but you face them head-on, driven by the promise of adventure and the quest for the legendary Orb of Valorian.`,
    options: [
      {
        text: 'Return to Oakhurst',
        nextNode: 1
      },
      {
        text: 'Embark on a Wilderness Expedition',
        nextNode: 13,
        requiredState: (currentState) => !currentState.owlbearKilled
      },
      {
        text: 'Continue the Wilderness Expedition',
        nextNode: 16,
        requiredState: (currentState) => currentState.owlbearKilled && !currentState.altarFound,
        setState: { altarFound: true }
      },
      {
        text: 'Seek Guidance from a Wise Hermit',
        nextNode: 17,
        requiredState: (currentState) => !currentState.hermitVisited,
        setState: { hermitVisited: true }
      },
      {
        text: 'Explore Forgotten Ruins',
        nextNode: 18,
        requiredState: (currentState) => !currentState.ruinsCleared
      },
      {
        text: 'Venture to the temple of Valorian',
        nextNode: 21,
        requiredState: (currentState) => currentState.hermitVisited && !currentState.templeCleared
      },
      {
        text: `Visit the Archmage's Observatory`,
        nextNode: 28,
        requiredState: (currentState) => currentState.talkedWithProfessor && !currentState.observatoryCleared
      },
      {
        text: 'Go to the City of Ancients',
        nextNode: 40,
        requiredState: (currentState) => currentState.cityDiscovered && !currentState.raidersKilled
      },
      {
        text: 'Go to the City of Ancients',
        nextNode: 42,
        requiredState: (currentState) => currentState.cityDiscovered && currentState.raidersKilled
      }
    ]
  },
  {
    id: 13,
    text: `As you venture into the dense foliage of the wilderness, the air thickens with the scent of earth and pine. The path ahead is rugged and untamed, each step fraught with the possibility of danger. Yet, the call of adventure beckons, driving you deeper into the heart of the unknown. Along the way, you encounter fierce beasts and treacherous terrain, testing your mettle and resolve. Despite the challenges, a sense of exhilaration pulses through your veins as you press onward, determined to uncover the secrets hidden within the wilderness.`,
    options: [
      {
        text: 'Return to Oakhurst',
        nextNode: 1
      },
      {
        text: 'Press forward',
        nextNode: 14
      }
    ]
  },
  {
    id: 14,
    text: `Amidst the towering trees and echoing cries of the wild, you find yourself face to face with a formidable adversary. A massive beast, its fur bristling with primal fury, blocks your path forward. With weapons drawn and heart pounding, you prepare to engage in a battle for survival.`,
    options: [
      
    ]
  },
  {
    id: 15,
    text: `The clash of steel against claw reverberates through the forest as you fight with all your strength and cunning. Victory comes at a cost, but the thrill of triumph courses through your veins, fueling your determination to press onward.`,
    options: [
      {
        text: 'Return to Oakhurst',
        nextNode: 1,
        setState: { owlbearKilled: true }
      },
      {
        text: 'Press onward',
        nextNode: 16,
        setState: { altarFound: true, owlbearKilled: true }
      }
    ]
  },
  {
    id: 16,
    text: `After days of relentless trekking through the wilderness, you stumble upon a clearing bathed in dappled sunlight. At its center stands an ancient altar, its weathered stone adorned with intricate runes. A sense of reverence washes over you as you approach, drawn by the promise of untold power. With trembling hands, you offer up your weapon to the altar, its surface pulsing with arcane energy. As the enchantment takes hold, your weapon glows with newfound potency, ready to face the challenges that lie ahead.`,
    options: [
      {
        text: 'Return to Oakhurst',
        nextNode: 1
      },
      {
        text: 'Seek Guidance from a Wise Hermit',
        nextNode: 17,
        requiredState: (currentState) => !currentState.hermitVisited,
        setState: { hermitVisited: true }
      },
      {
        text: 'Explore Forgotten Ruins',
        nextNode: 18,
        requiredState: (currentState) => !currentState.ruinsCleared
      },
      {
        text: 'Venture to the temple of Valorian',
        nextNode: 21,
        requiredState: (currentState) => currentState.hermitVisited && !currentState.templeCleared
      },
      {
        text: `Visit the Archmage's Observatory`,
        nextNode: 27,
        requiredState: (currentState) => currentState.talkedWithProfessor && !currentState.observatoryCleared
      },
      {
        text: 'Go to the City of Ancients',
        nextNode: 40,
        requiredState: (currentState) => currentState.cityDiscovered && !currentState.raidersKilled
      },
      {
        text: 'Go to the City of Ancients',
        nextNode: 42,
        requiredState: (currentState) => currentState.cityDiscovered && currentState.raidersKilled
      }
    ]
  },
  {
    id: 17,
    text: `Deep within the heart of the forest, you come upon a humble abode nestled amongst the trees. Smoke curls lazily from the chimney, hinting at the presence of its solitary inhabitant. With cautious steps, you approach the door and knock softly. Moments later, the door creaks open to reveal a wizened figure, his eyes twinkling with hidden wisdom. The hermit welcomes you with a knowing smile, offering counsel and guidance to aid you on your journey.`,
    options: [
      {
        text: 'Return to Oakhurst',
        nextNode: 1
      },
      {
        text: 'Embark on a Wilderness Expedition',
        nextNode: 13,
        requiredState: (currentState) => !currentState.owlbearKilled
      },
      {
        text: 'Continue the Wilderness Expedition',
        nextNode: 16,
        requiredState: (currentState) => currentState.owlbearKilled && !currentState.altarFound,
        setState: { altarFound: true }
      },
      {
        text: 'Explore Forgotten Ruins',
        nextNode: 18,
        requiredState: (currentState) => !currentState.ruinsCleared
      },
      {
        text: 'Venture to the temple of Valorian',
        nextNode: 21,
        requiredState: (currentState) => !currentState.templeCleared
      },
      {
        text: 'Go to the City of Ancients',
        nextNode: 40,
        requiredState: (currentState) => currentState.cityDiscovered && !currentState.raidersKilled
      },
      {
        text: 'Go to the City of Ancients',
        nextNode: 42,
        requiredState: (currentState) => currentState.cityDiscovered && currentState.raidersKilled
      }
    ]
  },
  {
    id: 18,
    text: `Amidst the crumbling ruins of a forgotten civilization, you find yourself enveloped in a shroud of eerie silence. The air is thick with the scent of decay, the remnants of a once-great empire now reduced to rubble and dust. As you venture deeper into the labyrinthine passages, a sense of foreboding grips your heart. Shadows dance along the walls, whispering tales of ancient curses and restless spirits that haunt these forsaken halls.`,
    options: [
      {
        text: 'Return to Oakhurst',
        nextNode: 1
      },
      {
        text: 'Go deeper',
        nextNode: 19
      },
    ]
  },
  {
    id: 19,
    text: `Amidst the rubble and debris, you uncover a trove of long-lost relics and artifacts, each one steeped in history and mystery. Amongst the treasures, you find glimmering gold coins, precious gemstones, and ornate trinkets that speak of a bygone era. With each discovery, your spirits soar, fueled by the promise of wealth and fortune that awaits you. Yet, amidst the riches, danger lurks in the shadows, ready to challenge those who dare to disturb the slumber of the ruins.`,
    options: [
      
    ]
  },
  {
    id: 20,
    text: `With a final swing of your blade, the last of the skeletal guardians crumbles to dust at your feet. The eerie silence that once pervaded the ruins is now broken by the triumphant beat of your heart. You stand amidst the remnants of your vanquished foes, victorious and unscathed. As you survey the scene, a glint of gold catches your eye amidst the rubble. With eager hands, you gather the spoils of your hard-fought battle, each coin and gem a testament to your bravery and skill. With newfound riches in tow, you prepare to continue your journey, emboldened by your triumph over adversity and the promise of greater challenges yet to come.`,
    options: [
      {
        text: 'Return to Oakhurst',
        nextNode: 1,
        setState: { ruinsCleared: true }
      },
      {
        text: 'Embark on a Wilderness Expedition',
        nextNode: 13,
        requiredState: (currentState) => !currentState.owlbearKilled,
        setState: { ruinsCleared: true }
      },
      {
        text: 'Continue the Wilderness Expedition',
        nextNode: 16,
        requiredState: (currentState) => currentState.owlbearKilled && !currentState.altarFound,
        setState: { ruinsCleared: true, altarFound: true }
      },
      {
        text: 'Seek Guidance from a Wise Hermit',
        nextNode: 17,
        requiredState: (currentState) => !currentState.hermitVisited,
        setState: { hermitVisited: true, ruinsCleared: true }
      },
      {
        text: 'Venture to the temple of Valorian',
        nextNode: 21,
        requiredState: (currentState) => currentState.hermitVisited && !currentState.templeCleared,
        setState: { ruinsCleared: true }
      },
      {
        text: `Visit the Archmage's Observatory`,
        nextNode: 27,
        requiredState: (currentState) => currentState.talkedWithProfessor && !currentState.observatoryCleared,
        setState: { ruinsCleared: true }
      },
      {
        text: 'Go to the City of Ancients',
        nextNode: 40,
        requiredState: (currentState) => currentState.cityDiscovered && !currentState.raidersKilled
      },
      {
        text: 'Go to the City of Ancients',
        nextNode: 42,
        requiredState: (currentState) => currentState.cityDiscovered && currentState.raidersKilled
      }
    ]
  },
  {
    id: 21,
    text: `After consulting with the reclusive hermit deep in the forest, you are bestowed with a cryptic prophecy that foretells the location of the hidden entrance to the ancient temple of Valorian. According to the hermit's words, the temple lies shrouded in the mists of the Whispering Woods, its secrets guarded by mystical wards. With the prophecy etched into your mind, you set out to unravel its mysteries, guided by the hermit's enigmatic wisdom.`,
    options: [
      {
        text: 'Return to Oakhurst',
        nextNode: 1,
      },
      {
        text: 'Go to the Whispering Woods',
        nextNode: 22
      }
    ]
  },
  {
    id: 22,
    text: `As you venture deeper into the heart of the Whispering Woods, the ancient trees seem to whisper secrets of forgotten times, their branches reaching out like gnarled fingers toward the sky. Amidst the dense foliage, you stumble upon a hidden path obscured by overgrown vines and tangled roots. Following the path with a sense of trepidation, you eventually emerge into a small clearing bathed in dappled sunlight.

    Before you stands the entrance to the fabled Temple of Valorian, its stone pillars weathered by centuries of wind and rain. Carved into the entrance archway are runes of ancient origin, their meaning lost to time. As you step across the threshold, a sense of reverence washes over you, for you have found the long-lost sanctuary that holds the key to unlocking the mysteries of the Orb of Valorian.`,
    options: [
      {
        text: 'Return to Oakhurst',
        nextNode: 1,
      },
      {
        text: 'Try to enter',
        nextNode: 23,
        requiredState: (currentState) => !currentState.riddlesSolved
      },
      {
        text: 'Enter',
        nextNode: 24,
        requiredState: (currentState) => currentState.riddlesSolved
      }
    ]
  },
  {
    id: 23,
    text: `As you approach the imposing doors of the Temple of Valorian, a sudden surge of magical energy envelops you, trapping you within its mystical confines. The air crackles with arcane power, and the once welcoming entrance now feels like a prison of stone and magic.

    Before you, a faintly glowing inscription materializes on the door, shimmering with otherworldly light. It seems you are faced with a challenge set by the ancient guardians of the temple, a test of wit and wisdom to prove your worthiness to enter.
    
    To proceed beyond this enchanted barrier, you must unravel the secrets hidden within the riddle that now lies before you. Only by solving the puzzle and unlocking the mysteries of the temple can you hope to uncover the truth of the Orb of Valorian and fulfill your destiny.`,
    options: [

    ]
  },
  {
    id: 24,
    text: `As you step through the intricately carved entrance of the Temple of Valorian, you find yourself in a vast chamber adorned with ancient tapestries depicting heroic deeds of old. The air is heavy with the scent of incense, and shafts of sunlight filter through stained glass windows, casting colorful patterns on the marble floor.

    Columns of polished stone line the chamber, their surfaces engraved with runes of power that pulse with a faint, ethereal glow. Ahead, a grand staircase ascends to the upper levels of the temple, where untold mysteries and dangers surely await.
    
    As you prepare to delve deeper into the temple's depths, you can't shake the feeling of being watched. The shadows seem to shift and coalesce, hinting at unseen forces lurking in the darkness. Steeling yourself for the challenges ahead, you brace for whatever guardians may stand in your path.`,
    options: [
      {
        text: 'Return to Oakhurst',
        nextNode: 1
      },
      {
        text: 'Climb the staircase',
        nextNode: 25,
        requiredState: (currentState) => !currentState.keyFound
      },
      {
        text: 'Further explore the temple',
        nextNode: 27,
        requiredState: (currentState) => currentState.keyFound,
        setState: { templeCleared: true }
      }
    ]
  } ,
  {
    id: 25,
    text: `As you ascend the grand staircase leading deeper into the Temple of Valorian, a sudden disturbance in the air alerts you to danger. Without warning, a towering golem of stone and metal emerges from the shadows, its massive form blocking your path forward.

    The golem, a sentinel of the observatory's ancient defenses, regards you with unblinking eyes of glowing crystal. Its limbs creak with the weight of centuries, and its every movement echoes with the power of the earth itself. You realize that challenging this formidable guardian will require all of your skill and wit.
    
    With no means of retreat, you are left with no choice but to confront the golem head-on. Ready your weapons and brace yourself for battle, for the fate of your quest hangs in the balance, and victory may only be achieved through cunning strategy and unwavering determination.`,
    options: [

    ]
  },
  {
    id: 26,
    text: `As the last echoes of battle fade away, the golem's mighty form crumbles to the ground, reduced to a heap of inert stone and metal. You stand amidst the wreckage, victorious but weary from the fierce struggle.

    Surveying the chamber, you spot a glimmer of light emanating from the debris left in the golem's wake. Drawing closer, you discover a peculiar artifact hidden amongst the rubble—an intricately carved key, pulsating with a faint, otherworldly glow.
    
    Though the Orb of Valorian remains elusive, the discovery of this mysterious key fills you with renewed hope.  With the key in hand, you steel yourself for the challenges yet to come, knowing that each step brings you closer to uncovering the truth of the temple's secrets and fulfilling your destiny as the chosen guardian of the realm.`,
    options: [
      {
        text: 'Return to Oakhurst',
        nextNode: 1,
        setState: { keyFound: true }
      },
      {
        text: 'Further explore the temple',
        nextNode: 27,
        setState: { keyFound: true, templeCleared: true, cityDiscovered: true }
      }
    ]
  },
  {
    id: 27,
    text: `Buoyed by the discovery of the mysterious key, you press on deeper into the recesses of the Temple of Valorian, your footsteps echoing against the ancient stone walls. As you traverse the labyrinthine corridors, you come upon a forgotten chamber hidden from the eyes of time.
    
    Within this chamber lies a weathered tapestry depicting a map of the surrounding lands, its faded lines tracing the path to a distant and long-forgotten citadel known as the Citadel of Ancients. Legends speak of the citadel as a bastion of knowledge and power, once inhabited by the greatest scholars and mages of old.
    
    With newfound purpose, you commit the location of the Citadel of Ancients to memory, knowing that it may hold the key to unlocking the final secrets of your quest. As you prepare to depart the temple and embark on this new leg of your journey, you steel yourself for the challenges that lie ahead, for the road to destiny is fraught with peril and opportunity in equal measure.`,
    options: [
      {
        text: 'Return to Oakhurst',
        nextNode: 1
      },
      {
        text: 'Explore Forgotten Ruins',
        nextNode: 18,
        requiredState: (currentState) => !currentState.ruinsCleared
      },
      {
        text: 'Embark on a Wilderness Expedition',
        nextNode: 13,
        requiredState: (currentState) => !currentState.owlbearKilled
      },
      {
        text: 'Continue the Wilderness Expedition',
        nextNode: 16,
        requiredState: (currentState) => currentState.owlbearKilled && !currentState.altarFound,
        setState: { altarFound: true }
      },
      {
        text: `Visit the Archmage's Observatory`,
        nextNode: 28,
        requiredState: (currentState) => currentState.talkedWithProfessor && !currentState.observatoryCleared
      },
      {
        text: 'Go to the City of Ancients',
        nextNode: 40,
        requiredState: (currentState) => currentState.cityDiscovered && !currentState.raidersKilled
      },
      {
        text: 'Go to the City of Ancients',
        nextNode: 42,
        requiredState: (currentState) => currentState.cityDiscovered && currentState.raidersKilled
      }
    ]
  },
  {
    id: 28,
    text: `Following the guidance of Professor Eldrath, you find yourself standing before the imposing structure of the Archmage's Observatory, nestled atop a craggy peak overlooking the realm below. The observatory's towering spires reach towards the heavens, a testament to the wisdom and mastery of the archmages who once called this place home.

    As you step across the threshold, the air crackles with latent magic, and the faint scent of ancient tomes fills your nostrils. Within the observatory's hallowed halls, shelves upon shelves of arcane knowledge line the walls, each tome containing secrets and spells long forgotten by the world outside.
    
    With the guidance of the professor's teachings and the promise of hidden truths awaiting discovery, you embark on your exploration of the Archmage's Observatory.`,
    options: [
      {
        text: 'Return to Oakhurst',
        nextNode: 1
      },
      {
        text: 'Explore the observatory',
        nextNode: 29,
        setState: { elementalEncountered: true }
      }
    ]
  },
  {
    id: 29,
    text: `As you approach the inner sanctum of the Archmage's Observatory, the heavy stone doors behind you suddenly slam shut with a resounding thud, trapping you within the chamber. Before you can react, the very air crackles with elemental energy, and a fierce elemental spirit materializes before you, its form swirling with raging fire and crackling lightning.

    With a deafening roar, the elemental guardian launches itself at you, its fury unrelenting as it seeks to protect the sanctity of the observatory. The walls tremble with each of its mighty blows, and the air grows thick with smoke and heat.
    
    Trapped within the confines of the chamber, you have no choice but to face the elemental in battle once more. With weapons drawn and determination in your heart, you prepare to make your final stand against this formidable foe, knowing that the fate of the observatory—and perhaps the entire realm—hangs in the balance.`,
    options: [

    ]
  },
  {
    id: 30,
    text: `As the elemental's defeated form dissipates into wisps of ethereal energy, the chamber falls silent once more, save for the crackling remnants of elemental power lingering in the air. You take a moment to catch your breath and assess your surroundings.

    Before you, an enigmatic puzzle materializes, its intricacies shrouded in mystery. At the center of the chamber, two ornate pedestals stand, each adorned with a glowing crystal orb—one radiating with a warm, inviting light, while the other pulses with a faint, ominous aura.
    
    A riddle etched into the chamber's walls poses a question, its answer dictating your next move:

    "In the realm of magic and lore, where secrets lie beyond the door,
    Two orbs of power you must see, but only one can set you free.
    Choose wisely, lest your fate be sealed, and face the shadow's fury revealed."`,
    options: [
      {
        text: `Grasp the Orb of Illumination`,
        nextNode: 31
      },
      {
        text: `Seize the Orb of Shadows`,
        nextNode: 32
      }
    ]
  },
  {
    id: 31,
    text: `Intrigued by the warm, inviting glow emanating from the crystal orb of illumination, you step forward and reach out to grasp it in your hands. As your fingers make contact with the smooth surface of the orb, a surge of healing energy floods through your body, invigorating your weary muscles and soothing your wounds.

    With each passing moment, the radiant light of the orb envelops you in a comforting embrace, banishing the lingering effects of battle and replenishing your strength. You feel a sense of clarity wash over you, as if the mysteries of the observatory are laid bare before your eyes.
    
    As the healing energy subsides, you realize that your decision to choose the orb of illumination has proven wise indeed. Not only have you emerged from the ordeal revitalized and restored, but you have also gained valuable experience and insight, bringing you one step closer to unlocking the secrets of the observatory.`,
    options: [
      {
        text: `Continue searching`,
        nextNode: 34
      }
    ]
  },
  {
    id: 32,
    text: `Drawn by the allure of the faint, ominous aura pulsing from the crystal orb of shadows, you steel yourself and reach out to seize it in your grasp. As your fingers wrap around the cool, shadowy surface of the orb, a shiver runs down your spine, and a sense of foreboding grips your heart.

    In an instant, the chamber is plunged into darkness, save for the eerie glow emanating from the orb of shadows. From the shadows emerges a malevolent presence—a sinister shade, cloaked in darkness and fueled by malice.
    
    With no means of retreat, you are left with no choice but to confront the shade in battle once more. Its ethereal form flickers and shifts, eluding your every blow as it seeks to extinguish the light within you. The fight is fierce and unforgiving, but with determination and courage, you press on, knowing that victory may be the only path to survival.`,
    options: [
      
    ]
  },
  {
    id: 33,
    text: `As the battle reaches its climax, you emerge victorious, the shade dissolving into nothingness as the darkness recedes. Though the choice to grasp the orb of shadows has led you down a perilous path, you emerge from the ordeal stronger and more resilient, ready to face whatever challenges await you in the depths of the observatory.`,
    options: [
      {
        text: `Continue searching`,
        nextNode: 34
      }
    ]
  },
  {
    id: 34,
    text: `Amidst the remnants of battle, you notice a curious inscription etched into the stone floor—a cryptic message that speaks of trials and choices.

    Before you, two paths diverge, each marked by an enigmatic symbol glowing with arcane light. One path beckons you with the promise of wisdom and insight, while the other radiates with an ominous aura, hinting at renewed conflict and danger.`,
    options: [
      {
        text: `Path of Insight`,
        nextNode: 35
      },
      {
        text: `Path of Peril`,
        nextNode: 36,
        setState: { elementalKilled: true }
      }
    ]
  },
  {
    id: 35,
    text: `Intrigued by the promise of enlightenment, you steel yourself and follow the path marked by the symbol of an ancient tome. As you traverse the chamber, you encounter a shimmering portal, its surface adorned with intricate runes. To proceed, you must decipher the riddle inscribed upon the portal and choose wisely.`,
    options: [
      
    ]
  },
  {
    id: 36,
    text: `Despite your weariness, a lingering sense of curiosity draws you towards the path marked by the symbol of a swirling vortex. As you approach, the air crackles with energy, and the elemental's presence looms once more. If you dare to tread this path again, you must be prepared to face the elemental in battle once more.`,
    options: [
      
    ]
  },
  {
    id: 37,
    text: `As the elemental's defeated form dissipates once more, you find yourself standing amidst the remnants of another fierce battle. The chamber is filled with the crackling remnants of elemental power, a testament to the ferocity of your struggle.

    Though wearied by the ordeal, you stand tall, your resolve unbroken and your spirit undaunted. With each victory, you grow stronger, your courage bolstered by the trials you have faced and overcome.
    
    Surveying the chamber, you take a moment to catch your breath and assess your surroundings. Despite the lingering sense of danger, a newfound sense of determination fills you, driving you forward in your quest to unlock the mysteries of the observatory.
    
    With the elemental vanquished for good, you steel yourself for the challenges yet to come, knowing that each step brings you closer to uncovering the truth and fulfilling your destiny as the chosen guardian of the realm.`,
    options: [
      {
        text: `Go towards the top of the tower`,
        nextNode: 39,
        setState: { cityDiscovered: true, observatoryCleared: true }
      }
    ]
  },
  {
    id: 38,
    text: `
    Upon emerging from the shimmering portal at the summit of the tower, you find yourself standing before an ancient pedestal bathed in ethereal light. Resting upon the pedestal is a radiant amulet, pulsating with arcane energy and casting a soft glow that illuminates the chamber.
    
    As you approach, a sense of awe and reverence washes over you, mingling with the anticipation of what lies ahead. The amulet, a relic of untold power, beckons to you, its presence resonating with the very essence of the realm.
    
    With a steady hand, you reach out to claim the amulet, feeling its energy surge through you as though it recognizes you as its rightful guardian. In its radiant glow, you sense a connection to the ancient forces that shape the destiny of the realm, guiding you toward your ultimate purpose.`,
    options: [
      {
        text: 'Return to Oakhurst',
        nextNode: 1
      },
      {
        text: 'Embark on a Wilderness Expedition',
        nextNode: 13,
        requiredState: (currentState) => !currentState.owlbearKilled
      },
      {
        text: 'Continue the Wilderness Expedition',
        nextNode: 16,
        requiredState: (currentState) => currentState.owlbearKilled && !currentState.altarFound,
        setState: { altarFound: true }
      },
      {
        text: 'Seek Guidance from a Wise Hermit',
        nextNode: 17,
        requiredState: (currentState) => !currentState.hermitVisited,
        setState: { hermitVisited: true }
      },
      {
        text: 'Explore Forgotten Ruins',
        nextNode: 18,
        requiredState: (currentState) => !currentState.ruinsCleared
      },
      ,
      {
        text: 'Venture to the temple of Valorian',
        nextNode: 21,
        requiredState: (currentState) => currentState.hermitVisited && !currentState.templeCleared
      },
      {
        text: 'Go to the City of Ancients',
        nextNode: 40,
        requiredState: (currentState) => currentState.cityDiscovered && !currentState.raidersKilled
      },
      {
        text: 'Go to the City of Ancients',
        nextNode: 42,
        requiredState: (currentState) => currentState.cityDiscovered && currentState.raidersKilled
      }
    ]
  },
  {
    id: 39,
    text: `At the pinnacle of the tower, you stand before an ancient pedestal adorned with intricate carvings, illuminated by the soft glow of ethereal light. Upon the pedestal rests a shimmering amulet, its surface pulsating with arcane energy, beckoning you closer with an otherworldly allure.

    As you approach, a sense of reverence washes over you, mingling with the anticipation of what lies ahead. The amulet, a relic of untold power, beckons to you, its presence resonating with the very essence of the realm. With trembling hands, you reach out to grasp the amulet, feeling its power resonate through your very being.
    
    With the magical amulet in your possession, you sense a newfound strength coursing through your veins, a deep connection to the ancient forces that guide your destiny. With each step forward, you move closer to unraveling the mysteries of the past and shaping the fate of the realm.`,
    options: [
      {
        text: 'Return to Oakhurst',
        nextNode: 1
      },
      {
        text: 'Embark on a Wilderness Expedition',
        nextNode: 13,
        requiredState: (currentState) => !currentState.owlbearKilled
      },
      {
        text: 'Continue the Wilderness Expedition',
        nextNode: 16,
        requiredState: (currentState) => currentState.owlbearKilled && !currentState.altarFound,
        setState: { altarFound: true }
      },
      {
        text: 'Seek Guidance from a Wise Hermit',
        nextNode: 17,
        requiredState: (currentState) => !currentState.hermitVisited,
        setState: { hermitVisited: true }
      },
      {
        text: 'Explore Forgotten Ruins',
        nextNode: 18,
        requiredState: (currentState) => !currentState.ruinsCleared
      },
      {
        text: 'Venture to the temple of Valorian',
        nextNode: 21,
        requiredState: (currentState) => currentState.hermitVisited && !currentState.templeCleared
      },
      {
        text: 'Go to the City of Ancients',
        nextNode: 40,
        requiredState: (currentState) => currentState.cityDiscovered && !currentState.raidersKilled
      },
      {
        text: 'Go to the City of Ancients',
        nextNode: 42,
        requiredState: (currentState) => currentState.cityDiscovered && currentState.raidersKilled
      }
    ]
  },
  {
    id: 40,
    text: `As you embark on the journey to the fabled city of ancients, a sense of anticipation and trepidation fills your heart. Guided by the mystical energies of the amulet, you traverse rugged terrain and winding paths, each step bringing you closer to your destination.

    Finally, after days of travel, you arrive at the outskirts of the ancient city. Its towering spires and crumbling ruins loom before you, a testament to the grandeur of a bygone era. Yet, despite the passage of time, an aura of mystery and power still surrounds the city, beckoning you to uncover its secrets.
    
    With determination coursing through your veins, you step through the ancient gates and into the heart of the city. The air is thick with the whispers of ancient spirits, and the echoes of forgotten tales seem to dance upon the wind.
    
    As you stand amidst the ruins of this once-great civilization, you feel a sense of reverence and awe wash over you. The city of ancients holds the key to unlocking the mysteries of the past and shaping the future of the realm. With each step forward, you move closer to uncovering the truth and fulfilling your destiny as the chosen guardian.`,
    options: [
      {
        text: 'Return to Oakhurst',
        nextNode: 1
      },
      {
        text: 'Search the city',
        nextNode: 41
      }
    ]
  },
  {
    id: 41,
    text: `As you venture deeper into the heart of the ancient city, a sense of curiosity and wonder fills your spirit. The streets are lined with crumbling buildings and overgrown foliage, remnants of a once-thriving civilization now reclaimed by nature.

    Driven by the desire to uncover the city's secrets, you begin to search for clues amidst the ruins. Each step forward brings you closer to unraveling the mysteries of the past, your senses heightened as you scour the surroundings for any signs of significance.
    
    Suddenly, without warning, a horde of orcs emerges from the shadows, their brutish forms silhouetted against the fading light. With weapons drawn and battle cries ringing out, they descend upon you with savage intent, their eyes gleaming with malice.
    
    Caught off guard by the sudden assault, you steel yourself for the impending conflict, knowing that your survival depends on your ability to stand firm against the onslaught. With courage and determination, you ready your weapons and prepare to face the orcish horde in battle, determined to emerge victorious against the odds.`,
    options: [

    ]
  },
  {
    id: 42,
    text: `As you stand in the heart of the ancient city's central plaza, an unsettling silence envelops you, broken only by the faint hum of lingering magic and the occasional rustle of wind through the empty streets. The once-vibrant thoroughfares now lie deserted, their cobblestone paths strewn with the remnants of a recent battle.

    Amidst the stillness, the presence of fallen orcish warriors serves as a grim reminder of the violence that has befallen this once-great city. Their lifeless forms lie scattered about, silent witnesses to the chaos that has unfolded within these hallowed streets.
    
    Despite the eerie calm that now reigns over the plaza, a sense of foreboding hangs heavy in the air, as if the very stones themselves bear witness to untold secrets and ancient mysteries. With each step, you tread cautiously, keenly aware that you walk amidst the echoes of a forgotten past, haunted by the specter of what once was, and what may yet be again.`,
    options: [
      {
        text: 'Return to Oakhurst',
        nextNode: 1,
        setState: { raidersKilled: true }
      },
      {
        text: 'Explore the Forgotten Crypts',
        nextNode: 43,
        requiredState: (currentState) => !currentState.cryptsCleared,
        setState: { cryptsCleared: true, raidersKilled: true }
      },
      {
        text: 'Ascend the Tower of Mysteries',
        nextNode: 48,
        requiredState: (currentState) => currentState.keyFound,
        setState: { raidersKilled: true }
      },
      {
        text: 'Ascend the Tower of Mysteries',
        nextNode: 57,
        requiredState: (currentState) => !currentState.keyFound,
        setState: { raidersKilled: true }
      },
      {
        text: 'Seek out the Orcish Warlord',
        nextNode: 45,
        requiredState: (currentState) => !currentState.warlordSlain,
        setState: { raidersKilled: true }
      },
      {
        text: `Visit the Seer's Sanctum`,
        nextNode: 44,
        requiredState: (currentState) => !currentState.seerVisited,
        setState: { seerVisited: true, raidersKilled: true }
      }
    ]
  },
  {
    id: 43,
    text: `As you venture into the depths of the forgotten crypts beneath the ancient city, you are enveloped by an eerie silence broken only by the faint echoes of your footsteps against the cold stone walls. Torchlight flickers ominously, casting long shadows that dance across the chamber, as you navigate the maze-like corridors in search of hidden treasures.

    After what feels like an eternity of exploration, your efforts are rewarded as you stumble upon a long-forgotten chamber concealed behind a crumbling wall. Within, you discover a trove of ancient artifacts and glittering treasures, their gleam reflecting the torchlight in a dazzling display of wealth and opulence.
    
    With your newfound riches in hand, you make your way back to the surface, your heart brimming with triumph and anticipation for the adventures yet to come.`,
    options: [
      {
        text: 'Return to Oakhurst',
        nextNode: 1
      },
      {
        text: 'Ascend the Tower of Mysteries',
        nextNode: 48,
        requiredState: (currentState) => currentState.keyFound
      },
      {
        text: 'Ascend the Tower of Mysteries',
        nextNode: 57,
        requiredState: (currentState) => !currentState.keyFound
      },
      {
        text: 'Seek out the Orcish Warlord',
        nextNode: 45,
        requiredState: (currentState) => !currentState.warlordSlain,
      },
      {
        text: `Visit the Seer's Sanctum`,
        nextNode: 44,
        requiredState: (currentState) => !currentState.seerVisited,
        setState: { seerVisited: true }
      }
    ]
  },
  {
    id: 44,
    text: `As you enter the secluded sanctuary of the city's prophetic seer, you are greeted by an aura of ancient wisdom that permeates the air. The chamber is adorned with mystical symbols and arcane artifacts, their presence hinting at the seer's mastery of the arcane arts and the depths of their insight into the mysteries of the cosmos.

    Seated before you, the seer awaits with an enigmatic gaze, their eyes clouded with the weight of countless visions and prophecies yet to be revealed. With a voice that echoes with the resonance of ages past, they speak of a great dragon that patrols the skies above the ancient city, its majestic form a harbinger of doom to all who dare to oppose it.
    
    But the true threat lies not with the dragon alone, for it is but a pawn in the hands of a dark sorcerer who commands its obedience from the heights of the Tower of Mysteries. With this knowledge in hand, you realize that the path to victory lies not only in confronting the dragon, but in confronting the sorcerer who wields it as a weapon of destruction.`,
    options: [
      {
        text: 'Return to Oakhurst',
        nextNode: 1
      },
      {
        text: 'Explore the Forgotten Crypts',
        nextNode: 43,
        requiredState: (currentState) => !currentState.cryptsCleared,
        setState: { cryptsCleared: true }
      },
      {
        text: 'Ascend the Tower of Mysteries',
        nextNode: 48,
        requiredState: (currentState) => currentState.keyFound
      },
      {
        text: 'Ascend the Tower of Mysteries',
        nextNode: 57,
        requiredState: (currentState) => !currentState.keyFound
      },
      {
        text: 'Seek out the Orcish Warlord',
        nextNode: 45,
        requiredState: (currentState) => !currentState.warlordSlain,
      }
    ]
  },
  {
    id: 45,
    text: `As you make your way through the winding streets of the ancient city, the sound of distant drums echoes through the air, signaling your approach to the orcish warlord's encampment. Drawing closer, you catch sight of flickering torchlight illuminating the shadows, and the guttural voices of the orcish horde rise in a chorus of battle cries.

    With weapons drawn and determination in your heart, you steel yourself for the impending confrontation as you emerge into the clearing where the warlord's camp lies. Before you, a horde of orcs stands ready for battle, their ranks bolstered by fierce warriors clad in crude armor and wielding savage weapons.
    
    With a roar of defiance, you charge into the fray, engaging the enemy with skill and determination as you fight to overcome their relentless assault. The clash of steel rings out amidst the chaos of battle, as you press forward, driven by the burning desire for victory and the hope of vanquishing the orcish threat once and for all.`,
    options: [

    ]
  },
  {
    id: 46,
    text: `As you catch your breath and survey the aftermath of the conflict, a formidable figure emerges from the shadows, towering above the fallen like a dark specter of death. Clad in heavy armor adorned with the sigils of ancient warlords, the orcish warboss steps forward, his gaze fixed upon you with a mixture of respect and disdain.

    With a voice that rumbles like thunder, the warboss issues a challenge, his words laden with the weight of centuries of orcish tradition and martial prowess. Though weary from battle, you stand tall and resolute, ready to face whatever trials lie ahead in your quest to rid the land of the orcish menace once and for all.`,
    options: [

    ]
  },
  {
    id: 47,
    text: `As the clash of steel subsides and the dust of battle settles, you stand victorious amidst the wreckage of the orcish camp. The warboss lies defeated at your feet, his once-proud form now broken and lifeless, a testament to your skill and valor in combat.

    With the threat of the orcish horde vanquished, a sense of triumph surges within you, mingled with relief and exhaustion. The air is heavy with the scent of blood and sweat, a grim reminder of the price paid for victory, yet amidst the carnage, a glimmer of hope shines bright.
    
    The remaining orcs, seeing their leader fall, scatter into the darkness, their ranks broken and their will to fight shattered. The once-imposing camp now lies silent and still, a haunting testament to the ferocity of the battle that raged within its walls.`,
    options: [
      {
        text: 'Return to Oakhurst',
        nextNode: 1,
        setState: { warlordSlain: true }
      },
      {
        text: 'Explore the Forgotten Crypts',
        nextNode: 43,
        requiredState: (currentState) => !currentState.cryptsCleared,
        setState: { cryptsCleared: true, warlordSlain: true }
      },
      {
        text: 'Ascend the Tower of Mysteries',
        nextNode: 48,
        requiredState: (currentState) => currentState.keyFound
      },
      {
        text: 'Ascend the Tower of Mysteries',
        nextNode: 57,
        requiredState: (currentState) => !currentState.keyFound
      },
      {
        text: `Visit the Seer's Sanctum`,
        nextNode: 44,
        requiredState: (currentState) => !currentState.seerVisited,
        setState: { seerVisited: true, warlordSlain: true }
      }
    ]
  },
  {
    id: 48,
    text: `As you stand before the imposing edifice of the Tower of Mysteries, its ancient stones weathered by the passage of time, you are filled with a sense of awe and trepidation. The towering structure looms ominously against the backdrop of the city skyline, its spires reaching towards the heavens like the fingers of a forgotten deity.

    With the key clutched tightly in your hand, you approach the massive iron-bound doors that bar your entry, their surfaces etched with arcane symbols and glyphs of power. With a trembling hand, you insert the key into the lock and turn it with a resounding click, the mechanism yielding to your touch as the doors swing open on silent hinges.
    
    Stepping across the threshold, you are greeted by a vast chamber bathed in the soft glow of moonlight filtering through stained glass windows high above. The air is thick with the scent of ancient magic, and a palpable sense of anticipation hangs in the air as you begin your ascent into the heart of the tower.`,
    options: [
      {
        text: 'Return to Oakhurst',
        nextNode: 1
      },
      {
        text: 'Search the tower',
        nextNode: 49,
        requiredState: (currentState) => currentState.elementalEncountered && !currentState.elementalKilled
      },
      {
        text: 'Go towards the top of the tower',
        nextNode: 51,
        requiredState: (currentState) => currentState.elementalKilled
      }      
    ]
  },
  {
    id: 49,
    text: `As you venture deeper into the towering structure, a sense of unease grips you. Shadows dance across the walls, and a chill wind whispers through the corridors, carrying with it the faint scent of elemental energy.

    Suddenly, you come face to face with a familiar adversary: the elemental you encountered in the observatory. However, it seems to have grown vastly more powerful since your last encounter. Its form looms large, crackling with raw elemental energy that fills the air with a palpable sense of dread.
    
    The elemental fixates its intense gaze upon you, its eyes ablaze with unbridled fury. With a thunderous roar, it unleashes a barrage of elemental attacks, threatening to engulf you in its tempestuous wrath.`,
    options: [

    ]
  },
  {
    id: 50,
    text: `With unwavering resolve and steely determination, you engage the elemental in a fierce battle that rages throughout the tower's towering chambers. Despite its overwhelming power, you refuse to yield, summoning all of your strength and skill to combat the elemental's relentless onslaught.

    As the clash reaches its crescendo, you deliver a decisive blow that shatters the elemental's form, dispersing its essence into the ether. With a thunderous roar, the elemental dissipates, leaving behind only echoes of its once fearsome presence.
    
    Victorious but weary, you take a moment to catch your breath and survey the aftermath of the battle. The air is charged with residual elemental energy, crackling with a sense of lingering danger. Though the threat of the elemental has been vanquished, you remain ever vigilant, knowing that greater challenges may lie ahead in your quest for the orb.`,
    options: [
      {
        text: 'Return to Oakhurst',
        nextNode: 1,
        setState: { elementalKilled: true }
      },
      {
        text: 'Go towards the top of the tower',
        nextNode: 51,
        setState: { elementalKilled: true }
      } 
    ]
  },
  {
    id: 51,
    text: `As you ascend the final staircase, your heart races with anticipation, knowing that the elusive orb awaits you at the pinnacle of the tower. With each step, your determination grows, driving you ever closer to your goal.

    At last, you reach the summit, where the orb sits ensconced in a radiant aura, its power palpable even from a distance. With outstretched hand, you move to claim the orb, your fingers brushing against its shimmering surface.
    
    But in an instant, the tranquility is shattered as the air crackles with arcane energy, and the sorcerer materializes from thin air, his form obscured by an invisibility spell. With a malevolent grin, he unleashes a torrent of flames, engulfing you in searing heat.
    
    The fireball strikes with blistering force, knocking you back and leaving you singed but undeterred. As the flames subside, the sorcerer steps forward, his eyes gleaming with malice as he prepares to unleash his full fury upon you.
    
    With weapons drawn and spells at the ready, you brace yourself for the coming battle, knowing that the fate of the realm hangs in the balance. The time for words has passed; now, only steel and magic will decide the outcome of this fateful confrontation.`,
    options: [

    ]
  },
  {
    id: 52,
    text: `With a final, decisive blow, you vanquish the sorcerer, his dark form dissipating into nothingness as his malevolent laughter echoes into oblivion. As the last vestiges of his magic fade away, you find yourself standing victorious amidst the aftermath of the battle, your breath ragged and your body weary, yet triumphant in your success.

    With the sorcerer defeated, you turn your attention to the radiant orb that lies before you, its mystical energies pulsing with an otherworldly glow. With trembling hands, you reach out and grasp the orb, feeling its power coursing through your veins like a surge of primal energy.
    
    But as you touch the orb, a strange sensation washes over you, a vision of swirling darkness and fiery skies filling your mind. In the depths of your consciousness, you hear the distant roar of a dragon, its mighty wings beating against the air as it soars through the heavens.
    
    Though you stand within the confines of the tower, you feel as though you are transported to another realm entirely, caught in the throes of a vision that transcends time and space. With a sense of foreboding, you realize that the orb has summoned forth the ancient dragon, heralding a new chapter in your quest and setting the stage for a confrontation of epic proportions.`,
    options: [
      {
        text: 'Run away',
        nextNode: 53
      },
      {
        text: 'Search the room',
        nextNode: 54
      }
    ]
  },
  {
    id: 53,
    text: `As the vision of the dragon fades from your mind, you find yourself filled with a sudden sense of urgency, a primal instinct urging you to flee from the tower before it's too late. With a quick glance back at the orb, you turn and dash towards the exit, your footsteps echoing off the stone walls as you race down the winding staircase.

    But as you reach the base of the tower and burst through the heavy doors, a deafening roar fills the air, and you look up to see the massive form of the dragon descending from the sky. With a powerful beat of its wings, it swoops down towards you, its jaws agape and eyes burning with a fierce intensity.
    
    Before you can react, the dragon unleashes a torrent of flames from its maw, the searing heat washing over you like a wave of pure destruction. With a cry of pain, you stagger backward, your skin blistering and clothes singed by the inferno.
    
    But even as the flames subside, you steel yourself for the battle ahead, knowing that the fate of the realm hangs in the balance and that you must stand firm against the might of the dragon.`,
    options: [

    ]
  },
  {
    id: 54,
    text: `Driven by a sense of curiosity, you scour the chamber in search of anything that might aid you in your quest. Amidst the debris and detritus, your eyes alight upon a gleaming statue nestled in the corner of the room, its form carved in the likeness of a goddess.

    Intrigued by the statue's radiant beauty, you approach it cautiously, your fingers brushing against its smooth surface. As you make contact, a warm, soothing energy washes over you, suffusing your body with a renewed sense of vitality and strength.
    
    With a gasp of surprise, you feel your wounds begin to heal, the pain and fatigue of battle melting away like morning mist beneath the sun's rays. Energized by the statue's magical aura, you stand tall and resolute, ready to face whatever challenges lie ahead.
    
    But as you bask in the statue's healing embrace, a distant rumble fills the air, and you look up to see the massive form of the dragon descending from the sky. With a heavy thud, it lands before the tower, its eyes fixed upon you with a fierce intensity, signaling the beginning of a battle that will test your courage and resolve like never before.`,
    options: [
      {
        text: 'Confront the Dragon',
        nextNode: 55
      }
    ]
  },
  {
    id: 55,
    text: `With the healing energy of the statue coursing through your veins, you emerge from the tower, your gaze fixed upon the looming figure of the dragon. Though fear gnaws at the edges of your resolve, you steel yourself for the coming confrontation, drawing upon the newfound strength and courage granted by the magical artifact.

    As the dragon lands before you, its massive form casting a shadow over the landscape, you feel a surge of adrenaline course through your veins. With a defiant roar, you ready your weapon, preparing to face the beast head-on in a battle that will determine the fate of the realm.

    Before you can react, the dragon unleashes a torrent of flames from its maw, the searing heat washing over you like a wave of pure destruction. With a cry of pain, you stagger backward, your skin blistering and clothes singed by the inferno.
    
    With a flap of its mighty wings, the dragon rears back, its eyes narrowing as it assesses you with a mixture of curiosity and hostility. Then, with a deafening roar, it lunges forward, its jaws snapping shut inches from your face as you narrowly dodge the attack.`,
    options: [

    ]
  },
  {
    id: 56,
    text: `With a final, thunderous roar, the dragon staggers backward, its once-mighty form now battered and broken before you. As the echoes of battle fade into the distance, you stand triumphant amidst the wreckage, your weapon held high in a gesture of victory.

    The dragon, its scales stained with blood and its breath labored, regards you with a mixture of awe and resignation, its fiery gaze dimming as the light fades from its eyes. With a shuddering breath, it collapses to the ground, its life force ebbing away with each passing moment.
    
    As the dust settles and the adrenaline of battle begins to wane, a sense of profound relief washes over you, mingled with exhaustion and gratitude. Though the road has been long and fraught with peril, you have emerged victorious, your courage and determination carrying you through even the darkest of trials.
    
    With the dragon defeated and the realm safe once more, you stand as a beacon of hope and strength, a testament to the indomitable spirit of humanity. Though the scars of battle may linger, they serve as a reminder of the sacrifices made and the challenges overcome in the name of peace and justice.
    
    As you gaze upon the fallen dragon, its once-terrifying visage now a mere shadow of its former glory, you feel a profound sense of closure wash over you. The journey may have been perilous, but the rewards are great, and the future of the realm is brighter for your efforts.`,
    options: [
     
    ]
  },
  {
    id: 57,
    text: `As you approach the imposing structure of the Tower of Mysteries, you feel a sense of anticipation mingled with trepidation. Its ancient stones seem to whisper secrets of untold power, beckoning you to uncover the mysteries that lie within.

    However, as you reach the towering entrance, you realize with dismay that you lack the key needed to unlock its secrets. The heavy iron doors remain firmly sealed, defying your attempts to breach them.
    
    Frustration gnaws at the edges of your resolve as you ponder your next move. Without the key, gaining access to the tower's inner sanctum seems impossible, leaving you with a lingering sense of disappointment.`,
    options: [
      {
        text: 'Return to Oakhurst',
        nextNode: 1
      },
      {
        text: 'Explore the Forgotten Crypts',
        nextNode: 43,
        requiredState: (currentState) => !currentState.cryptsCleared,
        setState: { cryptsCleared: true }
      },
      {
        text: 'Seek out the Orcish Warlord',
        nextNode: 45,
        requiredState: (currentState) => !currentState.warlordSlain,
      },
      {
        text: `Visit the Seer's Sanctum`,
        nextNode: 44,
        requiredState: (currentState) => !currentState.seerVisited,
        setState: { seerVisited: true }
      }
    ]
  }
]  

export default textNodes;
