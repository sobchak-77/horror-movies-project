export function getBox(className) {
  const div = document.createElement('div');
  div.classList.add(className);

  return div;
}

export function getList(className) {
  const list = document.createElement('ul');
  list.classList.add(className);

  return list;
}

export function getListItem(className) {
  const li = document.createElement('li');
  li.classList.add(className);

  return li;
}

export function getTitle(className, txt, titleLevel) {
  const title = document.createElement(titleLevel);
  title.classList.add(className);
  title.textContent = txt;

  return title;
}

export function getDescr(className, txt) {
  const descr = document.createElement('p');
  descr.classList.add(className);
  descr.textContent = txt;

  return descr;
}

export function getSpan(className, txt) {
  const span = document.createElement('span');
  span.classList.add(className);
  span.textContent = txt;

  return span;
}

export function getBtn(className, txt) {
  const btn = document.createElement('button');
  btn.classList.add(className);
  btn.textContent = txt;

  return btn;
}

export function getImg(className, posterUrl, imgAlt) {
  const img = document.createElement('img');
  img.classList.add(className);
  img.classList.add('img-style');
  img.src = posterUrl;
  img.alt = imgAlt;
  img.loading = 'lazy';

  return img;
}