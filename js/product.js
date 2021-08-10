// récupère l'ID du produit
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let idProduct = urlParams.get("id");

const url = "http://localhost:3000/api/cameras";
let cart = JSON.parse(localStorage.getItem("cart"));

initCart();
getArticle();

// initie le local storage (tableau vide) si local storage n'existe pas mais si qq chose initie pas
function initCart() {
    if (cart == null && cart == undefined) {
        cart = [];
    }
    // console.log(cart);
}

function getArticle() {
    // modification de l'url avec l'ID du produit sélectionné
    fetch(url + "/" + idProduct)
        .then((data) => data.json())
        .then((camera) => {
            let options = "";
            for (i in camera.lenses) {
                options += `<option>${camera.lenses[i]}</option>`;
            }
            // ajout des informations de l'article sur la page produit
            document.getElementById("camera_img").src = camera.imageUrl;

            document.getElementById("camera_name").textContent = camera.name;
            document.getElementById("camera_price").textContent =
                camera.price + "€";
            document.getElementById("camera_desc").textContent =
                camera.description;
            document.getElementById("camera_lenses").innerHTML = options;

            addToCart();
        });
}

function addToCart() {
    // récupération des informations de l'article sur la page pour le local storage
    let addToCard_btn = document.getElementById("add_card_btn");
    let cameraName = document.getElementById("camera_name");
    let cameraPrice = document.getElementById("camera_price");
    let cameraImg = document.getElementById("camera_img").src;
    let cameraDesc = document.getElementById("camera_desc");

    // ajout d'un événement au click
    addToCard_btn.addEventListener("click", function () {
        // vérifie que l'article n'est pas déjà dans le panier : si non, initie un objet product avec les informations récupérées au dessus et initie qté à 1, et pousse l'objet dans le local storage
        let index = searchArticleInCart(idProduct);
        if (index == null && index == undefined) {
            let product = {
                id: idProduct,
                img: cameraImg,
                name: cameraName.textContent,
                desc: cameraDesc.textContent,
                price: cameraPrice.textContent,
                qte: 1,
            };
            cart.push(product);
        } else {
            // si oui, alors ajoute 1 à la qté de l'article présent dans le local storage
            console.log(idProduct);
            console.log(cart);
            cart[index].qte++;
        }
        // initie le local storage
        localStorage.setItem("cart", JSON.stringify(cart));
    });
}

// boucle pour vérifier si l'ID est présent dans le local storage
function searchArticleInCart(id) {
    for (i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            return i;
        }
    }
}
