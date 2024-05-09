import { showTextNode, inventory, displayInventory, gold, modifyGold, goldDisplay,  modifyState, hp, hpDisplay, modifyHp, MAX_HP,textElement, displayStats, startGame, animateHeal, animateDamage, loadTooltips } from "./script.js";
import { items, skeletonConfig, owlbearConfig, elementalConfig, elementalRevivedConfig, golemConfig, shadeConfig, riddles, colors, orcConfig, warlordConfig, elementalAwakenedConfig, sorcererConfig, dragonConfig } from "./data.js";
import { showMonsterModal } from "./battle.js";
export const modal = document.querySelector('[data-modal]');
const overlay = document.querySelector('[data-overlay]');
let goldAvailable;

export default function addCustomButton(textNodeId) {

    const customButton = document.createElement('button');
    textElement.appendChild(customButton);
    customButton.classList.add('custom-button', 'tooltip-trigger');
    customButton.addEventListener('click', () => showModal(textNodeId));
    switch (textNodeId) {
      case 2:
        customButton.innerText = '🛏️'; 
        customButton.setAttribute('data-tooltip', 'Sleep');
        break;
      case 3:
        customButton.innerText = '💰';
        customButton.setAttribute('data-tooltip', 'Buy items');
        break;
      case 4:
        customButton.innerText = '📜';
        customButton.setAttribute('data-tooltip', 'Read the parchment');
        break;
      case 23:
      case 35:
        customButton.innerText = '💫'; 
        customButton.setAttribute('data-tooltip', 'Solve the riddle'); 
        break;  
      case 14:
      case 19: 
      case 25:
      case 29:
      case 32: 
      case 36: 
      case 41:
      case 45:
      case 46:
      case 49:
      case 51:
      case 53:
      case 55:  
        customButton.innerText = '⚔️';
        customButton.classList.add('fight-button'); 
        customButton.setAttribute('data-tooltip', 'Fight!'); 
        break; 
      case 56: 
        customButton.innerText = '🏆';
        customButton.setAttribute('data-tooltip', 'Finish the game!');
        break;   
    }
}

export function showModal(textNodeId) {

  overlay.classList.add('active');

  switch (textNodeId) {
    case 2:
      showColorModal(colors);
      break;  
    case 3:
      showMerchantModal();  
      break;
    case 4:    
      showParchmentModal();
      break;
    case 14:
      showMonsterModal(owlbearConfig);
      break;  
    case 19: 
      showMonsterModal(skeletonConfig);
      break;
    case 23: 
      showRiddleModal(1);
      break;
    case 25: 
      showMonsterModal(golemConfig);
      break;  
    case 29:
      showMonsterModal(elementalConfig);
      break;
    case 32:
      showMonsterModal(shadeConfig);
      break;
    case 35: 
      showColorModal(colors);
      break;     
    case 36:
      showMonsterModal(elementalRevivedConfig);
      break;  
    case 41:
    case 45:
      showMonsterModal(orcConfig);
      break;
    case 46: 
      showMonsterModal(warlordConfig); 
      break;
    case 49:
      showMonsterModal(elementalAwakenedConfig); 
      break;
    case 51:
      showMonsterModal(sorcererConfig);   
      break; 
    case 53:
    case 55:
      showMonsterModal(dragonConfig);
      break;
    case 56: 
      showVictoryModal();  
  }
}

