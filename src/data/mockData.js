// Catálogo local: mantém o fluxo funcional quando a API não estiver disponível.
export const genres = {
  28: 'Ação', 12: 'Aventura', 35: 'Comédia', 18: 'Drama',
  878: 'Ficção científica', 9648: 'Mistério', 80: 'Crime', 53: 'Suspense',
}

const genre = (id) => ({ id, name: genres[id] })

export const mockData = [
  { id: 101, mediaType: 'movie', title: 'Horizonte de Aço', year: '2026', rating: 8.2, runtime: '2h 06min', genres: [genre(878), genre(28)], overview: 'Em uma cidade costeira protegida por muralhas, uma engenheira descobre uma mensagem enviada décadas antes.', poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=500&q=80', providers: ['Prime Video', 'Apple TV'], categories: ['trending', 'movies', 'action'] },
  { id: 102, mediaType: 'tv', title: 'Linha de Fundo', year: '2026', rating: 8.6, runtime: '2 temporadas', genres: [genre(18), genre(9648)], overview: 'Uma repórter retorna à cidade natal para investigar um caso que conecta famílias influentes.', poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=500&q=80', providers: ['Netflix'], categories: ['trending', 'tv'] },
  { id: 103, mediaType: 'movie', title: 'Último Turno', year: '2025', rating: 7.9, runtime: '1h 48min', genres: [genre(53), genre(80)], overview: 'No último plantão antes de se aposentar, um operador de metrô recebe uma chamada decisiva.', poster: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=80', providers: ['Max', 'Claro TV+'], categories: ['trending', 'action'] },
  { id: 104, mediaType: 'tv', title: 'Caderno Azul', year: '2026', rating: 8.0, runtime: '1 temporada', genres: [genre(35), genre(18)], overview: 'Três colegas encontram um caderno com promessas antigas e decidem cumpri-las antes do fim do ano.', poster: 'https://images.unsplash.com/photo-1512070679279-8988d32161be?auto=format&fit=crop&w=500&q=80', providers: ['Globoplay', 'Disney+'], categories: ['tv', 'comedy'] },
  { id: 105, mediaType: 'movie', title: 'Maré Baixa', year: '2026', rating: 7.7, runtime: '1h 54min', genres: [genre(18), genre(12)], overview: 'Uma navegadora aceita conduzir uma travessia perigosa enquanto enfrenta o passado.', poster: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80', providers: ['Netflix', 'Prime Video'], categories: ['movies', 'trending'] },
  { id: 106, mediaType: 'tv', title: 'Arquivo 17', year: '2025', rating: 8.4, runtime: '1 temporada', genres: [genre(9648), genre(53)], overview: 'Arquivistas encontram registros oficiais capazes de reabrir uma investigação encerrada.', poster: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=500&q=80', providers: ['Max'], categories: ['tv', 'trending'] },
  { id: 107, mediaType: 'movie', title: 'Distrito Zero', year: '2026', rating: 7.8, runtime: '2h 11min', genres: [genre(28), genre(878)], overview: 'Uma agente atravessa um distrito isolado para encontrar a origem de uma falha nacional.', poster: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=500&q=80', providers: ['Prime Video'], categories: ['movies', 'action'] },
  { id: 108, mediaType: 'tv', title: 'Plantão Central', year: '2026', rating: 8.1, runtime: '3 temporadas', genres: [genre(18), genre(35)], overview: 'A rotina de uma redação local muda quando uma notícia sem fonte ganha alcance nacional.', poster: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=500&q=80', providers: ['Globoplay'], categories: ['tv', 'comedy'] },
  { id: 109, mediaType: 'movie', title: 'Queda Livre', year: '2026', rating: 7.5, runtime: '1h 42min', genres: [genre(28), genre(53)], overview: 'Após um apagão, dois desconhecidos precisam cruzar a cidade antes do amanhecer.', poster: 'https://images.unsplash.com/photo-1519608487953-e999c86e7452?auto=format&fit=crop&w=500&q=80', providers: ['Netflix'], categories: ['movies', 'action'] },
  { id: 110, mediaType: 'movie', title: 'Varanda 12', year: '2025', rating: 7.6, runtime: '1h 37min', genres: [genre(35), genre(18)], overview: 'Vizinhos de um prédio antigo formam uma aliança improvável para salvar o condomínio.', poster: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=500&q=80', providers: ['Disney+'], categories: ['comedy', 'trending'] },
  { id: 111, mediaType: 'tv', title: 'Fronteira Norte', year: '2026', rating: 8.3, runtime: '1 temporada', genres: [genre(12), genre(80)], overview: 'Na fronteira, uma policial investiga uma rota clandestina que envolve seu antigo parceiro.', poster: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=500&q=80', providers: ['Netflix'], categories: ['tv', 'action'] },
  { id: 112, mediaType: 'movie', title: 'Pequenas Rotinas', year: '2026', rating: 7.4, runtime: '1h 31min', genres: [genre(35)], overview: 'Uma semana de imprevistos faz uma família rever seus planos mais simples.', poster: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=500&q=80', providers: ['Apple TV'], categories: ['movies', 'comedy'] },
].map((item) => ({ ...item, watch_providers: item.providers.map((provider_name) => ({ provider_name })) }))

export const offlineSections = [
  { key: 'trending', title: 'Lançamentos da Semana' },
  { key: 'movies', title: 'Filmes do Ano' },
  { key: 'tv', title: 'Séries em Destaque' },
  { key: 'action', title: 'Ação e Aventura' },
  { key: 'comedy', title: 'Comédia e Outros Gêneros' },
]

export const getMockItemById = (id, mediaType) => mockData.find((item) => String(item.id) === String(id) && item.mediaType === mediaType)
export const getOfflineSections = () => offlineSections.map((section) => ({ ...section, items: mockData.filter((item) => item.categories.includes(section.key)) }))
