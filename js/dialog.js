'use strict';
(function () {
  var setupDialogElement = document.querySelector('.setup');
  var dialogHandler = setupDialogElement.querySelector('.upload'); // находим элементы

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault(); // на всякий случай. можно не отменять по умолчанию
    var startCoords = { // 2- запоминаем координаты курсора
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false; // флаг -переместил пользователь курсор или нет

    var onMouseMove = function (moveEvt) { // 4-определяем что делает mousemove/mousedown
      moveEvt.preventDefault();
      dragged = true;

      var shift = { // 5- находим разницу между стартовыми координатами и положением курсора
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = { // 7- координаты курсора после перемещения
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupDialogElement.style.top = (setupDialogElement.offsetTop - shift.y) + 'px'; // 6- смещение курсора добавляем к текущим координатам блока setup т.е окно смещается на такое же расстояник как и курсор
      setupDialogElement.style.left = (setupDialogElement.offsetLeft - shift.x) + 'px';
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) { // если тру- если перемещение с помощью мыши, то надо отключить загрузку
        var clickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', clickPreventDefault);
        };
        dialogHandler.addEventListener('click', clickPreventDefault);
      }
    };
    document.addEventListener('mousemove', onMouseMove);// 3- подписаться на перемещение
    document.addEventListener('mouseup', onMouseUp);
  });
})();

