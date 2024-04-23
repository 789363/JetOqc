const OpInfo = require('../models/OpInfo');

exports.getAllHeaders = async (req, res) => {
    try {
        const Ops = await OpInfo.findAll();
        res.json(Ops);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getHeaderById = async (req, res) => {
    try {
        const Op = await OpInfo.findByPk(req.params.id);
        if (Op) {
            res.json(Op);
        } else {
            res.status(404).send('Header not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createHeader = async (req, res) => {
    try {
        const Op = await OpInfo.create(req.body);
        res.status(201).json(Op);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.updateHeader = async (req, res) => {
    try {
        const result = await OpInfo.update(req.body, {
            where: { Op_id: req.params.id }
        });
        if (result[0] === 1) {
            res.send('Header updated successfully');
        } else {
            res.status(404).send('Header not found');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.deleteHeader = async (req, res) => {
    try {
        const result = await OpInfo.destroy({
            where: { Op_id: req.params.id }
        });
        if (result === 1) {
            res.send('Header deleted successfully');
        } else {
            res.status(404).send('Header not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
