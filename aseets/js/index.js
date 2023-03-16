import data from "./amazing.js";
import { createCheckBoxes, applyFilters } from "./functions.js";

/* Obtengo fecha */
const fecha = data.currentDate;

/* Recupero el arreglo importado: */
const events = data.events;

//Obtengo los contenedores
const containerCheck = document.getElementById('container-check');
const inputSearch = document.getElementById('input-search');
const containerCard = document.getElementById('container-card');


const template = document.getElementById('card-index').content;
const fragment = document.createDocumentFragment();



/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


//Cards dinámicas (falta modular y pasar a functions, generalizar)
events.forEach(event => {
    template.querySelector('.card-img-top').src = event.image;
    template.querySelector('.card-title').textContent = event.name;
    template.querySelector('.card-text').textContent = event.description;
    template.querySelector('.price').textContent = '$ ' + event.price;
    template.querySelector('.card-link').href = './pages/details.html?id=' + event._id;

    const clone = template.cloneNode(true);
    fragment.appendChild(clone);
})

containerCard.appendChild(fragment);




/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


createCheckBoxes(events, containerCheck);
let detailUrl = './pages/details.html';


inputSearch.addEventListener('input', function() {
    applyFilters(events, inputSearch.value, containerCard, detailUrl)
})
containerCheck.addEventListener('change', function() {
    applyFilters(events, inputSearch.value, containerCard, detailUrl)
})
