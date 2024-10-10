const resetBtn = document.querySelector('#reset');
const playBtn = document.querySelector('#play');
const timerEl = document.querySelector('#timer');
const root = document.querySelector(':root');
const hoursInput = document.querySelector('#hours');
const minutesInput = document.querySelector('#minutes');

// Initial setup
let playing = false;
let totalSeconds = getTotalSeconds();
let currentSeconds = totalSeconds;
timerEl.innerText = formatTime(totalSeconds);

let timerInterval = setInterval(run, 1000);

playBtn.addEventListener('click', () => {
  playing = !playing;
  playBtn.classList.toggle('play');
  playBtn.classList.toggle('bg-green-500'); // Toggle the color class
  const playIcon = playBtn.querySelector('i');
  playIcon.classList.toggle('fa-play'); // Toggle the play icon
  playIcon.classList.toggle('fa-pause'); // Toggle the pause icon
});

resetBtn.addEventListener('click', resetAll);

// Run the timer
function run() {
  if (playing) {
    currentSeconds -= 1;
    if (currentSeconds <= 0) {
      clearInterval(timerInterval);
      resetAll();
    }

    timerEl.innerText = formatTime(currentSeconds);
    root.style.setProperty('--degrees', calcDeg());
  }
}

// Format the time
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const newSeconds = seconds % 60;

  return `${minutes.toString().padStart(2, '0')}:${newSeconds
    .toString()
    .padStart(2, '0')}`;
}

// Calculate the degrees
function calcDeg() {
  return `${360 - (currentSeconds / totalSeconds) * 360}deg`;
}

// Reset all the values
function resetAll() {
  playing = false;
  playBtn.classList.remove('play');
  playBtn.classList.remove('bg-green-500'); // Remove the color class
  const playIcon = playBtn.querySelector('i');
  playIcon.classList.remove('fa-pause'); // Remove the pause icon
  playIcon.classList.add('fa-play'); // Add the play icon
  totalSeconds = getTotalSeconds();
  currentSeconds = totalSeconds;
  timerEl.innerText = formatTime(totalSeconds);
  root.style.setProperty('--degrees', '0deg');
  clearInterval(timerInterval);
  timerInterval = setInterval(run, 1000);
}

// Get total seconds from input fields
function getTotalSeconds() {
  const hours = parseInt(hoursInput.value) || 0;
  const minutes = parseInt(minutesInput.value) || 0;
  return (hours * 3600) + (minutes * 60);
}