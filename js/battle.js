import { dragonConfig } from "./data.js";
import { modal, showModal } from "./modals.js";
import { hp, modifyHp, playerWeapon, lvl, hpDisplay, calculateDefence, modifyGold, xp, modifyXp, gold, updateLevel, displayStats, showTextNode, weaponEnchantment, currentNode, playerShield, inventory, drinkPotion, animateHeal, loadTooltips, startGame } from "./script.js";

let totalRuinsTreasure = 0;
let orcCount = 0;

export function showMonsterModal(monsterConfig) {
  modal.classList.add(`${monsterConfig.name.toLowerCase()}-modal`, 'battle-modal', 'active');
  overlay.style.backgroundImage = `url('${monsterConfig.image}')`;

  let damageDone = 0;
  let damageSuffered = 0;
  
  const monsterHealth = document.createElement('div');
  const ownHealth = document.createElement('div');
  const attackButton = document.createElement('button');
  const runButton = document.createElement('button');

  monsterHealth.innerText = `${monsterConfig.name}:
  🩸:${monsterConfig.health}hp`;
  ownHealth.innerText = `❤️:${modifyHp(hp - damageSuffered)}hp`;
  attackButton.innerText = 'Attack!';
  runButton.innerText = 'Run!';

  monsterHealth.classList.add('fight-stat', 'enemy-hp');
  ownHealth.classList.add('fight-stat', 'player-hp', 'delay');
  attackButton.classList.add('combat-button', 'attack-button');
  runButton.classList.add('combat-button', 'run-button');

  modal.appendChild(monsterHealth);
  modal.appendChild(attackButton);
  modal.appendChild(runButton);
  modal.appendChild(ownHealth);

  attackButton.addEventListener('click', () => {

    const displays = modal.querySelectorAll('.damage-display');
    displays.forEach((display) => {
      modal.removeChild(display)
    })

    const damageDoneDisplay = document.createElement('div');
    damageDoneDisplay.classList.add('damage-display', 'done');
    modal.appendChild(damageDoneDisplay);

    let attacks = playerWeapon.attacks || 1;
    if (playerShield.armour) {
      attacks = 1;
    }
    for (let i = 0; i < attacks; i++) {

      let attackRoll = rollDie('100');
      let monsterDefence = monsterConfig.defence;

      if (weaponEnchantment && monsterDefence > 50) {
        monsterDefence /= 2;
      }

      if (attackRoll > monsterDefence) {

        let strikeDamage = rollDie(playerWeapon.damage) + lvl;
        damageDone += strikeDamage;
        const damageDoneNode = document.createTextNode(`-${strikeDamage}🩸`);
        damageDoneDisplay.appendChild(damageDoneNode);

        if (monsterConfig.health - damageDone > 0) {

          monsterHealth.innerText = `${monsterConfig.name}:
      🩸:${monsterConfig.health - damageDone}hp`;

        } else {

          monsterHealth.innerText = `${monsterConfig.name}:
          🩸:0hp`;
          defeatMonster(monsterConfig);
          return;
        }

      } else {
        const damageDoneNode = document.createTextNode(`Miss!`);
        damageDoneDisplay.appendChild(damageDoneNode);
      }

      const lineBreak = document.createElement("br");      
      damageDoneDisplay.appendChild(lineBreak);

    }
    
    let opposedRoll = rollDie('100');

    const damageTakenDisplay = document.createElement('div');
    damageTakenDisplay.classList.add('damage-display', 'suffered');
    modal.appendChild(damageTakenDisplay);

    if (opposedRoll > calculateDefence()) {
      damageSuffered += rollDie(monsterConfig.damage) + monsterConfig.lvl;
      hpDisplay.innerText = `❤️:${modifyHp(hp - damageSuffered)}hp`;
      ownHealth.innerText = hpDisplay.innerText;
      damageTakenDisplay.innerText = `-${damageSuffered}❤️`;
      
      if (hp <= 0) {
        modal.classList.remove(`${monsterConfig.name.toLowerCase()}-modal`, 'battle-modal', 'active');
        while (modal.firstChild) {
          modal.removeChild(modal.firstChild);
        };
      }
      checkForDeath();

    } else {

      damageTakenDisplay.innerText = `Miss!`;
    }
    damageSuffered = 0;
  });

  if (currentNode <= 50) {

    runButton.addEventListener('click', () => {
      overlay.classList.remove('active');
      overlay.style.background = 'none'; 
      modal.classList.remove(`${monsterConfig.name.toLowerCase()}-modal`, 'battle-modal', 'active');
      showTextNode(0);

      while (modal.firstChild) {
        modal.removeChild(modal.firstChild);
      };
    });

  } else {
    runButton.classList.add('inactive', 'tooltip-trigger');
    runButton.setAttribute('data-tooltip', 'You cannot run from this fight...');
  }    
  
  
  generatePotionButtons(modal, ownHealth);
  loadTooltips();
}

