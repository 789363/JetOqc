const ModuleInfo = require('../models/ModuleInfo'); // 确保正确设置模型路径
const CheckItems = require('../models/CheckInfo'); // 引入CheckItems模型
const ItemInfo = require('../models/ItemInfo'); // 引入ItemInfo模型
exports.getAllModules = async (req, res) => {
    try {
        const modules = await ModuleInfo.findAll();
        res.json(modules);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getModuleById = async (req, res) => {
    try {
        const module = await ModuleInfo.findByPk(req.params.id, {
            include: [{
                model: CheckItems, // 添加CheckItems到查询中
                as: 'checkItems' // 这个'as'是可选的，取决于你在模型关联中如何命名
            }, {
                model: ItemInfo, // 添加ItemInfo到查询中
                as: 'items' // 这个'as'是可选的，同上
            }]
        });
        if (module) {
            res.json(module);
        } else {
            res.status(404).send('Module not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createModule = async (req, res) => {
    try {
        const module = await ModuleInfo.create(req.body);
        res.status(201).json(module);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.updateModule = async (req, res) => {
    try {
        const result = await ModuleInfo.update(req.body, {
            where: { module_id: req.params.id }
        });
        if (result[0] === 1) {
            res.send('Module updated successfully');
        } else {
            res.status(404).send('Module not found');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.deleteModule = async (req, res) => {
    try {
        const result = await ModuleInfo.destroy({
            where: { module_id: req.params.id }
        });
        if (result === 1) {
            res.send('Module deleted successfully');
        } else {
            res.status(404).send('Module not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
