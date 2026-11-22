import "../css/SortSelect.css";

const SORT_OPTIONS = [
  { value: "id", label: "ID" },
  { value: "name", label: "Nome" },
  { value: "hp", label: "HP" },
  { value: "attack", label: "Attack" },
  { value: "defense", label: "Defense" },
  { value: "specialAttack", label: "Special Attack" },
  { value: "specialDefense", label: "Special Defense" },
  { value: "speed", label: "Speed" },
];

function SortSelect({ value, onChange }) {
  return (
    <select className="sort-select" value={value} onChange={(e) => onChange(e.target.value)}>
      {SORT_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          Ordenar por {option.label}
        </option>
      ))}
    </select>
  );
}

export default SortSelect;
