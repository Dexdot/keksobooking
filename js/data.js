'use strict';

(function() {

  var offers = [],
      URL = 'https://js.dump.academy/keksobooking/data',
      dataLoadHandler = function(response) {
        offers = response;
        offers.forEach(function(offer, i) {
          offer.index = i;
        })
        window.data = {
          offers: offers
        };
      }

  window.load(URL, dataLoadHandler);


})();