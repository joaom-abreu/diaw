package br.pucminas.pokedex.model;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record Stats(
		@NotNull(message = "é obrigatório")
		@Min(value = 1, message = "deve estar entre 1 e 255")
		@Max(value = 255, message = "deve estar entre 1 e 255")
		Integer hp,

		@NotNull(message = "é obrigatório")
		@Min(value = 1, message = "deve estar entre 1 e 255")
		@Max(value = 255, message = "deve estar entre 1 e 255")
		Integer attack,

		@NotNull(message = "é obrigatório")
		@Min(value = 1, message = "deve estar entre 1 e 255")
		@Max(value = 255, message = "deve estar entre 1 e 255")
		Integer defense,

		@NotNull(message = "é obrigatório")
		@Min(value = 1, message = "deve estar entre 1 e 255")
		@Max(value = 255, message = "deve estar entre 1 e 255")
		Integer specialAttack,

		@NotNull(message = "é obrigatório")
		@Min(value = 1, message = "deve estar entre 1 e 255")
		@Max(value = 255, message = "deve estar entre 1 e 255")
		Integer specialDefense,

		@NotNull(message = "é obrigatório")
		@Min(value = 1, message = "deve estar entre 1 e 255")
		@Max(value = 255, message = "deve estar entre 1 e 255")
		Integer speed) {
}
