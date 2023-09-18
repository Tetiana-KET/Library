"use strict"
window.addEventListener('DOMContentLoaded', () => {
	window.onresize = function (e) {
		const logo = document.querySelector('.header__logo');

		if (window.screen.width <= 600) {
			logo.textContent = 'BPL'
		} else if (window.screen.width > 600) {
			logo.textContent = 'Brooklyn Public Library'
		};
    setSlidesWidth();
	}

	const body = document.body;

	const ownButton = document.querySelector('.own-button');
	ownButton.textContent = 'Own';
	ownButton.disabled = true;

	//BURGER

	const overlay = document.querySelector('.header__burger-overlay');

	function toggleMenu(e) {
		const targetItem = e.target

		if (targetItem.closest('.header__burger')) {
			openMenu()
		}
		if (
			targetItem.classList.contains('active-overlay') ||
			targetItem.classList.contains('header-menu__link')
		) {
			closeMenu()
		}
	}
	function lockBodyScroll() {
		body.classList.add('no-scroll')
	}
	function unlockBodyScroll() {
		body.classList.remove('no-scroll')
	}
	function openMenu() {
		document.documentElement.classList.toggle('menu-open')
		overlay.classList.toggle('active-overlay')

		if (!body.classList.contains('no-scroll')) {
			lockBodyScroll()
		} else {
			unlockBodyScroll()
		}
	}
	function closeMenu() {
		document.documentElement.classList.remove('menu-open')
		overlay.classList.remove('active-overlay')
		unlockBodyScroll()
	}

	//SLIDER
	let position = 0;
	let dotIndex = 0;

	const sliderContainer = document.querySelector('.slider');
	const sliderTrack = document.querySelector('.slider__cards-container');
	const sliderItem = document.querySelector('.slider__card');
	const sliderItems = Array.from(document.querySelectorAll('.slider__card'));
	const prevBtn = document.querySelector('.slider__prev-btn');
	const nextBtn = document.querySelector('.slider__next-btn');
	const pagination = document.querySelector('.pagination');
	const paginationItems = Array.from(document.querySelectorAll('.pagination__item'));
	const paginationItem = document.querySelector('.pagination__item');

	function checkButtons() {}
	function setActiveDot(dotIndex) {
		paginationItems.forEach((dot) => {
			dot.classList.remove('dot__active');
			dot.removeAttribute('disabled');
		});
		paginationItems[dotIndex].classList.add('dot__active');
		paginationItems[dotIndex].setAttribute('disabled', '');
	}

	//EVENT LISTENERS
	document.addEventListener('click', toggleMenu);

	paginationItems.forEach((dot, i) => {
		dot.addEventListener('click', () => {
			position =  window.screen.width <= 770 ? 102 * i : 34 * i;
			sliderTrack.style.left = -position + '%';
			dotIndex = i;
			checkButtons();
			setActiveDot(dotIndex);
		})
	})
})


