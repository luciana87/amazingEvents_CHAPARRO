import data from "./amazing.js";

/* Obtengo fecha */
const fecha = data.currentDate;

/* Recupero el arreglo importado: */
const events = data.events;


const containerCard = document.getElementById('container-card');
const template = document.getElementById('card-index').content;
const fragment = document.createDocumentFragment();

events.forEach(event => {
    template.querySelector('.card-img-top').src = event.image;
    template.querySelector('.card-title').textContent = event.name;
    template.querySelector('.card-text').textContent = event.description;
    template.querySelector('.price').textContent = '$ ' + event.price;
    const clone = template.cloneNode(true);
    fragment.appendChild(clone);
})

containerCard.appendChild(fragment);













// const pastEvents = function (eventos){
//     let fechaActual = new Date();
//     let pastEvents = [];

//     eventos.forEach(evento => {
//         if(evento.date <= fechaActual){
//             pastEvents.push(evento);
//         }    
//     });
//     return pastEvents;
// }

// const upcomingEvents = function (eventos){
//     let fechaActual = new Date();
//     let upcomingEvents = [];

//     eventos.forEach(evento => {
//         if(evento.date >= fechaActual){
//             upcomingEvents.push(evento);
//         }    
//     });
//     return upcomingEvents;
// }


// //-----------------------------------------------------------------------

// let eventos = [
//     {
//         nombre: "Circus",
//         date: new Date(2001, 06,26)
//     },
//     {
//         nombre: "Festival",
//         date: new Date(2023,05,04)
//     },
//     {
//         nombre: "Orchestra",
//         date: new Date(2023,03,13)
//     },
//     {
//         nombre: "Food Fair",
//         date: new Date(2023,10,24)
//     },
//     {
//         nombre: "Concert",
//         date: new Date(2022,07,30)
//     },
//     {
//         nombre: "Concert",
//         date: new Date()
//     }
// ];


// /* Usando el método FILTER: El método Filter crea un nuevo arreglo, con
// aquellos elementos que cumplan condiciones específicas. */

// const pastEvents2 = eventos.filter(function (evento) { //Creo una variable que va a recibir el nuevo arreglo
//     let fechaActual = new Date();  
//     return evento.date < fechaActual;
// });

// console.log(pastEvents(eventos));
// console.log(upcomingEvents(eventos));
// console.log(pastEvents2);