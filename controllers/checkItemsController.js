const CheckItems = require('../models/CheckItems');

exports.getAllCheckItems = async (req, res) => {
    try {
        const checkItems = await CheckItems.findAll();
        res.json(checkItems);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCheckItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const checkItem = await CheckItems.findByPk(id);
        if (checkItem) {
            res.json(checkItem);
        } else {
            res.status(404).send('CheckItem not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createCheckItem = async (req, res) => {
    try {
        const { module_id, checkitem_name, description, is_critical } = req.body;
        const newCheckItem = await CheckItems.create({ module_id, checkitem_name, description, is_critical });
        res.status(201).json(newCheckItem);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.updateCheckItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { module_id, checkitem_name, description, is_critical } = req.body;
        const updated = await CheckItems.update({ module_id, checkitem_name, description, is_critical }, {
            where: { checkitem_id: id }
        });
        if (updated) {
            const updatedCheckItem = await CheckItems.findByPk(id);
            res.json(updatedCheckItem);
        } else {
            res.status(404).send('CheckItem not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteCheckItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await CheckItems.destroy({
            where: { checkitem_id: id }
        });
        if (deleted) {
            res.status(204).send("CheckItem deleted");
        } else {
            res.status(404).send("CheckItem not found");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
