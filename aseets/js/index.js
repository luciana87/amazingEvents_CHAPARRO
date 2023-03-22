import { createCheckBoxes, applyFilters, drawCards, getData } from "./functions.js";

/* Obtengo fecha */
let urlApi = '../aseets/data/amazing.json'
let data = await getData(urlApi);
const fecha = data.currentDate;

/* Recupero el arreglo importado: */
const events = data.events;

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
