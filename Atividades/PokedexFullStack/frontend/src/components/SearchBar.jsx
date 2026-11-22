import "../css/SearchBar.css";

function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Pesquisar Pokémon por nome ou ID..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchBar;
