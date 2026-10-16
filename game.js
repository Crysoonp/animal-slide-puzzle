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
    updateV17Language();
    updateV17DifficultyRoleDescription();
    updateHintDebugButtons();
    if (document.getElementById("album-container") && document.getElementById("album-container").style.display === "flex") {
        renderAnimalAlbum();
    }
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
    if (v17ReplayImage) {
        currentImage = v17ReplayImage;
        v17ReplayImage = null;
        originalImage.src = "images/" + currentImage;
        return;
    }
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
    clearOneStepHint(false);
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
    const movedTileNumber = numbers[index];
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
            recordV17MoveCompleted(
                movedTileNumber
            );
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
                scheduleV17R9ProgressCelebrationCheck();
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
    updateV17DifficultyRoleDescription();
    updateBestDisplay();
    draw();
    updateStartButtonState();
}
function cancelGame() {
    stopClearCelebration();
    stopRowCompletionCelebration();
    resetV17GuaranteedRoute([]);

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
    gameBgmFadeTimer = null;
    if (!gameBgm.paused) gameBgm.pause();
    try { gameBgm.currentTime = 0; } catch (error) { }
    if (!bgmEnabled || bgmVolume === 0 || document.visibilityState === "hidden") {
        return Promise.resolve(false);
    }
    applyBgmVolume();
    if (audioGraphInitialized && gameBgmFadeGain) {
        gameBgm.volume = 1;
        gameBgmFadeGain.gain.value = 0;
    } else {
        gameBgm.volume = 0;
    }
    var playPromise = gameBgm.play().catch(function (error) {
        if (!v1819IsExpectedAudioInterruption(error)) {
            console.log("プレイBGMを再生できませんでした:", error);
        }
        return false;
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
    gameBgmFadeTimer = null;
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
    let bestSolutionRoute = [];
    let bestQuality = null;
    let bestQualityScore = Number.NEGATIVE_INFINITY;
    let usedAttemptCount = 0;

    for (let attempt = 0; attempt < maximumShuffleAttempts; attempt++) {
        usedAttemptCount = attempt + 1;
        createBoard();
        const attemptShuffleMoves = [];
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
            attemptShuffleMoves.push(
                numbers[randomIndex]
            );
            numbers[emptyIndex] = numbers[randomIndex];
            numbers[randomIndex] = null;
            previousEmptyIndex = emptyIndex;
        }

        const quality = evaluateShuffleQuality();
        const qualityScore = getShuffleQualityScore(quality);
        if (qualityScore > bestQualityScore) {
            bestQualityScore = qualityScore;
            bestNumbers = numbers.slice();
            bestSolutionRoute =
                attemptShuffleMoves.slice().reverse();
            bestQuality = quality;
        }
        if (isShuffleQualityAccepted(quality, qualityTargets)) {
            bestNumbers = numbers.slice();
            bestSolutionRoute =
                attemptShuffleMoves.slice().reverse();
            bestQuality = quality;
            break;
        }
    }

    if (bestNumbers !== null) {
        numbers = bestNumbers;
    }
    resetV17GuaranteedRoute(
        bestSolutionRoute
    );
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
    /* Teko-chan emoji replacement fix */
    const tekoImage = document.getElementById("teko-mascot-image");
    const tekoFallback = document.getElementById("teko-mascot-fallback");
    if (tekoImage) {
        const tekoPoseName = boardSize >= 5 ? "teko-jump.webp" : "teko-wave.webp";
        tekoImage.src = "images/teko-chan/" + tekoPoseName;
        tekoImage.hidden = false;
        if (tekoFallback) {
            tekoFallback.hidden = true;
        }
    } else {
        mascotFace.textContent = mascots[Math.floor(Math.random() * mascots.length)];
    }
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
        unlockCurrentAlbumImage();
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
let v1819TitleBgmRequestId = 0;
function v1819IsExpectedAudioInterruption(error) {
    return Boolean(error && (
        error.name === "AbortError"
        || error.name === "NotAllowedError"
    ));
}
function v1819StopTitleBgm() {
    v1819TitleBgmRequestId++;
    titleBgmStartPending = false;
    titleBgm.pause();
    try { titleBgm.currentTime = 0; } catch (error) { }
}
function startTitleBgm() {
    if (
        titleScreen.classList.contains("title-fade-out")
        || titleScreen.style.display === "none"
        || document.visibilityState === "hidden"
        || !bgmEnabled
        || bgmVolume <= 0
        || !titleBgm.paused
        || titleBgmStartPending
    ) {
        return Promise.resolve(false);
    }
    initializeAudioGraph();
    var requestId = ++v1819TitleBgmRequestId;
    titleBgmStartPending = true;
    titleBgm.currentTime = 0;
    titleBgm.volume = bgmVolume;
    return titleBgm.play()
        .then(function () {
            if (requestId !== v1819TitleBgmRequestId) return false;
            titleBgmStartPending = false;
            titleBgmGuide.classList.add("hidden");
            return true;
        })
        .catch(function (error) {
            if (requestId === v1819TitleBgmRequestId) {
                titleBgmStartPending = false;
            }
            if (!v1819IsExpectedAudioInterruption(error)) {
                console.error("タイトルBGM再生エラー:", error);
            }
            return false;
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
    v1819StopTitleBgm();
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


/* ========================================
   Ver.1.7 album and one-step hint
======================================== */
/* Ver.1.7 initialization order revision 1 */
var V17_UNLOCKED_KEY = "v17UnlockedImages";
var V17_FAVORITES_KEY = "v17FavoriteImages";
var V17_FIVE_BY_FIVE_KEY = "v17FiveByFiveCollection";
var v17ReplayImage = null;
var albumCategory = "all";
var albumFilter = "all";
var oneStepHintTimer = null;

function readV17Set(key) {
    try {
        const value = JSON.parse(localStorage.getItem(key) || "[]");
        return new Set(Array.isArray(value) ? value.filter(function (item) {
            return allImages.includes(item);
        }) : []);
    } catch (error) {
        return new Set();
    }
}
function saveV17Set(key, values) {
    localStorage.setItem(key, JSON.stringify(Array.from(values)));
}
function getImageCategory(image) {
    if (imageLists.cats.includes(image)) return "cats";
    if (imageLists.dogs.includes(image)) return "dogs";
    return "otherAnimals";
}
function getAlbumCategoryImages(category) {
    if (category === "cats") return imageLists.cats;
    if (category === "dogs") return imageLists.dogs;
    if (category === "otherAnimals") return imageLists.otherAnimals;
    return allImages;
}
function unlockCurrentAlbumImage() {
    if (boardSize < 4) return;
    if (!currentImage || !allImages.includes(currentImage)) return;
    const unlocked = readV17Set(V17_UNLOCKED_KEY);
    unlocked.add(currentImage);
    saveV17Set(V17_UNLOCKED_KEY, unlocked);
    if (boardSize === 5) {
        const collection = readV17Set(V17_FIVE_BY_FIVE_KEY);
        collection.add(currentImage);
        saveV17Set(V17_FIVE_BY_FIVE_KEY, collection);
    }
}
function updateV17Language() {
    const ja = currentLanguage === "ja";
    const labels = {
        "album-open-button": ja ? "📚 動物アルバム" : "📚 Animal Album",
        "album-title": ja ? "📚 動物アルバム" : "📚 Animal Album",
        "album-close-button": ja ? "閉じる" : "Close",
        "album-all-filter": ja ? "すべて" : "All",
        "album-unlocked-filter": ja ? "解放済み" : "Unlocked",
        "album-favorite-filter": ja ? "お気に入り" : "Favorites",
        "one-step-hint-button": ja ? "👣 1手ヒント" : "👣 One-step Hint"
    };
    Object.keys(labels).forEach(function (id) {
        const element = document.getElementById(id);
        if (element) element.textContent = labels[id];
    });
}
function openAnimalAlbum() {
    if (gameStarted && !isSolved) return;
    playSoundEffect(buttonSound);
    renderAnimalAlbum();
    document.getElementById("album-container").style.display = "flex";
    document.body.style.overflow = "hidden";
}
function closeAnimalAlbum() {
    playSoundEffect(buttonSound);
    document.getElementById("album-container").style.display = "none";
    document.body.style.overflow = "";
}
function setAlbumCategory(category) {
    albumCategory = category;
    renderAnimalAlbum();
}
function setAlbumFilter(filterName) {
    albumFilter = filterName;
    renderAnimalAlbum();
}
function toggleAlbumFavorite(image) {
    const favorites = readV17Set(V17_FAVORITES_KEY);
    if (favorites.has(image)) favorites.delete(image); else favorites.add(image);
    saveV17Set(V17_FAVORITES_KEY, favorites);
    renderAnimalAlbum();
}
function replayAlbumImage(image) {
    if (!readV17Set(V17_UNLOCKED_KEY).has(image)) return;
    v17ReplayImage = image;
    selectedAnimalMode = getImageCategory(image);
    if (selectedDifficulty === null) {
        selectedDifficulty = 5;
        boardSize = 5;
        updateDifficultyButtons();
    }
    closeAnimalAlbum();
    updateStartButtonState();
    shuffle();
}
function renderAnimalAlbum() {
    const grid = document.getElementById("album-grid");
    const summary = document.getElementById("album-summary");
    const tabs = document.getElementById("album-category-tabs");
    if (!grid || !summary || !tabs) return;
    const ja = currentLanguage === "ja";
    const unlocked = readV17Set(V17_UNLOCKED_KEY);
    const favorites = readV17Set(V17_FAVORITES_KEY);
    const fiveCollection = readV17Set(V17_FIVE_BY_FIVE_KEY);
    const categories = [
        ["all", ja ? "全部" : "All"], ["cats", ja ? "にゃんこ" : "Cats"],
        ["dogs", ja ? "わんこ" : "Dogs"], ["otherAnimals", ja ? "ほかの動物" : "Other"]
    ];
    tabs.innerHTML = "";
    categories.forEach(function (entry) {
        const button = document.createElement("button");
        button.textContent = entry[1];
        button.className = albumCategory === entry[0] ? "selected-album-tab" : "";
        button.onclick = function () { setAlbumCategory(entry[0]); };
        tabs.appendChild(button);
    });
    const categoryImages = getAlbumCategoryImages(albumCategory);
    let visible = categoryImages.filter(function (image) {
        if (albumFilter === "unlocked") return unlocked.has(image);
        if (albumFilter === "favorite") return favorites.has(image);
        return true;
    });
    const categoryUnlocked = categoryImages.filter(function (image) { return unlocked.has(image); }).length;
    const percent = Math.round(categoryUnlocked / categoryImages.length * 100);
    summary.textContent = (ja ? "解放 " : "Unlocked ") + categoryUnlocked + " / " + categoryImages.length +
        " (" + percent + "%)  ·  " + (ja ? "5×5コレクション " : "5×5 Collection ") + fiveCollection.size;
    ["all","unlocked","favorite"].forEach(function (name) {
        const b=document.getElementById("album-"+name+"-filter");
        if(b) b.classList.toggle("selected-album-filter", albumFilter===name);
    });
    grid.innerHTML = "";
    visible.forEach(function (image) {
        const isUnlocked = unlocked.has(image);
        const card = document.createElement("article");
        card.className = "album-card " + (isUnlocked ? "album-unlocked" : "album-locked");
        const picture = document.createElement("div");
        picture.className = "album-picture";
        if (isUnlocked) picture.style.backgroundImage = "url('images/" + image + "')";
        else picture.innerHTML = "<span>🐾</span><small>?</small>";
        card.appendChild(picture);
        const actions = document.createElement("div");
        actions.className = "album-card-actions";
        if (isUnlocked) {
            const replay = document.createElement("button");
            replay.textContent = ja ? "遊ぶ" : "Play";
            replay.onclick = function () { replayAlbumImage(image); };
            const favorite = document.createElement("button");
            favorite.textContent = favorites.has(image) ? "★" : "☆";
            favorite.className = favorites.has(image) ? "album-favorite-on" : "";
            favorite.onclick = function () { toggleAlbumFavorite(image); };
            actions.append(replay, favorite);
        } else {
            const locked = document.createElement("span");
            locked.textContent = ja ? "未解放" : "Locked";
            actions.appendChild(locked);
        }
        card.appendChild(actions);
        grid.appendChild(card);
    });
    if (visible.length === 0) {
        grid.innerHTML = '<p class="album-empty">' + (ja ? "該当する画像はありません。" : "No matching images.") + '</p>';
    }
}
function clearOneStepHint(clearMessage) {
    clearTimeout(oneStepHintTimer);
    document.querySelectorAll(".one-step-hint-target, .one-step-hint-empty").forEach(function (tile) {
        tile.classList.remove("one-step-hint-target", "one-step-hint-empty");
        const arrow = tile.querySelector(".one-step-hint-arrow");
        if (arrow) arrow.remove();
    });
    if (clearMessage !== false) {
        const messageBox = document.getElementById("one-step-hint-message");
        if (messageBox) messageBox.textContent = "";
    }
}
/* Ver.1.7 structured solving hint revision 6 */
var v17SolutionRoute = [];
var v17HintRouteActive = false;
var v17StructuredRecentBoards = [];
var v17StructuredObjective = null;

/* Compatibility hooks for the old Revision 4 call sites. */
function resetV17GuaranteedRoute() {
    v17SolutionRoute = [];
    v17HintRouteActive = false;
    v17StructuredRecentBoards = [];
    v17StructuredObjective = null;
    clearOneStepHint();
    if (
        typeof startV17HintDebugSession
            === "function"
    ) {
        startV17HintDebugSession();
    }
}

function updateV17GuaranteedRouteAfterMove() {
    /* Revision 6 recalculates from the current board. */
}

function getV17StructuredBoardKey(board) {
    return board.map(function (number) {
        return number === null ? 0 : number;
    }).join(",");
}

function getV17StructuredValidMoves(emptyIndex) {
    const moves = [];
    const row = Math.floor(emptyIndex / boardSize);
    const column = emptyIndex % boardSize;
    if (column > 0) moves.push(emptyIndex - 1);
    if (column < boardSize - 1) moves.push(emptyIndex + 1);
    if (row > 0) moves.push(emptyIndex - boardSize);
    if (row < boardSize - 1) moves.push(emptyIndex + boardSize);
    return moves;
}

function getV17StructuredObjective(board) {
    const finalRegularRow = boardSize - 3;
    const protectedIndexes = new Set();

    for (let row = 0; row <= finalRegularRow; row++) {
        let completedPrefix = 0;
        while (
            completedPrefix < boardSize
            && board[row * boardSize + completedPrefix]
                === row * boardSize + completedPrefix + 1
        ) {
            completedPrefix++;
        }

        if (completedPrefix === boardSize) {
            for (let column = 0; column < boardSize; column++) {
                protectedIndexes.add(row * boardSize + column);
            }
            continue;
        }

        for (let previousRow = 0; previousRow < row; previousRow++) {
            for (let column = 0; column < boardSize; column++) {
                protectedIndexes.add(previousRow * boardSize + column);
            }
        }

        const normalTileLimit = boardSize - 2;
        if (completedPrefix < normalTileLimit) {
            for (let column = 0; column < completedPrefix; column++) {
                protectedIndexes.add(row * boardSize + column);
            }
            const targetIndex = row * boardSize + completedPrefix;
            return {
                type: "single",
                row: row,
                targetNumbers: [targetIndex + 1],
                targetIndexes: [targetIndex],
                protectedIndexes: protectedIndexes,
                stageLabel: "single"
            };
        }

        for (let column = 0; column < normalTileLimit; column++) {
            protectedIndexes.add(row * boardSize + column);
        }
        return {
            type: "pair",
            row: row,
            targetNumbers: [
                row * boardSize + boardSize - 1,
                row * boardSize + boardSize
            ],
            targetIndexes: [
                row * boardSize + boardSize - 2,
                row * boardSize + boardSize - 1
            ],
            protectedIndexes: protectedIndexes,
            stageLabel: "pair"
        };
    }

    for (let row = 0; row < boardSize - 2; row++) {
        for (let column = 0; column < boardSize; column++) {
            protectedIndexes.add(row * boardSize + column);
        }
    }
    return {
        type: "final",
        row: boardSize - 2,
        targetNumbers: [],
        targetIndexes: [],
        protectedIndexes: protectedIndexes,
        stageLabel: "final"
    };
}

function getV17StructuredDistance(board, number, targetIndex) {
    const index = board.indexOf(number);
    if (index < 0) return 999;
    return (
        Math.abs(
            Math.floor(index / boardSize)
            - Math.floor(targetIndex / boardSize)
        )
        + Math.abs(
            (index % boardSize)
            - (targetIndex % boardSize)
        )
    );
}

function evaluateV17StructuredBoard(board, objective) {
    let score = 0;
    let protectedBreaks = 0;
    objective.protectedIndexes.forEach(function (index) {
        if (board[index] !== index + 1) {
            protectedBreaks++;
        }
    });
    score += protectedBreaks * 100000;

    if (objective.type === "single") {
        score += getV17StructuredDistance(
            board,
            objective.targetNumbers[0],
            objective.targetIndexes[0]
        ) * 1000;
    } else if (objective.type === "pair") {
        objective.targetNumbers.forEach(function (number, offset) {
            score += getV17StructuredDistance(
                board,
                number,
                objective.targetIndexes[offset]
            ) * 900;
        });
        const firstIndex = board.indexOf(objective.targetNumbers[0]);
        const secondIndex = board.indexOf(objective.targetNumbers[1]);
        if (firstIndex >= 0 && secondIndex >= 0) {
            const pairDistance =
                Math.abs(
                    Math.floor(firstIndex / boardSize)
                    - Math.floor(secondIndex / boardSize)
                )
                + Math.abs(
                    (firstIndex % boardSize)
                    - (secondIndex % boardSize)
                );
            score += Math.max(0, pairDistance - 1) * 180;
        }
    } else {
        for (let index = (boardSize - 2) * boardSize; index < board.length; index++) {
            const number = board[index];
            if (number === null) continue;
            score += getV17StructuredDistance(
                board,
                number,
                number - 1
            ) * 220;
        }
    }

    let correctCount = 0;
    board.forEach(function (number, index) {
        if (number !== null && number === index + 1) {
            correctCount++;
        }
    });
    score -= correctCount * 3;
    return score;
}

function isV17StructuredObjectiveComplete(board, objective) {
    if (objective.type === "single") {
        return board[objective.targetIndexes[0]]
            === objective.targetNumbers[0];
    }
    if (objective.type === "pair") {
        return (
            board[objective.targetIndexes[0]]
                === objective.targetNumbers[0]
            && board[objective.targetIndexes[1]]
                === objective.targetNumbers[1]
        );
    }
    return board.every(function (number, index) {
        if (index === board.length - 1) return number === null;
        return number === index + 1;
    });
}

function chooseV17StructuredMove(objective) {
    const currentEmpty = numbers.indexOf(null);
    const initialMoves = getV17StructuredValidMoves(currentEmpty)
        .filter(function (index) {
            return !objective.protectedIndexes.has(index);
        });
    const usableMoves = initialMoves.length > 0
        ? initialMoves
        : getV17StructuredValidMoves(currentEmpty);

    let frontier = usableMoves.map(function (moveIndex) {
        const board = numbers.slice();
        board[currentEmpty] = board[moveIndex];
        board[moveIndex] = null;
        return {
            board: board,
            emptyIndex: moveIndex,
            previousEmptyIndex: currentEmpty,
            firstMove: moveIndex,
            depth: 1
        };
    });

    let best = null;
    const maximumDepth = boardSize === 3 ? 18 : 14;
    const beamWidth = boardSize <= 4 ? 420 : 280;
    const recentBoards = new Set(v17StructuredRecentBoards);

    for (let depth = 1; depth <= maximumDepth && frontier.length > 0; depth++) {
        frontier.forEach(function (node) {
            let score = evaluateV17StructuredBoard(
                node.board,
                objective
            );
            if (recentBoards.has(getV17StructuredBoardKey(node.board))) {
                score += 25000;
            }
            score += node.depth * 0.2;
            node.score = score;
            if (
                isV17StructuredObjectiveComplete(node.board, objective)
            ) {
                node.score -= 500000 - node.depth * 10;
            }
            if (!best || node.score < best.score) {
                best = node;
            }
        });

        frontier.sort(function (a, b) {
            return a.score - b.score;
        });
        frontier = frontier.slice(0, beamWidth);
        if (
            frontier.length > 0
            && isV17StructuredObjectiveComplete(
                frontier[0].board,
                objective
            )
        ) {
            best = frontier[0];
            break;
        }

        const next = [];
        frontier.forEach(function (node) {
            let moves = getV17StructuredValidMoves(node.emptyIndex)
                .filter(function (index) {
                    return (
                        index !== node.previousEmptyIndex
                        && !objective.protectedIndexes.has(index)
                    );
                });
            if (moves.length === 0) {
                moves = getV17StructuredValidMoves(node.emptyIndex)
                    .filter(function (index) {
                        return index !== node.previousEmptyIndex;
                    });
            }
            moves.forEach(function (moveIndex) {
                const board = node.board.slice();
                board[node.emptyIndex] = board[moveIndex];
                board[moveIndex] = null;
                next.push({
                    board: board,
                    emptyIndex: moveIndex,
                    previousEmptyIndex: node.emptyIndex,
                    firstMove: node.firstMove,
                    depth: node.depth + 1
                });
            });
        });
        frontier = next;
    }

    return best ? best.firstMove : usableMoves[0];
}

function getV17StructuredMessage(objective) {
    const ja = currentLanguage === "ja";
    if (objective.type === "single") {
        const number = objective.targetNumbers[0];
        return ja
            ? "現在の目標：" + number + "番を正しい位置へ運びます。準備のための一手です。"
            : "Current goal: move tile " + number + " into place. This move prepares the route.";
    }
    if (objective.type === "pair") {
        return ja
            ? "現在の目標：" + objective.targetNumbers[0] + "番と" + objective.targetNumbers[1] + "番をセットで揃えます。"
            : "Current goal: place tiles " + objective.targetNumbers[0] + " and " + objective.targetNumbers[1] + " as a pair.";
    }
    return ja
        ? "現在の目標：残りの2段を回して完成させます。"
        : "Current goal: rotate the final two rows into the solved position.";
}

function showOneStepHint() {
    if (!gameStarted || isSolved || isTileAnimating) return;
    clearOneStepHint();
    const objective = getV17StructuredObjective(numbers);
    const emptyIndex = numbers.indexOf(null);
    const targetIndex = chooseV17StructuredMove(objective);
    const targetTile = game.children[targetIndex];
    const emptyTile = game.children[emptyIndex];
    if (!targetTile || !emptyTile) return;

    v17StructuredObjective = objective;
    v17StructuredRecentBoards.push(
        getV17StructuredBoardKey(numbers)
    );
    v17StructuredRecentBoards =
        v17StructuredRecentBoards.slice(-120);

    const targetNumber = numbers[targetIndex];
    const rowDifference =
        Math.floor(emptyIndex / boardSize)
        - Math.floor(targetIndex / boardSize);
    const columnDifference =
        (emptyIndex % boardSize)
        - (targetIndex % boardSize);
    const arrowText =
        columnDifference > 0 ? "→"
            : columnDifference < 0 ? "←"
                : rowDifference > 0 ? "↓" : "↑";

    const arrow = document.createElement("span");
    arrow.className = "one-step-hint-arrow";
    arrow.textContent = arrowText;
    targetTile.appendChild(arrow);
    targetTile.classList.add("one-step-hint-target");
    emptyTile.classList.add("one-step-hint-empty");

    const messageBox = document.getElementById(
        "one-step-hint-message"
    );
    if (messageBox) {
        messageBox.textContent =
            getV17StructuredMessage(objective);
    }

    if (typeof recordV17HintIssued === "function") {
        recordV17HintIssued(
            targetNumber,
            targetIndex,
            emptyIndex,
            arrowText
        );
    }
    playSoundEffect(buttonSound);
    oneStepHintTimer = setTimeout(function () {
        clearOneStepHint();
    }, 5000);
}

const v17AlbumContainer = document.getElementById("album-container");
if (v17AlbumContainer) v17AlbumContainer.addEventListener("click", function (event) {
    if (event.target === v17AlbumContainer) closeAnimalAlbum();
});
updateV17Language();


/* ========================================
   Ver.1.7 hint analysis revision 5
======================================== */
var V17_HINT_DEBUG_ENABLED_KEY = "v17HintDebugEnabled";
var V17_HINT_DEBUG_LOG_KEY = "v17HintDebugLog";
var v17HintDebugEnabled =
    localStorage.getItem(
        V17_HINT_DEBUG_ENABLED_KEY
    ) === "true";
var v17HintDebugSessionId = null;
var v17HintDebugPendingHint = null;

function getV17HintBoardMetrics(board) {
    let manhattanDistance = 0;
    let correctTileCount = 0;
    let completedTopRows = 0;

    board.forEach(function (number, index) {
        if (number === null) {
            return;
        }
        const targetIndex = number - 1;
        manhattanDistance +=
            Math.abs(
                Math.floor(index / boardSize)
                - Math.floor(targetIndex / boardSize)
            )
            + Math.abs(
                (index % boardSize)
                - (targetIndex % boardSize)
            );
        if (index === targetIndex) {
            correctTileCount++;
        }
    });

    for (let row = 0; row < boardSize; row++) {
        let complete = true;
        for (let column = 0; column < boardSize; column++) {
            const index = row * boardSize + column;
            if (board[index] !== index + 1) {
                complete = false;
                break;
            }
        }
        if (!complete) {
            break;
        }
        completedTopRows++;
    }

    return {
        manhattanDistance: manhattanDistance,
        correctTileCount: correctTileCount,
        completedTopRows: completedTopRows
    };
}

function readV17HintDebugLog() {
    try {
        const saved = JSON.parse(
            localStorage.getItem(
                V17_HINT_DEBUG_LOG_KEY
            ) || "[]"
        );
        return Array.isArray(saved) ? saved : [];
    } catch (error) {
        return [];
    }
}

function appendV17HintDebugEvent(type, details) {
    if (!v17HintDebugEnabled) {
        return;
    }
    const log = readV17HintDebugLog();
    log.push(Object.assign({
        type: type,
        timestamp: new Date().toISOString(),
        sessionId: v17HintDebugSessionId,
        boardSize: boardSize,
        moveCount: moves,
        board: numbers.map(function (number) {
            return number === null ? 0 : number;
        }),
        emptyIndex: numbers.indexOf(null),
        remainingGuaranteedRoute:
            v17SolutionRoute.length,
        metrics: getV17HintBoardMetrics(numbers)
    }, details || {}));
    localStorage.setItem(
        V17_HINT_DEBUG_LOG_KEY,
        JSON.stringify(log.slice(-5000))
    );
}

function startV17HintDebugSession() {
    if (!v17HintDebugEnabled || !gameStarted) {
        return;
    }
    v17HintDebugSessionId =
        Date.now().toString(36)
        + "-"
        + Math.random().toString(36).slice(2, 8);
    v17HintDebugPendingHint = null;
    appendV17HintDebugEvent("session_start", {
        initialGuaranteedRouteLength:
            v17SolutionRoute.length,
        animalMode: selectedAnimalMode,
        image: currentImage,
        note: "Structured solving route is intended to be understandable and safe, not mathematically shortest."
    });
}

function recordV17HintIssued(
    targetNumber,
    targetIndex,
    emptyIndex,
    arrowText
) {
    if (!v17HintDebugEnabled) {
        return;
    }
    v17HintDebugPendingHint = {
        targetNumber: targetNumber,
        targetIndex: targetIndex,
        emptyIndex: emptyIndex,
        arrow: arrowText,
        boardBefore: numbers.map(function (number) {
            return number === null ? 0 : number;
        }),
        metricsBefore:
            getV17HintBoardMetrics(numbers),
        remainingRouteBefore:
            v17SolutionRoute.length,
        structuredStage:
            v17StructuredObjective
                ? v17StructuredObjective.stageLabel
                : null,
        structuredTargetNumbers:
            v17StructuredObjective
                ? v17StructuredObjective.targetNumbers.slice()
                : [],
        structuredTargetIndexes:
            v17StructuredObjective
                ? v17StructuredObjective.targetIndexes.slice()
                : []
    };
    appendV17HintDebugEvent(
        "hint_issued",
        v17HintDebugPendingHint
    );
}

function recordV17MoveCompleted(movedTileNumber) {
    if (!v17HintDebugEnabled) {
        return;
    }
    const followedHint = Boolean(
        v17HintDebugPendingHint
        && v17HintDebugPendingHint.targetNumber
            === movedTileNumber
    );
    const currentBoardKey =
        numbers.map(function (number) {
            return number === null ? 0 : number;
        }).join(",");
    const log = readV17HintDebugLog();
    let previousOccurrences = 0;
    log.forEach(function (event) {
        if (
            Array.isArray(event.board)
            && event.board.join(",")
                === currentBoardKey
        ) {
            previousOccurrences++;
        }
    });
    appendV17HintDebugEvent("move_completed", {
        movedTileNumber: movedTileNumber,
        followedHint: followedHint,
        expectedTileNumber:
            v17HintDebugPendingHint
                ? v17HintDebugPendingHint.targetNumber
                : null,
        repeatedBoard: previousOccurrences > 0,
        previousBoardOccurrences:
            previousOccurrences,
        remainingRouteAfter:
            v17SolutionRoute.length,
        metricsAfter:
            getV17HintBoardMetrics(numbers)
    });
    v17HintDebugPendingHint = null;
}

function updateHintDebugButtons() {
    const toggleButton =
        document.getElementById(
            "hint-debug-toggle-button"
        );
    if (toggleButton) {
        toggleButton.textContent =
            currentLanguage === "ja"
                ? "ヒント解析ログ："
                    + (v17HintDebugEnabled ? "ON" : "OFF")
                : "Hint Analysis Log: "
                    + (v17HintDebugEnabled ? "ON" : "OFF");
        toggleButton.classList.toggle(
            "hint-debug-enabled",
            v17HintDebugEnabled
        );
    }
    const exportButton =
        document.getElementById(
            "hint-debug-export-button"
        );
    if (exportButton) {
        exportButton.textContent =
            currentLanguage === "ja"
                ? "ヒントログを保存"
                : "Save Hint Log";
    }
    const resetButton =
        document.getElementById(
            "hint-debug-reset-button"
        );
    if (resetButton) {
        resetButton.textContent =
            currentLanguage === "ja"
                ? "ヒントログをリセット"
                : "Reset Hint Log";
    }
}

function toggleHintDebugLogging() {
    v17HintDebugEnabled =
        !v17HintDebugEnabled;
    localStorage.setItem(
        V17_HINT_DEBUG_ENABLED_KEY,
        String(v17HintDebugEnabled)
    );
    if (v17HintDebugEnabled && gameStarted) {
        startV17HintDebugSession();
    }
    updateHintDebugButtons();
}

function resetHintDebugLog() {
    localStorage.removeItem(
        V17_HINT_DEBUG_LOG_KEY
    );
    v17HintDebugPendingHint = null;
    alert(
        currentLanguage === "ja"
            ? "ヒント解析ログをリセットしました。"
            : "The hint analysis log was reset."
    );
}

function buildV17HintDebugExport() {
    const events = readV17HintDebugLog();
    const sessions = {};
    events.forEach(function (event) {
        const id = event.sessionId || "unknown";
        if (!sessions[id]) {
            sessions[id] = {
                sessionId: id,
                boardSize: event.boardSize,
                eventCount: 0,
                hintCount: 0,
                moveCount: 0,
                followedHintCount: 0,
                repeatedBoardCount: 0,
                startRouteLength: null,
                finalRemainingRoute: null
            };
        }
        const summary = sessions[id];
        summary.eventCount++;
        if (event.type === "session_start") {
            summary.startRouteLength =
                event.initialGuaranteedRouteLength;
        }
        if (event.type === "hint_issued") {
            summary.hintCount++;
        }
        if (event.type === "move_completed") {
            summary.moveCount++;
            if (event.followedHint) {
                summary.followedHintCount++;
            }
            if (event.repeatedBoard) {
                summary.repeatedBoardCount++;
            }
            summary.finalRemainingRoute =
                event.remainingRouteAfter;
        }
    });
    return {
        formatVersion: "1.0",
        exportedAt: new Date().toISOString(),
        appVersion: "1.7.0",
        note: "Structured hints prioritize top rows, smaller tile numbers, row-end pairs, and protection of completed areas; shortest paths are not guaranteed.",
        sessions: Object.keys(sessions).map(function (id) {
            return sessions[id];
        }),
        events: events
    };
}

function exportHintDebugLog() {
    const data = buildV17HintDebugExport();
    if (data.events.length === 0) {
        alert(
            currentLanguage === "ja"
                ? "保存できるヒントログがありません。"
                : "There is no hint log to save."
        );
        return;
    }
    const blob = new Blob(
        [JSON.stringify(data, null, 2)],
        { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const stamp = new Date()
        .toISOString()
        .replace(/[:.]/g, "-");
    link.href = url;
    link.download =
        "animal-slide-puzzle-hint-log-"
        + stamp
        + ".json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function () {
        URL.revokeObjectURL(url);
    }, 1000);
}

updateHintDebugButtons();


/* ========================================
   Ver.1.7 difficulty roles revision 7
======================================== */
function getV17DifficultyRoleText(size) {
    const ja = currentLanguage === "ja";
    const messages = {
        3: ja
            ? "お試し・練習モードです。操作を覚えながら、1手ヒントを自由に使えます。アルバム解放はありません。"
            : "Trial and practice mode. Learn the controls with unlimited one-step hints. Album images are not unlocked here.",
        4: ja
            ? "標準・コレクションモードです。クリアすると、その動物画像がアルバムに解放されます。"
            : "Standard collection mode. Clearing the puzzle unlocks that animal image in the album.",
        5: ja
            ? "上級・コレクションモードです。クリアすると、その動物画像がアルバムに解放されます。"
            : "Advanced collection mode. Clearing the puzzle unlocks that animal image in the album.",
        6: ja
            ? "高難易度のチャレンジモードです。クリアすると画像が解放されます。将来はランキングに対応予定です。"
            : "High-difficulty challenge mode. Clearing unlocks the image. Ranking support is planned for a future version."
    };
    return messages[size]
        || (ja
            ? "難易度を選ぶと、遊び方がここに表示されます。"
            : "Select a difficulty to see its play style here.");
}

function updateV17DifficultyRoleDescription() {
    const description = document.getElementById(
        "difficulty-role-description"
    );
    if (description) {
        description.textContent =
            getV17DifficultyRoleText(selectedDifficulty);
    }

    const ja = currentLanguage === "ja";
    const categoryTitle = document.getElementById(
        "picture-category-title"
    );
    if (categoryTitle) {
        categoryTitle.innerHTML =
            '<span class="setup-step-number">1</span>'
            + (ja
                ? "遊ぶ動物の種類を選んでね"
                : "Choose an animal category");
    }
    const difficultyTitle = document.getElementById(
        "difficulty-step-title"
    );
    if (difficultyTitle) {
        difficultyTitle.innerHTML =
            '<span class="setup-step-number">2</span>'
            + (ja
                ? "難易度を選んでね"
                : "Choose a difficulty");
    }
    const startTitle = document.getElementById(
        "start-step-title"
    );
    if (startTitle) {
        startTitle.innerHTML =
            '<span class="setup-step-number">3</span>'
            + (ja
                ? "ゲームを始めよう"
                : "Start the game");
    }
    const albumText = document.getElementById(
        "album-open-button-text"
    );
    if (albumText) {
        albumText.textContent = ja ? "アルバム" : "Album";
    }
}

updateV17DifficultyRoleDescription();


/* ========================================
   Ver.1.7 final-two-row guidance revision 8
======================================== */

function getV17FinalAreaStartIndex() {
    return (boardSize - 2) * boardSize;
}

function getV17FinalColumnsCompleted(board) {
    const start = getV17FinalAreaStartIndex();
    let completed = 0;
    const pairLimit = Math.max(0, boardSize - 2);
    for (let column = 0; column < pairLimit; column++) {
        const upperIndex = start + column;
        const lowerIndex = start + boardSize + column;
        if (
            board[upperIndex] === upperIndex + 1
            && board[lowerIndex] === lowerIndex + 1
        ) {
            completed++;
        } else {
            break;
        }
    }
    return completed;
}

function getV17StructuredObjective(board) {
    const finalRegularRow = boardSize - 3;
    const protectedIndexes = new Set();

    for (let row = 0; row <= finalRegularRow; row++) {
        let completedPrefix = 0;
        while (
            completedPrefix < boardSize
            && board[row * boardSize + completedPrefix]
                === row * boardSize + completedPrefix + 1
        ) {
            completedPrefix++;
        }

        if (completedPrefix === boardSize) {
            for (let column = 0; column < boardSize; column++) {
                protectedIndexes.add(row * boardSize + column);
            }
            continue;
        }

        for (let previousRow = 0; previousRow < row; previousRow++) {
            for (let column = 0; column < boardSize; column++) {
                protectedIndexes.add(previousRow * boardSize + column);
            }
        }

        const normalTileLimit = boardSize - 2;
        if (completedPrefix < normalTileLimit) {
            for (let column = 0; column < completedPrefix; column++) {
                protectedIndexes.add(row * boardSize + column);
            }
            const targetIndex = row * boardSize + completedPrefix;
            return {
                type: "single",
                row: row,
                column: completedPrefix,
                targetNumbers: [targetIndex + 1],
                targetIndexes: [targetIndex],
                protectedIndexes: protectedIndexes,
                stageLabel: "single-tile"
            };
        }

        for (let column = 0; column < normalTileLimit; column++) {
            protectedIndexes.add(row * boardSize + column);
        }
        return {
            type: "pair",
            row: row,
            column: normalTileLimit,
            targetNumbers: [
                row * boardSize + boardSize - 1,
                row * boardSize + boardSize
            ],
            targetIndexes: [
                row * boardSize + boardSize - 2,
                row * boardSize + boardSize - 1
            ],
            protectedIndexes: protectedIndexes,
            stageLabel: "row-end-pair"
        };
    }

    for (let row = 0; row < boardSize - 2; row++) {
        for (let column = 0; column < boardSize; column++) {
            protectedIndexes.add(row * boardSize + column);
        }
    }

    const start = getV17FinalAreaStartIndex();
    const completedColumns = getV17FinalColumnsCompleted(board);
    const pairLimit = Math.max(0, boardSize - 2);

    if (completedColumns < pairLimit) {
        for (let column = 0; column < completedColumns; column++) {
            protectedIndexes.add(start + column);
            protectedIndexes.add(start + boardSize + column);
        }
        const upperIndex = start + completedColumns;
        const lowerIndex = start + boardSize + completedColumns;
        return {
            type: "final-column-pair",
            row: boardSize - 2,
            column: completedColumns,
            targetNumbers: [upperIndex + 1, lowerIndex + 1],
            targetIndexes: [upperIndex, lowerIndex],
            protectedIndexes: protectedIndexes,
            stageLabel: "final-column-" + (completedColumns + 1)
        };
    }

    for (let column = 0; column < pairLimit; column++) {
        protectedIndexes.add(start + column);
        protectedIndexes.add(start + boardSize + column);
    }
    const finalIndexes = [];
    for (let row = boardSize - 2; row < boardSize; row++) {
        for (let column = pairLimit; column < boardSize; column++) {
            finalIndexes.push(row * boardSize + column);
        }
    }
    return {
        type: "final-block",
        row: boardSize - 2,
        column: pairLimit,
        targetNumbers: finalIndexes
            .filter(function (index) {
                return index < board.length - 1;
            })
            .map(function (index) {
                return index + 1;
            }),
        targetIndexes: finalIndexes,
        protectedIndexes: protectedIndexes,
        stageLabel: "final-right-block"
    };
}

function getV17FinalPairAdjacencyPenalty(board, objective) {
    const firstIndex = board.indexOf(objective.targetNumbers[0]);
    const secondIndex = board.indexOf(objective.targetNumbers[1]);
    if (firstIndex < 0 || secondIndex < 0) return 5000;
    const firstRow = Math.floor(firstIndex / boardSize);
    const secondRow = Math.floor(secondIndex / boardSize);
    const firstColumn = firstIndex % boardSize;
    const secondColumn = secondIndex % boardSize;
    let penalty = 0;
    penalty += Math.abs(firstColumn - secondColumn) * 110;
    penalty += Math.abs((secondRow - firstRow) - 1) * 180;
    if (firstRow > secondRow) penalty += 260;
    return penalty;
}

function evaluateV17StructuredBoard(board, objective) {
    let score = 0;
    let protectedBreaks = 0;
    objective.protectedIndexes.forEach(function (index) {
        if (board[index] !== index + 1) protectedBreaks++;
    });
    score += protectedBreaks * 1000000;

    if (objective.type === "single") {
        score += getV17StructuredDistance(
            board,
            objective.targetNumbers[0],
            objective.targetIndexes[0]
        ) * 1200;
    } else if (objective.type === "pair") {
        objective.targetNumbers.forEach(function (number, offset) {
            score += getV17StructuredDistance(
                board,
                number,
                objective.targetIndexes[offset]
            ) * 1000;
        });
    } else if (objective.type === "final-column-pair") {
        objective.targetNumbers.forEach(function (number, offset) {
            score += getV17StructuredDistance(
                board,
                number,
                objective.targetIndexes[offset]
            ) * 1800;
        });
        score += getV17FinalPairAdjacencyPenalty(board, objective);
    } else if (objective.type === "final-block") {
        objective.targetIndexes.forEach(function (index) {
            const expected = index === board.length - 1
                ? null
                : index + 1;
            if (board[index] !== expected) {
                if (expected === null) {
                    const blankIndex = board.indexOf(null);
                    score += (
                        Math.abs(
                            Math.floor(blankIndex / boardSize)
                            - Math.floor(index / boardSize)
                        )
                        + Math.abs(
                            (blankIndex % boardSize)
                            - (index % boardSize)
                        )
                    ) * 1400;
                } else {
                    score += getV17StructuredDistance(
                        board,
                        expected,
                        index
                    ) * 1400;
                }
            }
        });
    }

    let correctCount = 0;
    board.forEach(function (number, index) {
        if (number !== null && number === index + 1) correctCount++;
    });
    score -= correctCount * 4;
    return score;
}

function isV17StructuredObjectiveComplete(board, objective) {
    if (objective.type === "single") {
        return board[objective.targetIndexes[0]]
            === objective.targetNumbers[0];
    }
    if (
        objective.type === "pair"
        || objective.type === "final-column-pair"
    ) {
        return objective.targetIndexes.every(function (index, offset) {
            return board[index] === objective.targetNumbers[offset];
        });
    }
    if (objective.type === "final-block") {
        return objective.targetIndexes.every(function (index) {
            if (index === board.length - 1) return board[index] === null;
            return board[index] === index + 1;
        });
    }
    return false;
}

function getV17FinalAreaValidMoves(emptyIndex, objective) {
    return getV17StructuredValidMoves(emptyIndex)
        .filter(function (index) {
            return !objective.protectedIndexes.has(index);
        });
}

function chooseV17StructuredMove(objective) {
    const currentEmpty = numbers.indexOf(null);
    let usableMoves = getV17FinalAreaValidMoves(
        currentEmpty,
        objective
    );
    if (usableMoves.length === 0) {
        usableMoves = getV17StructuredValidMoves(currentEmpty);
    }

    let frontier = usableMoves.map(function (moveIndex) {
        const board = numbers.slice();
        board[currentEmpty] = board[moveIndex];
        board[moveIndex] = null;
        return {
            board: board,
            emptyIndex: moveIndex,
            previousEmptyIndex: currentEmpty,
            firstMove: moveIndex,
            depth: 1
        };
    });

    const finalStage =
        objective.type === "final-column-pair"
        || objective.type === "final-block";
    const maximumDepth = finalStage
        ? (boardSize >= 5 ? 30 : 24)
        : (boardSize === 3 ? 18 : 14);
    const beamWidth = finalStage
        ? (boardSize >= 6 ? 1500 : 1100)
        : (boardSize <= 4 ? 420 : 280);
    const recentBoards = new Set(v17StructuredRecentBoards);
    const seenDepth = new Map();
    let best = null;

    for (let depth = 1; depth <= maximumDepth && frontier.length > 0; depth++) {
        const uniqueFrontier = [];
        frontier.forEach(function (node) {
            const key = getV17StructuredBoardKey(node.board);
            const knownDepth = seenDepth.get(key);
            if (knownDepth !== undefined && knownDepth <= node.depth) return;
            seenDepth.set(key, node.depth);

            let score = evaluateV17StructuredBoard(
                node.board,
                objective
            );
            if (recentBoards.has(key)) {
                score += finalStage ? 400000 : 25000;
            }
            score += node.depth * (finalStage ? 1.5 : 0.2);
            node.score = score;
            node.key = key;
            if (isV17StructuredObjectiveComplete(node.board, objective)) {
                node.score -= 10000000 - node.depth * 100;
            }
            uniqueFrontier.push(node);
            if (!best || node.score < best.score) best = node;
        });

        uniqueFrontier.sort(function (a, b) {
            return a.score - b.score;
        });
        frontier = uniqueFrontier.slice(0, beamWidth);

        if (
            frontier.length > 0
            && isV17StructuredObjectiveComplete(
                frontier[0].board,
                objective
            )
        ) {
            best = frontier[0];
            break;
        }

        const next = [];
        frontier.forEach(function (node) {
            let moves = getV17FinalAreaValidMoves(
                node.emptyIndex,
                objective
            ).filter(function (index) {
                return index !== node.previousEmptyIndex;
            });
            if (moves.length === 0) {
                moves = getV17FinalAreaValidMoves(
                    node.emptyIndex,
                    objective
                );
            }
            moves.forEach(function (moveIndex) {
                const board = node.board.slice();
                board[node.emptyIndex] = board[moveIndex];
                board[moveIndex] = null;
                next.push({
                    board: board,
                    emptyIndex: moveIndex,
                    previousEmptyIndex: node.emptyIndex,
                    firstMove: node.firstMove,
                    depth: node.depth + 1
                });
            });
        });
        frontier = next;
    }

    return best ? best.firstMove : usableMoves[0];
}

function getV17StructuredMessage(objective) {
    const ja = currentLanguage === "ja";
    if (objective.type === "single") {
        const number = objective.targetNumbers[0];
        return ja
            ? "現在の目標：" + number + "番を正しい位置へ運びます。準備のための一手です。"
            : "Current goal: move tile " + number + " into place. This move prepares the route.";
    }
    if (objective.type === "pair") {
        return ja
            ? "現在の目標：" + objective.targetNumbers[0] + "番と" + objective.targetNumbers[1] + "番をセットで揃えます。"
            : "Current goal: place tiles " + objective.targetNumbers[0] + " and " + objective.targetNumbers[1] + " as a pair.";
    }
    if (objective.type === "final-column-pair") {
        return ja
            ? "現在の目標：" + objective.targetNumbers[0] + "番と" + objective.targetNumbers[1] + "番を左から" + (objective.column + 1) + "列目に縦に揃えます。"
            : "Current goal: place tiles " + objective.targetNumbers[0] + " and " + objective.targetNumbers[1] + " vertically in final column " + (objective.column + 1) + ".";
    }
    return ja
        ? "現在の目標：右下の残り2列を回して完成させます。"
        : "Current goal: rotate the final two columns into the solved position.";
}


/* ========================================
   Ver.1.7 progress sparkle revision 9
======================================== */
let v17R9PreviousBoard = [];
let v17R9CelebratedColumns = new Set();
let v17R9MajorAreaCelebrated = false;
let v17R9PendingCheck = false;

function resetV17R9ProgressCelebration() {
    v17R9PreviousBoard = Array.isArray(numbers)
        ? numbers.slice()
        : [];
    v17R9CelebratedColumns = new Set();
    v17R9MajorAreaCelebrated = false;
    document.querySelectorAll('.v17-r9-progress-toast')
        .forEach(function (element) {
            element.remove();
        });
}

function getV17R9BoardElement() {
    const direct = [
        document.getElementById('puzzle'),
        document.getElementById('puzzle-board'),
        document.getElementById('game-board'),
        document.getElementById('board'),
        document.querySelector('.puzzle-board'),
        document.querySelector('.game-board'),
        document.querySelector('.puzzle')
    ].filter(Boolean);
    for (const element of direct) {
        if (element.children.length >= boardSize * boardSize - 1) {
            return element;
        }
    }
    const candidates = Array.from(document.querySelectorAll('div'));
    return candidates.find(function (element) {
        const style = getComputedStyle(element);
        return style.display === 'grid'
            && element.children.length >= boardSize * boardSize - 1
            && element.children.length <= boardSize * boardSize;
    }) || null;
}

function getV17R9TileElementsByNumber() {
    const result = new Map();
    const board = getV17R9BoardElement();
    if (!board) return result;
    Array.from(board.children).forEach(function (element) {
        const dataNumber = Number(
            element.dataset.number
            || element.dataset.tileNumber
            || element.dataset.value
        );
        const textNumber = Number(
            String(element.textContent || '').trim()
        );
        const number = Number.isFinite(dataNumber) && dataNumber > 0
            ? dataNumber
            : textNumber;
        if (Number.isFinite(number) && number > 0) {
            result.set(number, element);
        }
    });
    return result;
}

function createV17R9Sparkle(element, delay) {
    if (!element) return;
    element.classList.remove('v17-r9-tile-sparkle');
    void element.offsetWidth;
    element.style.setProperty('--v17-r9-delay', delay + 'ms');
    element.classList.add('v17-r9-tile-sparkle');
    window.setTimeout(function () {
        element.classList.remove('v17-r9-tile-sparkle');
        element.style.removeProperty('--v17-r9-delay');
    }, 950 + delay);
}

function showV17R9ProgressToast(message, major) {
    const old = document.querySelector('.v17-r9-progress-toast');
    if (old) old.remove();
    const toast = document.createElement('div');
    toast.className = 'v17-r9-progress-toast'
        + (major ? ' v17-r9-progress-toast-major' : '');
    toast.textContent = message;
    document.body.appendChild(toast);
    window.setTimeout(function () {
        toast.classList.add('v17-r9-progress-toast-show');
    }, 10);
    window.setTimeout(function () {
        toast.classList.remove('v17-r9-progress-toast-show');
        window.setTimeout(function () {
            toast.remove();
        }, 260);
    }, major ? 1250 : 850);
}

function playV17R9Chime(major) {
    if (typeof playSoundEffect !== 'function') {
        return;
    }
    // The clear fanfare is reserved for a fully solved board.
    // Row, column and main-area progress always use the lighter progress sound.
    const sound = rowShararanSound;
    if (!sound) {
        return;
    }
    sound.pause();
    sound.currentTime = 0;
    playSoundEffect(sound).catch(function (error) {
        console.log('進捗演出音を再生できませんでした:', error);
    });
}

function isV17R9ColumnPairComplete(board, column) {
    const start = (boardSize - 2) * boardSize;
    const upperIndex = start + column;
    const lowerIndex = start + boardSize + column;
    return board[upperIndex] === upperIndex + 1
        && board[lowerIndex] === lowerIndex + 1;
}

function isV17R9MainAreaComplete(board) {
    const finalTarget = boardSize * (boardSize - 1);
    for (let index = 0; index < finalTarget; index++) {
        if (board[index] !== index + 1) return false;
    }
    return true;
}

function celebrateV17R9Column(column) {
    const start = (boardSize - 2) * boardSize;
    const upperNumber = start + column + 1;
    const lowerNumber = start + boardSize + column + 1;
    const tiles = getV17R9TileElementsByNumber();
    createV17R9Sparkle(tiles.get(upperNumber), 0);
    createV17R9Sparkle(tiles.get(lowerNumber), 90);
    showV17R9ProgressToast(
        currentLanguage === 'ja'
            ? (column + 1) + '列完成！'
            : 'Column ' + (column + 1) + ' complete!',
        false
    );
    playV17R9Chime(false);
}

function celebrateV17R9MainArea() {
    const limit = boardSize * (boardSize - 1);
    const tiles = getV17R9TileElementsByNumber();
    for (let number = 1; number <= limit; number++) {
        const diagonalDelay = (
            Math.floor((number - 1) / boardSize)
            + ((number - 1) % boardSize)
        ) * 42;
        createV17R9Sparkle(tiles.get(number), diagonalDelay);
    }
    showV17R9ProgressToast(
        currentLanguage === 'ja'
            ? '上の' + (boardSize - 1) + '段が揃いました！'
            : 'Top ' + (boardSize - 1) + ' rows complete!',
        true
    );
    playV17R9Chime(true);
}

function checkV17R9ProgressCelebration() {
    v17R9PendingCheck = false;
    if (!Array.isArray(numbers) || numbers.length === 0) return;
    if (boardSize < 5) {
        v17R9PreviousBoard = numbers.slice();
        return;
    }

    const current = numbers.slice();
    const pairLimit = Math.max(0, boardSize - 2);
    for (let column = 0; column < pairLimit; column++) {
        const wasComplete = v17R9PreviousBoard.length === current.length
            && isV17R9ColumnPairComplete(
                v17R9PreviousBoard,
                column
            );
        const isComplete = isV17R9ColumnPairComplete(
            current,
            column
        );
        if (
            !wasComplete
            && isComplete
            && !v17R9CelebratedColumns.has(column)
        ) {
            v17R9CelebratedColumns.add(column);
            celebrateV17R9Column(column);
        }
    }

    const wasMainComplete = v17R9PreviousBoard.length === current.length
        && isV17R9MainAreaComplete(v17R9PreviousBoard);
    const isMainComplete = isV17R9MainAreaComplete(current);
    if (
        !wasMainComplete
        && isMainComplete
        && !v17R9MajorAreaCelebrated
    ) {
        v17R9MajorAreaCelebrated = true;
        window.setTimeout(celebrateV17R9MainArea, 180);
    }
    v17R9PreviousBoard = current;
}

function scheduleV17R9ProgressCelebrationCheck() {
    if (v17R9PendingCheck) return;
    v17R9PendingCheck = true;
    window.setTimeout(checkV17R9ProgressCelebration, 80);
}

if (typeof moveTile === 'function') {
    const v17R9OriginalMoveTile = moveTile;
    moveTile = function () {
        const result = v17R9OriginalMoveTile.apply(this, arguments);
        scheduleV17R9ProgressCelebrationCheck();
        return result;
    };
}

if (typeof startGame === 'function') {
    const v17R9OriginalStartGame = startGame;
    startGame = function () {
        const result = v17R9OriginalStartGame.apply(this, arguments);
        window.setTimeout(resetV17R9ProgressCelebration, 120);
        return result;
    };
}

window.setTimeout(resetV17R9ProgressCelebration, 150);


/* ========================================
   Ver.1.7 full-column sparkle revision 10
======================================== */
let v17R10Observer = null;
let v17R10ObservedBoard = null;
let v17R10FrameId = 0;

function isV17R10FullColumnComplete(board, column) {
    if (!Array.isArray(board) || board.length !== boardSize * boardSize) {
        return false;
    }
    for (let row = 0; row < boardSize; row++) {
        const index = row * boardSize + column;
        const expected = index === board.length - 1 ? null : index + 1;
        if (board[index] !== expected) return false;
    }
    return true;
}

function isV17R10PuzzleComplete(board) {
    if (!Array.isArray(board) || board.length !== boardSize * boardSize) {
        return false;
    }
    return board.every(function (number, index) {
        return index === board.length - 1
            ? number === null
            : number === index + 1;
    });
}

function getV17R10ColumnNumbers(column) {
    const numbersInColumn = [];
    for (let row = 0; row < boardSize; row++) {
        const index = row * boardSize + column;
        if (index < boardSize * boardSize - 1) {
            numbersInColumn.push(index + 1);
        }
    }
    return numbersInColumn;
}

function celebrateV17R9Column(column) {
    const tiles = getV17R9TileElementsByNumber();
    const columnNumbers = getV17R10ColumnNumbers(column);
    columnNumbers.forEach(function (number, row) {
        createV17R9Sparkle(tiles.get(number), row * 105);
    });

    const board = getV17R9BoardElement();
    if (board) {
        board.classList.remove('v17-r10-column-pulse');
        void board.offsetWidth;
        board.style.setProperty('--v17-r10-column', String(column));
        board.classList.add('v17-r10-column-pulse');
        window.setTimeout(function () {
            board.classList.remove('v17-r10-column-pulse');
            board.style.removeProperty('--v17-r10-column');
        }, 1450);
    }

    showV17R9ProgressToast(
        currentLanguage === 'ja'
            ? (column + 1) + '列目が揃いました！'
            : 'Column ' + (column + 1) + ' complete!',
        false
    );
    playV17R9Chime(false);
}

function checkV17R9ProgressCelebration() {
    v17R9PendingCheck = false;
    if (!Array.isArray(numbers) || numbers.length === 0) return;

    if (boardSize === 3) {
        v17R9PreviousBoard = numbers.slice();
        return;
    }

    const current = numbers.slice();
    const previousIsUsable = v17R9PreviousBoard.length === current.length;
    const puzzleComplete = isV17R10PuzzleComplete(current);

    for (let column = 0; column < boardSize; column++) {
        const wasComplete = previousIsUsable
            && isV17R10FullColumnComplete(v17R9PreviousBoard, column);
        const isComplete = isV17R10FullColumnComplete(current, column);
        if (
            !puzzleComplete
            && !wasComplete
            && isComplete
            && !v17R9CelebratedColumns.has(column)
        ) {
            v17R9CelebratedColumns.add(column);
            celebrateV17R9Column(column);
        }
    }

    const wasMainComplete = previousIsUsable
        && isV17R9MainAreaComplete(v17R9PreviousBoard);
    const isMainComplete = isV17R9MainAreaComplete(current);
    if (
        !puzzleComplete
        && !wasMainComplete
        && isMainComplete
        && !v17R9MajorAreaCelebrated
    ) {
        v17R9MajorAreaCelebrated = true;
        window.setTimeout(celebrateV17R9MainArea, 170);
    }

    v17R9PreviousBoard = current;
}

function runV17R10CheckAfterPaint() {
    if (v17R10FrameId) {
        window.cancelAnimationFrame(v17R10FrameId);
    }
    v17R10FrameId = window.requestAnimationFrame(function () {
        v17R10FrameId = window.requestAnimationFrame(function () {
            v17R10FrameId = 0;
            checkV17R9ProgressCelebration();
        });
    });
}

function scheduleV17R9ProgressCelebrationCheck() {
    runV17R10CheckAfterPaint();
}

function connectV17R10BoardObserver() {
    /* Ver.1.8.2: run completion checks explicitly after committed moves. */
    if (v17R10Observer) {
        v17R10Observer.disconnect();
        v17R10Observer = null;
    }
    v17R10ObservedBoard = getV17R9BoardElement();
}

const v17R10OriginalResetCelebration = resetV17R9ProgressCelebration;
resetV17R9ProgressCelebration = function () {
    v17R10OriginalResetCelebration.apply(this, arguments);
    window.setTimeout(function () {
        connectV17R10BoardObserver();
        v17R9PreviousBoard = Array.isArray(numbers) ? numbers.slice() : [];
    }, 40);
};

window.setTimeout(connectV17R10BoardObserver, 200);


/* ========================================
   Ver.1.8 closed-test foundation revision 1
======================================== */
var V18_APP_VERSION = "1.8.20";
var V18_DEBUG_UI_VISIBLE = true;
var V18_MAX_DEBUG_EVENTS = 3000;
var V18_MAX_DEBUG_SESSIONS = 20;
var V18_RANKING_RESULTS_KEY = "v18RankingResults";
var V18_SESSION_SNAPSHOT_KEY = "v18SessionSnapshot";

function v18SafeReadJson(key, fallbackValue) {
    try {
        var raw = localStorage.getItem(key);
        if (raw === null) return fallbackValue;
        return JSON.parse(raw);
    } catch (error) {
        v18RecordSystemEvent("storage_read_error", { key: key, message: String(error && error.message || error) });
        return fallbackValue;
    }
}
function v18SafeWriteJson(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        v18RecordSystemEvent("storage_write_error", { key: key, message: String(error && error.message || error) });
        return false;
    }
}
function v18RecordSystemEvent(type, details) {
    if (!v17HintDebugEnabled || typeof appendV17HintDebugEvent !== "function") return;
    try { appendV17HintDebugEvent(type, details || {}); } catch (error) { console.error("Ver.1.8 log error:", error); }
}
function v18TrimDebugEvents(events) {
    var sessionOrder = [];
    events.forEach(function (event) {
        var id = event.sessionId || "unknown";
        if (!sessionOrder.includes(id)) sessionOrder.push(id);
    });
    var keepSessions = new Set(sessionOrder.slice(-V18_MAX_DEBUG_SESSIONS));
    var filtered = events.filter(function (event) {
        return keepSessions.has(event.sessionId || "unknown");
    });
    return filtered.slice(-V18_MAX_DEBUG_EVENTS);
}
readV17HintDebugLog = function () {
    var saved = v18SafeReadJson(V17_HINT_DEBUG_LOG_KEY, []);
    return Array.isArray(saved) ? saved : [];
};
appendV17HintDebugEvent = function (type, details) {
    if (!v17HintDebugEnabled) return;
    var log = readV17HintDebugLog();
    log.push(Object.assign({
        type: type,
        timestamp: new Date().toISOString(),
        sessionId: v17HintDebugSessionId,
        appVersion: V18_APP_VERSION,
        boardSize: boardSize,
        moveCount: moves,
        board: numbers.map(function (number) { return number === null ? 0 : number; }),
        emptyIndex: numbers.indexOf(null),
        metrics: getV17HintBoardMetrics(numbers)
    }, details || {}));
    v18SafeWriteJson(V17_HINT_DEBUG_LOG_KEY, v18TrimDebugEvents(log));
};

function v18WrapAfter(name, callback) {
    var original = window[name];
    if (typeof original !== "function" || original.v18Wrapped) return;
    var wrapped = function () {
        var args = Array.prototype.slice.call(arguments);
        var result = original.apply(this, args);
        try { callback.apply(this, args); } catch (error) { v18RecordSystemEvent("wrapper_error", { functionName: name, message: String(error) }); }
        return result;
    };
    wrapped.v18Wrapped = true;
    window[name] = wrapped;
}

v18WrapAfter("playRowCompletionCelebration", function (rows) {
    if (Array.isArray(rows) && rows.length) v18RecordSystemEvent("row_complete_celebration", { rows: rows.slice(), soundName: "row_shararan.wav" });
});
v18WrapAfter("celebrateV17R9Column", function (column) {
    v18RecordSystemEvent("column_complete_celebration", { column: column, triggerReason: "full_column_complete", soundName: "progress_chime" });
});
v18WrapAfter("celebrateV17R9MainArea", function () {
    v18RecordSystemEvent("main_area_complete_celebration", { triggerReason: "top_rows_complete", soundName: "progress_major_chime" });
});
v18WrapAfter("unlockCurrentAlbumImage", function () {
    if (boardSize >= 4 && currentImage) v18RecordSystemEvent("album_image_unlocked", { image: currentImage, collection: boardSize === 5 ? "5x5" : "general" });
});

var v18OriginalCheckClear = checkClear;
checkClear = function () {
    var wasSolved = isSolved;
    var result = v18OriginalCheckClear.apply(this, arguments);
    if (!wasSolved && isSolved) {
        var rankingResult = {
            resultId: Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8),
            boardSize: boardSize,
            boardId: "local-" + boardSize + "x" + boardSize,
            imageId: currentImage,
            moves: moves,
            seconds: seconds,
            hintCount: readV17HintDebugLog().filter(function (event) { return event.sessionId === v17HintDebugSessionId && event.type === "hint_issued"; }).length,
            completedAt: new Date().toISOString(),
            appVersion: V18_APP_VERSION,
            resumed: Boolean(v18SafeReadJson(V18_SESSION_SNAPSHOT_KEY, {}).resumed),
            debugClear: moves <= 0
        };
        var results = v18SafeReadJson(V18_RANKING_RESULTS_KEY, []);
        if (!Array.isArray(results)) results = [];
        results.push(rankingResult);
        v18SafeWriteJson(V18_RANKING_RESULTS_KEY, results.slice(-100));
        localStorage.removeItem(V18_SESSION_SNAPSHOT_KEY);
        v18RecordSystemEvent("clear_detected", rankingResult);
    }
    return result;
};

function v18SaveSessionSnapshot() {
    if (!gameStarted || isSolved || !Array.isArray(numbers) || numbers.length === 0) return;
    v18SafeWriteJson(V18_SESSION_SNAPSHOT_KEY, {
        formatVersion: 1,
        appVersion: V18_APP_VERSION,
        savedAt: new Date().toISOString(),
        boardSize: boardSize,
        numbers: numbers.map(function (number) { return number === null ? 0 : number; }),
        moves: moves,
        seconds: seconds,
        image: currentImage,
        animalMode: selectedAnimalMode,
        difficulty: selectedDifficulty,
        resumed: false
    });
}
v18WrapAfter("recordV17MoveCompleted", function () { v18SaveSessionSnapshot(); });
window.addEventListener("pagehide", v18SaveSessionSnapshot);
document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") v18SaveSessionSnapshot();
});

function resetV18AlbumData() {
    var messageText = currentLanguage === "ja"
        ? "解放済み画像・お気に入り・5×5コレクションを削除します。ベスト記録は残ります。よろしいですか？"
        : "Delete unlocked images, favorites, and the 5x5 collection? Best records will remain.";
    if (!confirm(messageText)) return;
    [V17_UNLOCKED_KEY, V17_FAVORITES_KEY, V17_FIVE_BY_FIVE_KEY].forEach(function (key) { localStorage.removeItem(key); });
    if (typeof renderAnimalAlbum === "function") renderAnimalAlbum();
    alert(currentLanguage === "ja" ? "アルバムデータをリセットしました。" : "Album data was reset.");
}
function resetV18DeviceGameData() {
    var first = currentLanguage === "ja"
        ? "ベスト記録、プレイ履歴、アルバム、ランキング準備データ、解析ログを削除します。音量・言語・振動設定は残します。続けますか？"
        : "Delete records, history, album, ranking-preparation data, and analysis logs? Sound, language, and vibration settings will remain.";
    if (!confirm(first)) return;
    var second = currentLanguage === "ja" ? "本当にこの端末のゲームデータを初期化しますか？" : "Really initialize game data on this device?";
    if (!confirm(second)) return;
    Object.keys(localStorage).forEach(function (key) {
        if (/^(bestScore_|bestTime_|playHistory_|v17UnlockedImages|v17FavoriteImages|v17FiveByFiveCollection|v17HintDebugLog|v18RankingResults|v18SessionSnapshot)/.test(key)) {
            localStorage.removeItem(key);
        }
    });
    updateBestDisplay();
    alert(currentLanguage === "ja" ? "ゲームデータを初期化しました。" : "Game data was initialized.");
}

var v18OriginalResetAllRecords = resetAllRecords;
resetAllRecords = function () {
    var ok = confirm(currentLanguage === "ja"
        ? "全難易度の最少移動回数、最短時間、比較用プレイ履歴を削除します。アルバムは残ります。よろしいですか？"
        : "Delete fewest moves, best times, and comparison history for every difficulty? The album will remain.");
    if (!ok) return;
    [3,4,5,6].forEach(function (size) {
        localStorage.removeItem("bestScore_" + size);
        localStorage.removeItem("bestTime_" + size);
        localStorage.removeItem("playHistory_" + size);
    });
    updateBestDisplay();
};

function v18ApplyTekoCharacter() {
    var celebration = document.getElementById("clear-celebration");
    var fallback = document.getElementById("teko-mascot-fallback");
    var image = document.getElementById("teko-mascot-image");
    var bubble = document.getElementById("clear-mascot-bubble");
    if (!celebration || !fallback) return;
    var motionBySize = { 3: "wave", 4: "hop", 5: "dance", 6: "super" };
    celebration.dataset.tekoMotion = motionBySize[boardSize] || "wave";
    fallback.textContent = "🐱";
    if (bubble) bubble.setAttribute("data-character", "テコちゃん（仮）");
    if (image) {
        image.addEventListener("load", function () { image.hidden = false; fallback.hidden = true; }, { once: true });
        image.addEventListener("error", function () { image.hidden = true; fallback.hidden = false; }, { once: true });
    }
}
v18WrapAfter("startClearCelebration", v18ApplyTekoCharacter);

function v18UpdateDebugUiVisibility() {
    var panel = document.getElementById("hint-debug-setting");
    if (panel) panel.style.display = V18_DEBUG_UI_VISIBLE ? "block" : "none";
}

window.addEventListener("error", function (event) {
    v18RecordSystemEvent("javascript_error", { message: event.message, source: event.filename, line: event.lineno, column: event.colno });
});
window.addEventListener("unhandledrejection", function (event) {
    v18RecordSystemEvent("unhandled_promise_rejection", { message: String(event.reason && event.reason.message || event.reason) });
});

var v18OriginalBuildExport = buildV17HintDebugExport;
buildV17HintDebugExport = function () {
    var data = v18OriginalBuildExport.apply(this, arguments);
    data.formatVersion = "1.1";
    data.appVersion = V18_APP_VERSION;
    data.logPolicy = { maximumEvents: V18_MAX_DEBUG_EVENTS, maximumSessions: V18_MAX_DEBUG_SESSIONS };
    return data;
};

(function v18Initialize() {
    var meta = document.querySelector('meta[name="app-version"]');
    if (meta) meta.content = V18_APP_VERSION;
    var allResetButton = document.getElementById("reset-all-records-button");
    if (allResetButton) allResetButton.textContent = currentLanguage === "ja" ? "ベスト記録をすべてリセット" : "Reset All Best Records";
    v18UpdateDebugUiVisibility();
})();


/* ========================================
   Ver.1.8 resume restore revision 2
======================================== */
function v18IsValidSessionSnapshot(snapshot) {
    if (!snapshot || typeof snapshot !== "object") return false;
    var size = Number(snapshot.boardSize);
    if (![3, 4, 5, 6].includes(size)) return false;
    if (!Array.isArray(snapshot.numbers) || snapshot.numbers.length !== size * size) return false;
    var normalized = snapshot.numbers.map(function (value) { return value === 0 ? null : Number(value); });
    if (normalized.filter(function (value) { return value === null; }).length !== 1) return false;
    var tiles = normalized.filter(function (value) { return value !== null; }).sort(function (a, b) { return a - b; });
    for (var index = 0; index < size * size - 1; index++) {
        if (tiles[index] !== index + 1) return false;
    }
    if (!snapshot.image || typeof snapshot.image !== "string") return false;
    return true;
}

function v18RestoreSavedSession(snapshot) {
    var size = Number(snapshot.boardSize);
    stopClearCelebration();
    stopRowCompletionCelebration();
    clearInterval(timer);

    selectedDifficulty = size;
    boardSize = size;
    numbers = snapshot.numbers.map(function (value) { return value === 0 ? null : Number(value); });
    moves = Math.max(0, Number(snapshot.moves) || 0);
    seconds = Math.max(0, Number(snapshot.seconds) || 0);
    currentImage = snapshot.image;
    selectedAnimalMode = snapshot.animalMode || "all";
    gameStarted = true;
    isSolved = false;
    selected = null;
    isTileAnimating = false;

    snapshot.resumed = true;
    snapshot.restoredAt = new Date().toISOString();
    v18SafeWriteJson(V18_SESSION_SNAPSHOT_KEY, snapshot);

    v1819StopTitleBgm();
    titleScreen.style.display = "none";
    gameScreen.style.display = "block";
    gameScreen.classList.add("game-playing");
    originalImage.src = "images/" + currentImage;

    updateMovesDisplay();
    updateTimerDisplay();
    updateDifficultyButtons();
    updateV17DifficultyRoleDescription();
    updateBestDisplay();
    updateNumberHintButton();
    updateStartButtonState();
    setDifficultyButtonsDisabled(true);

    document.getElementById("start-button").disabled = true;
    document.getElementById("cancel-button").style.display = "inline-block";
    document.getElementById("original-button").style.display = "inline-block";
    numberHintButton.style.display = "inline-block";
    basicHintButton.style.display = "inline-block";
    message.textContent = currentLanguage === "ja" ? "前回の続きから再開しました" : "Previous game restored";

    resetV17GuaranteedRoute([]);
    rememberRowsCompletedAtStart();
    draw();
    timer = setInterval(updateTimer, 1000);
    v18RecordSystemEvent("session_restored", {
        savedAt: snapshot.savedAt || null,
        restoredMoves: moves,
        restoredSeconds: seconds,
        image: currentImage
    });
}

function v18OfferSavedSessionRestore() {
    var snapshot = v18SafeReadJson(V18_SESSION_SNAPSHOT_KEY, null);
    if (!v18IsValidSessionSnapshot(snapshot)) {
        if (snapshot !== null) localStorage.removeItem(V18_SESSION_SNAPSHOT_KEY);
        return;
    }
    var savedTime = Date.parse(snapshot.savedAt || "");
    if (Number.isFinite(savedTime) && Date.now() - savedTime > 7 * 24 * 60 * 60 * 1000) {
        localStorage.removeItem(V18_SESSION_SNAPSHOT_KEY);
        return;
    }
    var promptText = currentLanguage === "ja"
        ? "前回のプレイを続きから再開しますか？\n" + snapshot.boardSize + "×" + snapshot.boardSize + "・" + (Number(snapshot.moves) || 0) + "手"
        : "Resume the previous game?\n" + snapshot.boardSize + "x" + snapshot.boardSize + " / " + (Number(snapshot.moves) || 0) + " moves";
    if (confirm(promptText)) {
        v18RestoreSavedSession(snapshot);
    } else {
        localStorage.removeItem(V18_SESSION_SNAPSHOT_KEY);
        v18RecordSystemEvent("session_restore_declined", { savedAt: snapshot.savedAt || null });
    }
}

setTimeout(v18OfferSavedSessionRestore, 300);


/* ========================================
   Teko-chan official character selection
======================================== */
var TEKO_CHARACTER_ASSETS = {
    wave: "images/teko-chan/teko-wave.webp",
    jump: "images/teko-chan/teko-jump.webp",
    sad: "images/teko-chan/teko-sad.webp",
    confused: "images/teko-chan/teko-confused.webp"
};
function setTekoCharacterPose(poseName) {
    var image = document.getElementById("teko-mascot-image");
    var fallback = document.getElementById("teko-mascot-fallback");
    if (!image) return;
    var selectedPose = TEKO_CHARACTER_ASSETS[poseName] ? poseName : "wave";
    image.src = TEKO_CHARACTER_ASSETS[selectedPose];
    image.dataset.tekoPose = selectedPose;
    image.hidden = false;
    if (fallback) fallback.hidden = true;
}
function getTekoClearPose() {
    return boardSize >= 5 ? "jump" : "wave";
}
var tekoOriginalStartClearCelebration = startClearCelebration;
startClearCelebration = function () {
    setTekoCharacterPose(getTekoClearPose());
    return tekoOriginalStartClearCelebration.apply(this, arguments);
};
window.setTekoCharacterPose = setTekoCharacterPose;

/* ========================================
   Ver.1.8.2 stability lifecycle revision 1
======================================== */
var V182_GAME_ACTIVE = false;
function v182CancelProgressFrame() {
    if (v17R10FrameId) {
        window.cancelAnimationFrame(v17R10FrameId);
        v17R10FrameId = 0;
    }
    v17R9PendingCheck = false;
}
function v182StopRuntimeWork(options) {
    options = options || {};
    clearInterval(timer); timer = null;
    clearInterval(gameBgmFadeTimer); gameBgmFadeTimer = null;
    clearTimeout(oneStepHintTimer); oneStepHintTimer = null;
    v182CancelProgressFrame();
    stopRowCompletionCelebration();
    if (options.clearCelebration !== false) stopClearCelebration();
    if (v17R10Observer) { v17R10Observer.disconnect(); v17R10Observer = null; }
    V182_GAME_ACTIVE = false;
}
function v182StartRuntimeWork() {
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
    V182_GAME_ACTIVE = true;
    resetV17R9ProgressCelebration();
}
function v182UpdateResumeMessage() {
    if (!message) return;
    message.textContent = currentLanguage === "ja"
        ? "前回の続きから再開しました"
        : "Previous game restored";
    message.classList.add("v182-resume-message");
}
var v182OriginalShuffle = shuffle;
shuffle = function () {
    v182StopRuntimeWork();
    var result = v182OriginalShuffle.apply(this, arguments);
    v182StartRuntimeWork();
    return result;
};
var v182OriginalRestore = v18RestoreSavedSession;
v18RestoreSavedSession = function (snapshot) {
    v182StopRuntimeWork();
    var result = v182OriginalRestore.apply(this, arguments);
    v182StartRuntimeWork();
    v182UpdateResumeMessage();
    return result;
};
var v182OriginalCancel = cancelGame;
cancelGame = function () { v182StopRuntimeWork(); return v182OriginalCancel.apply(this, arguments); };
var v182OriginalCloseClear = closeClearPanel;
closeClearPanel = function () { v182StopRuntimeWork(); return v182OriginalCloseClear.apply(this, arguments); };
var v182OriginalCheckClear = checkClear;
checkClear = function () {
    var wasSolved = isSolved;
    var result = v182OriginalCheckClear.apply(this, arguments);
    if (!wasSolved && isSolved) {
        v182StopRuntimeWork({ clearCelebration: false });
        localStorage.setItem("v182LastCompletedImage", currentImage || "");
    }
    return result;
};
document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
        clearInterval(timer); timer = null; v182CancelProgressFrame();
    } else if (gameStarted && !isSolved && V182_GAME_ACTIVE && timer === null) {
        timer = setInterval(updateTimer, 1000);
    }
});
window.addEventListener("pagehide", function () { v182StopRuntimeWork(); });

