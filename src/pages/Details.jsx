import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import ApiWarning from '../components/ApiWarning'
import StreamProviders from '../components/StreamProviders'
import WatchlistButton from '../components/WatchlistButton'
import { getMockItemById } from '../data/mockData'

const imageUrl = (path) => path ? `https://image.tmdb.org/t/p/w780${path}` : 'https://placehold.co/500x750/242424/f5c518?text=SEM+CAPA'

export default function Details() {
  const { id, mediaType } = useParams()
  const validMediaType = mediaType === 'movie' || mediaType === 'tv'
  const [item, setItem] = useState(() => validMediaType ? getMockItemById(id, mediaType) : null)
  const [isOffline, setIsOffline] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    const apiKey = import.meta.env.VITE_TMDB_API_KEY
    const isSupportedType = mediaType === 'movie' || mediaType === 'tv'
    const fallback = isSupportedType ? getMockItemById(id, mediaType) : null

    async function loadDetails() {
      setLoading(true)
      setIsOffline(false)
      setItem(fallback)
      try {
        if (!isSupportedType) throw new Error('Tipo de mídia inválido')
        if (!apiKey || apiKey === 'sua_chave_aqui') throw new Error('Chave TMDB ausente')
        const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${apiKey}&language=pt-BR`, { signal: controller.signal })
        if (!response.ok) throw new Error('Detalhes indisponíveis')
        const data = await response.json()
        setItem({ id: data.id, mediaType, title: data.title || data.name, type: mediaType === 'tv' ? 'Série' : 'Filme', year: (data.release_date || data.first_air_date || '').slice(0, 4) || '—', rating: Number(data.vote_average || 0).toFixed(1), runtime: mediaType === 'tv' ? `${data.number_of_seasons || 1} temporada(s)` : data.runtime ? `${data.runtime} min` : '—', genres: data.genres || [], overview: data.overview || 'Sinopse não disponível.', poster: imageUrl(data.poster_path), providers: fallback?.providers || ['Consulte disponibilidade'] })
      } catch (error) {
        if (error.name !== 'AbortError') { setItem(fallback); setIsOffline(true) }
      } finally { if (!controller.signal.aborted) setLoading(false) }
    }
    loadDetails()
    return () => controller.abort()
  }, [id, mediaType])

  if (loading && !item) return <main className="page-shell empty-state"><p>Carregando detalhes...</p></main>
  if (!item) return <main className="page-shell empty-state">{isOffline && <ApiWarning />}<h1>Título não encontrado</h1><p>O item solicitado não está disponível no catálogo atual.</p><Link className="text-link" to="/">Voltar ao catálogo</Link></main>

  return (
    <main className="page-shell details-page">
      <Link className="back-link" to="/">VOLTAR AO CATÁLOGO</Link>
      {isOffline && <ApiWarning />}
      <article className="details-layout"><img className="details-poster" src={item.poster} alt={`Capa de ${item.title}`} /><div className="details-content"><div className="tags"><span>{item.type}</span><span>{item.year}</span></div><h1>{item.title}</h1><p className="detail-meta"><strong>NOTA {item.rating}</strong> · {item.runtime}</p><p className="overview">{item.overview}</p><div className="genre-list">{item.genres.map((genre) => <Link key={genre.id || genre.name} to={`/?genre=${genre.id}`} className="genre-filter">{genre.name}</Link>)}</div><WatchlistButton item={item} /><section className="where-to-watch"><h2>Onde assistir</h2><StreamProviders mediaType={mediaType} id={id} /></section></div></article>
    </main>
  )
}
