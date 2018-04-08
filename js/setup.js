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
var setup = document.querySelector('.setup');
var setupSimilar = document.querySelector('.setup-similar');
var wisardsList = document.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var wizardsFragment = document.createDocumentFragment();

var generateWizardsData = function (numberWizards) {
  var wizards = [];

  for (var i = 0; i < numberWizards; i++) {
    wizards[i] = {
      name: NAMES[Math.floor(Math.random() * NAMES.length)] + ' ' + SURNAMES[Math.floor(Math.random() * SURNAMES.length)],
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

var wizardsData = generateWizardsData(NUMBER_WIZARDS);
renderWizards();
setup.classList.remove('hidden');
setupSimilar.classList.remove('hidden');
