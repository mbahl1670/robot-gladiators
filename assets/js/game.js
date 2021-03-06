
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
        var confirmSkip = window.confirm("Are you sure you'd like to quit?  You will lose $10 or all remaining money you have.");

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

var playerTurn = function() {
    // debugger;
    var turn = true;
    if (Math.random() > 0.5) {
        turn = false;
    }
    return turn;
};

var fight = function(enemy) {
    // debugger;
    // var isPlayerTurn = true;

    // if (Math.random() > 0.5 ) {
        // isPlayerTurn = false;
    // }
    
    // repeat and execute as long as the enemy-robot is alive
    while (enemy.health > 0 && playerInfo.health > 0) {
        // debugger;
        var isPlayerTurn = playerTurn();
        
        console.log(playerInfo);
        console.log(enemy);

        if (fightOrSkip()) {
            break;
        
        }
        
        if (isPlayerTurn) {
            
            var damage = randomNumber(playerInfo.attack -3, playerInfo.attack);
                    
            enemy.health = Math.max(0, enemy.health - damage);

            // Log a resulting message to the console so we know that it worked.
            console.log(
                playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
            );
        
            // Check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!  You earn $20!");
                playerInfo.money = playerInfo.money + 20;
                break;
            }
            else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
            
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
                
            playerInfo.health = Math.max(0, playerInfo.health - damage);
        

            // Log a resulting message to the consule so we know that it worked.
            console.log(
                enemy.name + " attacked " + playerInfo.name +". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );

            // Check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                break;
            }
            else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }

        }    
        else {    
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
                
            playerInfo.health = Math.max(0, playerInfo.health - damage);
        

            // Log a resulting message to the consule so we know that it worked.
            console.log(
                enemy.name + " attacked " + playerInfo.name +". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );

            // Check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                break;
            }
            else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
            
            var damage = randomNumber(playerInfo.attack -3, playerInfo.attack);
                    
            enemy.health = Math.max(0, enemy.health - damage);

            // Log a resulting message to the console so we know that it worked.
            console.log(
                playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
            );
        
            // Check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!  You earn $20!");
                playerInfo.money = playerInfo.money + 20;
            }
            else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }

        }
    }
};
        
        
        // what happens if neigher fight or skip is picked
        // else {
            // window.alert("You need to chose a valid option.  Try again!");
        // }
    

var startGame = function() {
    // reset player stats
    playerInfo.reset();
    // debugger;
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
    // debugger;
    window.alert("The game has now ended.  Let's see how you did!");

    // check localStorage for high score, if its not there, use 0
    var highScore = localStorage.getItem("highscore");
        
    if (highScore === null) {
        highScore = 0;
    }
    // if layer has more money than the high score, player has new high score
    if (playerInfo.money > highScore && playerInfo.health > 0) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);
        alert(playerInfo + "now has the high score of " + playerInfo.money + "!");
    }
    else if (playerInfo.money <= highScore && playerInfo.health >0) {
        alert(playerInfo.name + " scored " + playerInfo.money + " and did not beat the high score of " + highScore + ".  Maybe next time!");
    }
    else {
        alert(playerInfo.name + " died :(.  Maybe next time!"); 
    }
        
    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm) {
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators!  Come back soon!");
    }
};

var shop = function() {
    // tell the player they have entered the shop
    console.log("You have entered the shop.  You have " + playerInfo.money + " dollars.");

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