package br.pucminas.pokedex.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Document(collection = "pokemons")
public record Pokemon(
		@Id
		@NotNull(message = "é obrigatório")
		@Min(value = 1, message = "deve ser maior ou igual a 1")
		Integer id,

		@NotBlank(message = "é obrigatório")
		@Size(max = 30, message = "deve ter no máximo 30 caracteres")
		String name,

		@NotNull(message = "é obrigatório")
		@Valid
		Stats stats,

		@NotNull(message = "é obrigatório")
		@Size(min = 1, max = 2, message = "deve ter 1 ou 2 tipos")
		List<String> types) {
}
