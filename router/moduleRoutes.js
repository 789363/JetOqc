const express = require('express');
const router = express.Router();
const {
    getAllModules,
    getModuleById,
    createModule,
    updateModule,
    deleteModule
} = require('../controllers/moduleInfoController');

router.get('/modules', getAllModules);
router.get('/modules/:id', getModuleById);
router.post('/modules', createModule);
router.put('/modules/:id', updateModule);
router.delete('/modules/:id', deleteModule);

module.exports = router;
