const game = document.getElementById("game");

const movesText = document.getElementById("moves");

const timerText = document.getElementById("timer");

const bestText = document.getElementById("best");

const bestTimeText =
    document.getElementById("best-time");




const titleStartSound =
    new Audio("sounds/title_start.mp3");

const moveSound = new Audio("sounds/move.mp3");

const clearSound = new Audio("sounds/clear_fanfare.mp3");

const selectSound =
    new Audio("sounds/select_difficulty.mp3");

const cancelSound =
    new Audio("sounds/cancel.mp3");

const titleBgm =
    new Audio("BGM/title.mp3");

titleBgm.loop = true;

const gameBgm =
    new Audio("BGM/game_bgm.mp3");

gameBgm.loop = true;
gameBgm.volume = 0;

const titleScreen =
    document.getElementById("title-screen");

const gameScreen =
    document.getElementById(
        "game-screen"
    );

const titleBgmGuide =
    document.getElementById(
        "title-bgm-guide"
    );



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




const translations = {

    ja: {
        pageTitle:
            "動物スライドパズル",

        languageSetting:
            "🌐 言語",

        languageJapanese:
            "日本語",

        languageEnglish:
            "English",

        pictureCategory:
            "遊ぶ画像",

        animalAll:
            "おまかせ",

        animalDogs:
            "わんこ",

        animalCats:
            "にゃんこ",

        animalOther:
            "ほかの動物",

        difficultyEasy:
            "初級",

        difficultyNormal:
            "中級",

        difficultyHard:
            "上級",

        difficultyExpert:
            "超級",

        cancel:
            "中止",

        startGame:
            "ゲーム開始",

        settings:
            "設定",

        gameInfo:
            "プレイ情報",

        moves:
            "移動回数",

        time:
            "経過時間",

        bestRecords:
            "ベスト記録",

        fewestMoves:
            "最少移動回数",

        bestTime:
            "最短時間",

        fullImage:
            "完成図",

        numberHint:
            "番号ヒント",

        on:
            "ON",

        off:
            "OFF"

    },



    en: {
        pageTitle:
            "Animal Slide Puzzle",

        languageSetting:
            "🌐 Language",

        languageJapanese:
            "日本語",

        languageEnglish:
            "English",

        pictureCategory:
            "Picture Category",

        animalAll:
            "Random",

        animalDogs:
            "Dogs",

        animalCats:
            "Cats",

        animalOther:
            "Other Animals",

        difficultyEasy:
            "Easy",

        difficultyNormal:
            "Normal",

        difficultyHard:
            "Hard",

        difficultyExpert:
            "Expert",

        cancel:
            "Quit",

        startGame:
            "Start Game",

        settings:
            "Settings",

        gameInfo:
            "Game Info",

        moves:
            "Moves",

        time:
            "Time",

        bestRecords:
            "Best Records",

        fewestMoves:
            "Fewest Moves",

        bestTime:
            "Best Time",

        fullImage:
            "Full Image",

        numberHint:
            "Number Hint",

        on:
            "ON",

        off:
            "OFF"


    }

};


let currentLanguage =
    localStorage.getItem(
        "language"
    ) || "ja";


if (
    currentLanguage !== "ja" &&
    currentLanguage !== "en"
) {
    currentLanguage = "ja";
}





let bgmEnabled =
    localStorage.getItem("bgmEnabled") !== "false";

let soundEffectsEnabled =
    localStorage.getItem("soundEffectsEnabled") !== "false";

let bgmVolume =
    Number(
        localStorage.getItem("bgmVolume") ?? 15
    ) / 100;

let soundEffectsVolume =
    Number(
        localStorage.getItem("soundEffectsVolume") ?? 70
    ) / 100;



const soundEffects = [
    moveSound,
    clearSound,
    selectSound,
    buttonSound,
    titleStartSound,
    cancelSound
];





function applyBgmVolume() {

    titleBgm.volume = bgmVolume;

    if (
        gameBgm.paused ||
        !gameStarted ||
        isSolved
    ) {
        gameBgm.volume = 0;
    }

}


function applySoundEffectsVolume() {

    soundEffects.forEach(function (sound) {

        sound.volume =
            soundEffectsVolume;

    });

}



