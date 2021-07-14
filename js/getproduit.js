const url = "http://localhost:3000/api/cameras";
const divs = document.getElementById("cameras");

/**
 * Gère l'affichage des articles de la page d'accueil
 */

/**
 * Déifinir la classe Article
 */
class Article {
    constructor(camera) {
        camera && Object.assign(this, camera);
    }
}
/**
 * Récupérer les données du back
 */
fetch(url)
    .then((data) => data.json())
    .then((cameras) => {
        for (let camera of cameras) {
            let cameras = new Article(camera);
            document.getElementById(
                "cameras"
            ).innerHTML += `<article class="col-md-6 col-lg card mr-3 p-0 shadow">
         <a href="produit-1.html?id=${cameras._id}" class="stretched-link"></a> 
         <img
             src="${camera.imageUrl}"
             alt=""
             class="card-img-top mb-2"
         />
         <div class="pl-3 pr-3">
             <h3 class="card-title card_title">${camera.name}</h3>
             <h5
                 class="
                     card-subtitle card_subtitle
                     text-secondary
                     mb-3
                 "
             >
             ${camera.price}€
             </h5>

             <p class="card-text card_text">
             ${camera.description}
             </p>
             <button class="btn btn-outline-dark mb-3 card-btn">
                 En savoir +
             </button>
         </div>
     </article>
          `;
        }
    });

// fetch(url)
//     .then((resp) => resp.json())

//     .then(function (data) {
//         let cameras = data;
//         console.log(data);
//         cameras.map(function (camera) {

//             document.getElementById("cameras").innerHTML = ` <article class="col-md-6 col-lg card mr-3 p-0 shadow">
//             <a href="produit-1.html" class="stretched-link"></a>
//             <img
//                 src="${camera.imageUrl}"
//                 alt=""
//                 class="card-img-top mb-2"
//             />
//             <div class="pl-3 pr-3">
//                 <h3 class="card-title card_title">${camera.name}</h3>
//                 <h5
//                     class="
//                         card-subtitle card_subtitle
//                         text-secondary
//                         mb-3
//                     "
//                 >
//                 ${camera.price}€
//                 </h5>

//                 <p class="card-text card_text">
//                 ${camera.description}
//                 </p>
//                 <button class="btn btn-outline-dark mb-3 card-btn">
//                     En savoir +
//                 </button>
//             </div>
//         </article>`;

//         //     let article = createNode("article");
//         //     article.innerHTML = `

//         //     <article class="col-md-6 col-lg card mr-3 p-0 shadow">
//         //     <a href="produit-1.html" class="stretched-link"></a>
//         //     <img
//         //         src="${camera.imageUrl}"
//         //         alt=""
//         //         class="card-img-top mb-2"
//         //     />
//         //     <div class="pl-3 pr-3">
//         //         <h3 class="card-title card_title">${camera.name}</h3>
//         //         <h5
//         //             class="
//         //                 card-subtitle card_subtitle
//         //                 text-secondary
//         //                 mb-3
//         //             "
//         //         >
//         //         ${camera.price}€
//         //         </h5>

//         //         <p class="card-text card_text">
//         //         ${camera.description}
//         //         </p>
//         //         <button class="btn btn-outline-dark mb-3 card-btn">
//         //             En savoir +
//         //         </button>
//         //     </div>
//         // </article>`;

//             append(divs, article);
//         });
//     })
//     .catch(function (error) {
//         console.log(error);
//     });

// function createNode(element) {
//     return document.createElement(element);
// }

// function append(parent, el) {
//     return parent.appendChild(el);
//  }
