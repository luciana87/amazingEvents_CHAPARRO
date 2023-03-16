import data from './amazing.js';
import { createCheckBoxes, applyFilters } from "./functions.js";


/* Obtengo fecha */
const fecha = data.currentDate;

/* Recupero el arreglo importado: */
const events = data.events;

//obtengo los contenedores
const containerCheck = document.getElementById('container-check');
const inputSearch = document.getElementById('input-search');
const containerCard = document.getElementById('container-card');


const template = document.getElementById('card-index').content;
const fragment = document.createDocumentFragment();
let detailUrl = './details.html';


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


// Genero arreglo nuevo con eventos filtrados por fecha
const futureEvents = events.filter(function (event){
    return event.date > fecha;
});
console.log(futureEvents);


//Cards dinámicas (falta modular y pasar a functions.js, generalizar)
futureEvents.forEach(event => {
    template.querySelector('.card-img-top').src = event.image;
    template.querySelector('.card-title').textContent = event.name;
    template.querySelector('.card-text').textContent = event.description;
    template.querySelector('.price').textContent = '$ ' + event.price;
    template.querySelector('.card-link').href = './details.html?id=' + event._id;

    const clone = template.cloneNode(true);
    fragment.appendChild(clone);
})

containerCard.appendChild(fragment);


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


createCheckBoxes(futureEvents, containerCheck);


inputSearch.addEventListener('input', function() {
    applyFilters(futureEvents, inputSearch.value, containerCard, detailUrl)
})

containerCheck.addEventListener('change', function() {
    applyFilters(futureEvents, inputSearch.value, containerCard, detailUrl)
})
