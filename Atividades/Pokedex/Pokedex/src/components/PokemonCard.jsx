import TypeBadge from "./TypeBadge";
import { formatId, getPokemonImage } from "../utils/pokemonImage";
import "../css/PokemonCard.css";

function PokemonCard({ pokemon, onSelect }) {
  const { stats } = pokemon;

  return (
    <div className={`pokemon-card bg-${pokemon.types[0].name.toLowerCase()}`} onClick={() => onSelect(pokemon)}>
      <span className="pokemon-id">{formatId(pokemon.id)}</span>
      <img src={getPokemonImage(pokemon.id)} alt={pokemon.name} loading="lazy" />
      <h2>{pokemon.name}</h2>
      <div className="pokemon-types">
        {pokemon.types.map((type) => (
          <TypeBadge key={type.id} type={type} />
        ))}
      </div>
      <ul className="pokemon-stats">
        <li>HP <strong>{stats.hp}</strong></li>
        <li>Atk <strong>{stats.attack}</strong></li>
        <li>Def <strong>{stats.defense}</strong></li>
        <li>Sp. Atk <strong>{stats.specialAttack}</strong></li>
        <li>Sp. Def <strong>{stats.specialDefense}</strong></li>
        <li>Speed <strong>{stats.speed}</strong></li>
      </ul>
    </div>
  );
}

export default PokemonCard;
