import { Routes, Route } from 'react-router-dom'
import ListingPage from './pages/ListingPage'
import DetailPage from './pages/DetailPage'
import FeedbackWidget from './components/FeedbackWidget'
import ThemeFooter from './components/ThemeFooter'
import { useAppState } from './context/AppStateContext'

export default function App() {
  const { activeTheme } = useAppState()
  return (
    <>
      <Routes key={activeTheme.id}>
        <Route path="/" element={<ListingPage />} />
        <Route path="/day/:dayId" element={<DetailPage />} />
      </Routes>
      <ThemeFooter />
      <FeedbackWidget />
    </>
  )
}