function getText(key) {

    const selectedTranslations =
        translations[currentLanguage];

    if (
        selectedTranslations &&
        selectedTranslations[key] !==
        undefined
    ) {
        return selectedTranslations[key];
    }

    return translations.ja[key] || key;

}


function updateLanguageButtons() {

    const japaneseButton =
        document.getElementById(
            "language-ja-button"
        );

    const englishButton =
        document.getElementById(
            "language-en-button"
        );

    if (
        !japaneseButton ||
        !englishButton
    ) {
        return;
    }

    japaneseButton.classList.toggle(
        "selected-language",
        currentLanguage === "ja"
    );

    englishButton.classList.toggle(
        "selected-language",
        currentLanguage === "en"
    );

    japaneseButton.setAttribute(
        "aria-pressed",
        String(
            currentLanguage === "ja"
        )
    );

    englishButton.setAttribute(
        "aria-pressed",
        String(
            currentLanguage === "en"
        )
    );

}


function applyLanguage() {

    const text =
        translations[currentLanguage];

    document.documentElement.lang =
        currentLanguage;

    document.title =
        text.pageTitle;


    const languageSettingTitle =
        document.getElementById(
            "language-setting-title"
        );

    const japaneseButton =
        document.getElementById(
            "language-ja-button"
        );

    const englishButton =
        document.getElementById(
            "language-en-button"
        );


    const pictureCategoryTitle =
        document.getElementById(
            "picture-category-title"
        );

    const animalAllText =
        document.getElementById(
            "animal-mode-all-text"
        );

    const animalDogsText =
        document.getElementById(
            "animal-mode-dogs-text"
        );

    const animalCatsText =
        document.getElementById(
            "animal-mode-cats-text"
        );

    const animalOtherText =
        document.getElementById(
            "animal-mode-other-text"
        );


    const difficultyEasy =
        document.getElementById(
            "difficulty-name-3"
        );

    const difficultyNormal =
        document.getElementById(
            "difficulty-name-4"
        );

    const difficultyHard =
        document.getElementById(
            "difficulty-name-5"
        );

    const difficultyExpert =
        document.getElementById(
            "difficulty-name-6"
        );


    const cancelButtonText =
        document.getElementById(
            "cancel-button-text"
        );

    const startButtonText =
        document.getElementById(
            "start-button-text"
        );

    const settingsButtonText =
        document.getElementById(
            "settings-button-text"
        );

    const settingsTitleText =
        document.getElementById(
            "settings-title-text"
        );


    if (languageSettingTitle) {
        languageSettingTitle.textContent =
            text.languageSetting;
    }

    if (japaneseButton) {
        japaneseButton.textContent =
            text.languageJapanese;
    }

    if (englishButton) {
        englishButton.textContent =
            text.languageEnglish;
    }


    if (pictureCategoryTitle) {
        pictureCategoryTitle.textContent =
            text.pictureCategory;
    }

    if (animalAllText) {
        animalAllText.textContent =
            text.animalAll;
    }

    if (animalDogsText) {
        animalDogsText.textContent =
            text.animalDogs;
    }

    if (animalCatsText) {
        animalCatsText.textContent =
            text.animalCats;
    }

    if (animalOtherText) {
        animalOtherText.textContent =
            text.animalOther;
    }


    if (difficultyEasy) {
        difficultyEasy.textContent =
            text.difficultyEasy;
    }

    if (difficultyNormal) {
        difficultyNormal.textContent =
            text.difficultyNormal;
    }

    if (difficultyHard) {
        difficultyHard.textContent =
            text.difficultyHard;
    }

    if (difficultyExpert) {
        difficultyExpert.textContent =
            text.difficultyExpert;
    }


    if (cancelButtonText) {
        cancelButtonText.textContent =
            text.cancel;
    }

    if (startButtonText) {
        startButtonText.textContent =
            text.startGame;
    }

    if (settingsButtonText) {
        settingsButtonText.textContent =
            text.settings;
    }

    if (settingsTitleText) {
        settingsTitleText.textContent =
            text.settings;
    }




    const gameInfoTitle =
        document.getElementById(
            "game-info-title"
        );

    const bestRecordsTitle =
        document.getElementById(
            "best-records-title"
        );

    const fullImageButton =
        document.getElementById(
            "original-button"
        );


    if (gameInfoTitle) {
        gameInfoTitle.textContent =
            text.gameInfo;
    }

    if (bestRecordsTitle) {
        bestRecordsTitle.textContent =
            text.bestRecords;
    }

    if (fullImageButton) {
        fullImageButton.textContent =
            "🖼️ " + text.fullImage;
    }


    updateMovesDisplay();

    updateTimerDisplay();

    updateBestDisplay();

    updateNumberHintButton();



    updateLanguageButtons();

}


