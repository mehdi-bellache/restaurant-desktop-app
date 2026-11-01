import { menu } from "../data/menu.js";
import { formatCurrency } from "./utils/money.js";
document.querySelectorAll(".js-category-btn").forEach((button) => {
    button.addEventListener("click", function () {
        renderMenu(getMenuItemsByType("pizzas"));
        const buttonMenu = document.querySelectorAll(".js-category-btn");
        buttonMenu.forEach((element) => {
            element.classList.remove("actif");
        });
        button.classList.add("actif");
    });
});
function getMenuItemsByType(type) {
    return menu.filter(menuItem => menuItem.type === type);
}
function generateProductHTML(product) {
    return `
    <div class="box">
      <img src="${product.image}" alt="${product.name}">
      <h5>${product.name}</h5>
      <span>${formatCurrency(product.priceCents)} €</span>
    </div>
  `;
}
function generateMenuHTML(menu) {
    let productsHTML = '';
    menu.forEach(product => {
        productsHTML += generateProductHTML(product);
    });
    return productsHTML;
}
function renderMenu(menu) {
    const container = document.querySelector('.boxes');
    if (container) {
        container.innerHTML = generateMenuHTML(menu);
    }
}
renderMenu(menu);
//# sourceMappingURL=index.js.map