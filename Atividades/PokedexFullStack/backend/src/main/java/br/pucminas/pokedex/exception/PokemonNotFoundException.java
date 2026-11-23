package br.pucminas.pokedex.exception;

public class PokemonNotFoundException extends RuntimeException {

	public PokemonNotFoundException(Integer id) {
		super("Pokémon com id " + id + " não encontrado");
	}
}
