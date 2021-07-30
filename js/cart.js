let objectLocalStorage = JSON.parse(localStorage.getItem("panier"));
let displayCart = document.getElementById("display_articles");
let listPrice = [];

console.log(objectLocalStorage);
main();
function main() {
    displayArticle();
    displayTotal();
    checkFormAndPostRequest();
}

function displayArticle() {
    // on ajoute une ligne au tableau pour chaque élément du panier, on range en cellules les informations
    let table = document.getElementById("table");
    objectLocalStorage.forEach((article) => {
        let row = table.insertRow(1);
        let cell1 = row.insertCell(0);
        cell1.innerHTML = article.name;
        let cell2 = row.insertCell(1);
        cell2.innerHTML = article.price;
        let cell3 = row.insertCell(2);
        cell3.innerHTML = article.qte;
        let cell4 = row.insertCell(3);

        const totalQtyPrice = getTotalQtyPrice(article.qte, article.price);
        listPrice.push(totalQtyPrice); // on envoie les totaux des lignes dans le tableau pour les récupérer
        cell4.innerHTML = totalQtyPrice + "€"; // on met la fonction qui fait le calcul du total par ligne
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
// tester si on lui envoie des entiers
// tester si on lui envoie des nombres à virgules
// tester si on lui envoie des numbers -
// si chaîne de caractère = erreur
// ici on va faire le calcul total de tous les éléments du panier
function sum(listElements) {
    let total = 0;
    listElements.forEach((element) => {
        total += element;
    });

    return total;
}

function checkFormAndPostRequest() {
    const submit = document.getElementById("submit");
    let inputLastName = document.getElementById("lastname");
    let inputName = document.getElementById("name");
    let inputMail = document.getElementById("mail");
    let inputAdress = document.getElementById("adress");
    let inputPostal = document.getElementById("postal");
    let inputCity = document.getElementById("city");
    let erreur = document.querySelector(".erreur");

    submit.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(e);
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
        } else {
            console.log(1);
            let productsBought = objectLocalStorage.map((article) => {
                return article.id;
            });
            // productsBought.push(objectLocalStorage);
            console.log(2, productsBought);
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

                    //  On peut commenter cette ligne pour vérifier le statut 201 de la requête fetch. Le fait de préciser la destination du lien ici et non dans la balise <a> du HTML permet d'avoir le temps de placer les éléments comme l'orderId dans le localStorage avant le changement de page.
                    document.location.href =
                        "confirmation.html?orderId=" + data.orderId;
                })
                .catch((err) => {
                    alert("Il y a eu une erreur : " + err);
                });
        }
    });
}
