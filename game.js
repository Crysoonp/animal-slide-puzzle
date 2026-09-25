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
const rowShararanSound =
    new Audio("sounds/row_shararan.wav");
rowShararanSound.volume = 0.58;
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
        basicHint:
            "基本ヒント",
        hintStep:
            "ヒント {current} / {total}",
        nextHint:
            "次のヒント",
        on:
            "ON",
        off:
            "OFF",
        bgm:
            "BGM",
        bgmVolume:
            "BGM音量",
        soundEffects:
            "効果音",
        haptics:
            "振動",
        soundVolume:
            "効果音量",
        resetFewestMoves:
            "最少移動回数をリセット",
        resetBestTime:
            "最短時間をリセット",
        resetAllRecords:
            "全記録をリセット",
        close:
            "閉じる",
        confirmResetFewestMoves:
            "{difficulty}の最少移動回数をリセットしますか？",
        confirmResetBestTime:
            "{difficulty}の最短時間をリセットしますか？",
        confirmResetAllRecords:
            "すべての難易度の最少移動回数と最短時間をリセットしますか？",
        clearMovesLabel:
            "移動回数",
        clearTimeLabel:
            "クリア時間",
        playAgain:
            "もう一回遊ぶ",
        moveCountSuffix:
            "回",
        titleBgmGuide:
            "🔊 画面をタップするとBGMが流れます",
        originalTitle:
            "完成図",
        originalClose:
            "閉じる",
        originalImageAlt:
            "パズルの完成図"
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
        basicHint:
            "Basic Hint",
        hintStep:
            "Hint {current} / {total}",
        nextHint:
            "Next Hint",
        on:
            "ON",
        off:
            "OFF",
        bgm:
            "BGM",
        bgmVolume:
            "BGM Volume",
        soundEffects:
            "Sound Effects",
        haptics:
            "Vibration",
        soundVolume:
            "Sound Volume",
        resetFewestMoves:
            "Reset Fewest Moves",
        resetBestTime:
            "Reset Best Time",
        resetAllRecords:
            "Reset All Records",
        close:
            "Close",
        confirmResetFewestMoves:
            "Reset the fewest moves record for {difficulty}?",
        confirmResetBestTime:
            "Reset the best time record for {difficulty}?",
        confirmResetAllRecords:
            "Reset all records for every difficulty?",
        clearMovesLabel:
            "Moves",
        clearTimeLabel:
            "Clear Time",
        playAgain:
            "Play Again",
        moveCountSuffix:
            "",
        titleBgmGuide:
            "🔊 Tap the screen to play BGM",
        originalTitle:
            "Full Image",
        originalClose:
            "Close",
        originalImageAlt:
            "Completed puzzle image"
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
let hapticsEnabled =
    localStorage.getItem("hapticsEnabled") !== "false";
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
    rowShararanSound,
    buttonSound,
    titleStartSound,
    cancelSound
];
let audioContext = null;
let bgmMasterGain = null;
let soundEffectsMasterGain = null;
let gameBgmFadeGain = null;
let audioGraphInitialized = false;
const soundEffectBuffers = new Map();
let soundEffectLoadPromise = null;
const soundEffectFiles = new Map([
    [moveSound, "sounds/move.mp3"],
    [clearSound, "sounds/clear_fanfare.mp3"],
    [selectSound, "sounds/select_difficulty.mp3"],
    [rowShararanSound, "sounds/row_shararan.wav"],
    [buttonSound, "sounds/selection_sound.mp3"],
    [titleStartSound, "sounds/title_start.mp3"],
    [cancelSound, "sounds/cancel.mp3"]
]);
function loadSoundEffectBuffers() {
    if (!audioContext) {
        return Promise.resolve();
    }
    if (soundEffectLoadPromise) {
        return soundEffectLoadPromise;
    }
    soundEffectLoadPromise = Promise.all(
        Array.from(soundEffectFiles.entries()).map(
            async function ([sound, filePath]) {
                try {
                    const response = await fetch(filePath);
                    if (!response.ok) {
                        throw new Error(
                            "HTTP " + response.status
                        );
                    }
                    const arrayBuffer =
                        await response.arrayBuffer();
                    const audioBuffer =
                        await audioContext.decodeAudioData(
                            arrayBuffer
                        );
                    soundEffectBuffers.set(
                        sound,
                        audioBuffer
                    );
                } catch (error) {
                    console.log(
                        "効果音の読み込みをスキップしました:",
                        filePath,
                        error
                    );
                }
            }
        )
    );
    return soundEffectLoadPromise;
}
function playSoundEffect(sound) {
    initializeAudioGraph();
    if (!soundEffectsEnabled || soundEffectsVolume <= 0) {
        return Promise.resolve();
    }
    if (
        audioContext
        && audioContext.state === "suspended"
    ) {
        audioContext.resume().catch(function () { });
    }
    const buffer = soundEffectBuffers.get(sound);
    if (
        audioGraphInitialized
        && audioContext
        && soundEffectsMasterGain
        && buffer
    ) {
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(soundEffectsMasterGain);
        source.start(0);
        return Promise.resolve();
    }
    return loadSoundEffectBuffers().then(function () {
        const loadedBuffer = soundEffectBuffers.get(sound);
        if (
            loadedBuffer
            && audioContext
            && soundEffectsMasterGain
        ) {
            const source = audioContext.createBufferSource();
            source.buffer = loadedBuffer;
            source.connect(soundEffectsMasterGain);
            source.start(0);
            return;
        }
        sound.volume = soundEffectsVolume;
        sound.muted = !soundEffectsEnabled;
        sound.currentTime = 0;
        return sound.play();
    }).catch(function (error) {
        console.error("効果音再生エラー:", error);
        /* 効果音が鳴らなくてもゲーム処理は続ける */
    });
}
function isNativeCapacitorApp() {
    if (
        window.Capacitor &&
        typeof window.Capacitor.isNativePlatform === "function" &&
        window.Capacitor.isNativePlatform()
    ) {
        return true;
    }
    return (
        window.location.hostname === "localhost" &&
        /Android/i.test(navigator.userAgent)
    );
}
function triggerMoveHaptic() {
    if (!hapticsEnabled || !isNativeCapacitorApp()) {
        return;
    }
    const haptics =
        window.Capacitor &&
        window.Capacitor.Plugins &&
        window.Capacitor.Plugins.Haptics;
    if (!haptics || typeof haptics.impact !== "function") {
        return;
    }
    haptics.impact({ style: "LIGHT" }).catch(function () {
        // 触覚を利用できない端末でもゲームは継続する
    });
}
function initializeAudioGraph() {
    if (isNativeCapacitorApp()) {
        return;
    }
    if (audioGraphInitialized) {
        if (audioContext && audioContext.state === "suspended") {
            audioContext.resume().catch(function () { });
        }
        return;
    }
    const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
        return;
    }
    try {
        audioContext = new AudioContextClass();
        bgmMasterGain = audioContext.createGain();
        soundEffectsMasterGain = audioContext.createGain();
        gameBgmFadeGain = audioContext.createGain();
        const gameBgmSource =
            audioContext.createMediaElementSource(gameBgm);
        gameBgmSource.connect(gameBgmFadeGain);
        gameBgmFadeGain.connect(bgmMasterGain);
        bgmMasterGain.connect(audioContext.destination);
        soundEffectsMasterGain.connect(
            audioContext.destination
        );
        soundEffects.forEach(function (sound) {
            sound.volume = soundEffectsVolume;
            sound.muted = !soundEffectsEnabled;
        });
        loadSoundEffectBuffers();
        titleBgm.volume = 1;
        titleBgm.muted = false;
        gameBgm.volume = 1;
        gameBgm.muted = false;
        gameBgmFadeGain.gain.value = 0;
        audioGraphInitialized = true;
        applyBgmVolume();
        applySoundEffectsVolume();
        if (audioContext.state === "suspended") {
            audioContext.resume().catch(function () { });
        }
    } catch (error) {
        console.log("Web Audio APIを初期化できませんでした:", error);
        audioContext = null;
        bgmMasterGain = null;
        soundEffectsMasterGain = null;
        gameBgmFadeGain = null;
        audioGraphInitialized = false;
    }
}
function applyBgmVolume() {
    const actualVolume = bgmEnabled ? bgmVolume : 0;
    titleBgm.volume = actualVolume;
    if (audioGraphInitialized && bgmMasterGain) {
        bgmMasterGain.gain.value = actualVolume;
        gameBgm.volume = 1;
        return;
    }
    titleBgm.volume = actualVolume;
    if (gameBgm.paused || !gameStarted || isSolved) {
        gameBgm.volume = 0;
    } else {
        gameBgm.volume = actualVolume;
    }
}
function applySoundEffectsVolume() {
    const actualVolume =
        soundEffectsEnabled ? soundEffectsVolume : 0;
    if (audioGraphInitialized && soundEffectsMasterGain) {
        soundEffectsMasterGain.gain.value = actualVolume;
        soundEffects.forEach(function (sound) {
            sound.volume = 1;
            sound.muted = false;
        });
        return;
    }
    soundEffects.forEach(function (sound) {
        sound.volume = actualVolume;
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
    const basicHintButton =
        document.getElementById(
            "basic-hint-button"
        );
    const basicHintTitle =
        document.getElementById(
            "basic-hint-title"
        );
    const basicHintNextButton =
        document.getElementById(
            "basic-hint-next-button"
        );
    const basicHintCloseButton =
        document.getElementById(
            "basic-hint-close-button"
        );
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
    if (basicHintButton) {
        basicHintButton.textContent =
            "💡 " + text.basicHint;
    }
    if (basicHintTitle) {
        basicHintTitle.textContent =
            "💡 " + text.basicHint;
    }
    if (basicHintNextButton) {
        basicHintNextButton.textContent =
            text.nextHint;
    }
    if (basicHintCloseButton) {
        basicHintCloseButton.textContent =
            text.close;
    }
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
    const bgmVolumeLabel =
        document.getElementById(
            "bgm-volume-label"
        );
    const soundVolumeLabel =
        document.getElementById(
            "se-volume-label"
        );
    const resetBestScoreButton =
        document.getElementById(
            "reset-best-score-button"
        );
    const resetBestTimeButton =
        document.getElementById(
            "reset-best-time-button"
        );
    const resetAllRecordsButton =
        document.getElementById(
            "reset-all-records-button"
        );
    const settingsCloseButton =
        document.getElementById(
            "settings-close-button"
        );
    if (bgmVolumeLabel) {
        bgmVolumeLabel.textContent =
            text.bgmVolume;
    }
    if (soundVolumeLabel) {
        soundVolumeLabel.textContent =
            text.soundVolume;
    }
    if (resetBestScoreButton) {
        resetBestScoreButton.textContent =
            text.resetFewestMoves;
    }
    if (resetBestTimeButton) {
        resetBestTimeButton.textContent =
            text.resetBestTime;
    }
    if (resetAllRecordsButton) {
        resetAllRecordsButton.textContent =
            text.resetAllRecords;
    }
    if (settingsCloseButton) {
        settingsCloseButton.textContent =
            text.close;
    }
    const originalTitleText =
        document.getElementById(
            "original-title-text"
        );
    const originalCloseButton =
        document.getElementById(
            "original-close-button"
        );
    if (titleBgmGuide) {
        titleBgmGuide.textContent =
            text.titleBgmGuide;
    }
    if (originalTitleText) {
        originalTitleText.textContent =
            text.originalTitle;
    }
    if (originalCloseButton) {
        originalCloseButton.textContent =
            text.originalClose;
    }
    if (originalImage) {
        originalImage.alt =
            text.originalImageAlt;
    }
    const clearMovesLabel =
        document.getElementById(
            "clear-moves-label"
        );
    const clearTimeLabel =
        document.getElementById(
            "clear-time-label"
        );
    const clearReplayButton =
        document.getElementById(
            "clear-replay-button"
        );
    if (clearMovesLabel) {
        clearMovesLabel.textContent =
            "🎯 " + text.clearMovesLabel;
    }
    if (clearTimeLabel) {
        clearTimeLabel.textContent =
            "⏱ " + text.clearTimeLabel;
    }
    if (clearReplayButton) {
        clearReplayButton.textContent =
            "↻ " + text.playAgain;
    }
    updateSoundButtons();
    updateMovesDisplay();
    updateTimerDisplay();
    updateBestDisplay();
    updateNumberHintButton();
    updateBasicHintDisplay();
    updateClearResultDisplay();
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
    playSoundEffect(buttonSound).catch(
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
    const hapticsButton =
        document.getElementById(
            "haptics-toggle-button"
        );
    if (bgmButton) {
        bgmButton.textContent =
            (
                bgmEnabled
                    ? "🎵 "
                    : "🔇 "
            )
            + getText("bgm")
            + ": "
            + getText(
                bgmEnabled
                    ? "on"
                    : "off"
            );
    }
    if (seButton) {
        seButton.textContent =
            (
                soundEffectsEnabled
                    ? "🔊 "
                    : "🔇 "
            )
            + getText("soundEffects")
            + ": "
            + getText(
                soundEffectsEnabled
                    ? "on"
                    : "off"
            );
    }
    if (hapticsButton) {
        hapticsButton.textContent =
            "📳 "
            + getText("haptics")
            + ": "
            + getText(
                hapticsEnabled
                    ? "on"
                    : "off"
            );
        hapticsButton.setAttribute(
            "aria-pressed",
            String(hapticsEnabled)
        );
    }
}
function changeBgmVolume(value) {
    const volumeNumber = Number(value);
    bgmVolume = volumeNumber / 100;
    localStorage.setItem("bgmVolume", volumeNumber);
    document.getElementById("bgm-volume-value").textContent =
        volumeNumber + "%";
    initializeAudioGraph();
    applyBgmVolume();
}
function changeSoundEffectsVolume(value) {
    const volumeNumber = Number(value);
    soundEffectsVolume = volumeNumber / 100;
    localStorage.setItem("soundEffectsVolume", volumeNumber);
    document.getElementById("se-volume-value").textContent =
        volumeNumber + "%";
    initializeAudioGraph();
    applySoundEffectsVolume();
}
function toggleBgm() {
    initializeAudioGraph();
    bgmEnabled = !bgmEnabled;
    localStorage.setItem("bgmEnabled", bgmEnabled);
    applyBgmVolume();
    if (!bgmEnabled) {
        stopGameBgm();
        titleBgm.pause();
    } else if (gameStarted && !isSolved) {
        startGameBgm();
    }
    updateSoundButtons();
}
function toggleSoundEffects() {
    initializeAudioGraph();
    soundEffectsEnabled = !soundEffectsEnabled;
    localStorage.setItem("soundEffectsEnabled", soundEffectsEnabled);
    applySoundEffectsVolume();
    updateSoundButtons();
}
function toggleHaptics() {
    hapticsEnabled = !hapticsEnabled;
    localStorage.setItem("hapticsEnabled", hapticsEnabled);
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
    playSoundEffect(buttonSound).catch(function () {
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
    const difficultyKeys = {
        3: "difficultyEasy",
        4: "difficultyNormal",
        5: "difficultyHard",
        6: "difficultyExpert"
    };
    return getText(
        difficultyKeys[boardSize]
    );
}
function resetBestScore() {
    const confirmMessage =
        getText(
            "confirmResetFewestMoves"
        ).replace(
            "{difficulty}",
            getDifficultyName()
        );
    if (
        confirm(
            confirmMessage
        )
    ) {
        localStorage.removeItem(
            "bestScore_" + boardSize
        );
        updateBestDisplay();
    }
}
function resetBestTime() {
    const confirmMessage =
        getText(
            "confirmResetBestTime"
        ).replace(
            "{difficulty}",
            getDifficultyName()
        );
    if (
        confirm(
            confirmMessage
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
            getText(
                "confirmResetAllRecords"
            )
        )
    ) {
        [3, 4, 5, 6].forEach(
            function (size) {
                localStorage.removeItem(
                    "bestScore_" + size
                );
                localStorage.removeItem(
                    "bestTime_" + size
                );
            }
        );
        updateBestDisplay();
    }
}
function closeClearPanel() {
    stopClearCelebration();
    gameScreen.classList.remove(
        "game-playing"
    );
    buttonSound.currentTime = 0;
    playSoundEffect(buttonSound);
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
    basicHintButton.style.display =
        "none";
}
function playAgain() {
    stopClearCelebration();
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
const basicHintButton =
    document.getElementById(
        "basic-hint-button"
    );
const basicHintContainer =
    document.getElementById(
        "basic-hint-container"
    );
let currentBasicHintIndex = 0;
const basicHints = {
    ja: {
        3: [
            "空白マスの周りを小さく回すように動かすと、目的のタイルを運びやすくなります。",
            "まず上の段を左から揃え、完成した部分をなるべく崩さないように進めましょう。",
            "上の段を揃えたら、最後は右下の2×2の範囲を使います。盤面上では5・6・8・9の位置です。空白マスをくるくる回すように動かして、残ったタイルを揃えましょう。"
        ],
        4: [
            "最初は上の段から揃えます。1と2を先に置き、3と4は2枚を組み合わせて揃えましょう。",
            "右端のタイルを1枚だけ先に固定すると詰まりやすいため、最後の2枚は縦に準備してから入れます。",
            "最後の2段は、上だけを固定せず、残った8枚を回すように動かしましょう。"
        ],
        5: [
            "まず一番上の段を左から順番に揃えます。一度に盤面全体を考えず、完成させる範囲を一段ずつ区切ると進めやすくなります。",
            "各段の最後の2枚は、1枚ずつ完成位置へ入れようとすると詰まりやすくなります。2枚を近くに集め、縦に並べてから空白マスを回すように動かして配置しましょう。",
            "完成した段は、できるだけ作業場所に使わないようにします。次の段へ進む前に、空白マスを未完成の範囲へ戻せるか確認しましょう。"
        ],
        6: [
            "6×6は盤面が広いため、全体を一度に追わず、一番上の段など小さな範囲へ分けて進めます。今どの段を完成させるか、一つだけ目標を決めましょう。",
            "各段の最後の2枚はセットで扱います。2枚を作業場所へ集めて縦に準備し、空白マスを回すように動かして正しい並びへ入れましょう。",
            "完成済みの段を崩すと戻す手数が増えます。次の作業へ移る前に、未完成の範囲だけを通って空白マスを運べる経路を作りましょう。"
        ]
    },
    en: {
        3: [
            "Move the empty space in a small loop to guide a tile toward its target.",
            "Build the top row from left to right and avoid breaking completed sections.",
            "After completing the top row, use the lower-right 2×2 area. These are board positions 5, 6, 8, and 9. Move the empty space in a loop to arrange the remaining tiles."
        ],
        4: [
            "Start with the top row. Place 1 and 2 first, then prepare 3 and 4 as a pair.",
            "Do not lock the final tile of a row too early. Prepare the last two tiles vertically, then rotate them into place.",
            "For the final two rows, rotate all eight remaining tiles instead of fixing one row too soon."
        ],
        5: [
            "Complete the top row from left to right. Divide the board into rows instead of trying to solve the entire board at once.",
            "The final two tiles of a row can become trapped if placed separately. Bring the pair together, prepare them vertically, then move the empty space around them.",
            "Avoid using a completed row as your work area. Before starting the next row, make sure the empty space can return to the unfinished area."
        ],
        6: [
            "A 6×6 board is large, so divide it into smaller goals. Focus on one row, such as the top row, instead of tracking the entire board.",
            "Treat the final two tiles of each row as a pair. Gather them in the work area, prepare them vertically, then move the empty space around them.",
            "Breaking a completed row adds many recovery moves. Before continuing, create a route that carries the empty space through unfinished areas only."
        ]
    }
};
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
    playSoundEffect(buttonSound);
    if (
        !gameStarted ||
        isSolved
    ) {
        return;
    }
    numberHintEnabled =
        !numberHintEnabled;
    localStorage.setItem(
        "numberHintEnabled",
        String(numberHintEnabled)
    );
    updateNumberHintButton();
    draw();
}

function getCurrentBasicHints() {
    const languageHints =
        basicHints[currentLanguage]
        || basicHints.ja;
    return languageHints[boardSize]
        || languageHints[3];
}

/* Ver.1.6 hint revision 1 */
function updateBasicHintDisplay() {
    const hintText =
        document.getElementById(
            "basic-hint-text"
        );
    const hintStep =
        document.getElementById(
            "basic-hint-step"
        );
    const hintTitle =
        document.getElementById(
            "basic-hint-title"
        );
    if (!hintText || !hintStep) {
        return;
    }
    const difficultyName =
        getDifficultyName();
    if (basicHintButton) {
        basicHintButton.textContent =
            "💡 " + difficultyName +
            (currentLanguage === "en"
                ? " Hint"
                : "ヒント");
    }
    if (hintTitle) {
        hintTitle.textContent =
            "💡 " + difficultyName + " " +
            boardSize + "×" + boardSize +
            (currentLanguage === "en"
                ? " Basic Hints"
                : "の基本ヒント");
    }
    const hints = getCurrentBasicHints();
    currentBasicHintIndex =
        Math.min(
            currentBasicHintIndex,
            hints.length - 1
        );
    hintText.textContent =
        hints[currentBasicHintIndex];
    hintStep.textContent =
        getText("hintStep")
            .replace(
                "{current}",
                String(currentBasicHintIndex + 1)
            )
            .replace(
                "{total}",
                String(hints.length)
            );
}

function openBasicHint() {
    if (!gameStarted || isSolved) {
        return;
    }
    buttonSound.currentTime = 0;
    playSoundEffect(buttonSound);
    currentBasicHintIndex = 0;
    updateBasicHintDisplay();
    basicHintContainer.style.display =
        "flex";
    document.body.style.overflow =
        "hidden";
}

function showNextBasicHint() {
    buttonSound.currentTime = 0;
    playSoundEffect(buttonSound);
    const hints = getCurrentBasicHints();
    currentBasicHintIndex =
        (currentBasicHintIndex + 1)
        % hints.length;
    updateBasicHintDisplay();
}

function closeBasicHint() {
    buttonSound.currentTime = 0;
    playSoundEffect(buttonSound);
    basicHintContainer.style.display =
        "none";
    document.body.style.overflow = "";
}

basicHintContainer.addEventListener(
    "click",
    function (event) {
        if (event.target === basicHintContainer) {
            closeBasicHint();
        }
    }
);
function toggleOriginal() {
    buttonSound.currentTime = 0;
    playSoundEffect(buttonSound);
    originalContainer.style.display =
        "flex";
    document.body.style.overflow =
        "hidden";
}
function closeOriginal() {
    buttonSound.currentTime = 0;
    playSoundEffect(buttonSound);
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
    playSoundEffect(buttonSound).catch(
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
function updateClearResultDisplay() {
    if (!clearMoves || !clearTime) {
        return;
    }
    clearMoves.textContent =
        moves + getText("moveCountSuffix");
    clearTime.textContent =
        formatTime(seconds);
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
let numberHintEnabled =
    localStorage.getItem(
        "numberHintEnabled"
    ) === "true";
let isTileAnimating = false;

/* ========================================
   Ver.1.6 row completion revision 2
======================================== */
let celebratedCompletedRows = new Set();
let rowCelebrationTimers = [];

function stopRowCompletionCelebration() {
    rowCelebrationTimers.forEach(function (timerId) {
        clearTimeout(timerId);
    });
    rowCelebrationTimers = [];
}

function getCompletedRows() {
    const completedRows = [];
    for (let row = 0; row < boardSize; row++) {
        let rowIsComplete = true;
        for (let column = 0; column < boardSize; column++) {
            const index = row * boardSize + column;
            const expectedNumber = index + 1;
            if (
                index === numbers.length - 1
                || numbers[index] !== expectedNumber
            ) {
                rowIsComplete = false;
                break;
            }
        }
        if (rowIsComplete) {
            completedRows.push(row);
        }
    }
    return completedRows;
}

function isBoardCurrentlySolved() {
    return numbers.every(function (number, index) {
        if (index === numbers.length - 1) {
            return number === null;
        }
        return number === index + 1;
    });
}

function rememberRowsCompletedAtStart() {
    stopRowCompletionCelebration();
    celebratedCompletedRows = new Set(
        getCompletedRows()
    );
}

function findNewlyCompletedRows() {
    const newlyCompletedRows = [];
    getCompletedRows().forEach(function (row) {
        if (!celebratedCompletedRows.has(row)) {
            celebratedCompletedRows.add(row);
            newlyCompletedRows.push(row);
        }
    });
    return newlyCompletedRows;
}

/* Ver.1.6 paw shararan revision 3 */
function createRowShararanParticle(
    tile,
    symbol,
    color,
    delay,
    offsetX,
    offsetY
) {
    const particle =
        document.createElement("span");
    particle.className =
        symbol === "🐾"
            ? "row-paw-particle"
            : "row-star-particle";
    particle.textContent = symbol;
    particle.style.color = color;
    particle.style.left =
        "calc(50% + " + offsetX + "px)";
    particle.style.top =
        "calc(50% + " + offsetY + "px)";
    particle.style.animationDelay =
        delay + "ms";
    tile.appendChild(particle);
    const cleanupTimer = setTimeout(function () {
        particle.remove();
    }, 1150 + delay);
    rowCelebrationTimers.push(cleanupTimer);
}

function createRowShineTrail(row, delay) {
    const firstIndex = row * boardSize;
    const lastIndex = firstIndex + boardSize - 1;
    const firstTile = game.children[firstIndex];
    const lastTile = game.children[lastIndex];
    if (!firstTile || !lastTile) {
        return;
    }
    const gameRect = game.getBoundingClientRect();
    const firstRect = firstTile.getBoundingClientRect();
    const lastRect = lastTile.getBoundingClientRect();
    const trail = document.createElement("div");
    trail.className = "row-shararan-trail";
    trail.style.left =
        (firstRect.left - gameRect.left) + "px";
    trail.style.top =
        (firstRect.top - gameRect.top) + "px";
    trail.style.width =
        (lastRect.right - firstRect.left) + "px";
    trail.style.height = firstRect.height + "px";
    trail.style.animationDelay = delay + "ms";
    game.appendChild(trail);
    const cleanupTimer = setTimeout(function () {
        trail.remove();
    }, 1250 + delay);
    rowCelebrationTimers.push(cleanupTimer);
}

function playRowCompletionCelebration(rows) {
    if (
        rows.length === 0
        || isSolved
        || isBoardCurrentlySolved()
    ) {
        return;
    }

    const sparkleColors = [
        "#fff3a6",
        "#bff5dc",
        "#bfe8ff",
        "#ffd0e1",
        "#dfd0ff"
    ];

    rows.forEach(function (row, rowOffset) {
        const rowStartDelay = rowOffset * 240;
        const soundTimer = setTimeout(function () {
            rowShararanSound.currentTime = 0;
            playSoundEffect(rowShararanSound)
                .catch(function () { });
            triggerMoveHaptic();
        }, rowStartDelay + 65);
        rowCelebrationTimers.push(soundTimer);

        createRowShineTrail(row, rowStartDelay);

        for (let column = 0; column < boardSize; column++) {
            const tileIndex = row * boardSize + column;
            const tileTimer = setTimeout(function () {
                const tile = game.children[tileIndex];
                if (!tile || isSolved) {
                    return;
                }
                tile.classList.remove(
                    "row-complete-sparkle",
                    "row-paw-shararan"
                );
                void tile.offsetWidth;
                tile.classList.add(
                    "row-paw-shararan"
                );
                const color = sparkleColors[
                    column % sparkleColors.length
                ];
                createRowShararanParticle(
                    tile,
                    column === boardSize - 1
                        ? "🐾"
                        : "✦",
                    color,
                    0,
                    -8 + (column % 3) * 8,
                    -4 - (column % 2) * 7
                );
                createRowShararanParticle(
                    tile,
                    "✧",
                    sparkleColors[
                        (column + 2)
                        % sparkleColors.length
                    ],
                    70,
                    9 - (column % 2) * 5,
                    8
                );
                const cleanupTimer = setTimeout(function () {
                    tile.classList.remove(
                        "row-paw-shararan"
                    );
                }, 820);
                rowCelebrationTimers.push(cleanupTimer);
            }, rowStartDelay + column * 105);
            rowCelebrationTimers.push(tileTimer);
        }
    });
}

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
            gameStarted &&
            numberHintEnabled &&
            num !== null &&
            !isSolved
        ) {
            const numberBadge =
                document.createElement("span");
            numberBadge.className =
                "tile-number number-hint-size-"
                + boardSize;
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
        const isMovable =
            gameStarted &&
            !isSolved &&
            validMoves.includes(index);
        if (isMovable) {
            tile.classList.add("movable");
            tile.style.touchAction = "none";
            tile.style.userSelect = "none";
            tile.style.webkitUserSelect = "none";
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
        if (!isSolved && isMovable) {
            addTilePointerControls(
                tile,
                index,
                emptyIndex,
                tileSize
            );
        }
        game.appendChild(tile);
    });
}
function addTilePointerControls(
    tile,
    index,
    emptyIndex,
    tileSize
) {
    let activePointerId = null;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let currentX = 0;
    let currentY = 0;
    let currentScaleX = 1;
    let currentScaleY = 1;
    let hasDragged = false;
    let pressAnimation = null;
    const tileRow =
        Math.floor(index / boardSize);
    const tileCol =
        index % boardSize;
    const emptyRow =
        Math.floor(emptyIndex / boardSize);
    const emptyCol =
        emptyIndex % boardSize;
    const axis =
        tileRow === emptyRow ? "x" : "y";
    const direction =
        axis === "x"
            ? Math.sign(emptyCol - tileCol)
            : Math.sign(emptyRow - tileRow);
    function updatePuniShape(progress) {
        const easedProgress =
            Math.sin(Math.min(1, progress) * Math.PI / 2);
        const stretch = 0.055 * easedProgress;
        const squeeze = 0.04 * easedProgress;
        if (axis === "x") {
            currentScaleX = 1.035 + stretch;
            currentScaleY = 1.025 - squeeze;
        } else {
            currentScaleX = 1.025 - squeeze;
            currentScaleY = 1.035 + stretch;
        }
    }
    function releasePointer(event) {
        if (
            tile.hasPointerCapture &&
            tile.hasPointerCapture(event.pointerId)
        ) {
            tile.releasePointerCapture(event.pointerId);
        }
        activePointerId = null;
    }
    function cancelPressAnimation() {
        if (pressAnimation) {
            pressAnimation.cancel();
            pressAnimation = null;
        }
    }
    function resetLiftStyles() {
        cancelPressAnimation();
        tile.style.willChange = "";
        tile.style.filter = "";
        tile.style.borderRadius = "";
    }
    function animateBack(event) {
        isTileAnimating = true;
        const returnAnimation = tile.animate(
            [
                {
                    transform:
                        `translate(${currentX}px, ${currentY}px) scale(${currentScaleX}, ${currentScaleY})`,
                    filter:
                        "drop-shadow(0 8px 8px rgba(0, 0, 0, 0.24))"
                },
                {
                    transform:
                        "translate(0px, 0px) scale(1)",
                    filter:
                        "drop-shadow(0 0 0 rgba(0, 0, 0, 0))"
                }
            ],
            {
                duration: 150,
                easing:
                    "cubic-bezier(0.22, 0.61, 0.36, 1)"
            }
        );
        returnAnimation.finished
            .catch(function () { })
            .finally(function () {
                releasePointer(event);
                resetLiftStyles();
                isTileAnimating = false;
                draw();
            });
    }
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
            event.preventDefault();
            activePointerId = event.pointerId;
            pointerStartX = event.clientX;
            pointerStartY = event.clientY;
            currentX = 0;
            currentY = 0;
            currentScaleX =
                axis === "x" ? 0.975 : 1.065;
            currentScaleY =
                axis === "y" ? 0.975 : 1.065;
            hasDragged = false;
            tile.setPointerCapture(event.pointerId);
            tile.style.zIndex = "20";
            tile.style.willChange =
                "transform, filter, border-radius";
            tile.style.borderRadius = "12px";
            pressAnimation = tile.animate(
                [
                    {
                        transform:
                            "translate(0px, 0px) scale(1)",
                        filter:
                            "brightness(1) saturate(1) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.12))"
                    },
                    {
                        transform:
                            "translate(0px, 2px) scale(1.075, 0.94)",
                        filter:
                            "brightness(1.035) saturate(1.02) drop-shadow(0 2px 3px rgba(0, 0, 0, 0.16))",
                        offset: 0.46
                    },
                    {
                        transform:
                            `translate(0px, 0px) scale(${currentScaleX}, ${currentScaleY})`,
                        filter:
                            "brightness(1.07) saturate(1.045) drop-shadow(0 9px 9px rgba(0, 0, 0, 0.26))"
                    }
                ],
                {
                    duration: 115,
                    easing:
                        "cubic-bezier(0.2, 0.8, 0.25, 1)",
                    fill: "forwards"
                }
            );
        }
    );
    tile.addEventListener(
        "pointermove",
        function (event) {
            if (
                activePointerId === null ||
                event.pointerId !== activePointerId ||
                isTileAnimating
            ) {
                return;
            }
            event.preventDefault();
            const rawX =
                event.clientX - pointerStartX;
            const rawY =
                event.clientY - pointerStartY;
            const axisDistance =
                axis === "x" ? rawX : rawY;
            const directedDistance =
                Math.max(
                    0,
                    Math.min(
                        tileSize,
                        axisDistance * direction
                    )
                );
            currentX =
                axis === "x"
                    ? directedDistance * direction
                    : 0;
            currentY =
                axis === "y"
                    ? directedDistance * direction
                    : 0;
            if (
                Math.abs(rawX) >= 6 ||
                Math.abs(rawY) >= 6
            ) {
                hasDragged = true;
            }
            updatePuniShape(
                directedDistance / tileSize
            );
            cancelPressAnimation();
            tile.style.filter =
                "brightness(1.07) saturate(1.045) drop-shadow(0 9px 9px rgba(0, 0, 0, 0.26))";
            tile.style.transform =
                `translate(${currentX}px, ${currentY}px) scale(${currentScaleX}, ${currentScaleY})`;
        }
    );
    tile.addEventListener(
        "pointerup",
        function (event) {
            if (
                activePointerId === null ||
                event.pointerId !== activePointerId ||
                isTileAnimating
            ) {
                return;
            }
            event.preventDefault();
            const travelled =
                axis === "x"
                    ? Math.abs(currentX)
                    : Math.abs(currentY);
            const commitDistance =
                Math.max(
                    24,
                    Math.min(42, tileSize * 0.35)
                );
            if (!hasDragged) {
                releasePointer(event);
                resetLiftStyles();
                tile.style.transform = "";
                moveTile(index);
                return;
            }
            if (travelled >= commitDistance) {
                releasePointer(event);
                resetLiftStyles();
                completeTileMove(
                    index,
                    tile,
                    currentX,
                    currentY
                );
                return;
            }
            animateBack(event);
        }
    );
    tile.addEventListener(
        "pointercancel",
        function (event) {
            if (
                activePointerId === null ||
                event.pointerId !== activePointerId
            ) {
                return;
            }
            if (isTileAnimating) {
                releasePointer(event);
                return;
            }
            animateBack(event);
        }
    );
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
    completeTileMove(
        index,
        tile,
        0,
        0
    );
}
function completeTileMove(
    index,
    tile,
    startX,
    startY
) {
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
        tile.style.transform = "";
        tile.style.filter = "";
        tile.style.willChange = "";
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
    const remainingDistance =
        Math.hypot(
            moveX - startX,
            moveY - startY
        );
    const duration =
        Math.max(
            80,
            Math.min(
                200,
                200 * remainingDistance / tileSize
            )
        );
    moveSound.currentTime = 0;
    playSoundEffect(moveSound).catch(function () {
        /*
         * 効果音を再生できない場合でも
         * タイル移動は続ける
         */
    });
    tile.style.zIndex = "20";
    tile.style.willChange = "transform, filter";
    let impactHapticTriggered = false;
    const impactHapticTimer = setTimeout(function () {
        impactHapticTriggered = true;
        triggerMoveHaptic();
    }, Math.round(duration * 0.72));
    const slideAnimation =
        tile.animate(
            [
                {
                    transform:
                        `translate(${startX}px, ${startY}px) scale(1.085, 0.955)`,
                    filter:
                        "brightness(1.07) saturate(1.045) drop-shadow(0 9px 9px rgba(0, 0, 0, 0.26))"
                },
                {
                    transform:
                        `translate(${moveX}px, ${moveY}px) scale(1.075, 0.93)`,
                    filter:
                        "brightness(1.045) saturate(1.025) drop-shadow(0 2px 3px rgba(0, 0, 0, 0.17))",
                    offset: 0.72
                },
                {
                    transform:
                        `translate(${moveX}px, ${moveY}px) scale(0.975, 1.045)`,
                    filter:
                        "brightness(1.025) saturate(1.015) drop-shadow(0 3px 5px rgba(0, 0, 0, 0.16))",
                    offset: 0.88
                },
                {
                    transform:
                        `translate(${moveX}px, ${moveY}px) scale(1)`,
                    filter:
                        "brightness(1) saturate(1) drop-shadow(0 0 0 rgba(0, 0, 0, 0))"
                }
            ],
            {
                duration: duration,
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
            if (!impactHapticTriggered) {
                clearTimeout(impactHapticTimer);
                triggerMoveHaptic();
            }
            updateMovesDisplay();
            isTileAnimating = false;
            const newlyCompletedRows =
                findNewlyCompletedRows();
            draw();
            checkClear();
            if (!isSolved) {
                playRowCompletionCelebration(
                    newlyCompletedRows
                );
            }
        })
        .catch(function () {
            clearTimeout(impactHapticTimer);
            isTileAnimating = false;
            draw();
        });
}
function setDifficulty(size) {
    selectSound.currentTime = 0;
    playSoundEffect(selectSound);
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
    basicHintButton.style.display =
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
    stopClearCelebration();
    stopRowCompletionCelebration();
    gameScreen.classList.remove(
        "game-playing"
    );
    cancelSound.currentTime = 0;
    playSoundEffect(cancelSound).catch(error => {
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
    basicHintButton.style.display =
        "none";
    basicHintContainer.style.display =
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
    initializeAudioGraph();
    clearInterval(gameBgmFadeTimer);
    gameBgm.pause();
    gameBgm.currentTime = 0;
    if (!bgmEnabled || bgmVolume === 0) {
        return;
    }
    applyBgmVolume();
    if (audioGraphInitialized && gameBgmFadeGain) {
        gameBgm.volume = 1;
        gameBgmFadeGain.gain.value = 0;
    } else {
        gameBgm.volume = 0;
    }
    gameBgm.play().catch(function (error) {
        console.log("プレイBGMを再生できませんでした:", error);
    });
    gameBgmFadeTimer = setInterval(function () {
        if (audioGraphInitialized && gameBgmFadeGain) {
            const nextGain = Math.min(
                gameBgmFadeGain.gain.value + (1 / 15),
                1
            );
            gameBgmFadeGain.gain.value = nextGain;
            if (nextGain >= 1) {
                clearInterval(gameBgmFadeTimer);
            }
            return;
        }
        const fadeStep = Math.max(bgmVolume / 15, 0.001);
        const nextVolume = Math.min(
            gameBgm.volume + fadeStep,
            bgmVolume
        );
        gameBgm.volume = nextVolume;
        if (gameBgm.volume >= bgmVolume) {
            clearInterval(gameBgmFadeTimer);
        }
    }, 70);
}
function stopGameBgm() {
    clearInterval(gameBgmFadeTimer);
    gameBgm.pause();
    gameBgm.currentTime = 0;
    if (audioGraphInitialized && gameBgmFadeGain) {
        gameBgmFadeGain.gain.value = 0;
    } else {
        gameBgm.volume = 0;
    }
}
/* ========================================
   Ver.1.6 puzzle quality
======================================== */
function evaluateShuffleQuality() {
    let correctTileCount = 0;
    let totalManhattanDistance = 0;
    const displacedRows = new Set();
    const displacedColumns = new Set();

    numbers.forEach(function (number, index) {
        if (number === null) {
            return;
        }
        const targetIndex = number - 1;
        if (targetIndex === index) {
            correctTileCount++;
            return;
        }
        const currentRow =
            Math.floor(index / boardSize);
        const currentColumn =
            index % boardSize;
        const targetRow =
            Math.floor(targetIndex / boardSize);
        const targetColumn =
            targetIndex % boardSize;
        totalManhattanDistance +=
            Math.abs(currentRow - targetRow)
            + Math.abs(currentColumn - targetColumn);
        displacedRows.add(currentRow);
        displacedColumns.add(currentColumn);
    });

    return {
        correctTileCount: correctTileCount,
        totalManhattanDistance:
            totalManhattanDistance,
        displacedRowCount:
            displacedRows.size,
        displacedColumnCount:
            displacedColumns.size
    };
}

function getShuffleQualityTargets() {
    const targetsBySize = {
        3: { maximumCorrectTiles: 1, minimumManhattanDistance: 10, minimumDisplacedRows: 3, minimumDisplacedColumns: 3 },
        4: { maximumCorrectTiles: 2, minimumManhattanDistance: 30, minimumDisplacedRows: 4, minimumDisplacedColumns: 4 },
        5: { maximumCorrectTiles: 2, minimumManhattanDistance: 62, minimumDisplacedRows: 5, minimumDisplacedColumns: 5 },
        6: { maximumCorrectTiles: 3, minimumManhattanDistance: 102, minimumDisplacedRows: 6, minimumDisplacedColumns: 6 }
    };
    return targetsBySize[boardSize]
        || targetsBySize[3];
}

function isShuffleQualityAccepted(quality, targets) {
    return (
        quality.correctTileCount <= targets.maximumCorrectTiles
        && quality.totalManhattanDistance >= targets.minimumManhattanDistance
        && quality.displacedRowCount >= targets.minimumDisplacedRows
        && quality.displacedColumnCount >= targets.minimumDisplacedColumns
    );
}

function getShuffleQualityScore(quality) {
    return (
        quality.totalManhattanDistance
        + quality.displacedRowCount * boardSize
        + quality.displacedColumnCount * boardSize
        - quality.correctTileCount * boardSize * boardSize
    );
}

function shuffle() {
    stopClearCelebration();
    gameScreen.classList.add("game-playing");
    buttonSound.currentTime = 0;
    playSoundEffect(buttonSound);
    gameStarted = true;
    numberHintEnabled =
        localStorage.getItem("numberHintEnabled") === "true";
    updateNumberHintButton();
    startGameBgm();
    document.getElementById("start-button").disabled = true;
    setDifficultyButtonsDisabled(true);
    isSolved = false;
    randomImage();

    const shuffleSteps = boardSize * boardSize * 24;
    const qualityTargets = getShuffleQualityTargets();
    const maximumShuffleAttempts = 40;
    let bestNumbers = null;
    let bestQuality = null;
    let bestQualityScore = Number.NEGATIVE_INFINITY;
    let usedAttemptCount = 0;

    for (let attempt = 0; attempt < maximumShuffleAttempts; attempt++) {
        usedAttemptCount = attempt + 1;
        createBoard();
        let previousEmptyIndex = -1;

        for (let i = 0; i < shuffleSteps; i++) {
            const emptyIndex = numbers.indexOf(null);
            let validMoves = getValidMoves(emptyIndex);
            const movesWithoutBacktracking = validMoves.filter(
                function (moveIndex) {
                    return moveIndex !== previousEmptyIndex;
                }
            );
            if (movesWithoutBacktracking.length > 0) {
                validMoves = movesWithoutBacktracking;
            }
            const randomIndex = validMoves[
                Math.floor(Math.random() * validMoves.length)
            ];
            numbers[emptyIndex] = numbers[randomIndex];
            numbers[randomIndex] = null;
            previousEmptyIndex = emptyIndex;
        }

        const quality = evaluateShuffleQuality();
        const qualityScore = getShuffleQualityScore(quality);
        if (qualityScore > bestQualityScore) {
            bestQualityScore = qualityScore;
            bestNumbers = numbers.slice();
            bestQuality = quality;
        }
        if (isShuffleQualityAccepted(quality, qualityTargets)) {
            bestNumbers = numbers.slice();
            bestQuality = quality;
            break;
        }
    }

    if (bestNumbers !== null) {
        numbers = bestNumbers;
    }
    console.debug("Ver.1.6 shuffle quality", {
        boardSize: boardSize,
        attempts: usedAttemptCount,
        quality: bestQuality
    });

    selected = null;
    moves = 0;
    seconds = 0;
    updateMovesDisplay();
    updateTimerDisplay();
    message.textContent = "";
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
    document.getElementById("cancel-button").style.display = "inline-block";
    document.getElementById("original-button").style.display = "inline-block";
    numberHintButton.style.display = "inline-block";
    basicHintButton.style.display = "inline-block";
    rememberRowsCompletedAtStart();
    draw();
}

function updateTimer() {
    seconds++;
    updateTimerDisplay();
}
/* ========================================
   Ver.1.5 クリアお祝い演出
======================================== */
const clearPraiseMessages = {
    ja: {
        3: ["ナイス！", "できたね！", "いい感じ！"],
        4: ["グッド！", "やったね！", "すごい！"],
        5: ["グレート！", "すごい！", "おみごと！"],
        6: ["かんぺき！", "超すごい！", "大成功！"]
    },
    en: {
        3: ["Nice!", "You did it!", "Good job!"],
        4: ["Great!", "Well done!", "Amazing!"],
        5: ["Excellent!", "Fantastic!", "Great work!"],
        6: ["Perfect!", "Incredible!", "Outstanding!"]
    }
};
const clearStampMessages = {
    ja: {
        3: ["クリア！", "ナイス！"],
        4: ["グッド！", "クリア！"],
        5: ["グレート！", "すごい！"],
        6: ["かんぺき！", "超級クリア！"]
    },
    en: {
        3: ["CLEAR!", "NICE!"],
        4: ["GOOD!", "CLEAR!"],
        5: ["GREAT!", "AMAZING!"],
        6: ["PERFECT!", "EXPERT CLEAR!"]
    }
};
let clearCelebrationTimers = [];
function clearCelebrationTimeout(callback, delay) {
    const timerId = setTimeout(callback, delay);
    clearCelebrationTimers.push(timerId);
    return timerId;
}
function stopClearCelebration() {
    clearCelebrationTimers.forEach(function (timerId) {
        clearTimeout(timerId);
    });
    clearCelebrationTimers = [];
    const celebration = document.getElementById("clear-celebration");
    const confettiLayer = document.getElementById("clear-confetti-layer");
    if (celebration) {
        celebration.classList.remove("celebrating");
    }
    if (confettiLayer) {
        confettiLayer.innerHTML = "";
    }
    const oldEdgeSweep =
        game.querySelector(
            ".clear-image-edge-sweep"
        );
    if (oldEdgeSweep) {
        oldEdgeSweep.remove();
    }
    game.classList.remove("clear-board-pop");
}
function chooseClearMessage(messageMap) {
    const languageMessages =
        messageMap[currentLanguage] || messageMap.ja;
    const difficultyMessages =
        languageMessages[boardSize] || languageMessages[3];
    return difficultyMessages[
        Math.floor(Math.random() * difficultyMessages.length)
    ];
}
function createClearConfetti() {
    const layer = document.getElementById("clear-confetti-layer");
    if (!layer) {
        return;
    }
    layer.innerHTML = "";
    const amountByDifficulty = { 3: 28, 4: 38, 5: 50, 6: 64 };
    const amount = amountByDifficulty[boardSize] || 32;
    const shapes = ["●", "★", "◆", "🐾", "🧩"];
    const colors = ["#ff7f91", "#ffd45c", "#6edb8a", "#67c7ff", "#b99cff", "#ffad66"];
    for (let i = 0; i < amount; i++) {
        const piece = document.createElement("span");
        piece.className = "clear-confetti-piece";
        piece.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        piece.style.left = (Math.random() * 100) + "%";
        piece.style.color = colors[Math.floor(Math.random() * colors.length)];
        piece.style.fontSize = (10 + Math.random() * 13) + "px";
        piece.style.setProperty("--confetti-x", ((Math.random() - 0.5) * 180) + "px");
        piece.style.setProperty("--confetti-rotate", (240 + Math.random() * 520) + "deg");
        piece.style.animationDelay = (Math.random() * 0.24) + "s";
        piece.style.animationDuration = (1.15 + Math.random() * 0.75) + "s";
        layer.appendChild(piece);
    }
}
/* ========================================
   Ver.1.5.1 記録評価とゆったりクリア演出
======================================== */
function getPlayHistoryKey() {
    return "playHistory_" + boardSize;
}
function getPlayHistory() {
    try {
        const saved = JSON.parse(
            localStorage.getItem(getPlayHistoryKey()) || "[]"
        );
        return Array.isArray(saved) ? saved : [];
    } catch (error) {
        return [];
    }
}
function saveCurrentPlayToHistory() {
    if (moves <= 0) {
        return;
    }
    const history = getPlayHistory();
    history.push({ moves: moves, seconds: seconds });
    localStorage.setItem(
        getPlayHistoryKey(),
        JSON.stringify(history.slice(-30))
    );
}
function buildClearEvaluationMessages() {
    if (moves <= 0) {
        return currentLanguage === "en"
            ? ["Celebration preview"]
            : ["クリア演出の確認です"];
    }
    const history = getPlayHistory();
    const previous = history.length > 0
        ? history[history.length - 1]
        : null;
    const oldBestMoves = getBestScore();
    const oldBestTime = getBestTime();
    const messages = [];
    if (
        oldBestMoves === null ||
        moves < Number(oldBestMoves)
    ) {
        messages.push(
            currentLanguage === "en"
                ? "🏅 New fewest-moves record!"
                : "🏅 最少移動回数を更新！"
        );
    } else if (
        previous &&
        moves < Number(previous.moves)
    ) {
        const difference = Number(previous.moves) - moves;
        messages.push(
            currentLanguage === "en"
                ? `✨ ${difference} fewer moves than last time!`
                : `✨ 前回より${difference}回少なく解けました！`
        );
    } else if (
        previous &&
        moves === Number(previous.moves)
    ) {
        messages.push(
            currentLanguage === "en"
                ? "🐾 Same move count as last time!"
                : "🐾 前回と同じ移動回数です！"
        );
    } else if (history.length >= 3) {
        const averageMoves = history.reduce(
            function (total, record) {
                return total + Number(record.moves || 0);
            },
            0
        ) / history.length;
        if (moves < averageMoves) {
            messages.push(
                currentLanguage === "en"
                    ? "✨ Smoother than your usual play!"
                    : "✨ いつもの記録よりスムーズ！"
            );
        }
    }
    if (
        oldBestTime === null ||
        seconds < Number(oldBestTime)
    ) {
        messages.push(
            currentLanguage === "en"
                ? "⭐ New personal best time!"
                : "⭐ 自分の最短時間を更新！"
        );
    }
    if (messages.length === 0) {
        messages.push(
            currentLanguage === "en"
                ? "🐾 Nice and steady completion!"
                : "🐾 じっくり完成できました！"
        );
    }
    return messages.slice(0, 2);
}
function showClearEvaluation() {
    const clearContent = document.getElementById("clear-content");
    if (!clearContent) {
        return;
    }
    let evaluation = document.getElementById("clear-evaluation");
    if (!evaluation) {
        evaluation = document.createElement("div");
        evaluation.id = "clear-evaluation";
        const clearButtons = document.getElementById("clear-buttons");
        if (clearButtons) {
            clearContent.insertBefore(evaluation, clearButtons);
        } else {
            clearContent.appendChild(evaluation);
        }
    }
    const messages = buildClearEvaluationMessages();
    evaluation.innerHTML = "";
    messages.forEach(function (messageText) {
        const line = document.createElement("div");
        line.className = "clear-evaluation-line";
        line.textContent = messageText;
        evaluation.appendChild(line);
    });
    evaluation.classList.remove("show");
    void evaluation.offsetWidth;
    evaluation.classList.add("show");
    saveCurrentPlayToHistory();
}
/* ========================================
   Ver.1.6 quiet edge sweep revision 4
======================================== */
function startCompletedImageEdgeSweep() {
    const oldSweep =
        game.querySelector(
            ".clear-image-edge-sweep"
        );
    if (oldSweep) {
        oldSweep.remove();
    }

    const sweep =
        document.createElement("div");
    sweep.className =
        "clear-image-edge-sweep";

    ["top", "right", "bottom", "left"]
        .forEach(function (side) {
            const line =
                document.createElement("span");
            line.className =
                "clear-edge-line clear-edge-" + side;
            sweep.appendChild(line);
        });

    const cornerGlint =
        document.createElement("span");
    cornerGlint.className =
        "clear-edge-final-glint";
    sweep.appendChild(cornerGlint);
    game.appendChild(sweep);

    const cleanupTimer = setTimeout(function () {
        sweep.remove();
    }, 2300);
    clearCelebrationTimers.push(cleanupTimer);
}

function startClearCelebration() {
    stopClearCelebration();
    stopRowCompletionCelebration();
    const celebration = document.getElementById("clear-celebration");
    const stampText = document.getElementById("clear-stamp-text");
    const mascotFace = document.getElementById("clear-mascot-face");
    const mascotBubble = document.getElementById("clear-mascot-bubble");
    const mascots = ["🐱", "🐶", "🐰"];
    if (!celebration || !stampText || !mascotFace || !mascotBubble) {
        return;
    }
    stampText.textContent = chooseClearMessage(clearStampMessages);
    mascotFace.textContent = mascots[Math.floor(Math.random() * mascots.length)];
    mascotBubble.textContent = chooseClearMessage(clearPraiseMessages);
    celebration.dataset.difficulty = String(boardSize);
    game.classList.remove("clear-board-pop");
    void game.offsetWidth;
    game.classList.add("clear-board-pop");
    startCompletedImageEdgeSweep();
    createClearConfetti();
    void celebration.offsetWidth;
    celebration.classList.add("celebrating");
    clearCelebrationTimeout(function () {
        const layer = document.getElementById("clear-confetti-layer");
        if (layer) {
            layer.innerHTML = "";
        }
    }, 2400);
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
        basicHintButton.style.display =
            "none";
        basicHintContainer.style.display =
            "none";
        draw();
        startClearCelebration();
        clearInterval(timer);
        stopGameBgm();
        clearSound.pause();
        clearSound.currentTime = 0;
        playSoundEffect(clearSound).catch(function (error) {
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
        updateClearResultDisplay();
        showClearEvaluation();
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
let titleBgmStartPending = false;
function startTitleBgm() {
    initializeAudioGraph();
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
    if (titleBgmStartPending) {
        return;
    }
    titleBgmStartPending = true;
    titleBgm.currentTime = 0;
    titleBgm.volume = bgmVolume;
    titleBgm.play()
        .then(function () {
            titleBgmGuide.classList.add(
                "hidden"
            );
            titleScreen.removeEventListener(
                "click",
                startTitleBgm
            );
        })
        .catch(function (error) {
            console.error("タイトルBGM再生エラー:", error);
            titleBgmStartPending = false;
            /*
             * 自動再生が拒否された場合は
             * イベントを残し、次のタップで再試行する
             */
        });
}
titleScreen.addEventListener(
    "click",
    startTitleBgm
);
function startTitleGame(event) {
    initializeAudioGraph();
    event.stopPropagation();
    titleScreen.removeEventListener(
        "click",
        startTitleBgm
    );
    titleBgm.pause();
    titleBgm.currentTime = 0;
    titleStartSound.currentTime = 0;
    playSoundEffect(titleStartSound).catch(error => {
        console.log(
            "タイトル開始音を再生できませんでした:",
            error
        );
    });
    titleScreen.classList.add(
        "title-starting"
    );
    setTimeout(function () {
        titleScreen.classList.add(
            "title-fade-out"
        );
    }, 260);
    setTimeout(function () {
        titleScreen.style.display = "none";
        document.getElementById(
            "game-screen"
        ).style.display = "block";
    }, 980);
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
basicHintButton.style.display =
    "none";
