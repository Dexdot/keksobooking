'use strict';

(function() {

	var map = document.querySelector('.map'),
		mapPinMain = map.querySelector('.map__pin--main'),

		mapPinMainClickHandler = function (e) {
			showMap();
			window.card.renderSimilarList();
			window.pin.renderMapPins(e);
			window.form.showForm();
			window.form.enableForm();
			mapPinMain.addEventListener('mousedown', window.drag.mapPinMainMousedownHandler);
			mapPinMain.removeEventListener('click', mapPinMainClickHandler);
		},
		mapPinMainKeydownHandler = function (e) {
			if (window.util.isEnterPress(e)) {
				mapPinMainClickHandler();
				mapPinMain.removeEventListener('keydown', mapPinMainKeydownHandler);
			}
		}







		


	// При клике/нажатии enter на главный пин, показываем карту, показываем и активируем форму
	mapPinMain.addEventListener('click', mapPinMainClickHandler);
	mapPinMain.addEventListener('keydown', mapPinMainKeydownHandler);

	/**
	 * @description Показывает карту
	 */
	function showMap() {
		map.classList.remove('map--faded');
	}

})();