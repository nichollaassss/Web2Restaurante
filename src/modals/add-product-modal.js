import { ProductCard } from "../components/product-card.js";

export function AddEditProductModal(page, produto, onSave) {
    const modal = document.createElement("div");
    const editing = Boolean(produto);

    modal.innerHTML = `
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" data-product-modal role="dialog" aria-modal="true">
            <form class="w-full max-w-lg space-y-4 rounded-xl bg-white p-6 shadow-2xl" data-product-form>
                <div class="flex items-center justify-between gap-4">
                    <h2 class="text-2xl font-bold text-gray-900">${editing ? "Editar prato" : "Cadastrar prato"}</h2>
                    <button type="button" class="text-2xl leading-none text-gray-400 hover:text-gray-700" data-close aria-label="Fechar">&times;</button>
                </div>
                <label class="block text-sm font-semibold text-gray-700">Nome
                    <input name="nome" required minlength="2" class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" />
                </label>
                <label class="block text-sm font-semibold text-gray-700">Descrição
                    <textarea name="descricao" required minlength="5" rows="3" class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"></textarea>
                </label>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label class="block text-sm font-semibold text-gray-700">Preço
                        <input name="preco" type="number" min="0.01" step="0.01" required class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" />
                    </label>
                    <label class="block text-sm font-semibold text-gray-700">Categoria
                        <input name="categoria" class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" />
                    </label>
                </div>
                <label class="block text-sm font-semibold text-gray-700">URL da imagem
                    <input name="imagem" type="url" required class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" />
                </label>
                <div class="flex justify-end gap-3 pt-2">
                    <button type="button" data-close class="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700">Cancelar</button>
                    <button type="submit" class="rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700">Salvar</button>
                </div>
            </form>
        </div>
    `;

    const form = modal.querySelector("[data-product-form]");
    for (const [campo, valor] of Object.entries(produto ?? {})) {
        if (form.elements[campo]) form.elements[campo].value = valor;
    }

    const close = () => modal.remove();
    modal.querySelectorAll("[data-close]").forEach(button => button.addEventListener("click", close));
    modal.querySelector("[data-product-modal]").addEventListener("click", event => {
        if (event.target === event.currentTarget) close();
    });
    form.addEventListener("submit", event => {
        event.preventDefault();
        const formData = new FormData(form);
        onSave({
            nome: formData.get("nome").trim(),
            descricao: formData.get("descricao").trim(),
            preco: Number(formData.get("preco")),
            categoria: formData.get("categoria").trim() || "Geral",
            imagem: formData.get("imagem").trim()
        });
        close();
    });

    page.appendChild(modal);
    form.elements.nome.focus();
    return modal;
}
 
 export function AddProductModal(page, productsContainer, addProduct, getProducts) {
 
 const modal = document.createElement("div");

    modal.innerHTML = `
        <div
            class="fixed inset-0 z-50 hidden items-center justify-center bg-black/50 p-4"
            data-product-modal
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-product-title"
        >
            <div class="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-2xl">
                <div class="flex items-start justify-between gap-4">
                    <div>
                        <h2 id="add-product-title" class="text-2xl font-bold text-gray-900">
                            Adicionar carro
                        </h2>
                        <p class="mt-1 text-sm text-gray-500">
                            Preencha os dados para criar um novo carro.
                        </p>
                    </div>

                    <button
                        type="button"
                        class="text-2xl leading-none text-gray-400 hover:text-gray-700"
                        data-close-modal
                        aria-label="Fechar"
                    >
                        &times;
                    </button>
                </div>

                <form class="mt-6 space-y-4" data-product-form>
                    <div>
                        <label for="product-name" class="mb-1 block text-sm font-semibold text-gray-700">
                            Nome
                        </label>
                        <input
                            id="product-name"
                            name="name"
                            type="text"
                            minlength="2"
                            required
                            class="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                    </div>

                    <div>
                        <label for="product-description" class="mb-1 block text-sm font-semibold text-gray-700">
                            Descrição
                        </label>
                        <textarea
                            id="product-description"
                            name="description"
                            rows="3"
                            minlength="5"
                            required
                            class="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        ></textarea>
                    </div>

                    <div>
                        <label for="product-price" class="mb-1 block text-sm font-semibold text-gray-700">
                            Preço
                        </label>
                        <input
                            id="product-price"
                            name="price"
                            type="number"
                            min="0.01"
                            step="0.01"
                            required
                            class="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                    </div>

                    <div>
                        <label for="product-image" class="mb-1 block text-sm font-semibold text-gray-700">
                            URL da imagem
                        </label>
                        <input
                            id="product-image"
                            name="image"
                            type="url"
                            placeholder="https://exemplo.com/carro.jpg"
                            required
                            class="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                    </div>

                    <p class="hidden rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" data-form-error></p>

                    <div class="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            class="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50"
                            data-close-modal
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            class="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Salvar carro
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;

    page.appendChild(modal);

    const modalElement = modal.querySelector("[data-product-modal]");
    const form = modal.querySelector("[data-product-form]");
    const formError = modal.querySelector("[data-form-error]");
    const addProductButton = page.querySelector("[data-add-product]");

    function closeModal() {
        modalElement.classList.add("hidden");
        modalElement.classList.remove("flex");
        form.reset();
        formError.classList.add("hidden");
    }

    addProductButton.addEventListener("click", () => {
        modalElement.classList.remove("hidden");
        modalElement.classList.add("flex");
        form.querySelector("input").focus();
    });

    modal.querySelectorAll("[data-close-modal]")
        .forEach(button => button.addEventListener("click", closeModal));

    modalElement.addEventListener("click", event => {
        if (event.target === modalElement) {
            closeModal();
        }
    });

    form.addEventListener("submit", async event => {
        event.preventDefault();
        formError.classList.add("hidden");

        if (!form.reportValidity()) {
            return;
        }

        const formData = new FormData(form);
        const price = Number(formData.get("price"));

        if (!Number.isFinite(price) || price <= 0) {
            formError.textContent = "Informe um preço válido maior que zero.";
            formError.classList.remove("hidden");
            return;
        }

        const currentProducts = await getProducts();
        const product = {
            id: Math.max(...currentProducts.map(item => item.id), 0) + 1,
            name: formData.get("name").trim(),
            description: formData.get("description").trim(),
            price,
            image: formData.get("image").trim()
        };

        addProduct(product);
        productsContainer.appendChild(ProductCard(product));
        closeModal();
    });
 }