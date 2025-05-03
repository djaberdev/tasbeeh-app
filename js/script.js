/* --- Sidebar --- */
const sidebar = document.querySelector(".sidebar");
const menuBtn = document.getElementById("menuBtn");
const hideSideBar = document.getElementById("hideSideBar");

menuBtn.onclick = () => sidebar.classList.add("show");

hideSideBar.onclick = () => sidebar.classList.remove("show");

/* --- Create and Show The Main Data --- */
const adhkar = [
    {
        text: "سبحان الله",
        meaning: "سبحان الله",
        countFinish: 33,
        actualCount: 0,
        finishTimes: 0
    },
    {
        text: "الحمد لله",
        meaning: "الحمد والثناء لله",
        countFinish: 33,
        actualCount: 0,
        finishTimes: 0
    },
    {
        text: "الله أكبر",
        meaning: "الله أعظم من كل شيء",
        countFinish: 33,
        actualCount: 0,
        finishTimes: 0
    },
    {
        text: "لا إله إلا الله",
        meaning: "لا معبود بحق إلا الله",
        countFinish: 100,
        actualCount: 0,
        finishTimes: 0
    },
    {
        text: "أستغفر الله العظيم وأتوب إليه",
        meaning: "أطلب المغفرة من الله العظيم وأتوب إليه",
        countFinish: 100,
        actualCount: 0,
        finishTimes: 0
    },
    {
        text: "لا حول ولا قوة إلا بالله",
        meaning: "لا تغيير ولا قدرة إلا بعون الله",
        countFinish: 1,
        actualCount: 0,
        finishTimes: 0
    },
    {
        text: "سبحان الله وبحمده",
        meaning: "تنزيه الله مع الثناء عليه",
        countFinish: 100,
        actualCount: 0,
        finishTimes: 0
    },
    {
        text: "سبحان الله العظيم",
        meaning: "تنزيه الله العظيم",
        countFinish: 100,
        actualCount: 0,
        finishTimes: 0
    },
    {
        text: "اللهم صل وسلم على نبينا محمد",
        meaning: "اللهم أنزل الرحمة والسلام على نبينا محمد",
        countFinish: 100,
        actualCount: 0,
        finishTimes: 0
    },
    {
        text: "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير",
        meaning: "لا معبود بحق إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير",
        countFinish: 100,
        actualCount: 0,
        finishTimes: 0
    },
    {
        text: "سبحان الله وبحمده سبحان الله العظيم",
        meaning: "تنزيه العظيم الله مع الثناء عليه",
        countFinish: 100,
        actualCount: 0,
        finishTimes: 0
    },
    {
        text: "حسبي الله لا إله إلا هو، عليه توكلت وهو رب العرش العظيم",
        meaning: "التوكل على الله حق التوكل",
        countFinish: 7,
        actualCount: 0,
        finishTimes: 0
    }
];
const updatedAdhkar = adhkar.map((dhikr, index) => (
    {
        ...dhikr,
        id: index + 1
    }
));
const adhkarContainer = document.querySelector(".adhkar-area");

// Main Settings
let counter;
let finishCounter;
let currentLevel;
let reachedLevelsCount;

/* -- Template Using "getter/setter" To Trigger A Function When A Variable Get Updated -- */

// 1. State object with custom getter/setter
const reactiveState = {
    _reachedLevelsCount: 0, // internal storage

    get reachedLevelsCount() {
        return this._reachedLevelsCount;
    },

    set reachedLevelsCount(value) {

        const oldValue = this._reachedLevelsCount;
        this._reachedLevelsCount = value;

        // Call effect handler
        onRLCChange(oldValue, value);

    }
};

// 2. Handler that runs when the value changes
function onRLCChange(oldValue, newValue) {
    
    // Check If The Previous State Has Changed To a New State
    if (newValue > oldValue) {

        displayRank(currentLevel, newValue);
        onLevelUp(newValue);
        saveLevelsCount();
        
    };

};

// 3. Example usage:
// reactiveState.reachedLevelsCount = 1; // Triggers the onRLCChange() function

