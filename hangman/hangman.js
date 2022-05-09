const category = "Location";
var hangman = "077111117110116032072111107117108097110105";
var revealedLetters = [];
var allLetters = [];
var gameStarted = false;
var revealedLettersCount = 0;
var allLettersRevealed = false;
var incorrectGuesses = [];
var allGuesses = [];

function startHangman() {
    if (gameStarted === false && allLettersRevealed === false) {
        gameStarted = true;
        for (var i = 0; i < filteredAnswer.length; i++) {
            revealedLetters.push("_");
        }
        for (var i = 0; i < hangman.length; i++) {
            if (hangman.charAt(i) != " ") {
                allLetters.push("_");
            } else {
                allLetters.push("&nbsp;");
            }
        }
        document.getElementById("output").innerHTML = "<b>" + category + ": " + "</b>" + allLetters.join(' ');
    }
}

function tick() {
    if (gameStarted) timer++;
    if (timer >= updateTossupTime) {
        updateTossup();
        timer = 0;
        revealedLettersCount++;
    }
    if (tossup.length === revealedLettersCount) {
        gameStarted = false;
        allLettersRevealed = true;
    }
}

function updateHangman(attemptedGuess) {
    if (attemptedGuess.length === 1) {
        var lettersRevealed = false;
        for (var i = 0; i < filteredAnswer.length; i++) {
            if (attemptedGuess.toLowerCase() === filteredAnswer.charAt(i).toLowerCase()) {
                revealedLetters[i] = filteredAnswer.charAt(i);
                revealedLettersCount++;
                lettersRevealed = true;
            }
        }
        if (lettersRevealed === false) {
            incorrectGuesses.push(attemptedGuess);
        }
        if (revealedLettersCount === filteredAnswer.length) {
            gameStarted = false;
            allLettersRevealed = true;
            document.getElementById("gameText").innerHTML = "You are correct! The answer was <i>" + hangman + "</i>.";
            return true;
        }
    } else {
        if (attemptedGuess.toLowerCase().split(" ").join("") === filteredAnswer.toLowerCase().split(" ").join("")) {
            gameStarted = false;
            allLettersRevealed = true;
            document.getElementById("gameText").innerHTML = "You are correct! The answer was <i>" + hangman + "</i>.";
            return true;
        } else {
            incorrectGuesses.push(attemptedGuess);
        }
    }
    updateVisual();
    document.getElementById("gameText").innerHTML = "Your guess \"" + attemptedGuess + "\" was successfully submitted.";
    document.getElementById("output").innerHTML = "<b>" + category + ": " + "</b>" + allLetters.join(' ');
    document.getElementById("gameStatus").innerHTML = "Incorrect guesses: " + incorrectGuesses.join(', ');
}

function updateVisual() {
    var visualIndex = 0;
    for (var i = 0; i < hangman.length; i++) {
        if (hangman.charAt(i) != " ") {
            allLetters[i] = revealedLetters[visualIndex];
            visualIndex++;
        }
    }
}

function checkAnswer() {
    const attempt = document.getElementById("guess").value.toLowerCase().split(" ").join("");
    if (attempt.length === 1) {
        if (attempt.toLowerCase().charCodeAt(0) < 97 || attempt.toLowerCase().charCodeAt(0) > 122) {
            document.getElementById("gameText").innerHTML = "Invalid character!";
            document.getElementById("guess").value = "";
            return false;
        }
    } else {
        if (attempt.length != filteredAnswer.length) {
            document.getElementById("gameText").innerHTML = "Invalid guess!";
            document.getElementById("guess").value = "";
            return false;
        }
    }
    for (var i = 0; i < allGuesses.length; i++) {
        if (attempt === allGuesses[i]) {
            document.getElementById("gameText").innerHTML = "You have already guessed \"" + attempt + "\".";
            document.getElementById("guess").value = "";
            return false;
        }
    }
    updateHangman(attempt);
    document.getElementById("guess").value = "";
}

function init () {
    document.getElementById("gameText").innerHTML = "Guess letters to fill in the blanks and reveal the answer!";
    document.getElementById("output").innerHTML = "<b>" + category + ": " + "</b>";
    document.getElementById("gameStatus").innerHTML = "Incorrect guesses: ";
}

init();

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

hangman = decrypt(hangman);
const filteredAnswer = hangman.split(" ").join("");