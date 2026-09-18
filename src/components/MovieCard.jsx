import { Link } from 'react-router'
import WatchlistButton from './WatchlistButton'

export default function MovieCard({ item, onWatchlistChange }) {
  const mediaType = item.mediaType || (item.type === 'Série' ? 'tv' : 'movie')
  const typeLabel = mediaType === 'tv' ? 'Série' : 'Filme'
  const detailsPath = `/detalhes/${mediaType}/${item.id}`

  return (
    <article className="movie-card">
      <Link to={detailsPath} className="poster-link" aria-label={`Abrir detalhes de ${item.title}`}><img src={item.poster} alt={`Capa de ${item.title}`} /></Link>
      <div className="movie-card-content">
        <div className="tags"><span>{typeLabel}</span><span>{item.year}</span></div>
        <h2><Link to={detailsPath}>{item.title}</Link></h2>
        <p className="rating">NOTA {item.rating}</p>
        <WatchlistButton item={{ ...item, mediaType }} onChange={onWatchlistChange} />
      </div>
    </article>
  )
}
