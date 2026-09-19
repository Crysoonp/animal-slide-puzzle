const game = document.getElementById("game");

const movesText = document.getElementById("moves");

const timerText = document.getElementById("timer");

const bestText = document.getElementById("best");

const bestTimeText =
    document.getElementById("best-time");






const moveSound = new Audio("sounds/move.mp3");

const clearSound = new Audio("sounds/clear_fanfare.mp3");

const selectSound =
    new Audio("sounds/select_difficulty.mp3");

const titleBgm =
    new Audio("BGM/title.mp3");

titleBgm.loop = true;







const message = document.getElementById("message");

const buttonSound =
    new Audio("sounds/selection_sound.mp3");




const originalImage =
    document.getElementById("original-image");




const clearPanel =
    document.getElementById("clear-panel");

const clearMoves =
    document.getElementById("clear-moves");

const clearTime =
    document.getElementById("clear-time");





const settingsMenu =
    document.getElementById(
        "settings-menu"
    );





function toggleSettings() {

    if (
        settingsMenu.style.display ===
        "block"
    ) {

        settingsMenu.style.display =
            "none";

    } else {

        settingsMenu.style.display =
            "block";
    }
}






function resetBestScore() {

    localStorage.removeItem(
        "bestScore_" + boardSize
    );

    updateBestDisplay();

}





function resetBestTime() {

    localStorage.removeItem(
        "bestTime_" + boardSize
    );

    updateBestDisplay();

}



function resetAllRecords() {

    localStorage.clear();

    updateBestDisplay();

}





function resetAllRecords() {

    if (
        confirm(
            "全記録をリセットしますか？"
        )
    ) {

        localStorage.clear();

        updateBestDisplay();
    }
}




function closeClearPanel() {

    buttonSound.currentTime = 0;
    buttonSound.play();

    clearPanel.style.display = "none";

    document.body.style.overflow = "auto";

    setDifficultyButtonsDisabled(false);

}




function playAgain() {

    buttonSound.currentTime = 0;
    buttonSound.play();

    document.body.style.overflow = "auto";

    closeClearPanel();

    shuffle();

}





function debugClear() {

    const clearPattern = [];

    for (let i = 1; i < boardSize * boardSize; i++) {
        clearPattern.push(i);
    }

    clearPattern.push(null);

    numbers = clearPattern;

    draw();

    checkClear();
}



const originalContainer =
    document.getElementById(
        "original-container"
    );

const originalButton =
    document.getElementById(
        "original-button"
    );



function toggleOriginal() {

    if (
        originalContainer.style.display ===
        "block"
    ) {

        originalContainer.style.display =
            "none";

        originalButton.textContent =
            "🖼️ 完成図";

    } else {

        originalContainer.style.display =
            "block";

        originalButton.textContent =
            "🖼️ 完成図を閉じる";

    }
}


function randomImage() {

    const randomIndex =
        Math.floor(
            Math.random() * imageList.length
        );

    currentImage =
        imageList[randomIndex];

    originalImage.src =
        "images/" + currentImage;


}




function getBestScore() {
    return localStorage.getItem(
        "bestScore_" + boardSize
    );
}


function getBestTime() {

    return localStorage.getItem(
        "bestTime_" + boardSize
    );

}






function updateBestDisplay() {

    const bestScore = getBestScore();

    if (bestScore !== null) {

        bestText.textContent =
            "🥇 最少移動回数: " + bestScore;

    } else {

        bestText.textContent = "🥇 最少移動回数: -";

    }

    const bestTime =
        getBestTime();

    if (bestTime !== null) {

        const minutes =
            Math.floor(bestTime / 60);

        const remainSeconds =
            bestTime % 60;

        bestTimeText.textContent =
            "⭐ 最短時間: "
            + String(minutes).padStart(2, "0")
            + ":"
            + String(remainSeconds).padStart(2, "0");

    } else {

        bestTimeText.textContent =
            "⭐ 最短時間: -";

    }
}
























let boardSize = 3;

let selectedDifficulty = 3;

let gameStarted = false;

let numbers = [];

let seconds = 0;

let timer = null;

let currentImage = "cat.jpg";

const imageList = [
    "cat.jpg",
    "dog.jpg",
    "car.jpg",
    "castle.jpg",
    "cloud.jpg"
];




