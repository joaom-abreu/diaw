import PokemonCard from "./PokemonCard";
import "../css/PokemonList.css";

function PokemonList({ pokemon, onSelect }) {
  if (pokemon.length === 0) {
    return <p className="empty-message">Nenhum Pokémon encontrado.</p>;
  }

  return (
    <>
      <p className="result-count">{pokemon.length} Pokémon encontrado(s)</p>
      <div className="pokemon-list">
        {pokemon.map((item) => (
          <PokemonCard key={item.id} pokemon={item} onSelect={onSelect} />
        ))}
      </div>
    </>
  );
}

export default PokemonList;
