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
        // document.getElementById(
        //     "detailCamera"
        // ).innerHTML += `<img src="${camera.imageUrl}" alt="" class="col-3" id="productImg" />
        //      <div class="pl-3 pr-3 col-4 my-auto">
        //          <h3 class="" id="productName">${camera.name}</h3>
        //          <h5 class="text-secondary mb-3" id="productPrice">${camera.price}€</h5>

        //          <p id="productDescription">
        //          ${camera.description}
        //          </p>
        //      </div>

        //      <div class="col bg-light pt-3 pb-3 mr-3">
        //          <h3 class="mb-3">Personnalisez votre appareil!</h3>

        //          <select class="form-control col-7 mb-3">
        //              ${options}
        //          </select>

        //          <small id="lensesHelp" class="form-text text-muted"
        //              >Plusieurs choix d'objectifs disponibles! <br />
        //              Choisissez la taille qui vous convient</small
        //          >
        //          <div class="text-center" >
        //              <a
        //                  href="panier.html"
        //                  class="btn btn-success col-7 mt-4"
        //              >
        //                  Ajouter au panier
        //              </a>
        //          </div>
        //      </div>
        //       `;
        addToCard();
    });

function addToCard() {
    let addToCard_btn = document.getElementById("add_card_btn");
    let cameraName = document.getElementById("camera_name");
    let cameraPrice = document.getElementById("camera_price");
    let cameraImg = document.getElementById("camera_img").src;
    let cameraDesc = document.getElementById("camera_desc");

    addToCard_btn.addEventListener("click", function () {
        console.log(camera_img);
        console.log(camera_desc.textContent);
        console.log(camera_name.textContent);
        console.log(camera_price.textContent);
        console.log(idProduct);

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

// implémentation du panier
// let panierImg = document.getElementById("productImg");
// let panierName = document.getElementById("productName");
// console.log(panierImg);
// console.log(panierName.textContent);

// if (localStorage.getItem("panier")) {
//     updatePanier();
// }
