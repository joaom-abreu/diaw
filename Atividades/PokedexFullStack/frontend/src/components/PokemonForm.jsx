import { useState } from "react";
import { POKEMON_TYPES } from "../utils/pokemonTypes";
import "../css/PokemonForm.css";

const STAT_FIELDS = [
  { name: "hp", label: "HP" },
  { name: "attack", label: "Attack" },
  { name: "defense", label: "Defense" },
  { name: "specialAttack", label: "Special Attack" },
  { name: "specialDefense", label: "Special Defense" },
  { name: "speed", label: "Speed" },
];

const EMPTY_FORM = {
  id: "",
  name: "",
  hp: "",
  attack: "",
  defense: "",
  specialAttack: "",
  specialDefense: "",
  speed: "",
  type1: "",
  type2: "",
};

function toForm(pokemon) {
  return {
    id: pokemon.id,
    name: pokemon.name,
    ...pokemon.stats,
    type1: pokemon.types[0],
    type2: pokemon.types[1] ?? "",
  };
}

function toPokemon(form) {
  const hasSecondType = form.type2 !== "" && form.type2 !== form.type1;
  return {
    id: Number(form.id),
    name: form.name.trim(),
    stats: {
      hp: Number(form.hp),
      attack: Number(form.attack),
      defense: Number(form.defense),
      specialAttack: Number(form.specialAttack),
      specialDefense: Number(form.specialDefense),
      speed: Number(form.speed),
    },
    types: hasSecondType ? [form.type1, form.type2] : [form.type1],
  };
}

function PokemonForm({ pokemon, onSave, onClose }) {
  const isEditing = pokemon !== null;
  const [form, setForm] = useState(isEditing ? toForm(pokemon) : EMPTY_FORM);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await onSave(toPokemon(form));
    } catch (saveError) {
      setError(saveError.message);
    }
  };

  return (
    <div className="modal-overlay">
      <form className="modal pokemon-form" onSubmit={handleSubmit}>
        <button type="button" className="modal-close" onClick={onClose}>×</button>
        <h2>{isEditing ? "Editar Pokémon" : "Novo Pokémon"}</h2>

        <div className="form-row">
          <label>
            ID
            <input
              type="number"
              name="id"
              min="1"
              required
              disabled={isEditing}
              value={form.id}
              onChange={handleChange}
            />
          </label>
          <label>
            Nome
            <input type="text" name="name" maxLength="30" required value={form.name} onChange={handleChange} />
          </label>
        </div>

        <div className="form-stats">
          {STAT_FIELDS.map((field) => (
            <label key={field.name}>
              {field.label}
              <input
                type="number"
                name={field.name}
                min="1"
                max="255"
                required
                value={form[field.name]}
                onChange={handleChange}
              />
            </label>
          ))}
        </div>

        <div className="form-row form-types">
          <label>
            Tipo 1
            <select name="type1" required value={form.type1} onChange={handleChange}>
              <option value="">Selecione</option>
              {POKEMON_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
          <label>
            Tipo 2
            <select name="type2" value={form.type2} onChange={handleChange}>
              <option value="">Nenhum</option>
              {POKEMON_TYPES.filter((type) => type !== form.type1).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="form-actions">
          <button type="button" className="form-cancel" onClick={onClose}>Cancelar</button>
          <button type="submit" className="form-submit">Salvar</button>
        </div>
      </form>
    </div>
  );
}

export default PokemonForm;
