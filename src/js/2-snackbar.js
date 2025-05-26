import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  createPromise(delay, state)
    .then(resultDelay => {
      iziToast.success({
        title: '✅ Fulfilled',
        message: `Fulfilled promise in ${resultDelay}ms`,
        position: 'topRight',
      });
    })
    .catch(resultDelay => {
      iziToast.error({
        title: '❌ Rejected',
        message: `Rejected promise in ${resultDelay}ms`,
        position: 'topRight',
      });
    });
});

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
