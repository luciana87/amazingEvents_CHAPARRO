function createDetail(event, detailContainer){

    let div = document.createElement('div');
    div.classList = 'd-flex flex-column mt-2 align-items-start';
    div.innerHTML = `
    <div>
        <img src="${event.image}" alt="${event.image}" class="w-100">
    </div>
    <div class="d-flex flex-column mt-3 w-100">
        <h3>${event.name}</h3>
        <ul class="mt-2 fs-4 mt-3 list-group">
            <li class="list-group-item">${event.description}</li>
            <li class="list-group-item">Date: ${event.date}</li>
            <li class="list-group-item">Category: ${event.category}</li>
            <li class="list-group-item">Place: ${event.place}</li>
            <li class="list-group-item">Capacity: ${event.capacity}</li>
            <li class="list-group-item">Assistance: ${(event.assistance)?event.assistance: '-'}</li>
            <li class="list-group-item">Price: $${event.price}</li>
        </ul>
    </div>
    `
    detailContainer.appendChild(div);
}


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


function filterByName(array,texto){
    let arrayFiltrado = array.filter(elemento => elemento.name.toLowerCase().includes(texto.toLowerCase()))
    return arrayFiltrado
}

function filterByCategory(array){
    let checkboxes = document.querySelectorAll("input[type='checkbox']")
    console.log(checkboxes);
    let arrayChecks = Array.from(checkboxes)
    let arrayChecksChecked = arrayChecks.filter(check => check.checked)
    console.log(arrayChecksChecked);
    let arrayChecksCheckedValues = arrayChecksChecked.map(checkChecked => checkChecked.value)
    console.log(arrayChecksCheckedValues);
    let arrayFiltrado = array.filter(elemento => arrayChecksCheckedValues.includes(elemento.category))
    console.log(arrayFiltrado);
    if(arrayChecksChecked.length > 0){
        return arrayFiltrado
    }
    return array
}



function applyFilters(array, text, container, detailUrl) {
    let resultFilterByName = filterByName(array, text)
    let resultFilterByCategory = filterByCategory(resultFilterByName)
    drawEvents(resultFilterByCategory, container, detailUrl)
}


function drawEvents(array, container, detailUrl) {
    container.innerHTML = '';
    if(array.length == 0){
        container.innerHTML = `<h4 class="display-5 fw-bolder">No hay coincidencias</h4>`
        return
    }
    const template = document.getElementById('card-index').content;
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


export {createDetail, createCheckBoxes, applyFilters};