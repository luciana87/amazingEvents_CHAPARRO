import data from './amazing.js';


/* Obtengo fecha */
const fecha = data.currentDate;

/* Recupero el arreglo importado: */
const events = data.events;

/* Genero arreglo nuevo con eventos filtrados por fecha: */

const pastEvents = events.filter(function (event){
    return event.date > fecha;
});
console.log(pastEvents);



const containerCard = document.getElementById('container-card');
const template = document.getElementById('card-index').content;
const fragment = document.createDocumentFragment();

pastEvents.forEach(event => {
    template.querySelector('.card-img-top').src = event.image;
    template.querySelector('.card-title').textContent = event.name;
    template.querySelector('.card-text').textContent = event.description;
    template.querySelector('.price').textContent = '$ ' + event.price;
    template.querySelector('.card-link').href = './details.html?id=' + event._id;

    const clone = template.cloneNode(true);
    fragment.appendChild(clone);
})

containerCard.appendChild(fragment);