function showMerchantModal() {
  modal.classList.add('active', 'steel-modal');
  overlay.style.backgroundColor = 'hsla(0, 100%, 0%, 0.5)';

  while (modal.firstChild) {
    modal.removeChild(modal.firstChild);
  }

  goldAvailable = document.createElement('div');
  goldAvailable.innerText = goldDisplay.innerText;
  goldAvailable.classList.add('gold-available', 'tooltip-trigger');
  goldAvailable.setAttribute('data-tooltip', 'Gold');
  modal.appendChild(goldAvailable);

  items.forEach(item => {
      if (item.cost) {
      const itemButton = document.createElement('button');
      const itemLabel = document.createElement('div');
      const itemCost = document.createElement('div');
      itemButton.innerText = item.emoji;
      itemLabel.innerText = item.name;
      itemCost.innerText = `${item.cost} gold`;
      itemButton.classList.add('custom-button', 'tooltip-trigger');
      itemLabel.classList.add('merchant-label');
      itemCost.classList.add('merchant-label');
      modal.appendChild(itemButton);
      modal.appendChild(itemLabel);
      modal.appendChild(itemCost);
      itemButton.setAttribute('data-tooltip', `${item.description}`);
      if (ownItem(item.name)) {
        itemButton.classList.add('inactive');
      } else {
        itemButton.addEventListener('click', () => buyItem(item.name, itemButton));
      }      
    }  
  })

  const leaveMerchant = document.createElement('button');
    leaveMerchant.innerText = 'Leave the store';
    leaveMerchant.classList.add('leave-merchant-button');
    modal.appendChild(leaveMerchant);

  leaveMerchant.addEventListener('click', () => {
    overlay.classList.remove('active');
    modal.classList.remove('active', 'steel-modal');
    while (modal.firstChild) {
      modal.removeChild(modal.firstChild);
    }
  }, { once: true });
  loadTooltips();
}

function showParchmentModal() {
  modal.classList.add('active', 'parchment-modal');
  overlay.style.backgroundColor = 'hsla(30, 100%, 25%, 0.5)';
  modal.innerText = `Seeking brave adventurers!

  The renowned scholar, Professor Eldrath, has uncovered ancient texts hinting at the location of a legendary relic: the Orb of Valorian. This artifact is said to possess untold powers and is coveted by many.
  
  However, the journey to uncover the Orb is perilous, fraught with treacherous paths, cunning foes, and ancient magic. Only the bravest and most skilled adventurers dare to embark on this quest.
  
  If you possess the courage and the strength to face the challenges ahead, seek out the professor at his study in the heart of Oakhurst. Your destiny awaits.`;

  overlay.addEventListener('click', () => {
    showTextNode(5);
    overlay.classList.remove('active');
    modal.classList.remove('active', 'parchment-modal');
    modal.innerText = '';
    modifyState({gotQuest: true});
  }, { once: true });
}

function showInnModal() {
  modal.classList.add('active', 'inn-modal');
  overlay.style.backgroundColor = 'hsla(260, 40%, 20%, 0.6)';

  const sleepButton = document.createElement('button');
  const leaveButton = document.createElement('button');
  const goldAvailable = document.createElement('div');
  const remainingHp = document.createElement('div');
  const restText = document.createElement('div');

  sleepButton.innerText = 'Spend the night: 1 gold';
  leaveButton.innerText = 'Leave';
  goldDisplay.innerText = `🥮: ${modifyGold(gold)}`;
  remainingHp.innerText = hpDisplay.innerText;
  goldAvailable.innerText = goldDisplay.innerText;
  restText.innerText = '';

  sleepButton.classList.add('inn-button', 'sleep-button');
  leaveButton.classList.add('inn-button', 'leave-button');
  goldAvailable.classList.add('gold-available', 'tooltip-trigger');
  goldAvailable.setAttribute('data-tooltip', 'Gold')
  remainingHp.classList.add('remaining-hp', 'tooltip-trigger', 'delay');
  remainingHp.setAttribute('data-tooltip', 'Hitpoints');

  modal.appendChild(sleepButton);
  modal.appendChild(leaveButton);
  modal.appendChild(goldAvailable);
  modal.appendChild(remainingHp);
  modal.appendChild(restText);

  sleepButton.addEventListener('click', () => {
    
    if (gold > 0 && hp < MAX_HP) {
      hpDisplay.innerText = `❤️: ${modifyHp(MAX_HP)}`;
      remainingHp.innerText = hpDisplay.innerText;
      goldDisplay.innerText = `🥮: ${modifyGold(gold - 1)}`;
      goldAvailable.innerText = goldDisplay.innerText; 
      restText.innerText = 'You wake up fully rested!';
      animateHeal(remainingHp); 
    } else if (hp === MAX_HP) {
      restText.innerText = 'You are fully rested! No need to waste more time here.';
    } else {
      restText.innerText = 'Not enough gold';  
    }
  })

  leaveButton.addEventListener('click', () => {
    overlay.classList.remove('active');
    modal.classList.remove('active', 'inn-modal');
    while (modal.firstChild) {
      modal.removeChild(modal.firstChild);
    }
  }, { once: true });
  loadTooltips();
}

