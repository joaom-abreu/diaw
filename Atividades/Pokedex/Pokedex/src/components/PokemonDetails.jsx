import StatBar from "./StatBar";
import TypeBadge from "./TypeBadge";
import { formatId, getPokemonImage } from "../utils/pokemonImage";
import "../css/PokemonDetails.css";

function PokemonDetails({ pokemon, onClose }) {
  const { stats } = pokemon;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal bg-${pokemon.types[0].name.toLowerCase()}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>×</button>
        <span className="pokemon-id">{formatId(pokemon.id)}</span>
        <img src={getPokemonImage(pokemon.id)} alt={pokemon.name} />
        <h2>{pokemon.name}</h2>
        <div className="pokemon-types">
          {pokemon.types.map((type) => (
            <TypeBadge key={type.id} type={type} />
          ))}
        </div>
        <div className="modal-stats">
          <StatBar label="HP" value={stats.hp} />
          <StatBar label="Attack" value={stats.attack} />
          <StatBar label="Defense" value={stats.defense} />
          <StatBar label="Special Attack" value={stats.specialAttack} />
          <StatBar label="Special Defense" value={stats.specialDefense} />
          <StatBar label="Speed" value={stats.speed} />
        </div>
      </div>
    </div>
  );
}

export default PokemonDetails;
