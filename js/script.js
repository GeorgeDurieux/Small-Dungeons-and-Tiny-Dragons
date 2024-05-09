import textNodes from "./nodes.js";
import addCustomButton from "./modals.js";
import { items } from "./data.js";
import { checkForDeath, resetCounters } from "./battle.js";

export const textElement = document.querySelector('[data-text-element]');
const buttonGrid = document.querySelector('[data-button-grid]');
const lvlDisplay = document.querySelector('[data-lvl]');
export const xpDisplay = document.querySelector('[data-xp]');
export const hpDisplay = document.querySelector('[data-hp]');
export const goldDisplay = document.querySelector('[data-gold]');
const attackDisplay = document.querySelector('[data-attack]');
const defenceDisplay = document.querySelector('[data-defence]');
const inventoryDisplay = document.querySelector('[data-inventory]');
let weaponSlot = document.querySelector('[data-weapon-slot]');
let shieldSlot = document.querySelector('[data-shield-slot]');
let armourSlot = document.querySelector('[data-armour-slot]');

export let MAX_HP = 100;

export let playerWeapon = {};
let playerArmour = {};
export let playerShield = {};
export let weaponEnchantment = false;
let fireResistance = false;
export let lvl;
export let xp;
export let currentNode = 1;
export function modifyXp ( currentXp ) { return xp = currentXp };
let nodeEffect = document.createElement('div');
export let hp;
export function modifyHp ( currentHp ) { return hp = currentHp };
export let gold;
export function modifyGold ( newGold ) { return gold = newGold };
export let state;
export function modifyState ( newState ) { 
  return Object.assign(state, newState) 
};

export let inventory;
let draggedIcon;
let fireDamage = 0;

export function startGame () {
  lvl = 1;
  xp = 0;
  hp = 100;
  gold = 10;
  state = {};
  inventory = [];
  inventory.push(items[0]);
  playerWeapon = items[0];
  playerArmour = { armour: 0 };
  playerShield = { armour: 0 };
  weaponEnchantment = false;
  fireResistance = false;
  showTextNode(1);
  displayStats();
  displayInventory();
  resetCounters();
  shieldSlot.classList.add('empty');
  armourSlot.classList.add('empty');
}

export function showTextNode(textNodeId) {

  const textNode = textNodes.find(textNode => textNode.id === textNodeId);
  textElement.innerText = textNode.text;
  addCustomButton(textNodeId);
  resolveAreaEffect(textNodeId);
  currentNode = textNodeId;

  while (buttonGrid.firstChild) {
    buttonGrid.removeChild(buttonGrid.firstChild);
  } 

  textNode.options.forEach(option => {
    if (acceptOption(option)) {
      const button = document.createElement('button');
      button.innerText = option.text;
      button.classList.add('button');
      button.addEventListener('click', () => selectOption(option));
      buttonGrid.appendChild(button);
    }
  })
}

