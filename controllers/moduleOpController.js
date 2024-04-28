const {ModuleOp} = require('../models/ModuleOp');

// 获取所有 ModuleOp 关系
exports.getAllModuleOps = async (req, res) => {
    try {
        const moduleOps = await ModuleOp.findAll();
        res.json(moduleOps);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// 获取特定 ModuleOp
exports.getModuleOpById = async (req, res) => {
    try {
        const moduleOp = await ModuleOp.findByPk(req.params.id);
        if (moduleOp) {
            res.json(moduleOp);
        } else {
            res.status(404).send('Module-Op relationship not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// 创建新的 ModuleOp
exports.createModuleOp = async (req, res) => {
    try {
        const moduleOp = await ModuleOp.create(req.body);
        res.status(201).json(moduleOp);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// 更新 ModuleOp
exports.updateModuleOp = async (req, res) => {
    try {
        const { id } = req.params;
        const [ updated ] = await ModuleOp.update(req.body, { where: { id } });
        if (updated) {
            const updatedModuleOp = await ModuleOp.findByPk(id);
            res.status(200).json(updatedModuleOp);
        } else {
            res.status(404).send('Module-Op relationship not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// 删除 ModuleOp
exports.deleteModuleOp = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await ModuleOp.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send("Module-Op relationship deleted");
        } else {
            res.status(404).send("Module-Op relationship not found");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
