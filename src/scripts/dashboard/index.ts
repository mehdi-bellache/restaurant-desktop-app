import {menu, type MenuItem, getMenuItemsByType} from "../../data/menu.js" ; 
import {order, type OrderItem} from "../../data/order.js";
import {renderMenu} from "./menuView.js" ;
import {renderOrder} from "./orderView.js" ;
import {renderOrderSummary} from "./orderSummary.js" ;
import { renderMenuTypes } from "./menuTypeView.js"; 
import { menuTypes } from "../../data/menuTypes.js";


// il me faut des lignes de commentaires pour expliquer les trucs qui ont l'aire d'aitre un peu complique a comprendre.


function setupMenuTypeFilter() : void{
  const buttonMenu = document.querySelectorAll<HTMLElement>(".js-type-btn");
  buttonMenu.forEach((button) => {
    button.addEventListener("click", function () {
      renderMenu(getMenuItemsByType(button.textContent.toLowerCase()));
      addMenuItemToOrder();

      buttonMenu.forEach((element) => {
        element.classList.remove("active");
      });

      button.classList.add("active");
    });
  });
}


function addMenuItemToOrder(){
  document.querySelectorAll<HTMLElement>('.js-menu-item-add').forEach(menuItem =>{
    menuItem.addEventListener('click', function(){
      const id = menuItem.dataset.id ;
      if(!id) return ;
      const existingOrder = order.find(orderItem => orderItem.id === id);
      if(existingOrder){
        existingOrder.quantity++;
        renderOrder(order);
        renderOrderSummary();
      }
      else{
        const existingMenuItem = menu.find(menuItem => menuItem.id === id);
        if(existingMenuItem){
          order.push({
            id : existingMenuItem.id,
            quantity : 1
          });
          renderOrder(order);
          renderOrderSummary();
        }

      }
    })
  })
}

function setupOrderItemMinus() : void{
  const orderItemsContainer = document.querySelector<HTMLElement>('.order-items');
  orderItemsContainer?.addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest<HTMLElement>('.js-order-item-minus');
    const id = button?.dataset.id;
    if (!id) return;

    const orderItem = order.find(orderItem => orderItem.id === id);
    if (!orderItem) return;

    if(orderItem.quantity > 0){
      orderItem.quantity--;
    }

    renderOrder(order);
    renderOrderSummary();
  })
}

function setupOrderItemPlus() : void{
  const orderItemsContainer = document.querySelector<HTMLElement>('.order-items');
  orderItemsContainer?.addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest<HTMLElement>('.js-order-item-plus');
    const id = button?.dataset.id;
    if (!id) return;

    const orderItem = order.find(orderItem => orderItem.id === id);
    if (!orderItem) return;

    orderItem.quantity++;
    renderOrder(order);
    renderOrderSummary();
  })
}

renderMenuTypes(menuTypes);

setupMenuTypeFilter();

renderMenu(menu);

addMenuItemToOrder();

renderOrder(order);

setupOrderItemMinus();

setupOrderItemPlus();

renderOrderSummary();


// const ll1 = document.querySelector('.js-order-kitchen')
// if(ll1){
//   ll1.addEventListener('click', function(){
//     const result = await window.api.sendToKitchen(menu);

//   })
// }