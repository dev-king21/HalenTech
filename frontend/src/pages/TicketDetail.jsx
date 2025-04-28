import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TicketForm from '../components/TicketForm';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await api.get(`/api/tickets/${id}`);
        setTicket(res.data);
      } catch (err) {
        console.error("Error fetching ticket:", err);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, [id, navigate]);

  const handleUpdate = async (updatedData) => {
    try {
      const res = await axios.patch(`/api/tickets/${id}`, updatedData);
      setTicket(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating ticket:", err);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!ticket) return <div className="text-center py-8">Ticket not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Ticket Details</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {isEditing ? (
        <TicketForm initialData={ticket} onSubmit={handleUpdate} />
      ) : (
        <div className="space-y-4">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold">{ticket.customerName}</h2>
            <p className="text-gray-600">{ticket.email}</p>
            <div className="mt-4">
              <span className={`px-2 py-1 text-xs rounded-full ${
                ticket.status === 'open' ? 'bg-blue-100 text-blue-800' :
                ticket.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {ticket.status}
              </span>
              <p className="mt-2 text-gray-500 text-sm">
                Created: {new Date(ticket.createdAt).toLocaleString()}
              </p>
            </div>
            {ticket.notes && (
              <div className="mt-4">
                <h3 className="font-medium text-gray-700">Notes</h3>
                <p className="mt-1 text-gray-600 whitespace-pre-wrap">{ticket.notes}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}