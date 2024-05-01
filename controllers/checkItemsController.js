const CheckItems = require('../models/CheckInfo');
const ReasonInfo = require('../models/ReasonInfo');  // 引入ReasonInfo模型
exports.getAllCheckItems = async (req, res) => {
    try {
        const checkItems = await CheckItems.findAll();
        res.json(checkItems);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCheckItemById = async (req, res) => {
    console.log(req.params);
    try {
        const { id } = req.params; // 这里的id现在是指module_id
        const checkItems = await CheckItems.findAll({
            where: { module_id: id }, // 修改查询条件为通过module_id查找
            include: [{
                model: ReasonInfo,
                attributes: ['description']  // 只获取原因的描述
            }]
        });

        if (checkItems.length > 0) {
            // 格式化响应数组
            const formattedCheckItems = checkItems.map(checkItem => ({
                id: checkItem.checkitem_id,
                text: checkItem.description,
                status: "NA",  // 默认值
                reasons: checkItem.ReasonInfos.map(reason => reason.description),
                selectedReason: "NA",  // 默认值
                disabledReason: true,  // 默认值
                checked: false  // 默认值
            }));
            res.json(formattedCheckItems);
        } else {
            res.status(404).send('CheckItems not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createCheckItem = async (req, res) => {
    try {
        const { module_id, checkitem_name, description, is_critical } = req.body;
        console.log(req.body)
        const newCheckItem = await CheckItems.create({ module_id, checkitem_name, description, is_critical });
        res.status(201).json(newCheckItem);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.updateCheckItem = async (req, res) => {
    console.log(req.params);
    console.log(req.body);
    try {
        const { id } = req.params;
        const { description, status, reasons, selectedReason } = req.body;

        // 假设你的数据库模型字段名称是这样的，如果不是，请根据实际情况调整
        const updateData = {
            description: description, // 前端的text映射到数据库的description
            status: status, // 前端的status直接映射到数据库的status
            reasons: JSON.stringify(reasons), // 将数组转换为JSON字符串存储，假设数据库是以JSON字符串形式存储reasons
            selectedReason: selectedReason
        };

        const updated = await CheckItems.update(updateData, {
            where: { checkitem_id: id }
        });

        if (updated[0]) {  // update操作返回一个数组，其中第一个元素是受影响的行数
            const updatedCheckItem = await CheckItems.findByPk(id);
            res.json(updatedCheckItem);
            console.log('suess')
        } else {
            res.status(404).send('CheckItem not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteCheckItem = async (req, res) => {
    const { id } = req.params;
    try {
        // 首先刪除所有相關的理由
        await ReasonInfo.destroy({
            where: { checkitem_id: id }
        });

        // 然後刪除檢查項目
        const deleted = await CheckItems.destroy({
            where: { checkitem_id: id }
        });

        if (deleted) {
            res.status(204).send("CheckItem and related reasons deleted");
        } else {
            res.status(404).send("CheckItem not found");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};