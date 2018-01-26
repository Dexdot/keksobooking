'use strict';


(function () {


  var map = document.querySelector('.map'),
      mapCardTemplate = document.querySelector('template').content.querySelector('.map__card'),
      mapCards = [],
      cardsClose = [],

      cardCloseClickHandler = function () {
        window.card.hideCards();
        window.pin.deactivateMapPins();
        document.removeEventListener('keydown', window.card.cardEscHandler);
      };


  window.card = {

    /**
     * @description Добавляет в разметку похожие объявления/офферы
     */
    renderSimilarList: function () {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < window.data.offers.length; i++) {
        fragment.appendChild(renderMapCard(i));
      }
      map.appendChild(fragment);
      mapCards = document.querySelectorAll('.map__card');

      // this === window
      this.mapCards = mapCards;
      cardsClose = map.querySelectorAll('.popup__close');
      window.util.addClickListeners(cardsClose, cardCloseClickHandler);
    },

    /**
     * @description Скрывает все объявления
     */
    hideCards: function () {
      for (var i = 0; i < mapCards.length; i++) {
        mapCards[i].style.display = 'none';
      }
    },

    cardEscHandler: function (e) {
      if (window.util.isEscPress(e)) {
        cardCloseClickHandler();
      }
    }

  }

  

  /**
   * @description Создает копию шаблона объявления, заполняет его данными из массива и возвращает
   * @param {number} i Индекс объекта в массиве offers
   * @return {element} mapCard DOM-нода с данными объявления
   */
  function renderMapCard(i) {
    var mapCard = mapCardTemplate.cloneNode(true),
      cardOfferType = mapCard.querySelector('h4'),
      cardOfferFeatures = mapCard.querySelector('.popup__features'),
      offerTypeMap = {
        'flat': 'Квартира',
        'house': 'Дом',
        'bungalo': 'Бунгало',
        'palace': 'Дворец'
      };

    mapCard.querySelector('h3').textContent = window.data.offers[i].offer.title;
    mapCard.querySelector('p small').textContent = window.data.offers[i].offer.address;
    mapCard.querySelector('.popup__price').textContent = window.data.offers[i].offer.price + '₽ / ночь';
    cardOfferType.textContent = offerTypeMap[window.data.offers[i].offer.type] || 'Дом';
    cardOfferType.nextElementSibling.textContent = 'Комнат: ' + window.data.offers[i].offer.rooms + ' для ' +
      window.data.offers[i].offer.guests + ' гостей.';
    mapCard.querySelector('.popup__features').previousElementSibling.textContent = 'Заезд после ' + window.data.offers[i].offer.checkin + ', выезд до ' + window.data.offers[i].offer.checkout;
    mapCard.querySelector('.popup__features').innerHTML = '';

    var fragment = document.createDocumentFragment();
    var feature;
    for (var j = 0; j < window.data.offers[i].offer.features.length; j++) {
      feature = document.createElement('li');
      feature.className = 'feature feature--' + window.data.offers[i].offer.features[j];
      fragment.appendChild(feature);
    }

    cardOfferFeatures.appendChild(fragment);
    cardOfferFeatures.nextElementSibling.textContent = window.data.offers[i].offer.description;
    mapCard.querySelector('.popup__avatar').src = window.data.offers[i].author.avatar;

    return mapCard;
  }

})();