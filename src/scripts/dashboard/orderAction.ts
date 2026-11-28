declare global {
  interface Window {
    api : {sendToKitchen : () => any}
  }
}


export function setupSendToKitchenButton() : void{
  const orderKitchen = document.querySelector<HTMLElement>('.js-order-kitchen');
  if(orderKitchen){
    orderKitchen.addEventListener('click', async function(){
      const result = await window.api.sendToKitchen();
    })
  }
}
