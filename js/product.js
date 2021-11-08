// let productsData = [];

// // Api
// const fetchProducts = async () => {
//     await fetch("http://localhost:3000/api/products").then((res) =>  res.json())
//     .then((promise) => {
//         productsData = promise 
//         console.log(productsData);
//     })
// };
const resultsProducts = document.getElementById('resultsProducts');

let products;

// API REQUEST
const fetchProducts = async() => {
    products = await fetch(
        'http://localhost:3000/api/products').then(res => 
        res.json());

        console.log(products);
};

// Afficher les produits
const showProducts = async () => {
    await fetchProducts();

    resultsProducts.innerHTML = (
        products
            .map(product => (

                `
                <article id="resultsProducts${product._id}">
                    <div class="item__img">
                        <img src="${product.imageUrl}" alt="" />
                    </div>
                    <div class="item__content">
                    <div class="item__content__titlePrice">
                    <h1 id="title">${product.name}</h1>
                    <p>Prix : <span id="price">${product.price}</span>€</p>
                    </div>
    
                    <div class="item__content__description">
                    <p class="item__content__description__title">Description :</p>
                    <p id="description">${product.description}</p>
                    </div>
                </article>
                `
            )).join('')
        );
};

showProducts();
