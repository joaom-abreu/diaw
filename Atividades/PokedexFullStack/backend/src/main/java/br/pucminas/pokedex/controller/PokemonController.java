package br.pucminas.pokedex.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.pucminas.pokedex.model.Pokemon;
import br.pucminas.pokedex.service.PokemonService;

@RestController
@RequestMapping("/api/pokemons")
public class PokemonController {

	private final PokemonService pokemonService;

	public PokemonController(PokemonService pokemonService) {
		this.pokemonService = pokemonService;
	}

	@GetMapping
	public List<Pokemon> findAll() {
		return pokemonService.findAll();
	}

	@GetMapping("/{id}")
	public Pokemon findById(@PathVariable Integer id) {
		return pokemonService.findById(id);
	}

	@PostMapping
	public ResponseEntity<Pokemon> create(@RequestBody Pokemon pokemon) {
		Pokemon created = pokemonService.create(pokemon);
		URI location = URI.create("/api/pokemons/" + created.id());
		return ResponseEntity.created(location).body(created);
	}

	@PutMapping("/{id}")
	public Pokemon update(@PathVariable Integer id, @RequestBody Pokemon pokemon) {
		return pokemonService.update(id, pokemon);
	}
}
