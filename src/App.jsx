import { BrowserRouter, Route, Routes } from 'react-router'
import AppLayout from './AppLayout'
import Details from './pages/Details'
import Home from './pages/Home'
import Watchlist from './pages/Watchlist'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/detalhes/:mediaType/:id" element={<Details />} />
          <Route path="/minha-lista" element={<Watchlist />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
