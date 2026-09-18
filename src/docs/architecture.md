# Arquitetura — Meu Cine

## Páginas e rotas

- Página - Endereço - Responsabilidade 

- Início - Página principal - Exibe seções de catálogo, busca e resultados por gênero. 
- Detalhes - Endereço com tipo e identificação do conteúdo - Mostra informações completas, lista pessoal e streaming. 
- Minha Lista - Página de lista pessoal - Apresenta os títulos guardados no navegador. 

A navegação do site acontece sem recarregar toda a página. O cabeçalho é compartilhado entre todas elas e concentra a marca, busca, catálogo e a Minha Lista. O endereço de detalhes contém o tipo do conteúdo e sua identificação, o que permite consultar corretamente filmes e séries.

## Componentes e responsabilidades

 Componente - Responsabilidade - Propriedades recebidas 

 Cabeçalho - Busca, marca e navegação entre páginas. - Não recebe dados externos por api e controla o texto da busca. 
 Card de conteúdo - Eles exibem um resumo visual de filme ou série. - São recebidos os dados do título e, na lista, a atualização dos itens salvos.
 Botão de lista - Inclui ou remove um título da lista pessoal. - Recebe o título atual e uma atualização opcional da lista. 
 Aviso de API - Ele comunica o modo da demonstração. - Ele pode receber uma mensagem específica. 
Serviços de streaming - Consulta e exibe disponibilidade no Brasil. - Recebe o identificador e o tipo do conteúdo.

## Estados e efeitos

A página inicial mantém em memória as seções visíveis, a condição de carregamento e o modo offline. A página de detalhes vai controlar o item aberto, o carregamento e a condição de indisponibilidade. O cabeçalho controlar o texto digitado. Minha Lista controla os conteúdos recuperados do navegador. e a área de streaming controla os provedores encontrados.

Os efeitos são usados para buscar catálogo, resultados de busca, títulos por gênero, detalhes e provedores de streaming. As consultas são repetidas quando mudam a busca, o gênero, o tipo do conteúdo ou sua identificação. Ao trocar de página, uma consulta pendente é interrompida para que não atualize uma tela que já não está aberta.

## O Fluxo de dados

A página inicial solicita dados ao TMDB e organiza filmes e séries em um formato único antes de montar os cards. Cada card recebe os dados do título e cria um caminho para a página de detalhes. A página de detalhes utiliza a identificação recebida pelo endereço para buscar informações específicas e entrega essa mesma identificação à área de serviços de streaming.

Ao salvar um título, o botão atualiza o armazenamento local do navegador. Minha Lista lê esse armazenamento e cria seus cards com os mesmos dados salvos. A remoção atualiza tanto o armazenamento quanto a tela.

## A Resiliência

Quando a API não pode ser consultada, a aplicação utiliza o catálogo local de demonstração. Esse comportamento cobre ausência de chave, falhas de conexão e respostas indisponíveis. Um aviso visual deixa claro que os dados não são os dados atuais da fonte externa.

Na disponibilidade de streaming, a aplicação considera serviços de assinatura, aluguel e compra para o Brasil. Se a fonte não retornar nenhum serviço, a interface apresenta apenas uma mensagem de indisponibilidade, sem repetir avisos.
