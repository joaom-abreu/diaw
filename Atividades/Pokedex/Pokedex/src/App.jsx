import { useState } from "react";
import data from "./data/pokedex-data.json";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import TypeFilter from "./components/TypeFilter";
import PokemonList from "./components/PokemonList";
import PokemonDetails from "./components/PokemonDetails";
import TrainerList from "./components/TrainerList";
import "./css/App.css";

const typeless = data.types.find((type) => type.name === "Typeless");

const allPokemon = data.pokemon.map((pokemon) =>
  pokemon.types.length > 0 ? pokemon : { ...pokemon, types: [typeless] }
);

const usedTypes = data.types.filter((type) =>
  allPokemon.some((pokemon) => pokemon.types.some((t) => t.id === type.id))
);

function matchesSearch(pokemon, search) {
  const text = search.trim().toLowerCase();
  return pokemon.name.toLowerCase().includes(text) || String(pokemon.id) === text;
}

function matchesType(pokemon, typeId) {
  return typeId === null || pokemon.types.some((type) => type.id === typeId);
}

function App() {
  const [page, setPage] = useState("pokedex");
  const [search, setSearch] = useState("");
  const [selectedTypeId, setSelectedTypeId] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const filteredPokemon = allPokemon.filter(
    (pokemon) => matchesSearch(pokemon, search) && matchesType(pokemon, selectedTypeId)
  );

  return (
    <>
      <Header page={page} onChangePage={setPage} />

      <main className="container">
        {page === "pokedex" ? (
          <>
            <SearchBar value={search} onChange={setSearch} />
            <TypeFilter types={usedTypes} selectedTypeId={selectedTypeId} onSelect={setSelectedTypeId} />
            <PokemonList pokemon={filteredPokemon} onSelect={setSelectedPokemon} />
          </>
        ) : (
          <TrainerList trainers={data.trainers} pokemon={allPokemon} onSelectPokemon={setSelectedPokemon} />
        )}
      </main>

      {selectedPokemon && (
        <PokemonDetails pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
      )}
    </>
  );
}

export default App;
