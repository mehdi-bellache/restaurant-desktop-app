import {menu, type MenuItem} from "../data/menu.js" ; 
import { formatCurrency } from "./utils/money.js";
import {orders, type OrderItem} from "../data/orders.js";


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

function generateMenuItemHTML(menuItem: MenuItem): string {
  return `
    <div class="menu-item">
      <img class="menu-item-image" src="${menuItem.image}" alt="${menuItem.name}">
      <p class="menu-item-name">${menuItem.name}</p>
      <div class="menu-item-footer">
        <span class="menu-item-price">${formatCurrency(menuItem.priceCents)} €</span>
        <i class="menu-item-add fa-solid fa-plus data-id="${menuItem.id}"></i>
      </div>
    </div>
  `;
}

function generateMenuHTML(menu : MenuItem[]): string {
  let productsHTML: string = '';
  
  menu.forEach(product => {
    productsHTML += generateMenuItemHTML(product);
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


document.querySelectorAll<HTMLElement>('.menu-item-add').forEach(menuItem =>{
  menuItem.addEventListener('click', function(){
    const id = menuItem.dataset.id ;
    if(!id) return ;
    const existingOrder = orders.find(order => order.id === id);
    if(existingOrder){
      existingOrder.quantity++
    }
    else{
      const existingMenuItem = menu.find(menuItem => menuItem.id === id);
      if(existingMenuItem){
        orders.push({
          id : existingMenuItem.id,
          name : existingMenuItem.name,
          priceCents : existingMenuItem.priceCents,
          quantity : 1
        });
      }

    }
  })
})



function generateOrderHTML(order : OrderItem){
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

function generateOrdersHTML(orders : OrderItem[]) : string{
  let ordersHTML: string = '';
  
  orders.forEach(order => {
    ordersHTML += generateOrderHTML(order);
  });
  
  return ordersHTML;
}


function renderOrders(orders : OrderItem[]) : void{
  const container = document.querySelector<HTMLElement>('.order-items');
  if (container) {
    container.innerHTML = generateOrdersHTML(orders);
  } 
}


renderOrders(orders);