import { formatCurrency } from "../utils/money.js";
import {orders, type OrderItem} from "../../data/orders.js";
import { config } from "../../data/config.js";
import { getMenuItemById } from "../../data/menu.js";


function calculateSubtotalCents(orders : OrderItem[]){
  if(orders.length === 0) return 0;
  let sum : number = 0 ;
  orders.forEach(order =>{
    let menuItem = getMenuItemById(order.id);
    if(menuItem){
      sum += menuItem.priceCents * order.quantity;
    }
 
  });
    
  return sum ;
}

function calculateTaxCents(orders : OrderItem[]){
  return calculateSubtotalCents(orders) * config.taxRate;
}

function calculateTotalWithTaxCents(orders : OrderItem[]){
  return calculateSubtotalCents(orders) + calculateTaxCents(orders) ;
}

export function renderOrderSummary(){
  let container = document.querySelector<HTMLElement>('.js-order-ht-price');
  if(container){
    container.innerHTML = `${formatCurrency(calculateSubtotalCents(orders))}`;
  }
  container = document.querySelector<HTMLElement>('.js-order-vat-name');

  if(container){
    container.innerHTML =  `VAT (${config.taxRate * 100}%) :` ;
  }

   container = document.querySelector<HTMLElement>('.js-order-vat-price');
  if(container){
    container.innerHTML = `${formatCurrency(calculateTaxCents(orders))}`;
  }

  container = document.querySelector<HTMLElement>('.js-order-total-price');
  if(container){
    container.innerHTML = `${formatCurrency(calculateTotalWithTaxCents(orders))}`;
  }

}
