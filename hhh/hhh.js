const canvas = document.getElementById("hhh");
const ctx = canvas.getContext("2d");
var map = [
    [" ", " ", " ", "W", " ", " ", " ", " ", "W", " ", " ", " ", " "],
    [" ", " ", " ", "W", " ", " ", "W", " ", "W", " ", " ", " ", " "],
    [" ", "W", " ", "W", " ", " ", "W", " ", "W", " ", " ", " ", " "],
    [" ", " ", " ", "W", " ", " ", "W", " ", "W", " ", " ", " ", " "],
    [" ", " ", " ", "W", " ", " ", "W", " ", "W", "W", " ", "W", " "],
    ["W", "W", " ", "W", " ", " ", "W", " ", " ", " ", " ", "W", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", " "],
    [" ", " ", " ", "W", "W", "W", "W", "W", "W", "W", "W", "W", " "],
    [" ", " ", " ", "W", " ", " ", " ", " ", " ", "W", " ", " ", " "],
    [" ", "W", "W", "W", " ", "W", " ", "W", " ", "W", " ", " ", " "],
    [" ", "W", " ", " ", " ", "W", " ", "W", " ", "W", " ", " ", " "],
    [" ", "W", " ", " ", " ", "W", " ", "W", " ", "W", " ", " ", " "],
    [" ", " ", " ", " ", " ", "W", " ", " ", " ", "W", " ", " ", " "]
];
var ghosts = [
    { // Door 3 ghosts
        type: "Mimikyu",
        X: 4,
        Y: 2,
        turnMoves: 2
    },
    {
        type: "Gengar",
        X: 7,
        Y: 2,
        turnMoves: 2
    },
    {
        type: "Haunter",
        X: 5,
        Y: 0,
        turnMoves: 1
    },
    { // Door 0 ghost
        type: "Dusclops",
        X: 5,
        Y: 8,
        turnMoves: 1
    },
    { // Door 1 ghost
        type: "Gengar",
        X: 2,
        Y: 11,
        turnMoves: 2
    },
    { // Door 2 ghosts
        type: "Haunter",
        X: 1,
        Y: 7,
        turnMoves: 1
    },
    {
        type: "Haunter",
        X: 2,
        Y: 7,
        turnMoves: 1
    },
    {
        type: "Haunter",
        X: 2,
        Y: 3,
        turnMoves: 1
    },
    { // Door 4 ghost
        type: "Dusclops",
        X: 12,
        Y: 3,
        turnMoves: 1
    },
    { // Door 5 ghosts
        type: "Haunter",
        X: 12,
        Y: 8,
        turnMoves: 1
    },
    {
        type: "Haunter",
        X: 10,
        Y: 8,
        turnMoves: 1
    },
    {
        type: "Haunter",
        X: 11,
        Y: 9,
        turnMoves: 1
    },
    {
        type: "Haunter",
        X: 10,
        Y: 10,
        turnMoves: 1
    },
    {
        type: "Haunter",
        X: 11,
        Y: 11,
        turnMoves: 1
    },
    {
        type: "Haunter",
        X: 12,
        Y: 10,
        turnMoves: 1
    },
    {
        type: "Haunter",
        X: 10,
        Y: 12,
        turnMoves: 1
    },
    {
        type: "Haunter",
        X: 12,
        Y: 12,
        turnMoves: 1
    },
    {
        type: "Haunter",
        X: 11,
        Y: 10,
        turnMoves: 1
    },
];
var buttons = [
    {
        name: "1",
        buttonX: 4,
        buttonY: 8,
        doorX: 4,
        doorY: 9,
        opened: false
    },
    {
        name: "2",
        buttonX: 2,
        buttonY: 12,
        doorX: 0,
        doorY: 11,
        opened: false
    },
    {
        name: "3",
        buttonX: 0,
        buttonY: 6,
        doorX: 3,
        doorY: 6,
        opened: false
    },
    {
        name: "4",
        buttonX: 0,
        buttonY: 1,
        doorX: 2,
        doorY: 2,
        opened: false
    },
    {
        name: "5",
        buttonX: 10,
        buttonY: 5,
        doorX: 10,
        doorY: 4,
        opened: false
    },
    {
        name: "6",
        buttonX: 12,
        buttonY: 6,
        doorX: 12,
        doorY: 7,
        opened: false
    },
];
var candy = [
    {
        X: 6,
        Y: 9,
        obtained: false
    },
    {
        X: 2,
        Y: 0,
        obtained: false
    },
    {
        X: 10,
        Y: 8,
        obtained: false
    },
];
var playerX = 6;
var playerY = 12;
const moveDirections = [[0, 1], [0, -1], [1, 0], [-1, 0]];
var haunted = false;
var movesLeft = 3;
var extraGhostMoves = 0;
var ghostDisplay = [];
var candiesObtained = 0;
var allCandiesObtained = false;

function generateMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    displayGhosts();
    createMap();
    drawGrid();
    initialRound = false;
}

