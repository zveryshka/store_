const ulrParams = new URLSearchParams(window.location.search)
let user_id = ulrParams.get("user_id")
console.log(user_id);

const BASE_URL = "https://my-json-server.typicode.com/zveryshka/store_"
let main = document.querySelector("main")


function getUsers(){
    fetch(BASE_URL + "/users?user_id=" + user_id)
    .then(async (res)=>{
        let data = await res.json()
        data = data[0]
        console.log(data)
        document.querySelector(".seller h1").innerHTML = data.username
        document.querySelector(".seller h3").innerHTML = data.email
        document.querySelector(".seller h4").innerHTML = data.role
    })
}
getUsers()

function getProducts(){
    fetch(BASE_URL + "/products?user_id=" + user_id)
    .then(async (res)=>{
        let data = await res.json()
        console.log(data)
        drawProducts(data)
    })
}
getProducts()

function drawProducts(products){
    main.innerHTML = ""
    products.forEach(p=>{
        main.innerHTML += `
        <div class="product">
            <h3>${p.name}</h3>
            <p><strong> price:</strong> ${p.price} </p>
        </div>
        `
    })
}