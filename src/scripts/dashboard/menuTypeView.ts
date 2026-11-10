function generateMenuTypeHTML(menuType : string){
    return ` <button class="menu-type-btn js-type-btn">${menuType}</button> `;
}

function generateMenuTypesHTML(menuTypes : string[]){
    let menuTypesHTML: string = '';
    menuTypes.forEach(menuType => menuTypesHTML += generateMenuTypeHTML(menuType));
    return menuTypesHTML;
}

export function renderMenuTypes(menuTypes : string[]){
    const container = document.querySelector('.js-menu-types') ;
    if(container){
        container.innerHTML = generateMenuTypesHTML(menuTypes);
    }

}