import "../css/RandomButton.css";

function RandomButton({ pokemon, onSelect }) {
  const pickRandom = () => {
    const index = Math.floor(Math.random() * pokemon.length);
    onSelect(pokemon[index]);
  };

  return (
    <button className="random-button" onClick={pickRandom} disabled={pokemon.length === 0}>
      Aleatório
    </button>
  );
}

export default RandomButton;
