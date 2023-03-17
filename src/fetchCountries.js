import Notiflix from 'notiflix';

function fetchCountries(name) {
  return fetch(
     `https://restcountries.com/v2/name/${name}?fieldsfields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(
        Notiflix.Notify.info('Oops, there is no country with that name.'));
    }
    return response.json();
  });
}

export { fetchCountries };