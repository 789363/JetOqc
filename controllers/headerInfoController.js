const HeaderInfo = require('../models/HeaderInfo');

exports.getAllHeaders = async (req, res) => {
    try {
        const headers = await HeaderInfo.findAll();
        res.json(headers);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getHeaderById = async (req, res) => {
    try {
        const header = await HeaderInfo.findByPk(req.params.id);
        if (header) {
            res.json(header);
        } else {
            res.status(404).send('Header not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createHeader = async (req, res) => {
    try {
        const header = await HeaderInfo.create(req.body);
        res.status(201).json(header);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.updateHeader = async (req, res) => {
    try {
        const result = await HeaderInfo.update(req.body, {
            where: { header_id: req.params.id }
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
        const result = await HeaderInfo.destroy({
            where: { header_id: req.params.id }
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
