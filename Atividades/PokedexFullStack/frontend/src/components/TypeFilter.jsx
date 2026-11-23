import "../css/TypeFilter.css";

function TypeFilter({ types, selectedType, onSelect }) {
  return (
    <div className="type-filter">
      <button className={selectedType === null ? "active" : ""} onClick={() => onSelect(null)}>
        Todos
      </button>
      {types.map((type) => (
        <button
          key={type}
          className={`type-${type.toLowerCase()} ${selectedType === type ? "active" : ""}`}
          onClick={() => onSelect(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
}

export default TypeFilter;
