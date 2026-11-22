function TypeBadge({ type }) {
  return <span className={`type-badge type-${type.name.toLowerCase()}`}>{type.name}</span>;
}

export default TypeBadge;
