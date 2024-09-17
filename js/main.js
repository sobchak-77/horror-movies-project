const API_KEY = '4cbe9351-c987-4d00-8c3b-9e4ca7a89477';
const API_URL = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=ZOMBIE_THEME&page=1';
const PAGE = document.getElementById('page');

// -------------------------
// --- SERVICE FUNCTIONS ---
// -------------------------

// --- to close shopping cart window ---
function closeShoppingCart() {
  showCartBtn.classList.add('header__btn--closed');
  showCartBtn.classList.remove('header__btn--opened');
  shoppingCartBox.classList.add('hidden');
  PAGE.classList.remove('stop-scroll');
};

// --- get a div element ---
function getBox(className) {
  const div = document.createElement('div');
  div.classList.add(className);

  return div;
};

// --- get a list element ---
function getList(className) {
  const list = document.createElement('ul');
  list.classList.add(className);

  return list;
};

// --- get a list item element ---
function getListItem(className) {
  const li = document.createElement('li');
  li.classList.add(className);

  return li;
};

// --- get a title element ---
function getTitle(className, txt, titleLevel) {
  const title = document.createElement(titleLevel);
  title.classList.add(className);
  title.textContent = txt;

  return title;
};

// --- get a button element ---
function getBtn(className, txt) {
  const btn = document.createElement('button');
  btn.classList.add(className);
  btn.textContent = txt;

  return btn;
};

// --- get an image element ---
function getImg(className, posterUrl, imgAlt) {
  const img = document.createElement('img');
  img.classList.add(className);
  img.src = posterUrl;
  img.alt = imgAlt;

  return img;
};

// --- get a paragraph element ---
function getDescr(className, txt) {
  const descr = document.createElement('p');
  descr.classList.add(className);
  descr.textContent = txt;

  return descr;
};

// --- get a span element ---
function getSpan(className, txt) {
  const span = document.createElement('span');
  span.classList.add(className);
  span.textContent = txt;

  return span;
};

// ---------------------------------------
// --- SHOPPING CART AND HEADER BUTTON ---
// ---------------------------------------

// --- cart list array ---
let shoppingCartArr = [];

// --- take data from localStorage ---
let data = localStorage.getItem('shopping-cart__list');

// --- put data to cart list array ---
if (data !== '' && data !== null) {
  shoppingCartArr = JSON.parse(data);
};

// --- shopping cart box ---
const shoppingCartBox = getBox('shopping-cart');
shoppingCartBox.classList.add('modal-window');
shoppingCartBox.classList.add('hidden');

const shoppingCartInner = getBox('shopping-cart__inner');
shoppingCartInner.setAttribute('aria-labelledby', 'label');

// --- inner shopping cart list ---
const shoppingCartList = getList('shopping-cart__list');

// --- inner shopping cart button ---
const orderBtn = getBtn('shopping-cart__btn', '');
orderBtn.addEventListener('click', () => {
  alert('Не сегодня, соррян =(');
});

// --- get inner shopping cart item ---
function getShoppingCartItem(index, film) {
  const item = getListItem('shopping-cart__item');

  let itemImg = getImg('shopping-cart__img',
    film.posterUrlPreview,
    `${film.nameRu}.`);
  itemImg.classList.add('img-style');
  let itemTitle = getTitle('shopping-cart__title', film.nameRu, 'h3');

  // wrapper for button and price
  let btnWrap = getBox('shopping-cart__btn-wrap');
  // item price
  let itemPrice = getSpan('shopping-cart__price', `${film.price} руб.`);
  // remove item button
  let removeBtn = getBtn('shopping-cart__remove-btn', 'Удалить');
  
  removeBtn.addEventListener('click', () => {
    // remove film from cart list
    shoppingCartArr.splice(index, 1);
    // re-record localStorage without removed film
    saveList('shopping-cart__list', shoppingCartArr)
    // re-render cart list
    renderShoppingCartList(shoppingCartArr);
  });

  btnWrap.append(removeBtn, itemPrice);
  item.append(itemImg, itemTitle, btnWrap);

  return item;
};

// --- change the button icon ---
const showCartBtn = document.getElementById('header-btn')
showCartBtn.addEventListener('click', () => {
  if (shoppingCartBox.classList.contains('hidden') === true) {
    showCartBtn.classList.remove('header__btn--closed');
    showCartBtn.classList.add('header__btn--opened');
    shoppingCartBox.classList.remove('hidden');
    PAGE.classList.add('stop-scroll');
  } else {
    closeShoppingCart();
  };
});

// --- close shopping cart ---
window.addEventListener('click', (ev) => {
  if (ev.target === shoppingCartBox) {
    closeShoppingCart();
  };
});

// --- close shopping cart with 'escape' ---
window.addEventListener('keydown', (ev) => {
  if (ev.key === 'Escape') {
    if (shoppingCartBox.classList.contains('hidden') === false) {
      closeShoppingCart();
    };
  };
});

// --- item of empty in the cart ---
function showEmptyCart() {
  let noItem = getListItem('shopping-cart__no-item');
  noItem.textContent = 'Корзина пуста';
  shoppingCartList.append(noItem);
  
  return noItem;
};

// -------------------------------
// --- REQUEST AND RENDER CARD ---
// -------------------------------