function changeLanguage(language) {

    if (
        language !== "ja" &&
        language !== "en"
    ) {
        return;
    }

    currentLanguage =
        language;

    localStorage.setItem(
        "language",
        currentLanguage
    );

    buttonSound.currentTime = 0;

    buttonSound.play().catch(
        function () {
            /*
             * 効果音を再生できない場合でも
             * 言語変更は続ける
             */
        }
    );

    applyLanguage();

}





function updateSoundButtons() {

    const bgmButton =
        document.getElementById(
            "bgm-toggle-button"
        );

    const seButton =
        document.getElementById(
            "se-toggle-button"
        );

    if (bgmButton) {

        bgmButton.textContent =
            bgmEnabled
                ? "🎵 BGM：ON"
                : "🔇 BGM：OFF";

    }

    if (seButton) {

        seButton.textContent =
            soundEffectsEnabled
                ? "🔊 効果音：ON"
                : "🔇 効果音：OFF";

    }

}




function changeBgmVolume(value) {

    const volumeNumber =
        Number(value);

    bgmVolume =
        volumeNumber / 100;

    localStorage.setItem(
        "bgmVolume",
        volumeNumber
    );

    document.getElementById(
        "bgm-volume-value"
    ).textContent =
        volumeNumber + "%";

    titleBgm.volume =
        bgmVolume;

    if (
        !gameBgm.paused &&
        bgmEnabled
    ) {
        gameBgm.volume =
            bgmVolume;
    }

}


function changeSoundEffectsVolume(value) {

    const volumeNumber =
        Number(value);

    soundEffectsVolume =
        volumeNumber / 100;

    localStorage.setItem(
        "soundEffectsVolume",
        volumeNumber
    );

    document.getElementById(
        "se-volume-value"
    ).textContent =
        volumeNumber + "%";

    applySoundEffectsVolume();

}



function toggleBgm() {

    bgmEnabled = !bgmEnabled;

    localStorage.setItem(
        "bgmEnabled",
        bgmEnabled
    );

    titleBgm.muted = !bgmEnabled;
    gameBgm.muted = !bgmEnabled;

    if (!bgmEnabled) {
        stopGameBgm();
    } else if (gameStarted && !isSolved) {
        startGameBgm();
    }

    updateSoundButtons();

}


function toggleSoundEffects() {

    soundEffectsEnabled =
        !soundEffectsEnabled;

    localStorage.setItem(
        "soundEffectsEnabled",
        soundEffectsEnabled
    );

    soundEffects.forEach(function (sound) {
        sound.muted = !soundEffectsEnabled;
    });

    updateSoundButtons();

}





function toggleSettings() {

    if (
        settingsMenu.style.display ===
        "flex"
    ) {

        closeSettings();

    } else {

        settingsMenu.style.display =
            "flex";

        document.body.style.overflow =
            "hidden";

    }

}




function closeSettings() {

    buttonSound.currentTime = 0;

    buttonSound.play().catch(function () {
        /*
         * 効果音を再生できない場合でも
         * 設定画面は閉じる
         */
    });

    settingsMenu.style.display =
        "none";

    document.body.style.overflow =
        "";

}




function getDifficultyName() {

    const difficultyNames = {

        3: "初級",

        4: "中級",

        5: "上級",

        6: "超級"

    };

    return difficultyNames[boardSize];

}






function resetBestScore() {

    const difficultyName =
        getDifficultyName();

    if (
        confirm(
            difficultyName
            + "の最少移動回数を"
            + "リセットしますか？"
        )
    ) {

        localStorage.removeItem(
            "bestScore_" + boardSize
        );

        updateBestDisplay();

    }

}




