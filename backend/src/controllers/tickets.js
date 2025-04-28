const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllTickets = async (req, res) => {
  try {
    const tickets = await prisma.ticket.findMany();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
};

const getTicketById = async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: parseInt(id) },
    });
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ticket' });
  }
};

const updateTicket = async (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  
  if (!['open', 'pending', 'done'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const updatedTicket = await prisma.ticket.update({
      where: { id: parseInt(id) },
      data: { status, notes },
    });
    res.json(updatedTicket);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update ticket' });
  }
};

module.exports = {
  getAllTickets,
  getTicketById,
  updateTicket,
};