package br.pucminas.pokedex.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "pokemons")
public record Pokemon(@Id Integer id, String name, Stats stats, List<String> types) {
}
