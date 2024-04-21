const ModuleInfo = require('../models/ModuleInfo'); // 假设你已经在 models 文件夹中定义了这个模型

exports.getAllModules = async (req, res) => {
    try {
        const modules = await ModuleInfo.findAll();
        res.json(modules);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getModule = async (req, res) => {
    try {
        const module = await ModuleInfo.findByPk(req.params.module_id);
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
        res.status(500).send(error.message);
    }
};

exports.updateModule = async (req, res) => {
    try {
        const updated = await ModuleInfo.update(req.body, {
            where: { module_id: req.params.module_id }
        });
        if (updated[0] > 0) {
            res.send('Module updated');
        } else {
            res.status(404).send('Module not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteModule = async (req, res) => {
    try {
        const deleted = await ModuleInfo.destroy({
            where: { module_id: req.params.module_id }
        });
        if (deleted) {
            res.send('Module deleted');
        } else {
            res.status(404).send('Module not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
