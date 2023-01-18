import { Notify } from 'notiflix/build/notiflix-notify-aio';
import '../css/common.css';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysSpan = document.querySelector('span[data-days]');
const hoursSpan = document.querySelector('span[data-hours]');
const minutesSpan = document.querySelector('span[data-minutes]');
const secondsSpan = document.querySelector('span[data-seconds]');

startBtn.setAttribute('disabled', 'disabled');
let finishTime = null;

flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const setDate = selectedDates[0].getTime();
        const notValidDate = setDate < Date.now();
        startBtn.toggleAttribute("disabled", notValidDate);
        if (notValidDate) {
            Notify.failure("Please choose a date in the future");
            return;
        }
        finishTime = selectedDates[0].getTime();
        console.log(finishTime);
    },
});

startBtn.addEventListener('click', onStartClick);

function onStartClick() {
    timer.start();
    startBtn.setAttribute('disabled', 'disabled');

}


const timer = {
    start() {
        this.tick();
        setInterval(this.tick, 1000);

    },

    tick() {
        const currentTime = Date.now();
        const timeFlow = finishTime - currentTime;
        const timeObj = convertMs(timeFlow);
        console.log(timeObj);
        updateHTML(timeObj);
    }
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

function addLeadingZero(value) {
    return value.toString().padStart(2, '0')
}

function updateHTML(dataobj) {
    const { days, hours, minutes, seconds } = dataobj;

    daysSpan.textContent = days.toString();
    hoursSpan.textContent = addLeadingZero(hours);
    minutesSpan.textContent = addLeadingZero(minutes);
    secondsSpan.textContent = addLeadingZero(seconds);

};


