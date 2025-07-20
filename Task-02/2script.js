let startTime = null;
let elapsedTime = 0;
let interval = null;
let isRunning = false;
let laps = [];

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPause');
const lapBtn = document.getElementById('lap');
const resetBtn = document.getElementById('reset');
const lapsList = document.getElementById('laps');
const toggleThemeBtn = document.getElementById('toggleTheme');

function formatTime(ms) {
  const date = new Date(ms);
  const mins = String(date.getUTCMinutes()).padStart(2, '0');
  const secs = String(date.getUTCSeconds()).padStart(2, '0');
  const millis = String(ms % 1000).padStart(3, '0');
  return `${mins}:${secs}.${millis}`;
}

function updateTime() {
  const now = Date.now();
  const time = now - startTime + elapsedTime;
  display.textContent = formatTime(time);
}

function startPause() {
  if (!isRunning) {
    startTime = Date.now();
    interval = setInterval(updateTime, 10);
    isRunning = true;
    startPauseBtn.textContent = 'Pause';
  } else {
    clearInterval(interval);
    elapsedTime += Date.now() - startTime;
    isRunning = false;
    startPauseBtn.textContent = 'Start';
  }
}

function reset() {
  clearInterval(interval);
  isRunning = false;
  startTime = null;
  elapsedTime = 0;
  laps = [];
  display.textContent = '00:00.000';
  startPauseBtn.textContent = 'Start';
  lapsList.innerHTML = '';
}

function lap() {
  if (!isRunning) return;
  const current = Date.now() - startTime + elapsedTime;
  const previous = laps.length > 0 ? laps[laps.length - 1].time : 0;
  const lapTime = current - previous;
  laps.push({ time: current });

  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${laps.length}: ${formatTime(current)} (+${formatTime(lapTime)})`;
  lapsList.prepend(lapItem);
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  toggleThemeBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
}

// Event bindings
startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
toggleThemeBtn.addEventListener('click', toggleTheme);

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    startPause();
  } else if (e.key.toLowerCase() === 'l') {
    lap();
  } else if (e.key.toLowerCase() === 'r') {
    reset();
  }
});
