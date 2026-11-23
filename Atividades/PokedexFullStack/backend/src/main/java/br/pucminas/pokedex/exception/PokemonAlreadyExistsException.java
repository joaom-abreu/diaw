package br.pucminas.pokedex.exception;

public class PokemonAlreadyExistsException extends RuntimeException {

	public PokemonAlreadyExistsException(Integer id) {
		super("Já existe um Pokémon com id " + id);
	}
}
