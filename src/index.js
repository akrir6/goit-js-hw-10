import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
import {
  makeMarkupCountryInfo,
  makeMarkupCountryList,
  clearMarkup,
} from './makeMarkup';

const DEBOUNCE_DELAY = 300;

document
  .querySelector('#search-box')
  .addEventListener('input', debounce(searchHandler, DEBOUNCE_DELAY));

function searchHandler(e) {
  fetchCountries(e.target.value.trim())
    .then(countries => {
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
    })
    .catch(err => {
      console.log(err);
      clearMarkup();
      if (e.target.value.trim()) {
        Notify.failure('There is no country with that name');
      }
    });
}
