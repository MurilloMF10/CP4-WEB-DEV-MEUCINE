import { useState } from 'react'
import MovieCard from '../components/MovieCard'

const STORAGE_KEY = 'meu-cine:watchlist'

export default function Watchlist() {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    } catch {
      return []
    }
  })

  return (
    <main className="page-shell">
      <section className="page-heading compact"><p className="eyebrow">ACOMPANHAMENTO</p><h1>Minha Lista</h1><p>{items.length ? `${items.length} título(s) salvo(s) para assistir depois.` : 'Seu próximo título pode começar aqui.'}</p></section>
      {items.length ? <section className="movie-grid" aria-label="Minha lista de títulos">{items.map((item) => <MovieCard key={`${item.mediaType || item.type}-${item.id}`} item={item} onWatchlistChange={setItems} />)}</section> : <section className="empty-state"><p>Você ainda não adicionou títulos à sua lista.</p></section>}
    </main>
  )
}
