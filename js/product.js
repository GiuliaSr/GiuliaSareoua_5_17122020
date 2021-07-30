const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const url = "http://localhost:3000/api/cameras";
let idProduct = urlParams.get("id");
let panier = JSON.parse(localStorage.getItem("panier"));

initPanier();

function initPanier() {
    if (panier == null && panier == undefined) {
        panier = [];
    }
}

fetch(url + "/" + idProduct)
    .then((data) => data.json())
    .then((camera) => {
        let options = "";
        for (i in camera.lenses) {
            options += `<option>${camera.lenses[i]}</option>`;
        }
        console.log(options);
        document.getElementById("camera_img").src = camera.imageUrl;
        document.getElementById("camera_name").textContent = camera.name;
        document.getElementById("camera_price").textContent =
            camera.price + "€";
        document.getElementById("camera_desc").textContent = camera.description;
        document.getElementById("camera_lenses").innerHTML = options;

        addToCard();
    });

function addToCard() {
    let addToCard_btn = document.getElementById("add_card_btn");
    let cameraName = document.getElementById("camera_name");
    let cameraPrice = document.getElementById("camera_price");
    let cameraImg = document.getElementById("camera_img").src;
    let cameraDesc = document.getElementById("camera_desc");
    let displayNumber = document.getElementById("cartok");
    console.log(displayNumber);

    addToCard_btn.addEventListener("click", function () {
        let index = rechercherPanier(idProduct);

        if (index == null && index == undefined) {
            let product = {
                id: idProduct,
                img: camera_img,
                name: camera_name.textContent,
                desc: camera_desc.textContent,
                price: camera_price.textContent,
                qte: 1,
            };
            console.log(product);
            panier.push(product);
        } else {
            console.log(idProduct);
            console.log(panier);
            panier[index].qte++;
        }
        localStorage.setItem("panier", JSON.stringify(panier));
    });
}

function updatePanier() {
    // let objetLocalStorage = localStorage.getItem("panier");
    // JSON.parse(objetLocalStorage);
    // console.log(objetLocalStorage);
    // let cameraName = objetLocalStorage.name;
    // console.log(cameraName);
}
updatePanier();

function rechercherPanier(id) {
    for (i = 0; i < panier.length; i++) {
        if (panier[i].id == id) {
            return i;
        }
    }
}
