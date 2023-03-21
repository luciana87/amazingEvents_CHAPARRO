import data from './amazing.js';
import { createCheckBoxes, applyFilters, drawCards } from "./functions.js";


/* Obtengo fecha */
const fecha = data.currentDate;

/* Recupero el arreglo importado: */
const events = data.events;

//obtengo los contenedores
const containerCheck = document.getElementById('container-check');
const inputSearch = document.getElementById('input-search');
const containerCard = document.getElementById('container-card');


const template = document.getElementById('card-index').content;
let detailUrl = './details.html';

// Genero arreglo nuevo con eventos filtrados por fecha
const futureEvents = events.filter(function (event){
    return event.date > fecha;
});
console.log(futureEvents);



/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    
    
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    
    
drawCards(futureEvents, detailUrl, template, containerCard);
createCheckBoxes(futureEvents, containerCheck);


inputSearch.addEventListener('input', function() {
    applyFilters(futureEvents, inputSearch.value, containerCard, detailUrl)
})

containerCheck.addEventListener('change', function() {
    applyFilters(futureEvents, inputSearch.value, containerCard, detailUrl)
})
