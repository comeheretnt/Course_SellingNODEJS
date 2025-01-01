const express = require('express');
const router = express.Router();
const {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment
} = require('../controllers/payment.controller');

router
    .route('/')
    .post(createPayment)
    .get(getAllPayments);

router
    .route('/:id')
    .get(getPaymentById)
    .put(updatePayment)
    .delete(deletePayment);

module.exports = router;