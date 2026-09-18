import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import ApiWarning from '../components/ApiWarning'
import MovieCard from '../components/MovieCard'
import { genres, getOfflineSections, mockData } from '../data/mockData'

const apiBase = 'https://api.themoviedb.org/3'
const imageUrl = (path) => path ? `https://image.tmdb.org/t/p/w500${path}` : 'https://placehold.co/500x750/242424/f5c518?text=SEM+CAPA'
const typeLabel = (mediaType) => mediaType === 'tv' ? 'Série' : 'Filme'
const normalizeTmdb = (item, fallbackType = 'movie') => {
  const mediaType = item.media_type === 'tv' || item.name ? 'tv' : item.media_type === 'movie' ? 'movie' : fallbackType
  return { id: item.id, mediaType, title: item.title || item.name, type: typeLabel(mediaType), year: (item.release_date || item.first_air_date || '').slice(0, 4) || '—', rating: Number(item.vote_average || 0).toFixed(1), runtime: 'Consulte detalhes', genres: (item.genre_ids || []).map((id) => ({ id, name: genres[id] || 'Outro' })), overview: item.overview || 'Sinopse não disponível.', poster: imageUrl(item.poster_path), providers: ['Consulte disponibilidade'] }
}

const sections = [
  { key: 'trending', title: 'Lançamentos da Semana', endpoint: '/trending/all/week', mediaType: 'movie' },
  { key: 'movies', title: 'Filmes do Ano', endpoint: '/discover/movie?primary_release_year=2026&sort_by=popularity.desc', mediaType: 'movie' },
  { key: 'tv', title: 'Séries em Destaque', endpoint: '/tv/popular', mediaType: 'tv' },
  { key: 'action', title: 'Ação e Aventura', endpoint: '/discover/movie?with_genres=28', mediaType: 'movie' },
  { key: 'comedy', title: 'Comédia e Outros Gêneros', endpoint: '/discover/movie?with_genres=35', mediaType: 'movie' },
]

export default function Home() {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')?.trim() || ''
  const selectedGenre = searchParams.get('genre') || ''
  const [catalogSections, setCatalogSections] = useState(getOfflineSections)
  const [isOffline, setIsOffline] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    const apiKey = import.meta.env.VITE_TMDB_API_KEY

    async function loadCatalog() {  
      setLoading(true)
      setIsOffline(false)
      try {
        if (!apiKey || apiKey === 'sua_chave_aqui') throw new Error('Chave TMDB ausente')
        if (searchQuery) {
          const response = await fetch(`${apiBase}/search/multi?api_key=${apiKey}&language=pt-BR&query=${encodeURIComponent(searchQuery)}`, { signal: controller.signal })
          if (!response.ok) throw new Error('Busca indisponível')
          const data = await response.json()
          setCatalogSections([{ key: 'search', title: `Resultados da busca para: ${searchQuery}`, items: (data.results || []).filter((item) => item.media_type === 'movie' || item.media_type === 'tv').map((item) => normalizeTmdb(item)) }])
          return
        }
        if (selectedGenre) {
          const response = await fetch(`${apiBase}/discover/movie?api_key=${apiKey}&language=pt-BR&with_genres=${selectedGenre}`, { signal: controller.signal })
          if (!response.ok) throw new Error('Categoria indisponível')
          const data = await response.json()
          setCatalogSections([{ key: 'genre', title: `Categoria: ${genres[selectedGenre] || 'Selecionada'}`, items: (data.results || []).map((item) => normalizeTmdb(item, 'movie')) }])
          return
        }
        const responses = await Promise.all(sections.map(async (section) => {
          const separator = section.endpoint.includes('?') ? '&' : '?'
          const response = await fetch(`${apiBase}${section.endpoint}${separator}api_key=${apiKey}&language=pt-BR`, { signal: controller.signal })
          if (!response.ok) throw new Error(`Seção indisponível: ${section.key}`)
          const data = await response.json()
          return { key: section.key, title: section.title, items: (data.results || []).slice(0, 12).map((item) => normalizeTmdb(item, section.mediaType)) }
        }))
        setCatalogSections(responses)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setIsOffline(true)
          if (searchQuery) {
            const term = searchQuery.toLocaleLowerCase('pt-BR')
            setCatalogSections([{ key: 'search', title: `Resultados da busca para: ${searchQuery}`, items: mockData.filter((item) => item.title.toLocaleLowerCase('pt-BR').includes(term)) }])
          } else if (selectedGenre) {
            setCatalogSections([{ key: 'genre', title: `Categoria: ${genres[selectedGenre] || 'Selecionada'}`, items: mockData.filter((item) => item.genres.some((genre) => String(genre.id) === selectedGenre)) }])
          } else setCatalogSections(getOfflineSections())
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }
    loadCatalog()
    return () => controller.abort()
  }, [searchQuery, selectedGenre])

  return (
    <main className="page-shell">
      <section className="page-heading"><p className="eyebrow">CATÁLOGO</p><h1>Encontre seu próximo filme ou série</h1><p>Seleções organizadas para decidir o que assistir sem perder tempo.</p></section>
      {isOffline && <ApiWarning />}
      {loading && <p className="loading">Carregando catálogo...</p>}
      {catalogSections.map((section) => <section className="catalog-section" key={section.key}><h2>{section.title}</h2>{section.items.length ? <div className="movie-grid">{section.items.map((item) => <MovieCard key={`${item.mediaType}-${item.id}`} item={item} />)}</div> : <p className="muted">Nenhum título encontrado.</p>}</section>)}
    </main>
  )
}