function resetBestTime() {

    const difficultyName =
        getDifficultyName();

    if (
        confirm(
            difficultyName
            + "の最短時間を"
            + "リセットしますか？"
        )
    ) {

        localStorage.removeItem(
            "bestTime_" + boardSize
        );

        updateBestDisplay();

    }

}




function resetAllRecords() {

    if (
        confirm(
            "すべての難易度の"
            + "最少移動回数と最短時間を"
            + "リセットしますか？"
        )
    ) {

        [3, 4, 5, 6].forEach(function (size) {

            localStorage.removeItem(
                "bestScore_" + size
            );

            localStorage.removeItem(
                "bestTime_" + size
            );

        });

        updateBestDisplay();

    }

}




function closeClearPanel() {

    gameScreen.classList.remove(
        "game-playing"
    );

    buttonSound.currentTime = 0;
    buttonSound.play();

    clearPanel.classList.remove(
        "show"
    );

    clearPanel.style.display =
        "none";

    document.body.style.overflow =
        "";

    gameStarted = false;

    selectedAnimalMode = null;
    selectedDifficulty = null;

    document
        .querySelectorAll(
            "#animal-mode-container button"
        )
        .forEach(function (button) {

            button.classList.remove(
                "selected-animal-mode"
            );

        });

    document
        .querySelectorAll(
            "#difficulty-container button"
        )
        .forEach(function (button) {

            button.classList.remove(
                "selected-difficulty"
            );

        });

    setDifficultyButtonsDisabled(
        false
    );

    document.getElementById(
        "start-button"
    ).disabled = true;

    document.getElementById(
        "cancel-button"
    ).style.display = "none";

    document.getElementById(
        "original-button"
    ).style.display = "none";

    numberHintButton.style.display =
        "none";

}




