const section = document.getElementById('items');
let items;

// API REQUEST
const fetchProducts = async() => {
    items = await fetch(
        'http://localhost:3000/api/products').then(res => 
        res.json());
}  
try {
    fetchProducts();
  } catch (error) {
      alert('Error');
    console.error(error);
  }

// catch
    // .catch((err) => alert("Erreur", err));    
    //     console.log(fetchProducts);


// Affiche les elements > items
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

console.log(showItems);

showItems();