// Create The Dhikr Box Element
updatedAdhkar.forEach((dhikr, index) => {
    
    const dhikrBox = document.createElement("div");
    dhikrBox.setAttribute("class", "dhikr-box");
    dhikrBox.setAttribute("data-index", index);

    dhikrBox.innerHTML = `
        <div class="info">
            <h3>${dhikr.text}</h3>
            <span>${dhikr.countFinish < 10 ? `0${dhikr.countFinish}` : dhikr.countFinish}</span>
        </div>
        <p class="meaning">${dhikr.meaning || "غير محدد"}</p>
    `;

    adhkarContainer.appendChild(dhikrBox);

});

// Precess Of Selecting The Needed Dhikr 
const adhkarArray = Array.from(document.getElementsByClassName("dhikr-box"));

adhkarArray.forEach(dhikrEl => {
    dhikrEl.addEventListener("click", (e) => {

        adhkarArray.forEach(dEl => dEl.classList.remove("selected"));
        
        e.currentTarget.classList.add("selected");

        // Get The Selected Dhikr Object
        let dataIndex = Number(e.currentTarget.getAttribute("data-index"));
        let dhikrObject = updatedAdhkar[dataIndex];
        addData(dhikrObject);

        // Reset Counters
        counter = 0;
        finishCounter = 0;

        // Reset User Progress Or Rank
        currentLevel = "";
        reachedLevelsCount = 0;
        saveLevel();
        saveLevelsCount();

        // Close The Sidebar
        sidebar.classList.remove("show");

    });

});

// Save The First "DhikrObject" As The Default One 
// This Done Before The User Select Something Or When There Is No Saved Dhikr
if (!localStorage.getItem("dhikrObject")) saveDhikr(updatedAdhkar[0]);

// Add The "selected" Class To The "dhikrEl" Depends On The Saved Dhikr Object Within The Local Storage
let savedDhikr = getSavedDhikr();
if (savedDhikr) {
    let filteredAdhkarArray = adhkarArray.filter(dhikrEl => (dhikrEl.getAttribute("data-index") == (savedDhikr.id - 1)));
    filteredAdhkarArray.forEach(element => element.classList.add("selected"));
};

// Select Some Elements & Settings
const dhikrHolder = document.querySelector(".dhikr p");
const dhikrFinish = document.querySelector(".counter-holder .finish");
const dhikrCount = document.querySelector(".counter-holder .count");
const totalFinishes = document.querySelector(".total-finishes p span");

function addData(dhikrObj) {
    
    // Show Data / Add Data To The Elements
    dhikrHolder.textContent = dhikrObj.text;
    dhikrCount.textContent = dhikrObj.actualCount < 10 ? `0${dhikrObj.actualCount}` : dhikrObj.actualCount;
    dhikrFinish.textContent = dhikrObj.countFinish < 10 ? `0${dhikrObj.countFinish}` : dhikrObj.countFinish;
    totalFinishes.textContent = dhikrObj.finishTimes;

    // Save Dhikr Object To Local Storage
    saveDhikr(dhikrObj);

};

function saveDhikr(dObject) {
    localStorage.setItem("dhikrObject", JSON.stringify(dObject));
}

function getSavedDhikr() {
    let savedDhikrObject = localStorage.getItem("dhikrObject") ? JSON.parse(localStorage.getItem("dhikrObject")) : alert("There is no saved dhikr yet try to select one!");
    return savedDhikrObject;
}

/* --- Build Sound Control --- */
const soundsEffects = [
    {
        path: "assets/audio/click.mp3",
        bgColor: "rgba(8, 74, 73, 0.7)"
    },
    {
        path: "assets/audio/pen-click.mp3",
        bgColor: "rgba(203, 154, 52, 0.7)"
    },
    {
        path: "assets/audio/rightanswer.mp3",
        bgColor: "rgba(203, 24, 20, 0.7)"
    }
];
const soundsControl = document.getElementById("soundsControl");
const soundsContainer = document.querySelector(".sounds-container");

// Create The Sound Box
soundsEffects.forEach(soundEffect => {

    const soundBox = document.createElement("div");
    soundBox.classList.add("sound-box");
    soundBox.setAttribute("data-sound", soundEffect.path);

    soundBox.innerHTML = `
        <div style="background-color: ${soundEffect.bgColor};">
            <i class="ri-music-2-fill"></i>
        </div>
    `;

    soundsContainer.appendChild(soundBox);

});