/* ========================================
   Ver.1.8.3 Android back navigation
======================================== */
window.handleAnimalBack = function () {
    var album = document.getElementById("album-container");
    if (clearPanel && clearPanel.classList.contains("show")) {
        closeClearPanel();
        return "handled";
    }
    if (album && (album.style.display === "flex" || album.style.display === "block")) {
        closeAnimalAlbum();
        return "handled";
    }
    if (settingsMenu && settingsMenu.style.display !== "none" && settingsMenu.style.display !== "") {
        closeSettings();
        return "handled";
    }
    if (gameScreen && gameScreen.style.display !== "none" && gameStarted) {
        var text = currentLanguage === "ja"
            ? "ゲームを中断してタイトルへ戻りますか？進行状況は保存されます。"
            : "Pause this game and return to the title? Progress will be saved.";
        if (window.confirm(text)) {
            if (typeof v18SaveActiveSession === "function") v18SaveActiveSession("android_back");
            cancelGame();
        }
        return "handled";
    }
    return "exit";
};

/* Ver.1.8.6: Ver.1.8.5 completed-preview rollback.
   Keeps Ver.1.8.2-1.8.4 stability, back navigation, visibility and scroll fixes. */

/* ========================================
   Ver.1.8.7 resumed game BGM recovery
======================================== */
var v187OriginalRestoreSavedSession = v18RestoreSavedSession;
var v1813ResumeBgmPending = false;
v18RestoreSavedSession = function (snapshot) {
    var result = v187OriginalRestoreSavedSession.apply(this, arguments);
    v1813ResumeBgmPending = Boolean(gameStarted && !isSolved && bgmEnabled && bgmVolume > 0);
    return result;
};
var v1813AudioRecoveryRunning = false;
async function v187RecoverBgmAfterUserGesture() {
    if (!bgmEnabled || bgmVolume <= 0 || v1813AudioRecoveryRunning) return;
    v1813AudioRecoveryRunning = true;
    try {
        initializeAudioGraph();
        if (audioContext && audioContext.state === "suspended") {
            await audioContext.resume();
        }
        if (gameStarted && !isSolved && gameScreen && gameScreen.style.display !== "none") {
            if (gameBgm.paused || v1813ResumeBgmPending) {
                v1813ResumeBgmPending = false;
                startGameBgm();
            }
            return;
        }
        if (!gameStarted && titleScreen && titleScreen.style.display !== "none" && titleBgm.paused) {
            startTitleBgm();
        }
    } catch (error) {
        /* The next user gesture retries audio recovery. */
    } finally {
        v1813AudioRecoveryRunning = false;
    }
}
document.addEventListener("keydown", v187RecoverBgmAfterUserGesture);

