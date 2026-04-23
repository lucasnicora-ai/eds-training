import { getElementByTechnicalKey, removeTechnicalKeyFromElement } from '../../scripts/utils.js';

function decorateName(nameEl) {
  removeTechnicalKeyFromElement(nameEl, '[Profile]');
}

function decorateCountry(countryEl) {
  if (!countryEl) return;

  removeTechnicalKeyFromElement(countryEl, '[Country]');

  const countryName = countryEl.innerText.trim();

  countryEl.classList.add('country');

  const flagImg = document.createElement('img');
  flagImg.classList.add('country-flag');
  flagImg.src = `/assets/flags/${countryName.toLowerCase()}.png`;
  flagImg.alt = `${countryName} flag`;

  countryEl.prepend(flagImg);
}

function decorateBirthDate(birthDateEl) {
  if (!birthDateEl) return;

  removeTechnicalKeyFromElement(birthDateEl, '[Birth date]');

  birthDateEl.innerText = new Date(birthDateEl.innerText).toLocaleDateString('en-GB', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
  });
}

export default function decorate(block) {
  const profileNameEl = block.querySelector('h1');
  const countryEl = getElementByTechnicalKey(block, '[Country]');
  const birthDateEl = getElementByTechnicalKey(block, '[Birth date]');

  decorateName(profileNameEl);
  decorateCountry(countryEl);
  decorateBirthDate(birthDateEl);
}
