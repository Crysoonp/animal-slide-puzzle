const game = document.getElementById("game");

const movesText = document.getElementById("moves");

const timerText = document.getElementById("timer");

const bestText = document.getElementById("best");

const moveSound = new Audio("sounds/move.mp3");

const clearSound = new Audio("sounds/clear.mp3");

const message = document.getElementById("message");


const originalContainer =
    document.getElementById("original-container");

function toggleOriginal() {

    if (originalContainer.style.display === "block") {

        originalContainer.style.display = "none";

    } else {

        originalContainer.style.display = "block";

    }
}



function getBestScore() {
    return localStorage.getItem(
        "bestScore_" + boardSize
    );
}

function updateBestDisplay() {

    const bestScore = getBestScore();

    if (bestScore !== null) {
        bestText.textContent =
            "Best: " + bestScore + " moves";
    } else {
        bestText.textContent =
            "Best: -";
    }
}


let seconds = 0;

let timer = null;

let boardSize = 3;

let numbers = [];

function createBoard() {

    numbers = [];

    for (let i = 1; i < boardSize * boardSize; i++) {
        numbers.push(i);
    }

    numbers.push(null);
}


let selected = null;

let moves = 0;

function draw() {

    game.style.gridTemplateColumns =
        `repeat(${boardSize}, 80px)`;

    game.innerHTML = "";

    numbers.forEach((num, index) => {
        const tile = document.createElement("div");

        tile.className = "tile";

        const emptyIndex = numbers.indexOf(null);

        const validMoves = [
            emptyIndex - 1,
            emptyIndex + 1,
            emptyIndex - boardSize,
            emptyIndex + boardSize
        ];

        if (validMoves.includes(index)) {
            tile.classList.add("movable");
        }
        ``

        if (num === null) {
            tile.textContent = "";
            tile.style.background = "#dddddd";
        } else {
            if (num !== null) {

                const row = Math.floor((num - 1) / boardSize);
                const col = (num - 1) % boardSize;

                tile.style.backgroundImage =
                    "url('images/cat.jpg')";

                tile.style.backgroundSize =
                    `${boardSize * 80}px ${boardSize * 80}px`;

                tile.style.backgroundPosition =
                    `-${col * 80}px -${row * 80}px`;

            } else {

                tile.style.background = "#dddddd";
            }
        }

        if (selected === index) {
            tile.style.background = "orange";
        }

        tile.addEventListener("click", () => {

            moveTile(index);

        });

        game.appendChild(tile);
    });
}

function moveTile(index) {

    const emptyIndex = numbers.indexOf(null);

    const validMoves = [
        emptyIndex - 1,
        emptyIndex + 1,
        emptyIndex - boardSize,
        emptyIndex + boardSize
    ];

    if (validMoves.includes(index)) {

        numbers[emptyIndex] = numbers[index];
        numbers[index] = null;

        moves++;

        moveSound.currentTime = 0;
        moveSound.play();

        movesText.textContent = "Moves: " + moves;



        checkClear();
        draw();
    }
}


function setDifficulty(size) {

    boardSize = size;

    createBoard();

    updateBestDisplay();

    draw();
}

function shuffle() {

    createBoard();

    for (let i = 0; i < 100; i++) {

        const emptyIndex = numbers.indexOf(null);

        const moves = [
            emptyIndex - 1,
            emptyIndex + 1,
            emptyIndex - 3,
            emptyIndex + 3
        ].filter(index => index >= 0 && index < boardSize * boardSize);

        const randomIndex =
            moves[Math.floor(Math.random() * moves.length)];

        numbers[emptyIndex] = numbers[randomIndex];
        numbers[randomIndex] = null;
    }

    selected = null;
    moves = 0;
    seconds = 0;

    movesText.textContent = "Moves: 0";
    timerText.textContent = "Time: 00:00";

    message.textContent = "";

    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);

    draw();

}

function updateTimer() {

    seconds++;

    const minutes = Math.floor(seconds / 60);
    const remainSeconds = seconds % 60;

    timerText.textContent =
        "Time: " +
        String(minutes).padStart(2, "0") +
        ":" +
        String(remainSeconds).padStart(2, "0");

}

function checkClear() {

    const clearPattern = [1, 2, 3, 4, 5, 6, 7, 8, null];

    let isClear = true;

    for (let i = 0; i < numbers.length; i++) {

        if (numbers[i] !== clearPattern[i]) {
            isClear = false;
            break;
        }
    }

    if (isClear) {

        clearInterval(timer);

        clearSound.play();

        message.textContent = "🎉 CLEAR! 🎉";

        message.classList.remove("clear-animation");

        void message.offsetWidth;

        message.classList.add("clear-animation");

        const currentBest =
            getBestScore();

        if (
            currentBest === null ||
            moves < Number(currentBest)
        ) {

            localStorage.setItem(
                "bestScore_" + boardSize,
                moves
            );

            updateBestDisplay();
        }

        bestText.textContent = "Best: " + bestScore + " moves";
    }


    alert(
        "🎉 クリア！\n" +
        "移動回数: " + moves + "\n" +
        "時間: " +
        Math.floor(seconds / 60)
        + "分 "
        + (seconds % 60)
        + "秒"
    );

}



createBoard();
draw();