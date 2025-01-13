let timeLeft;
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const statusText = document.getElementById('status-text');
const modeToggleButton = document.getElementById('mode-toggle');
const modeIcon = document.getElementById('mode-icon');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const addTimeButton = document.getElementById('add-time');

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    // Add leading zeros if needed
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
    if (timerId === null) {
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                alert(isWorkTime ? 'Work time is over! Take a break!' : 'Break is over! Back to work!');
                switchMode();
                updateButtonVisibility();
            }
        }, 1000);
        updateButtonVisibility();
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
    updateButtonVisibility();
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = WORK_TIME;
    modeIcon.className = 'fas fa-sun';
    modeIcon.title = 'Switch to Break';
    updateDisplay();
    updateButtonVisibility();
}

function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    modeIcon.className = isWorkTime ? 'fas fa-sun' : 'fas fa-moon';
    modeIcon.title = isWorkTime ? 'Switch to Break' : 'Switch to Work';
    updateDisplay();
    updateButtonVisibility();
}

function updateButtonVisibility() {
    if (timerId === null) {
        startButton.textContent = 'Start';
    } else {
        startButton.textContent = 'Pause';
    }
}

function toggleTheme() {
    const newTheme = themeToggle.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'dark';
}

// Initialize
timeLeft = WORK_TIME;
modeIcon.className = 'fas fa-sun';
modeIcon.title = 'Switch to Break';
updateDisplay();
updateButtonVisibility();

// Event listeners
startButton.addEventListener('click', () => {
    if (timerId === null) {
        startTimer();
    } else {
        pauseTimer();
    }
});
resetButton.addEventListener('click', resetTimer);
modeToggleButton.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    switchMode();
});
themeToggle.addEventListener('change', toggleTheme);
addTimeButton.addEventListener('click', () => {
    timeLeft += 5 * 60; // Add 5 minutes (300 seconds)
    updateDisplay();
});

initializeTheme();

// Call this when the page loads
initializeTheme(); 