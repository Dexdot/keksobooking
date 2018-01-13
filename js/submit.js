'use strict';

(function() {

  var URL = 'https://js.dump.academy/keksobooking',
      form = document.querySelector('.notice__form'),
      formSubmitHandler = function(xhr) {
        showMessage(xhr.status);
      }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    window.upload(URL, new FormData(form), formSubmitHandler);
  });

  function showMessage(status) {
    if (status === window.util.STATUS_OK) {
      alert('Объявление опубликовано.');
    } else {
      alert('Произошла ошибка, попробуйте снова.');
    }
  }

})();