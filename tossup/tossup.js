const category = "Pokemon";
var tossup = "086105114105122105111110";
const updateTossupTime = 5 * 100;
var timer = 0;
var revealedLetters = [];
var gameStarted = false;
var revealedLettersCount = 0;
var allLettersRevealed = false;

function startTossup() {
    if (gameStarted === false && allLettersRevealed === false) {
        gameStarted = true;
        for (var i = 0; i < filteredAnswer.length; i++) {
            revealedLetters.push("_");
        }
    }
}

function tick() {
    if (gameStarted) timer++;
    if (timer >= updateTossupTime) {
        updateTossup();
        timer = 0;
        revealedLettersCount++;
    }
    document.getElementById("output").innerHTML = "<b>" + category + ": " + "</b>" + revealedLetters.join(' ');
    if (filteredAnswer.length === revealedLettersCount) {
        allLettersRevealed = true;
    }
}

function updateTossup() {
    const revealedLetter = parseInt(Math.random() * (revealedLetters.length - revealedLettersCount)) + 1;
    var letterIndex = 0;
    for (var i = 0; i < filteredAnswer.length; i++) {
        if (revealedLetters[i] === "_") {
            letterIndex++;
            if (letterIndex === revealedLetter) {
                revealedLetters[i] = filteredAnswer.charAt(i);
                return true;
            }
        }
    }
}

function checkAnswer() {
    if (document.getElementById("guess").value.toLowerCase().split(" ").join("") === tossup.toLowerCase().split(" ").join("")) {
        gameStarted = false;
        allLettersRevealed = true;
        document.getElementById("gameText").innerHTML = "You are correct! The answer was <i>" + tossup + "</i>.";
    } else {
        document.getElementById("gameText").innerHTML = "Incorrect guess!";
    }
    document.getElementById("guess").value = "";
}

setInterval(tick, 10);

document.getElementById("guess")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.code === 'Enter' && gameStarted === true) {
        checkAnswer();
    }
});

function decrypt(encrypt) { //you cheater.
    var newString = "";
    for (var i = 0; i < encrypt.length / 3; i++) {
        const newCharacter = String.fromCharCode(encrypt.charAt(i * 3) + encrypt.charAt(i * 3 + 1) + encrypt.charAt(i * 3 + 2));
        newString = newString.concat(newCharacter);
    }
    return newString;
}

tossup = decrypt(tossup);
const filteredAnswer = tossup.split(" ").join("");