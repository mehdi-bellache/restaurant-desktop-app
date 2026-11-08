import { menu } from "../../data/menu.js";
import { formatCurrency } from "../utils/money.js";
function generateMenuItemHTML(menuItem) {
    return `
    <div class="menu-item">
      <img class="menu-item-image" src="${menuItem.image}" alt="${menuItem.name}">
      <p class="menu-item-name">${menuItem.name}</p>
      <div class="menu-item-footer">
        <span class="menu-item-price">${formatCurrency(menuItem.priceCents)} €</span>
        <i class="menu-item-add js-menu-item-add fa-solid fa-plus" data-id="${menuItem.id}"></i>
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
//# sourceMappingURL=menuView.js.map