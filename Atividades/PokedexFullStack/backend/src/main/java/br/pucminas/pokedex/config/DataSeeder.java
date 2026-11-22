package br.pucminas.pokedex.config;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import br.pucminas.pokedex.model.Pokemon;
import br.pucminas.pokedex.repository.PokemonRepository;
import tools.jackson.databind.json.JsonMapper;

@Component
public class DataSeeder implements CommandLineRunner {

	private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

	private final PokemonRepository pokemonRepository;
	private final JsonMapper jsonMapper;

	public DataSeeder(PokemonRepository pokemonRepository, JsonMapper jsonMapper) {
		this.pokemonRepository = pokemonRepository;
		this.jsonMapper = jsonMapper;
	}

	@Override
	public void run(String... args) throws IOException {
		if (pokemonRepository.count() > 0) {
			return;
		}
		List<Pokemon> pokemons = readPokemons();
		pokemonRepository.saveAll(pokemons);
		log.info("{} pokémon inseridos no MongoDB", pokemons.size());
	}

	private List<Pokemon> readPokemons() throws IOException {
		try (InputStream input = new ClassPathResource("data/pokemons.json").getInputStream()) {
			return List.of(jsonMapper.readValue(input, Pokemon[].class));
		}
	}
}
