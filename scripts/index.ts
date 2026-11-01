import {menu, type MenuItem} from "../data/menu.js" ; 
import { formatCurrency } from "./utils/money.js";


document.querySelectorAll(".js-category-btn").forEach((button) => {
  button.addEventListener("click", function () {
    renderMenu(getMenuItemsByType(button.textContent.toLowerCase()));
    const buttonMenu = document.querySelectorAll(".js-category-btn");
    buttonMenu.forEach((element) => {
      element.classList.remove("actif");
    });

    button.classList.add("actif");
  });
});

function getMenuItemsByType(type : string){
  const newMenu : MenuItem[] = menu.filter(menuItem => menuItem.type === type);
  return newMenu.length === 0 ? menu : newMenu ;

}

function generateProductHTML(product: MenuItem): string {
  return `
    <div class="box">
      <img src="${product.image}" alt="${product.name}">
      <h5>${product.name}</h5>
      <span>${formatCurrency(product.priceCents)} €</span>
    </div>
  `;
}

function generateMenuHTML(menu : MenuItem[]): string {
  let productsHTML: string = '';
  
  menu.forEach(product => {
    productsHTML += generateProductHTML(product);
  });
  
  return productsHTML;
}

function renderMenu(menu : MenuItem[]): void {
  const container = document.querySelector('.boxes') as HTMLElement;
  if (container) {
    container.innerHTML = generateMenuHTML(menu);
  }
}

renderMenu(menu);