function checkButtons() {
    for (var i = 0; i < buttons.length; i++) {
        if (playerX === buttons[i].buttonX && playerY === buttons[i].buttonY) {
            buttons[i].opened = true;
        } else {
            buttons[i].opened = false;
        }
    }
}

function drawGrid() {
    ctx.lineWidth = 5;
    for (var i = 0; i < canvas.width / 100 - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * 100 + 100);
        ctx.lineTo(1300, i * 100 + 100);
        ctx.stroke();
    }
    for (var i = 0; i < canvas.width / 100 - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 100 + 100, 0);
        ctx.lineTo(i * 100 + 100, 1300);
        ctx.stroke();
    }
}

function displayGhosts() {
    ghostDisplay = [];
    for (var i = 0; i < ghosts.length; i++) {
        var multipleGhosts = null;
        for (var j = 0; j < ghostDisplay.length; j++) {
            if (ghosts[i].X === ghostDisplay[j].X && ghosts[i].Y === ghostDisplay[j].Y) {
                multipleGhosts = j;
            }
        }
        if (multipleGhosts === null) {
            ghostDisplay.push({
                X: ghosts[i].X, 
                Y: ghosts[i].Y, 
                display: ghosts[i].type.charAt(0).toString()
            });
        } else {
            ghostDisplay[multipleGhosts].display = ghostDisplay[multipleGhosts].display + ghosts[i].type.charAt(0).toString();
        }
    }
}

function createMap() {
    for (var x = 0; x < canvas.width / 100; x++) {
        for (var y = 0; y < canvas.width / 100; y++) {
            ctx.fillStyle = 'white';
            if (map[y][x] === "W") {
                ctx.fillStyle = 'lightgray';
                ctx.fillRect(x * 100, y * 100, 100, 100);
            }
            for (var i = 0; i < buttons.length; i++) {
                if (buttons[i].buttonX === x && buttons[i].buttonY === y) {
                    ctx.fillStyle = 'yellow';
                    ctx.fillRect(x * 100, y * 100, 100, 100);
                    ctx.fillStyle = 'black';
                    ctx.font = "50px Courier";
                    ctx.textAlign = "center";
                    ctx.fillText(buttons[i].name, x * 100 + 50, y * 100 + 66);
                }
                if (buttons[i].doorX === x && buttons[i].doorY === y) {
                    if (buttons[i].opened) {
                        ctx.fillStyle = 'green';
                    } else {
                        ctx.fillStyle = 'orange';
                    }
                    ctx.fillRect(x * 100, y * 100, 100, 100);
                    ctx.fillStyle = 'black';
                    ctx.font = "50px Courier";
                    ctx.textAlign = "center";
                    ctx.fillText(buttons[i].name, x * 100 + 50, y * 100 + 66);
                }
            }
            for (var i = 0; i < candy.length; i++) {
                if (candy[i].X === x && candy[i].Y === y) {
                    ctx.fillStyle = 'magenta';
                    ctx.fillRect(x * 100, y * 100, 100, 100);
                    if (!candy[i].obtained) {
                        ctx.fillStyle = 'black';
                        ctx.font = "50px Courier";
                        ctx.textAlign = "center";
                        ctx.fillText("C", x * 100 + 50, y * 100 + 66);
                    }
                }
            }
            if (playerX === x && playerY === y) {
                ctx.fillStyle = 'lightblue';
                ctx.fillRect(x * 100, y * 100, 100, 100);
                ctx.fillStyle = 'black';
                ctx.font = "50px Courier";
                ctx.textAlign = "center";
                ctx.fillText("P", x * 100 + 50, y * 100 + 66);
            }
            for (var i = 0; i < ghostDisplay.length; i++) {
                if (ghostDisplay[i].X === x && ghostDisplay[i].Y === y) {
                    ctx.fillStyle = 'violet';
                    ctx.fillRect(x * 100, y * 100, 100, 100);
                    ctx.fillStyle = 'black';
                    if (ghostDisplay[i].display.length < 4) {
                        ctx.font = "50px Courier";
                    } else {
                        ctx.font = "30px Courier";
                    }
                    ctx.textAlign = "center";
                    ctx.fillText(ghostDisplay[i].display, x * 100 + 50, y * 100 + 66);
                }
            }
        }
    }
}

