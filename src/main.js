import { Shop } from "./pages/shop.js";
import { Cart } from "./pages/cart.js";
import { GerenciadorProdutos } from "./managers/GerenciadorProdutos.js";
import { GerenciadorPedidos } from "./managers/GerenciadorPedidos.js";
import { Carrinho } from "./models/Carrinho.js";

const gerenciadorProdutos = new GerenciadorProdutos();
const gerenciadorPedidos = new GerenciadorPedidos();
const carrinho = new Carrinho();

const routes = {
    "/": () => Shop(gerenciadorProdutos, carrinho),
    "/cart": () => Cart(carrinho, gerenciadorPedidos),
};

async function router() {
    const content = document.querySelector(".content");
    const path = window.location.pathname;

    const page = routes[path] || routes["/"];

    content.innerHTML = "";

    try {
        const pageElement = await page();

        content.appendChild(pageElement);

    } catch (error) {
        console.error(error);

        content.innerHTML = `
            <div class="p-10">
                <h1 class="text-2xl font-bold">
                    Erro ao carregar a página
                </h1>

                <p class="mt-2 text-gray-600">
                    ${error.message}
                </p>
            </div>
        `;
    }
}

document.addEventListener("click", event => {
    const link = event.target.closest("[data-link]");

    if (!link) {
        return;
    }

    event.preventDefault();

    const path = link.getAttribute("href");

    window.history.pushState({}, "", path);

    router();
});

window.addEventListener("popstate", router);

router();