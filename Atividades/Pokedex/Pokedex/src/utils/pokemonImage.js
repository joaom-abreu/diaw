const IMAGE_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

export function getPokemonImage(id) {
  return `${IMAGE_URL}/${id}.png`;
}

export function formatId(id) {
  return `#${String(id).padStart(3, "0")}`;
}
