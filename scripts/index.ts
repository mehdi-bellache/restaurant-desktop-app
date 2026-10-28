import {menu, MenuItem} from "./menu.js" ; 


document.querySelectorAll(".js-category-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const buttonMenu = document.querySelectorAll(".js-category-btn");
    buttonMenu.forEach((element) => {
      element.classList.remove("actif");
    });

    button.classList.add("actif");
  });
});

// on doit generer un seul produit du menu (une fonction)
// une autre fonction qui genere le html de tout les autres menu.

function buildProductMenu(product : MenuItem){
  const html = `<div class="box">
            <img src=${product.image} alt="Chicken Burger">
            <h5>${product.name}</h5>
            <span>${product.priceCents}€</span>
        </div>`
  
}