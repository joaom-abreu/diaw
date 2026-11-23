package br.pucminas.pokedex.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import br.pucminas.pokedex.exception.PokemonAlreadyExistsException;
import br.pucminas.pokedex.exception.PokemonNotFoundException;
import br.pucminas.pokedex.model.Pokemon;
import br.pucminas.pokedex.repository.PokemonRepository;

@Service
public class PokemonService {

	private static final Sort BY_ID = Sort.by("id");

	private final PokemonRepository pokemonRepository;

	public PokemonService(PokemonRepository pokemonRepository) {
		this.pokemonRepository = pokemonRepository;
	}

	public List<Pokemon> findAll(String name, String type) {
		if (name != null && type != null) {
			return pokemonRepository.findByNameContainingIgnoreCaseAndTypesContaining(name, type, BY_ID);
		}
		if (name != null) {
			return pokemonRepository.findByNameContainingIgnoreCase(name, BY_ID);
		}
		if (type != null) {
			return pokemonRepository.findByTypesContaining(type, BY_ID);
		}
		return pokemonRepository.findAll(BY_ID);
	}

	public Pokemon findById(Integer id) {
		return pokemonRepository.findById(id)
				.orElseThrow(() -> new PokemonNotFoundException(id));
	}

	public Pokemon create(Pokemon pokemon) {
		if (pokemonRepository.existsById(pokemon.id())) {
			throw new PokemonAlreadyExistsException(pokemon.id());
		}
		return pokemonRepository.save(pokemon);
	}

	public Pokemon update(Integer id, Pokemon pokemon) {
		if (!pokemonRepository.existsById(id)) {
			throw new PokemonNotFoundException(id);
		}
		Pokemon updated = new Pokemon(id, pokemon.name(), pokemon.stats(), pokemon.types());
		return pokemonRepository.save(updated);
	}

	public void delete(Integer id) {
		if (!pokemonRepository.existsById(id)) {
			throw new PokemonNotFoundException(id);
		}
		pokemonRepository.deleteById(id);
	}
}
