'use strict';

(function() {

  var offers = [],
      URL = 'https://js.dump.academy/keksobooking/data',
      dataLoadHandler = function(response) {
        offers = response;
        window.data = {
          offers: offers
        };
      }

  window.load(URL, dataLoadHandler);


})();