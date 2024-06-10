let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let lapTimes = [];
let timerDisplay = document.getElementById("timerDisplay");
let lapDisplay = document.getElementById("lapDisplay");
let timerInterval;

document.getElementById("startTimer").addEventListener("click", startTimer);
document.getElementById("pauseTimer").addEventListener("click", pauseTimer);
document.getElementById("resetTimer").addEventListener("click", resetTimer);
document.getElementById("lapTimer").addEventListener("click", lapTimer);

function startTimer() {
    if (timerInterval === undefined) {
        timerInterval = setInterval(displayTimer, 10);
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = undefined;
}

function resetTimer() {
    clearInterval(timerInterval);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    lapTimes = [];
    displayTime();
    lapDisplay.innerHTML = "Lap: 00 : 00 : 00 : 000";
}

function lapTimer() {
    let lapTime = formatTime(hours, minutes, seconds, milliseconds);
    lapTimes.push(lapTime);
    displayLapTimes();
    lapMilliseconds = lapSeconds = lapMinutes = lapHours = 0;
}

function displayTimer() {
    milliseconds += 10;

    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
    }

    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }

    if (minutes === 60) {
        minutes = 0;
        hours++;
    }

    displayTime();
}

function displayTime() {
    timerDisplay.innerHTML = formatTime(hours, minutes, seconds, milliseconds);
}

function formatTime(hours, minutes, seconds, milliseconds) {
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

    return `${h} : ${m} : ${s} : ${ms}`;
}

function displayLapTimes() {
    lapDisplay.innerHTML = lapTimes.map((lap, index) => `Lap ${index + 1}: ${lap}`).join('<br>');
}