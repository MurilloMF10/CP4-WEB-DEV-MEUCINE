# Requisitos — Meu Cine

## Contexto e objetivo

Nosso projeto, Meu Cine, é um MVP web responsivo criado a partir do espaço deixado pelo encerramento do TV Time. Em vez de tentar reconstruir toda a antiga plataforma, nós escolhemos resolver duas necessidades mais diretas: ajudar as pessoas a descobrir filmes e séries e permitir que elas organizem os títulos que desejam assistir.

Com isso, nosso objetivo é diminuir o tempo entre receber uma recomendação e decidir o que assistir. Além de apresentar um catálogo, o Meu Cine permite consultar informações importantes sobre cada conteúdo, salvar títulos em uma lista pessoal e verificar em quais serviços de streaming eles podem estar disponíveis no Brasil.

## Público-alvo

Nosso público é formado por pessoas que assistem a filmes e séries por streaming, recebem recomendações com frequência e querem organizar suas opções sem depender de anotações, mensagens antigas ou várias abas abertas. Pensamos principalmente em estudantes, profissionais e fãs de séries que procuram uma forma simples de pesquisar, comparar e guardar conteúdos para assistir depois.

### Personas

Marina, estudante de 22 anos - Costuma assistir a filmes nos fins de semana e precisa guardar recomendações para escolher algo sem perder muito tempo procurando.

Rafael, profissional de 31 anos - Alterna entre filmes e séries durante a semana e quer consultar os detalhes de um título antes de decidir se vai adicioná-lo à sua lista.

Bianca, fã de séries de 27 anos - Gosta de explorar títulos por gênero e precisa descobrir em qual plataforma pode procurar cada conteúdo.

## Problema que queremos resolver

Ao conversar sobre filmes e séries, é comum receber recomendações e acabar esquecendo os nomes depois. Além disso, a grande quantidade de opções nos serviços de streaming pode tornar a escolha cansativa. Muitas vezes, a pessoa encontra um título interessante, mas ainda precisa pesquisar separadamente a sinopse, a avaliação e onde ele está disponível.

Nosso projeto reúne essas etapas em uma única plataforma. Assim, a pessoa pode descobrir conteúdos, entender o básico sobre eles, salvar o que deseja assistir e ter uma referência de onde procurar o título.

## Histórias de usuário e critérios de aceitação

Esta seção reúne as ações mais importantes que esperamos que uma pessoa consiga realizar no Meu Cine e como verificamos se cada uma funciona corretamente.

### Descobrir conteúdos

Como pessoa usuária, quero visualizar seções de filmes e séries na página inicial para encontrar opções mesmo quando eu ainda não sei exatamente o que procurar.

Critérios de aceitação:

- Nosso catálogo deve apresentar cards com capa, título, tipo, ano e nota.
- Cada card deve abrir a página de detalhes do filme ou da série selecionada.
- A página inicial deve continuar compreensível em telas menores e maiores.

### Buscar títulos e explorar categorias

Como pessoa usuária, quero pesquisar um título pelo nome e navegar por gêneros para encontrar conteúdos relacionados aos meus interesses.

Critérios de aceitação:

- Ao enviar uma busca, a aplicação deve apresentar títulos relacionados ao termo informado.
- Ao clicar em um gênero na página de detalhes, a pessoa deve ser direcionada ao catálogo já filtrado por aquela categoria.
- Quando não houver resultados, nosso projeto deve informar a situação de forma clara.

### Consultar detalhes e disponibilidade

Como pessoa usuária, quero consultar a sinopse, o ano, a nota, os gêneros e a disponibilidade de um título para decidir se desejo assisti-lo.

Critérios de aceitação:

- A página de detalhes deve apresentar as principais informações do filme ou da série selecionada.
- A pessoa deve ter uma forma simples de voltar ao catálogo.
- Quando houver dados disponíveis, o projeto deve exibir os serviços de streaming encontrados para o Brasil.
- Quando não houver serviços disponíveis, deve aparecer apenas uma mensagem amigável, sem erros técnicos ou avisos repetidos.

### Organizar Minha Lista

Como pessoa usuária, quero adicionar e remover títulos da Minha Lista para lembrar o que desejo assistir mais tarde.

Critérios de aceitação:

- A inclusão e a remoção de um título devem atualizar a interface imediatamente.
- Os títulos salvos devem continuar disponíveis após atualizar a página no mesmo navegador.
- Quando a lista estiver vazia, nosso projeto deve apresentar uma mensagem orientando a pessoa a adicionar conteúdos.

### Continuar navegando sem a API

Como pessoa usuária, quero continuar navegando no Meu Cine quando a fonte externa estiver indisponível para que o projeto ainda seja útil.

Critérios de aceitação:

- Quando não houver chave configurada, conexão com a internet ou resposta válida da API, o projeto deve utilizar dados locais de demonstração.
- Enquanto os dados de demonstração estiverem sendo exibidos, um aviso visual deve informar que a API está indisponível.

## Estados da aplicação

Carregamento - Enquanto nosso projeto consulta o catálogo, os detalhes de um título ou os serviços de streaming, a interface informa que os dados estão sendo carregados.

Catálogo disponível - Quando a fonte externa responde corretamente, o Meu Cine apresenta as seções e os títulos atualizados.

Modo offline - Quando a API não pode ser utilizada, nosso projeto mostra dados locais de demonstração e um aviso visual explicando essa condição.

Busca sem resultado - Quando nenhum título corresponde ao termo pesquisado, a pessoa recebe uma mensagem informando que não encontrou resultados.

Título não encontrado - Quando o endereço acessado não corresponde a um conteúdo disponível, a aplicação apresenta uma mensagem explicativa e uma opção para voltar ao catálogo.

Lista vazia - Quando ainda não há títulos salvos, Minha Lista mostra uma mensagem convidando a pessoa a adicionar conteúdos.

Sem streaming disponível - Quando não existem serviços registrados para o título no Brasil, a interface mostra uma única mensagem adequada para filme ou série.

## Regras do produto

- Nosso catálogo deve identificar visualmente se cada conteúdo é um filme ou uma série.
- A busca deve considerar títulos de filmes e séries.
- Os gêneros exibidos nos detalhes devem direcionar a pessoa para conteúdos relacionados.
- Minha Lista é salva somente no navegador da pessoa usuária. Por isso, ela continua disponível após atualizar a página, mas não é compartilhada entre dispositivos.
- Nesta primeira versão, nosso projeto não exige cadastro, login ou pagamento.
- A disponibilidade de streaming é apenas informativa e considera o Brasil. O Meu Cine não reproduz conteúdos dentro da plataforma.
- A chave de acesso à API é local e não deve ser publicada no repositório.
- Quando a API falhar, nosso projeto deve continuar funcional por meio dos dados locais de demonstração.
- O layout deve priorizar leitura, busca e acesso aos conteúdos em diferentes tamanhos de tela.
