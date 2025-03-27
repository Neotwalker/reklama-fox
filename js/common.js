document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll("h2").forEach(h2 => {
		const wordCount = h2.textContent.trim().split(/\s+/).length;
		if (wordCount === 2) {
			h2.classList.add("color-accent");
		}
	});

	Fancybox.bind("[data-fancybox]", {});

	const swiper = new Swiper('.main--works__wrapper', {
		slidesPerView: "auto",
		spaceBetween: 30,
		loop: false,
		centeredSlides: true,
		initialSlide: 1,
		breakpoints: {
			992: {
				spaceBetween: 25,
			},
			0: {
				spaceBetween: 10,
			},
		},
	});

	// защита от спама
	let eventCalllback = function(e) {
		let el = e.target,
			clearVal = el.dataset.phoneClear,
			pattern = el.dataset.phonePattern,
			matrix_def = "+_(___) ___-__-__",
			matrix = pattern ? pattern : matrix_def,
			i = 0,
			def = matrix.replace(/\D/g, ""),
			val = e.target.value.replace(/\D/g, "");
		if (clearVal !== 'false' && e.type === 'blur') {
			if (val.length < matrix.match(/([\_\d])/g).length) {
				e.target.value = '';
				return;
			}
		}
		if (def.length >= val.length) val = def;
		e.target.value = matrix.replace(/./g, function(a) {
			return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
		});
	}
	let phone_inputs = document.querySelectorAll('.wpcf7-tel');
	for (let elem of phone_inputs) {
		for (let ev of ['input', 'blur', 'focus']) {
			elem.addEventListener(ev, eventCalllback);
		}
	}
	const fio = document.querySelectorAll('input[name="fio"]');
	fio.forEach(name =>{
		name.addEventListener('keyup', function() {
			this.value = this.value.replace(/http|https|url|.net|www|.ru|.com|[0-9]/g, '');
		});

	});
	document.querySelectorAll('input[type="text"], textarea, input[type="number"]').forEach(field => {
		field.addEventListener('input', function () {
			// Удаляем все латинские буквы
			this.value = this.value.replace(/[a-zA-Z]/g, '');
		});
	});
	document.querySelectorAll('input[type="text"], textarea, input[type="number"]').forEach(field => {
    // Запрещаем вставку в поля ввода
    field.addEventListener('paste', function(event) {
        event.preventDefault();  // Отменяем вставку
    });
	});
	document.querySelectorAll('.la-sentinelle-container input[type="text"]').forEach((field) => {
		field.addEventListener('change', () => {
			let buttons = document.querySelectorAll('.wpcf7-submit');
			buttons.forEach((button) => {
				button.remove();
			});
		});
	});
	// !защита от спама

	const swiperclients = new Swiper('.main--clients__wrapper', {
		slidesPerView: 5,
		slidesPerGroup: 5,
		spaceBetween: 30,
		loop: false,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		breakpoints: {
			1440: {
				slidesPerView: 5,
				slidesPerGroup: 5,
			},
			1200: {
				slidesPerView: 4, 
				slidesPerGroup: 4,
				spaceBetween: 25,
			},
			992: {
				slidesPerView: 3,
				slidesPerGroup: 3,
				spaceBetween: 25,
			},
			768: {
				slidesPerView: 3,
				slidesPerGroup: 3,
				spaceBetween: 25,
			},
			480: {
				slidesPerView: 3,
				slidesPerGroup: 3,
				spaceBetween: 25,
			},
			0: {
				slidesPerView: 2,
				slidesPerGroup: 2,
				spaceBetween: 25,
			},
		},
	});

	const smoothHeight = (itemSelector, buttonSelector, contentSelector) => {
		const items = document.querySelectorAll(itemSelector);

		if (!items.length) return;

		// Добавляем класс 'active', 'data-open="true"' и устанавливаем max-height первому элементу
		const firstItem = items[0];
		const firstButton = firstItem.querySelector(buttonSelector);
		const firstContent = firstItem.querySelector(contentSelector);
		firstItem.classList.add('active');
		firstButton.classList.add('active');
		firstItem.dataset.open = 'true';
		firstContent.style.maxHeight = `${firstContent.scrollHeight}px`;

		items.forEach(el => {
			const button = el.querySelector(buttonSelector);
			const content = el.querySelector(contentSelector);

			button.addEventListener('click', () => {
				if (el.dataset.open !== 'true') {
					// Удаляем параметры для всех элементов, кроме текущего
					items.forEach(item => {
						if (item !== el) {
							item.dataset.open = 'false';
							item.classList.remove('active');
							item.querySelector(buttonSelector).classList.remove('active');
							item.querySelector(contentSelector).style.maxHeight = '';
						}
					});
					el.dataset.open = 'true';
					button.classList.add('active');
					el.classList.add('active');
					content.style.maxHeight = `${content.scrollHeight}px`;
				} else {
					el.dataset.open = 'false';
					el.classList.remove('active');
					button.classList.remove('active');
					content.style.maxHeight = '';
				}
			})

			const onResize = () => {
				if (el.dataset.open === 'true') {
					if (parseInt(content.style.maxHeight) !== content.scrollHeight) {
						content.style.maxHeight = `${content.scrollHeight}px`;
					}
				}
			}

			window.addEventListener('resize', onResize);
		});
	}
	smoothHeight('.main--faq__item', '.main--faq__item--button', '.main--faq__item--answer');

	var mapLoaded = false;
	var mapInstance = null;
	function loadMap() {
		if (!mapLoaded) {
			mapLoaded = true;

			// Создаем тег <script> для загрузки API Яндекс.Карт
			var script = document.createElement('script');
			script.src = 'https://api-maps.yandex.ru/2.1/?apikey=d279246f-f0ec-4459-b99f-93e48818997b&lang=ru_RU';
			script.type = 'text/javascript';

			document.body.appendChild(script);

			script.onload = function () {
				if (typeof ymaps !== 'undefined') {
					ymaps.ready(function () {
						mapInstance = new ymaps.Map('map', {
							center: [55.194275, 61.379934],
							zoom: 15,
							controls: ['zoomControl', 'routeButtonControl'],
						});

						// Отключаем взаимодействие по умолчанию
						mapInstance.behaviors.disable(['scrollZoom', 'drag', 'multiTouch']);

						var control = mapInstance.controls.get('routeButtonControl');
						control.routePanel.state.set('to', 'г. Челябинск, ул. Цинковая 2а/2');

						var geocoder = ymaps.geocode('г. Челябинск, ул. Цинковая 2а/2');
						geocoder.then(function (res) {
							var coords = res.geoObjects.get(0).geometry.getCoordinates();

							var myPlacemark = new ymaps.Placemark(coords, {
								hintContent: 'г. Челябинск, ул. Цинковая 2а/2',
								balloonContent: 'г. Челябинск, ул. Цинковая 2а/2'
							}, {
								iconLayout: 'default#image',
								iconImageHref: 'img/loc.png',
								iconImageSize: [24, 24],
								iconImageOffset: [-12, -24]
							});

							mapInstance.geoObjects.add(myPlacemark);
							mapInstance.setCenter(coords);
						}, function (err) {
							console.log('Ошибка геокодирования:', err);
						});
					});
				}
			};
		}
	}
	// Активируем карту при клике на оверлей
	var overlay = document.querySelector('.map-overlay');
	if (overlay) {
		overlay.addEventListener('click', function () {
			this.style.display = 'none'; // Скрываем оверлей
			if (mapInstance) {
				mapInstance.behaviors.enable('drag'); // Включаем перемещение карты
			}
		});
	}
	// Загружаем карту только при попадании блока в область видимости
	var observer = new IntersectionObserver(function (entries) {
		entries.forEach(function (entry) {
			if (entry.isIntersecting) {
				loadMap();
				observer.unobserve(entry.target); // Отключаем наблюдение после загрузки
			}
		});
	});
	var mapBlock = document.querySelector('.main--contacts__right');
	if (mapBlock) {
		observer.observe(mapBlock);
	}

	// Функция для вычисления ширины скроллбара
	function getScrollbarWidth() {
		return window.innerWidth - document.documentElement.clientWidth;
	}
	// Универсальная функция открытия попапа (меню или модалки)
	function openPopup(popup) {
		const scrollbarWidth = getScrollbarWidth();
		document.body.style.paddingRight = `${scrollbarWidth}px`;
		popup.classList.add('active');
		document.documentElement.classList.add('hidden');
	}
	// Универсальная функция закрытия попапа
	function closePopup(popup) {
		popup.classList.remove('active');
		document.body.style.paddingRight = '';
		document.documentElement.classList.remove('hidden');
	}
	// Маппинг кнопок-триггеров и соответствующих попапов
	const popupMapping = [
		{ triggerClass: 'button--menu', targetSelector: '.menu--nav' },
		{ triggerClass: 'open--calculate', targetSelector: '.modal--calculate' },
		{ triggerClass: 'open--general', targetSelector: '.modal--general' }
	];
	// Обработчики открытия
	popupMapping.forEach(mapping => {
		document.querySelectorAll(`.button.${mapping.triggerClass}`).forEach(button => {
			button.addEventListener('click', (event) => {
				event.stopPropagation();
				const popup = document.querySelector(mapping.targetSelector);

				// Если кнопка "Рассчитать стоимость", обновляем значение скрытого input
				if (mapping.triggerClass === 'open--calculate') {
					let serviceText = "";
					// Если кнопка находится в блоке услуг – берём текст из <h3>
					const serviceItem = button.closest('.main--services__item');
					if (serviceItem) {
						const h3 = serviceItem.querySelector('h3');
						if (h3) serviceText = h3.innerText.trim();
					} else {
						// Если кнопка находится в футере – берём текст самой кнопки
						const footer = button.closest('.footer--nav');
						if (footer) {
							serviceText = button.innerText.trim();
						}
					}
					// Обновляем значение скрытого input (если он есть)
					const form = popup.querySelector('form');
					if (form) {
						const input = form.querySelector('input[name="service"]');
						if (input) {
							input.value = serviceText;
						}
					}
				}

				openPopup(popup);
			});
		});
	});
	// Обработчики для кнопок закрытия (меню: .menu--nav__close, модалки: .modal--close)
	document.querySelectorAll('.menu--nav__close, .modal .modal--close').forEach(closeBtn => {
		closeBtn.addEventListener('click', (event) => {
			event.stopPropagation();
			const popup = closeBtn.closest('.menu--nav, .modal');
			if (popup) {
				closePopup(popup);
			}
		});
	});
	// Закрытие попапа при клике вне его содержимого
	document.addEventListener('click', (event) => {
		document.querySelectorAll('.menu--nav.active, .modal.active').forEach(popup => {
			let wrapper;
			if (popup.classList.contains('menu--nav')) {
				wrapper = popup.querySelector('.menu--nav__wrapper');
			} else {
				wrapper = popup.querySelector('.modal--wrapper');
			}
			if (wrapper && !wrapper.contains(event.target)) {
				closePopup(popup);
			}
		});
	});
	// Дополнительное закрытие меню при клике по ссылке
	document.querySelectorAll('.menu--nav .menu a').forEach(link => {
		link.addEventListener('click', () => {
			const menuPopup = link.closest('.menu--nav');
			closePopup(menuPopup);
		});
	});

	let inputs = document.querySelectorAll('.wpcf7-file');
	inputs.forEach(function (input) {
		let label = input.closest('.add--file').querySelector('.input__file-button-text');
		let labelVal = label.innerText;

		input.addEventListener('change', function (e) {
			let countFiles = '';
			if (this.files && this.files.length >= 1)
				countFiles = this.files.length;

			if (countFiles)
				label.innerText = 'Файлов: ' + countFiles;
			else
				label.innerText = labelVal;
		});
	});


});