import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
import {
  makeMarkupCountryInfo,
  makeMarkupCountryList,
  clearMarkup,
} from './makeMarkup';

Notify.init({
  position: 'center-top',
  timeout: 2000,
  cssAnimationStyle: 'from-top',
  showOnlyTheLastOne: true,
});

const DEBOUNCE_DELAY = 300;

document
  .querySelector('#search-box')
  .addEventListener('input', debounce(onSearchBoxInput, DEBOUNCE_DELAY));

function onSearchBoxInput(e) {
  if (!e.target.value.trim()) {
    clearMarkup();
    return;
  }

  fetchCountries(e.target.value.trim())
    .then(countries => searchHandler(countries))
    .catch(() => errorHandler());
}

function searchHandler(countries) {
  if (countries.length > 10) {
    clearMarkup();
    return Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  if (countries.length === 1) {
    makeMarkupCountryInfo(countries[0]);
    return;
  }
  makeMarkupCountryList(countries);
}

function errorHandler() {
  clearMarkup();
  Notify.failure('There is no country with that name');
}
