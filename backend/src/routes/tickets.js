const express = require('express');
const router = express.Router();
const {
  getAllTickets,
  getTicketById,
  updateTicket,
} = require('../controllers/tickets');

router.get('/', getAllTickets);
router.get('/:id', getTicketById);
router.patch('/:id', updateTicket);

module.exports = router;