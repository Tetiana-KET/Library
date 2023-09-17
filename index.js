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
	let slidesToShow = window.screen.width <= 770 ? 1 : 3;
	const slidesToScroll = 1;

	const sliderContainer = document.querySelector('.slider');
	const sliderTrack = document.querySelector('.slider__cards-container');
	const sliderItem = document.querySelector('.slider__card');
	const sliderItems = Array.from(document.querySelectorAll('.slider__card'));
	const prevBtn = document.querySelector('.slider__prev-btn');
	const nextBtn = document.querySelector('.slider__next-btn');
	const pagination = document.querySelector('.pagination');
	const paginationItems = Array.from(document.querySelectorAll('.pagination__item'));
	const paginationItem = document.querySelector('.pagination__item');

	const itemWidth = sliderContainer.clientWidth / slidesToShow; //set every item width

  function setSlidesWidth () {
    sliderItems.forEach((item) => {
      item.style.minWidth = window.screen.width <= 770 ? `100%` : `31.92%`
    })
  }
  setSlidesWidth();

	//EVENT LISTENERS
	document.addEventListener('click', toggleMenu)
})


