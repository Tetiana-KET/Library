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
	const registerForm = document.querySelector('.register-form');
	const loginForm = document.querySelector('.login-form');
	const buttonCheckCard = document.querySelector('.button_check-card');
	const profile = document.querySelector('.modal-profile');
	const buttonCloseProfile = document.querySelector('.close-btn_profile');
	const buyBtns = document.querySelectorAll('.book__button');
	const copyBtn = document.querySelector('.user-card__copy-btn');
	const modalBuyCard = document.querySelector('.modal__buy-card');
	const buyCardForm = document.querySelector('.buy-card__form');
	const buyCardFormBtn = document.querySelector('.buy-form__btn');
	const booksCollection = document.querySelectorAll('.book');
	const ownBooksCount = document.querySelectorAll('.own-books__count');
	const bookTitles = document.querySelectorAll('.book__title');
	const bookAuthors = document.querySelectorAll('.book_author');
	const profileBooksList = document.querySelector('.profile__books-list');

	let boughtBooksList = JSON.parse(localStorage.getItem('boughtBooksList')) || [];
	let btnsArray = JSON.parse(localStorage.getItem('btnsToDisable')) || [];

	let isAuthorized = JSON.parse(localStorage.getItem('isAuthorized'));
	let hasLibraryCard = JSON.parse(localStorage.getItem('hasLibraryCard'));

	checkAuthorization();
	setBoughtBookAfterReload();

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
			closeProfile();
			closeBuyLibraryCardModal();
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
		localStorage.setItem('hasLibraryCard', false);

		closeRegisterModal();
		location.reload();
	}
	function checkAuthorization () {
		if (isAuthorized) {
			body.classList.add('authorized-user');
			setUserInitials();
			changeCardsSectionAndProfileContent();
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
		const profileAvatar = document.querySelector('.sidebar__avatar p');
		profileAvatar.textContent = `${initials}`;
	}
	function changeCardsSectionAndProfileContent () {
		const cardTitle = document.querySelector('.card-find__title');
		const visitProfile= document.querySelector('.card-get__title');
		const description = document.querySelector('.card-get__text');
		const readerCardName = document.querySelector('.reader-card__name');
		const readerCardNumber = document.querySelector('.reader-card__number');
		const sidebarUserName = document.querySelector('.sidebar__user-name');
		const profileUserCard = document.querySelector('.user-card__number');

		const userName = `${localStorage.getItem('userFirstName')} ${localStorage.getItem('userLastName')}`;
		const userCard = localStorage.getItem('cardNumber');

		cardTitle.textContent = 'Your Library card';
		readerCardName.value = userName;
		sidebarUserName.textContent = userName;
		readerCardName.setAttribute('disabled', true);
		readerCardNumber.value = userCard;
		profileUserCard.textContent = userCard;
		readerCardNumber.setAttribute('disabled', true);
		visitProfile.textContent = 'Visit your profile';
		description.textContent = 'With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.';
		updateStatistic();
	}
	function updateStatistic () {
		const visitCounts = document.querySelectorAll('.visits__count');
		visitCounts.forEach((counter) => {
			counter.textContent = localStorage.getItem('visitCounter');
		});
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
	function openProfile () {
		profile.classList.add('modal-profile_open');
		overlay.classList.add('active-overlay');
		lockBodyScroll();
	}
	function closeProfile () {
		profile.classList.remove('modal-profile_open');
		overlay.classList.remove('active-overlay');
		unlockBodyScroll();
	}
	function copyToClipboard (e) {
		e.preventDefault();

		const input = document.createElement('input');
		const cardNum = document.querySelector('.user-card__number');
		input.value = cardNum.textContent;
		input.select();
		document.execCommand('copy');
		navigator.clipboard.writeText(input.value);	 
	}
	function openBuyLibraryCardModal () {
		overlay.classList.add('active-overlay');
		lockBodyScroll();
		modalBuyCard.classList.add('buy-card_open');
	}
	function closeBuyLibraryCardModal() {
		overlay.classList.remove('active-overlay');
		unlockBodyScroll();
		modalBuyCard.classList.remove('buy-card_open');
	}
	function buyLibraryCard (e) {
		e.preventDefault();

		localStorage.setItem('hasLibraryCard', true);
		closeBuyLibraryCardModal();
		location.reload();
	}
	function validateForm () {
		if (
			!buyCardForm.checkValidity() &&
			!buyCardFormBtn.classList.contains('disabled')
		) {
			buyCardFormBtn.classList.add('disabled');
		} else if (
			buyCardForm.checkValidity() &&
			buyCardFormBtn.classList.contains('disabled')
		) {
			buyCardFormBtn.classList.remove('disabled');
		}
	};
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
			(e.target.classList.contains('link-to-login') && e.target.textContent === 'My profile') || 
			 e.target.classList.contains('link-to-profile')
		  ) {
			closeDropMenu();
			openProfile();
		} else if (
			e.target.classList.contains('link-to-register') &&
			(e.target.textContent === 'Register' ||
				e.target.textContent === 'Sign Up')
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
	buttonCloseProfile.addEventListener('click', closeProfile);
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
	function setBoughtBookAfterReload () {
		if (isAuthorized) {
			if (localStorage.getItem('boughtBooksList')) {
				ownBooksCount.forEach(el => {
					el.textContent = boughtBooksList.length;
				});

				for (let i = 0; i <= boughtBooksList.length - 1; i++) {
					let li = document.createElement('li');
					li.classList.add('book-list__item');
					li.textContent = boughtBooksList[i];
					profileBooksList.appendChild(li);
				}

				for (let i = 0; i < booksCollection.length; i++) {
					if (btnsArray.includes(`btn${i}`)) {
						buyBtns[i].textContent = `Own`;
						buyBtns[i].classList.add('own-button');
						buyBtns[i].setAttribute('disabled', '');
					}
				}
			}
		}
	}
	buyBtns.forEach((btn, i) => {
	
		btn.addEventListener('click', (e) => {
			e.preventDefault();

			if (!isAuthorized) {
				openLoginModal();
			}
			if (isAuthorized && hasLibraryCard === false) {
				openBuyLibraryCardModal();
			}
			if (isAuthorized && hasLibraryCard) {

				let boughtBook = `${bookTitles[i].textContent}, ${bookAuthors[i].textContent}`;
				boughtBooksList.push(boughtBook);
				localStorage.setItem('boughtBooksList', JSON.stringify(boughtBooksList));

				let li = document.createElement('li');
				li.classList.add('book-list__item');
				li.textContent = boughtBook;
				profileBooksList.appendChild(li);

				btn.textContent = 'Own';
				btn.classList.add('own-button');
				btn.setAttribute('disabled', '');
				btnsArray.push(`btn${i}`);
				localStorage.setItem('btnsToDisable', JSON.stringify(btnsArray));

				ownBooksCount.forEach(el => {
					el.textContent = boughtBooksList.length;
				});
			};
		})	
	}); 
	//COPY CARD NUMBER
	copyBtn.addEventListener('click', copyToClipboard);
	//CLOSE BUY CARD MODAL
	document.querySelector('.buy-card__close-btn').addEventListener('click', closeBuyLibraryCardModal);
	//BUY LIBRARY CARD
	buyCardForm.addEventListener('input', validateForm);
	buyCardForm.addEventListener('submit', buyLibraryCard);
});