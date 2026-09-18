import { useEffect, useState } from 'react'

const TMDB_LOGO_BASE = 'https://image.tmdb.org/t/p/w500'

export default function StreamProviders({ id, mediaType }) {
  const [providers, setProviders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    const apiKey = import.meta.env.VITE_TMDB_API_KEY

    async function loadProviders() {
      setLoading(true)
      setProviders([])

      try {
        if (!apiKey || apiKey === 'sua_chave_aqui') return
        if (mediaType !== 'movie' && mediaType !== 'tv') return

        const response = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/${id}/watch/providers?api_key=${apiKey}`,
          { signal: controller.signal },
        )
        if (!response.ok) return

        const data = await response.json()
        const brazilProviders = [
          ...(data.results?.BR?.flatrate || []),
          ...(data.results?.BR?.rent || []),
          ...(data.results?.BR?.buy || []),
        ]
        const uniqueProviders = [
          ...new Map(brazilProviders.map((provider) => [provider.provider_id, provider])).values(),
        ]

        if (!controller.signal.aborted) setProviders(uniqueProviders)
      } catch (error) {
        if (error.name !== 'AbortError' && !controller.signal.aborted) setProviders([])
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadProviders()
    return () => controller.abort()
  }, [id, mediaType])

  if (loading) return <p className="muted">Carregando provedores...</p>

  const unavailableMessage = mediaType === 'tv'
    ? 'Esta série não está disponível em nenhum streaming.'
    : 'Este filme não está disponível em nenhum streaming.'

  if (!providers.length) return <p className="muted">{unavailableMessage}</p>

  return (
    <ul className="providers" aria-label="Serviços de streaming disponíveis">
      {providers.map((provider) => (
        <li key={provider.provider_id || provider.provider_name} className="provider-item">
          {provider.logo_path && <img src={`${TMDB_LOGO_BASE}${provider.logo_path}`} alt="" />}
          <span>{provider.provider_name}</span>
        </li>
      ))}
    </ul>
  )
}
