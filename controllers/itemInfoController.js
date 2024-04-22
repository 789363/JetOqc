const ItemInfo = require('../models/ItemInfo');

exports.getAllItems = async (req, res) => {
    try {
        const items = await ItemInfo.findAll();
        res.json(items);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getItemById = async (req, res) => {
    try {
        const item = await ItemInfo.findByPk(req.params.id);
        if (item) {
            res.json(item);
        } else {
            res.status(404).send('Item not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createItem = async (req, res) => {
    try {
        const item = await ItemInfo.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.updateItem = async (req, res) => {
    try {
        const result = await ItemInfo.update(req.body, {
            where: { item_id: req.params.id }
        });
        if (result[0] === 1) {
            res.send('Item updated successfully');
        } else {
            res.status(404).send('Item not found');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const result = await ItemInfo.destroy({
            where: { item_id: req.params.id }
        });
        if (result === 1) {
            res.send('Item deleted successfully');
        } else {
            res.status(404).send('Item not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
