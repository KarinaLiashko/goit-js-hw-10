import Notiflix from 'notiflix';

const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function fetchCountries(name) {
    if (name !== '') {
        fetch(
            `https://restcountries.com/v2/name/${name}?fieldsfields=name,capital,population,flags,languages`
        ).then(response => {
            if (!response.ok) {
                clearCountryInfo();
                clearCountryList();
                throw new Error(
                    Notiflix.Notify.failure('Oops, there is no country with that name')
                );
            }
            return response.json();
        })
            .then(data => {
                if (data.length > 10) {
                    clearCountryList();
                    Notiflix.Notify.info(
                        'Too many matches found. Please enter a more specific name.'
                    );
                } else if (data.length >= 2 && data.length <= 10) {
                    createCountryListData(data);
                    clearCountryInfo();
                } else {
                    createCountryInfo(data);
                    clearCountryList();
                }
            })
            .catch(error => {
                console.log(error);
            });
    } else {
        clearCountryList();
    }
}

function clearCountryList() {
  countryList.innerHTML = '';
}

function clearCountryInfo() {
  countryInfo.innerHTML = '';
}

function createCountryListData(arrayCountriesName) {
  const markup = arrayCountriesName
    .map(({ name, flags }) => {
      return `<li class="country_items"><img class="country_image" src="${flags.svg}" alt="${flags.alt}" width="25" height="15"><span>${name.common}</span></li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function createCountryInfo(countryName) {
  const markup = countryName
    .map(({ name, flags, capital, population, languages }) => {
      return `
      <p><img class="country_image" src="${flags.svg}" alt="${flags.alt}" width="25" height="15">${name.common}</p>
      <p><b class="country_text">Capital:</b>${capital}</p>
      <p><b class="country_text">Population:</b>${population}</p>
      <p><b class="country_text">Languages:</b>${Object.values(languages).join(', ')}</p>`;
    })
    .join('');
  countryInfo.innerHTML = markup;
}

export { fetchCountries };