export class GerenciadorRestaurante {
    constructor() {
        this.produtos = [];
        this.pedidos = this.carregarPedidos();
    }

    async inicializarProdutos() {
        try {
            const response = await fetch("/src/data/products.json");
            const produtosJson = response.ok ? await response.json() : [];
            
            const customizados = JSON.parse(localStorage.getItem("restaurante_produtos") || "[]");
            const todos = [...produtosJson, ...customizados];
            this.produtos = todos.map(p => new Produto(p));
        } catch (error) {
            console.error("Erro ao carregar o arquivo products.json:", error);
            const customizados = JSON.parse(localStorage.getItem("restaurante_produtos") || "[]");
            this.produtos = customizados.map(p => new Produto(p));
        }
    }

    salvarProdutosCustomizados() {
        localStorage.setItem("restaurante_produtos_modificados", JSON.stringify(this.produtos));
    }
}