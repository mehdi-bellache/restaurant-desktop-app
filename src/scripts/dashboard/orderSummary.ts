import { formatCurrency } from "../utils/money.js";
import {order, type OrderItem} from "../../data/order.js";
import { config } from "../../data/config.js";
import { getMenuItemById } from "../../data/menu.js";


function calculateSubtotalCents(orders : OrderItem[]){
  if(order.length === 0) return 0;
  let sum : number = 0 ;
  order.forEach(orderItem =>{
    let menuItem = getMenuItemById(orderItem.id);
    if(menuItem){
      sum += menuItem.priceCents * orderItem.quantity;
    }
 
  });
    
  return sum ;
}

function calculateTaxCents(order : OrderItem[]){
  return calculateSubtotalCents(order) * config.taxRate;
}

function calculateTotalWithTaxCents(order : OrderItem[]){
  return calculateSubtotalCents(order) + calculateTaxCents(order) ;
}

export function renderOrderSummary(){
  let container = document.querySelector<HTMLElement>('.js-order-ht-price');
  if(container){
    container.innerHTML = `${formatCurrency(calculateSubtotalCents(order))}`;
  }
  container = document.querySelector<HTMLElement>('.js-order-vat-name');

  if(container){
    container.innerHTML =  `VAT (${config.taxRate * 100}%) :` ;
  }

   container = document.querySelector<HTMLElement>('.js-order-vat-price');
  if(container){
    container.innerHTML = `${formatCurrency(calculateTaxCents(order))}`;
  }

  container = document.querySelector<HTMLElement>('.js-order-total-price');
  if(container){
    container.innerHTML = `${formatCurrency(calculateTotalWithTaxCents(order))}`;
  }

}
