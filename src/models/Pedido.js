export class Pedido {
    constructor({ id, cliente, itens, tipoEntrega, taxaEntrega, total, status = "Realizado", data = new Date().toLocaleString("pt-BR") }) {
        this.id = id;
        this.cliente = cliente;
        this.itens = itens;
        this.tipoEntrega = tipoEntrega;
        this.taxaEntrega = taxaEntrega;
        this.total = total;
        this.status = status;
        this.data = data;
    }
}