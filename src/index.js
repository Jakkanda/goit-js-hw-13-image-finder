import debounce from 'lodash.debounce';
const apiKey = '21755043-d9575a6749b270eceb64a1173';
const refs = {
  input: document.querySelector('.search-form'),
};

refs.input.addEventListener('input', debounce(onInputChange, 500));

function onInputChange(e) {
  const findSmth = e.target.value;
  console.log(findSmth);
}