function moveGhosts() {
    for (var i = 0; i < ghosts.length; i++) {
        moveGhost(ghosts[i]);
    }
}

function copyBoard() {
    var copiedBoard = [];
    for (var k = 0; k < 13; k++) {
        copiedBoard.push([]);
        for (var l = 0; l < 13; l++) {
            if (map[k][l] === "W") {
                copiedBoard[k].push("W");
            } else {
                var closedDoor = false;
                for (var i = 0; i < buttons.length; i++) {
                    if (buttons[i].doorX === l && buttons[i].doorY === k && !buttons[i].opened) {
                        copiedBoard[k].push("W");
                        closedDoor = true;
                    }
                }
                if (!closedDoor) copiedBoard[k].push(" ");
            }
        }
    }
    return copiedBoard;
}

function moveGhost(ghost) {
    const boardCopy = copyBoard();
    const checkedLocations = [[]];
    const frontierLocations = [[ghost.X, ghost.Y, null]];
    var attempts = 0;
    for (var k = 0; k < frontierLocations.length; k++) {
        attempts++;
        var testArray = copyArray(frontierLocations);
        var locationCopy = testArray[k].slice();
        var playerLocated = false;
        const shuffledDirections = shuffle(moveDirections);
        for (const shuffledDirection of shuffledDirections) {
            locationCopy = testArray[k].slice();
            locationCopy[0] += shuffledDirection[0];
            locationCopy[1] += shuffledDirection[1];
            if (locationCopy[0] >= 0 && locationCopy[1] >= 0 && locationCopy[0] <= 12 &&
                locationCopy[1] <= 12 && boardCopy[locationCopy[1]][locationCopy[0]] === " ") {
                var repeatTile = false;
                for (var i = 0; i < checkedLocations.length; i++) {
                    if (checkedLocations[i][0] === locationCopy[0] && checkedLocations[i][1] === locationCopy[1]) {
                        repeatTile = true;
                    }
                }
                
                if (repeatTile === false) {
                    var addedPath;
                    if (shuffledDirection[0] === 1) {
                        addedPath = "R";
                    } else if (shuffledDirection[0] === -1) {
                        addedPath = "L";
                    } else if (shuffledDirection[1] === 1) {
                        addedPath = "D";
                    } else {
                        addedPath = "U";
                    }
                    if (locationCopy[2] === null) {
                        locationCopy[2] = addedPath;
                    } else {
                        locationCopy[2] = locationCopy[2] + addedPath;
                    }
                    checkedLocations.push(locationCopy);
                    frontierLocations.push(locationCopy);
                    if (locationCopy[0] === playerX && locationCopy[1] === playerY) {
                        for (var i = 0; i < ghost.turnMoves + extraGhostMoves; i++) {
                            if (locationCopy[2].charAt(i) === "R") {
                                ghost.X++;
                            } else if (locationCopy[2].charAt(i) === "L") {
                                ghost.X--;
                            } else if (locationCopy[2].charAt(i) === "D") {
                                ghost.Y++;
                            } else {
                                ghost.Y--;
                            }
                            if (ghost.X === playerX && ghost.Y === playerY) {
                                if (ghost.type === "Mimikyu") {
                                    extraGhostMoves = 1;
                                } else {
                                    document.getElementById("gameText").innerHTML = "You were haunted! Reload the page to restart.";
                                    haunted = true;
                                }
                                break;
                            }
                        }
                        playerLocated = true;
                        if (ghost.type === "Dusclops") {
                            if (Math.abs(ghost.X - playerX) <= 1 && Math.abs(ghost.Y - playerY) <= 1) {
                                document.getElementById("gameText").innerHTML = "You were haunted! Reload the page to restart.";
                                haunted = true;
                                break;
                            }
                        }
                        break;
                    }
                }
            }
        }
        if (playerLocated || attempts >= 100) break;
    }
}

function copyArray(array) {
    newArray = [[]];
    for(i = 0; i < array.length; i++){
        newArray[i] = array[i].slice();
    }
    return newArray;
}

function shuffle(array) {
    const shuffled = array.slice();

    // Fisher-Yates shuffle algorithm
    let currentIndex = shuffled.length;
    let randomIndex = 0;
    let temporaryValue;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = parseInt(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = shuffled[currentIndex];
        shuffled[currentIndex] = shuffled[randomIndex];
        shuffled[randomIndex] = temporaryValue;
    }
    return shuffled;
}

