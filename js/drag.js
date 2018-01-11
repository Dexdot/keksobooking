'use strict';

(function() {

  var map = document.querySelector('.map'),
    mapPinMain = map.querySelector('.map__pin--main'),
    inputAddress = document.querySelector('#address'),
    mapPinMainMousedownHandler = function (e) {
      e.preventDefault();
  
      // Стартовые координаты
      var startCoords = {
        x: e.clientX,
        y: e.clientY
      }
  
      var mapPinMainMousemoveHandler = function (moveEvent) {
        moveEvent.preventDefault();
  
        // Смещение
        var shift = {
          x: startCoords.x - moveEvent.clientX,
          y: startCoords.y - moveEvent.clientY
        }
  
        // Перезаписываем стартовые координаты
        startCoords = {
          x: moveEvent.clientX,
          y: moveEvent.clientY
        }
  
        // Перемещаем пин
        mapPinMain.style.left = mapPinMain.offsetLeft - shift.x + 'px';
        mapPinMain.style.top = mapPinMain.offsetTop - shift.y + 'px';

        // Записываем координаты метки в инпут "Адрес"
        setAddressValue();
      },
        mapPinMainMouseupHandler = function (mouseupEvent) {
          mouseupEvent.preventDefault;

          // Снимаем обработчики (отпускаем пин)
          map.removeEventListener('mousemove', mapPinMainMousemoveHandler);
          map.removeEventListener('mouseup', mapPinMainMouseupHandler);
        };
  
      map.addEventListener('mousemove', mapPinMainMousemoveHandler);
      map.addEventListener('mouseup', mapPinMainMouseupHandler);
    };


  window.drag = {
    mapPinMainMousedownHandler: mapPinMainMousedownHandler
  }

  /**
	 * @description Задаем значение поля "Адрес" координатами метки
	 */
  function setAddressValue() {
    var x = mapPinMain.style.left.split('px')[0],
        y = mapPinMain.style.top.split('px')[0];
    inputAddress.value = 'x: ' + x + ', y: ' + y;
  }

})();