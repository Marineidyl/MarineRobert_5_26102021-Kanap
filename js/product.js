// let productsData = [];

// // Api
// const fetchProducts = async () => {
//     await fetch("http://localhost:3000/api/products").then((res) =>  res.json())
//     .then((promise) => {
//         productsData = promise 
//         console.log(productsData);
//     })
// };
const results = document.getElementById('results');

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

    results.innerHTML = (
        products
            .map(product => (

                `
                    <article>
                        <img src="${product.imageUrl}" alt="" />
                        <h3 class="productName">${product.name}</h3>
                        <p class="productDescription">${product.description}</p>
                    </article>
                `
            )).join('')
        );
};

showProducts();