import { createCheckBoxes, applyFilters, drawCards, getData } from "./functions.js";

//Obtengo los datos:
let urlApi = '../aseets/data/amazing.json'
let data = await getData(urlApi);
let pastEvents = [];

if (data != null) {
    const fecha = data.currentDate; //Obtengo fecha
    const events = data.events; //Obtengo eventos
    pastEvents = events.filter(function (event){
        return event.date < fecha; //Filtra los futureEvents
    });
}

//Obtengo los contenedores:
const containerCheck = document.getElementById('container-check');
const inputSearch = document.getElementById('input-search');
const containerCard = document.getElementById('container-card');

const template = document.getElementById('card-index').content;
let detailUrl = './details.html';



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

