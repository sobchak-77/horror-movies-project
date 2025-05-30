import {
  getBox,
  getImg,
  getTitle,
  getDescr,
  getBtn
} from './elements.js';
import { closeModalWindow, returnFromInfoCard } from './utils.js';

function getModalWindowContent(film, modal) {
  const modalCard = getBox('modal-info__card');

  //* modal window image / film poster
  const modalImg = getImg(
    'modal-info__img',
    film.posterUrlPreview,
    film.nameRu
  );

  //* modal window text and button
  const modalTitle = getTitle('modal-info__title', film.nameRu, 'h3');
  const modalDescr = getDescr('modal-info__descr', film.description);
  const modalBtn = getBtn('modal-info__btn', 'Закрыть');
  modalBtn.addEventListener('click', () => {
    closeModalWindow(modalCard, modal);
  });

  modalCard.append(modalImg, modalTitle, modalDescr, modalBtn);

  return modalCard;
}

export function getModalWindow(film, modal) {
  const modalWindowWrap = getBox('modal-info__wrap');
  const modalWindowContent = getModalWindowContent(film, modal);
  
  //* close modal window
  returnFromInfoCard(modalWindowWrap, modal)

  modalWindowWrap.append(modalWindowContent);
  modal.append(modalWindowWrap);

  return modalWindowWrap;
}