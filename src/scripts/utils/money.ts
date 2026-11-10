import { config } from "../../data/config.js";

export function formatCurrency(currency : number) : string{
    return `${(currency/100).toFixed(2)}  ${config.currencySymbol}`;
}