function movePlayer(X, Y) {
    var boardCopy = copyBoard();
    if (X < 0 || X > 12 || Y < 0 || Y > 12) {
        document.getElementById("gameText").innerHTML = "You cannot move in that direction!";
        return false;
    }
    if (boardCopy[Y][X] === "W") {
        document.getElementById("gameText").innerHTML = "You cannot move in that direction!";
        return false;
    }
    playerX = X;
    playerY = Y;
    movesLeft--;
    if (movesLeft <= 0) {
        nextRound();
    }
    generateMap();
    if (!haunted) document.getElementById("moves").innerHTML = "You have " + movesLeft + " moves left until the next round!";
}

document/*.getElementById("guess")*/
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (allCandiesObtained === false) {
        if (haunted === false) {
            if (event.code === 'Enter') {
                wait();
            }
            if (event.code === 'ArrowUp') {
                moveUp();
            }
            if (event.code === 'ArrowDown') {
                moveDown();
            }
            if (event.code === 'ArrowLeft') {
                moveLeft();
            }
            if (event.code === 'ArrowRight') {
                moveRight();
            }
        }
    }
});

function wait() {
    document.getElementById("gameText").innerHTML = "You have skipped to the next round!";
    nextRound();
}

function moveUp() {
    document.getElementById("gameText").innerHTML = "You have moved 1 space up!";
    movePlayer(playerX, playerY - 1);
}

function moveDown() {
    document.getElementById("gameText").innerHTML = "You have moved 1 space down!";
    movePlayer(playerX, playerY + 1);
}

function moveLeft() {
    document.getElementById("gameText").innerHTML = "You have moved 1 space left!";
    movePlayer(playerX - 1, playerY);
}

function moveRight() {
    document.getElementById("gameText").innerHTML = "You have moved 1 space right!";
    movePlayer(playerX + 1, playerY);
}

function getCandy() {
    if (!haunted) {
        for (var i = 0; i < candy.length; i++) {
            if (candy[i].X === playerX && candy[i].Y === playerY && candy[i].obtained === false) {
                candy[i].obtained = true;
                candiesObtained++;
                document.getElementById("candies").innerHTML = "You need " + (candy.length - candiesObtained) + " more candies to win!";
            }
        }
        if (candiesObtained === candy.length) {
            allCandiesObtained = true;
            document.getElementById("gameText").innerHTML = "You won Haunter's Haunted House!";
            document.getElementById("moves").innerHTML = "";
            document.getElementById("candies").innerHTML = "";
            document.getElementById("key").innerHTML = "Your key is " + getKey();
        }
    } else {
        document.getElementById("candies").innerHTML = "";
    }
}

function nextRound() {
    moveGhosts();
    getCandy();
    checkButtons();
    generateMap();
    movesLeft = 3;
    if (!haunted && !allCandiesObtained) {
        document.getElementById("moves").innerHTML = "You have " + movesLeft + " moves left until the next round!";
    } else {
        document.getElementById("moves").innerHTML = "";
    }
    extraGhostMoves = 0;
}

function init() {
    generateMap();
    document.getElementById("gameText").innerHTML = "Welcome to Haunter's Haunted House! <br>Use the arrow keys (or the buttons) to move around, <br>and use Enter to start the next round, <br>which will allow the ghosts to move. <br>Unlike the regular game, there is no frenzy after 10 rounds. <br><a href=\"https://tinyurl.com/hhhguide2020\">Click here</a> for a guide to this game.";
    document.getElementById("moves").innerHTML = "You have " + movesLeft + " moves left until the next round!";
    document.getElementById("candies").innerHTML = "You need " + (candy.length - candiesObtained) + " more candies to win!";
}

init();

function getKey() {
    var key = 108749356459;
    key *= 5;
    var multipliers = 0;
    var newString = "";
    for (var i = 0; multipliers < 5; i++) {
        var sum = 0;
        for (var j = 0; j < i.toString().length; j++) {
            sum += Number(i.toString().charAt(j));
            if (sum === 17) multipliers++;
        }
        if (multipliers === 5) key *= i;
    }
    for (var i = 0; i < key.toString().length / 3; i++) {
        const newCharacter = String.fromCharCode(key.toString().charAt(i * 3) + key.toString().charAt(i * 3 + 1) + key.toString().charAt(i * 3 + 2));
        newString = newString.concat(newCharacter);
    }
    return newString;
}