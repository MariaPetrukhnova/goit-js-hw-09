import '../css/common.css';

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyEl = document.body;
let timerId = null;

startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick);

function onStartClick() {
    timerId = setInterval(() => {
        const bcgColor = getRandomHexColor();
        bodyEl.style.backgroundColor = bcgColor;
        startBtn.setAttribute("disabled", "disabled");
    }, 1000)
}

function onStopClick() {
    clearInterval(timerId);
    startBtn.removeAttribute("disabled", "disabled");
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
