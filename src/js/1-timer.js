import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = null;

let startIsActive = false;

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;
const dayField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0].getTime();
    if (Date.now() >= userSelectedDate) {
      alert('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  },
};

const inputFp = document.querySelector('#datetime-picker');
flatpickr(inputFp, options);

startBtn.addEventListener('click', handleStartBtn);

function handleStartBtn(e) {
  e.preventDefault();
  const intervalId = setInterval(() => startCountdown(userSelectedDate), 1000);
  inputFp.disabled = true;
  startBtn.disabled = true;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function startCountdown(selectedDate) {
  const deltaTime = selectedDate - Date.now();
  const convertedDeltaTime = convertMs(deltaTime);
  dayField.textContent = addLeadingZero(convertedDeltaTime.days);
  hoursField.textContent = addLeadingZero(convertedDeltaTime.hours);
  minutesField.textContent = addLeadingZero(convertedDeltaTime.minutes);
  secondsField.textContent = addLeadingZero(convertedDeltaTime.seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// console.log(Date.now());

// console.log(userSelectedDate.getTime());
