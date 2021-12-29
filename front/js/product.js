// S'execute au chargement de la page
window.addEventListener('load', function () {
    // Injecte les données de l'API furniture
    load_products();
});

const params = new URLSearchParams(window.location.search)
const id = params.get("id")

//charge les produits
function load_products() {
    let img = document.getElementsByClassName("item__img")[0];
    let title = document.getElementById("title");
    let price = document.getElementById("price");
    let description = document.getElementById("description");
    let option = document.getElementById("colors");

    fetch(`http://localhost:3000/api/products/${id}`)
        .then(Response => Response.json())
        .then(product => {
            img.innerHTML = articleImg(product);
            title.innerHTML = product.name;
            price.innerHTML = product.price;
            description.innerHTML = product.description;
            option.innerHTML = colorArray(product);

            //selection de l'id colors
            const idColors = document.querySelector("#colors");

            //Selection du bouton add to cart
            const btnSendCart = document.querySelector("#addToCart");

            //Envoyer le panier
            btnSendCart.addEventListener("click", (event) => {
                event.preventDefault();

                //Choix des couleurs (id + valeur)
                const choiceColor = idColors.value;
                
                //Récupération des valeurs du produits
                let optionProduct = {
                    name: product.name,
                    price: product.price,
                    imageUrl: product.imageUrl, 
                    description: product.description,
                    altTxt: product.altTxt,

                    quantity:{
                        [choiceColor]:  parseInt(quantity.value),
                    }
                }
                // Localstorage
                let panier = JSON.parse(localStorage.getItem("panierLocalStorage"));
                if (!panier){
                    localStorage.setItem("panierLocalStorage",JSON.stringify({}))
                    panier = {};
                }

                if (panier[product._id]) {
                    if(panier[product._id].quantity[choiceColor]) {
                        panier[product._id].quantity[choiceColor]  += parseInt(quantity.value);
                    }else{
                        panier[product._id].quantity[choiceColor] = parseInt(quantity.value);
                    }
                    localStorage.setItem("panierLocalStorage",JSON.stringify(panier));
                } else {
                    panier[product._id] = optionProduct;
                    localStorage.setItem("panierLocalStorage",JSON.stringify(panier));
                }
            })
        }
    )
}

function articleImg(article) {
    return `<img src="${article.imageUrl}" alt="${article.altTxt}"></img>`
}
function articleDescription(article) {
    return `${article.description}`
} 

// Retourne une fonction pour le choix des couleurs (jusqu'à 3 couleurs)
function colorArray(article) {
    let result;
    for (let color of article.colors) {
        result += `<option value="${color}">${color}</option>`
    }
    return result;
}
