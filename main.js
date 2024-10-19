let iconcart = document.querySelector('.icon-cart');
let body = document.querySelector('body');
let closee = document.querySelector('.close');
let cartTab = document.querySelector('.cartTab');
let sum = document.querySelector('.icon-cart .somme');
let lisproduct = document.querySelector('.listproduct');
let listcart = document.querySelector('.listCart');
let listproducts = [];
let carts = [];

iconcart.addEventListener('click', () =>{
    cartTab.classList.add('ShowCart');
})
closee.addEventListener('click', () =>{
    cartTab.classList.remove('ShowCart');
})
const addDatatoHTML = ()=>{
    if(listproducts.length > 0){
        listproducts.forEach(product =>{
            let item = document.createElement('div');
            item.classList.add("item");
            item.dataset.id = product.id;
            item.innerHTML = `<img src="${product.image}" alt=""> 
                <h2>${product.name}</h2> 
                <div class="price">$ ${product.price} </div> 
                <button class="addcart">add to cart </button>`
            lisproduct.appendChild(item);
        })
    }
}
lisproduct.addEventListener('click', (event)=>{
    let positionClick = event.target;
    if(positionClick.classList.contains("addcart")){
        let product_id = positionClick.parentElement.dataset.id
        addToCart(product_id);
    }
})
const addToHTMLcart = ()=>{
    listcart.innerHTML = '';
    let totalQ = 0;
    if(carts.length > 0){
        carts.forEach(card => {
            let newItem = document.createElement("div");
            let products_data = listproducts.findIndex((value)=> value.id == card.product_id);
            let informations = listproducts[products_data];
            newItem.classList.add('item');
            newItem.innerHTML = `<div class="image"> <img src="${informations.image}" alt=""></div><div class="name">${informations.name} </div><div cllisass="totalprice">$ ${informations.price * card.quantity} </div><div class="quantity"><span class="minus"><</span><span>${card.quantity}</span><span class="plus">></span></div>`
            listcart.appendChild(newItem);
            totalQ = totalQ + card.quantity;
        })
    }
    sum.innerHTML = totalQ;
}
const addToCart = (product_id)=>{
    let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart < 0){
        carts.push({
            product_id : product_id,
            quantity : 1
        })
    }else{
        carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
    }
    addToHTMLcart();
}

const init = ()=>{
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        listproducts = data;
        addDatatoHTML();
    })
}
init();

console.log(carts)

