let objectLocalStorage = JSON.parse(localStorage.getItem("panier"));
let displayCart = document.getElementById("display_articles");

main();
function main() {
    displayArticle();
    checkFormAndPostRequest();
}

function displayArticle() {
    // for (let article in objectLocalStorage) {
    //     let articlesRows = document.getElementById("article_row");
    //     articlesRows.cloneNode(true);
    //     displayCart.insertBefore(articlesRows, articlesRows);
    //     let articleName = document.getElementById("camera_name");
    //     articleName.textContent += objectLocalStorage[article].name;
    //     let articlePrice = document.getElementById("camera_price");
    //     articlePrice.textContent += objectLocalStorage[article].price;
    // }
    // objectLocalStorage.forEach((camera) => {
    //     let templateElt = document.getElementById("article_row");
    //     let cloneElt = document.cloneNode(templateElt.content, true);
    //     cloneElt.getElementById("camera_name").textContent = camera.name;
    //     cloneElt.getElementById("camera_desc").textContent = camera.description;
    //     cloneElt.getElementById("camera_price").textContent =
    //         camera.price + "€";
    //     document.getElementById("cameras").appendChild(cloneElt);
    // });
}
// copier l'élément tr id article_row qui est la ligne dans laquelle appraitra les infos du produit
// dans cette ligne : les éléments th représentent image, nom, prix etc

function checkFormAndPostRequest() {
    const submit = document.getElementById("submit");
    let inputLastName = document.getElementById("lastname");
    let inputName = document.getElementById("name");
    let inputMail = document.getElementById("mail");
    let inputAdress = document.getElementById("adress");
    let inputPostal = document.getElementById("postal");
    let inputAdress2 = document.getElementById("adress2");
    let erreur = document.querySelector(".erreur");

    submit.addEventListener("click", (e) => {
        console.log(e);
        if (
            !inputLastName.value ||
            !inputName.value ||
            !inputMail.value ||
            !inputMail.value ||
            !inputAdress.value ||
            !inputPostal.value ||
            !inputAdress2.value
        ) {
            erreur.textContent =
                "Vous devez renseigner tous les champs pour passer la commande";
        } else {
            let productsBought = [];
            productsBought.push(objectLocalStorage);

            const order = {
                contact: {
                    firstName: inputName.value,
                    lastName: inputLastName.value,
                    address: inputAdress.value,
                    email: inputMail.value,
                },
                products: productsBought,
            };
            const options = {
                method: "POST",
                body: JSON.stringify(order),
                headers: { "Content-Type": "application/json" },
            };
            fetch("http://localhost:3000/api/cameras/order", options)
                .then((response) => response.json())
                .then((data) => {
                    localStorage.clear();
                    console.log(data);
                    //   localStorage.setItem("orderId", data.orderId);
                    //   localStorage.setItem("total", priceConfirmation[1]);

                    //  On peut commenter cette ligne pour vérifier le statut 201 de la requête fetch. Le fait de préciser la destination du lien ici et non dans la balise <a> du HTML permet d'avoir le temps de placer les éléments comme l'orderId dans le localStorage avant le changement de page.
                    document.location.href = "confirmation.html";
                })
                .catch((err) => {
                    alert("Il y a eu une erreur : " + err);
                });
        }
    });
}