function resolveAreaEffect(textNodeId) {
  switch (textNodeId) {
    case 0:
      const damage = Math.floor(Math.random() * 25);
      modifyHp(hp - damage);
      displayStats();
      showNodeEffect();
      nodeEffect.innerText = `-${damage}❤️`;
      animateDamage(hpDisplay);
      checkForDeath();
      break;
    case 7:
      xp += 2;
      updateLevel();
      showNodeEffect();
      nodeEffect.innerText = `Area unlocked: Archmage's Observatory!
       +2🧠!`;
      animateXp(xpDisplay); 
      break;
    case 8:
      xp += 3;
      hp -= 5;
      updateLevel();
      showNodeEffect();
      nodeEffect.innerText = `+3🧠!
       -5❤️!`;
      animateDamage(hpDisplay);
      animateXp(xpDisplay);
      checkForDeath();
      break;
    case 9:
      xp += 1;
      updateLevel();
      inventory.push(items[8]);
      displayInventory();
      showNodeEffect();
      nodeEffect.innerText = `+1🧠!
       Item found: 🧴!`;
       animateXp(xpDisplay);
      break;
    case 10: 
      xp += 4;
      updateLevel();
      showNodeEffect();
      nodeEffect.innerText = '+4🧠!';
      animateXp(xpDisplay);
      break;
    case 16:
      weaponEnchantment = true;
      attackDisplay.classList.add('enchanted');
      showNodeEffect();
      nodeEffect.innerText = 'Unlocked: Weapon enchantment!';  
      break;
    case 17:
      xp += 5;
      updateLevel();
      showNodeEffect();
      nodeEffect.innerText = `Area unlocked: Temple of Valorian!;
      +5🧠!`;
      animateXp(xpDisplay);  
      break;  
    case 20:
      xp += 5;
      gold += 40;
      updateLevel();
      showNodeEffect(); 
      nodeEffect.innerText = `+5🧠!
       +40🥮!`; 
       animateXp(xpDisplay);
      animateGold(goldDisplay);
      break; 
    case 24:
      xp += 10;
      updateLevel()
      showNodeEffect();
      nodeEffect.innerText = '+10🧠!'; 
      animateXp(xpDisplay);  
      break;
    case 26:
      inventory.push(items[10]);
      displayInventory();
      showNodeEffect();
      nodeEffect.innerText = `Item found: 🗝️!`;
      break;
    case 27: 
      xp += 4;
      updateLevel();
      showNodeEffect();
      nodeEffect.innerText = `Area unlocked: City of Ancients!
       +4🧠!`;
      break; 
    case 31:
      xp += 3;
      hp = MAX_HP;
      updateLevel();
      showNodeEffect();
      nodeEffect.innerText = '+3🧠!, ❤️:Full!';
      animateXp(xpDisplay);
      animateHeal(hpDisplay);
      break;
    case 38:
      xp += 10;
      inventory.push(items[11]);
      fireResistance = true;
      updateLevel();
      displayInventory();
      showNodeEffect();
      nodeEffect.innerText = `Item found: ⚜️!
      +10🧠!`;
      animateXp(xpDisplay);
      break; 
    case 39:
      inventory.push(items[11]);
      fireResistance = true;
      displayInventory();
      showNodeEffect();
      nodeEffect.innerText = `Item found: ⚜️!`;
      break;  
    case 43:
      gold += 100;
      inventory.push(items[9]); 
      displayInventory();
      showNodeEffect();
      nodeEffect.innerText = `+100🥮!
      Item found: 🧴!`;
      animateGold(goldDisplay); 
      break;  
    case 51:
    case 53:
    case 55:  
      fireDamage = 10 * Math.floor(Math.random() * 6);
      if (fireResistance === true) {
        fireDamage = Math.floor(fireDamage / 2)
      }
      modifyHp(hp - fireDamage);
      displayStats();
      showNodeEffect();
      nodeEffect.innerText = `${fireDamage} fire damage!`;
      animateDamage(hpDisplay);
      checkForDeath();
      break;        
    case 54:
      hp = MAX_HP;
      showNodeEffect();
      nodeEffect.innerText = '❤️:Full!';
      animateHeal(hpDisplay);
      break;  
    case 52:
      inventory.push(items[12]);
      displayInventory();
      showNodeEffect();
      nodeEffect.innerText = `Item found: 🔮!`;
      break;  
  }
  displayStats();
}

function showNodeEffect() {
  nodeEffect.classList.add('node-effect');
  nodeEffect.innerText = '';
  textElement.prepend(nodeEffect);
}

export function updateLevel() {
  lvl = Math.floor(xp / 10) + 1;
  displayStats();
}

function acceptOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextNodeId = option.nextNode;
  state = Object.assign(state, option.setState);
  showTextNode(nextNodeId);
  loadTooltips();
}

export function displayStats() {
  lvlDisplay.innerText = `✨: ${lvl}`;
  xpDisplay.innerText = `🧠: ${xp % 10}`;
  hpDisplay.innerText = `❤️: ${hp}`;
  goldDisplay.innerText = `🥮: ${gold}`;
  if (playerWeapon.damage === '0') {
    attackDisplay.innerText = `⚔️: ${lvl}`;
  } else {
    attackDisplay.innerText = `⚔️: 1d${playerWeapon.damage}+${lvl}`;
  }
  defenceDisplay.innerText = `🛡️: ${calculateDefence()}%`;
}

