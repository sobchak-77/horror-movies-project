import { getData } from './requestToServer.js';
import { getShopCart, renderShopCartList } from './shopCart.js';
import { getShopCartFilms } from './utils.js';

const API_KEY = '4cbe9351-c987-4d00-8c3b-9e4ca7a89477';
const API_URL = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=ZOMBIE_THEME&page=1';

const shopCartArr = getShopCartFilms();
getData(API_URL, API_KEY, shopCartArr);
getShopCart();
renderShopCartList(shopCartArr);