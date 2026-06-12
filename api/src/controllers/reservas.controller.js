const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {

    const data = {
        ...req.body,
        data_entrada: new Date(req.body.data_entrada),
        data_saida: req.body.data_saida
            ? new Date(req.body.data_saida)
            : null
    };

    const item = await prisma.reservas.create({
        data
    });

    res.status(201).json(item);
};

const listar = async (req, res) => {
    const lista = await prisma.reservas.findMany();

    res.json(lista).status(200).end();
};

const buscar = async (req, res) => {
    const { id } = req.params;
    
    const item = await prisma.reservas.findUnique({
        where: { id : Number(id) }
    });

    res.json(item).status(200).end();
};

const atualizar = async (req, res) => {

    const { id } = req.params;

    const dados = {
        ...req.body,
        data_entrada: new Date(req.body.data_entrada),
        data_saida: req.body.data_saida
            ? new Date(req.body.data_saida)
            : null
    };

    const item = await prisma.reservas.update({
        where: {
            id: Number(id)
        },
        data: dados
    });

    res.status(200).json(item);
};

const excluir = async (req, res) => {
    const { id } = req.params;
    
    const item = await prisma.reservas.delete({
        where: { id : Number(id) }
    });

    res.json(item).status(200).end();
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
}
