'use strict';

var NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

var SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг',
];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)',
];

var EYE_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green',
];

var NUMBER_WIZARDS = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupForm = setup.querySelector('.setup-wizard-form');
var setupClose = setupForm.querySelector('.setup-close');
var setupSubmit = setupForm.querySelector('.setup-submit');
var setupUserName = setupForm.querySelector('.setup-user-name');
var setupSimilar = setupForm.querySelector('.setup-similar');
var wisardsList = setupSimilar.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');
var wizardsFragment = document.createDocumentFragment();

var generateWizardsData = function (numberWizards) {
  var wizards = [];

  for (var i = 0; i < numberWizards; i++) {
    wizards[i] = {
      name: NAMES[Math.floor(Math.random() * NAMES.length)] + ' '
          + SURNAMES[Math.floor(Math.random() * SURNAMES.length)],
      coatColor: COAT_COLORS[Math.floor(Math.random() * COAT_COLORS.length)],
      eyesColor: EYE_COLORS[Math.floor(Math.random() * EYE_COLORS.length)]
    };
  }

  return wizards;
};

var makeWizard = function (wizardData) {
  var wizard = wizardTemplate.cloneNode(true);
  var wizardName = wizard.querySelector('.setup-similar-label');
  var wizardCoat = wizard.querySelector('.wizard-coat');
  var wizardEyes = wizard.querySelector('.wizard-eyes');

  wizardName.textContent = wizardData.name;
  wizardCoat.style = 'fill: ' + wizardData.coatColor + ';';
  wizardEyes.style = 'fill: ' + wizardData.eyesColor + ';';

  return wizard;
};

var renderWizards = function () {
  for (var i = 0; i < wizardsData.length; i++) {
    wizardsFragment.appendChild(makeWizard(wizardsData[i]));
  }

  wisardsList.appendChild(wizardsFragment);
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== setupUserName) {
    closePopup();
  }
};

var wizardsData = generateWizardsData(NUMBER_WIZARDS);
renderWizards();
setupSimilar.classList.remove('hidden');

// Работа с формой

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848',
];

var eyes = setup.querySelector('.wizard-eyes');
var fireball = setup.querySelector('.setup-fireball-wrap');
var inputFireball = fireball.querySelector('input');
var eyesColorIndex = 0;
var fireballColorIndex = 0;

var getNextIndex = function (arr, index) {
  if (index === arr.length - 1) {
    return 0;
  }
  return index + 1;
};

setupOpen.addEventListener('click', function () {
  openPopup();
});
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});
setupClose.addEventListener('click', function () {
  closePopup();
});
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    evt.preventDefault();
    closePopup();
  }
});
eyes.addEventListener('click', function () {
  eyesColorIndex = getNextIndex(EYE_COLORS, eyesColorIndex);
  eyes.style.fill = EYE_COLORS[eyesColorIndex];
});
fireball.addEventListener('click', function () {
  fireballColorIndex = getNextIndex(FIREBALL_COLORS, fireballColorIndex);
  fireball.style.background = FIREBALL_COLORS[fireballColorIndex];
  inputFireball.value = FIREBALL_COLORS[fireballColorIndex];
});
