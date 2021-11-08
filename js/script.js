const resultsItems = document.getElementById('resultsItems');

let items;

// API REQUEST
const fetchProducts = async() => {
    items = await fetch(
        'http://localhost:3000/api/products').then(res => 
        res.json());

        console.log(items);
};

// Affiche
const showItems = async () => {
    await fetchProducts();

    resultsItems.innerHTML = (
        items
            .map(item => (

                `
                    <article>
                        <img src="${item.imageUrl}" alt="" />
                        <h3 class="productName">${item.name}</h3>
                        <p class="productDescription">${item.description}</p>
                    </article>
                `
            )).join('')
        );
};

showItems();