/* ========================================
   Ver.1.8.8 version display and production settings
======================================== */
function v188CreateVersionLabel(className) {
    var label = document.createElement("div");
    label.className = "app-version-label " + className;
    label.textContent = "Ver." + V18_APP_VERSION;
    label.setAttribute("aria-label", "Application version " + V18_APP_VERSION);
    return label;
}
function v188InstallVersionLabels() {
    var titleStage = document.getElementById("title-stage");
    if (titleStage && !titleStage.querySelector(".title-version-label")) {
        titleStage.appendChild(v188CreateVersionLabel("title-version-label"));
    }
    var gameScreenNode = document.getElementById("game-screen");
    if (gameScreenNode && !gameScreenNode.querySelector(".game-version-label")) {
        gameScreenNode.appendChild(v188CreateVersionLabel("game-version-label"));
    }
}
function v188ApplyProductionSettings() {
    var debugSetting = document.getElementById("hint-debug-setting");
    if (debugSetting) {
        debugSetting.hidden = true;
        debugSetting.setAttribute("aria-hidden", "true");
    }
}
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
        v188InstallVersionLabels();
        v188ApplyProductionSettings();
    });
} else {
    v188InstallVersionLabels();
    v188ApplyProductionSettings();
}

/* Ver.1.8.9 Android missing assets: TEKO GAMES logo and Teko-chan clear image packaged. */

