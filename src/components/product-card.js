import { addToCart } from "../services/cart-service.js";

export function ProductCard(product) {
    const card = document.createElement("article");

    card.className = `
        bg-white
        rounded-xl
        shadow-sm
        overflow-hidden
        flex
        flex-col
        transition
        hover:shadow-lg
    `;

    card.innerHTML = `
        <div class="
            h-56
            w-100
            bg-gray-50
            p-4
            flex
            items-center
            justify-center
            relative
            overflow-hidden
        ">
            <img
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
                decoding="async"
                class="
                    max-h-full
                    max-w-full
                    w-auto
                    h-auto
                    object-contain
                    transition-transform
                    duration-300
                    hover:scale-105
                    mix-blend-multiply
                "
                onerror="this.onerror=null; this.src='https://via.placeholder.com/300?text=Sem+Imagem';"
            />
        </div>

        <div class="p-5 flex flex-col flex-1">

            <h2 class="text-xl font-bold line-clamp-1">
                ${product.name}
            </h2>

            <p class="
                text-gray-500
                text-sm
                mt-2
                flex-1
                line-clamp-2
            ">
                ${product.description}
            </p>

            <div class="
                flex
                items-center
                justify-between
                mt-5
            ">

                <span class="text-lg font-bold">
                    R$ ${product.price.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2
                    })}
                </span>

                <button
                    class="
                        px-4
                        py-2
                        rounded-lg
                        bg-blue-600
                        text-white
                        font-medium
                        hover:bg-blue-700
                        transition
                    "
                    data-add-cart
                >
                    Adicionar
                </button>

            </div>

        </div>
    `;

    const button = card.querySelector("[data-add-cart]");

    button.addEventListener("click", () => {
        addToCart(product);

        button.textContent = "Adicionado!";

        setTimeout(() => {
            button.textContent = "Adicionar";
        }, 1000);
    });

    return card;
}