import {menu, type MenuItem, getMenuItemsByType} from "../../data/menu.js" ; 
import {orders, type OrderItem} from "../../data/orders.js";
import {renderMenu} from "./menuView.js" ;
import {renderOrders} from "./orderView.js" ;
import {renderOrderSummary} from "./orderSummary.js" ;
import { renderMenuTypes } from "./menuTypeView.js"; 
import { menuTypes } from "../../data/menuTypes.js";


// il me faut des lignes de commentaires pour expliquer les trucs qui ont l'aire d'aitre un peu complique a comprendre.

document.querySelectorAll(".js-type-btn").forEach((button) => {
  button.addEventListener("click", function () {
    renderMenu(getMenuItemsByType(button.textContent.toLowerCase()));
    addMenuItemToOrder();
    const buttonMenu = document.querySelectorAll(".js-type-btn");
    buttonMenu.forEach((element) => {
      element.classList.remove("actif");
    });

    button.classList.add("actif");
  });
});

function addMenuItemToOrder(){
  document.querySelectorAll<HTMLElement>('.js-menu-item-add').forEach(menuItem =>{
    menuItem.addEventListener('click', function(){
      const id = menuItem.dataset.id ;
      if(!id) return ;
      const existingOrder = orders.find(order => order.id === id);
      if(existingOrder){
        existingOrder.quantity++;
        renderOrders(orders);
        renderOrderSummary();
      }
      else{
        const existingMenuItem = menu.find(menuItem => menuItem.id === id);
        if(existingMenuItem){
          orders.push({
            id : existingMenuItem.id,
            quantity : 1
          });
          renderOrders(orders);
          renderOrderSummary()
        }

      }
    })
  })
}

const orderItemsContainer = document.querySelector<HTMLElement>('.order-items');


orderItemsContainer?.addEventListener('click', (event) => {
  const button = (event.target as HTMLElement).closest<HTMLElement>('.js-order-item-minus');
  const id = button?.dataset.id;
  if (!id) return;

  const order = orders.find(item => item.id === id);
  if (!order) return;

  if(order.quantity > 0){
    order.quantity--;
  }

  renderOrders(orders);
  renderOrderSummary();
})


orderItemsContainer?.addEventListener('click', (event) => {
  const button = (event.target as HTMLElement).closest<HTMLElement>('.js-order-item-plus');
  const id = button?.dataset.id;
  if (!id) return;

  const order = orders.find(item => item.id === id);
  if (!order) return;

  order.quantity++;
  renderOrders(orders);
  renderOrderSummary();
})


renderMenuTypes(menuTypes);

renderMenu(menu);

renderOrders(orders);

addMenuItemToOrder();

renderOrderSummary();