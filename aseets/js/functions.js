// function drawCards(array, detailUrl){

//     //const template = document.getElementById('card-index').content;

//     futureEvents.forEach(event => {
//         template.querySelector('.card-img-top').src = event.image;
//         template.querySelector('.card-title').textContent = event.name;
//         template.querySelector('.card-text').textContent = event.description;
//         template.querySelector('.price').textContent = '$ ' + event.price;
//         template.querySelector('.card-link').href = './details.html?id=' + event._id;

//         const clone = template.cloneNode(true);
//         fragment.appendChild(clone);
//     })

//     containerCard.appendChild(fragment);
// }
//
//FALTA TERMINAR



function createDetail(event, detailContainer){

    let div = document.createElement('div');
    div.innerHTML = `
        <div class='widget d-flex flex-column justify-content-between flex-grow-1 rounded shadow-lg card-img-top bg-dark text-white'>
            <div class="bg-light w-100 d-flex flex-column">
                <img class="img-fluid h-100" alt="${event.image}" src="${event.image}">
            </div>
            <div class="container w-100 ms-3 bg-transparent d-flex flex-column">
                <h3 class="display-6 mt-3 bg-transparent">${event.name}</h3>
                <div class="bg-transparent mb-3">
                    <ul class="list-group bg-transparent">
                        <li class="list-group mt-6 me-2 fs-5 fw-lighter fs-4 bg-transparent">${event.date}</li>
                        <li class="list-group mt-2 me-2 mb-4 lh-sm fw-lighter fs-4 bg-transparent">${event.category}</li>
                        <li class="text-justify list-group fw-light fs-4 mt-3 me-2 lh-sm bg-transparent">${event.description}</li>
                        <li class="list-group mt-2 me-2 lh-sm fw-light fs-4 bg-transparent">This event takes place in ${event.place}. It has capacity for ${event.capacity} people.</li>
                        <li class="list-group mt-2 me-2 lh-sm fw-light fs-4 bg-transparent">Estimated assistance: ${(event.assistance)?event.assistance: '-'}</li>
                        <li class="list-group mt-2 me-2 lh-sm fw-light fs-4 bg-transparent">The current price for this event is : $${event.price}</li>
                    </ul>
                </div>
            </div>
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





function drawFilteredEvents(array, container, detailUrl) {
    container.innerHTML = '';
    if(array.length == 0){
        container.innerHTML = `<h4 class="display-5 fw-bolder">No such event found</h4>`
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


function applyFilters(array, text, container, detailUrl) {
    let resultFilterByName = filterByName(array, text)
    let resultFilterByCategory = filterByCategory(resultFilterByName)
    drawFilteredEvents(resultFilterByCategory, container, detailUrl)
}



export {createDetail, createCheckBoxes, applyFilters};