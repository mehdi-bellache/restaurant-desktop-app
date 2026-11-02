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
function generateMenuItemHTML(menuItem) {
    return `
    <div class="menu-item">
      <img class="menu-item-image" src="${menuItem.image}" alt="${menuItem.name}">
      <p class="menu-item-name">${menuItem.name}</p>
      <div class="menu-item-footer">
        <span class="menu-item-price">${formatCurrency(menuItem.priceCents)} €</span>
        <i class="menu-item-add fa-solid fa-plus"></i>
      </div>
    </div>
  `;
}
function generateMenuHTML(menu) {
    let productsHTML = '';
    menu.forEach(product => {
        productsHTML += generateMenuItemHTML(product);
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