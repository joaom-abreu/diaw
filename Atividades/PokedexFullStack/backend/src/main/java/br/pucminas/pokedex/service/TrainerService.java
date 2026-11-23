package br.pucminas.pokedex.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import br.pucminas.pokedex.model.Trainer;
import br.pucminas.pokedex.repository.TrainerRepository;

@Service
public class TrainerService {

	private final TrainerRepository trainerRepository;

	public TrainerService(TrainerRepository trainerRepository) {
		this.trainerRepository = trainerRepository;
	}

	public List<Trainer> findAll() {
		return trainerRepository.findAll(Sort.by("id"));
	}
}
