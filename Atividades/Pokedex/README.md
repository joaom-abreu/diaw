# Pokédex com React + Vite

Pokédex interativa com os 151 Pokémon da primeira geração. Permite pesquisar por nome ou ID, filtrar por tipo, ver os atributos de cada Pokémon em um modal e consultar os treinadores.

### Dependências Utilizadas

- Node.js 22
- React 19
- Vite 8

---

### Funcionalidades

- Lista de Pokémon com ID, nome, tipos e atributos (HP, Attack, Defense, Special Attack, Special Defense e Speed)
- Pesquisa por nome ou ID, atualizada enquanto o usuário digita
- Filtro por tipo, com os tipos presentes no `pokedex-data.json`
- Modal de detalhes com barras de atributos
- Botão para sortear um Pokémon aleatório entre os exibidos
- Aba de treinadores com insígnias e Pokémon de cada um
- Mensagem quando nenhum Pokémon é encontrado
- Layout responsivo

---

### Como Executar a Aplicação

##### Pré-requisitos
- Node.js 22 (ou 20.19+)
- npm
- Git

##### Passo a Passo:

1. Clonar o repositório e entrar na pasta do projeto:
   ```bash
   git clone https://github.com/joaom-abreu/DIAW
   cd DIAW/Atividades/Pokedex/Pokedex
   ```

2. Instalar as dependências:
   ```bash
   npm install
   ```

3. Executar o projeto:
   ```bash
   npm run dev
   ```

4. Abrir no navegador:

   - http://localhost:5173

---

### Dados

Os dados da aplicação ficam em `src/data/pokedex-data.json` (tipos, Pokémon e treinadores).

As imagens dos Pokémon vêm do repositório de sprites da [PokéAPI](https://github.com/PokeAPI/sprites), usando o ID de cada Pokémon na URL:

```
https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{id}.png
```

---

### Organização do Projeto

```text
Pokedex/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── components/
    │   ├── Header.jsx          # título e abas Pokémon / Treinadores
    │   ├── SearchBar.jsx       # campo de pesquisa
    │   ├── TypeFilter.jsx      # botões de filtro por tipo
    │   ├── PokemonList.jsx     # grade de cards e mensagem de lista vazia
    │   ├── PokemonCard.jsx     # card de um Pokémon
    │   ├── PokemonDetails.jsx  # modal com os detalhes
    │   ├── StatBar.jsx         # barra de um atributo
    │   ├── TypeBadge.jsx       # etiqueta colorida de um tipo
    │   └── TrainerList.jsx     # cards dos treinadores
    ├── css/                    # um arquivo de estilo por componente
    ├── data/
    │   └── pokedex-data.json
    ├── utils/
    │   └── pokemonImage.js     # URL da imagem e formatação do ID
    ├── App.jsx                 # estados da tela e filtragem
    ├── main.jsx
    └── index.css               # estilos globais e cores dos tipos
```
