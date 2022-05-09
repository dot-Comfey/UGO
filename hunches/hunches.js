const category = "Ability";
var hunch = "077097103105099032071117097114100";
var revealedLetters = [];
var gameStarted = false;
var revealedLettersCount = 0;
var allLettersRevealed = false;
var incorrectGuesses = [];
var allGuesses = [];

function startHunch() {
    if (gameStarted === false && allLettersRevealed === false) {
        gameStarted = true;
        for (var i = 0; i < filteredAnswer.length; i++) {
            revealedLetters.push("");
        }
        document.getElementById("gameText").innerHTML = "You have started the game.";
        document.getElementById("output").innerHTML = "<b>" + category + ": " + "</b>" + revealedLetters.join('');
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

function updateHunch(attemptedGuess) {
    if (attemptedGuess.length === 1) {
        var lettersRevealed = false;
        for (var i = 0; i < filteredAnswer.length; i++) {
            if (attemptedGuess.toLowerCase() === filteredAnswer.charAt(i).toLowerCase()) {
                revealedLetters[i] = filteredAnswer.charAt(i).toLowerCase();
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
            document.getElementById("gameText").innerHTML = "You are correct! The answer was <i>" + hunch + "</i>.";
            return true;
        }
    } else {
        if (attemptedGuess.toLowerCase().split(" ").join("") === filteredAnswer.toLowerCase().split(" ").join("")) {
            gameStarted = false;
            allLettersRevealed = true;
            document.getElementById("gameText").innerHTML = "You are correct! The answer was <i>" + hunch + "</i>.";
            return true;
        } else {
            incorrectGuesses.push(attemptedGuess);
        }
    }
    document.getElementById("gameText").innerHTML = "Your guess \"" + attemptedGuess + "\" was successfully submitted.";
    document.getElementById("output").innerHTML = "<b>" + category + ": " + "</b>" + revealedLetters.join('');
    document.getElementById("gameStatus").innerHTML = "Incorrect guesses: " + incorrectGuesses.join(', ');
    allGuesses.push(attemptedGuess);
}

function checkAnswer() {
    const attempt = document.getElementById("guess").value.toLowerCase();
    if (attempt.length === 1) {
        if (attempt.toLowerCase().charCodeAt(0) < 97 || attempt.toLowerCase().charCodeAt(0) > 122) {
            document.getElementById("gameText").innerHTML = "Invalid character!";
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
    updateHunch(attempt);
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

hunch = decrypt(hunch);
const filteredAnswer = hunch.split(" ").join("");