export default fetchCountries;
import Notiflix from 'notiflix';


function fetchCountries(name) {
    return fetch(
        `https://restcountries.com/v2/name/${name}?fieldsfields=name,capital,population,flags,languages`
    ).then(response => {
        if (!response.ok) {
          clearCountryInfo();
          clearCountriesList();
          throw new Error(
            Notiflix.Notify.failure('Oops, there is no country with that name')
          );
        }
        return response.json();
      })
      .then(data => {
        if (data.length > 10) {
          clearCountriesList();
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (data.length >= 2 && data.length <= 10) {
          createCountryList(data);
          clearCountryInfo();
        } else {
          createCountryInfo(data);
          clearCountriesList();
        }
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    clearCountriesList();
  }

function clearCountriesList() {
  countriesList.innerHTML = '';
}

function clearCountryInfo() {
  countryInfo.innerHTML = '';
}

export { fetchCountries };