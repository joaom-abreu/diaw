package br.pucminas.pokedex.exception;

public class TrainerNotFoundException extends RuntimeException {

	public TrainerNotFoundException(Integer id) {
		super("Treinador com id " + id + " não encontrado");
	}
}
