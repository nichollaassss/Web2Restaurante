export function Carousel(produtos, onAddToCart) {
    const container = document.createElement("section");
    container.className = "relative max-w-5xl mx-auto mb-12 overflow-hidden rounded-2xl shadow-lg bg-gray-900 text-white";

    let currentIndex = 0;

    if (!produtos || produtos.length === 0) {
        container.innerHTML = `<p class="p-8 text-center text-gray-400">Nenhum prato em destaque.</p>`;
        return container;
    }

    container.innerHTML = `
        <div class="relative h-80 sm:h-96 w-full">
            <div id="carousel-slides" class="flex transition-transform duration-500 ease-in-out h-full" style="transform: translateX(0%);">
                ${produtos.map(p => `
                    <div class="w-full flex-shrink-0 h-full relative">
                        <img src="${p.imagem}" alt="${p.nome}" class="w-full h-full object-cover opacity-60" />
                        <div class="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                            <span class="bg-amber-500 text-xs font-bold uppercase tracking-wider px-2 py-1 rounded text-black">${p.categoria}</span>
                            <h2 class="text-3xl font-extrabold mt-1">${p.nome}</h2>
                            <p class="text-gray-200 text-sm mt-1 max-w-md">${p.descricao}</p>
                            <div class="mt-3 flex items-center justify-between">
                                <span class="text-2xl font-black text-amber-400">R$ ${p.preco.toFixed(2)}</span>
                                <button data-add-carousel="${p.id}" class="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold px-4 py-2 rounded-lg transition">
                                    Adicionar ao Pedido
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <!-- Botões IHC de Controle -->
            <button id="prev-slide" class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition" aria-label="Anterior">
                &#10094;
            </button>
            <button id="next-slide" class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition" aria-label="Próximo">
                &#10095;
            </button>
        </div>
    `;

    const slides = container.querySelector("#carousel-slides");

    function updateCarousel() {
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    container.querySelector("#prev-slide").addEventListener("click", () => {
        currentIndex = (currentIndex === 0) ? produtos.length - 1 : currentIndex - 1;
        updateCarousel();
    });

    container.querySelector("#next-slide").addEventListener("click", () => {
        currentIndex = (currentIndex === produtos.length - 1) ? 0 : currentIndex + 1;
        updateCarousel();
    });

    container.querySelectorAll("[data-add-carousel]").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const prodId = Number(e.target.dataset.addCarousel);
            const produto = produtos.find(p => p.id === prodId);
            if (produto) onAddToCart(produto);
        });
    });
    setInterval(() => {
        currentIndex = (currentIndex === produtos.length - 1) ? 0 : currentIndex + 1;
        updateCarousel();
    }, 5000);

    return container;
}