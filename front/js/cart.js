// S'execute au chargement de la page
window.addEventListener('load', function () {
    // Injecte les données de l'API product
    load_cartItems();
  });
  
  // charge les données de l'API 
  function load_cartItems() {
    let cart = JSON.parse(localStorage.getItem("panierLocalStorage"));
  
    // Creation du code html pour le PANIER
    let addProductInCard = document.getElementById("cart__items");
    let addCartProduct = document.getElementById("cartAndFormContainer");
    let totalQuantity = document.getElementById("totalQuantity");
    let totalPrice = document.getElementById("totalPrice");
  
    //Si le panier est vide alors il retourne le panier vide sinon il boucle pour récupéré les objets dans le LocalStorage
    if (!cart) {
      addCartProduct.innerHTML = cartEmptyFunction();
    } else {
      //Variable de la function pour le panier pleins
      let cartProductObject = showCart(cart);
      addProductInCard.innerHTML = cartProductObject;
      //total quantity dans le panier 
      let total = getTotal(cart);
      totalQuantity.innerHTML = total.quantity;
      totalPrice.innerHTML = total.total;
      //AddEvents ajouter et changer des quantités
      addEvents();
      deleteItem();
    }
    
    //Indique que le panier vide
    function cartEmptyFunction() {
      return `<h1> Votre panier est vide </h1>`
    }

    //fonction pour appeler les objet de mon localStorage
    function showCart(products) {
      let result = "";
      for (let object in products) {
        for (let color in products[object].quantity) {
          result += `
          <article class="cart__item" data-id="${object}" data-color="${color}">
              <div class="cart__item__img">
                <img src="${products[object].imageUrl}" alt="${products[object].altTxt}">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__titlePrice">
                  <h2>${products[object].name} <br>Color: ${color}</br></h2>
                  <p>${products[object].price}€</p>
                </div>
                <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                    <p>Qté :  </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${products[object].quantity[color]}">
                  </div>
                  <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                  </div>
                </div>
              </div>
          </article>`
        }
      }
      return result;
    }

    //fonction pour SUPPRIMER un item du panier. (localStorage + innerHTML)
    function deleteItem() {
      let buttons = document.querySelectorAll(".deleteItem");
      buttons.forEach(button => {
        button.addEventListener('click', () => {
          let id = button.parentElement.parentElement.parentElement.parentElement.dataset.id;
          let color = button.parentElement.parentElement.parentElement.parentElement.dataset.color;
          let cart = JSON.parse(localStorage.getItem("panierLocalStorage"));
          delete cart[id].quantity[color];
          localStorage.setItem("panierLocalStorage", JSON.stringify(cart));
          let total = getTotal(cart);
          totalQuantity.innerHTML = total.quantity;
          totalPrice.innerHTML = total.total;
          button.parentElement.parentElement.parentElement.parentElement.remove();
        })
      })
    }
    
    //fonction pour AJOUTER un produit via les inputs.
    function addEvents() {
      let inputs = document.querySelectorAll(".itemQuantity");
      inputs.forEach(input => {
        input.addEventListener('change', () => {
          let id = input.parentElement.parentElement.parentElement.parentElement.dataset.id;
          let color = input.parentElement.parentElement.parentElement.parentElement.dataset.color;
          let quantity = input.value;
          let cart = JSON.parse(localStorage.getItem("panierLocalStorage"));
          cart[id].quantity[color] = parseInt(quantity);
          localStorage.setItem("panierLocalStorage", JSON.stringify(cart));
          let total = getTotal(cart);
          totalQuantity.innerHTML = total.quantity;
          totalPrice.innerHTML = total.total;
        })
      })
    }

    // fonction qui additionne le total des produits du panier
    function getTotal(products) {
      let totalPrice = 0;
      let totalQuantity = 0;
      for (let object in products) {
        let quantity = 0;
        for (let color in products[object].quantity) {
          quantity += products[object].quantity[color];
          totalQuantity += products[object].quantity[color];
        }
        totalPrice += quantity * products[object].price;
      }
      return { quantity: totalQuantity, total: totalPrice };
    }
  }