'use strict';
// откываем окно настройки:
// var setupWindow = document.querySelector('.setup');
// setupWindow.classList.remove('hidden');

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');

// создаю 4 массива данных о персонажах
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// функция случайного сочетания имя + фамилия
var renderName = function () {
  var randomNames = Math.floor(Math.random() * NAMES.length); // случайное имя
  var randomSurnames = Math.floor(Math.random() * SURNAMES.length); // случайная фамилия
  var fullName = NAMES[randomNames] + ' ' + SURNAMES[randomSurnames]; //  имя + фамилия
  return fullName;
};
// функция случайного цвета мантии
var renderCoat = function () {
  var randomCoatColor = Math.floor(Math.random() * COAT_COLOR.length);
  return COAT_COLOR[randomCoatColor];
};

// функция случайного цвета глаз волшебника
var renderEyes = function () {
  var randomEyesColors = Math.floor(Math.random() * EYES_COLORS.length);
  return EYES_COLORS[randomEyesColors];
};

// нашлина странице список волшебников:
var similarListElement = document.querySelector('.setup-similar-list');

// нахожу шаблон на странице с помощью querySelectot  по id и находим div который описывает волшебника:
var WizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// функция создания шаблона 1 волшебника
var renderWizard = function () {
  var wizardElement = WizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = renderName(); // по факту вставляет fullname которое возвращает функция
  wizardElement.querySelector('.wizard-coat').style.fill = renderCoat();
  wizardElement.querySelector('.wizard-eyes').style.fill = renderEyes();

  return wizardElement;
};

var fragment = document.createDocumentFragment(); // создаем пустой объект и  запукаю цикл на 4 итерации и заполняю шаблонами волшебников
for (var i = 0; i < 4; i++) {
  fragment.appendChild(renderWizard());
}
similarListElement.appendChild(fragment);

// открываем блок для  похожих героев
document.querySelector('.setup-similar').classList.remove('hidden');


// Нажатие на элемент .setup-close, расположенный внутри блока setup возвращает ему класс hidden.
var setupClose = setup.querySelector('.setup-close');

// обработчики для альтернативного ввода с клавиатуры keydown или point on click
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
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
    closePopup();
  }
});
// Валидация ввода имени персонажа
var userNameInput = setup.querySelector('.setup-user-name');
userNameInput.addEventListener('invalid', function (evt) {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('имя персонажа не может содержать менее 2 символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('максимальная длина имени персонажа — 25 символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});