function playAgain() {

    clearPanel.classList.remove("show");

    clearPanel.style.display = "none";

    document.body.style.overflow = "";

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

const numberHintButton =
    document.getElementById(
        "number-hint-button"
    );






function updateNumberHintButton() {

    if (!numberHintButton) {
        return;
    }

    numberHintButton.textContent =
        "🔢 "
        + getText("numberHint")
        + ": "
        + (
            numberHintEnabled
                ? getText("on")
                : getText("off")
        );

    numberHintButton.classList.toggle(
        "hint-enabled",
        numberHintEnabled
    );

}





function toggleNumberHint() {

    buttonSound.currentTime = 0;
    buttonSound.play();

    if (
        !gameStarted ||
        isSolved
    ) {
        return;
    }

    numberHintEnabled =
        !numberHintEnabled;

    updateNumberHintButton();

    draw();

}



function toggleOriginal() {

    buttonSound.currentTime = 0;
    buttonSound.play();

    originalContainer.style.display =
        "flex";

    document.body.style.overflow =
        "hidden";

}





function closeOriginal() {

    buttonSound.currentTime = 0;
    buttonSound.play();

    originalContainer.style.display =
        "none";

    document.body.style.overflow =
        "";

}


originalContainer.addEventListener(
    "click",
    function () {

        closeOriginal();

    }
);





function updateStartButtonState() {

    const startButton =
        document.getElementById(
            "start-button"
        );

    startButton.disabled =
        selectedAnimalMode === null ||
        selectedDifficulty === null;

}





function setAnimalMode(mode) {

    if (gameStarted && !isSolved) {
        return;
    }

    selectedAnimalMode = mode;

    document
        .querySelectorAll(
            "#animal-mode-container button"
        )
        .forEach(function (button) {

            button.classList.remove(
                "selected-animal-mode"
            );

        });

    const selectedButton =
        document.getElementById(
            "animal-mode-" + mode
        );

    if (selectedButton) {

        selectedButton.classList.add(
            "selected-animal-mode"
        );

    }

    buttonSound.currentTime = 0;

    buttonSound.play().catch(
        function () {
            /*
             * 音が鳴らなくても
             * モード変更は続ける
             */
        }
    );

    updateStartButtonState();

}







function getSelectedImageList() {

    if (selectedAnimalMode === "cats") {
        return imageLists.cats;
    }

    if (selectedAnimalMode === "dogs") {
        return imageLists.dogs;
    }

    if (
        selectedAnimalMode ===
        "otherAnimals"
    ) {
        return imageLists.otherAnimals;
    }

    return allImages;

}








function randomImage() {

    const selectedImages =
        getSelectedImageList();

    if (selectedImages.length === 0) {

        console.error(
            "選択中のモードに画像がありません。"
        );

        return;

    }

    let availableImages =
        selectedImages.filter(
            function (image) {

                return image !== currentImage;

            }
        );

    if (availableImages.length === 0) {

        availableImages =
            selectedImages;

    }

    const randomIndex =
        Math.floor(
            Math.random()
            * availableImages.length
        );

    currentImage =
        availableImages[randomIndex];

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


function formatTime(totalSeconds) {

    const minutes =
        Math.floor(
            totalSeconds / 60
        );

    const remainSeconds =
        totalSeconds % 60;

    return (
        String(minutes).padStart(
            2,
            "0"
        )
        + ":"
        + String(
            remainSeconds
        ).padStart(
            2,
            "0"
        )
    );

}


function updateMovesDisplay() {

    movesText.textContent =
        "🎯 "
        + getText("moves")
        + ": "
        + moves;

}


function updateTimerDisplay() {

    timerText.textContent =
        "⏱ "
        + getText("time")
        + ": "
        + formatTime(seconds);

}



function updateBestDisplay() {

    const bestScore =
        getBestScore();

    bestText.textContent =
        "🏅 "
        + getText("fewestMoves")
        + ": "
        + (
            bestScore !== null
                ? bestScore
                : "-"
        );


    const bestTime =
        getBestTime();

    bestTimeText.textContent =
        "⭐ "
        + getText("bestTime")
        + ": "
        + (
            bestTime !== null
                ? formatTime(
                    Number(bestTime)
                )
                : "-"
        );

}





















let boardSize = 3;

let selectedDifficulty = null;

let gameStarted = false;

let numbers = [];

let seconds = 0;

let timer = null;

let currentImage = "";

let selectedAnimalMode = null;

let BOARD_SIZE_PX =
    calculateBoardSize();


function calculateBoardSize() {

    return Math.min(
        window.innerWidth - 24,
        480
    );

}





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

let numberHintEnabled = false;

let isTileAnimating = false;













function draw() {

    game.classList.toggle(
        "solved",
        isSolved
    );

    const tileSize =
        BOARD_SIZE_PX / boardSize;


    game.style.gridTemplateColumns =
        `repeat(${boardSize}, ${tileSize}px)`;


    game.innerHTML = "";

    numbers.forEach((num, index) => {

        const tile = document.createElement("div");

        tile.className = "tile";

        if (
            numberHintEnabled &&
            num !== null &&
            !isSolved
        ) {

            const numberBadge =
                document.createElement("span");

            numberBadge.className =
                "tile-number";

            numberBadge.textContent =
                num;

            if (boardSize >= 5) {

                numberBadge.classList.add(
                    "small"
                );

            }

            tile.appendChild(
                numberBadge
            );

        }

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

            let pointerStartX = 0;
            let pointerStartY = 0;
            let activePointerId = null;


            tile.addEventListener(
                "pointerdown",
                function (event) {

                    if (
                        !gameStarted ||
                        isSolved ||
                        isTileAnimating
                    ) {
                        return;
                    }

                    pointerStartX =
                        event.clientX;

                    pointerStartY =
                        event.clientY;

                    activePointerId =
                        event.pointerId;

                    tile.setPointerCapture(
                        event.pointerId
                    );

                }
            );


            tile.addEventListener(
                "pointerup",
                function (event) {

                    if (
                        activePointerId === null ||
                        event.pointerId !==
                        activePointerId
                    ) {
                        return;
                    }

                    const moveX =
                        event.clientX -
                        pointerStartX;

                    const moveY =
                        event.clientY -
                        pointerStartY;

                    activePointerId = null;

                    if (
                        tile.hasPointerCapture(
                            event.pointerId
                        )
                    ) {

                        tile.releasePointerCapture(
                            event.pointerId
                        );

                    }

                    const flickDistance = 24;

                    const isTap =
                        Math.abs(moveX)
                        < flickDistance &&
                        Math.abs(moveY)
                        < flickDistance;

                    if (isTap) {

                        moveTile(index);

                        return;

                    }

                    const emptyIndex =
                        numbers.indexOf(null);

                    const validMoves =
                        getValidMoves(
                            emptyIndex
                        );

                    if (
                        !validMoves.includes(index)
                    ) {
                        return;
                    }

                    const tileRow =
                        Math.floor(
                            index / boardSize
                        );

                    const tileCol =
                        index % boardSize;

                    const emptyRow =
                        Math.floor(
                            emptyIndex / boardSize
                        );

                    const emptyCol =
                        emptyIndex % boardSize;

                    let flickDirection = "";

                    if (
                        Math.abs(moveX) >
                        Math.abs(moveY)
                    ) {

                        flickDirection =
                            moveX > 0
                                ? "right"
                                : "left";

                    } else {

                        flickDirection =
                            moveY > 0
                                ? "down"
                                : "up";

                    }

                    let requiredDirection = "";

                    if (emptyCol > tileCol) {

                        requiredDirection =
                            "right";

                    } else if (
                        emptyCol < tileCol
                    ) {

                        requiredDirection =
                            "left";

                    } else if (
                        emptyRow > tileRow
                    ) {

                        requiredDirection =
                            "down";

                    } else if (
                        emptyRow < tileRow
                    ) {

                        requiredDirection =
                            "up";

                    }

                    if (
                        flickDirection ===
                        requiredDirection
                    ) {

                        moveTile(index);

                    }

                }
            );


            tile.addEventListener(
                "pointercancel",
                function (event) {

                    if (
                        activePointerId !== null &&
                        tile.hasPointerCapture(
                            event.pointerId
                        )
                    ) {

                        tile.releasePointerCapture(
                            event.pointerId
                        );

                    }

                    activePointerId = null;

                }
            );

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

    if (
        !gameStarted ||
        isSolved ||
        isTileAnimating
    ) {
        return;
    }

    const emptyIndex =
        numbers.indexOf(null);

    const validMoves =
        getValidMoves(emptyIndex);

    if (!validMoves.includes(index)) {
        return;
    }

    const tile =
        game.children[index];

    if (!tile) {
        return;
    }

    isTileAnimating = true;

    const tileSize =
        BOARD_SIZE_PX / boardSize;

    const tileRow =
        Math.floor(index / boardSize);

    const tileCol =
        index % boardSize;

    const emptyRow =
        Math.floor(emptyIndex / boardSize);

    const emptyCol =
        emptyIndex % boardSize;

    const moveX =
        (emptyCol - tileCol)
        * tileSize;

    const moveY =
        (emptyRow - tileRow)
        * tileSize;

    moveSound.currentTime = 0;

    moveSound.play().catch(function () {
        /*
         * 効果音を再生できない場合でも
         * タイル移動は続ける
         */
    });

    tile.style.zIndex = "10";

    const slideAnimation =
        tile.animate(
            [
                {
                    transform:
                        "translate(0px, 0px)"
                },
                {
                    transform:
                        `translate(${moveX}px, ${moveY}px)`
                }
            ],
            {
                duration: 200,

                easing:
                    "cubic-bezier(0.22, 0.61, 0.36, 1)",

                fill: "forwards"
            }
        );

    slideAnimation.finished
        .then(function () {

            numbers[emptyIndex] =
                numbers[index];

            numbers[index] =
                null;

            moves++;

            updateMovesDisplay();

            isTileAnimating = false;

            draw();

            checkClear();

        })
        .catch(function () {

            isTileAnimating = false;

            draw();

        });

}





function setDifficulty(size) {

    selectSound.currentTime = 0;
    selectSound.play();

    clearPanel.classList.remove("show");

    document.getElementById(
        "clear-panel"
    ).style.display = "none";

    document.body.style.overflow = "";

    gameStarted = false;

    numberHintEnabled = false;

    updateNumberHintButton();

    numberHintButton.style.display =
        "none";

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

    updateMovesDisplay();

    updateTimerDisplay();

    updateDifficultyButtons();

    updateBestDisplay();

    draw();

    updateStartButtonState();

}










function cancelGame() {

    gameScreen.classList.remove(
        "game-playing"
    );

    cancelSound.currentTime = 0;

    cancelSound.play().catch(error => {
        console.log(
            "キャンセル音を再生できませんでした:",
            error
        );
    });


    stopGameBgm();

    gameStarted = false;

    numberHintEnabled = false;

    updateNumberHintButton();

    numberHintButton.style.display =
        "none";

    document.getElementById(
        "start-button"
    ).disabled = false;


    clearInterval(timer);

    moves = 0;
    seconds = 0;

    updateMovesDisplay();

    updateTimerDisplay();

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

    document.body.style.overflow = "";



    draw();

}








function setDifficultyButtonsDisabled(
    disabled
) {

    document
        .querySelectorAll(
            "#difficulty-container button"
        )
        .forEach(function (button) {

            button.disabled =
                disabled;

        });

    document
        .querySelectorAll(
            "#animal-mode-container button"
        )
        .forEach(function (button) {

            button.disabled =
                disabled;

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






let gameBgmFadeTimer = null;


function startGameBgm() {

    clearInterval(gameBgmFadeTimer);

    gameBgm.pause();
    gameBgm.currentTime = 0;
    gameBgm.volume = 0;

    if (
        !bgmEnabled ||
        bgmVolume === 0
    ) {
        return;
    }

    gameBgm.play().catch(error => {
        console.log(
            "プレイBGMを再生できませんでした:",
            error
        );
    });

    gameBgmFadeTimer = setInterval(function () {

        const fadeStep =
            Math.max(bgmVolume / 15, 0.001);

        const nextVolume =
            Math.min(
                gameBgm.volume + fadeStep,
                bgmVolume
            );

        gameBgm.volume =
            nextVolume;

        if (gameBgm.volume >= bgmVolume) {

            clearInterval(
                gameBgmFadeTimer
            );

        }

    }, 70);

}


function stopGameBgm() {

    clearInterval(gameBgmFadeTimer);

    gameBgm.pause();
    gameBgm.currentTime = 0;
    gameBgm.volume = 0;

}









function shuffle() {

    gameScreen.classList.add(
        "game-playing"
    );

    buttonSound.currentTime = 0;
    buttonSound.play();

    gameStarted = true;

    numberHintEnabled = false;

    updateNumberHintButton();

    startGameBgm();

    document.getElementById(
        "start-button"
    ).disabled = true;



    setDifficultyButtonsDisabled(true);

    isSolved = false;

    randomImage();

    createBoard();

    let previousEmptyIndex = -1;

    for (let i = 0; i < 100; i++) {

        const emptyIndex =
            numbers.indexOf(null);

        let validMoves =
            getValidMoves(emptyIndex);

        const movesWithoutBacktracking =
            validMoves.filter(
                function (moveIndex) {
                    return moveIndex !==
                        previousEmptyIndex;
                }
            );

        if (
            movesWithoutBacktracking.length > 0
        ) {
            validMoves =
                movesWithoutBacktracking;
        }

        const randomIndex =
            validMoves[
            Math.floor(
                Math.random()
                * validMoves.length
            )
            ];

        numbers[emptyIndex] =
            numbers[randomIndex];

        numbers[randomIndex] =
            null;

        previousEmptyIndex =
            emptyIndex;

    }

    const isStillSolved =
        numbers.every(
            function (number, index) {

                if (
                    index ===
                    numbers.length - 1
                ) {
                    return number === null;
                }

                return number === index + 1;

            }
        );

    if (isStillSolved) {

        const emptyIndex =
            numbers.indexOf(null);

        const validMoves =
            getValidMoves(emptyIndex);

        const randomIndex =
            validMoves[0];

        numbers[emptyIndex] =
            numbers[randomIndex];

        numbers[randomIndex] =
            null;

    }

    selected = null;
    moves = 0;
    seconds = 0;

    updateMovesDisplay();

    updateTimerDisplay();

    message.textContent = "";

    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);


    document.getElementById(
        "cancel-button"
    ).style.display = "inline-block";


    document.getElementById(
        "original-button"
    ).style.display = "inline-block";

    numberHintButton.style.display =
        "inline-block";

    draw();

}





function updateTimer() {

    seconds++;

    updateTimerDisplay();

}




function checkClear() {

    if (isSolved) {
        return;
    }

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

        numberHintEnabled = false;

        updateNumberHintButton();

        numberHintButton.style.display =
            "none";

        draw();

        clearInterval(timer);

        stopGameBgm();

        clearSound.pause();
        clearSound.currentTime = 0;

        clearSound.play().catch(function (error) {

            console.log(
                "クリア音を再生できませんでした:",
                error
            );

        });




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
            moves + "回";

        const clearMinutes =
            Math.floor(seconds / 60);

        const clearSeconds =
            seconds % 60;

        clearTime.textContent =
            String(clearMinutes).padStart(2, "0")
            + ":"
            + String(clearSeconds).padStart(2, "0");


        setTimeout(function () {

            clearPanel.classList.remove(
                "show"
            );

            clearPanel.style.display =
                "block";

            document.body.style.overflow =
                "hidden";

            void clearPanel.offsetWidth;

            clearPanel.classList.add(
                "show"
            );

            setDifficultyButtonsDisabled(
                false
            );

        }, 700);






    }

}









function startTitleBgm() {


    if (
        titleScreen.classList.contains(
            "title-fade-out"
        ) ||
        titleScreen.style.display === "none"
    ) {
        return;
    }


    if (
        !bgmEnabled ||
        bgmVolume === 0
    ) {

        titleBgmGuide.classList.add(
            "hidden"
        );

        return;

    }


    if (!titleBgm.paused) {
        return;
    }

    titleBgm.currentTime = 0;
    titleBgm.volume = bgmVolume;

    titleBgm.play()
        .then(function () {

            titleBgmGuide.classList.add(
                "hidden"
            );

            titleScreen.removeEventListener(
                "pointerdown",
                startTitleBgm
            );

            titleScreen.removeEventListener(
                "click",
                startTitleBgm
            );

        })
        .catch(function () {

            /*
             * 自動再生が拒否された場合は
             * イベントを残し、次のタップで再試行する
             */

        });

}





titleScreen.addEventListener(
    "pointerdown",
    startTitleBgm
);

titleScreen.addEventListener(
    "click",
    startTitleBgm
);






function startTitleGame(event) {

    event.stopPropagation();

    titleScreen.removeEventListener(
        "pointerdown",
        startTitleBgm
    );

    titleScreen.removeEventListener(
        "click",
        startTitleBgm
    );


    titleBgm.pause();
    titleBgm.currentTime = 0;

    titleStartSound.currentTime = 0;

    titleStartSound.play().catch(error => {
        console.log(
            "タイトル開始音を再生できませんでした:",
            error
        );
    });

    titleScreen.classList.add(
        "title-fade-out"
    );

    setTimeout(function () {

        titleScreen.style.display = "none";

        document.getElementById(
            "game-screen"
        ).style.display = "block";

    }, 1000);

}








window.addEventListener(
    "resize",
    function () {

        BOARD_SIZE_PX =
            calculateBoardSize();

        draw();

    }
);


createBoard();
updateBestDisplay();
draw();


titleBgm.muted =
    !bgmEnabled;

gameBgm.muted =
    !bgmEnabled;

soundEffects.forEach(function (sound) {

    sound.muted =
        !soundEffectsEnabled;

});

applyBgmVolume();
applySoundEffectsVolume();

const bgmVolumeSlider =
    document.getElementById(
        "bgm-volume"
    );

const seVolumeSlider =
    document.getElementById(
        "se-volume"
    );

bgmVolumeSlider.value =
    Math.round(bgmVolume * 100);

seVolumeSlider.value =
    Math.round(
        soundEffectsVolume * 100
    );

document.getElementById(
    "bgm-volume-value"
).textContent =
    Math.round(bgmVolume * 100)
    + "%";

document.getElementById(
    "se-volume-value"
).textContent =
    Math.round(
        soundEffectsVolume * 100
    )
    + "%";

updateSoundButtons();

applyLanguage();

if (!bgmEnabled) {

    titleBgmGuide.classList.add(
        "hidden"
    );

}

updateNumberHintButton();

updateStartButtonState();

numberHintButton.style.display =
    "none";