/* Ver.1.8.10 Android asset packaging finalized. */

/* Ver.1.8.11 Teko result assets packaged: clear, wave, jump, sad, confused. */

/* ========================================
   Ver.1.8.12 zero-move resume and album guidance
======================================== */
var v1812OriginalSaveSessionSnapshot = v18SaveSessionSnapshot;
v18SaveSessionSnapshot = function () {
    if (!gameStarted || isSolved || moves <= 0) {
        if (moves <= 0) localStorage.removeItem(V18_SESSION_SNAPSHOT_KEY);
        return;
    }
    return v1812OriginalSaveSessionSnapshot.apply(this, arguments);
};
var v1812OriginalOfferSavedSessionRestore = v18OfferSavedSessionRestore;
v18OfferSavedSessionRestore = function () {
    var snapshot = v18SafeReadJson(V18_SESSION_SNAPSHOT_KEY, null);
    if (snapshot && (Number(snapshot.moves) || 0) <= 0) {
        localStorage.removeItem(V18_SESSION_SNAPSHOT_KEY);
        return;
    }
    return v1812OriginalOfferSavedSessionRestore.apply(this, arguments);
};
function v1812InstallAlbumUnlockGuide() {
    var summary = document.getElementById("album-summary");
    if (!summary || document.getElementById("album-unlock-guide")) return;
    var guide = document.createElement("p");
    guide.id = "album-unlock-guide";
    guide.setAttribute("aria-live", "polite");
    summary.insertAdjacentElement("afterend", guide);
    v1812UpdateAlbumUnlockGuide();
}
function v1812UpdateAlbumUnlockGuide() {
    var guide = document.getElementById("album-unlock-guide");
    if (!guide) return;
    guide.textContent = currentLanguage === "ja"
        ? "🔓 4×4・5×5をクリアすると、その動物画像が解放されます。"
        : "🔓 Clear a 4×4 or 5×5 puzzle to unlock that animal image.";
}
var v1812OriginalOpenAnimalAlbum = openAnimalAlbum;
openAnimalAlbum = function () {
    v1812InstallAlbumUnlockGuide();
    v1812UpdateAlbumUnlockGuide();
    return v1812OriginalOpenAnimalAlbum.apply(this, arguments);
};
var v1812OriginalApplyLanguage = applyLanguage;
applyLanguage = function () {
    var result = v1812OriginalApplyLanguage.apply(this, arguments);
    v1812InstallAlbumUnlockGuide();
    v1812UpdateAlbumUnlockGuide();
    return result;
};
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", v1812InstallAlbumUnlockGuide);
} else {
    v1812InstallAlbumUnlockGuide();
}

