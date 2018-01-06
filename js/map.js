'use strict';

var offerTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var offerTypes = ['flat', 'house', 'bungalo', 'palace'];
// Типы офферов в тайтле для функции setOfferType()
var offerTypesInTitles = ['квартир', 'дом', 'бунгал', 'дворец'];
var checkinTimes = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var OFFERS_COUNT = 8;
var offers = new Array(OFFERS_COUNT);

// Заполняем массив офферов
for (var i = 0; i < offers.length; i++) {
	offers[i] = createOffer();
}


// Показываем карту
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// Находим шаблон пина
var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
// Находим шаблон объявления
var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
// Нода для вывода меток
var mapPins = document.querySelector('.map__pins');

// Вывод меток
var fragment = document.createDocumentFragment();
for (var i = 0; i < offers.length; i++) {
	fragment.appendChild(renderMapPin(i));
}
mapPins.appendChild(fragment);

// Вывод объявлений
var fragment = document.createDocumentFragment();
for (var i = 0; i < offers.length; i++) {
	fragment.appendChild(renderMapCard(i));
}
map.appendChild(fragment);




// Создает копию шаблона метки, заполняет его данными из массива и возвращает
function renderMapPin(i) {
	var mapPin = mapPinTemplate.cloneNode(true);
	mapPin.style = 'left: ' + (offers[i].location.x + (mapPin.offsetWidth / 2)) + 'px; top: ' + (offers[i].location.y + (mapPin.offsetHeight / 2)) + 'px';
	mapPin.querySelector('img').src = offers[i].author.avatar;
	return mapPin;
}
// Создает копию шаблона объявления, заполняет его данными из массива и возвращает
function renderMapCard(i) {
	var mapCard = mapCardTemplate.cloneNode(true);
	mapCard.querySelector('h3').textContent = offers[i].offer.title;
	mapCard.querySelector('p small').textContent = offers[i].offer.address;
	mapCard.querySelector('.popup__price').textContent = offers[i].offer.price + '₽ / ночь';
	switch (offers[i].offer.type) {
		case 'flat':
			mapCard.querySelector('h4').textContent = 'Квартира';
			break;
		case 'house':
			mapCard.querySelector('h4').textContent = 'Дом';
			break;
		case 'bungalo':
			mapCard.querySelector('h4').textContent = 'Бунгало';
			break;
		case 'palace':
			mapCard.querySelector('h4').textContent = 'Дворец';
			break;
		default:
			mapCard.querySelector('h4').textContent = 'Дом';
	}
	mapCard.querySelector('h4').nextElementSibling.textContent = 'Комнат: ' + offers[i].offer.rooms + ' для ' + offers[i].offer.guests + ' гостей.';
	mapCard.querySelector('.popup__features').previousElementSibling.textContent = 'Заезд после ' + offers[i].offer.checkin + ', выезд до ' + offers[i].offer.checkout;
	mapCard.querySelector('.popup__features').innerHTML = '';
	var fragment = document.createDocumentFragment();
	var feature;
	for (var j = 0; j < offers[i].offer.features.length; j++) {
		feature = document.createElement('li');
		feature.className = 'feature feature--' + offers[i].offer.features[j];
		fragment.appendChild(feature);
	}
	mapCard.querySelector('.popup__features').appendChild(fragment);
	mapCard.querySelector('.popup__features').nextElementSibling.textContent = offers[i].offer.description;
	mapCard.querySelector('.popup__avatar').src = offers[i].author.avatar;
	return mapCard;
}


// Конструктор объекта Offer
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
// Генерирует для оффера случайное количество случайных фич
function getFeatures() {
	var offerFeatures = [];
	for (var i = 0; i < getRandomElement(features.length, 0) + 1; i++) {
		offerFeatures.push(getRandomArrayElement(features));
	}
	return offerFeatures;
}
// Создает объект оффер
function createOffer() {
	var offer = new Offer();
	removeCreatedTitle(offer);
	setOfferType(offer);
	return offer;
}
// Задает тип оффера в зависимости от его заголовка (домик - house, квартира - flat и т.п.)
function setOfferType(offer) {
	var offerTitle = offer.offer.title;
	for (var i = 0; i < offerTypesInTitles.length; i++) {
		if (offerTitle.indexOf(offerTypesInTitles[i]) != -1) {
			offer.offer.type = offerTypes[i];
		}
	}
}
// Удаляет заголовок оффера из общего массива заголовков
function removeCreatedTitle(offer) {
	var offerTitleIndex = offerTitles.indexOf(offer.offer.title);
	if (offerTitleIndex != -1) {
		offerTitles.splice(offerTitleIndex, 1);
	}
}
function roundTo(num, to) {
	return Math.round(num / to) * to;
}
function getRandomElement(max, min) {
	return Math.floor(Math.random() * (max - min) + min);
}
function getRandomArrayElement(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}