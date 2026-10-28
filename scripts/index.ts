import {menu, MenuItem} from "./menu.js" ; 
import { formatCurrency } from "./utils/money.js";


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

function buildProductMenuHTML(product : MenuItem){
  return `
    <div class="box">
      <img src=${product.image}>
      <h5>${product.name}</h5>
      <span>${formatCurrency(product.priceCents)}€</span>
    </div>
  `;
  
}

function buildAllProductsMenuHTML(){
  
}