/* ========================================
   Ver.1.8.13 resumed audio and fading notice
======================================== */
var v1813ResumeNoticeTimer = null;
var v1813ResumeNoticeRemoveTimer = null;
function v1813ScheduleResumeNoticeFade() {
    if (!message || !message.classList.contains("v182-resume-message")) return;
    clearTimeout(v1813ResumeNoticeTimer);
    clearTimeout(v1813ResumeNoticeRemoveTimer);
    message.classList.remove("resume-notice-fading");
    message.hidden = false;
    v1813ResumeNoticeTimer = window.setTimeout(function () {
        message.classList.add("resume-notice-fading");
        v1813ResumeNoticeRemoveTimer = window.setTimeout(function () {
            message.hidden = true;
            message.textContent = "";
            message.classList.remove("v182-resume-message", "v181-resume-message", "resume-notice-fading");
        }, 1400);
    }, 5000);
}
var v1813OriginalRestoreSavedSession = v18RestoreSavedSession;
v18RestoreSavedSession = function (snapshot) {
    var result = v1813OriginalRestoreSavedSession.apply(this, arguments);
    v1813ScheduleResumeNoticeFade();
    return result;
};
document.addEventListener("pointerdown", v187RecoverBgmAfterUserGesture, { capture: true, passive: true });

