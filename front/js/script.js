const section = document.getElementById('items');

let items;

// API REQUEST
const fetchProducts = async() => {
    items = await fetch(
        'http://localhost:3000/api/products').then(res => 
        res.json());
// catch
        console.log(items);
};

// Affiche les items
const showItems = async () => {
    await fetchProducts();

    section.innerHTML = (
        items
            .map(item => (
                `
                    <a href="./product.html?id=${item._id}">
                        <article>
                            <img src="${item.imageUrl}" alt="" />
                            <h3 class="productName">${item.name}</h3>
                            <p class="productDescription">${item.description}</p>
                        </article>
                    </a>
                `
            )).join('')
        );
};

showItems();
