import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SQL_FILE = ROOT / "Script_Pokedex.sql"
OUTPUT_DIR = ROOT / "backend" / "src" / "main" / "resources" / "data"
MISSING_TYPES = {151: "Psychic"}


def read_rows(sql, table):
    values = re.search(rf"INSERT INTO {table}\s*\(.*?\)\s*VALUES(.*?);", sql, re.DOTALL).group(1)
    return [parse_row(row) for row in re.findall(r"\((.*?)\)", values)]


def parse_row(row):
    return [parse_value(value.strip()) for value in row.split(",")]


def parse_value(value):
    if value.startswith("'"):
        return value[1:-1].replace("''", "'")
    return int(value)


def group_by_first_column(rows):
    groups = {}
    for key, value in rows:
        groups.setdefault(key, []).append(value)
    return groups


def build_pokemons(sql):
    type_names = dict(read_rows(sql, "Types"))
    pokemon_types = [(pokemon_id, type_names[type_id]) for pokemon_id, type_id in read_rows(sql, "Rel_Pokemon_Type")]
    types_by_pokemon = group_by_first_column(pokemon_types)
    for pokemon_id, type_name in MISSING_TYPES.items():
        types_by_pokemon.setdefault(pokemon_id, [type_name])
    return [to_pokemon(row, types_by_pokemon[row[0]]) for row in read_rows(sql, "Pokemon")]


def to_pokemon(row, types):
    pokemon_id, name, hp, attack, defense, special_attack, special_defense, speed = row
    return {
        "id": pokemon_id,
        "name": name,
        "stats": {
            "hp": hp,
            "attack": attack,
            "defense": defense,
            "specialAttack": special_attack,
            "specialDefense": special_defense,
            "speed": speed,
        },
        "types": types,
    }


def build_trainers(sql):
    pokemon_ids = group_by_first_column(read_rows(sql, "Rel_Trainer_Pokemon"))
    return [
        {"id": trainer_id, "name": name, "badges": badges, "pokemonIds": pokemon_ids.get(trainer_id, [])}
        for trainer_id, name, badges in read_rows(sql, "Trainers")
    ]


def write_json(path, data):
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def main():
    sql = SQL_FILE.read_text(encoding="utf-8")
    pokemons = build_pokemons(sql)
    trainers = build_trainers(sql)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    write_json(OUTPUT_DIR / "pokemons.json", pokemons)
    write_json(OUTPUT_DIR / "trainers.json", trainers)
    print(f"{len(pokemons)} pokémon e {len(trainers)} treinadores gerados em {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