const BOARD_SIZE_PX =
    Math.min(
        window.innerWidth * 0.90,
        480
    );




function createBoard() {

    numbers = [];

    for (let i = 1; i < boardSize * boardSize; i++) {
        numbers.push(i);
    }

    numbers.push(null);
}


let selected = null;

let moves = 0;

let isSolved = false;















function draw() {

    const tileSize =
        BOARD_SIZE_PX / boardSize;


    game.style.gridTemplateColumns =
        `repeat(${boardSize}, ${tileSize}px)`;


    game.innerHTML = "";

    numbers.forEach((num, index) => {
        const tile = document.createElement("div");

        tile.className = "tile";



        tile.style.width =
            `${tileSize}px`;

        tile.style.height =
            `${tileSize}px`;




        const emptyIndex = numbers.indexOf(null);

        const validMoves =
            getValidMoves(emptyIndex);

        if (
            gameStarted &&
            !isSolved &&
            validMoves.includes(index)
        ) {

            tile.classList.add("movable");
        }




        if (num === null) {

            if (isSolved) {

                const row = boardSize - 1;
                const col = boardSize - 1;

                tile.style.backgroundImage =
                    `url('images/${currentImage}')`;

                tile.style.backgroundSize =
                    `${BOARD_SIZE_PX}px ${BOARD_SIZE_PX}px`;

                tile.style.backgroundPosition =
                    `-${col * tileSize}px -${row * tileSize}px`;

                tile.classList.add("fade-in");

            } else {

                tile.style.backgroundImage = "none";
                tile.style.background = "#d9d9d9";

            }

        } else {

            const row =
                Math.floor((num - 1) / boardSize);

            const col =
                (num - 1) % boardSize;

            if (gameStarted) {

                tile.style.backgroundImage =
                    `url('images/${currentImage}')`;

                tile.style.backgroundSize =
                    `${BOARD_SIZE_PX}px ${BOARD_SIZE_PX}px`;

                tile.style.backgroundPosition =
                    `-${col * tileSize}px -${row * tileSize}px`;

            } else {

                tile.style.backgroundImage = "none";
                tile.style.background = "#d9d9d9";

            }

        }

        if (selected === index) {
            tile.style.background = "orange";
        }

        if (!isSolved) {

            tile.addEventListener("click", () => {

                moveTile(index);

            });

        }
        game.appendChild(tile);
    });
}











function getValidMoves(emptyIndex) {

    const validMoves = [];

    const row = Math.floor(emptyIndex / boardSize);
    const col = emptyIndex % boardSize;

    if (col > 0) {
        validMoves.push(emptyIndex - 1);
    }

    if (col < boardSize - 1) {
        validMoves.push(emptyIndex + 1);
    }

    if (row > 0) {
        validMoves.push(emptyIndex - boardSize);
    }

    if (row < boardSize - 1) {
        validMoves.push(emptyIndex + boardSize);
    }

    return validMoves;
}




function moveTile(index) {

    if (!gameStarted || isSolved) {
        return;
    }

    const emptyIndex = numbers.indexOf(null);

    const validMoves =
        getValidMoves(emptyIndex);

    if (validMoves.includes(index)) {

        numbers[emptyIndex] = numbers[index];
        numbers[index] = null;

        moves++;

        moveSound.currentTime = 0;
        moveSound.play();

        movesText.textContent = "🎯 移動回数: " + moves;



        checkClear();
        draw();
    }
}






function setDifficulty(size) {

    selectSound.currentTime = 0;
    selectSound.play();

    document.getElementById(
        "clear-panel"
    ).style.display = "none";

    gameStarted = false;

    isSolved = false;

    selectedDifficulty = size;

    boardSize = size;

    numbers = [];

    for (let i = 1; i < boardSize * boardSize; i++) {
        numbers.push(i);
    }

    numbers.push(null);

    clearInterval(timer);

    seconds = 0;
    moves = 0;

    movesText.textContent =
        "🎯 移動回数: 0";

    timerText.textContent =
        "⏰ 経過時間: 00:00";

    updateDifficultyButtons();

    updateBestDisplay();

    draw();

    document.getElementById(
        "start-button"
    ).disabled = false;

}










