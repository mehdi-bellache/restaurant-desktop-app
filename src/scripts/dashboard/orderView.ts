import { formatCurrency } from "../utils/money.js";
import {orders, type OrderItem} from "../../data/orders.js";


function generateOrderHTML(order : OrderItem){
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

function generateOrdersHTML(orders : OrderItem[]) : string{
  let ordersHTML: string = '';
  
  orders.forEach(order => {
    ordersHTML += generateOrderHTML(order);
  });
  
  return ordersHTML;
}


export function renderOrders(orders : OrderItem[]) : void{
  const container = document.querySelector<HTMLElement>('.js-order-items');
  if (container) {
    container.innerHTML = generateOrdersHTML(orders);
  } 
}
