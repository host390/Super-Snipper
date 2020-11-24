

document.addEventListener("DOMContentLoaded", () => {
    

	function linePers() {
		let allTrakLine = document.querySelectorAll('.trak-line') // нахожу все трек-лайны

		if (allTrakLine.length > 0) {
			for (let i = 0; i < allTrakLine.length; i++) {

				// let widthDev = tranNu(allTrakLine[i].querySelector('.trak-line__perc').textContent)
				let widthDev = parseInt(allTrakLine[i].querySelector('.trak-line__perc').textContent)
				widthDev = (widthDev > 100) ? widthDev = 100: (widthDev < 0) ? widthDev = 0: widthDev = widthDev;
				widthDev = 100 - widthDev;
				// console.log(widthDev)
				allTrakLine[i].querySelector('.trak-line__barrier').style.width = `${widthDev}%`;
	
				allTrakLine[i].querySelector('.trak-line__color-line').style.animationName = 'percent_anim';
			}
	
			// function tranNu(pers) { // функция интепритирует данные (пример: вход-'1234px' выход-'1234)
			// 	let per = +(pers.match(/\d+\.\d+|\d+|-\d+\.\d+|-\d+/)); // переводим строку с px в число без px
			// 	per = (per > 100) ? per = 100: (per < 0) ? per = 0: per = per;
				
			// 	let iverPer = 100 - per
			// 	return iverPer
			// };
		}
	}
    linePers();

    function ibg () {
        let allItems = document.querySelectorAll('.ibg'), // находим все контенеры с классом ibg
            itemsImage, // переменная для картинок
            src; // переменная для src
        for (let i = 0; i < allItems.length; i++) { // проходим по всем элементам и ...
            itemsImage = allItems[i].querySelector('img'); // находим в них картинку
            src = itemsImage.getAttribute('src'); // узнаём их src
            allItems[i].style.backgroundImage = `url(${src})`; // вставляем src в url background-image
        };
    };
    ibg ();

	function menuBurger () {
		let menu = document.querySelector('.menu'), // находим контейнер со всем
			butOpenMenu = menu.querySelector(".menu__burger_open"), // кнопку открытия
			butCloseMenu = menu.querySelector(".menu__burger_close"), // кнопку закрытия
			menuBackblack = menu.querySelector(".menu__backblack"); // фон

		butOpenMenu.addEventListener('click', () => { // ставим обработчик на открытие меню
            document.body.style.overflow = 'hidden'; // запретить body прокрутку
            menu.classList.add('menu_active'); // активировать меню
        });
        butCloseMenu.addEventListener('click', () => { // ставим обработчик на закрытие меню
            document.body.style.overflow = 'auto'; // разрешить body прокрутку
            menu.classList.remove('menu_active'); // закрыть меню
        });
        menuBackblack.addEventListener('click', () => { // ставим обработчик на закрытие меню
            document.body.style.overflow = 'auto'; // разрешить body прокрутку
            menu.classList.remove('menu_active'); // закрыть меню
        });
    }
    menuBurger ();

    function animScroll() {
        let allAnchorLinks = document.querySelectorAll('a[data-link-anchor]'); // находим все ссылки начинающиеся на # (Это точно якори)
        
		for (let i = 0; i < allAnchorLinks.length; i++) { // забускаем цикл по всем ссылкам
			allAnchorLinks[i].addEventListener('click', function(event) { // Ставим обработчик на все якори

				event.preventDefault(); // отрубаем действие по умолчанию
				let href = this.getAttribute('href'); // получем href ссылки на которую кликнули
				let elemntAnchor = document.querySelector(href); // находим элемент, на котором стоит этот якорь

				if (href == '#up') { //если в href ссылки добавить #up, то скролл дойдёт до начала
					scrollUp() // вызываем соответствующую функцию
				} else {
                    if (window.pageYOffset > elemntAnchor.offsetTop) { // если экран ниже элемента то...
                        scrollTop(elemntAnchor.offsetTop); // вызываем соответствующую функцию и - высоту fixed menu
                    } else if (window.pageYOffset < elemntAnchor.offsetTop) { //если экран выше элемента то...
                        scrollBottom(elemntAnchor.offsetTop); // вызываем соотвктствующую функцию и - высоту fixed menu
                    } else { // если экран находится в одной координате с элементом то...
                        window.scrollTo(0, elemntAnchor.offsetTop); // экран становтся в координату элемента и - высоту fixed menu
                    };
                };
			});
		};

		function scrollTop(elemntAnchor) { // функция вызывается если экран ниже элемента
			if (window.pageYOffset > elemntAnchor) { // если координата экрана больше координаты элемента то...
				window.scrollTo(0, window.pageYOffset - 50); // скролим вверх по 50px за раз
				setTimeout(scrollTop, 1, elemntAnchor); // ждём 1 милисекунду и повторяем функцию
			} else { // если мы дошли до нужной координаты , то оставляем скролл на корде элемента
				window.scrollTo(0, elemntAnchor);
			};
		};

		function scrollBottom(elemntAnchor) { // функция вызывается если экран выше элемента
			if (window.pageYOffset < elemntAnchor) { // если координата экрана меньше координаты элемента то...
				window.scrollTo(0, window.pageYOffset + 50); // скролим вниз по 50px за раз
				setTimeout(scrollBottom, 1, elemntAnchor); // ждём 1 милисекунду и повторяем функцию
			} else { // если мы дошли до нужной координаты , то оставляем скролл на корде элемента
				window.scrollTo(0, elemntAnchor);
			};
		};

		function scrollUp() { // функция скролит экран в координату 0 0 (для стрелочки up)
			if (window.pageYOffset > 0) {
				window.scrollTo(0, window.pageYOffset - 50)
				setTimeout(scrollUp, 1)
			} else {
				window.scrollTo(0, 0)
			}
		}
	};
    animScroll ();
	
	function activMenuAitems () {
        let headerMenu = document.querySelector('.menu') // находим меню хедера
		headerMenu.addEventListener('click', function(event) { // при клике на это меню...
            headMenuActive (event.target, event.currentTarget); // передаём в функцию элемент куда нажали и на чём был обработчик
            // alert (event.target.tagName + ' ' + event.currentTarget.tagName)
        });
        // Проверить с другими ссылками скорее всего будет ошибка, тогда чере дата атрибут нужно будет ставить :)
		function headMenuActive(et, ec) { // запускаем проверочную функцию
			// console.log (et.getAttribute('data-link-anchor'))
			if (et.getAttribute('data-link-anchor') == null) return; // если это не сыллка, то не надо нам
			if (ec.querySelector('.menu__link_active') == null) { // если изначально нет активов то...
				event.preventDefault(); // вырубаем действие по умолчанию
				et.classList.add('menu__link_active'); // даём нажатому актив
			} else { // если изначально есть актив то...
				ec.querySelector('.menu__link_active').classList.remove('menu__link_active'); // удаляем у него актив
				event.preventDefault(); // вырубаем действие по умолчанию
				et.classList.add('menu__link_active'); // даём класс актив
			};
		};
	};
    // activMenuAitems();
	
	function activMenuZone() {
		// heightFixedMedu = headerRow.offsetHeight; // отслеживаем высоту fixed меню

		let headMenu = document.querySelector('.menu'),
			aHrefAll = headMenu.querySelectorAll('a[data-link-anchor]'), // находим все ссылки главного меню
			arrHref = [], // создаём массив для href всех ссылок
			zoneAllArr = []; // создаём массив для зон

		for (let i = 0; i < aHrefAll.length; i++) { // проходимся по каждой сслыки
			arrHref.push(aHrefAll[i].getAttribute('href')); // помещяем в массив href
			zoneAllArr.push(document.querySelector(arrHref[i])); // ниходим все зоны по хрефам ссылок
			// alert ((i + 1)+ '. ' + 'links: ' + arrHref[i] + "  " +  'zone: ' + zoneAllArr[i].getAttribute('id')) // проверить
		};
		
		window.addEventListener('scroll', function() { // при скролле...

			// heightFixedMedu = headerRow.offsetHeight; // обновляем высоту fixed меню
			// fullHeigth = window.pageYOffset + heightFixedMedu; // координата окна сверху +  высотра прекреплённого хедера
			// fullHeigheadMenuth = window.pageYOffset
			
			let fullHeigth = window.pageYOffset
			// console.log (fullHeigth)

			for (let i = 0; i < aHrefAll.length; i++) { // проходимся по каждой координатной области зон
			// если верхняя кордината экрана больше или равно верхней координаты какой либо зоны и если верхняя кордината экрана
			// меньше или равно нижней координаты зоны то... (если мы попали в оду из зон)
				if (fullHeigth >= zoneAllArr[i].offsetTop && fullHeigth <= zoneAllArr[i].offsetTop + zoneAllArr[i].offsetHeight) {

					// console.log('Мы сейчас в зоне - ' + zoneAllArr[i].getAttribute('id'))

					let linkAct = headMenu.querySelector(`a[href*="${zoneAllArr[i].getAttribute('id')}"]`); // находим якорь этой зоны
					// console.log ('Что сейчас за ссылка? - ' + linkAct.getAttribute('href')) // какая ссылка?
					let linkLastAct = headMenu.querySelector('.menu__link_active'); // находим последнюю активную зону в хедере
					if (linkLastAct == null) { // если изначально не активных то...
						linkAct.classList.add('menu__link_active'); // даём актив ссылки сейчасной зоны
					} else { // если есть активные, то...
						linkLastAct.classList.remove('menu__link_active'); // удаляем последний актив
						linkAct.classList.add('menu__link_active'); // даём актив ссылки сейчасной зоны
					};
				};
			};
		});
	};
	// activMenuZone();

	function animShowContent() {
		let allAnimShowAtems = document.querySelectorAll('._anim-items');
		if (allAnimShowAtems.length > 0) {
			window.addEventListener("scroll", animShowOn);
			function animShowOn() {
				let scrollHeight = window.pageYOffset + document.documentElement.clientHeight
				for (let i = 0; i < allAnimShowAtems.length; i++) {
					let atem = allAnimShowAtems[i];
					let atemsShow = { // объект с данными
						height: atem.offsetHeight, // высота
						cordTop: offset(atem).top, // кордината с верху
					}
					// console.log ('atem: ' + atem + " height: " + atemsShow.height + " cordTop: " + atemsShow.cordTop)
					let animShowAtemHeight = (atemsShow.height / 4) + atemsShow.cordTop
					
					if (atemsShow.height > window.innerHeight) {
						// console.log ("высота большого элемента: " + atemsShow.height)
						animShowAtemHeight = atemsShow.cordTop + (window.innerHeight / 4);
						// console.log (animShowAtemHeight) // тут надо как-то так сделать, чтоб оно анимировалось относительно окна 
					}
					// console.log ("Анимация сработает на: " + animShowAtemHeight + " а вы сейчас на: " + scrollHeight)
					if (scrollHeight >= animShowAtemHeight) {
						atem.classList.add("_active-show");

						// Надо узнать на каком я сейчас элементе и если это тот,что мне нужен открытать функцию
						// console.log(atem.classList.contains('line-box'))
						// let k = 0
						// console.log(atem.tagName == 'DIV')
						if (atem.classList.contains('line-box')) {
							linePers();
						}
					}
				}
				
			}
			function offset(el) {
				const rect = el.getBoundingClientRect(),
					scrollTop = window.pageYOffset || document.documentElement.scrollTop;
				return {top: rect.top + scrollTop}
			}
			setTimeout(() => {
				animShowOn ()
			}, 400);
		}
	}
	// animShowContent();

	


	// Анимации при скроле, надо разобраться :)

	// let allAnimShowAtems = document.querySelectorAll('._anim-items');

	// if (allAnimShowAtems.length > 0) {
	// 	window.addEventListener("scroll", animOnShow);
	// 	function animOnShow () {
	// 		for (let i = 0; i < allAnimShowAtems.length; i++) {
	// 			const animItem = allAnimShowAtems[i];
	// 			const animItemsHeight = animItem.offsetHeight;
	// 			const animItemOffset = offset(animItem).top;
	// 			const animStart = 4;


	// 			let animItemPoint = window.innerHeight - animItemsHeight / animStart;
	// 			console.log ("animItemPoint " + animItemPoint)

	// 			console.log ("pageYOffset " + pageYOffset)

	// 			console.log ("animItemOffset " + animItemOffset)

	// 			if (animItemsHeight > window.innerHeight) {
	// 				animItemPoint = window.innerHeight - window.innerHeight / animStart;
	// 			}

	// 			console.log ("замена произойдёт " + (animItemOffset - animItemPoint))
	// 			if (pageYOffset > animItemOffset - animItemPoint) {
	// 				animItem.classList.add("_active-show");
	// 			}
	// 		}
	// 	}
	// 	function offset(el) {
	// 		const rect = el.getBoundingClientRect(),
	// 			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	// 		return {top: rect.top + scrollTop}
	// 	}
	// }

	// }

	
	
	
	// window.addEventListener("scroll", function() {
	// 	if (window.pageYOffset + document.documentElement.clientHeight > 1100) {
	// 		console.log ('давай')
	// 		linePers();
	// 		// test()
	// 	}
	// });
	

	
	

	// window.addEventListener('scroll', function(e) {
	// 	let scrollHeight = window.pageYOffset + document.documentElement.clientHeight // нижняя кордината окна
	// 	console.log(scrollHeight)
	// 	let coefficient = 4 // коэффициент
	// 	 // находим все жлементы которые хотим анимировать
		
		// for (let i = 0; i < allAnimShowAtems.length; i++) { // проходимся по каждому элементу
		// 	let atemsInfo = { // объект с данными
		// 		height: allAnimShowAtems[i].offsetHeight, // высота
		// 		cord: coordTop(allAnimShowAtems[i]), // кордината с верху
		// 	}
		// 	let animShowAtemHeight = atemsInfo.height / coefficient // 1/4 от высоты
		// 	animShowAtemHeight = animShowAtemHeight + atemsInfo.cord // + сколько с верху
			
		// 	console.log (animShowAtemHeight)

		// 	if (scrollHeight >= animShowAtemHeight) {
		// 		allAnimShowAtems[i].classList.add("_active-show") //transform: translate(0px, 50%); !!! мешает, а мне нужно ровно чтоб прям было, как исправить??? Надо как-то узнать начения транспарента и вычесть его и всё
		// 		// и вообще проблема будет с или сделать так, чтоб у нас просто записывалась его коорината без учёта 
		// 		// вот этих всех штук
		// 	}

	// 	}
	// 	function coordTop(elem) { // находит координату с верху
	// 		let cord = elem.getBoundingClientRect() 
	// 		return cord.top + window.pageYOffset
	// 	}
	// })








	
			

			// let animShowItems = document.querySelectorAll('._anim-show')
			// let pageHeightScroll = window.pageYOffset + document.documentElement.clientHeight
			// let coefficient = 4;
			// console.log (animShowItems.length)
	
			// for (let i = 0; i < animShowItems.length; i++) {
			// 	let animShowItemsHeight = animShowItems[i].offsetHeight
			// 	animShowItemsHeight = animShowItemsHeight / coefficient
	
			// 	let animShowItemsCoordTop = coordTop(animShowItems[i])
			// 	animShowItemsCoordTop = animShowItemsCoordTop + animShowItemsHeight
				
			// 	if (pageHeightScroll >= animShowItemsCoordTop) {
			// 		animShowItems[i].classList.add('_active-show')
			// 	}
	
			// 	// console.log (animShowItemsCoordTop)
	
			// 	// console.log (pageHeightScroll)
			// 	// console.log (animShowItemsHeight)
			// }
			
		// }

		// window.addEventListener('scroll', function () {
			
		// })

		// setTimeout(() => {
		// 	animShow ()
		// }, 300);


	// function animShow () {
	// 	let animShowItems = document.querySelectorAll('._anim-show')
	// 	let pageHeightScroll = window.pageYOffset + document.documentElement.clientHeight
	// 	let coefficient = 4;
	// 	// console.log (animShowItems.length)

	// 	for (let i = 0; i < animShowItems.length; i++) {
	// 		let animShowItemsHeight = animShowItems[i].offsetHeight
	// 		animShowItemsHeight = animShowItemsHeight / coefficient

	// 		let animShowItemsCoordTop = coordTop(animShowItems[i])
	// 		animShowItemsCoordTop = animShowItemsCoordTop + animShowItemsHeight

	// 		if (pageHeightScroll >= animShowItemsCoordTop) {
	// 			animShowItems[i].classList.add('_active-show')
	// 		}

	// 		console.log (animShowItemsCoordTop)

	// 		console.log (pageHeightScroll)
	// 		// console.log (animShowItemsHeight)
	// 	}
	// 	function coordTop(elem) {
	// 		let cordTop = elem.getBoundingClientRect() 
	// 		return cordTop.top + pageYOffset
	// 	}
	// }

	// setTimeout(() => {
	// 	animShow ()
	// }, 300);


})