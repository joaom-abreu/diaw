package br.pucminas.pokedex.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import br.pucminas.pokedex.model.Trainer;

public interface TrainerRepository extends MongoRepository<Trainer, Integer> {
}
