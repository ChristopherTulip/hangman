// global vars
var gameObj = {};
var words = [ 'sailboat', 'tusk', 'lighthouse', 'doghouse', 'artist', 'watering can', "chalk", "bathroom scale" ];
var limbs = [ 'death', 'head', 'left-leg', 'right-leg', 'left-arm', 'right-arm', 'body' ];
var invalid = "1234567890.,/<>!@#$%^&*()-_+=\\][{}`~";

// core functions
function checkInput(letter) {
    if (gameObj.lives === 0) {
        gameObj.error = "Gave Over - hit reset to try again!";
    } else if ( invalid.includes(letter) ) {
        gameObj.error = "Invalid character, please try again!"
    } else if (letter.length === 0 ) {
        gameObj.error = "Hey, you've gotta put a letter in!";
    } else if ( letter.length > 1 ) { 
        gameObj.error = "Only one letter at a time silly!";
    } else if ( gameObj.used.includes( letter ) || gameObj.found.includes( letter ) ) {
        gameObj.error = "Don't use the same letter twice, c'mon!";
    } else {
        return true;
    }

    return false;
}

function gameLogic(letter) {
    
    if ( gameObj.word.includes( letter ) ) {
        for (let i = 0; i < gameObj.word.length; i++) {
            if (gameObj.word[i] == letter) { 
                gameObj.found[i] = letter; 
            }
        }
        
        if ( gameObj.word === gameObj.found.join("") ) { 
            gameObj.notice = 'You win! Click reset to play again';
        } else { 
            gameObj.notice ="You got it right!";
        }
        
        return true;
    } else {
        gameObj.used.push(letter);

        gameObj.notice ="You got it wrong!";
        gameObj.lives -= 1;

        if (gameObj.lives == 0) { 
            gameObj.error.push("You're dead sucker!") 
        }

        return false; 
    }
}

function updateUI(letter, success) {
    document.getElementById("lives").innerHTML = "Lives: " + gameObj.lives;
    document.getElementById("used").innerHTML = gameObj.used.join(" ");
    document.getElementById("found").innerHTML = gameObj.found.join(" ");
    document.getElementById("input").innerHTML = "";

    if (gameObj.error.length != 0) {
        var errorElement  = document.getElementById("error"); 

        errorElement.innerHTML = gameObj.error;
        errorElement.hidden = false;
    } else { 
        document.getElementById("error").hidden = true;
    }
    
    if (gameObj.notice.length != 0) {
        var noticeElement = document.getElementById("notice");

        noticeElement.innerHTML = gameObj.notice;
        noticeElement.hidden = false;
    } else {
        document.getElementById("notice").hidden = true;
    }

    if ( !success ) { 
        document.getElementById(limbs[gameObj.lives]).hidden = false; 
    }
}

function clickListener() {
    var letter = document.getElementById("input").value;
    var success = false; 

    gameObj.error = "";
    gameObj.notice = [];

    if ( checkInput(letter) ) { 
        success = gameLogic(letter); 
    }
    
    updateUI(letter, success);
}

function initialize() {
    gameObj = {
        lives: 7,
        word: words[Math.round(Math.random() * (words.length - 1))],
        found: [],
        used: [],
        error: "", 
        notice: ""
    };

    for (let i = 0; i < gameObj.word.length; i++) {
        if (gameObj.word[i] === " ") {
            gameObj.found.push(" ");
        } else {
            gameObj.found.push("_");
        }
    }

    updateUI("", true);
}

document.getElementById("guess").addEventListener("click", clickListener); 
document.getElementById("reset").addEventListener("click", initialize);

initialize();