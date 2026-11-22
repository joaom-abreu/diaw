import "../css/TypeFilter.css";

function TypeFilter({ types, selectedTypeId, onSelect }) {
  return (
    <div className="type-filter">
      <button className={selectedTypeId === null ? "active" : ""} onClick={() => onSelect(null)}>
        Todos
      </button>
      {types.map((type) => (
        <button
          key={type.id}
          className={`type-${type.name.toLowerCase()} ${selectedTypeId === type.id ? "active" : ""}`}
          onClick={() => onSelect(type.id)}
        >
          {type.name}
        </button>
      ))}
    </div>
  );
}

export default TypeFilter;
