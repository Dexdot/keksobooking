'use strict';

var ESC_KEYCODE = 27,
    ENTER_KEYCODE = 13;

(function() {
  window.util = {

    STATUS_OK: 200,
    STATE_LOADING: 3,
    STATE_DONE: 4,
    
    /**
     * @description Вешает на элементы массива обработчик
     * @param {array} arr Массив, на элементы которого вешается обработчик
     * @param {function} handler Обработчик
     */
    addListeners: function (arr, handler) {
      for (var i = 0; i < arr.length; i++) {
        arr[i].addEventListener('click', handler);
      }
    },

    /**
     * @description Приводит num к to (например, 1443 => 1440)
     * @param {number} num Число, которое нужно привести
     * @param {number} to Число, к которому нужно привести (например, 10)
     * @return {number}
     */
    roundTo: function (num, to) {
      return Math.round(num / to) * to;
    },

    /**
     * @description Возвращает случайное число от min до max
     * @param {number} max Максимальное число
     * @param {number} min Минимальное число
     * @return {number}
     */
    getRandomElement: function (max, min) {
      return Math.floor(Math.random() * (max - min) + min);
    },

    /**
     * @description Возвращает случайный элемент из массива
     * @param {array} arr Массив
     * @return {array[random]}
     */
    getRandomArrayElement: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },

        /**
     * @description Проверяет нажатие клавиши Esc
     * @param {Event} e Событие
     * @return {boolean}
     */
    isEscPress: function (e) {
      if (e.keyCode === ESC_KEYCODE) {
        return true;
      }
      return false;
    },

    /**
     * @description Проверяет нажатие клавиши Enter
     * @param {Event} e Событие
     * @return {boolean}
     */
    isEnterPress: function (e) {
      if (e.keyCode === ENTER_KEYCODE) {
        return true;
      }
      return false;
    }

  }
})();