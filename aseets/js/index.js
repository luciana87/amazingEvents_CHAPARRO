import { createCheckBoxes, applyFilters, drawCards, getData } from "./functions.js";

/* Obtengo los datos: */
let urlApi = './aseets/data/amazing.json'
let data = await getData(urlApi);

/* Obtengo el arreglo importado y verifico si está vacío: */
const events = (data != null)? data.events : [];

//Obtengo los contenedores
const containerCheck = document.getElementById('container-check');
const inputSearch = document.getElementById('input-search');
const containerCard = document.getElementById('container-card');

const template = document.getElementById('card-index').content;
// const templateCarousel = document.getElementById('carousel').content;
let detailUrl = './pages/details.html';



/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


drawCards(events, detailUrl, template, containerCard);
createCheckBoxes(events, containerCheck);


inputSearch.addEventListener('input', function() {
    applyFilters(events, inputSearch.value, containerCard, detailUrl)
})


containerCheck.addEventListener('change', function() {
    applyFilters(events, inputSearch.value, containerCard, detailUrl)
})
