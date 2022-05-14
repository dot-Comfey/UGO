var Pokemon = "074121110120";
const updateHintTime = 5 * 100;
var timer = 0;
var revealedHints = [];
var gameStarted = false;
var allHintsRevealed = false;
var hints = ["060098062067111108111114058060047098062032082101100", "060098062069103103032071114111117112058060047098062032072117109097110045076105107101", "060098062082101103105111110058060047098062032075097110116111", "060098062084121112101058060047098062032073099101047080115121099104105099"];

function startGame() {
    if (gameStarted === false && allHintsRevealed === false) {
        gameStarted = true;
        updateHints();
    }
}

function tick() {
    if (gameStarted) timer++;
    if (timer >= updateHintTime && allHintsRevealed === false) {
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
    revealedHints.push(decrypt(hints[revealedHint]));
    hints.splice(revealedHint, 1);
}

function checkAnswer() {
    if (document.getElementById("guess").value.toLowerCase().split(" ").join("") === decrypt(Pokemon).toLowerCase().split(" ").join("")) {
        gameStarted = false;
        allHintsRevealed = true;
        document.getElementById("gameText").innerHTML = "You are correct! The answer was <i>" + decrypt(Pokemon) + "</i>.";
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