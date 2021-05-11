import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  
  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over
    // resolve(response); -- DONE
    let fighterHealth1 = firstFighter.health;
    let fighterHealth2 = secondFighter.health;
    let fighter1BlockBool = false;
    let fighter2BlockBool = false;
    let critcomboFighter1 = new Map();
    let critcomboFighter2 = new Map();
    let firstFighterCritExecution = 0;
    let firstFighterCritCooldown = 10000;
    let secondFighterCritExecution = 0;
    let secondFighterCritCooldown = 10000;

    // console.log(`${console.clear()}`);

    // player 1 attack
    window.addEventListener('keydown', (event) => {
      let name = event.key;
      if (name === controls.PlayerOneAttack.toLowerCase().substring(3,4)) {
        if (fighter1BlockBool){
        }else{
          let damageToPlayer2 = getDamage(firstFighter, secondFighter, fighter2BlockBool);
          let healthBar2 = document.getElementsByClassName("arena___health-bar")[1];
          fighterHealth2 = fighterHealth2 - damageToPlayer2;
          console.log(fighterHealth2)
          healthBar2.style.width = fighterHealth2 > 1 ? ((fighterHealth2*100)/secondFighter.health) + "%" : "0.01%";
          //console.log(healthBar2.style.width);
          if (Math.sign(fighterHealth2) != 1) {
            resolve(firstFighter);
          }
        }
      }
    }, false);

    // player 2 attack
    window.addEventListener('keydown', (event) => {
      let name = event.key;
      if (name === controls.PlayerTwoAttack.toLowerCase().substring(3,4)) {
        if (fighter2BlockBool){
        }else{
          let damageToPlayer1 = getDamage(secondFighter, firstFighter, fighter1BlockBool);
          let healthBar1 = document.getElementsByClassName("arena___health-bar")[0];
          fighterHealth1 = fighterHealth1 - damageToPlayer1;
          console.log(fighterHealth1)
          healthBar1.style.width = fighterHealth1 > 1 ? ((fighterHealth1*100)/firstFighter.health) + "%" : "0.01%";
          if (Math.sign(fighterHealth1) != 1) {
            resolve(secondFighter);
          }
        }
      }
    }, false);

    // player 1 block
    window.addEventListener('keydown', (event) => {
      let name = event.key;
      if (name === controls.PlayerOneBlock.toLowerCase().substring(3,4)) {
        fighter1BlockBool = true;
        console.log("does fighter 1 block? " + fighter1BlockBool);
      }
    }, false);

    window.addEventListener('keyup', (event) => {
      let name = event.key;
      if (name === controls.PlayerOneBlock.toLowerCase().substring(3,4)) {
        fighter1BlockBool = false;
        console.log("does fighter 1 block? " + fighter1BlockBool);
      }
    }, false);

    // player 2 block
    window.addEventListener('keydown', (event) => {
      let name = event.key;
      if (name === controls.PlayerTwoBlock.toLowerCase().substring(3,4)) {
        fighter2BlockBool = true;
        console.log("does fighter 2 block? " + fighter2BlockBool);
      }
    }, false);

    window.addEventListener('keyup', (event) => {
      let name = event.key;
      if (name === controls.PlayerTwoBlock.toLowerCase().substring(3,4)) {
        fighter2BlockBool = false;
        console.log("does fighter 2 block? " + fighter2BlockBool);
      }
    }, false);

    // player 1 crit combo 
    window.addEventListener('keydown', (event) => {
      let keyNameOne = event.key;
      if (keyNameOne === controls.PlayerOneCriticalHitCombination[0].toLowerCase().substring(3,4)) {
        critcomboFighter1.set(keyNameOne, true);
        console.log(critcomboFighter1);
      }
    }, false);

    window.addEventListener('keyup', (event) => {
      let keyNameOne = event.key;
      if (keyNameOne === controls.PlayerOneCriticalHitCombination[0].toLowerCase().substring(3,4)) {
        critcomboFighter1.delete(keyNameOne);
      }
    }, false);

    window.addEventListener('keydown', (event) => {
      let keyNameTwo = event.key;
      if (keyNameTwo === controls.PlayerOneCriticalHitCombination[1].toLowerCase().substring(3,4)) {
        critcomboFighter1.set(keyNameTwo, true);
        console.log(critcomboFighter1);
      }
    }, false);

    window.addEventListener('keyup', (event) => {
      let keyNameTwo = event.key;
      if (keyNameTwo === controls.PlayerOneCriticalHitCombination[1].toLowerCase().substring(3,4)) {
        critcomboFighter1.delete(keyNameTwo);
      }
    }, false);

    window.addEventListener('keydown', (event) => {
      let keyNameThree = event.key;
      if (keyNameThree === controls.PlayerOneCriticalHitCombination[2].toLowerCase().substring(3,4)) {
        critcomboFighter1.set(keyNameThree, true);
        console.log(critcomboFighter1);
      }
    }, false);

    window.addEventListener('keyup', (event) => {
      let keyNameThree = event.key;
      if (keyNameThree === controls.PlayerOneCriticalHitCombination[2].toLowerCase().substring(3,4)) {
        critcomboFighter1.delete(keyNameThree);
      }
    }, false);

    // prob can try rewrite the huge condition (it's made to cover all possible combinations of three crit keys)
    window.addEventListener('keydown', (event) => {
      let name = event.key;
      if ((critcomboFighter1.has(controls.PlayerOneCriticalHitCombination[0].toLowerCase().substring(3,4)) && critcomboFighter1.has(controls.PlayerOneCriticalHitCombination[1].toLowerCase().substring(3,4)) && name === controls.PlayerOneCriticalHitCombination[2].toLowerCase().substring(3,4)) || (critcomboFighter1.has(controls.PlayerOneCriticalHitCombination[0].toLowerCase().substring(3,4)) && critcomboFighter1.has(controls.PlayerOneCriticalHitCombination[2].toLowerCase().substring(3,4)) && name === controls.PlayerOneCriticalHitCombination[1].toLowerCase().substring(3,4)) || (critcomboFighter1.has(controls.PlayerOneCriticalHitCombination[1].toLowerCase().substring(3,4)) && critcomboFighter1.has(controls.PlayerOneCriticalHitCombination[2].toLowerCase().substring(3,4)) && name === controls.PlayerOneCriticalHitCombination[0].toLowerCase().substring(3,4))) {
        let date = new Date();
        let currentTime = date.getTime();
        if (currentTime - firstFighterCritExecution > firstFighterCritCooldown){
          firstFighterCritExecution = currentTime;
          let damageToPlayer2 = 2 * firstFighter.attack;
          let healthBar2 = document.getElementsByClassName("arena___health-bar")[1];
          fighterHealth2 = fighterHealth2 - damageToPlayer2;
          console.log(fighterHealth2)
          healthBar2.style.width = fighterHealth2 > 1 ? ((fighterHealth2*100)/secondFighter.health) + "%" : "0.01%";
          if (Math.sign(fighterHealth2) != 1) {
            resolve(firstFighter);
          }
        }else{
          console.log("Cooldown active");
        }
        }
    }, false);


    // player 2 crit combo 
    window.addEventListener('keydown', (event) => {
      let keyNameOne = event.key;
      if (keyNameOne === controls.PlayerTwoCriticalHitCombination[0].toLowerCase().substring(3,4)) {
        critcomboFighter2.set(keyNameOne, true);
        console.log(critcomboFighter2);
      }
    }, false);

    window.addEventListener('keyup', (event) => {
      let keyNameOne = event.key;
      if (keyNameOne === controls.PlayerTwoCriticalHitCombination[0].toLowerCase().substring(3,4)) {
        critcomboFighter2.delete(keyNameOne);
      }
    }, false);

    window.addEventListener('keydown', (event) => {
      let keyNameOne = event.key;
      if (keyNameOne === controls.PlayerTwoCriticalHitCombination[1].toLowerCase().substring(3,4)) {
        critcomboFighter2.set(keyNameOne, true);
        console.log(critcomboFighter2);
      }
    }, false);

    window.addEventListener('keyup', (event) => {
      let keyNameOne = event.key;
      if (keyNameOne === controls.PlayerTwoCriticalHitCombination[1].toLowerCase().substring(3,4)) {
        critcomboFighter2.delete(keyNameOne);
      }
    }, false);

    window.addEventListener('keydown', (event) => {
      let keyNameOne = event.key;
      if (keyNameOne === controls.PlayerTwoCriticalHitCombination[2].toLowerCase().substring(3,4)) {
        critcomboFighter2.set(keyNameOne, true);
        console.log(critcomboFighter2);
      }
    }, false);

    window.addEventListener('keyup', (event) => {
      let keyNameOne = event.key;
      if (keyNameOne === controls.PlayerTwoCriticalHitCombination[2].toLowerCase().substring(3,4)) {
        critcomboFighter2.delete(keyNameOne);
      }
    }, false);

    window.addEventListener('keydown', (event) => {
      let name = event.key;
      if ((critcomboFighter2.has(controls.PlayerTwoCriticalHitCombination[0].toLowerCase().substring(3,4)) && critcomboFighter2.has(controls.PlayerTwoCriticalHitCombination[1].toLowerCase().substring(3,4)) && name === controls.PlayerTwoCriticalHitCombination[2].toLowerCase().substring(3,4)) || (critcomboFighter2.has(controls.PlayerTwoCriticalHitCombination[0].toLowerCase().substring(3,4)) && critcomboFighter2.has(controls.PlayerTwoCriticalHitCombination[2].toLowerCase().substring(3,4)) && name === controls.PlayerTwoCriticalHitCombination[1].toLowerCase().substring(3,4)) || (critcomboFighter2.has(controls.PlayerTwoCriticalHitCombination[1].toLowerCase().substring(3,4)) && critcomboFighter2.has(controls.PlayerTwoCriticalHitCombination[2].toLowerCase().substring(3,4)) && name === controls.PlayerTwoCriticalHitCombination[0].toLowerCase().substring(3,4))) {
        let date = new Date();
        let currentTime = date.getTime();
        if (currentTime - secondFighterCritExecution > secondFighterCritCooldown){
          secondFighterCritExecution = currentTime;
          let damageToPlayer1 = 2 * secondFighter.attack;
          let healthBar1 = document.getElementsByClassName("arena___health-bar")[0];
          fighterHealth1 = fighterHealth1 - damageToPlayer1;
          console.log(fighterHealth1)
          healthBar1.style.width = fighterHealth1 > 1 ? ((fighterHealth1*100)/firstFighter.health) + "%" : "0.01%";
          if (Math.sign(fighterHealth1) != 1) {
            resolve(secondFighter);
          }
        }else{
          console.log("Cooldown active");
        }
        }
    }, false);
  });
}

export function getDamage(attacker, defender, defenderBlockBool) {
  // return damage -- DONE
  let damageValue;
  if (defenderBlockBool){
    damageValue = 0;
  } else {
    damageValue = getHitPower(attacker) - getBlockPower(defender);
  }
  console.log(damageValue);
  return damageValue > 0 ? damageValue : 0;
}

export function getHitPower(fighter) {
  // return hit power -- DONE
  let criticalhitChance = Math.random() + 1;
  //console.log(criticalhitChance);
  return fighter.attack * criticalhitChance;
}

export function getBlockPower(fighter) {
  // return block power -- DONE
  let dodgeChance = Math.random() + 1;
  //console.log(dodgeChance);
  return fighter.defense * dodgeChance;
}