function cancelGame() {

    gameStarted = false;



    document.getElementById(
        "start-button"
    ).disabled = false;


    clearInterval(timer);

    moves = 0;
    seconds = 0;

    movesText.textContent =
        "🎯 移動回数: 0";

    timerText.textContent =
        "⏰ 経過時間: 00:00";

    setDifficultyButtonsDisabled(false);

    document.getElementById(
        "cancel-button"
    ).style.display = "none";


    document.getElementById(
        "original-button"
    ).style.display = "none";

    document.getElementById(
        "original-container"
    ).style.display = "none";



    draw();

}









function setDifficultyButtonsDisabled(disabled) {

    document
        .querySelectorAll(
            "#difficulty-container button"
        )
        .forEach(button => {

            button.disabled = disabled;

        });

}





function updateDifficultyButtons() {

    document
        .querySelectorAll(
            ".difficulty-buttons button"
        )
        .forEach(button => {

            button.classList.remove(
                "selected-difficulty"
            );

        });

    document
        .getElementById(
            "diff-" + selectedDifficulty
        )
        .classList.add(
            "selected-difficulty"
        );
}












function shuffle() {

    buttonSound.currentTime = 0;
    buttonSound.play();

    gameStarted = true;



    document.getElementById(
        "start-button"
    ).disabled = true;



    setDifficultyButtonsDisabled(true);

    isSolved = false;

    randomImage();

    createBoard();

    for (let i = 0; i < 100; i++) {

        const emptyIndex = numbers.indexOf(null);

        const moves =
            getValidMoves(emptyIndex);

        const randomIndex =
            moves[Math.floor(Math.random() * moves.length)];

        numbers[emptyIndex] = numbers[randomIndex];
        numbers[randomIndex] = null;
    }

    selected = null;
    moves = 0;
    seconds = 0;

    movesText.textContent = "🎯 移動回数: 0";
    timerText.textContent = "⏰ 経過時間: 00:00";

    message.textContent = "";

    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);


    document.getElementById(
        "cancel-button"
    ).style.display = "inline-block";


    document.getElementById(
        "original-button"
    ).style.display = "inline-block";



    draw();

}







function updateTimer() {

    seconds++;

    const minutes = Math.floor(seconds / 60);
    const remainSeconds = seconds % 60;

    timerText.textContent =
        "⏰ 経過時間: " +
        String(minutes).padStart(2, "0") +
        ":" +
        String(remainSeconds).padStart(2, "0");

}




function checkClear() {

    const clearPattern = [];

    for (let i = 1; i < boardSize * boardSize; i++) {
        clearPattern.push(i);
    }

    clearPattern.push(null);

    let isClear = true;

    for (let i = 0; i < numbers.length; i++) {

        if (numbers[i] !== clearPattern[i]) {
            isClear = false;
            break;
        }
    }

    if (isClear) {


        isSolved = true;

        draw();

        clearInterval(timer);

        clearSound.play();



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





        const currentBestTime =
            getBestTime();



        if (
            currentBestTime === null ||
            seconds < Number(currentBestTime)
        ) {



            localStorage.setItem(
                "bestTime_" + boardSize,
                seconds
            );

        }



        updateBestDisplay();





        document.getElementById(
            "cancel-button"
        ).style.display = "none";







        clearMoves.textContent =
            "🎯 移動回数: " + moves;

        clearTime.textContent =
            "⏰ 経過時間: "
            + Math.floor(seconds / 60)
            + "分 "
            + (seconds % 60)
            + "秒";

        clearPanel.style.display = "block";

        setDifficultyButtonsDisabled(false);

clearPanel.style.display = "block";

document.body.style.overflow = "hidden";









    }

}









function selectDifficulty(level) {

    difficulty = level;

    document.getElementById(
        "start-button"
    ).disabled = false;

}








function startTitleGame() {

    buttonSound.currentTime = 0;
    buttonSound.play();

    titleBgm.pause();
    titleBgm.currentTime = 0;

    document.getElementById(
        "title-screen"
    ).style.display = "none";

    document.getElementById(
        "game-screen"
    ).style.display = "block";

}













createBoard();
updateBestDisplay();
draw();


titleBgm.volume = 0.3;
titleBgm.play();