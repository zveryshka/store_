const BASE_URL = "https://my-json-server.typicode.com/zveryshka/store_"
let main = document.querySelector("main")
let products = []

function getProducts(){
    fetch(BASE_URL + "/products")
    .then(async (res)=>{
        let data = await res.json()
        console.log(data)
        products = data
        drawProducts()
        drawCart()
    })
}

getProducts()



function drawProducts(){
    main.innerHTML = ""
    products.forEach(p=>{
        main.innerHTML += `
        <div class="product">
        <h3>${p.name}</h3>
        <a href="/seller.html?user_id=${p.user_id}">Seller page</a>
        <p><strong> price:</strong> ${p.price} </p>
        <p> <strong>category:</strong> ${p.category} </p>
        <p> <strong>stock:</strong> ${p.stock} </p>
        <button onclick="addProductToCart(${p.product_id})">Buy</button>
        </div>
        `
    })
}

let cartButton = document.getElementById("cart")
let cart = document.querySelector(".cart")

let cartIsOpen = false
cartButton.addEventListener("click", function(){
    cartIsOpen = !cartIsOpen
    cart.style.display = cartIsOpen ? "flex" : "none"
    
})

let cartArray = []

function addProductToCart(product_id){
    console.log(product_id)
    cartArray.push(product_id)
    localStorage.setItem("cart", JSON.stringify(cartArray))
    drawCart()

}

function drawCart(){
    if(cartArray.length == 0){
        cart.innerHTML = "пустота"
        return
    }
    let cartProducts = products.filter(p=> cartArray.indexOf(p.product_id) > -1)
    cartProducts = cartProducts.map(p=>({
        ...p,
        count: cartArray.filter(prod=>prod == p.product_id).length
    }))
    console.log(cartProducts)
    cart.innerHTML = cartProducts.map(p=>`<li>${p.name} | $${p.price} | X${p.count}</li>`).join("")
    cart.innerHTML += `<p>Total: $${cartProducts.reduce((sum,p)=>sum + p.price * p.count, 0)}</p>`
    cart.innerHTML += `<button onclick="clearCart()">❌</button>`
}

function clearCart(){
    cartArray.length = 0
    localStorage.setItem("cart", "[]")
    drawCart();
}

cartArray = JSON.parse(localStorage.getItem("cart")) || []
