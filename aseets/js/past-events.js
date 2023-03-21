import data from "./amazing.js";
import { createCheckBoxes, applyFilters, drawCards } from "./functions.js";


/* Obtengo fecha */
const fecha = data.currentDate;

/* Recupero el arreglo importado */
const events = data.events;

//obtengo los contenedores
const containerCheck = document.getElementById('container-check');
const inputSearch = document.getElementById('input-search');
const containerCard = document.getElementById('container-card');


const template = document.getElementById('card-index').content;
let detailUrl = './details.html';


// Genero arreglo nuevo con eventos filtrados por fecha:
const pastEvents = events.filter(function (event){
    return event.date < fecha;
});



/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

   
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    
    
drawCards(pastEvents, detailUrl, template, containerCard);
createCheckBoxes(pastEvents, containerCheck);
    
    
inputSearch.addEventListener('input', function() {
    applyFilters(pastEvents, inputSearch.value, containerCard, detailUrl)
})
    

containerCheck.addEventListener('change', function() {
    applyFilters(pastEvents, inputSearch.value, containerCard, detailUrl)
})

