import { Notify } from 'notiflix/build/notiflix-notify-aio';

function fetchCountries(name) {
  return fetch(
     `https://restcountries.com/v2/name/${name}?fieldsfields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      return Notify.warning('Oops, there is no country with that name.');
    }
    return response.json();
  });
}

export { fetchCountries };