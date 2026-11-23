package br.pucminas.pokedex.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import br.pucminas.pokedex.exception.TrainerNotFoundException;
import br.pucminas.pokedex.model.Pokemon;
import br.pucminas.pokedex.model.Trainer;
import br.pucminas.pokedex.repository.PokemonRepository;
import br.pucminas.pokedex.repository.TrainerRepository;

@Service
public class TrainerService {

	private final TrainerRepository trainerRepository;
	private final PokemonRepository pokemonRepository;

	public TrainerService(TrainerRepository trainerRepository, PokemonRepository pokemonRepository) {
		this.trainerRepository = trainerRepository;
		this.pokemonRepository = pokemonRepository;
	}

	public List<Trainer> findAll() {
		return trainerRepository.findAll(Sort.by("id"));
	}

	public List<Pokemon> findPokemons(Integer trainerId) {
		Trainer trainer = trainerRepository.findById(trainerId)
				.orElseThrow(() -> new TrainerNotFoundException(trainerId));
		List<Pokemon> pokemons = new ArrayList<>();
		for (Integer pokemonId : trainer.pokemonIds()) {
			pokemonRepository.findById(pokemonId).ifPresent(pokemons::add);
		}
		return pokemons;
	}
}
