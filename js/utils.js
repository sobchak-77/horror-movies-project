import { getModalWindow } from './modalWindow.js';
import {
  getBox,
  getDescr,
  getImg,
  getListItem
} from './elements.js';

// -------------------------------
// --- LOCAL STORAGE FUNCTIONS ---
// -------------------------------

export function saveListToLocalStorage(keyName, keyValue) {
  return localStorage.setItem(keyName, JSON.stringify(keyValue));
}

export function getFromLocalStorage(keyName) {
  return localStorage.getItem(keyName);
}

// ----------------------------
// --- FILM PRICE FUNCTIONS ---
// ----------------------------

function getRandomPrice(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getFilmPrice() {
  return { price: getRandomPrice(450, 150) };
}

// -------------------------
// --- LOADER AND NOTICE ---
// -------------------------

export function getLoader() {
  const loaderWrap = getBox('loader');
  const loaderImg = getImg(
    'loader__img',
    'img/bats.png',
    'So scarry loader image'
  );

  loaderWrap.append(loaderImg);
  document.getElementById('page-container').append(loaderWrap);

  return loaderWrap;
}

export function getNoticeTxt() {
  const txtBlock = getBox('notice-txt');
  const txt = getDescr('notice-txt__txt', 'Кажется, зомби съели все наши фальмы...');

  txtBlock.append(txt);
  document.querySelector('.products__container').append(txtBlock);
}

// ------------------------------
// --- MODAL WINDOW FUNCTIONS ---
// ------------------------------

export function openModalWindow(film) {
  document.getElementById('page').classList.add('stop-scroll');
  const modal = document.getElementById('modal-info');
  modal.classList.remove('hidden');
  
  getModalWindow(film, modal);
}

export function closeModalWindow(el, modal) {
  document.getElementById('page').classList.remove('stop-scroll');
  modal.classList.add('hidden');
  el.remove();
}

export function returnFromInfoCard(modalCard, modal) {
  window.addEventListener('click', (ev) => {
    if (ev.target === modal) closeModalWindow(modalCard, modal);
  });
  window.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') closeModalWindow(modalCard, modal);
  });
}

// -------------------------------
// --- SHOPPING CART FUNCTIONS ---
// -------------------------------

export function getShopCartFilms() {
  let filmArr = [];
  const data = getFromLocalStorage('shopping-cart__list');

  if (data !== '' && data !== null) {
    filmArr = JSON.parse(data);
  }

  return filmArr;
}

export function closeShopCart(shopCartBox) {
  const headerBtn = document.getElementById('header-btn');
  headerBtn.classList.add('header__btn--closed');
  headerBtn.classList.remove('header__btn--opened');
  shopCartBox.classList.add('hidden');
  document.getElementById('page').classList.remove('stop-scroll');
}

export function showEmptyCart(shopCartList) {
  const noItem = getListItem('shopping-cart__no-item');
  noItem.textContent = 'Корзина пуста';
  shopCartList.append(noItem);

  return noItem;
}

export function runHeaderBtn(shopCartBox) {
  const headerBtn = document.getElementById('header-btn');
  headerBtn.addEventListener('click', () => {
    if (shopCartBox.classList.contains('hidden')) {
      headerBtn.classList.remove('header__btn--closed');
      headerBtn.classList.add('header__btn--opened');
      shopCartBox.classList.remove('hidden');
      document.getElementById('page').classList.add('stop-scroll');
    }
  });
}

export function returnFromShopCart(shopCartBox) {
  window.addEventListener('click', (ev) => {
    if (ev.target === shopCartBox) {
      closeShopCart(shopCartBox);
    }
  });

  window.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') {
      if (!shopCartBox.classList.contains('hidden')) {
        closeShopCart(shopCartBox);
      }
    }
  });
}