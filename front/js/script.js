// S'execute au chargement de la page
window.addEventListener('load', function () {
    // Injecte les données de l'api
    loadItems();
});

//charge l'api dans la section items
function loadItems() {
    let div = document.getElementById("items");

    fetch("http://localhost:3000/api/products")
        .then(Response => Response.json())
        .then(Items => {
            for (let element of Items) {
                let content = elements_div(element)
                div.innerHTML += content;
            }
        });

}  

//Récupere les données écrit en html
function elements_div(element) {
    return `<a href="./product.html?id=${element._id}">
                <article>
                    <img src="${element.imageUrl}" alt="${element.altTxt}, ${element.name}"></img>
                        <h3 class="productName">${element.name}</h3>
                        <p class="productDescription">${element.description}</p>
                </article>
            </a>`;
}