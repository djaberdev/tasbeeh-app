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
        text: "حسبي الله ونعم الوكيل",
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

adhkarArray.forEach((dhikrEl, index) => {
    dhikrEl.addEventListener("click", (e) => {

        adhkarArray.forEach(dEl => dEl.classList.remove("selected"));
        
        e.currentTarget.classList.add("selected");

        // Get The Selected Dhikr Object
        let dataIndex = Number(e.currentTarget.getAttribute("data-index"));
        let dhikrObject = updatedAdhkar[dataIndex];
        addData(dhikrObject);

    });

    // Add The "selected" Class To The "dhikrEl" Depends On The Saved Dhikr Object Within The Local Storage
    getSavedDhikr().id === (index + 1) ? dhikrEl.classList.add("selected") : false;

});

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
    saveData(dhikrObj);

};

function saveData(dObject) {
    localStorage.setItem("dhikrObject", JSON.stringify(dObject));
}

function getSavedDhikr() {
    let savedDhikrObject = localStorage.getItem("dhikrObject") ? JSON.parse(localStorage.getItem("dhikrObject")) : alert("There is no saved dhikr yet try to select one!");
    return savedDhikrObject;
}

/* --- Build Sound Control --- */
const soundsEffects = [
    {
        path: "/assets/audio/click.mp3",
        bgColor: "rgba(8, 74, 73, 0.7)"
    },
    {
        path: "/assets/audio/pen-click.mp3",
        bgColor: "rgba(203, 154, 52, 0.7)"
    },
    {
        path: "/assets/audio/rightanswer.mp3",
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

    // Add The "active" Class To The "soundBox" Depends On The Saved Sound Within The Local Storage
    JSON.parse(localStorage.getItem("chosenSound")) === soundBox.getAttribute("data-sound") ? soundBox.classList.add("active") : false;

});

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

    // Check For Playing Or Not Playing The Sound
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

    }
}

soundBtn.addEventListener("click", toggleIsEnabled);

/* --- Tasbeeh Functionality --- */
const countBtn = document.getElementById("countBtn");
let counter;
let finishCounter;

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

function resetCounter() {
    counter = 0;
    finishCounter = 0;
    let savedObject = getSavedDhikr();
    savedObject.actualCount = 0;
    savedObject.finishTimes = 0;
    addData(savedObject);
}

// Click Events
resetBtn.onclick = () => resetConfirmation.classList.add("show");
cancelBtn.onclick = () => resetConfirmation.classList.remove("show");
okBtn.onclick = () => {
    resetConfirmation.classList.remove("show");
    resetCounter();
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