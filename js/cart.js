let objectLocalStorage = JSON.parse(localStorage.getItem("cart"));
let displayCart = document.getElementById("display_articles");
let listPrice = [];
const emptyCart = document.getElementById("emptyCart");
const cartContent = document.getElementById("cart_content");

main();
function main() {
    displayArticle();
    displayTotal();
    checkFormAndPostRequest();
    displayEmptyCartMsg();
}

// Ajout d'un message si le panier ne contient aucun article
function displayEmptyCartMsg() {
    if (objectLocalStorage.length < 1) {
        cartContent.classList.add("d-none");
    } else {
        emptyCart.classList.add("d-none");
    }
}

// Insertion des articles présents dans le localStorage dans le récapitulatif du panier
function displayArticle() {
    // on ajoute une ligne au tableau pour chaque élément du panier, on range en cellules les informations
    let table = document.getElementById("table");
    objectLocalStorage.forEach((article) => {
        let row = table.insertRow(1);
        row.className = "mx-auto text-center border-bottom border-dark";
        let cellImg = row.insertCell(0);
        cellImg.innerHTML = `<img src="${article.img}" class="img-fluid img-thumbnail" alt="">
        `;
        cellImg.className = "w-25 align-middle";
        let cellName = row.insertCell(1);
        cellName.innerHTML = article.name;
        cellName.className = "align-middle h2";
        let cellPrice = row.insertCell(2);
        cellPrice.innerHTML = article.price;
        cellPrice.className = "align-middle";
        let cellQty = row.insertCell(3);
        cellQty.innerHTML = article.qte;
        cellQty.className = "align-middle";
        let cell4 = row.insertCell(4);
        cell4.className = "align-middle";
        let cell5 = row.insertCell(5);
        cell5.className = "align-middle";
        // calcul du prix par ligne
        const totalQtyPrice = getTotalQtyPrice(article.qte, article.price);
        listPrice.push(totalQtyPrice); // on envoie les totaux des lignes dans le tableau pour les récupérer
        cell4.innerHTML = totalQtyPrice + "€"; // on met la fonction qui fait le calcul du total par ligne

        // ajout de la fonctionnalité supression
        cell5.innerHTML = `<button id="supressBtn" class="btn btn-secondary ">Supprimer</button>`;
        let supressBtn = document.getElementById("supressBtn");
        supressBtn.addEventListener("click", () => {
            if (article.qte > 1) {
                cellQty.innerHTML = article.qte--;
            } else {
                objectLocalStorage.splice(article, 1);
            }
            localStorage.setItem("cart", JSON.stringify(objectLocalStorage));
            location.reload();
        });
    });
}

function displayTotal() {
    let total = document.getElementById("totalToPay");
    total.innerHTML += " " + sum(listPrice) + "€"; // on fait appel à la fonction déclarée plus bas qui additionnait chaque élément
}

// on convertit le prix en number pour pouvoir le calculer
function convertToPrice(price) {
    return price.split("€")[0];
}
// on multiplie la qté par le prix pour avoir des sous totaux
function getTotalQtyPrice(qty, price) {
    return qty * convertToPrice(price);
}

// ici on va faire le calcul total de tous les éléments du panier
function sum(listElements) {
    let total = 0;
    listElements.forEach((element) => {
        total += element;
    });

    return total;
}

// fonction qui vérifie les champs du formulaire
function checkFormAndPostRequest() {
    const submit = document.getElementById("submit");
    let inputLastName = document.getElementById("lastname");
    let inputName = document.getElementById("name");
    let inputMail = document.getElementById("mail");

    let inputAdress = document.getElementById("adress");
    let inputPostal = document.getElementById("postal");
    let inputCity = document.getElementById("city");
    let erreur = document.querySelector(".erreur");

    // renvoie une alerte d'erreur si l'un de ces champs n'a pas de valeur
    submit.addEventListener("click", (e) => {
        e.preventDefault();

        if (
            !inputLastName.value ||
            !inputName.value ||
            !inputMail.value ||
            !inputAdress.value ||
            !inputPostal.value ||
            !inputCity.value
        ) {
            alert(
                "Vous devez renseigner tous les champs pour passer la commande"
            );
        } else if (validateEmail(inputMail.value) == false) {
            alert("Veuillez renseigner une adresse mail correcte");
            return;
        } else {
            let productsBought = objectLocalStorage.map((article) => {
                return article.id;
            });
            // productsBought.push(objectLocalStorage);

            const order = {
                contact: {
                    firstName: inputName.value,
                    lastName: inputLastName.value,
                    address: inputAdress.value,
                    city: inputCity.value,
                    email: inputMail.value,
                },
                products: productsBought,
            };

            const options = {
                method: "POST",
                body: JSON.stringify(order),
                headers: { "Content-Type": "application/json" },
            };
            console.log(options);
            fetch("http://localhost:3000/api/cameras/order", options)
                .then((response) => response.json())
                .then((data) => {
                    localStorage.clear();
                    document.location.href =
                        "confirmation.html?orderId=" + data.orderId;
                })
                .catch((err) => {
                    alert("Il y a eu une erreur : " + err);
                });
        }
    });
}
// fonction pour vérification du format de l'email
function validateEmail(email) {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(email).toLowerCase());
}