export function displayInventory() {
  inventoryDisplay.innerText = '';
  weaponSlot.innerText = '';
  shieldSlot.innerText = '';
  armourSlot.innerText = '';
  
  inventory.sort(function (a, b) {
    return a.id - b.id
  })

  inventory.forEach(item => {

    const itemIcon = document.createElement('div');
    itemIcon.innerText = item.emoji;
    itemIcon.classList.add('item-icon', `${item.class}`);
    itemIcon.setAttribute('data-name', `${item.name}`);

    if (item.name === 'fists') {
      itemIcon.classList.add('default');
    }

    if (item === playerWeapon){

      weaponSlot.appendChild(itemIcon);
      itemIcon.classList.add('active-item-icon');

    } else if (item === playerShield) {

      shieldSlot.appendChild(itemIcon);
      shieldSlot.classList.remove('empty');
      itemIcon.classList.add('active-item-icon');

    } else if (item === playerArmour) {

      armourSlot.appendChild(itemIcon);
      armourSlot.classList.remove('empty');
      itemIcon.classList.add('active-item-icon');

    } else {

      inventoryDisplay.appendChild(itemIcon);
    }    
    
    if (item.class === 'weapon' || item.class === 'shield' || item.class === 'armour') {

      itemIcon.setAttribute('draggable', true);

      itemIcon.addEventListener('dragstart', () => {

        itemIcon.classList.add('dragging');
      })

      itemIcon.addEventListener('dragend', () => {
        
        itemIcon.classList.remove('dragging');
      })

    } else if (item.class === 'potion') {

      itemIcon.addEventListener('click', () => drinkPotion(item));
    } 

    generateIconTooltips(item, itemIcon);           
  })
}

function setActiveWeapon(selectedItem, selectedIcon) {

  document.querySelectorAll('.weapon-icon').forEach(icon => {
    icon.classList.remove('active-item-icon');
  });

  selectedIcon.classList.add('active-item-icon');
  animateSlot(weaponSlot);
  playerWeapon = selectedItem;
  displayStats();
}

function setActiveShield(selectedItem, selectedIcon) {

  document.querySelectorAll('.shield-icon').forEach(icon => {
    icon.classList.remove('active-item-icon');
  });

  selectedIcon.classList.add('active-item-icon');
  animateSlot(shieldSlot);
  playerShield = selectedItem;
  calculateDefence();
  displayStats();
}

function setActiveArmour(selectedItem, selectedIcon) {
  document.querySelectorAll('.armour-icon').forEach(icon => {
    icon.classList.remove('active-item-icon');
  });

  selectedIcon.classList.add('active-item-icon');
  animateSlot(armourSlot);
  playerArmour = selectedItem;
  calculateDefence();
  displayStats();
}

export function drinkPotion(selectedPotion) {

  hp += selectedPotion.healing;
  if (hp > MAX_HP) {
    hp = MAX_HP;
  }
  hpDisplay.innerText = `❤️: ${hp}`;

  const potionIndex = inventory.findIndex(item => item.name === selectedPotion.name);

  if (potionIndex !== -1) {
    inventory.splice(potionIndex, 1);
    const potionIcon = document.querySelector(`.${selectedPotion.name}`);

    if (potionIcon) {
      potionIcon.remove();
    }
  }
  displayInventory();
  animateHeal(hpDisplay);
}

export function calculateDefence() {
  return playerArmour.armour + playerShield.armour;  
}

export function animateHeal(display) {
  display.classList.add('hp-up');
  setTimeout(() => {
    display.classList.remove('hp-up');
  }, 500);
}

export function animateDamage(display) {
  display.classList.add('hp-down');
  setTimeout(() => {
    display.classList.remove('hp-down');
  }, 500);
}

export function animateGold(display) {
  display.classList.add('gold-up');
  setTimeout(() => {
    display.classList.remove('gold-up');
  }, 500);
}

export function animateXp(display) {
  display.classList.add('xp-up');
  setTimeout(() => {
    display.classList.remove('xp-up');
  }, 500);
}

export function animateSlot(display) {
  display.classList.add('new-gear');
  setTimeout(() => {
    display.classList.remove('new-gear');
  }, 500);
}

function generateIconTooltips(item, itemIcon) {
  switch (item.class) {

    case 'weapon':
      let weaponDamage = item.damage;
      if (item.damage === '0') {
        weaponDamage = `${lvl}`;
      } else {
        weaponDamage = `1d${item.damage}+${lvl}`;
      }
      itemIcon.classList.add('weapon-icon', 'tooltip-trigger');
      itemIcon.setAttribute('data-tooltip', `${item.name}, damage: ${weaponDamage}, attacks: ${item.attacks}`);
      break;

    case 'armour':

      itemIcon.classList.add('armour-icon', 'tooltip-trigger');
      itemIcon.setAttribute('data-tooltip', `${item.name}, armour: ${item.armour}`);
      break;

    case 'shield':

      itemIcon.classList.add('shield-icon', 'tooltip-trigger');
      itemIcon.setAttribute('data-tooltip', `${item.name}, shield: ${item.armour}`);
      break;

    case 'potion':
  
      itemIcon.classList.add('potion-icon', 'tooltip-trigger');
      itemIcon.setAttribute('data-tooltip', `${item.name}, healing: ${item.healing}`);
      break;

    case 'quest':
      itemIcon.classList.add('tooltip-trigger');
      itemIcon.setAttribute('data-tooltip', `${item.description}`);
      break;  
  }
}

