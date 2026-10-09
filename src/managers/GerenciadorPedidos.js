import { Pedido } from "../models/Pedido.js";

export class GerenciadorPedidos {

    constructor() {
        this.pedidos = this.carregarPedidos();
    }

    carregarPedidos() {
        const dados = localStorage.getItem("restaurante_pedidos");
        return dados ? JSON.parse(dados).map(p => new Pedido(p)) : [];
    }

    salvarPedidos() {
        localStorage.setItem("restaurante_pedidos", JSON.stringify(this.pedidos));
    }

    criarPedido(carrinho, cliente) {
        const novoId = this.pedidos.length > 0 ? Math.max(...this.pedidos.map(p => p.id)) + 1 : 1001;
        const novoPedido = new Pedido({
            id: novoId,
            cliente,
            itens: carrinho.itens.map(item => ({
                produtoNome: item.produto.nome,
                precoUnitario: item.produto.preco,
                quantidade: item.quantidade,
                subtotal: item.subtotal
            })),
            tipoEntrega: carrinho.tipoEntrega,
            taxaEntrega: carrinho.taxaEntrega,
            total: carrinho.total
        });

        this.pedidos.push(novoPedido);
        this.salvarPedidos();
        return novoPedido;
    }
}