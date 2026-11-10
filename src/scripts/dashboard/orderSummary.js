import { formatCurrency } from "../utils/money.js";
import { orders } from "../../data/orders.js";
function calculateSubtotalCents(orders) {
    if (orders.length === 0)
        return 0;
    let sum = 0;
    orders.forEach(order => sum += order.priceCents * order.quantity);
    return sum;
}
/** (5.5 /100) represents the taxes : (5.5%) */
function calculateTaxCents(orders) {
    return calculateSubtotalCents(orders) * (5.5 / 100);
}
function calculateTotalWithTaxCents(orders) {
    return calculateSubtotalCents(orders) + calculateTaxCents(orders);
}
export function renderOrderSummary() {
    let container = document.querySelector('.js-order-ht-price');
    if (container) {
        container.innerHTML = `${formatCurrency(calculateSubtotalCents(orders))} $`;
    }
    container = document.querySelector('.js-order-vat-price');
    if (container) {
        container.innerHTML = `${formatCurrency(calculateTaxCents(orders))} $`;
    }
    container = document.querySelector('.js-order-total-price');
    if (container) {
        container.innerHTML = `${formatCurrency(calculateTotalWithTaxCents(orders))} $`;
    }
}
//# sourceMappingURL=orderSummary.js.map