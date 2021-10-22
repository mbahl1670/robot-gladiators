
var fightOrSkip = function() {
    // ask player if they'd like to fight or skip using fightOrSkip function
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle?  Enter "FIGHT" or "SKIP" to choose.');
    
    // Conditonal Recursive Function Call
    if (!promptFight) {
        window.alert("You need to provide a valid answer!  Please try again.");
        return fightOrSkip();
    }
    
    promptFight = promptFight.toLowerCase();
    
    // if player picks 'skip' confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "s") {
        //confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // subtract money from playerMoney for skipping, but don't let them go into the negative
            playerInfo.money = Math.max(0, playerInfo.money - 10);
      
            // return true if player wants to leave
            return true;
          }
    }

    else if (promptFight === "fight" || promptFight === "f") {
        return false;
    }

    else {
        window.alert("You need to provide a valid answer!  Please try again.");
        return fightOrSkip();
    }
}

ar fight = function(enemy) {
    // keep track of who goes first
    var isPlayerTurn = true;
  
    // randomly change turn order
    if (Math.random() > 0.5) {
      isPlayerTurn = false;
    }
  
    while (playerInfo.health > 0 && enemy.health > 0) {
      if (isPlayerTurn) {
        // ask player if they'd like to fight or skip using fightOrSkip function
        if (fightOrSkip()) {
          // if true, leave fight by breaking loop
          break;
        }
  
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
  
        // remove enemy's health by subtracting the amount we set in the damage variable
        enemy.health = Math.max(0, enemy.health - damage);
        console.log(
          playerInfo.name +
            " attacked " +
            enemy.name +
            ". " +
            enemy.name +
            " now has " +
            enemy.health +
            " health remaining."
        );
  
        // check enemy's health
        if (enemy.health <= 0) {
          window.alert(enemy.name + " has died!");
  
          // award player money for winning
          playerInfo.money = playerInfo.money + 20;
  
          // leave while() loop since enemy is dead
          break;
        } else {
          window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }
        // player gets attacked first
      } else {
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
  
        // remove player's health by subtracting the amount we set in the damage variable
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log(
          enemy.name +
            " attacked " +
            playerInfo.name +
            ". " +
            playerInfo.name +
            " now has " +
            playerInfo.health +
            " health remaining."
        );
  
        // check player's health
        if (playerInfo.health <= 0) {
          window.alert(playerInfo.name + " has died!");
          // leave while() loop if player is dead
          break;
        } else {
          window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
      }
      // switch turn order for next round
      isPlayerTurn = !isPlayerTurn;
    }
  };
        
        
        // what happens if neigher fight or skip is picked
        // else {
            // window.alert("You need to chose a valid option.  Try again!");
        // }
};
    

var startGame = function() {
    // reset player stats
    playerInfo.reset();

    for(var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            // let player know what round they are in, remember that arrays start at 0 so it needs to have a 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1) );
            // debugger;

            // pick new enemey to fight based on the index of the enemyNames arra
            var pickedEnemyObj = enemyInfo[i];
            // debugger;
            // reset enemy.health before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);

            // use debugger to pause script from running and check what's going on at that moment in the code
            // debugger;
        
            // pass the picked pickedEnemyName variable's value into the fight function, where it will assume to value of the enemy.name paramter
            fight(pickedEnemyObj);

            // if we're not at the last enemy in the array
            if (i < enemyInfo.length -1 && playerInfo.health > 0) {
                // ask if player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                // if yes, take them to the store() function
                if (storeConfirm) {
                    shop();
                }
            }
        }
        else {
            window.alert("You have lost your robot in battle!  Game Over!");
            break;
        }
    }
    endGame();

    // play again
    // startGame();
};

// function to end the entire game
var endGame = function() {
    // if layer is still alive, player wins!
    if (playerInfo.health > 0) {
        window.alert ("Great job, you've survived the game!  You now have a score of " + playerInfo.money + ".");
    }
    else {
        window.alert("You've lost your robot in battle. ☹️")
    }
    
    // window.alert("The game has now ended.  Let's see how you did!"); old code from learning

    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        // restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators!  Come back soon!");
    }
}

var shop = function() {
    // tell the player they have entered the shop
    console.log("You have entered the shop");

    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE.");
    shopOptionPrompt = parseInt(shopOptionPrompt);

    // use switch to carry out action
    switch (shopOptionPrompt) {
        case 1:
                   playerInfo.refillHealth();
            break;
        
        case 2:
            playerInfo.upgradeAttack();
            break;
        
        case 3:
            window.alert("Leaving the store.");
            
            // do nothing, so function will end
            break;
        default:
            window.alert("You did not pick a valid option (1, 2, or 3).  Try again.");

            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
};

var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
}

// function to set name
var getPlayerName = function() {
    var name = "";

    while (name === "" || name === null) {
        name = window.prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name );
    return name;
}

var playerInfo = {
    name:  getPlayerName(),
    health:  100,
    attack:  10,
    money:  10,
    reset:  function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7 ) {
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};

// You can also log multiple values at once like this
// console.log(playerInfo.name + ": Attack value = " + playerInfo.attack + ".  Player health = " + playerInfo.health + ".  Player money = " + playerInfo.money + ".");

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack:  randomNumber(10, 14)
    },
    {
        name:  "Robo Trumble",
        attack:  randomNumber(10, 14)
    }
];

startGame();