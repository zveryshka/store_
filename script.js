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
    })
}

getProducts()

function drawProducts(){
    main.innerHTML = ""
    products.forEach(p=>{
        main.innerHTML += `
        <div class="product">
            <h3>${p.name}</h3>
            <a href="/seller/${p.user_id}">Seller page</a>
            <p><strong> price:</strong> ${p.price} </p>
            <p> <strong>category:</strong> ${p.category} </p>
            <p> <strong>stock:</strong> ${p.stock} </p>
        </div>
        `
    })
}