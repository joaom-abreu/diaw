import { useState } from "react";
import data from "./data/pokedex-data.json";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import SortSelect from "./components/SortSelect";
import RandomButton from "./components/RandomButton";
import TypeFilter from "./components/TypeFilter";
import PokemonList from "./components/PokemonList";
import PokemonDetails from "./components/PokemonDetails";
import TrainerList from "./components/TrainerList";
import "./css/App.css";

const usedTypes = data.types.filter((type) =>
  data.pokemon.some((pokemon) => pokemon.types.some((t) => t.id === type.id))
);

function matchesSearch(pokemon, search) {
  const text = search.trim().toLowerCase();
  return pokemon.name.toLowerCase().includes(text) || String(pokemon.id) === text;
}

function matchesType(pokemon, typeId) {
  return typeId === null || pokemon.types.some((type) => type.id === typeId);
}

function sortPokemon(pokemon, sortBy) {
  return [...pokemon].sort((a, b) => {
    if (sortBy === "id") return a.id - b.id;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return b.stats[sortBy] - a.stats[sortBy];
  });
}

function App() {
  const [page, setPage] = useState("pokedex");
  const [search, setSearch] = useState("");
  const [selectedTypeId, setSelectedTypeId] = useState(null);
  const [sortBy, setSortBy] = useState("id");
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const filteredPokemon = data.pokemon.filter(
    (pokemon) => matchesSearch(pokemon, search) && matchesType(pokemon, selectedTypeId)
  );
  const sortedPokemon = sortPokemon(filteredPokemon, sortBy);

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
            <TypeFilter types={usedTypes} selectedTypeId={selectedTypeId} onSelect={setSelectedTypeId} />
            <PokemonList pokemon={sortedPokemon} onSelect={setSelectedPokemon} />
          </>
        ) : (
          <TrainerList trainers={data.trainers} pokemon={data.pokemon} onSelectPokemon={setSelectedPokemon} />
        )}
      </main>

      {selectedPokemon && (
        <PokemonDetails pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
      )}
    </>
  );
}

export default App;
