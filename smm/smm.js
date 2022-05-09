var move = "065099105100032083112114097121";
const updateHintTime = 5 * 100;
var timer = 0;
var revealedHints = [];
var gameStarted = false;
var allHintsRevealed = false;
var hints = ["060098062065099099117114097099121058060047098062032049048048037", "060098062066097115101032080111119101114058060047098062032052048", "060098062067097116101103111114121058060047098062032083112101099105097108", "060098062068101115099114105112116105111110058060047098062032049048048037032099104097110099101032116111032108111119101114032116104101032116097114103101116039115032083112046032068101102032098121032050046", "060098062080080058060047098062032052048", "060098062084121112101058060047098062032080111105115111110"];

function startGame() {
    if (gameStarted === false && allHintsRevealed === false) {
        gameStarted = true;
        updateHints();
    }
}

function tick() {
    if (gameStarted) timer++;
    if (timer >= updateHintTime) {
        updateHints();
        timer = 0;
    }
    document.getElementById("output").innerHTML = revealedHints.join('<br>');
    if (hints.length === 0) {
        allHintsRevealed = true;
    }
}

function updateHints() {
    var revealedHint = parseInt(Math.random() * (hints.length));
    if (hints.length === 1) {
        revealedHint = 0;
    }
    revealedHints.push(hints[revealedHint]);
    hints.splice(revealedHint, 1);
}

function checkAnswer() {
    if (document.getElementById("guess").value.toLowerCase().split(" ").join("") === move.toLowerCase().split(" ").join("")) {
        gameStarted = false;
        allHintsRevealed = true;
        document.getElementById("gameText").innerHTML = "You are correct! The answer was <i>" + move + "</i>.";
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

move = decrypt(move);
for (var i = 0; i < hints.length; i++) {
    hints[i] = decrypt(hints[i]);
}