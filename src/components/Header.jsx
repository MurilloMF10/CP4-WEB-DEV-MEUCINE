import { Link, NavLink, useLocation, useNavigate } from 'react-router'
import { useState } from 'react'
import { FaFilm, FaList, FaSearch } from 'react-icons/fa'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const [query, setQuery] = useState(() => new URLSearchParams(location.search).get('search') || '')

  function submitSearch(event) {
    event.preventDefault()
    const term = query.trim()
    navigate(term ? `/?search=${encodeURIComponent(term)}` : '/')
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="Meu Cine - página inicial"><FaFilm aria-hidden="true" /><span>MEU</span> CINE</Link>
        <form className="search-form" onSubmit={submitSearch} role="search">
          <label className="sr-only" htmlFor="catalog-search">Buscar título</label>
          <input id="catalog-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar filme ou série" />
          <button type="submit"><FaSearch aria-hidden="true" /> BUSCAR</button>
        </form>
        <nav aria-label="Navegação principal">
          <NavLink to="/" end><FaFilm aria-hidden="true" /> Catálogo</NavLink>
          <NavLink to="/minha-lista"><FaList aria-hidden="true" /> Minha Lista</NavLink>
        </nav>
      </div>
    </header>
  )
}
