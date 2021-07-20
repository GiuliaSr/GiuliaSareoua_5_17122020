// let addToCart = document.getElementById("add_cart");
// let add = document.getElementById("panier");
// let counter = 0;
// const ajouter = () => {
//     addToCart.addEventListener("click", (e) => {
//         e.preventDefault();
//         counter++;
//         add.textContent = counter;
//         add.style.color = "white";
//     });
// };
// ajouter();
// //---------------------

// let recap = [];

// class recapPanier {
//     constructor(camera) {
//         camera && Object.assign(this, camera);
//     }
// }
// console.log(recapPanier);

//-----------------
// AJOUTER AU PANIER LOGIQUE
// -----------------

// ÉTAPE1
// -	Ajouter un event au click sur Ajouter Au panier
// -	A chaque click, incrément de 1 la variable counter
// ÉTAPE2
// -	Récupérer les informations de ce qui a été clické avec l’ID
// ÉTAPE3
// -	Traiter et organiser les informations (les ranger)
// ÉTAPE4
// -	Mettre ces informations dans la page du panier
// ÉTAPE5
// -	Calculer la somme des prix

// AJOUTER AU PANIER POSSIBILITÉS TECH

// Fonction
// Eventlistener sur le bouton « ajouter au panier »
// Incrémente couunter de 1 pour chaque click

// DONC ici j’ai :  l’evenement sur le click
// 		Le nombre de click

// MAINTENANT je veux : récupérer les informations relatives au produit clické
// SOLUTIONS :
// -	Récupérer le détail du produit grâce à l’url du produit (différent pour chacun grâce à leur ID)
// Function async
// 	Await fetch (url ${_id}
// 	Class panier (constructor)
// 		This.photo = ${camera.photo}
// 		etc

// AVEC ÇA JE VEUX : créer une boite qui récupère photo, nom, description, prix
// 	Class Panier avec le constructor photo, nom, description, prix
// 	En pointant dynamiquement ${camera.name} etc
// Que j’ajoute a ma fonction qui va chercher les informations du produit

// DONC LÀ J’AI :
// Mon event au click qui va gérer la qté
// Mes informations rangées dans une boite (objet? Class ? Tableau ?)

// DONC IL FAUT :
// Relier les 2 : pour qu’à chaque click, counter++, prends les informations de l’Url récupérées dynamiquement, et range les dans une boite.
// 	SOLUTION : appeler la fonction avec le fetch dans la fonction du click
// PAGE PANIER
// Maintenant je veux : mettre les éléments de ma boite dans le récap du panier
// 	Array.map ?
