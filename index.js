"use strict"
const ownButton = document.querySelector('.own-button');

ownButton.textContent = 'Own';
ownButton.disabled = true; 

{
  const overlay = document.querySelector('.header__burger-overlay');
  const body = document.body;

  function toggleMenu (e) {
    const targetItem = e.target;

    if(targetItem.closest('.header__burger')) {
      openMenu();
    }
    if (targetItem.classList.contains('active-overlay') || targetItem.classList.contains('header-menu__link')) {
      closeMenu();
    };
  };
  function lockBodyScroll () {
    body.classList.add('no-scroll');
  }
  function unlockBodyScroll () {
    body.classList.remove('no-scroll');
  }
  function openMenu () {
    document.documentElement.classList.toggle('menu-open');
    overlay.classList.toggle('active-overlay');

    if (!(body.classList.contains('no-scroll'))) {
      lockBodyScroll();
    } else {
      unlockBodyScroll();
    } 
  }
  function closeMenu () {
    document.documentElement.classList.remove('menu-open');
    overlay.classList.remove('active-overlay');
    unlockBodyScroll();
  }

  document.addEventListener('click', toggleMenu);

}
