import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries.js';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');
const inputForm = document.querySelector('#search-box');

inputForm.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    cleanAreaMarkup();
    const name = e.target.value.trim();
    if (name === '') return;
    fetchCountries(name)
        .then(name)
        .then(countries => {
            if (countries.length > 10)
                Notiflix.Notify.info(
                    'Too many matches found. Please enter a more specific name.'
                );
            else {
                if (countries.length === 1) countryMarkupInfo(countries);
                else countryMarkupList(countries);
            }
        })
        .catch(error => {})
        .finally(() => {});
}


function cleanAreaMarkup() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}
function countryMarkupList(name) {
  const markup = name
    .map(({ name, flags }) => {
      return `<li>
          <img src="${flags.svg}" alt="${name}" width = "25" height = "15" />
        <span>${name}</span>
    </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
  countryInfo.innerHTML = '';
}
function countryMarkupInfo(name) {
  const markupInfo = name
    .map(({ name, flags, capital, population, languages }) => {
      return `
      <img src="${flags.svg}" alt="${name}" width = "25" height = "15" />
      <span>${name}</span>
          <p>Capital: ${capital}</p>
          <p>Population: ${population}</p>
          <p>Languages: ${languages.map(el => el.name).join(', ')}</p>`;
    })
    .join('');
  countryInfo.innerHTML = markupInfo;
  countryList.innerHTML = '';
}


  