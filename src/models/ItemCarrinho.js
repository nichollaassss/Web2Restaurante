export class ItemCarrinho {
    constructor(produto, quantidade = 1) {
        this.produto = produto;
        this.quantidade = quantidade;
    }

    get subtotal() {
        return this.produto.preco * this.quantidade;
    }
}