// Choose Sound Process
const soundBoxes = Array.from(document.getElementsByClassName("sound-box"));

soundBoxes.forEach(soundBox => {
    soundBox.addEventListener("click", (e) => {

        soundBoxes.forEach(sBox => sBox.classList.remove("active"));
        e.currentTarget.classList.add("active");

        // Save The Chosen Sound
        localStorage.setItem("chosenSound", JSON.stringify(e.currentTarget.getAttribute("data-sound")));

    });

});

// Pick A Sound And Save It As The Default One 
// This Done Before The User Select Something Or When There Is No Saved Sound
if (!localStorage.getItem("chosenSound")) localStorage.setItem("chosenSound", JSON.stringify(soundBoxes[1].getAttribute("data-sound")));

// Add The "active" Class To The "soundBox" Depends On The Saved Sound Within The Local Storage
let savedSound = getSavedSound();
if (savedSound) {
    let filteredSoundBoxes = soundBoxes.filter(soundBox => (soundBox.getAttribute("data-sound") === savedSound));
    filteredSoundBoxes.forEach(element => element.classList.add("active"));
};

function getSavedSound() {
    let savedSound = localStorage.getItem("chosenSound") ? JSON.parse(localStorage.getItem("chosenSound")) : alert("There is no saved sound!");
    return savedSound;
}

soundsControl.onclick = () => { soundsContainer.classList.toggle("show") };

/* --- Enable / Disable Sound Effect --- */
const soundBtn = document.getElementById("soundBtn");
const icon = soundBtn.querySelector("i");
let isEnabled = true; // ! Enabled By Default

function toggleIsEnabled() {
    
    // Toggle Process
    isEnabled = !isEnabled;

    // Check And Change The HTML
    soundChecker();

};

function soundChecker() {
    if (isEnabled) {

        // Changing HTML
        soundBtn.setAttribute("title", "أطفئ مؤثرات الصوت");
        soundBtn.classList.add("disable");
        icon.classList.replace("ri-volume-up-line", "ri-volume-mute-line");
        
    } else {
        
        // Changing HTML
        soundBtn.setAttribute("title", "أشعل مؤثرات الصوت");
        soundBtn.classList.remove("disable");
        icon.classList.replace("ri-volume-mute-line", "ri-volume-up-line");

    };
};

soundBtn.addEventListener("click", toggleIsEnabled);

/* --- Tasbeeh Functionality --- */
const countBtn = document.getElementById("countBtn");

// Restore saved dhikr object from localStorage
document.addEventListener("DOMContentLoaded", () => {
    let savedDhikr = getSavedDhikr();
    addData(savedDhikr);
    counter = savedDhikr.actualCount || 0;
    finishCounter = savedDhikr.finishTimes || 0;
});

// Set / Get The Sound Effect 
let soundEffect = new Audio();

// Help When The Page Reloads
soundEffect.src = getSavedSound(); 

function addToCount() {

    // Get The Saved Dhikr Object From Local Storage
    const savedObject = getSavedDhikr();

    // Increase The "actualCount"
    counter++;
    savedObject.actualCount = counter;

    // If The User Reach The Finish Point
    if (savedObject.actualCount === (savedObject.countFinish + 1)) {
        
        // Increase "finishTimes"
        finishCounter++;
        savedObject.finishTimes = finishCounter;

        // Reset "actualCount" To Let The User Finish Another Time
        counter = 0;
        savedObject.actualCount = counter;

        // Set The Rank Of The User , Save It and Incease The Count Of The Reached Levels
        setRank(savedObject.finishTimes);
        saveLevel();
        
    }

    // Save The "savedObject" After Editing It
    addData(savedObject);

    // Help When The User Start Add Count 
    soundEffect.src = getSavedSound();

    // Play The Sound Effect
    isEnabled ? soundEffect.play() : false;
};

countBtn.addEventListener("click", addToCount);

/* --- Reset Fonctionality --- */
const resetConfirmation = document.querySelector(".reset-confirmation");
const resetBtn = document.getElementById("resetBtn");
const okBtn = resetConfirmation.querySelector(".buttons .ok");
const cancelBtn = resetConfirmation.querySelector(".buttons .cancel");

