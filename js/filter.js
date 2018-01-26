'use strict';

(function() {
  
  var selectType = document.querySelector('#housing-type'),
      selectPrice = document.querySelector('#housing-price'),
      selectRooms = document.querySelector('#housing-rooms'),
      selectGuests = document.querySelector('#housing-guests'),
      selects = document.querySelectorAll('.map__filter'),

      // Поля с фильтрами
      inputFeatures = Array.from(document.querySelectorAll('.map__filter-set input[type=checkbox]')),
      filteredPins = [],
      filteredFeatures = [],


      filterPins = function() {
        filteredPins = window.data.offers
        .filter(function(offer) {
          if (offer.offer.type === selectType.value || selectType.value === 'any') {
            return true;
          }
        })
        .filter(function(offer) {

          var offerPriceMap = {
            'any': true,
            'low': offer.offer.price <= 10000,
            'middle': offer.offer.price >= 10000 && offer.offer.price <= 50000,
            'high': offer.offer.price >= 50000
          };
          return offerPriceMap[selectPrice.value];
        })
        .filter(function(offer) {
          var offerRoomsMap = {
            'any': true,
            '1': offer.offer.rooms === 1,
            '2': offer.offer.rooms === 2,
            '3': offer.offer.rooms === 3
          };
          return offerRoomsMap[selectRooms.value];
        })
        .filter(function(offer) {
          var offerGuestMap = {
            'any': true,
            '1': offer.offer.guests === 1,
            '2': offer.offer.guests === 2,
            '3': offer.offer.guests === 3
          };
          return offerGuestMap[selectGuests.value];
        })
        .filter(function(offer) {

          // Параметр "совпадимости" выбранных фич и фич оффера
          var coinciding = 0;

          // Если выбранная фича есть в оффере, то инкрементируем параметр
          filteredFeatures.forEach(function(feature) {
            if (offer.offer.features.indexOf(feature.value) !== -1) {
              coinciding++;
            }
          });

          // Если все выбранные фичи есть в оффере, то выбираем этот оффер
          return coinciding === filteredFeatures.length;
        });

        // Прячем все пины
        window.pin.hidePins();

        // Показываем только отфильтрованные пины
        for (var i = 0; i < filteredPins.length; i++) {
          window.pin.pins[filteredPins[i].index].style.display = 'block';
        }
        
      },
      filterFeatures = function() {

        // Массив с фичами, которые выбрали
        filteredFeatures = inputFeatures.filter(function (feature) {
          return feature.checked;
        });
        filterPins();
      };

      selects.forEach(function(select) {
        select.addEventListener('change', filterPins);
      });

      inputFeatures.forEach(function(feature) {
        feature.addEventListener('change', filterFeatures);
      });


})();