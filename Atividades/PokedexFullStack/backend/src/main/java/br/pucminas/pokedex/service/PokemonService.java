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

	private final PokemonRepository pokemonRepository;

	public PokemonService(PokemonRepository pokemonRepository) {
		this.pokemonRepository = pokemonRepository;
	}

	public List<Pokemon> findAll() {
		return pokemonRepository.findAll(Sort.by("id"));
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
}
