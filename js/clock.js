// Get The Clock Container
const clockContainer = document.querySelector(".clock");

function updateTime() {

    // Get The Current Day Object
    const cDate = new Date();

    // Gets Main Informations
    let hours = cDate.getHours();
    let minutes = cDate.getMinutes();
    let meridiem = hours > 12 ? "مساء" : "صباحا"; 
    let year = cDate.getFullYear();
    let month = (cDate.getMonth() + 1);
    let monthDay = cDate.getDate();

    // Some Format Edits
    hours = hours < 10 ? `0${hours}` : hours; 
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    month = month < 10 ? `0${month}` : month;
    monthDay = monthDay < 10 ? `0${monthDay}` : monthDay;

    // Set Formats
    let clockFormat = `${hours}:${minutes} ${meridiem}`;
    let dateFormat = `${monthDay} - ${month} - ${year}`;

    // Show Process
    updateClock(clockFormat);
    updateDate(dateFormat);

};

document.addEventListener("DOMContentLoaded", updateTime);

function updateClock(formatedText) {
    const textHolder = clockContainer.querySelector("span:not(.date)");
    textHolder.textContent = formatedText;
};

function updateDate(formatedText) {
    const textHolder = clockContainer.querySelector(".date");
    textHolder.textContent = formatedText;
};

// Make The "updateTime()" Runs Every 1 Minute
let duration = 60000; // => 01 minute

let intID = setInterval(() => { updateTime() }, duration);

// Arrays Of Random Colors
const colors = [
    {
        dotColor: "#cb9a34",
        bgColor: "#084a49",
    },

    {
        dotColor: "#084a49",
        bgColor: "#cb9a34",
    },

    {
        dotColor: "#b7c7c7",
        bgColor: "#0e9898",
    },

    {
        dotColor: "#084a49",
        bgColor: "#0e9898",
    },

    {
        dotColor: "#cb1814",
        bgColor: "#cb9a34",
    },

    {
        dotColor: "#cb9a34",
        bgColor: "#cb1814",
    },
];

// A Cool Click Event
const dot = clockContainer.querySelector(".dot");

clockContainer.addEventListener("click", (e) => {
    
    let randomValue = Math.floor(Math.random() * colors.length);
    
    let colorObj = colors[randomValue];

    clockContainer.style.backgroundColor = colorObj.bgColor;
    dot.style.backgroundColor = colorObj.dotColor;

    
});
=======
// Get The Clock Container
const clockContainer = document.querySelector(".clock");

function updateTime() {

    // Get The Current Day Object
    const cDate = new Date();

    // Gets Main Informations
    let hours = cDate.getHours();
    let minutes = cDate.getMinutes();
    let meridiem = hours > 12 ? "مساء" : "صباحا"; 
    let year = cDate.getFullYear();
    let month = (cDate.getMonth() + 1);
    let monthDay = cDate.getDate();

    // Some Format Edits
    hours = hours < 10 ? `0${hours}` : hours; 
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    month = month < 10 ? `0${month}` : month;
    monthDay = monthDay < 10 ? `0${monthDay}` : monthDay;

    // Set Formats
    let clockFormat = `${hours}:${minutes} ${meridiem}`;
    let dateFormat = `${monthDay} - ${month} - ${year}`;

    // Show Process
    updateClock(clockFormat);
    updateDate(dateFormat);

};

document.addEventListener("DOMContentLoaded", updateTime);

function updateClock(formatedText) {
    const textHolder = clockContainer.querySelector("span:not(.date)");
    textHolder.textContent = formatedText;
};

function updateDate(formatedText) {
    const textHolder = clockContainer.querySelector(".date");
    textHolder.textContent = formatedText;
};

// Make The "updateTime()" Runs Every 1 Minute
let duration = 60000; // => 01 minute

let intID = setInterval(() => { updateTime() }, duration);

// Arrays Of Random Colors
const colors = [
    {
        dotColor: "#cb9a34",
        bgColor: "#084a49",
    },

    {
        dotColor: "#084a49",
        bgColor: "#cb9a34",
    },

    {
        dotColor: "#b7c7c7",
        bgColor: "#0e9898",
    },

    {
        dotColor: "#084a49",
        bgColor: "#0e9898",
    },

    {
        dotColor: "#cb1814",
        bgColor: "#cb9a34",
    },

    {
        dotColor: "#cb9a34",
        bgColor: "#cb1814",
    },
];

// A Cool Click Event
const dot = clockContainer.querySelector(".dot");

clockContainer.addEventListener("click", (e) => {
    
    let randomValue = Math.floor(Math.random() * colors.length);
    
    let colorObj = colors[randomValue];

    clockContainer.style.backgroundColor = colorObj.bgColor;
    dot.style.backgroundColor = colorObj.dotColor;

});
