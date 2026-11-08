import {menu, type MenuItem} from "../data/menu.js" ; 
import { formatCurrency } from "./utils/money.js";
import {orders, type OrderItem} from "../data/orders.js";


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
            name : existingMenuItem.name,
            priceCents : existingMenuItem.priceCents,
            quantity : 1
          });
          renderOrders(orders);
          renderOrderSummary()
        }

      }
    })
  })
}

function getMenuItemsByType(type : string){
  const newMenu : MenuItem[] = menu.filter(menuItem => menuItem.type === type);
  return newMenu.length === 0 ? menu : newMenu ;

}


renderMenu(menu);

renderOrders(orders);

addMenuItemToOrder();

renderOrderSummary();



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