function generatePotionButtons(modal, ownHealth) {
  const potionDisplay = document.createElement('div');
  potionDisplay.classList.add('potion-display', 'tooltip-trigger');
  potionDisplay.setAttribute('data-tooltip', `Available potions`);
  modal.appendChild(potionDisplay);

  inventory.forEach(item => {
    if (item.class === 'potion') {
      const potionButton = document.createElement('button');
      potionButton.innerText = item.emoji;
      potionButton.classList.add('item-icon', `${item.class}`, 'potion-button', 'tooltip-trigger');
      potionButton.setAttribute('data-tooltip', `${item.name}, healing: ${item.healing}`);
      potionButton.addEventListener('click', () => {
        drinkPotion(item);
        ownHealth.innerText = hpDisplay.innerText;
        potionDisplay.removeChild(potionButton);
        animateHeal(ownHealth);
      });

      potionDisplay.appendChild(potionButton);
    }
  })
  
}

function rollDie(die) {
  if (die == 0) {
    return 0;
  }  
  return Math.floor(Math.random() * die) + 1;
}

function defeatMonster(monsterConfig) {
  while (modal.firstChild) {
    modal.removeChild(modal.firstChild);
  };

  const xpGained = Math.floor(monsterConfig.xp / lvl);
  const goldGained = Math.floor(monsterConfig.gold / lvl); 
    
  const victoryText = document.createElement('div');
  victoryText.innerText = `You win!
  +${xpGained}🧠
  +${goldGained}🥮`
  victoryText.classList.add('victory-text');
  modal.appendChild(victoryText);

  modifyGold(gold + goldGained);
  modifyXp(xp + xpGained); 
  displayStats();
  updateLevel();

  if (monsterConfig.recurring) {
    switch (monsterConfig.name) {
      case 'Skeleton': 
        totalRuinsTreasure += goldGained;         
        if (totalRuinsTreasure < 60) {
          generateRecurringButtons(monsterConfig, 19, 18);            
        } else {
          generateFinishButton(monsterConfig);
        } 
        break;
      case 'Orc':
        orcCount ++;
        if (orcCount < 5) {
          generateRecurringButtons(monsterConfig, 41, 40);            
        } else {
          generateFinishButton(monsterConfig);
        } 
        break; 
    }  
  } else {

    generateFinishButton(monsterConfig);
  }
}
 
function generateRecurringButtons(monsterConfig, currentModal, returnTarget) {

  const continueButton = document.createElement('button');
  continueButton.innerText = 'Continue fighting!';
  continueButton.classList.add('combat-button', 'continue-button');
  modal.appendChild(continueButton);
  continueButton.addEventListener('click', () => {
    endFight(monsterConfig);
    showModal(currentModal);
  });

  const returnButton = document.createElement('button');
  returnButton.innerText = 'Leave';
  returnButton.classList.add('combat-button', 'return-button');
  modal.appendChild(returnButton);
  returnButton.addEventListener('click', () => {
    endFight(monsterConfig);
    showTextNode(returnTarget);  
  });
}

function generateFinishButton(monsterConfig) {
  orcCount = 0;
  const finishButton = document.createElement('button');
  finishButton.innerText = 'Finish fighting';
  finishButton.classList.add('combat-button', 'finish-button');
  modal.appendChild(finishButton);
  finishButton.addEventListener('click', () => {
    endFight(monsterConfig);
    if (monsterConfig === dragonConfig) {
      showTextNode(56)
    } else {
      showTextNode(currentNode + 1);
    }  
  })  

}

function endFight(monsterConfig) {
  overlay.classList.remove('active');
  overlay.style.background = 'none'; 
  modal.classList.remove(`${monsterConfig.name.toLowerCase()}-modal`, 'battle-modal', 'active');
  while (modal.firstChild) {
    modal.removeChild(modal.firstChild);
  };
} 

function showDeathModal() {
  modal.classList.add('active', 'death-modal');
  overlay.style.backgroundImage = 'url(../img/blood.jpg)';
  modal.innerText = `YOU DIE!`;
  overlay.addEventListener('click', () => {
    overlay.classList.remove('active');
    overlay.style.background = 'none';
    modal.classList.remove('active', 'death-modal');
    modal.innerText = '';
    startGame();
  }, { once: true })
}

export function checkForDeath() {
  if (hp <= 0) {
    showDeathModal()
  }
}

export function resetCounters() {
  totalRuinsTreasure = 0;
  orcCount = 0;
}

