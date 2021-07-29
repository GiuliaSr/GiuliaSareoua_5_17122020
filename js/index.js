const url = "http://localhost:3000/api/cameras";

fetch(url)
    .then((data) => data.json())
    .then((cameras) => {
        console.log(cameras);
        cameras.forEach((camera) => {
            const templateElt = document.getElementById("cameras");
            const cloneElt = document.importNode(templateElt.content, true);

            cloneElt.getElementById("camera_link").href =
                `product.html?id=` + camera._id;
            cloneElt.getElementById("camera_img").src = camera.imageUrl;
            cloneElt.getElementById("camera_name").textContent = camera.name;
            cloneElt.getElementById("camera_desc").textContent =
                camera.description;
            cloneElt.getElementById("camera_price").textContent =
                camera.price + "€";

            document.getElementById("cameras").appendChild(cloneElt);
        });
    });

// for (let camera of cameras) {
//     document.getElementById(
//         "cameras"
//     ).innerHTML += `<a href="produit-1.html?id=${cameras._id}" class="stretched-link"></a> `;

// document
//     .getElementById("camera_img")
//     .setAttribute("src") += `${camera.imageUrl}`;

// document.getElementById(
//     "camera_name"
// ).textContent += `${camera.name}`;
// document.getElementById(
//     "camera_price"
// ).textContent += `${camera.price}€`;
// document.getElementById(
//     "camera_desc"
// ).textContent += `${camera.description}`;
//         document.getElementById(
//             "cameras"
//         ).innerHTML += `<article class="col-md-6 col-lg card mr-3 p-0 shadow">
//      <a href="produit-1.html?id=${cameras._id}" class="stretched-link"></a>
//      <img
//          src="${camera.imageUrl}"
//          alt=""
//          class="card-img-top mb-2"
//      />
//      <div class="pl-3 pr-3">
//          <h3 class="card-title card_title">${camera.name}</h3>
//          <h5
//              class="
//                  card-subtitle card_subtitle
//                  text-secondary
//                  mb-3
//              "
//          >
//          ${camera.price}€
//          </h5>

//          <p class="card-text card_text">
//          ${camera.description}
//          </p>
//          <button class="btn btn-outline-dark mb-3 card-btn">
//              En savoir +
//          </button>
//      </div>
//  </article>
//       `;
