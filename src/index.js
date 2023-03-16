import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('input#search-box');

inputEl.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));

function onFormInput() {
  fetchCountries(inputEl.value.trim());
}