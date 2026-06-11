const ProdutoRepository = require('../repositories/ProdutoRepository');

class ProdutoService {
    async listarProdutos() {
        const produtos = await ProdutoRepository.findAll();
        return {
            sucesso: true,
            dados: produtos,
            total: produtos.length
        };
    }

    async buscarProdutoPorId(id) {
        if (!id || isNaN(id)) {
            throw { status: 400, mensagem: "ID inválido" };
        }

        const produto = await ProdutoRepository.findById(id);
        if (!produto) {
            throw { status: 404, mensagem: "Produto não encontrado" };
        }

        return {
            sucesso: true,
            dados: produto
        };
    }

   // Método assíncrono responsável pelo cadastro de um produto
async cadastrarProduto(dados) {

    // Extrai os dados recebidos do objeto enviado pelo Controller
    const { nome, descricao, preco, categoria, disponivel, imagem } = dados;

    // Valida se os campos obrigatórios foram preenchidos
    if (!nome || !descricao || preco === undefined || preco === "") {

        // Caso algum campo obrigatório esteja ausente,
        // lança um erro com status HTTP 400 (Bad Request)
        throw {
            status: 400,
            mensagem: "Nome, descrição e preço são obrigatórios"
        };
    }

    // Converte o valor do preço para número decimal
    const precoNumerico = parseFloat(preco);

    // Verifica se o preço é um número válido e maior que zero
    if (isNaN(precoNumerico) || precoNumerico <= 0) {

        // Caso o preço seja inválido, gera uma exceção
        throw {
            status: 400,
            mensagem: "Preço deve ser um número positivo"
        };
    }

    // Cria o objeto que será enviado ao Repository
    const novoProduto = {

        // Remove espaços extras do início e fim do nome
        nome: nome.trim(),

        // Remove espaços extras da descrição
        descricao: descricao.trim(),

        // Armazena o preço convertido para número
        preco: precoNumerico,

        // Define a categoria ou salva null caso não exista
        categoria: categoria || null,

        // Define disponibilidade como true caso nenhum valor seja informado
        disponivel: disponivel ?? true,

        // Armazena o nome da imagem enviada
        imagem
    };

    // Chama o Repository para inserir o produto no banco de dados
    const id = await ProdutoRepository.create(novoProduto);

    // Retorna uma resposta de sucesso para o Controller
    return {
        sucesso: true,
        mensagem: "Produto cadastrado com sucesso",
        id
    };
}

    async atualizarProduto(id, dados) {
        if (!id || isNaN(id)) {
            throw { status: 400, mensagem: "ID inválido" };
        }

        const existe = await ProdutoRepository.findById(id);
        if (!existe) {
            throw { status: 404, mensagem: "Produto não encontrado" };
        }

        const atualizado = {};
        const { nome, descricao, preco, categoria, disponivel } = dados;

        if (nome !== undefined) atualizado.nome = nome.trim();
        if (descricao !== undefined) atualizado.descricao = descricao.trim();
        if (preco !== undefined) {
            if (typeof preco !== "number" || preco <= 0) {
                throw { status: 400, mensagem: "Preço deve ser um número positivo" };
            }
            atualizado.preco = preco;
        }
        if (categoria !== undefined) atualizado.categoria = categoria;
        if (disponivel !== undefined) atualizado.disponivel = disponivel;

        if (Object.keys(atualizado).length === 0) {
            throw { status: 400, mensagem: "Nenhum dado válido enviado para atualização" };
        }

        await ProdutoRepository.update(id, atualizado);

        return {
            sucesso: true,
            mensagem: "Produto atualizado com sucesso"
        };
    }

    async deletarProduto(id) {
        if (!id || isNaN(id)) {
            throw { status: 400, mensagem: "ID inválido" };
        }

        const existe = await ProdutoRepository.findById(id);
        if (!existe) {
            throw { status: 404, mensagem: "Produto não encontrado" };
        }

        await ProdutoRepository.delete(id);

        return {
            sucesso: true,
            mensagem: "Produto apagado com sucesso"
        };
    }
}

module.exports = new ProdutoService();
