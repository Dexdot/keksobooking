'use strict';

(function() {


  var offerTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
      offerTypes = ['flat', 'house', 'bungalo', 'palace'],

      // Типы офферов в тайтле для функции setOfferType()
      offerTypesInTitles = ['квартир', 'дом', 'бунгал', 'дворец'],
      checkinTimes = ['12:00', '13:00', '14:00'],
      features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],

      OFFERS_COUNT = 8,
      offers = new Array(OFFERS_COUNT),
      URL = 'https://js.dump.academy/keksobooking/data';

  // Заполняем массив офферов
  for (var i = 0; i < offers.length; i++) {
    offers[i] = createOffer();
  }
  
  
  window.data = {
    offers: offers
  };

  window.load(URL, function () {
    console.log(data);
  });
  


  /**
   * Представляет объявление
   * @constructor
   */
  function Offer() {
    this.author = {
      avatar: 'img/avatars/user0' + window.util.getRandomElement(8, 1) + '.png'
    }
    this.location = {
      x: window.util.getRandomElement(900, 300),
      y: window.util.getRandomElement(500, 100)
    },
      this.offer = {
        title: window.util.getRandomArrayElement(offerTitles),
        address: this.location.x + ', ' + this.location.y,
        price: window.util.roundTo(window.util.getRandomElement(500000, 1000), 10),
        type: '',
        rooms: window.util.getRandomElement(5, 1),
        guests: window.util.roundTo(window.util.getRandomElement(500, 1), 10),
        checkin: window.util.getRandomArrayElement(checkinTimes),
        checkout: window.util.getRandomArrayElement(checkinTimes),
        features: getFeatures(),
        description: '',
        photos: []
      }
  }

  /**
   * @description Генерирует для оффера случайное количество случайных фич
   * @return {array} offerFeatures Массив случайной длины со случайными фичами
   */
  function getFeatures() {
    var offerFeatures = [];
    for (var i = 0; i < window.util.getRandomElement(features.length, 0) + 1; i++) {
      offerFeatures.push(window.util.getRandomArrayElement(features));
    }
    return offerFeatures;
  }

  /**
   * @description Создает объект оффер
   * @return {object} offer Объект данных объявления
   */
  function createOffer() {
    var offer = new Offer();
    removeCreatedTitle(offer);
    setOfferType(offer);
    syncCheckInOut(offer);
    return offer;
  }


  /**
   * @description Устанавливает checkin === checkout
   * @param {object} offer Объект объявления
   */
  function syncCheckInOut(offer) {
    offer.offer.checkout = offer.offer.checkin;
  }

  /**
   * @description Задает тип оффера в зависимости от его заголовка (домик - house, квартира - flat и т.п.)
   * @param {object} offer Объект объявления
   */
  function setOfferType(offer) {
    var offerTitle = offer.offer.title;
    for (var i = 0; i < offerTypesInTitles.length; i++) {
      if (offerTitle.indexOf(offerTypesInTitles[i]) !== -1) {
        offer.offer.type = offerTypes[i];
      }
    }
  }

  /**
   * @description Удаляет заголовок оффера из общего массива заголовков
   * @param {object} offer Объект объявления
   */
  function removeCreatedTitle(offer) {
    var offerTitleIndex = offerTitles.indexOf(offer.offer.title);
    if (offerTitleIndex !== -1) {
      offerTitles.splice(offerTitleIndex, 1);
    }
  }


})();