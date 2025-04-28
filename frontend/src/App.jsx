import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TicketList from './pages/TicketList'
import TicketDetail from './pages/TicketDetail'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<TicketList />} />
          <Route path="/tickets/:id" element={<TicketDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}