import { Notify } from 'notiflix/build/notiflix-notify-aio';
import '../css/common.css';

const promisesForm = document.querySelector('.form');
promisesForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount }
  } = event.currentTarget;

  console.log(`Delay: ${delay.value}, Step: ${step.value}, Amount: ${amount.value}`);
  const amountP = Number(amount.value);
  const stepP = Number(step.value);
  const delayP = Number(delay.value);

  makePromises(amountP, stepP, delayP);  

  // event.currentTarget.reset();
}

function makePromises(amount, step, delay) {
  let counter = 0
  for (let i = 1; i <= amount; i++) {
    if (i === 1) {
      counter += delay
    }
    else {
      counter += step
    }
    createPromise(i, counter)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      });
  }
}


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
