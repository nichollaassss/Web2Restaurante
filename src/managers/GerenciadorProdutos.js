import { Produto } from "../models/Produto.js";

const PRODUCTS_KEY = "restaurante_produtos_modificados";

export class GerenciadorProdutos {

    constructor() {
        this.produtos = [];
    }

    async inicializarProdutos() {
        let produtosBase = [];

        try {
            const response = await fetch("/src/data/products.json");
            if (!response.ok) {
                throw new Error("Não foi possível carregar os produtos.");
            }
            produtosBase = await response.json();
        } catch (error) {
            console.error("Erro ao carregar os produtos:", error);
        }

        const produtosSalvos = this.carregarProdutosSalvos(produtosBase);
        const produtos = produtosSalvos ?? produtosBase;
        this.produtos = produtos.map(produto => new Produto(produto));
    }

    carregarProdutosSalvos(produtosBase) {
        try {
            const dadosSalvos = localStorage.getItem(PRODUCTS_KEY);
            if (dadosSalvos !== null) {
                return JSON.parse(dadosSalvos);
            }

            const produtosLegados = localStorage.getItem("restaurante_produtos");
            return produtosLegados
                ? [...produtosBase, ...JSON.parse(produtosLegados)]
                : null;
        } catch (error) {
            console.error("Erro ao carregar produtos salvos:", error);
            return null;
        }
    }

    salvarProdutosCustomizados() {
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(this.produtos));
    }

    criarProduto(dadosProduto) {
        const novoId = this.produtos.length > 0 ? Math.max(...this.produtos.map(p => p.id)) + 1 : 1;
        const novoProduto = new Produto({ ...dadosProduto, id: novoId });
        this.produtos.push(novoProduto);
        this.salvarProdutosCustomizados();
        return novoProduto;
    }

    obterProdutos() {
        return this.produtos;
    }

    atualizarProduto(id, novosDados) {
        const produto = this.produtos.find(p => p.id === Number(id));
        if (produto) {
            produto.atualizar(novosDados);
            this.salvarProdutosCustomizados();
        }
        return produto;
    }

    deletarProduto(id) {
        this.produtos = this.produtos.filter(p => p.id !== Number(id));
        this.salvarProdutosCustomizados();
    }
}