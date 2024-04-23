const express = require('express');
const router = express.Router();
const {
    getAllOps,
    getOpById,
    createOp,
    updateOp,
    deleteOp
} = require('../controllers/OpInfoController');

router.get('/headers', getAllOps);
router.get('/headers/:id', getOpById);
router.post('/headers', createOp);
router.put('/headers/:id', updateOp);
router.delete('/headers/:id', deleteOp);

module.exports = router;
