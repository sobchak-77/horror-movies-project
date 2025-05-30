import { renderFilmCard } from './filmCard.js';
import { getLoader, getNoticeTxt } from './utils.js';

export async function getData(url, key, shopCartArr) {
  //* show the scary bats as loader image
  const loader = getLoader();

  try {
    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': key,
      },
    });

    if (resp.ok) {
      const respData = await resp.json();
  
      //* get status 200 and remove loader image
      setTimeout(() => {
        loader.remove();
        renderFilmCard(respData, shopCartArr);
      }, 2000);
    } else {
      throw new Error(`resp status: ${resp.status}`);
    }
  } catch (err) {
    //* if we have some problems with server,
    //* we get error message in console about that..
    //* so remove loader image and
    //* show 'sorry for this troubles' text to users
    console.error(err.message);
    loader.remove();
    getNoticeTxt();
  }
}