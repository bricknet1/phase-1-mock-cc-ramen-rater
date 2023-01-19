// write your code here

const ramenMenu = document.querySelector('#ramen-menu');

const ramenDetail = document.querySelector('#ramen-detail')

const detailImage = document.querySelector('.detail-image')

const dishNameField = document.querySelector('.name')

const restaurantNameField = document.querySelector('.restaurant')

const ratingDisplay = document.querySelector('#rating-display')

const commentDisplay = document.querySelector('#comment-display')

let currentRamen;
let currentRamenId;

function renderRamen (data){
    const image = document.createElement('img');
    // debugger;
    image.src = data.image;
    image.name = data.id;
    image.alt = data.name;
    ramenMenu.append(image)
    image.addEventListener("click", (e) => {
        // debugger;
        detailImage.setAttribute("src", e.target.src)
        detailImage.setAttribute("name",data.id)
        detailImage.setAttribute('alt',data.name)
        dishNameField.textContent = data.name;
        restaurantNameField.textContent = data.restaurant;
        ratingDisplay.textContent = data.rating;
        commentDisplay.textContent = data.comment;
        currentRamen = e.target;
        currentRamenId = currentRamen.name
    })
}

fetch("http://localhost:3000/ramens")
.then(response => response.json())
.then(data => {
    data.forEach(renderRamen);
    renderMain(data[0]);
})

///////////////////

const newRamen = document.querySelector('#new-ramen')

newRamen.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e.target);
    const formData = {
        "name": e.target.name.value,
        "restaurant": e.target.restaurant.value,
        "image": e.target.image.value,
        "rating": e.target.rating.value,
        "comment": e.target.comment.value
        // How could I have made this work 
    }
    // EXTRA ADVANCED DELIVERABLE //
    fetch("http://localhost:3000/ramens", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        const id = data.id;
        console.log(id);
        renderRamen({...formData, "id": id});
        renderMain({...formData, "id": id});
    })
})

// https://www.giantbomb.com/a/uploads/scale_medium/15/153607/2895175-mario%2013.png

//////////////ADVANCED//////////////

///////RENDER THE MAIN IMAGE RIGHT AWAY//////////
    
function renderMain(data){
    detailImage.src = data.image;
    detailImage.name = data.id;
    detailImage.alt = data.name;
    dishNameField.textContent = data.name;
    restaurantNameField.textContent = data.restaurant;
    ratingDisplay.textContent = data.rating;
    commentDisplay.textContent = data.comment;
    currentRamen = ramenMenu.children[0]
    currentRamenId = currentRamen.name
}

////////EDIT RATING AND COMMENT////////

const editRamen = document.querySelector('#edit-ramen')

editRamen.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e.target);
    const formData = {
        "rating": e.target.newrating.value,
        "comment": e.target.newcomment.value
    }
    // EXTRA ADVANCED DELIVERABLE //
    fetch("http://localhost:3000/ramens/"+currentRamenId, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(() => ramenUpdater(formData));
})

function ramenUpdater (data){
    ratingDisplay.textContent = data.rating;
    commentDisplay.textContent = data.comment;
}

////////DELETE/////////

const deleteButton = document.querySelector('btn')

deleteButton.addEventListener("click", ()=>{
    // EXTRA ADVANCED DELIVERABLE //
    fetch("http://localhost:3000/ramens/"+currentRamenId, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify()
    })
    .then(response => response.json())
    .then(() => {
    detailImage.setAttribute("src", "./assets/image-placeholder.jpg")
    dishNameField.textContent = "DELETED";
    restaurantNameField.textContent = "Please select another";
    ratingDisplay.textContent = "";
    commentDisplay.textContent = "This ramen has been deleted. Please select another from the menu above.";
    currentRamen.remove()
    });
});



//////////EXTRA ADVANCED DELIVERABLES///////////////

// for PATCH see editRamen.addEventListener

// for POST see newRamen.addEventListener

// for DELETE see deleteButton.addEventListener