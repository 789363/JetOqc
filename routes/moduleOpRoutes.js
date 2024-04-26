const express = require('express');
const router = express.Router();
const {
    getAllModuleOps,
    getModuleOpById,
    createModuleOp,
    updateModuleOp,
    deleteModuleOp
} = require('../controllers/moduleOpController');

router.get('/', getAllModuleOps);
router.get('/:id', getModuleOpById);
router.post('/', createModuleOp);
router.put('/:id', updateModuleOp);
router.delete('/:id', deleteModuleOp);

module.exports = router;
