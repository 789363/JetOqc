const ModuleInfo = require('./models/ModuleInfo');
const HeaderInfo = require('./models/HeaderInfo');
const MachineInfo = require('./models/MachineInfo');
const LineInfo = require('./models/LineInfo');
const ItemInfo = require('./models/ItemInfo');
const ResultInfo = require('./models/ResultInfo');

function applyAssociations(sequelize) {
    HeaderInfo.hasMany(ModuleInfo, { foreignKey: 'header_id' });
    ModuleInfo.belongsTo(HeaderInfo, { foreignKey: 'header_id' });

    LineInfo.hasMany(HeaderInfo, { foreignKey: 'line_id' });
    HeaderInfo.belongsTo(LineInfo, { foreignKey: 'line_id' });

    MachineInfo.hasMany(HeaderInfo, { foreignKey: 'machine_id' });
    HeaderInfo.belongsTo(MachineInfo, { foreignKey: 'machine_id' });

    ResultInfo.hasMany(ItemInfo, { foreignKey: 'result_id' });
    ItemInfo.belongsTo(ResultInfo, { foreignKey: 'result_id' });
}

module.exports = applyAssociations;
