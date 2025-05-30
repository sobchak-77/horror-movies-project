import {
  getListItem,
  getBox,
  getImg,
  getTitle,
  getSpan,
  getBtn
} from './elements.js';
import { renderShopCartList } from './shopCart.js';
import {
  getFilmPrice,
  saveListToLocalStorage,
  getNoticeTxt,
  openModalWindow
} from './utils.js';

// --- card buttons ---

function getAddFilmBtn(shopCartArr, film, price) {
  const addFilmBtn = getBtn('film-card__btn', '+ В корзину');
  addFilmBtn.addEventListener('click', () => {
    shopCartArr.push(Object.assign(film, price));
    saveListToLocalStorage('shopping-cart__list', shopCartArr);
    renderShopCartList(shopCartArr);
  });

  return addFilmBtn;
}

function getFilmInfoBtn(film, filmPosterDarky) {
  const filmInfoBtn = getBtn('film-card__btn-info', '?');
  filmInfoBtn.addEventListener('mouseenter', () => {
    filmPosterDarky.classList.add('film-card__cover--hover');
  });
  filmInfoBtn.addEventListener('mouseout', () => {
    filmPosterDarky.classList.remove('film-card__cover--hover');
  });
  filmInfoBtn.addEventListener('click', () => openModalWindow(film));

  return filmInfoBtn;
}

// --- film poster / card image ---

function getFilmPoster(film) {
  const filmPosterWrap = getBox('film-card__cover-wrap');
  filmPosterWrap.addEventListener('click', () => {
    if (window.innerWidth <= 560) {
      openModalWindow(film);
    }
  });
  const filmPoster = getImg('film-card__cover',
    film.posterUrlPreview,
    `${film.nameRu}.`);
  
  filmPosterWrap.append(filmPoster);

  return filmPosterWrap;
}

// --- card text content ---

function getFilmTxtContent(film, filmPrice) {
  const filmTxtContent = getBox('film-card__info');
  const filmTitle = getTitle('film-card__title', film.nameRu, 'h3');
  const filmYear = getSpan('film-card__descr', film.year);
  const filmCountry = getSpan('film-card__descr',
    `${film.countries.map(country => ` ${country.country}`)}`);

  filmTxtContent.append(
    filmTitle,
    filmYear,
    filmCountry,
    filmPrice
  );

  return filmTxtContent;
}

// --- put all card elements together ---

function getFilmCard(film, shopCartArr, filmCatalog) {
  const filmListItem = getListItem('catalog__item');
  const filmCard = getBox('catalog__card');
  filmCard.classList.add('film-card');
  
  //* film poster / card image
  const filmPoster = getFilmPoster(film);
  const filmPosterDarky = getBox('film-card__dark-cover');
  filmPoster.append(filmPosterDarky);
  
  //* get price
  const price = getFilmPrice();
  const filmPrice = getSpan('film-card__price', `${price.price} рублей`);

  //* card buttons and text content
  const filmCardBottomSection = getBox('film-card__bottom');
  const filmCardTxtSection = getFilmTxtContent(film, filmPrice);
  const addFilmBtn = getAddFilmBtn(shopCartArr, film, price);
  const filmInfoBtn = getFilmInfoBtn(film, filmPosterDarky);
  
  filmCardBottomSection.append(
    filmCardTxtSection,
    addFilmBtn,
    filmInfoBtn
  );
  filmCard.append(filmPoster, filmCardBottomSection);
  filmListItem.append(filmCard);
  filmCatalog.append(filmListItem);

  return filmListItem;
}

export function renderFilmCard(data, shopCartArr) {
  const filmCatalog = document.getElementById('catalog');
  filmCatalog.innerHTML = '';

  if (data.items.length) {
    data.items.forEach(film => {
      getFilmCard(film, shopCartArr, filmCatalog);
    });
  } else {
    getNoticeTxt();
  }
}