'use strict';

(function() {
  var map = document.querySelector('.map'),
      mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin'),
      mapPinsList = document.querySelector('.map__pins'),
      mapPins = [],

      mapPinClickHandler = function (e) {
        window.pin.deactivateMapPins();
        e.currentTarget.classList.add('map__pin--active');
        window.card.hideCards();        
        window.card.mapCards[e.currentTarget.index].style.display = 'block';
        document.addEventListener('keydown', window.card.cardEscHandler);
      }


  window.pin = {

    /**
     * @description Убирает у всех меток класс 'map__pin--actve'
     */
    deactivateMapPins: function() {
      for (var i = 0; i < mapPins.length; i++) {
        mapPins[i].classList.remove('map__pin--active');
      }
    },

    /**
     * @description Добавляет в разметку метки, добавляет их в массив, вешает на них обработчики
     */
    renderMapPins: function () {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < window.data.offers.length; i++) {
        fragment.appendChild(renderMapPin(i));
      }
      mapPinsList.appendChild(fragment);
      mapPins = document.querySelectorAll('.map__pin');
      mapPins = Array.prototype.slice.call(mapPins);
      mapPins.shift();
      window.util.addListeners(mapPins, mapPinClickHandler);
    }

  }

  /**
   * @description Создает копию шаблона метки, заполняет его данными из массива и возвращает
   * @param {number} i Индекс объекта в массиве offers
   * @return {element} mapPin DOM-нода с заданными стилем и картинкой
   */
  function renderMapPin(i) {
    var mapPin = mapPinTemplate.cloneNode(true);
    mapPin.style = 'left: ' + (window.data.offers[i].location.x + (mapPin.offsetWidth / 2)) + 'px; top: ' +
      (window.data.offers[i].location.y + (mapPin.offsetHeight / 2)) + 'px';
    mapPin.querySelector('img').src = window.data.offers[i].author.avatar;
    mapPin.index = i;
    return mapPin;
  }

})();