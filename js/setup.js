'use strict';

// создаю массивы данных о персонажах
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = document.querySelector('.setup-user-name');
var setupWizard = document.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var wizardFireball = setup.querySelector('.setup-fireball-wrap');
var inputChangeCoat = document.querySelector('input[name=coat-color]');
var inputChangeEyes = document.querySelector('input[name=eyes-color]');
var inputChangeFireball = document.querySelector('input[name=fireball-color]');
var setupPosition = { // берем значения из main.css
  left: '50%',
  top: '80px'
};

var getRandElement = function (array) {
  var index = Math.floor(Math.random() * array.length);
  return array[index];
};

// нашли на странице список волшебников:
var similarListElement = document.querySelector('.setup-similar-list');

// нахожу шаблон на странице с помощью querySelectot  по id и находим div который описывает волшебника:
var WizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// функция создания шаблона 1 волшебника
var renderWizard = function () {
  var wizardElement = WizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = getRandElement(NAMES) + ' ' + getRandElement(SURNAMES); // по факту вставляет fullname которое возвращает функция
  wizardElement.querySelector('.wizard-coat').style.fill = getRandElement(COAT_COLOR);
  wizardElement.querySelector('.wizard-eyes').style.fill = getRandElement(EYES_COLORS);
  document.querySelector('.setup-fireball-wrap').style.background = getRandElement(FIREBALL_COLORS);
  return wizardElement;
};

var fragment = document.createDocumentFragment(); // создаем пустой объект и  запукаю цикл на 4 итерации и заполняю шаблонами волшебников
for (var i = 0; i < 4; i++) {
  fragment.appendChild(renderWizard());
}
similarListElement.appendChild(fragment);

// открываем блок для  похожих героев
document.querySelector('.setup-similar').classList.remove('hidden');

// ----------------Module4 task1 -------------------

var dialogEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && userNameInput !== document.activeElement) {
    closeDialog();
  }
};

// функции открытия и закрытия окна
var openDialog = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', dialogEscPress);
  setup.style.left = setupPosition.left;
  setup.style.top = setupPosition.top;
};

var closeDialog = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', dialogEscPress);
};

// Окно.setup должно открываться по нажатию на блок.setup-open.
setupOpen.addEventListener('click', function () {
  openDialog();
});

// Когда иконка пользователя в фокусе, то окно  должно открываться по нажатию кнопки ENTER
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openDialog();
  }
});

// Окно.setup должно закрываться по нажатию на элемент.setup-close, расположенный внутри окна (возврат класса hidden)
setupClose.addEventListener('click', function () {
  closeDialog();
});
// Если окно открыто и фокус находится на кнопке закрытия окна, то нажатие клавиши ENTER должно приводить к закрытию диалога
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeDialog();
  }
});


// валидация формы

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

// универсальная функция смены цвета: элемент- то что меняем, атрибут- fill/background, цвет и значение в инпутах
var changeColor = function (element, attribute, colors, input) {
  element.addEventListener('click', function () {
    var newColor = getRandElement(colors);
    element.style[attribute] = newColor;
    input.value = newColor;
  });
};

changeColor(wizardCoat, 'fill', COAT_COLOR, inputChangeCoat);
changeColor(wizardEyes, 'fill', EYES_COLORS, inputChangeEyes);
changeColor(wizardFireball, 'background', FIREBALL_COLORS, inputChangeFireball);
