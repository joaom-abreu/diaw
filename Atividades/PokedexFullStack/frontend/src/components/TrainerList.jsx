import { getPokemonImage } from "../utils/pokemonImage";
import "../css/TrainerList.css";

function TrainerList({ trainers, pokemon, onSelectPokemon }) {
  const findPokemon = (id) => pokemon.find((item) => item.id === id);

  return (
    <div className="trainer-list">
      {trainers.map((trainer) => (
        <div key={trainer.id} className="trainer-card">
          <h2>{trainer.name}</h2>
          <p className="trainer-badges">🏅 {trainer.badges} insígnia(s)</p>
          <div className="trainer-pokemon">
            {trainer.pokemonIds.map(findPokemon).map((item) => (
              <button key={item.id} onClick={() => onSelectPokemon(item)} title={item.name}>
                <img src={getPokemonImage(item.id)} alt={item.name} loading="lazy" />
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TrainerList;
