"use strict"
window.addEventListener('DOMContentLoaded', () => {
	window.onresize = function (e) {
		const logo = document.querySelector('.header__logo');

		if (window.screen.width <= 600) {
			logo.textContent = 'BPL';
		} else if (window.screen.width > 600) {
			logo.textContent = 'Brooklyn Public Library';
		}
	};

	//BURGER	//DROP MENU
	const body = document.body;
	const header = document.querySelector('.header');
	const overlay = document.querySelector('.header__burger-overlay');
	const burgerMenu = document.querySelector('.header-menu__body');
	const burger = document.querySelector('.header__burger');
	const headerProfileIcon = document.querySelector('.header__profile-icon');
	const dropMenu = document.querySelector('.drop-menu');
	const modalLogin = document.querySelector('.modal-login');
	const buttonCloseLogin = document.querySelector('.close-btn_login');
	const modalRegister = document.querySelector('.modal-register');
	const buttonCloseRegister = document.querySelector('.close-btn_register');
	const linkToRegister = document.querySelectorAll('.link-to-register');
	const linkToLogin = document.querySelectorAll('.link-to-login');

	function lockBodyScroll() {
		body.classList.add('no-scroll');
	}
	function unlockBodyScroll() {
		body.classList.remove('no-scroll');
	}
	function toggleMenu(e) {
		const targetItem = e.target;

		if (targetItem.closest('.header__burger')) {
			if (!burger.classList.contains('menu-open')) {
				closeDropMenu();
				openBurgerMenu();
			} else {
				closeBurgerMenu();
			}
		}

		if (
			targetItem.classList.contains('active-overlay') ||
			targetItem.classList.contains('header-menu__link')
		) {
			closeBurgerMenu();
			closeDropMenu();
			closeLoginModal();
			closeRegisterModal();
		}

		if (targetItem.closest('.header__profile-icon')) {
			toggleDropMenu(e);
		}
	}
	function openBurgerMenu() {
		closeDropMenu();
		closeLoginModal();
		closeRegisterModal();
		burgerMenu.classList.add('menu-open');
		burger.classList.add('menu-open');
		overlay.classList.add('active-overlay');
		lockBodyScroll();
	}
	function closeBurgerMenu() {
		burgerMenu.classList.remove('menu-open');
		burger.classList.remove('menu-open');

		overlay.classList.remove('active-overlay');
		unlockBodyScroll();
	}
	function toggleDropMenu(e) {
		if (!dropMenu.classList.contains('drop-menu__active')) {
			openDropMenu();
		} else {
			closeDropMenu();
		}
	}
	function openDropMenu() {
		closeBurgerMenu();
		closeLoginModal();
		closeRegisterModal();
		lockBodyScroll();
		dropMenu.classList.add('drop-menu__active');
		overlay.classList.add('active-overlay');
	}
	function closeDropMenu() {
		dropMenu.classList.remove('drop-menu__active');
		unlockBodyScroll();
		if (
			overlay.classList.contains('active-overlay') &&
			!burgerMenu.classList.contains('menu-open')
		) {
			overlay.classList.remove('active-overlay');
		}
	}
	function openLoginModal() {
		closeRegisterModal();
		overlay.classList.add('active-overlay');
		modalLogin.classList.add('modal-login_open');
		lockBodyScroll();
	}
	function closeLoginModal() {
		overlay.classList.remove('active-overlay');
		modalLogin.classList.remove('modal-login_open');
		unlockBodyScroll();
	}
	function openRegisterModal() {
		closeLoginModal();
		overlay.classList.add('active-overlay');
		modalRegister.classList.add('modal-register_open');
		lockBodyScroll();
	}
	function closeRegisterModal() {
		overlay.classList.remove('active-overlay');
		modalRegister.classList.remove('modal-register_open');
		unlockBodyScroll();
	}

	//SLIDER
	let position = 0;
	let dotIndex = 0;

	const sliderTrack = document.querySelector('.slider__cards-container');
	const prevBtn = document.querySelector('.slider__prev-btn');
	const nextBtn = document.querySelector('.slider__next-btn');
	const paginationItems = Array.from(
		document.querySelectorAll('.pagination__item')
	);

	function setActiveDot(dotIndex) {
		paginationItems.forEach(dot => {
			dot.classList.remove('dot__active');
			dot.removeAttribute('disabled');
		});
		paginationItems[dotIndex].classList.add('dot__active');
		paginationItems[dotIndex].setAttribute('disabled', '');
	}
	function checkButtons() {
		prevBtn.removeAttribute('disabled');
		nextBtn.removeAttribute('disabled');
		if (dotIndex === 0) {
			prevBtn.setAttribute('disabled', '');
		}
		if (dotIndex === paginationItems.length - 1) {
			nextBtn.setAttribute('disabled', '');
		}
	}
	function moveSlider() {
		position = window.screen.width <= 770 ? 102 * dotIndex : 34 * dotIndex;
		sliderTrack.style.left = -position + '%';
		checkButtons();
		setActiveDot(dotIndex);
	}
	function setNextSlide() {
		let k = paginationItems.length - 1;
		if (position < window.screen.width <= 770 ? 102 * k : 34 * k) {
			position += window.screen.width <= 770 ? 102 : 34;
			dotIndex++;
		}
		sliderTrack.style.left = -position + '%';
		setActiveDot(dotIndex);
		checkButtons();
	}
	function setPrevSlide() {
		if (position > 0) {
			position -= window.screen.width <= 770 ? 102 : 34;
			dotIndex--;
		}
		sliderTrack.style.left = -position + '%';
		setActiveDot(dotIndex);
		checkButtons();
	}

	paginationItems.forEach((dot, i) => {
		dot.addEventListener('click', () => {
			dotIndex = i;
			moveSlider();
		});
	});

	//FAVORITES "SLIDER"
	const pickSeasonInput = Array.from(
		document.querySelectorAll('.pick-season__input')
	);
	const favoriteSeasons = Array.from(
		document.querySelectorAll('.favorites__items')
	);

	//EVENTLISTENER
	document.addEventListener('click', e => {
		if (e.target.classList.contains('pick-season__input')) {
			if (!e.target.hasAttribute('checked')) {
				pickSeasonInput.forEach(input => {
					input.removeAttribute('checked', '');
					e.target.setAttribute('checked', '');
				});

				favoriteSeasons.forEach(season => {
					season.classList.remove('picked-season');
					if (season.classList.contains(`${e.target.value}`)) {
						season.classList.add('picked-season');
					}
				});
			}
		}
		if (e.target.closest('.header')) {
			toggleMenu(e);
		}

		if (e.target.classList.contains('link-to-login')) {
			closeDropMenu();
			closeRegisterModal();
			openLoginModal();
		} else if (e.target.classList.contains('link-to-register')) {
			closeDropMenu();
			closeLoginModal();
			openRegisterModal();
		}
	});
	prevBtn.addEventListener('click', setPrevSlide);
	nextBtn.addEventListener('click', setNextSlide);
	buttonCloseLogin.addEventListener('click', closeLoginModal);
	buttonCloseRegister.addEventListener('click', closeRegisterModal);
});


