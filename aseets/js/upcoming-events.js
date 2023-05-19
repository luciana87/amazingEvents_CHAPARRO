import { createCheckBoxes, applyFilters, drawCards, getData } from "./functions.js";

// Obtengo los datos:
let urlApi = '../aseets/data/amazing.json'
let data = await getData(urlApi);
let futureEvents = [];

if (data != null) {
    const fecha = data.currentDate; //Obtengo fecha
    const events = data.events; //Obtengo eventos
    futureEvents = events.filter(function (event){
        return event.date > fecha; //Filtra los futureEvents
    });
}


// Obtengo los contenedores:
const containerCheck = document.getElementById('container-check');
const inputSearch = document.getElementById('input-search');
const containerCard = document.getElementById('container-card');

const template = document.getElementById('card-index').content;
let detailUrl = './details.html';



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