function showRiddleModal(id) {
  modal.classList.add('active', 'riddle-modal');
  overlay.style.backgroundImage = `url('../img/runes.jpg')`;
  const remainingHealth = document.createElement('div');
  remainingHealth.innerText = hpDisplay.innerText;
  remainingHealth.classList.add('remaining-hp', 'riddle-hp', 'tooltip-trigger', 'delay');
  remainingHealth.setAttribute('data-tooltip', 'Hitpoints')

  for (let i = 0; i < riddles.length; i++) {

    if (riddles[i].id === id) {

      modal.innerText = riddles[i].text;
      modal.appendChild(remainingHealth);

      for (let j = 0; j < riddles[i].answers.length; j++){

        const answerButton = document.createElement('button');
        answerButton.innerText = riddles[i].answers[j];
        answerButton.classList.add('answer-button');
        modal.appendChild(answerButton);

        if (riddles[i].answers[j] === riddles[i].correctAnswer) {

          if ( i < (riddles.length - 1)) {

            answerButton.addEventListener('click', () => {
              showRiddleModal(i + 2);  
            })

          } else {

            answerButton.addEventListener('click', () => {
              showTextNode(24);
              overlay.classList.remove('active');
              overlay.style.background = 'none'; 
              modal.classList.remove(`riddle-modal`, 'active');
              modifyState({ riddlesSolved: true });
              while (modal.firstChild) {
                modal.removeChild(modal.firstChild);
              };
            })  
          } 

        } else {

          answerButton.addEventListener('click', () => {
            modifyHp(hp - 10);            
            animateDamage(remainingHealth);
            displayStats();
            remainingHealth.innerText = hpDisplay.innerText;
          })  
        }
      }
    }
  }
}

function showColorModal(colors) {
  modal.classList.add('active', 'colors-modal');
  overlay.style.backgroundImage = `url('../img/runes.jpg')`;
  const remainingHealth = document.createElement('div');
  remainingHealth.innerText = hpDisplay.innerText;
  remainingHealth.classList.add('remaining-hp', 'riddle-hp', 'tooltip-trigger', 'delay');
  remainingHealth.setAttribute('data-tooltip', 'Hitpoints')
  modal.appendChild(remainingHealth);

  const wheel = document.createElement('div');
  wheel.classList.add('color-wheel');
  modal.appendChild(wheel);
  const pentagram = document.createElement('div');
  pentagram.innerText = '⛤';
  pentagram.classList.add('pentagram');
  wheel.appendChild(pentagram);

  const colorChoices = document.createElement('div');
  colorChoices.classList.add('color-choices');
  modal.appendChild(colorChoices);

  colorChoices.addEventListener('dragover', e => {
    e.preventDefault();
    const draggable = document.querySelector('.dragging');
    colorChoices.appendChild(draggable);
  });

  for (let i = 0; i < 5; i++) {
    const slot = document.createElement('div');
    slot.classList.add('color-slot', `slot-${i}`);
    wheel.appendChild(slot);

    slot.addEventListener('dragover', e => {
      e.preventDefault();
      const draggable = document.querySelector('.dragging');
      const existingColorChoice = slot.querySelector('.color-choice');

      if (!existingColorChoice) {
        slot.appendChild(draggable);
      }
    });
  }

  const shuffledColors = [];
  const colorCount = colors.length;
  const colorsCopy = [...colors];

  for (let i = 0; i < colorCount; i++) {

    const randomIndex = Math.floor(Math.random() * colorsCopy.length);
    shuffledColors.push(colorsCopy.splice(randomIndex, 1)[0]);
  }

  for (let i = 0; i < shuffledColors.length; i++) {
    
    const colorChoice = document.createElement('div');
    colorChoice.classList.add('color-choice', shuffledColors[i]);
    colorChoices.appendChild(colorChoice);
    colorChoice.setAttribute('draggable', true);

    colorChoice.addEventListener('dragstart', () => {
      colorChoice.classList.add('dragging');
    });

    colorChoice.addEventListener('dragend', () => {
      colorChoice.classList.remove('dragging');
    });
  }

  const doorButton = document.createElement('button');
  doorButton.innerText = '🚪'
  doorButton.classList.add('custom-button');
  modal.appendChild(doorButton);
  doorButton.addEventListener('click', () => {
    checkColors(remainingHealth);
  })
}