/* ========================================
   Ver.1.8.15 automatic preview launch animation
======================================== */
var v1815PreviewImage = null;
var v1815PreviewRunning = false;
var v1815PreviousBodyOverflow = "";
function v1815InstallPreview() {
    if (document.getElementById("v1815-preview-container")) return;
    var container = document.createElement("div");
    container.id = "v1815-preview-container";
    container.hidden = true;
    container.setAttribute("aria-live", "polite");
    container.innerHTML = [
        '<div id="v1815-preview-card">',
        '<h2 id="v1815-preview-title"></h2>',
        '<div id="v1815-preview-difficulty"></div>',
        '<img id="v1815-preview-image" alt="">',
        '</div>'
    ].join("");
    document.body.appendChild(container);
    v1815UpdateLanguage();
}
function v1815UpdateLanguage() {
    var title = document.getElementById("v1815-preview-title");
    var difficulty = document.getElementById("v1815-preview-difficulty");
    var image = document.getElementById("v1815-preview-image");
    if (title) title.textContent = currentLanguage === "ja" ? "今回の完成図" : "Completed Image";
    if (difficulty) difficulty.textContent = getDifficultyName() + "  " + boardSize + " × " + boardSize;
    if (image) image.alt = currentLanguage === "ja" ? "今回のパズルの完成図" : "Completed image for this puzzle";
}
function v1815GetSuctionTransform(imageElement) {
    var button = document.getElementById("original-button");
    if (!button || !imageElement) return { x: 0, y: window.innerHeight * 0.42 };
    var imageRect = imageElement.getBoundingClientRect();
    var buttonRect = button.getBoundingClientRect();
    return {
        x: (buttonRect.left + buttonRect.width / 2) - (imageRect.left + imageRect.width / 2),
        y: (buttonRect.top + buttonRect.height / 2) - (imageRect.top + imageRect.height / 2)
    };
}
function v1815FinishPreviewAndStart() {
    var container = document.getElementById("v1815-preview-container");
    if (container) {
        container.hidden = true;
        container.style.display = "none";
        container.classList.remove("show", "sucking");
    }
    document.body.style.overflow = v1815PreviousBodyOverflow;
    var selectedImage = v1815PreviewImage;
    v1815PreviewImage = null;
    v1815PreviewRunning = false;
    if (!selectedImage) return;
    v17ReplayImage = selectedImage;
    shuffle();
}
function v1814OpenStartPreview() {
    if (selectedAnimalMode === null || selectedDifficulty === null || gameStarted || v1815PreviewRunning) return;
    v1815InstallPreview();
    v1815PreviewRunning = true;
    playSoundEffect(buttonSound).catch(function () {});
    randomImage();
    if (!currentImage) { v1815PreviewRunning = false; return; }
    v1815PreviewImage = currentImage;
    var container = document.getElementById("v1815-preview-container");
    var image = document.getElementById("v1815-preview-image");
    image.src = "images/" + v1815PreviewImage;
    image.style.setProperty("--suction-x", "0px");
    image.style.setProperty("--suction-y", "0px");
    v1815UpdateLanguage();
    v1815PreviousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    container.hidden = false;
    container.style.display = "flex";
    window.requestAnimationFrame(function () { container.classList.add("show"); });
    window.setTimeout(function () {
        if (!v1815PreviewRunning) return;
        var target = v1815GetSuctionTransform(image);
        image.style.setProperty("--suction-x", target.x + "px");
        image.style.setProperty("--suction-y", target.y + "px");
        container.classList.add("sucking");
    }, 2000);
    window.setTimeout(v1815FinishPreviewAndStart, 2920);
}
var v1815OriginalApplyLanguage = applyLanguage;
applyLanguage = function () {
    var result = v1815OriginalApplyLanguage.apply(this, arguments);
    v1815UpdateLanguage();
    return result;
};
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", v1815InstallPreview);
} else {
    v1815InstallPreview();
}

