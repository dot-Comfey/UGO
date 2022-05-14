const category = "Move";
var order = "082111099107032084104114111119";
const updateOrderTime = 5 * 100;
var timer = 0;
var revealedLetters = [];
var gameStarted = false;
var revealedLettersCount = 0;
var allLettersRevealed = false;

function startOrder() {
    if (gameStarted === false && allLettersRevealed === false) {
        gameStarted = true;
        for (var i = 0; i < decrypt(order).split(" ").join("").length; i++) {
            revealedLetters.push("");
        }
        updateOrder();
    }
}

function tick() {
    if (gameStarted) timer++;
    if (timer >= updateOrderTime) {
        revealedLettersCount++;
        updateOrder();
        timer = 0;
    }
    document.getElementById("output").innerHTML = "<b>" + category + ": " + "</b>" + revealedLetters.join('');
    if (decrypt(order).split(" ").join("").length === revealedLettersCount) {
        allLettersRevealed = true;
    }
}

function updateOrder() {
    const revealedLetter = parseInt(Math.random() * (revealedLetters.length - revealedLettersCount)) + 1;
    var letterIndex = 0;
    for (var i = 0; i < decrypt(order).split(" ").join("").length; i++) {
        if (revealedLetters[i] === "") {
            letterIndex++;
            if (letterIndex === revealedLetter) {
                revealedLetters[i] = decrypt(order).split(" ").join("").charAt(i).toLowerCase();
                return true;
            }
        }
    }
}

function checkAnswer() {
    if (document.getElementById("guess").value.toLowerCase().split(" ").join("") === decrypt(order).toLowerCase().split(" ").join("")) {
        gameStarted = false;
        allLettersRevealed = true;
        document.getElementById("gameText").innerHTML = "You are correct! The answer was <i>" + decrypt(order) + "</i>.";
    } else {
        document.getElementById("gameText").innerHTML = "Incorrect guess!";
    }
    document.getElementById("guess").value = "";
}

setInterval(tick, 10);

document.getElementById("guess")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13 && gameStarted === true) {
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