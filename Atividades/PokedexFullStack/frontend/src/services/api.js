const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

async function readErrorMessage(response) {
  try {
    const problem = await response.json();
    return problem.detail ?? `Erro ${response.status}`;
  } catch {
    return `Erro ${response.status}`;
  }
}

async function request(path, options) {
  const response = await fetch(`${API_URL}/api${path}`, options);
  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }
  if (response.status === 204) {
    return null;
  }
  return response.json();
}

function jsonOptions(method, body) {
  return {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

export function getPokemons() {
  return request("/pokemons");
}

export function getTrainers() {
  return request("/trainers");
}

export function createPokemon(pokemon) {
  return request("/pokemons", jsonOptions("POST", pokemon));
}

export function updatePokemon(id, pokemon) {
  return request(`/pokemons/${id}`, jsonOptions("PUT", pokemon));
}

export function deletePokemon(id) {
  return request(`/pokemons/${id}`, { method: "DELETE" });
}
