import {menu, type MenuItem} from "./menu.js" ; 
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


function generateProductHTML(product: MenuItem): string {
  return `
    <div class="box">
      <img src="${product.image}" alt="${product.name}">
      <h5>${product.name}</h5>
      <span>${formatCurrency(product.priceCents)} €</span>
    </div>
  `;
}

function generateMenuHTML(): string {
  let productsHTML: string = '';
  
  menu.forEach(product => {
    productsHTML += generateProductHTML(product);
  });
  
  return productsHTML;
}

function renderMenu(): void {
  const container = document.querySelector('.boxes') as HTMLElement;
  if (container) {
    container.innerHTML = generateMenuHTML();
  }
}

renderMenu();