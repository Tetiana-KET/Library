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
	const registerLogout = document.querySelector('.link-to-register');
	const loginMyProfile = document.querySelector('.link-to-login');
	const buttonLogin = document.querySelector('.button login-btn');
	const registerForm = document.querySelector('.register-form');
	const loginForm = document.querySelector('.login-form');
	const buttonCheckCard = document.querySelector('.button_check-card');
	let isAuthorized = JSON.parse(localStorage.getItem('isAuthorized'));
	const buyBtns = document.querySelectorAll('.book__button');

	checkAuthorization();

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
	function registerNewUser () {
		localStorage.clear();

		const registerEmail = document.getElementById('register-email').value;
		const registerPassword = document.getElementById('register-password').value;
		const userFirstName = document.getElementById('first-name').value;
		const userLastName = document.getElementById('last-name').value;
		const cardNumber = Math.ceil(Math.random() * 10000000000000).toString(16).toUpperCase().slice(0, 9);
		
		localStorage.setItem('userFirstName', userFirstName);
		localStorage.setItem('userLastName', userLastName);
		localStorage.setItem('registerPassword', registerPassword);
		localStorage.setItem('registerEmail', registerEmail);
		localStorage.setItem('cardNumber', cardNumber);
		localStorage.setItem('visitCounter', 1);
		localStorage.setItem('isAuthorized', true);
		localStorage.setItem('libraryCardOwn', false);

		closeRegisterModal();
		location.reload();
	}
	function checkAuthorization () {
		if (isAuthorized) {
			body.classList.add('authorized-user');
			setUserInitials();
			changeCardsSectionContent();
			changeDropMenuContent();
		}
	}
	function setUserInitials () {
		const initials = (localStorage.userFirstName[0] + localStorage.userLastName[0]).toUpperCase();
		headerProfileIcon.textContent = `${initials}`;
		headerProfileIcon.setAttribute(
			'title',
			`${localStorage.userFirstName} ${localStorage.userLastName}`
		);

	}
	function changeCardsSectionContent () {
		const cardTitle = document.querySelector('.card-find__title');
		const visitProfile= document.querySelector('.card-get__title');
		const description = document.querySelector('.card-get__text');
		const readerCardName = document.querySelector('.reader-card__name');
		const readerCardNumber = document.querySelector('.reader-card__number');
		
		cardTitle.textContent = 'Your Library card';
		readerCardName.value = `${localStorage.getItem('userFirstName')} ${localStorage.getItem('userLastName')}`;
		readerCardName.setAttribute('disabled', true);
		readerCardNumber.value = localStorage.getItem('cardNumber');
		readerCardNumber.setAttribute('disabled', true);
		visitProfile.textContent = 'Visit your profile';
		description.textContent = 'With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.';
		updateStatistic();
	}
	function updateStatistic () {
		const visitCounts = document.querySelector('.visits__count');
		visitCounts.textContent = localStorage.getItem('visitCounter');
	}
	function changeDropMenuContent () {
		registerLogout.textContent = 'Log Out';
	  loginMyProfile.textContent = 'My profile';
		document.querySelector('.drop-menu__title').textContent = localStorage.getItem('cardNumber');
		document.querySelector('.drop-menu__title').style.fontSize = '12px';
	}
	function checkCardNumber (e) {
		e.preventDefault();

		const readerCardNameEntered = document.querySelector('.reader-card__name').value.toLowerCase();
		const readerCardNumberEntered = document.querySelector('.reader-card__number').value.toLowerCase();
		
		const cardNumber = localStorage.getItem('cardNumber').toLowerCase();
		const userName = `${localStorage.getItem('userFirstName')} ${localStorage.getItem('userLastName')}`.toLowerCase();
		const userNameReverse = `${localStorage.getItem('userLastName')} ${localStorage.getItem('userFirstName')}`.toLowerCase();
		const statistics = document.querySelector('.library-cards__profile-statistic');

		if (
			cardNumber === readerCardNumberEntered &&
			(readerCardNameEntered === userName ||
			 readerCardNameEntered === userNameReverse)
		) {
			
			buttonCheckCard.classList.add('show-statistic');
			statistics.classList.add('show-statistic');
			updateStatistic();
			setTimeout(()=> {
				buttonCheckCard.classList.remove('show-statistic');
				statistics.classList.remove('show-statistic');
			}, 10000)
		}
	}
	function buyBook (e) {
		e.preventDefault();

		if (!isAuthorized) {
			openLoginModal();
		}
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

		if (
			e.target.classList.contains('link-to-login') &&
			(e.target.textContent === 'Log In' || e.target.textContent === 'Login')
		) {
			closeDropMenu();
			closeRegisterModal();
			openLoginModal();
		} else if (
			e.target.classList.contains('link-to-register') &&
			(e.target.textContent === 'Register' || e.target.textContent === 'Sign Up')
		) {
			closeDropMenu();
			closeLoginModal();
			openRegisterModal();
		} else if (
			e.target.classList.contains('link-to-register') &&
			e.target.textContent === 'Log Out'
		) {
			closeLoginModal();
			localStorage.setItem('isAuthorized', false);
			body.classList.remove('authorized-user');
			closeDropMenu();
			location.reload();
		}
	});
	prevBtn.addEventListener('click', setPrevSlide);
	nextBtn.addEventListener('click', setNextSlide);
	buttonCloseLogin.addEventListener('click', closeLoginModal);
	buttonCloseRegister.addEventListener('click', closeRegisterModal);
	//REGISTRATION
	registerForm.addEventListener('submit', e => {
		e.preventDefault();
		registerNewUser();
	});
	//LOGIN
	loginForm.addEventListener('submit', e => {
		e.preventDefault();

		const enteredPassword = document.getElementById('login-password').value;
		const enteredLogin = document.getElementById('login-email').value;

		const savedPassword = localStorage.getItem('registerPassword');
		const savedEmail = localStorage.getItem('registerEmail');
		const cardNumber = localStorage.getItem('cardNumber');

		const visitCounter = localStorage.getItem('visitCounter');
		if (
			(enteredLogin === savedEmail || enteredLogin === cardNumber) &&
			savedPassword === enteredPassword
		) {
			localStorage.setItem('visitCounter', +visitCounter + 1);
			localStorage.setItem('isAuthorized', true);
			closeLoginModal();

			location.reload();
		}
	});
	//	CHECK CARD
	buttonCheckCard.addEventListener('click', checkCardNumber);
	//BUY BOOK
	buyBtns.forEach((btn) => {
		btn.addEventListener('click', buyBook);
	}); 
});


