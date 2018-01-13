'use strict';

(function() {

  var xhr = new XMLHttpRequest();  

  window.upload = function(URL, data, callback) {

    var xhrLoadListener = function () {
      callback(xhr);
      xhr.removeEventListener('load', xhrLoadListener);
    };

    xhr.addEventListener('load', xhrLoadListener);
    xhr.addEventListener('timeout', function() {
      alert('Врема ответа сервера вышло.');
    });

    xhr.timeout = 30000;

    if (xhr.readyState !== window.util.STATE_LOADING && xhr.readyState !== window.util.STATE_DONE) {
      xhr.responseType = 'json';
    }    
    xhr.open('POST', URL);
    xhr.send(data);

  }

})();