function resetAll() {
    counter = 0;
    finishCounter = 0;
    let savedObject = getSavedDhikr();
    savedObject.actualCount = 0;
    savedObject.finishTimes = 0;
    addData(savedObject);

    currentLevel = "";
    reactiveState.reachedLevelsCount = 0;
    saveLevel();
    saveLevelsCount();
};

// Click Events
resetBtn.onclick = () => resetConfirmation.classList.add("show");
cancelBtn.onclick = () => resetConfirmation.classList.remove("show");
okBtn.onclick = () => {
    resetConfirmation.classList.remove("show");
    resetAll();
};

/* --- Adding A New Dhikr --- */
/* -- I Think I Should Stop This Because It's Leads To Many Problems -- 
const addBtn = document.getElementById("addBtn");
const dhikrFormContainer = document.querySelector(".dhikr-form");
const dhikrForm = dhikrFormContainer.querySelector("form");
const closeForm = document.getElementById("closeForm");

// Show "dhikrForm"
addBtn.onclick = () => dhikrFormContainer.classList.add("show");

// Hide "dhikrForm"
closeForm.onclick = () => dhikrFormContainer.classList.remove("show");

// Select Elements
// ! Use The "In" Rather Than "Input"
const dhikrTextIn = document.getElementById("dhikr-text");
const dhikrMeaningIn = document.getElementById("dhikr-meaning");
const dhikrCountFinishIn = document.getElementById("dhikr-count-finish");
const saveBtn = document.getElementById("saveBtn");

// Get The Entered Data From The User
function getEnteredData() {

    let enteredText = dhikrTextIn.value;
    let enteredMeaning = dhikrMeaningIn.value;
    let enteredCountFinish = dhikrCountFinishIn.value;

    // Handle Data Existence
    if (enteredText.trim() === "" || enteredCountFinish.trim() === "") {
        
        dhikrTextIn.placeholder = "هذا الحقل لا يجب أن يكون فارغا";
        dhikrCountFinishIn.placeholder = "هذا الحقل لا يجب أن يكون فارغا";

        dhikrTextIn.classList.add("invalid");
        dhikrCountFinishIn.classList.add("invalid");
        
    } else {
        addNewDhikr(enteredText, enteredCountFinish, enteredMeaning);
    }

};

// ! Use The "d" Rather Than "dhikr"

function addNewDhikr(dText, dCountFinish, dMeaning) {
    
    // Make The "dhikrObject" Structure
    const newDhikrObject = {
        text: dText,
        meaning: dMeaning,
        countFinish: Number(dCountFinish),
        actualCount: 0,
        finishTimes: 0,
        id: updatedAdhkar.length
    }

    // Appends "newDhikrObject" To The End Of The "updatedAdhkar"
    updatedAdhkar.push(newDhikrObject);

    console.log(updatedAdhkar);

    // Now Save The "newDhikrObject"
    addData(newDhikrObject);

};

saveBtn.addEventListener("click", () => {
    getEnteredData();
}); */

/* --- Gamification | Rank System --- */
const rankSystemBtn = document.getElementById("rankSystemBtn");
const rankSystem = document.querySelector(".rank-system");
const hideRankSystem = document.getElementById("hideRankSystem");
const rankingArea = document.querySelector(".ranking-area");

rankSystemBtn.onclick = () => rankSystem.classList.add("show");
hideRankSystem.onclick = () => rankSystem.classList.remove("show");

const levels = [
    {
        id: 1,
        imageUrl: "assets/images/level-1.png",
        title: "ذاكر لله",
        start: 1,
        end: 3
    },
    {
        id: 2,
        imageUrl: "assets/images/level-2.png",
        title: "موصول بالله",
        start: 4,
        end: 6
    },
    {
        id: 3,
        imageUrl: "assets/images/level-3.png",
        title: "مسبّح محترف",
        start: 7,
        end: 9
    },
    {
        id: 4,
        imageUrl: "assets/images/level-4.png",
        title: "خاشع في الذكر",
        start: 10,
        end: 12
    },
];

