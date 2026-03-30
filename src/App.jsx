import { Routes, Route } from 'react-router-dom'
import ListingPage from './pages/ListingPage'
import DetailPage from './pages/DetailPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ListingPage />} />
      <Route path="/day/:dayId" element={<DetailPage />} />
    </Routes>
  )
}
