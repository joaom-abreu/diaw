import unknownPokemonImage from "../assets/unknown-pokemon.svg";

const IMAGE_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";
const ORIGINAL_POKEMON_COUNT = 151;

export function getPokemonImage(id) {
  if (id > ORIGINAL_POKEMON_COUNT) {
    return unknownPokemonImage;
  }
  return `${IMAGE_URL}/${id}.png`;
}

export function formatId(id) {
  return `#${String(id).padStart(3, "0")}`;
}
