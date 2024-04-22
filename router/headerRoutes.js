const express = require('express');
const router = express.Router();
const {
    getAllHeaders,
    getHeaderById,
    createHeader,
    updateHeader,
    deleteHeader
} = require('../controllers/headerInfoController');

router.get('/headers', getAllHeaders);
router.get('/headers/:id', getHeaderById);
router.post('/headers', createHeader);
router.put('/headers/:id', updateHeader);
router.delete('/headers/:id', deleteHeader);

module.exports = router;
