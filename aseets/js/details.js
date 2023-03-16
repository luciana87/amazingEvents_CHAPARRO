import data from "./amazing.js";
import {createDetail} from "./functions.js";


//Obtengo los eventos
const events = data.events;

//Obtengo el contenedor
let containerDetail = document.getElementById('container-detail');

//Obtengo el parámetro
const queryString = location.search;
const params = new URLSearchParams(queryString);
const eventId = params.get('id');
console.log(eventId);

//Obtengo el evento
const event = events.find(event => event._id == eventId);
//console.log(event);


createDetail(event, containerDetail);