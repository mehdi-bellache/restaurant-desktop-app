import { formatCurrency } from "../utils/money.js";
import {type OrderItem} from "../../data/order.js";
import { getMenuItemById } from "../../data/menu.js";


function generateOrderItemHTML(orderItem : OrderItem){
  const menuItem = getMenuItemById(orderItem.id);
  if(!menuItem) return ``;
  return `
    <div class="order-item">
      <div class="order-item-quantity">
          <button class="order-item-btn order-item-minus js-order-item-minus" data-id = "${orderItem.id}">-</button>
          <span class="order-item-count">${orderItem.quantity}x</span>
          <button class="order-item-btn order-item-plus js-order-item-plus" data-id = "${orderItem.id}">+</button>
      </div>
      <span class="order-item-name">${menuItem.name}</span>
      <span class="order-item-price">${formatCurrency(menuItem.priceCents)}</span>
    </div>
  `;
}

function generateOrderHTML(order : OrderItem[]) : string{
  let orderHTML: string = '';
  
  order.forEach(orderItem => {
    orderHTML += generateOrderItemHTML(orderItem);
  });
  
  return orderHTML;
}


export function renderOrder(order : OrderItem[]) : void{
  const container = document.querySelector<HTMLElement>('.js-order-items');
  if (container) {
    container.innerHTML = generateOrderHTML(order);
  } 
}