/* ========================================
   Ver.1.8.16 public difficulties and 4x4 album unlock
======================================== */
function v1816ApplyPublicDifficultyPolicy() {
    var sixButton = document.getElementById("diff-6");
    if (sixButton) {
        sixButton.hidden = true;
        sixButton.setAttribute("aria-hidden", "true");
        sixButton.tabIndex = -1;
    }
    if (!gameStarted && selectedDifficulty === 6) {
        selectedDifficulty = null;
        boardSize = 3;
        updateDifficultyButtons();
        updateV17DifficultyRoleDescription();
        updateStartButtonState();
        createBoard();
        draw();
    }
}
var v1816OriginalReplayAlbumImage = replayAlbumImage;
replayAlbumImage = function (image) {
    if (selectedDifficulty === 6) {
        selectedDifficulty = 5;
        boardSize = 5;
    }
    return v1816OriginalReplayAlbumImage.apply(this, arguments);
};
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", v1816ApplyPublicDifficultyPolicy);
} else {
    v1816ApplyPublicDifficultyPolicy();
}

/* ========================================
   Ver.1.8.17 clear fanfare isolation
======================================== */
var v1817OriginalPlaySoundEffect = playSoundEffect;
playSoundEffect = function (audio, options) {
    if (audio === clearSound && !isSolved) {
        if (typeof v18RecordSystemEvent === "function") {
            v18RecordSystemEvent("blocked_premature_clear_fanfare", {
                boardSize: boardSize,
                moves: moves,
                reason: "board_not_solved"
            });
        }
        return Promise.resolve(false);
    }
    return v1817OriginalPlaySoundEffect.call(this, audio, options);
};

