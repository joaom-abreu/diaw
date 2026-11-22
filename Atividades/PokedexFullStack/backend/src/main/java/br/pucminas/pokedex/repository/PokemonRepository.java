package br.pucminas.pokedex.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import br.pucminas.pokedex.model.Pokemon;

public interface PokemonRepository extends MongoRepository<Pokemon, Integer> {
}