function checkColors(remainingHealth) {
  const colorSlots = document.querySelectorAll('.color-slot');
  let allCorrect = true;
  console.log('checked');
  
  colorSlots.forEach((slot, index) => {
    const colorChoice = slot.querySelector('.color-choice');
    const choiceColor = colorChoice ? colorChoice.classList[1] : null; 

    if (colors[index] !== choiceColor) {
      allCorrect = false;
    }
  });

  if (allCorrect) {
    showTextNode(38);
    overlay.classList.remove('active');
    overlay.style.background = 'none'; 
    modal.classList.remove(`colors-modal`, 'active');
    modifyState({ cityDiscovered: true, observatoryCleared: true });
    while (modal.firstChild) {
      modal.removeChild(modal.firstChild);
    };
  } else {
    modifyHp(hp - 25);
    displayStats();
    remainingHealth.innerText = hpDisplay.innerText;
    animateDamage(remainingHealth);
  }
}

function buyItem(name, button) {
  items.forEach((item) => {
    if (item.name === name && item.cost <= gold) {
      inventory.push(item);
      goldDisplay.innerText = `🥮: ${modifyGold(gold - item.cost)}`;
      goldAvailable.innerText = goldDisplay.innerText;
      button.classList.add('inactive');
    }
  })
  displayInventory();
} 

function ownItem(name) {
  for (let i = 0; i < inventory.length; i++) {
    if (inventory[i].name === name) {
      return true;
    };
  }
}

function showVictoryModal() {
  modal.classList.add('active', 'victory-modal');
  overlay.style.backgroundColor = 'hsla(30, 100%, 25%, 0.75)';
  modal.innerText = `With the dragon defeated and the realm safe once more, you embark on the journey back to civilization, your heart heavy with the weight of your triumphs and the memories of those who fell along the way.

  As you return to civilization, you are hailed as a champion, a beacon of hope in a world beset by darkness. Though the battles may be over, your legacy will live on, inspiring generations to come with tales of your bravery and courage in the face of insurmountable odds.

  As you return to Oakhurst, the townsfolk greet you with cheers and applause, their faces alight with gratitude and admiration. Among them stands Professor Eldrath, his eyes shining with pride as he approaches you.
  
  "Congratulations, my friend," he says, clasping your hand warmly. "You have done the realm a great service. But there is something more you must know about the orb of Valorian."
  
  As he leads you to his study, Professor Eldrath explains the true significance of the orb, revealing its role in maintaining the balance of magic within the realm. Without it, he warns, the very fabric of reality would be at risk of unraveling.
  
  "It was no mere relic you sought," he explains, "but a crucial artifact essential to the preservation of our world. Your bravery and courage in retrieving it have saved us all."
  
  As you listen to his words, a sense of pride swells within you, knowing that your actions have not only brought peace to the realm but safeguarded its future for generations to come. With the knowledge of your true purpose now revealed, you look to the future with renewed determination, ready to face whatever challenges may lie ahead.`;
  overlay.addEventListener('click', () => {
    startGame();
    overlay.classList.remove('active');
    modal.classList.remove('active', 'victory-modal');
    modal.innerText = '';
  }, { once: true });
}


