
// Dibuja las cards dinamicamente:
function drawCards(array, detailUrl, template, container){

    const fragment = document.createDocumentFragment();
    array.forEach(event => {
        template.querySelector('.card-img-top').src = event.image;
        template.querySelector('.card-title').textContent = event.name;
        template.querySelector('.card-text').textContent = event.description;
        template.querySelector('.price').textContent = '$ ' + event.price;
        template.querySelector('.card-link').href = detailUrl + '?id=' + event._id;

        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    })

    container.appendChild(fragment);
}



// Crea los details de las cards:
function createDetail(event, detailContainer){

    let div = document.createElement('div');
    div.classList = 'image container-box';
    div.innerHTML = `
        <img src="${event.image}" class="img-fluid" alt="${event.image}">
    </div>
    <div class="div-card-body container-box">
        <h3 class="fs-1 mt-3 bg-transparent">${event.name}</h3>
        <ul class="list-group bg-transparent">
            <li class="list-group fw-lighter fs-5 bg-transparent">${event.date}</li>
            <li class="list-group mb-4 lh-sm fw-lighter fs-5 bg-transparent">${event.category}</li>
            <li class="text-justify list-group fw-light fs-4 mt-3 lh-sm bg-transparent">${event.description}</li>
            <li class="list-group mt-1 lh-sm fw-light fs-4 bg-transparent">This event takes place in ${event.place}. It has capacity for ${event.capacity} people.</li>
            <li class="list-group mt-1 lh-sm fw-light fs-4 bg-transparent">Assistance: ${(event.assistance)?event.assistance: '-'}</li>
            <li class="list-group mt-1 lh-sm fw-light fs-4 bg-transparent">The current price for this event is : $${event.price}</li>
        </ul>
    `
    detailContainer.appendChild(div);
}



// Crea checkboxes:
function createCheckBoxes(array, containerCheck){
    let arrayCategory = array.map(event => event.category);
    let setCategory = new Set(arrayCategory);
    let arrayChecks = Array.from(setCategory);
    let checkboxes = '';
    arrayChecks.forEach(category => {
    checkboxes += `<div class="form-check form-switch">
            <label class="form-check-label" for="${category}">${category}</label>
            <input type="checkbox" class="form-check-input" role="switch" id="${category}" value="${category}">
        </div>`
    })
    containerCheck.innerHTML = checkboxes;
}


// Filtra por nombre:
function filterByName(array,texto){
    let arrayFiltrado = array.filter(elemento => elemento.name.toLowerCase().includes(texto.toLowerCase()))
    return arrayFiltrado
}


// Filtra por categoría:
function filterByCategory(array){

    let checkboxes = document.querySelectorAll("input[type='checkbox']");
    let arrayChecks = Array.from(checkboxes);
    let arrayChecksChecked = arrayChecks.filter(check => check.checked);
    let arrayChecksCheckedValues = arrayChecksChecked.map(checkChecked => checkChecked.value);
    let arrayFiltrado = array.filter(elemento => arrayChecksCheckedValues.includes(elemento.category));
  
    if(arrayChecksChecked.length > 0){
        return arrayFiltrado
    }
    return array;
}


// Dibuja los events filtrados tanto por categoría como por los checkboxes:
function drawFilteredEvents(array, container, detailUrl) {
    container.innerHTML = '';
    if(array.length == 0){
        container.innerHTML = `<h4 class="display-5 fw-bolder">No such event found</h4>`
        return
    }
    const template = document.getElementById('card-index').content;
    drawCards(array, detailUrl,template,container);
}



// Aplica ambos filtros, el de los checkboxes y el de categorías:
function applyFilters(array, text, container, detailUrl) {
    let resultFilterByName = filterByName(array, text);
    let resultFilterByCategory = filterByCategory(resultFilterByName);
    drawFilteredEvents(resultFilterByCategory, container, detailUrl);
}


// Obtiene los datos asincronicamente:
async function getData(urlApi) {
    let data = null;
    try {
        data = await fetch(urlApi).then(response => response.json());
    } catch (error) {
        window.alert('An error occurred while retrieving data.');
    }
    return data;
}

export {createDetail, createCheckBoxes, applyFilters, drawCards, getData};