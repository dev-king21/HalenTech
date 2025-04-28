import { Link } from 'react-router-dom';

export default function TicketCard({ ticket }) {
  return (
    <Link
      to={`/tickets/${ticket.id}`}
      className="block p-4 border rounded-lg hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-center">
        <h2 className="font-medium">{ticket.customerName}</h2>
        <span className={`px-2 py-1 text-xs rounded-full ${
          ticket.status === 'open' ? 'bg-blue-100 text-blue-800' :
          ticket.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {ticket.status}
        </span>
      </div>
      <p className="text-gray-600 text-sm mt-1">{ticket.email}</p>
      <p className="text-gray-500 text-xs mt-2">
        Created: {new Date(ticket.createdAt).toLocaleString()}
      </p>
    </Link>
  );
}