export const menu = [{
        id: "ab5b62b0-825d-44c8-9d20-c39589740ec8",
        name: "Coca Cola",
        priceCents: 299,
        image: "images/coca-cola.jpg",
        type: "drinks"
    },
    {
        id: "38a7294c-4ad4-4aae-809f-145553df4fdc",
        name: "Pepsi",
        priceCents: 299,
        image: "images/pepsi.jpg",
        type: "drinks"
    },
    {
        id: "a0551b2f-ecd1-4c83-8439-0ce1f8d7dabf",
        name: "Four Cheese Pizza",
        priceCents: 1299,
        image: "images/four-cheese-pizza.jpg",
        type: "pizzas"
    },
    {
        id: "c66c1aa4-4c46-4a48-bb8f-887d7d1c9665",
        name: "Chicken Burger",
        priceCents: 999,
        image: "images/chicken-burger.jpg",
        type: "burgers"
    },
    {
        id: "0cc56231-4221-4666-84f9-83e9653877ba",
        name: "Margherita Pizza",
        priceCents: 799,
        image: "images/pizza-margherita.jpg",
        type: "pizzas"
    }
];
export function getMenuItemsByType(type) {
    const newMenu = menu.filter(menuItem => menuItem.type === type);
    return newMenu.length === 0 ? menu : newMenu;
}
//# sourceMappingURL=menu.js.map