/* ========================================
   Ver.1.8.18 album cleanup and replay difficulty picker
======================================== */
var v1818ReplayImage = null;
function v1818GetAlbumProgressText() {
    var images = getAlbumCategoryImages(albumCategory);
    var unlocked = readV17Set(V17_UNLOCKED_KEY);
    var count = images.filter(function (image) { return unlocked.has(image); }).length;
    var remaining = Math.max(0, images.length - count);
    if (currentLanguage === "ja") {
        return "解放 " + count + " / " + images.length + "  ・  あと" + remaining + "種類";
    }
    return "Unlocked " + count + " / " + images.length + "  ·  " + remaining + " remaining";
}
function v1818InstallAlbumStructure() {
    var tabs = document.getElementById("album-category-tabs");
    var filters = document.getElementById("album-filter-row");
    if (tabs && !document.getElementById("v1818-album-category-label")) {
        var categoryLabel = document.createElement("div");
        categoryLabel.id = "v1818-album-category-label";
        categoryLabel.className = "v1818-album-section-label";
        tabs.insertAdjacentElement("beforebegin", categoryLabel);
    }
    if (filters && !document.getElementById("v1818-album-filter-label")) {
        var filterLabel = document.createElement("div");
        filterLabel.id = "v1818-album-filter-label";
        filterLabel.className = "v1818-album-section-label";
        filters.insertAdjacentElement("beforebegin", filterLabel);
    }
    v1818UpdateAlbumLabels();
}
function v1818UpdateAlbumLabels() {
    var categoryLabel = document.getElementById("v1818-album-category-label");
    var filterLabel = document.getElementById("v1818-album-filter-label");
    if (categoryLabel) categoryLabel.textContent = currentLanguage === "ja" ? "動物の種類" : "Animal Category";
    if (filterLabel) filterLabel.textContent = currentLanguage === "ja" ? "表示する画像" : "Images to Show";
}
var v1818OriginalRenderAnimalAlbum = renderAnimalAlbum;
renderAnimalAlbum = function () {
    v1818InstallAlbumStructure();
    var result = v1818OriginalRenderAnimalAlbum.apply(this, arguments);
    var summary = document.getElementById("album-summary");
    if (summary) summary.textContent = v1818GetAlbumProgressText();
    v1818UpdateAlbumLabels();
    return result;
};
function v1818InstallReplayPicker() {
    if (document.getElementById("v1818-replay-picker")) return;
    var picker = document.createElement("div");
    picker.id = "v1818-replay-picker";
    picker.hidden = true;
    picker.setAttribute("role", "dialog");
    picker.setAttribute("aria-modal", "true");
    picker.innerHTML = [
        '<div id="v1818-replay-picker-content">',
        '<h2 id="v1818-replay-picker-title"></h2>',
        '<img id="v1818-replay-picker-image" alt="">',
        '<p id="v1818-replay-picker-prompt"></p>',
        '<div id="v1818-replay-difficulties">',
        '<button type="button" data-size="3"><strong></strong><span>3 × 3</span></button>',
        '<button type="button" data-size="4"><strong></strong><span>4 × 4</span></button>',
        '<button type="button" data-size="5"><strong></strong><span>5 × 5</span></button>',
        '</div>',
        '<button id="v1818-replay-cancel" type="button"></button>',
        '</div>'
    ].join("");
    document.body.appendChild(picker);
    picker.querySelectorAll("[data-size]").forEach(function (button) {
        button.addEventListener("click", function () {
            v1818StartAlbumReplay(Number(button.dataset.size));
        });
    });
    document.getElementById("v1818-replay-cancel").addEventListener("click", v1818CloseReplayPicker);
    picker.addEventListener("click", function (event) {
        if (event.target === picker) v1818CloseReplayPicker();
    });
    v1818UpdateReplayPickerLanguage();
}
function v1818UpdateReplayPickerLanguage() {
    var title=document.getElementById("v1818-replay-picker-title");
    var prompt=document.getElementById("v1818-replay-picker-prompt");
    var cancel=document.getElementById("v1818-replay-cancel");
    var image=document.getElementById("v1818-replay-picker-image");
    if(title) title.textContent=currentLanguage === "ja" ? "この画像で遊ぶ" : "Play with This Image";
    if(prompt) prompt.textContent=currentLanguage === "ja" ? "難易度を選んでください" : "Choose a difficulty";
    if(cancel) cancel.textContent=currentLanguage === "ja" ? "キャンセル" : "Cancel";
    if(image) image.alt=currentLanguage === "ja" ? "選択した動物画像" : "Selected animal image";
    var names=currentLanguage === "ja" ? {3:"初級",4:"中級",5:"上級"} : {3:"Easy",4:"Normal",5:"Hard"};
    document.querySelectorAll("#v1818-replay-difficulties [data-size]").forEach(function(button){
        var strong=button.querySelector("strong");
        if(strong) strong.textContent=names[Number(button.dataset.size)];
    });
}
replayAlbumImage = function (image) {
    if (!readV17Set(V17_UNLOCKED_KEY).has(image)) return;
    v1818InstallReplayPicker();
    v1818ReplayImage = image;
    var preview = document.getElementById("v1818-replay-picker-image");
    if (preview) preview.src = "images/" + image;
    var picker = document.getElementById("v1818-replay-picker");
    picker.hidden = false;
    picker.style.display = "flex";
    document.body.style.overflow = "hidden";
    playSoundEffect(buttonSound).catch(function () {});
};
function v1818CloseReplayPicker() {
    var picker=document.getElementById("v1818-replay-picker");
    if(picker){ picker.hidden=true; picker.style.display="none"; }
    v1818ReplayImage=null;
    var album=document.getElementById("album-container");
    document.body.style.overflow = album && album.style.display === "flex" ? "hidden" : "";
}
function v1818StartAlbumReplay(size) {
    if (![3,4,5].includes(size) || !v1818ReplayImage) return;
    var image=v1818ReplayImage;
    v1818ReplayImage=null;
    var picker=document.getElementById("v1818-replay-picker");
    if(picker){ picker.hidden=true; picker.style.display="none"; }
    selectedDifficulty=size;
    boardSize=size;
    selectedAnimalMode=getImageCategory(image);
    isSolved=false;
    gameStarted=false;
    createBoard();
    updateMovesDisplay();
    updateTimerDisplay();
    updateBestDisplay();
    document.querySelectorAll("#difficulty-container button").forEach(function(button){
        button.classList.toggle("selected-difficulty", button.id === "diff-" + size);
    });
    document.querySelectorAll("#animal-mode-container button").forEach(function(button){
        button.classList.toggle("selected-animal-mode", button.id === "animal-mode-" + selectedAnimalMode);
    });
    updateV17DifficultyRoleDescription();
    updateStartButtonState();
    draw();
    closeAnimalAlbum();
    v17ReplayImage=image;
    v1814OpenStartPreview();
}
var v1818OriginalApplyLanguage=applyLanguage;
applyLanguage=function(){
    var result=v1818OriginalApplyLanguage.apply(this,arguments);
    v1818UpdateAlbumLabels();
    v1818UpdateReplayPickerLanguage();
    return result;
};
var v1818OriginalHandleAnimalBack=window.handleAnimalBack;
window.handleAnimalBack=function(){
    var picker=document.getElementById("v1818-replay-picker");
    if(picker && !picker.hidden && picker.style.display !== "none"){
        v1818CloseReplayPicker();
        return "handled";
    }
    return v1818OriginalHandleAnimalBack.apply(this,arguments);
};
if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded",function(){v1818InstallAlbumStructure();v1818InstallReplayPicker();});
}else{
    v1818InstallAlbumStructure();v1818InstallReplayPicker();
}

/* ========================================
   Ver.1.8.19 unified BGM lifecycle
======================================== */
document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
        clearInterval(gameBgmFadeTimer);
        gameBgmFadeTimer = null;
        if (!titleBgm.paused) titleBgm.pause();
        if (!gameBgm.paused) gameBgm.pause();
        return;
    }
    /* BGM resumes only after the next real user gesture. */
    if (gameStarted && !isSolved && bgmEnabled && bgmVolume > 0) {
        v1813ResumeBgmPending = true;
    }
});

/* ========================================
   Ver.1.8.20 unified Android back navigation
======================================== */
function v1820IsVisible(element) {
    if (!element || element.hidden) return false;
    var style = window.getComputedStyle(element);
    return style.display !== "none" && style.visibility !== "hidden";
}
function v1820ReturnToTitle() {
    clearInterval(timer);
    timer = null;
    clearInterval(gameBgmFadeTimer);
    gameBgmFadeTimer = null;
    stopGameBgm();
    gameScreen.classList.remove("game-playing");
    gameScreen.style.display = "none";
    titleScreen.classList.remove("title-starting", "title-fade-out");
    titleScreen.style.display = "flex";
    titleScreen.style.opacity = "1";
    document.body.style.overflow = "";
    titleBgmGuide.classList.toggle("hidden", !bgmEnabled || bgmVolume <= 0);
}
function v1820ConfirmExit() {
    var text = currentLanguage === "ja"
        ? "動物スライドパズルを終了しますか？"
        : "Exit Animal Slide Puzzle?";
    return window.confirm(text);
}
window.handleAnimalBack = function () {
    var replayPicker = document.getElementById("v1818-replay-picker");
    var preview = document.getElementById("v1815-preview-container");
    var album = document.getElementById("album-container");

    if (v1820IsVisible(replayPicker)) {
        v1818CloseReplayPicker();
        return "handled";
    }
    if (v1820IsVisible(originalContainer)) {
        closeOriginal();
        return "handled";
    }
    if (v1820IsVisible(basicHintContainer)) {
        closeBasicHint();
        return "handled";
    }
    if (v1820IsVisible(settingsMenu)) {
        closeSettings();
        return "handled";
    }
    if (v1820IsVisible(album)) {
        closeAnimalAlbum();
        return "handled";
    }
    if (clearPanel && (clearPanel.classList.contains("show") || v1820IsVisible(clearPanel))) {
        closeClearPanel();
        return "handled";
    }
    if (preview && v1815PreviewRunning && v1820IsVisible(preview)) {
        /* The automatic preview is a short start animation and is not cancelled. */
        return "handled";
    }
    if (gameStarted && !isSolved && v1820IsVisible(gameScreen)) {
        var pauseText = currentLanguage === "ja"
            ? "ゲームを中断して選択画面へ戻りますか？進行状況は保存されます。"
            : "Pause this game and return to the selection screen? Progress will be saved.";
        if (window.confirm(pauseText)) {
            v18SaveSessionSnapshot();
            cancelGame();
        }
        return "handled";
    }
    if (v1820IsVisible(gameScreen)) {
        v1820ReturnToTitle();
        return "handled";
    }
    if (v1820IsVisible(titleScreen)) {
        return v1820ConfirmExit() ? "exit" : "handled";
    }
    return "handled";
};
