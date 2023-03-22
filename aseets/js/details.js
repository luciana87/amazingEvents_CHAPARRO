import {createDetail, getData} from "./functions.js";

let urlApi = '../aseets/data/amazing.json'
let data = await getData(urlApi);

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


createDetail(event, containerDetail);