import { Navbar } from "../components/navbar.js";

export function Cart(carrinho, gerenciador) {
    const page = document.createElement("div");
    page.appendChild(Navbar());

    const main = document.createElement("main");
    main.className = "min-h-screen bg-gray-50 py-8 px-6 max-w-4xl mx-auto";

    function renderCart() {
        main.innerHTML = `
            <h1 class="text-3xl font-extrabold text-gray-900 mb-6">Seu Carrinho de Compras</h1>
        `;

        if (carrinho?.itens.length === 0) {
            main.innerHTML += `
                <div class="bg-white rounded-xl p-8 text-center shadow-sm">
                    <p class="text-gray-500 text-lg">Seu carrinho está vazio.</p>
                    <a href="/" data-link class="inline-block mt-4 text-emerald-600 font-semibold hover:underline">
                        Ir para o Cardápio
                    </a>
                </div>
            `;
            return;
        }

        const itemsContainer = document.createElement("div");
        itemsContainer.className = "space-y-4 mb-6";

        carrinho.itens.forEach(item => {
            const itemElement = document.createElement("div");
            itemElement.className = "bg-white p-4 rounded-xl shadow-sm flex items-center justify-between gap-4";
            itemElement.innerHTML = `
                <div class="flex items-center gap-4">
                    <img src="${item.produto.imagem}" alt="${item.produto.nome}" class="w-16 h-16 object-cover rounded-lg"/>
                    <div>
                        <h3 class="font-bold text-gray-900">${item.produto.nome}</h3>
                        <p class="text-sm text-gray-500">R$ ${item.produto.preco.toFixed(2)} cada</p>
                    </div>
                </div>
                <div class="flex items-center gap-6">
                    <div class="flex items-center border rounded-lg overflow-hidden">
                        <button data-dec="${item.produto.id}" class="px-3 py-1 bg-gray-100 hover:bg-gray-200 font-bold">-</button>
                        <span class="px-4 py-1 text-sm font-semibold">${item.quantidade}</span>
                        <button data-inc="${item.produto.id}" class="px-3 py-1 bg-gray-100 hover:bg-gray-200 font-bold">+</button>
                    </div>
                    <span class="font-bold text-gray-900 w-20 text-right">R$ ${item.subtotal.toFixed(2)}</span>
                    <button data-remove="${item.produto.id}" class="text-red-500 hover:text-red-700 font-bold">🗑️</button>
                </div>
            `;

            itemElement.querySelector("[data-dec]").addEventListener("click", () => {
                carrinho.alterarQuantidade(item.produto.id, item.quantidade - 1);
                renderCart();
            });

            itemElement.querySelector("[data-inc]").addEventListener("click", () => {
                carrinho.alterarQuantidade(item.produto.id, item.quantidade + 1);
                renderCart();
            });

            itemElement.querySelector("[data-remove]").addEventListener("click", () => {
                carrinho.removerItem(item.produto.id);
                renderCart();
            });

            itemsContainer.appendChild(itemElement);
        });

        const summary = document.createElement("div");
        summary.className = "bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4";
        summary.innerHTML = `
            <h2 class="text-xl font-bold text-gray-900">Opções de Entrega</h2>
            <div class="flex gap-4 my-2">
                <label class="flex items-center gap-2 cursor-pointer border p-3 rounded-lg flex-1 ${carrinho.tipoEntrega === 'retirada' ? 'border-emerald-600 bg-emerald-50' : ''}">
                    <input type="radio" name="tipoEntrega" value="retirada" ${carrinho.tipoEntrega === 'retirada' ? 'checked' : ''}/>
                    <div>
                        <p class="font-semibold text-sm">Retirada no Local</p>
                        <p class="text-xs text-gray-500">Sem taxa adicional</p>
                    </div>
                </label>
                <label class="flex items-center gap-2 cursor-pointer border p-3 rounded-lg flex-1 ${carrinho.tipoEntrega === 'delivery' ? 'border-emerald-600 bg-emerald-50' : ''}">
                    <input type="radio" name="tipoEntrega" value="delivery" ${carrinho.tipoEntrega === 'delivery' ? 'checked' : ''}/>
                    <div>
                        <p class="font-semibold text-sm">Entrega / Delivery</p>
                        <p class="text-xs text-gray-500">Taxa fixada em R$ 2,50</p>
                    </div>
                </label>
            </div>

            <div class="border-t pt-4 space-y-2 text-sm">
                <div class="flex justify-between">
                    <span>Subtotal:</span>
                    <span>R$ ${carrinho.subtotal.toFixed(2)}</span>
                </div>
                <div class="flex justify-between">
                    <span>Taxa de Entrega:</span>
                    <span>R$ ${carrinho.taxaEntrega.toFixed(2)}</span>
                </div>
                <div class="flex justify-between text-lg font-bold border-t pt-2 text-gray-900">
                    <span>Total Final:</span>
                    <span>R$ ${carrinho.total.toFixed(2)}</span>
                </div>
            </div>

            <form id="checkout-form" class="mt-4 space-y-3">
                <input type="text" id="cliente-nome" placeholder="Seu nome completo" required class="w-full border rounded-lg p-2.5 text-sm"/>
                <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg shadow transition">
                    Finalizar Pedido
                </button>
            </form>
        `;

        summary.querySelectorAll("input[name='tipoEntrega']").forEach(radio => {
            radio.addEventListener("change", (e) => {
                carrinho.setTipoEntrega(e.target.value);
                renderCart();
            });
        });

        summary.querySelector("#checkout-form").addEventListener("submit", (e) => {
            e.preventDefault();
            const clienteNome = summary.querySelector("#cliente-nome").value;
            const novoPedido = gerenciador.criarPedido(carrinho, clienteNome);
            
            carrinho.limpar();
            alert(`Pedido #${novoPedido.id} realizado com sucesso para ${clienteNome}!`);
        });

        main.appendChild(itemsContainer);
        main.appendChild(summary);
    }

    renderCart();
    page.appendChild(main);
    return page;
}