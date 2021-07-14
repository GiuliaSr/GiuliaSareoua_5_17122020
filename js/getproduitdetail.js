/**
 * Afficher dynamiquement les données de la page produit
 */

//  on veut récup les param de l'url(id) > on va les parser (récup les clés dont on a besoin)
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const url = "http://localhost:3000/api/cameras";

class articleDetails {
    constructor(camera) {
        camera && Object.assign(this, camera);
    }
}

fetch(url + "/" + urlParams.get("id"))
    .then((data) => data.json())
    .then((camera) => {
        let cameras = new articleDetails(camera);
        let options = "";
        // pour i car on boucle sur l'index et pas la valeur
        for (i in camera.lenses) {
            options += `<option>${camera.lenses[i]}</option>`;
        }

        document.getElementById(
            "detailCamera"
        ).innerHTML += `<img src="${camera.imageUrl}" alt="" class="col-3" />
             <div class="pl-3 pr-3 col-4 my-auto">
                 <h3 class="">${camera.name}</h3>
                 <h5 class="text-secondary mb-3">${camera.price}€</h5>
    
                 <p>
                 ${camera.description}
                 </p>
             </div>
    
             <div class="col bg-light pt-3 pb-3 mr-3">
                 <h3 class="mb-3">Personnalisez votre appareil!</h3>
    
                 <select class="form-control col-7 mb-3">
                     ${options}
                 </select>
    
                 <small id="lensesHelp" class="form-text text-muted"
                     >Plusieurs choix d'objectifs disponibles! <br />
                     Choisissez la taille qui vous convient</small
                 >
                 <div class="text-center">
                     <a
                         href="panier.html"
                         class="btn btn-success col-7 mt-4"
                     >
                         Ajouter au panier
                     </a>
                 </div>
             </div>
              `;
    });
