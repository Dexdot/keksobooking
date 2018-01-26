'use strict';

(function() {
  var form = document.querySelector('.notice__form'),
      fieldsets = form.querySelectorAll('fieldset'),
      resetButton = form.querySelector('.form__reset'),
      selectCheckIn = form.querySelector('#timein'),
      selectCheckOut = form.querySelector('#timeout'),

      selectType = form.querySelector('#type'),
      inputPrice = form.querySelector('#price'),

      selectRooms = form.querySelector('#room_number'),
      selectGuests = form.querySelector('#capacity'),

      bungaloMinPrice = 0,
      flatMinPrice = 1000,
      houseMinPrice = 5000,
      palaceMinPrice = 10000,

      resetButtonHandler = function() {
        var imagesContainer = document.querySelector('.form__photo-container'),
            images = imagesContainer.querySelectorAll('img');

        if (images) {
          images.forEach(function(img) {
            imagesContainer.removeChild(img);
          });          
        }
      },

      selectCheckInHandler = function () {
        selectCheckOut.value = selectCheckIn.value;
      },
      selectCheckOutHandler = function () {
        selectCheckIn.value = selectCheckOut.value;
      },
      selectTypeHandler = function () {
        switch (selectType.value) {
          case 'flat':
            setInputValue(inputPrice, flatMinPrice);
            break;
          case 'house':
            setInputValue(inputPrice, houseMinPrice);
            break;
          case 'bungalo':
            setInputValue(inputPrice, bungaloMinPrice);
            break;
          case 'palace':
            setInputValue(inputPrice, palaceMinPrice);
            break;
          default:
            setInputValue(inputPrice, flatMinPrice);
        }
      },
      selectRoomsHandler = function () {
        switch (selectRooms.value) {
          case '1':
            selectGuests.querySelector('option[value="1"]').selected = true;
            break;
          case '2':
            selectGuests.querySelector('option[value="2"]').selected = true;
            break;
          case '3':
            selectGuests.querySelector('option[value="3"]').selected = true;
            break;
          case '100':
            selectGuests.querySelector('option[value="0"]').selected = true;
            break;
          default:
            selectGuests.querySelector('option[value="1"]').selected = true;
        }
      }

  // При изменении одного из полей, значение второго автоматически выставляется таким же
  selectCheckIn.addEventListener('change', selectCheckInHandler);
  selectCheckOut.addEventListener('change', selectCheckOutHandler);

  // Установка минимальной цены в зависимости от типа жилья
  selectType.addEventListener('change', selectTypeHandler);

  // Установка кол-ва гостей в зависимости от кол-ва комнат
  selectRooms.addEventListener('change', selectRoomsHandler);
  
  // Удаляем загруженные фотографии объявления при нажатии "очистить"
  resetButton.addEventListener('click', resetButtonHandler);
  

  /**
   * @description Задает для инпута минимальное значение и placeholder
   * @param {elem} input Элемент формы
   * @param {number} val Значение, которое нужно задать
   */
  function setInputValue(input, val) {
    input.value = '' + val;
    input.min = '' + val;
    input.placeholder = '' + val;
  }

  window.form = {

    /**
     * @description Показывает форму
     */
      showForm: function() {
        form.classList.remove('notice__form--disabled');
      },

    /**
     * @description Активирует форму
     */
      enableForm: function () {
        for (var i = 0; i < fieldsets.length; i++) {
          fieldsets[i].disabled = false;
        }
      }

  }


})();