import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');
form.addEventListener('submit', handleForm);
function handleForm(e) {
  e.preventDefault();
  const promisDelay = Number(form.elements.delay.value);
  const isSuccess = form.elements.state.value;
  const createdPromis = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess === 'fulfilled') {
        resolve(promisDelay);
      } else if (isSuccess === 'rejected') {
        reject(promisDelay);
      }
    }, promisDelay);
  });
  createdPromis
    .then(promisDelay => {
      iziToast.success({
        title: 'OK',
        message: `✅ Fulfilled promise in ${promisDelay}ms`,
      });
    })
    .catch(promisDelay => {
      {
        iziToast.error({
          title: 'Error',
          message: `❌ Rejected promise in ${promisDelay}ms`,
        });
      }
    });
}
