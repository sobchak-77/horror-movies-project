import {
  getList,
  getListItem,
  getBox,
  getImg,
  getTitle,
  getSpan,
  getBtn
} from './elements.js';
import {
  saveListToLocalStorage,
  showEmptyCart,
  runHeaderBtn,
  returnFromShopCart
} from './utils.js';

// --- shopping cart item button ---

function getDeleteBtn(filmArr, index) {
  const btnWrap = getBox('film-card-shop__btn-wrap');
  const deleteBtn = getBtn('film-card-shop__remove-btn', 'Удалить');
  deleteBtn.addEventListener('click', () => {
    filmArr.splice(index, 1);
    saveListToLocalStorage('shopping-cart__list', filmArr);
    renderShopCartList(filmArr);
  });

  btnWrap.append(deleteBtn);
  
  return deleteBtn;
}

// --- shopping cart item ---

function getShopCartItem(index, film, filmArr) {
  const item = getListItem('shopping-cart__item');
  const filmCard = getBox('shopping-cart__item-wrap');
  filmCard.classList.add('film-card-shop');

  //* film poster / card image
  const filmCardImg = getImg('film-card-shop__img',
    film.posterUrlPreview,
    `${film.nameRu}.`);

  //* card button and text content
  const filmCardBottomSection = getBox('film-card-shop__bottom');

  const filmCardTitle = getTitle('film-card-shop__title', film.nameRu, 'h3');
  const filmCardPrice = getSpan('film-card-shop__price', `${film.price} руб.`);
  const filmCardDeleteBtn = getDeleteBtn(filmArr, film, index);
  
  filmCardBottomSection.append(
    filmCardTitle,
    filmCardPrice,
    filmCardDeleteBtn
  );
  filmCard.append(filmCardImg, filmCardBottomSection);
  item.append(filmCard);

  return item;
}

// --- put all shopping cart elements together ---

export function getShopCart() {
  //* shopping cart container
  const shopCartBox = getBox('shopping-cart');
  shopCartBox.classList.add('modal-window', 'hidden');
  const shopCartInner = getBox('shopping-cart__inner');
  shopCartInner.setAttribute('aria-labelledby', 'label');
  const shopCartList = getList('shopping-cart__list');

  //* shopping cart order button
  const orderBtn = getBtn('shopping-cart__btn', '');
  orderBtn.addEventListener('click', () => {
    alert('Не сегодня, соррян =(');
  });

  //* open shopping cart
  runHeaderBtn(shopCartBox);
  //* close shopping cart
  returnFromShopCart(shopCartBox);

  shopCartInner.append(shopCartList, orderBtn);
  shopCartBox.append(shopCartInner);
  document.body.append(shopCartBox);

  return shopCartBox;
}

export function renderShopCartList(filmArr) {
  const shopCartList = document.querySelector('.shopping-cart__list');
  shopCartList.innerHTML = '';

  let totalPrice = 0;

  //* if shooping cart isn't empty
  //* count the prices of all films and
  //* get shopping cart element for each film in it

  if (filmArr.length === 0) {
    showEmptyCart(shopCartList);
  } else {
    for (let i = 0; i < filmArr.length; i++) {
      totalPrice += filmArr[i].price;
      const cartItem = getShopCartItem(i, filmArr[i], filmArr);
      shopCartList.append(cartItem);
    }
  }

  //* changing price on order button
  document.querySelector('.shopping-cart__btn').textContent = `Купить на ${totalPrice} рублей`;
}