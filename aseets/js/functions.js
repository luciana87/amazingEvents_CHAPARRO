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



export {createDetail};