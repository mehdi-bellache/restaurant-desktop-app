import { menu } from "../data/menu.js";
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
function getMenuItemsByType(type) {
    const newMenu = menu.filter(menuItem => menuItem.type === type);
    return newMenu.length === 0 ? menu : newMenu;
}
function generateProductHTML(product) {
    return `
    <div class="box">
      <img src="${product.image}" alt="${product.name}">
      <p>${product.name}</p>
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