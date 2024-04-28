const { ModuleInfo, ItemInfo, OpInfo } = require('../models/index');
const CheckItems = require('../models/CheckInfo'); // 引入CheckItems模型

exports.getSetModule = async (req, res) => {
    const opId = req.params.id; // 从路由参数中获取op_id
    try {
      const modules = await ModuleInfo.findAll({
        include: [{
          model: OpInfo,
          attributes: ['op_id'], // 获取操作人员ID
          through: {
            attributes: []
          }
        }]
      });
  
      // 筛选当前操作人员可以编辑的模块
      const filteredModules = modules.filter(module =>
        module.OpInfos.some(op => op.op_id.toString() === opId)
      );
  
      // 格式化输出，使其与getAllModules的输出格式一致
      const result = filteredModules.map(module => ({
        modelId: module.module_id,
        modelName: module.module_name,
        canEditOPID: module.OpInfos.map(op => op.op_id) // 包含所有可以编辑此模块的操作人员ID
      }));
  
      res.json(result);
    } catch (error) {
      console.error('Error fetching modules by op ID:', error);
      res.status(500).send('Internal Server Error');
    }
  };

exports.getAllModules = async (req, res) => {
    try {
        const modules = await ModuleInfo.findAll();
        res.json(modules);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getAllSetModules = async (req, res) => {
    try {
        const modules = await ModuleInfo.findAll({
          include: [{
            model: OpInfo,
            attributes: ['op_id'], // 只獲取 op_id
            through: {
              attributes: [] // 不從中間表返回任何額外字段
            }
          }]
        });
    
        // 轉換數據以符合前端需要的格式
        const result = modules.map(module => ({
          modelId: module.module_id,
          modelName: module.module_name,
          canEditOPID: module.OpInfos.map(op => op.op_id)  // 注意這裡使用的是關聯後的屬性名稱
        }));
    
        res.json(result);
      } catch (error) {
        console.error('Error fetching modules:', error);
        res.status(500).send('Internal Server Error');
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
