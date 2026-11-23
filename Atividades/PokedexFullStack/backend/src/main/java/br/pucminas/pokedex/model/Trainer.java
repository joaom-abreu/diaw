package br.pucminas.pokedex.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "trainers")
public record Trainer(
		@Id
		Integer id,
		String name,
		Integer badges,
		List<Integer> pokemonIds) {
}
