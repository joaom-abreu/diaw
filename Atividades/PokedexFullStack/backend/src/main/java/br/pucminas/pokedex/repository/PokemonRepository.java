package br.pucminas.pokedex.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;

import br.pucminas.pokedex.model.Pokemon;

public interface PokemonRepository extends MongoRepository<Pokemon, Integer> {

	List<Pokemon> findByNameContainingIgnoreCase(String name, Sort sort);

	List<Pokemon> findByTypesContaining(String type, Sort sort);

	List<Pokemon> findByNameContainingIgnoreCaseAndTypesContaining(String name, String type, Sort sort);
}
