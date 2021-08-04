const url = "http://localhost:3000/api/cameras";

getArticles();
function getArticles() {
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
                cloneElt.getElementById("camera_name").textContent =
                    camera.name;
                cloneElt.getElementById("camera_desc").textContent =
                    camera.description;
                cloneElt.getElementById("camera_price").textContent =
                    camera.price + "€";

                document.getElementById("cameras").appendChild(cloneElt);
            });
        });
}
