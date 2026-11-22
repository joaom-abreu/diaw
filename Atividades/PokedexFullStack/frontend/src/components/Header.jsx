import "../css/Header.css";

function Header({ page, onChangePage }) {
  return (
    <header className="header">
      <h1 className="header-title">Pokédex</h1>
      <nav className="header-nav">
        <button className={page === "pokedex" ? "active" : ""} onClick={() => onChangePage("pokedex")}>
          Pokémon
        </button>
        <button className={page === "trainers" ? "active" : ""} onClick={() => onChangePage("trainers")}>
          Treinadores
        </button>
      </nav>
    </header>
  );
}

export default Header;