export function loadTooltips() {
  const tooltipTriggers = document.querySelectorAll('.tooltip-trigger');

  tooltipTriggers.forEach(function(tooltipTrigger) {
    const text = tooltipTrigger.getAttribute('data-tooltip');
    const tooltipElement = document.createElement('div');
    tooltipElement.textContent = text;
    tooltipElement.classList.add('tooltip');
    document.body.appendChild(tooltipElement);

    tooltipTrigger.addEventListener('mouseenter', () => {
      tooltipElement.style.display = 'block';
    })

    tooltipTrigger.addEventListener('mouseleave', () => {
      tooltipElement.style.display = 'none';
    })

    tooltipTrigger.addEventListener('mousedown', () => {
      tooltipElement.style.display = 'none';
    })

    tooltipTrigger.addEventListener('mousemove', e => {
      const tooltipHeight = tooltipElement.offsetHeight;
      const x = e.clientX + 10;
      const y = e.clientY - tooltipHeight - 10;

      tooltipElement.style.left = `${x}px`;
      tooltipElement.style.top = `${y}px`;
    })
  })
}

//  --EVENT LISTENERS-- 

inventoryDisplay.addEventListener('dragover', e => {
  e.preventDefault();
})

weaponSlot.addEventListener('dragover', e => {
  e.preventDefault();
})

shieldSlot.addEventListener('dragover', e => {
  e.preventDefault();
})

armourSlot.addEventListener('dragover', e => {
  e.preventDefault();
})

weaponSlot.addEventListener('drop', e => {
  e.preventDefault();
  draggedIcon = document.querySelector('.dragging');
  if (draggedIcon.classList.contains('weapon')) {
    weaponSlot.appendChild(draggedIcon);
    const draggedName = draggedIcon.getAttribute('data-name');
    const draggedWeapon = inventory.find(object => object.name === draggedName);
    setActiveWeapon(draggedWeapon, draggedIcon);
    displayInventory();
  }
})

shieldSlot.addEventListener('drop', e => {
  e.preventDefault();
  draggedIcon = document.querySelector('.dragging');
  if (draggedIcon.classList.contains('shield')) {
    shieldSlot.appendChild(draggedIcon);
    const draggedName = draggedIcon.getAttribute('data-name');
    const draggedShield = inventory.find(object => object.name === draggedName);
    setActiveShield(draggedShield, draggedIcon);
    displayInventory();
  }
})

armourSlot.addEventListener('drop', e => {
  e.preventDefault();
  draggedIcon = document.querySelector('.dragging');
  if (draggedIcon.classList.contains('armour')) {
    armourSlot.appendChild(draggedIcon);
    const draggedName = draggedIcon.getAttribute('data-name');
    const draggedArmour = inventory.find(object => object.name === draggedName);
    setActiveArmour(draggedArmour, draggedIcon);
    displayInventory();
  }
})

inventoryDisplay.addEventListener('drop', e => {
  e.preventDefault();
  draggedIcon = document.querySelector('.dragging');
  const draggedName = draggedIcon.getAttribute('data-name');
  const draggedItem = inventory.find(object => object.name === draggedName);
  inventoryDisplay.appendChild(draggedIcon);
  if (draggedIcon.classList.contains('weapon') && draggedIcon.classList.contains('active-item-icon')) {

    draggedIcon.classList.remove('active-item-icon');
    playerWeapon = {};
    
    if (!weaponSlot.firstChild) {
      setActiveWeapon(inventory[0], inventoryDisplay.firstChild);
    }
    displayInventory();
    
  } else if (draggedIcon.classList.contains('shield') && draggedIcon.classList.contains('active-item-icon')) {

    draggedIcon.classList.remove('active-item-icon');
    playerShield = { armour: 0 };
    shieldSlot.classList.add('empty');
    calculateDefence();
    displayInventory();
    displayStats();

  } else if (draggedIcon.classList.contains('armour') && draggedIcon.classList.contains('active-item-icon')) {

    draggedIcon.classList.remove('active-item-icon');
    playerArmour = { armour: 0 };
    armourSlot.classList.add('empty');
    calculateDefence();
    displayInventory();
    displayStats();
  }
})

document.addEventListener('DOMContentLoaded', loadTooltips);

document.addEventListener('mouseup', loadTooltips);

startGame();

