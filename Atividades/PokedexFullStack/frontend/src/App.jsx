import { useEffect, useState } from "react";
import { getPokemons, getTrainers } from "./services/api";
import { POKEMON_TYPES } from "./utils/pokemonTypes";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import SortSelect from "./components/SortSelect";
import RandomButton from "./components/RandomButton";
import TypeFilter from "./components/TypeFilter";
import PokemonList from "./components/PokemonList";
import PokemonDetails from "./components/PokemonDetails";
import TrainerList from "./components/TrainerList";
import "./css/App.css";

function matchesSearch(pokemon, search) {
  const text = search.trim().toLowerCase();
  return pokemon.name.toLowerCase().includes(text) || String(pokemon.id) === text;
}

function matchesType(pokemon, type) {
  return type === null || pokemon.types.includes(type);
}

function sortPokemon(pokemon, sortBy) {
  return [...pokemon].sort((a, b) => {
    if (sortBy === "id") return a.id - b.id;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return b.stats[sortBy] - a.stats[sortBy];
  });
}

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState("pokedex");
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [sortBy, setSortBy] = useState("id");
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    Promise.all([getPokemons(), getTrainers()])
      .then(([pokemonData, trainerData]) => {
        setPokemons(pokemonData);
        setTrainers(trainerData);
      })
      .catch(() => setError("Não foi possível conectar à API."))
      .finally(() => setLoading(false));
  }, []);

  const usedTypes = POKEMON_TYPES.filter((type) =>
    pokemons.some((pokemon) => pokemon.types.includes(type))
  );
  const filteredPokemon = pokemons.filter(
    (pokemon) => matchesSearch(pokemon, search) && matchesType(pokemon, selectedType)
  );
  const sortedPokemon = sortPokemon(filteredPokemon, sortBy);

  const message = loading ? "Carregando Pokémon..." : error;

  if (message) {
    return (
      <>
        <Header page={page} onChangePage={setPage} />
        <p className="empty-message">{message}</p>
      </>
    );
  }

  return (
    <>
      <Header page={page} onChangePage={setPage} />

      <main className="container">
        {page === "pokedex" ? (
          <>
            <div className="toolbar">
              <SearchBar value={search} onChange={setSearch} />
              <SortSelect value={sortBy} onChange={setSortBy} />
              <RandomButton pokemon={filteredPokemon} onSelect={setSelectedPokemon} />
            </div>
            <TypeFilter types={usedTypes} selectedType={selectedType} onSelect={setSelectedType} />
            <PokemonList pokemon={sortedPokemon} onSelect={setSelectedPokemon} />
          </>
        ) : (
          <TrainerList trainers={trainers} pokemon={pokemons} onSelectPokemon={setSelectedPokemon} />
        )}
      </main>

      {selectedPokemon && (
        <PokemonDetails pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
      )}
    </>
  );
}

export default App;
