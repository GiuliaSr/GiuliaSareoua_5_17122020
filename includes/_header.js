document.getElementById("header").innerHTML = `
<div class="container hd-container">
                <div class="row bg-dark">
                    <nav class="col-12 navbar navbar-expand-lg navbar-dark h5">
                        <a href="index.html" class="navbar-brand">
                            <img
                                src="img/logo-blanc.png"
                                width="20%"
                                alt="Logo d'Orinoco"
                            />
                        </a>
                        <button
                            class="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarContent"
                        >
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse text-dark">
                            <ul class="navbar-nav mx-auto">
                                <li class="nav-item active">
                                    <a href="index.html" class="nav-link"
                                        >Accueil</a
                                    >
                                </li>
                                <li class="nav-item">
                                    <a href="cart.html" class="nav-link"
                                        >Panier</a
                                    >
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
`;
