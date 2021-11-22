// Récupération de l'url courante
const params = new URLSearchParams(window.location.search)
const id = params.get("id")

// Variables des éléments Html (éléments à remplir dynamiquement)
let img = document.getElementsByClassName('item__img');
let title = document.getElementById('title');
let price = document.getElementById("price");
let description = document.getElementById('description');
// let color = document.getElementsById('colors');

fetch(`http://localhost:3000/api/products/${id}`)
        .then(Response => Response.json())
        .then(item => { 
            img.innerHTML = item.imageUrl;
            console.log(item);
            title.innerHTML = item.name;
            price.innerHTML = item.price;
            description.innerHTML = item.description;
            // option.innerHTML = colorArray(item);
        });
 

// console.log(showItems);

// showItems();
