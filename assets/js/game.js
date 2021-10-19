var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// You can also log multiple values at once like this
// console.log(playerName + ": Attack value = " + playerAttack + ".  Player health = " + playerHealth + ".  Player money = " + playerMoney + ".");

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
/*
console.log(enemyNames);
console.log(enemyNames[0]);
console.log(enemyNames[1]);
console.log(enemyNames[2]);
console.log(enemyNames.length);
for(var i = 0; i < enemyNames.length; i++) {
    console.log(enemyNames[i]);
    console.log(i);
    console.log(enemyNames[i] + " is at " + i + " index");
}
*/
var enemyHealth = 10;
var enemyAttack = 12;

var fight = function(enemyName) {
    // repeat and execute as long as the enemy-robot is alive
    while (enemyHealth > 0 && playerHealth > 0) {
        // Alert players that they are starting the round
        // window.alert("Welcome to Robot Gladiators!");

        // Ask players if they want to fight or run
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle?  Enter 'FIGHT' or 'SKIP' to choose.");

        // if player choses to skip, confirm and stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm the player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes (true), leave the fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight.  Goodbye!");
                // subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }
            // if no (false), ask question again by running fight() again
            else {
                fight();
            }
        }
        
        //  if player choses to fight, then fight
            // if (promptFight === "fight" || promptFight === "FIGHT") {
            /*  Subtract the value of 'playerAttack' from the value of 'enemyHealth' 
                and use that result to upldate the value in the 'enemyHealth' variable 
            */
        enemyHealth = enemyHealth - playerAttack;

        // Log a resulting message to the console so we know that it worked.
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );
     
        // Check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
            break;
        }
        else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        /*  Subtract the value of `enemyAttack` from the value of `playerHealth` 
            and use that result to update the value in the `playerHealth` variable.
        */
        playerHealth = playerHealth - enemyAttack;
    

        // Log a resulting message to the consule so we know that it worked.
        console.log(
            enemyName + " attacked " + playerName +". " + playerName + " now has " + playerHealth + " health remaining."
        );

        // Check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            break;
        }
        else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }

    }
        
        
        // what happens if neigher fight or skip is picked
        // else {
            // window.alert("You need to chose a valid option.  Try again!");
        // }
};
    

var startGame = function() {
    // reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for(var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            // let player know what round they are in, remember that arrays start at 0 so it needs to have a 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1) );

            // pick new enemey to fight based on the index of the enemyNames arra
            var pickedEnemyName = enemyNames[i];

            // reset enemyHealth before starting new fight
            enemyHealth = 50;

            // use debugger to pause script from running and check what's going on at that moment in the code
            debugger;
        
            // pass the picked pickedEnemyName variable's value into the fight function, where it will assume to value of the enemyName paramter
            fight(pickedEnemyName);

            // if we're not at the last enemy in the array
            if (i < enemyNames.length -1 && playerHealth > 0) {
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
    if (playerHealth > 0) {
        window.alert ("Great job, you've survived the game!  You now have a score of " + playerMoney + ".");
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
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the shop?  Please enter one:  'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");

    // use switch to carry out action
    switch (shopOptionPrompt) {
        case "refill":
        case "REFILL":
            if (playerMoney >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
                
                // increase health and decreaes money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money!");
            }
            
            break;
        
        case "upgrade":
        case "UPGRADE":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");

                // increaes attack and decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money!");
            }

            break;
        
        case "leave":
        case "LEAVE":
            window.alert("Leaving the store.");
            
            // do nothing, so function will end
            break;
        default:
            window.alert("You did not pick a valid option.  Try again.");

            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
};

startGame();