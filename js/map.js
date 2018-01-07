'use strict';

var offerTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
		offerTypes = ['flat', 'house', 'bungalo', 'palace'],

		// Типы офферов в тайтле для функции setOfferType()
		offerTypesInTitles = ['квартир', 'дом', 'бунгал', 'дворец'],
		checkinTimes = ['12:00', '13:00', '14:00'],
		features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],

		map = document.querySelector('.map'),
		form = document.querySelector('.notice__form'),
		fieldsets = form.querySelectorAll('fieldset'),
		mapPinMain = map.querySelector('.map__pin--main'),

		selectCheckIn = form.querySelector('#timein'),
		selectCheckOut = form.querySelector('#timeout'),

		selectType = form.querySelector('#type'),
		inputPrice = form.querySelector('#price'),

		selectRooms = form.querySelector('#room_number'),
		selectGuests = form.querySelector('#capacity'),

		OFFERS_COUNT = 8,
		ESC_KEYCODE = 27,
		ENTER_KEYCODE = 13,

		offers = new Array(OFFERS_COUNT),
		mapPins = [],
		mapCards = [],
		cardsClose = [],

		mapPinMainMouseupHandler = function() {
			showMap();
			renderSimilarList();
			renderMapPins();
			showForm();
			enableForm();
			mapPinMain.removeEventListener('mouseup', mapPinMainMouseupHandler);
		},
		mapPinMainKeydownHandler = function(e) {
			if (e.keyCode === ENTER_KEYCODE) {
				mapPinMainMouseupHandler();
				mapPinMain.removeEventListener('keydown', mapPinMainKeydownHandler);
			}
		},
		cardEscHandler = function(e) {
			if (e.keyCode === ESC_KEYCODE) {
				cardCloseClickHandler();
			}
		},
		mapPinClickHandler = function(e) {
			deactivateMapPins();
			e.currentTarget.classList.add('map__pin--active');
			hideCards();
			mapCards[e.currentTarget.index].style.display = 'block';
			document.addEventListener('keydown', cardEscHandler);
		},
		cardCloseClickHandler = function() {
			hideCards();
			deactivateMapPins();
			document.removeEventListener('keydow', cardEscHandler);
		},
		selectCheckInHandler = function() {
			selectCheckOut.value = selectCheckIn.value;
		},
		selectCheckOutHandler = function() {
			selectCheckIn.value = selectCheckOut.value;
		},
		selectTypeHandler = function() {
			switch (selectType.value) {
				case 'flat':
					setInputValue(inputPrice, 1000);
					break;
				case 'house':
					setInputValue(inputPrice, 5000);						
					break;
				case 'bungalo':
					setInputValue(inputPrice, 0);						
					break;
				case 'palace':
					setInputValue(inputPrice, 10000);						
					break;
				default:
					setInputValue(inputPrice, 1000);				
			}
		},
		selectRoomsHandler = function() {
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

// Заполняем массив офферов
for (var i = 0; i < offers.length; i++) {
	offers[i] = createOffer();
}

// Находим шаблон пина
var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin'),

		// Находим шаблон объявления
		mapCardTemplate = document.querySelector('template').content.querySelector('.map__card'),

		// Нода для вывода меток
		mapPinsList = document.querySelector('.map__pins');

// При клике/нажатии enter на главный пин, показываем карту, показываем и активируем форму
mapPinMain.addEventListener('mouseup', mapPinMainMouseupHandler);
mapPinMain.addEventListener('keydown', mapPinMainKeydownHandler);

// При изменении одного из полей, значение второго автоматически выставляется таким же
selectCheckIn.addEventListener('change', selectCheckInHandler);
selectCheckOut.addEventListener('change', selectCheckOutHandler);

// Установка минимальной цены в зависимости от типа жилья
selectType.addEventListener('change', selectTypeHandler);

// Установка кол-ва гостей в зависимости от кол-ва комнат
selectRooms.addEventListener('change', selectRoomsHandler);


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

/**
 * @description Вешает на элементы массива обработчик
 * @param {array} arr Массив, на элементы которого вешается обработчик
 * @param {function} handler Обработчик
 */
function addListeners(arr, handler) {
	for (var i = 0; i < arr.length; i++) {
		arr[i].addEventListener('click', handler);
	}
}

/**
 * @description Убирает у всех меток класс 'map__pin--actve'
 */
function deactivateMapPins() {
	for (var i = 0; i < mapPins.length; i++) {
		mapPins[i].classList.remove('map__pin--active');
	}
}

/**
 * @description Скрывает все объявления
 */
function hideCards() {
	for (var i = 0; i < mapCards.length; i++) {
		mapCards[i].style.display = 'none';
	}
}

/**
 * @description Показывает карту
 */
function showMap() {
	map.classList.remove('map--faded');
}

/**
 * @description Добавляет в разметку метки, добавляет их в массив, вешает на них обработчики
 */
function renderMapPins() {
	var fragment = document.createDocumentFragment();
	for (var i = 0; i < offers.length; i++) {
		fragment.appendChild(renderMapPin(i));
	}
	mapPinsList.appendChild(fragment);
	mapPins = document.querySelectorAll('.map__pin');
	mapPins = Array.prototype.slice.call(mapPins);	
	mapPins.shift();
	addListeners(mapPins, mapPinClickHandler);
}

/**
 * @description Добавляет в разметку похожие объявления/офферы
 */
function renderSimilarList() {
	var fragment = document.createDocumentFragment();
	for (var i = 0; i < offers.length; i++) {
		fragment.appendChild(renderMapCard(i));
	}
	map.appendChild(fragment);
	mapCards = document.querySelectorAll('.map__card');
	cardsClose = map.querySelectorAll('.popup__close');
	addListeners(cardsClose, cardCloseClickHandler);
}


/**
 * @description Показывает форму
 */
function showForm() {
	form.classList.remove('notice__form--disabled');
}


/**
 * @description Активирует форму
 */
function enableForm() {
	for (var i = 0; i < fieldsets.length; i++) {
		fieldsets[i].disabled = false;				
	}
}

/**
 * @description Создает копию шаблона метки, заполняет его данными из массива и возвращает
 * @param {number} i Индекс объекта в массиве offers
 * @return {element} mapPin DOM-нода с заданными стилем и картинкой
 */
function renderMapPin(i) {
	var mapPin = mapPinTemplate.cloneNode(true);
	mapPin.style = 'left: ' + (offers[i].location.x + (mapPin.offsetWidth / 2)) + 'px; top: ' + 
	(offers[i].location.y + (mapPin.offsetHeight / 2)) + 'px';
	mapPin.querySelector('img').src = offers[i].author.avatar;
	mapPin.index = i;
	return mapPin;
}

/**
 * @description Создает копию шаблона объявления, заполняет его данными из массива и возвращает
 * @param {number} i Индекс объекта в массиве offers
 * @return {element} mapCard DOM-нода с данными объявления
 */
function renderMapCard(i) {
	var mapCard = mapCardTemplate.cloneNode(true),
			cardOfferType = mapCard.querySelector('h4'),
			cardOfferFeatures = mapCard.querySelector('.popup__features');

	mapCard.querySelector('h3').textContent = offers[i].offer.title;
	mapCard.querySelector('p small').textContent = offers[i].offer.address;
	mapCard.querySelector('.popup__price').textContent = offers[i].offer.price + '₽ / ночь';
	switch (offers[i].offer.type) {
		case 'flat':
			cardOfferType.textContent = 'Квартира';
			break;
		case 'house':
			cardOfferType.textContent = 'Дом';
			break;
		case 'bungalo':
			cardOfferType.textContent = 'Бунгало';
			break;
		case 'palace':
			cardOfferType.textContent = 'Дворец';
			break;
		default:
			cardOfferType.textContent = 'Дом';
	}
	cardOfferType.nextElementSibling.textContent = 'Комнат: ' + offers[i].offer.rooms + ' для ' +
	offers[i].offer.guests + ' гостей.';
	mapCard.querySelector('.popup__features').previousElementSibling.textContent = 'Заезд после ' + offers[i].offer.checkin + ', выезд до ' + offers[i].offer.checkout;
	mapCard.querySelector('.popup__features').innerHTML = '';

	var fragment = document.createDocumentFragment();
	var feature;
	for (var j = 0; j < offers[i].offer.features.length; j++) {
		feature = document.createElement('li');
		feature.className = 'feature feature--' + offers[i].offer.features[j];
		fragment.appendChild(feature);
	}

	cardOfferFeatures.appendChild(fragment);
	cardOfferFeatures.nextElementSibling.textContent = offers[i].offer.description;
	mapCard.querySelector('.popup__avatar').src = offers[i].author.avatar;

	return mapCard;
}

// Конструктор объекта Offer

/**
 * Представляет объявление
 * @constructor
 */
function Offer(){
	this.author =  {
		avatar: 'img/avatars/user0' + getRandomElement(8, 1) + '.png'
	}
	this.location = {
		x: getRandomElement(900, 300),
		y: getRandomElement(500, 100)
	},
	this.offer = {
		title: getRandomArrayElement(offerTitles),
		address: this.location.x + ', ' + this.location.y,
		price: roundTo(getRandomElement(500000, 1000), 10),
		type: '',
		rooms: getRandomElement(5, 1),
		guests: roundTo(getRandomElement(500, 1), 10),
		checkin: getRandomArrayElement(checkinTimes),
		checkout: getRandomArrayElement(checkinTimes),
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
	for (var i = 0; i < getRandomElement(features.length, 0) + 1; i++) {
		offerFeatures.push(getRandomArrayElement(features));
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

/**
 * @description Приводит num к to (например, 1443 => 1440)
 * @param {number} num Число, которое нужно привести
 * @param {number} to Число, к которому нужно привести (например, 10)
 * @return {number}
 */
function roundTo(num, to) {
	return Math.round(num / to) * to;
}

/**
 * @description Возвращает случайное число от min до max
 * @param {number} max Максимальное число
 * @param {number} min Минимальное число
 * @return {number}
 */
function getRandomElement(max, min) {
	return Math.floor(Math.random() * (max - min) + min);
}

/**
 * @description Возвращает случайный элемент из массива
 * @param {array} arr Массив
 * @return {array[random]}
 */
function getRandomArrayElement(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}
