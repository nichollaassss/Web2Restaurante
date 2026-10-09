export class Produto {
    constructor({ id, nome, descricao, preco, categoria, imagem }) {
        this.id = Number(id);
        this.nome = nome;
        this.descricao = descricao;
        this.preco = parseFloat(preco);
        this.categoria = categoria;
        this.imagem = imagem;
    }

    atualizar({ nome, descricao, preco, categoria, imagem }) {
        if (nome) this.nome = nome;
        if (descricao) this.descricao = descricao;
        if (preco !== undefined) this.preco = parseFloat(preco);
        if (categoria) this.categoria = categoria;
        if (imagem) this.imagem = imagem;
    }
}