
let productsData = [];

const fetchProducts = async () => {
    await fetch("http://localhost:3000/api/products").then((res) => console.log(res.json()),
    );
};

fetchProducts();