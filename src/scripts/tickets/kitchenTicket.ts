
import {orders, type OrderItem } from "../../data/orders.js";
import { getMenuItemById } from "../../data/menu.js";

function getTicketTime(){
    const date = new Date();
    return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'long',
        timeStyle: 'short',
    }).format(date);

}

function generateKitchenTicketTimeHTML() : string{
    return `
        <span class="kitchen-ticket-time js-kitchen-ticket-time">${getTicketTime()}</span>
    `;
}

function generateKitchenTicketItemHTML(kitchenTicketItem : OrderItem) : string{
    const menuItem = getMenuItemById(kitchenTicketItem.id);
    if(menuItem){
        return `
            <div class="kitchen-ticket-item">
                <span class="kitchen-ticket-item-quantity">${kitchenTicketItem.quantity}x</span>
                <span class="kitchen-ticket-item-name">${menuItem.name.toUpperCase()}</span>
            </div>
        `;
    }
    return ``;
}


function generateKitchenTicketItemsHTML(kitchenTicketItems : OrderItem[]) : string{
    let result = `` ;
    kitchenTicketItems.forEach(kitchenTicketItem => result += generateKitchenTicketItemHTML(kitchenTicketItem));
    return result ;
}


function renderKitchenTicket(){

    const kitchenTicketMeta = document.querySelector('.js-kitchen-ticket-meta'); 
    const kitchenTicketItems = document.querySelector('.kitchen-ticket-items');
    if(kitchenTicketMeta){
        kitchenTicketMeta.innerHTML = `
            ${generateKitchenTicketTimeHTML()}
            <span class="kitchen-ticket-waiter">WAITER : Alex Solen</span>
        `;
    }
    if(kitchenTicketItems){
        kitchenTicketItems.innerHTML = generateKitchenTicketItemsHTML(orders);
    }
}


renderKitchenTicket();