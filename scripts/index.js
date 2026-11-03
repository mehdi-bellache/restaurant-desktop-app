import { menu } from "../data/menu.js";
import { formatCurrency } from "./utils/money.js";
import { orders } from "../data/orders.js";
document.querySelectorAll(".js-category-btn").forEach((button) => {
    button.addEventListener("click", function () {
        renderMenu(getMenuItemsByType(button.textContent.toLowerCase()));
        addMenuItemToOrder();
        const buttonMenu = document.querySelectorAll(".js-category-btn");
        buttonMenu.forEach((element) => {
            element.classList.remove("actif");
        });
        button.classList.add("actif");
    });
});
function addMenuItemToOrder() {
    document.querySelectorAll('.menu-item-add').forEach(menuItem => {
        menuItem.addEventListener('click', function () {
            const id = menuItem.dataset.id;
            if (!id)
                return;
            const existingOrder = orders.find(order => order.id === id);
            if (existingOrder) {
                existingOrder.quantity++;
                renderOrders(orders);
            }
            else {
                const existingMenuItem = menu.find(menuItem => menuItem.id === id);
                if (existingMenuItem) {
                    orders.push({
                        id: existingMenuItem.id,
                        name: existingMenuItem.name,
                        priceCents: existingMenuItem.priceCents,
                        quantity: 1
                    });
                    renderOrders(orders);
                    console.log('second test !');
                }
            }
        });
    });
}
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
        <i class="menu-item-add fa-solid fa-plus" data-id="${menuItem.id}"></i>
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
function generateOrderHTML(order) {
    return `
    <div class="order-item">
      <div class="order-item-quantity">
          <button class="order-item-btn order-item-minus">-</button>
          <span class="order-item-count">${order.quantity}x</span>
          <button class="order-item-btn order-item-plus">+</button>
      </div>
      <span class="order-item-name">${order.name}</span>
      <span class="order-item-price">${formatCurrency(order.priceCents)} $</span>
    </div>
  `;
}
function generateOrdersHTML(orders) {
    let ordersHTML = '';
    orders.forEach(order => {
        ordersHTML += generateOrderHTML(order);
    });
    return ordersHTML;
}
function renderOrders(orders) {
    const container = document.querySelector('.order-items');
    if (container) {
        container.innerHTML = generateOrdersHTML(orders);
    }
}
renderMenu(menu);
renderOrders(orders);
addMenuItemToOrder();
//# sourceMappingURL=index.js.map