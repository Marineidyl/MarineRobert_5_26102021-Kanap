
let productsData = [];

const fetchProducts = async () => {
    await fetch("http://localhost:3000/api/products").then((res) =>  res.json())
    .then((promise) => console.log(promise))
};

fetchProducts();