import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const timer = document.querySelector('.timer');
const input = document.querySelector('#datetime-picker');
const btn = document.querySelector('button[data-start]');
const timerFields = document.querySelectorAll('.value');

let selectedDate = null;
let timerId = null;

btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    selectedDate = selectedDates[0];
    if (selectedDate > currentDate) {
      btn.disabled = false;
    } else {
      btn.disabled = true;
      iziToast.warning({
        title: 'Увага',
        message: 'Будь ласка, оберіть дату в майбутньому',
        position: 'topRight',
      });
    }
  },
};
flatpickr(input, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

btn.addEventListener('click', () => {
  btn.disabled = true;
  input.disabled = true;
  timerId = setInterval(() => {
    const currentDate = new Date();
    const diff = selectedDate - currentDate;
    if (diff <= 0) {
      clearInterval(timerId);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }
    const timeLeft = convertMs(diff);
    updateTimerDisplay(timeLeft);
  }, 1000);
});

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  timerFields[0].textContent = addLeadingZero(days);
  timerFields[1].textContent = addLeadingZero(hours);
  timerFields[2].textContent = addLeadingZero(minutes);
  timerFields[3].textContent = addLeadingZero(seconds);
}
