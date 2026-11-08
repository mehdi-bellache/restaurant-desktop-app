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
    document.querySelectorAll('.js-menu-item-add').forEach(menuItem => {
        menuItem.addEventListener('click', function () {
            const id = menuItem.dataset.id;
            if (!id)
                return;
            const existingOrder = orders.find(order => order.id === id);
            if (existingOrder) {
                existingOrder.quantity++;
                renderOrders(orders);
                renderOrderSummary();
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
                    renderOrderSummary();
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
function generateOrderHTML(order) {
    return `
    <div class="order-item">
      <div class="order-item-quantity">
          <button class="order-item-btn order-item-minus js-order-item-minus" data-id = "${order.id}">-</button>
          <span class="order-item-count">${order.quantity}x</span>
          <button class="order-item-btn order-item-plus js-order-item-plus" data-id = "${order.id}">+</button>
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
    const container = document.querySelector('.js-order-items');
    if (container) {
        container.innerHTML = generateOrdersHTML(orders);
    }
}
function calculateSubtotalCents(orders) {
    if (orders.length === 0)
        return 0;
    let sum = 0;
    orders.forEach(order => sum += order.priceCents * order.quantity);
    return sum;
}
/** (5.5 /100) represents the taxes : (5.5%) */
function calculateTaxCents(orders) {
    return calculateSubtotalCents(orders) * (5.5 / 100);
}
function calculateTotalWithTaxCents(orders) {
    return calculateSubtotalCents(orders) + calculateTaxCents(orders);
}
function renderOrderSummary() {
    let container = document.querySelector('.js-order-ht-price');
    if (container) {
        container.innerHTML = `${formatCurrency(calculateSubtotalCents(orders))} $`;
    }
    container = document.querySelector('.js-order-vat-price');
    if (container) {
        container.innerHTML = `${formatCurrency(calculateTaxCents(orders))} $`;
    }
    container = document.querySelector('.js-order-total-price');
    if (container) {
        container.innerHTML = `${formatCurrency(calculateTotalWithTaxCents(orders))} $`;
    }
}
renderMenu(menu);
renderOrders(orders);
addMenuItemToOrder();
renderOrderSummary();
const orderItemsContainer = document.querySelector('.order-items');
orderItemsContainer?.addEventListener('click', (event) => {
    const button = event.target.closest('.js-order-item-minus');
    const id = button?.dataset.id;
    if (!id)
        return;
    const order = orders.find(item => item.id === id);
    if (!order)
        return;
    order.quantity--;
    renderOrders(orders);
    renderOrderSummary();
});
orderItemsContainer?.addEventListener('click', (event) => {
    const button = event.target.closest('.js-order-item-plus');
    const id = button?.dataset.id;
    if (!id)
        return;
    const order = orders.find(item => item.id === id);
    if (!order)
        return;
    order.quantity++;
    renderOrders(orders);
    renderOrderSummary();
});
//# sourceMappingURL=index.js.map