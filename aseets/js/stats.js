import { getData, calculateAttendancePercentage, calculateRevenue } from "./functions.js";

// Dibuja el contenido de la tabla 1:
function drawEventsTable(events) {
    let tbody = document.getElementById('tbody_stats_events');
    let arrayCapacity = events.map(event => event.capacity); // Array con capacidades
    
    let maxCapacity = Math.max(...arrayCapacity); // Obtengo evento con capacidad máxima
    let eventMaxCapacity = events.find(event => event.capacity === maxCapacity); // Obtengo el nombre del evento con la capacidad máx

    let recordPercentage = {
        max: -1,
        maxName: '',
        min: 99999,
        minName: ''
    }
    
    // Obtengo el evento con el mayor y el evento con el menor porcentaje de asistencia
    events.forEach(event => {
        let attendance = (event.assistance) ? event.assistance : event.estimate;
        let percentage = ((attendance/event.capacity) * 100);
        if (percentage > recordPercentage.max) {
            recordPercentage.max = percentage;
            recordPercentage.maxName = event.name; // Obtengo el nombre del evento con mayor porcentaje de asistencia
        }
        if (percentage < recordPercentage.min) {
            recordPercentage.min = percentage;
            recordPercentage.minName = event.name;name; // Obtengo el nombre del evento con menor porcentaje de asistencia
        }

    })

    let values = [recordPercentage.maxName, recordPercentage.minName, eventMaxCapacity.name]; // Arreglo con los valores de la tabla 1
    let row =  document.createElement('tr');
    let columns = '';
    values.forEach(value => {
        columns += `<td>${value}</td>`
    });
    row.innerHTML = columns;
    tbody.appendChild(row) 
}


// Dibuja el contenido de la tabla de eventos futuros y pasados:
function drawStatsEventsTable(events, elementId) {
    let tbody = document.getElementById(elementId);
    let arrayCategory = events.map(event => event.category);
    let setCategory = new Set(arrayCategory);
    let arrayCategories = Array.from(setCategory);
    arrayCategories.forEach((categoryName) => {
        let row =  document.createElement('tr');
        let eventByCategory = events.filter(event => event.category === categoryName);
        let columns = '';
        columns += `<td>${categoryName}</td>`;
        columns += `<td>$${calculateRevenue(eventByCategory)}</td>`;
        columns += `<td>${calculateAttendancePercentage(eventByCategory)}%</td>`;
        row.innerHTML = columns;
        tbody.appendChild(row);
    })
}

// Obtengo los datos:
let urlApi = '../aseets/data/amazing.json'
let data = await getData(urlApi);
let futureEvents = [];

if (data != null) {
    const fecha = data.currentDate; //Obtengo fecha
    const events = data.events; //Obtengo eventos
    drawEventsTable(events);
    let futureEvents = events.filter(function (event){
        return event.date > fecha; //Filtra los futureEvents
    });

    drawStatsEventsTable(futureEvents, 'tbody_stats_upcoming_events')

    let pastEvents = events.filter(function (event){
        return event.date <= fecha; //Filtra los pastEvents
    });

    console.log(pastEvents)
    drawStatsEventsTable(pastEvents, 'tbody_stats_past_events');
}