import { ItemCarrinho } from "./ItemCarrinho.js";

export class Carrinho {
    constructor() {
        this.itens = [];
        this.tipoEntrega = "retirada";
        this.taxaDelivery = 2.50;
    }

    adicionarItem(produto, quantidade = 1) {
        const itemExistente = this.itens.find(i => i.produto.id === produto.id);
        if (itemExistente) {
            itemExistente.quantidade += quantidade;
        } else {
            this.itens.push(new ItemCarrinho(produto, quantidade));
        }
    }

    alterarQuantidade(produtoId, novaQuantidade) {
        const item = this.itens.find(i => i.produto.id === produtoId);
        if (item) {
            if (novaQuantidade <= 0) {
                this.removerItem(produtoId);
            } else {
                item.quantidade = novaQuantidade;
            }
        }
    }

    removerItem(produtoId) {
        this.itens = this.itens.filter(i => i.produto.id !== produtoId);
    }

    limpar() {
        this.itens = [];
    }

    setTipoEntrega(tipo) {
        this.tipoEntrega = tipo;
    }

    get subtotal() {
        return this.itens.reduce((acc, item) => acc + item.subtotal, 0);
    }

    get taxaEntrega() {
        return this.tipoEntrega === "delivery" ? this.taxaDelivery : 0;
    }

    get total() {
        return this.subtotal + this.taxaEntrega;
    }
}