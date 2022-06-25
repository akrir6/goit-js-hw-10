const refs = {
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

export const clearMarkup = () => {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
};

export const makeMarkupCountryInfo = ({
  name,
  flags,
  capital,
  population,
  languages,
}) => {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = `<div class="country-info-card">
    <div class="country-info-top">
      <img class="country-flag" src="${flags.svg}" width="80px" alt="flag"/>
      <p class="country-name">${name.official}</p>
    </div>
    <ul class="country-info-list">
      <li class="country-info-item"><b>Capital: </b>${capital}</li>
      <li class="country-info-item"><b>Population: </b>${population}</li>
      <li class="country-info-item"><b>Languages: </b>${Object.values(
        languages
      ).join(', ')}</li>
    </ul>
  </div>`;
};

export const makeMarkupCountryList = countries => {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = countries
    .map(({ name, flags }) => {
      return `<li class="country-list-item">
        <img class="country-flag" src="${flags.svg}" width="40px" alt="flag"/>${name.official}
      </li>`;
    })
    .join('');
};
