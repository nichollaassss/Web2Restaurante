import { Navbar } from "../components/navbar.js";
import { Carousel } from "../components/carousel.js";
import { AddEditProductModal } from "../modals/add-product-modal.js";
import { GerenciadorProdutos } from "../managers/GerenciadorProdutos.js";
import { addToCart } from "../services/cart-service.js";

export async function Shop(gerenciador = new GerenciadorProdutos(), carrinho = null) {
    const page = document.createElement("div");

    page.appendChild(Navbar());

    const main = document.createElement("main");
    main.className = "min-h-screen bg-gray-50 py-8 px-6 max-w-7xl mx-auto";
    page.appendChild(main);

    await gerenciador.inicializarProdutos();

    function renderPage() {
        main.innerHTML = `
            <div id="toast" class="hidden fixed bottom-5 right-5 bg-emerald-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 transition-all font-semibold">
                Item adicionado ao carrinho!
            </div>

            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 class="text-3xl font-extrabold text-gray-900">Cardápio do Restaurante</h1>
                    <p class="text-gray-500">Escolha suas marmitas e pratos favoritos</p>
                </div>
                <button id="btn-novo-produto" class="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2.5 rounded-lg shadow transition flex items-center gap-2">
                    <span class="text-lg">+</span> Cadastrar Prato
                </button>
            </div>
        `;

        const produtos = gerenciador.obterProdutos();

        main.appendChild(Carousel(produtos, (produto) => {
            adicionarAoCarrinho(produto);
            exibirToast(`"${produto.nome}" foi adicionado ao carrinho!`);
        }));

        const grid = document.createElement("div");
        grid.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

        produtos.forEach(produto => {
            const card = document.createElement("div");
            card.className = "bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition";
            card.innerHTML = `
                <div>
                    <img src="${produto.imagem}" alt="${produto.nome}" class="w-full h-48 object-cover"/>
                    <div class="p-5">
                        <span class="text-xs font-bold text-emerald-600 uppercase tracking-wide px-2 py-0.5 bg-emerald-50 rounded">${produto.categoria || "Geral"}</span>
                        <h3 class="text-xl font-bold text-gray-900 mt-2">${produto.nome}</h3>
                        <p class="text-gray-600 text-sm mt-1 line-clamp-2">${produto.descricao}</p>
                    </div>
                </div>
                <div class="p-5 pt-0 flex items-center justify-between mt-4">
                    <span class="text-2xl font-black text-gray-900">R$ ${Number(produto.preco).toFixed(2)}</span>
                    <div class="flex items-center gap-1">
                        <button data-edit="${produto.id}" title="Editar" class="p-2 text-gray-400 hover:text-blue-600 rounded transition">✏️</button>
                        <button data-delete="${produto.id}" title="Remover" class="p-2 text-gray-400 hover:text-red-600 rounded transition">🗑️</button>
                        <button data-add="${produto.id}" class="ml-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-lg text-sm font-bold shadow-sm transition">
                            Adicionar
                        </button>
                    </div>
                </div>
            `;

            card.querySelector("[data-add]").addEventListener("click", () => {
                adicionarAoCarrinho(produto);
                exibirToast(`"${produto.nome}" foi adicionado!`);
            });

            card.querySelector("[data-edit]").addEventListener("click", () => {
                AddEditProductModal(main, produto, (dadosAtualizados) => {
                    gerenciador.atualizarProduto(produto.id, dadosAtualizados);
                    renderPage();
                });
            });

            card.querySelector("[data-delete]").addEventListener("click", () => {
                if (confirm(`Tem certeza que deseja remover o prato "${produto.nome}" do cardápio?`)) {
                    gerenciador.deletarProduto(produto.id);
                    renderPage();
                }
            });

            grid.appendChild(card);
        });

        main.appendChild(grid);

        main.querySelector("#btn-novo-produto").addEventListener("click", () => {
            AddEditProductModal(main, null, (novoProduto) => {
                gerenciador.criarProduto(novoProduto);
                renderPage();
            });
        });
    }

    function exibirToast(msg) {
        const toast = main.querySelector("#toast");
        if (toast) {
            toast.textContent = msg;
            toast.classList.remove("hidden");
            setTimeout(() => toast.classList.add("hidden"), 3000);
        }
    }

    function adicionarAoCarrinho(produto) {
        if (carrinho?.adicionarItem) {
            carrinho.adicionarItem(produto);
            return;
        }

        addToCart({
            id: produto.id,
            name: produto.nome,
            description: produto.descricao,
            price: Number(produto.preco),
            image: produto.imagem
        });
    }

    renderPage();
    return page;
}