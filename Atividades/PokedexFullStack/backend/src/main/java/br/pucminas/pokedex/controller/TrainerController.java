package br.pucminas.pokedex.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.pucminas.pokedex.model.Trainer;
import br.pucminas.pokedex.service.TrainerService;

@RestController
@RequestMapping("/api/trainers")
public class TrainerController {

	private final TrainerService trainerService;

	public TrainerController(TrainerService trainerService) {
		this.trainerService = trainerService;
	}

	@GetMapping
	public List<Trainer> findAll() {
		return trainerService.findAll();
	}
}
