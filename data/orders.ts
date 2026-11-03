export interface OrderItem{
    id : string,
    name : string,
    priceCents : number,
    quantity : number
}


export let orders : OrderItem[] = []