// --- save / re-record films at localStorage ---
function saveList(keyName, keyValue) {
  return localStorage.setItem(keyName, JSON.stringify(keyValue));
};

// --- get film price ---
function getRandomPrice(max, min) {
  return newNumber = Math.floor(Math.random() * (max - min + 1)) + min;
};

// --- request to the server ---
async function getFilms(url) {
  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
    },
  });
    
  // data to json format
  const respData = await resp.json();
  // call the function to render cards
  getFilmCard(respData, shoppingCartArr);
};

getFilms(API_URL);

// --- render card ---
function getFilmCard(data, catalog) {
  // get block for films
  const filmBlock = document.querySelector('.catalog');
  // clean the list
  filmBlock.innerHTML = '';

  data.items.forEach((film) => {
    let filmCard = getListItem('catalog__item');

    // film poster box
    let filmPosterWrap = getBox('catalog__cover-wrap');
    let filmPoster = getImg('catalog__cover',
      film.posterUrlPreview,
      `${film.nameRu}.`);
    let filmPosterDarky = getBox('catalog__cover--darkened');

    // film text content box
    let filmInfo = getBox('catalog__info');
    let filmTitle = getTitle('catalog__title', film.nameRu, 'h3');
    let filmYear = getSpan('catalog__descr', film.year);
    let filmCountry = getSpan('catalog__descr',
      `${film.countries.map(country => ` ${country.country}`)}`);

    // create film price
    let randomPrice = getRandomPrice(450, 150);
    let price = { price: randomPrice };
    let filmPrice = getSpan('catalog__price', `${randomPrice} рублей`);
      
    // add to cart button
    let filmBtn = getBtn('catalog__btn', '+ В корзину');
    filmBtn.addEventListener('click', () => {
      catalog.push(Object.assign(film, price));

      // save the film at localStorage
      saveList('shopping-cart__list', shoppingCartArr);
      
      // re-render cart list
      renderShoppingCartList(shoppingCartArr);
    });
    
    // more info button
    let filmInfoBtn = getBtn('catalog__btn-info', '?');
    filmInfoBtn.addEventListener('mouseenter', () => {
      filmPosterDarky.classList.add('catalog__cover--hover');
    });
    filmInfoBtn.addEventListener('mouseout', () => {
      filmPosterDarky.classList.remove('catalog__cover--hover');
    });
    filmInfoBtn.addEventListener('click', () => openModal(film));
    
    filmInfo.append(filmTitle, filmYear, filmCountry, filmPrice, filmBtn, filmInfoBtn);
    filmPosterWrap.append(filmPoster, filmPosterDarky);
    filmCard.append(filmPosterWrap, filmInfo);
    filmBlock.append(filmCard);
  });
};

// -----------------------
// --- RENDER ELEMENTS ---
// -----------------------

// --- render cart list --- 
function renderShoppingCartList(cartArr) {
  // clean the list
  shoppingCartList.innerHTML = '';

  let totalPrice = 0;

  // cart items checking
  if (cartArr.length === 0) {
    showEmptyCart();
  };

  // create price and render cart item
  for (let i = 0; i < cartArr.length; i++) {
    totalPrice += cartArr[i].price;
    let cartItem = getShoppingCartItem(i, cartArr[i]);
    shoppingCartList.append(cartItem);
  };
  
  // order button text
  orderBtn.textContent = `Купить на ${totalPrice} рублей`;
};

// --- render cart list ---
renderShoppingCartList(shoppingCartArr);

shoppingCartInner.append(shoppingCartList, orderBtn);
shoppingCartBox.append(shoppingCartInner);
document.body.append(shoppingCartBox);

// -------------------------------------
// --- FILM DESCRIPTION MODAL WINDOW ---
// -------------------------------------

// --- to close modal window ---
function closeModal(el) {
  el.classList.add('hidden');
  PAGE.classList.remove('stop-scroll');
};

// --- clsoe modal window ---
window.addEventListener('click', (ev) => {
  if (ev.target === modal) {
    closeModal(modal);
  };
});

// --- close modal window with 'escape' ---
window.addEventListener('keydown', (ev) => {
  if (ev.key === 'Escape') {
    closeModal(modal);
  };
});

// --- get opening modal window ---
function openModal(film) {
  modal.classList.remove('hidden');
  PAGE.classList.add('stop-scroll');

  // create modal card with info from film card
  modalImg.src = film.posterUrlPreview;
  modalImg.setAttribute('alt', `${film.nameRu}.`);
  modalTitle.innerHTML = film.nameRu;
  modalDescr.innerHTML = film.description;
};

// --- create DOM elements for the modal ---
const modal = document.getElementById('modal');
modal.classList.add('modal-window');
modal.classList.add('hidden');
let modalCard = getBox('modal__card');
let modalImg = getImg('modal__img', '', '');
modalImg.classList.add('img-style');
let modalTitle = getTitle('modal__title', '', 'h3');
let modalDescr = getDescr('modal__descr', '');
let modalBtn = getBtn('modal__btn', 'Закрыть');
modalBtn.addEventListener('click', () => closeModal(modal));

modalCard.append(modalImg, modalTitle, modalDescr, modalBtn);
modal.append(modalCard);