// Create Levels Elements
levels.forEach((level) => {

    const levelBox = document.createElement("div");
    levelBox.className = "level-box";
    levelBox.setAttribute("data-title", level.title);

    const imageHolder = document.createElement("div");
    imageHolder.className = "image-holder";
    imageHolder.innerHTML = `<img src="${level.imageUrl}" alt="level ${level.id}">`;

    const levelDetails = document.createElement("div");
    levelDetails.className = "level-details";
    levelDetails.innerHTML = `
        <span class="level-title">${level.title}</span>
        <p class="level-condition">
            <span>اللإنهاء: ${level.id !== levels.length ? `<strong>[${level.start < 10 ? `0${level.start}` : level.start } - ${level.end < 10 ? `0${level.end}` : level.end }]</strong>` : `<strong>[${level.start < 10 ? `0${level.start}` : level.start}+]</strong>` }</span>
        </p>
    `;

    levelBox.appendChild(imageHolder);
    levelBox.appendChild(levelDetails);

    rankingArea.appendChild(levelBox);

});

// Ranking System and Functionality
const levelBoxes = Array.from(document.querySelectorAll(".level-box"));

function setRank(currentFinishTimes) {

    if (currentFinishTimes >= levels[0].start && currentFinishTimes <= levels[0].end) { 
        currentLevel = levels[0].title;
        reactiveState.reachedLevelsCount = 1;
    } else if (currentFinishTimes >= levels[1].start && currentFinishTimes <= levels[1].end) { 
        currentLevel = levels[1].title;
        reactiveState.reachedLevelsCount = 2;
    } else if (currentFinishTimes >= levels[2].start && currentFinishTimes <= levels[2].end) { 
        currentLevel = levels[2].title;
        reactiveState.reachedLevelsCount = 3;
    } else {
        currentLevel = levels[levels.length - 1].title;
        reactiveState.reachedLevelsCount = 4;
    };

};

// Save / Get Level
function saveLevel() {
    localStorage.setItem("current-level", JSON.stringify(currentLevel));
};

function getLevel() {
    let savedLevel = localStorage.getItem("current-level") ? JSON.parse(localStorage.getItem("current-level")) : console.error("There is no saved level yet!");
    return savedLevel;
};

// Save / Get Levels Count
function saveLevelsCount() {
    localStorage.setItem("reached-levels-count", JSON.stringify(reactiveState.reachedLevelsCount));
};

function getLevelsCount() {
    let savedLevelsCount = localStorage.getItem("reached-levels-count") ? JSON.parse(localStorage.getItem("reached-levels-count")) : console.error("There is no saved levels count yet!");
    return savedLevelsCount;
};

// ! cl => current level
// ! rlc => reached levels count
// ! lb => level box

// Get The Saved Current Level and Reached Levels Count When The Pages Reloads
const savedCL = getLevel();
const savedRLC = getLevelsCount();

function displayRank(cl, rlc) {
    
    // Check If The "cl" Is Exist and The "rlc" Also
    if (cl !== "" && rlc !== 0) {

        // ! This approach is about: display only the current level and don't care about the previous reached ones
        // Get The Matched "levelBox" From The "levelBoxes"
        // const filtredLevelBoxes = levelBoxes.filter((levelBox) => levelBox.getAttribute("data-title") === cl );
        // // After The Previous Step We Now Add The Styles Of The Reached Level
        // filtredLevelBoxes[0].classList.add("reached");

        // ! This approach is about: display all the reached levels
        // Get All The Matched "levelBoxes" and Highlight Them
        levelBoxes.slice(0, rlc).forEach((lb) => lb.classList.add("reached"));

    } 

};

// Displaying Process | On Page Reload
displayRank(savedCL, savedRLC);

/* --- Congratulate The User When He Reach A New Level --- */
const alertArea = document.querySelector(".alert-area");
const newLevel = document.querySelector(".alert-area .new-level");
const newLevelImage = document.querySelector(".alert-area .new-level-image img");

function onLevelUp(level) {
    
    // Get The Matched Level Object Using "level" It's A Number
    const matchedLevel = levels[level - 1];
    
    // Update The HTML
    newLevel.textContent = `0${matchedLevel.id}`;
    newLevelImage.setAttribute("src", matchedLevel.imageUrl);
    newLevelImage.setAttribute("alt", `level ${matchedLevel.id}`);

    // Show The "alertArea"
    alertArea.classList.add("show");
    
    // Hide The "alertArea"
    setTimeout(() => {
        alertArea.classList.remove("show");
    }, 2000);

};
