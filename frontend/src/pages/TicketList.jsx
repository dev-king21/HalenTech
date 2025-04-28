import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TicketCard from '../components/TicketCard';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await api.get('/api/tickets');
        setTickets(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setError(err.message);
        setTickets([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         ticket.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Onboarding Tickets</h1>
      
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            placeholder="Search by name or email..."
            className="px-4 py-2 border rounded w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search tickets"
          />
        </div>
        <div>
          <select
            className="px-4 py-2 border rounded w-full"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="pending">Pending</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="p-4 mb-4 text-red-600 bg-red-50 rounded">
          Error loading tickets: {error}
        </div>
      )}

      {!loading && !error && filteredTickets.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {tickets.length === 0 ? 'No tickets found' : 'No matching tickets found'}
        </div>
      )}

      {!loading && !error && filteredTickets.length > 0 && (
        <div className="grid gap-4">
          {filteredTickets.map(ticket => (
            <TicketCard 
              key={ticket.id} 
              ticket={ticket}
            />
          ))}
        </div>
      )}

      <div className="mt-8">
        <Link
          to="/tickets/new"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 inline-block"
        >
          + Add New Ticket
        </Link>
      </div>
    </div>
  );
}