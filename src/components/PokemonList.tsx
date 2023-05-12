import { useMemo, useState } from "react";
import {
  useGetPokemonListQuery,
  useGetPokemonTypesQuery,
} from "../services/pokemonAPI";
import PokemonItem from "./PokemonItem";
import { Pokemon as PokemonType } from "../types/types";

interface Props {
  setChosenPokemon: (newVal: number) => void;
}

const PokemonList: React.FC<Props> = ({ setChosenPokemon }) => {
  const [page, setPage] = useState<number>(1);
  const [typeFilter, setTypeFilter] = useState("");
  const {
    data: pokemonList,
    error,
    isLoading,
    isFetching,
  } = useGetPokemonListQuery(page);
  const { data: types } = useGetPokemonTypesQuery();

  const visiblePokemons = useMemo(() => {
    if (!typeFilter) return pokemonList;
    return pokemonList?.filter((pokemon) =>
      pokemon.details.types.includes(typeFilter)
    );
  }, [pokemonList, typeFilter]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred</div>;
  }

  console.log(types);

  return (
    <div className="pokemon-container">
      <select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
      >
        <option value="">All types</option>
        {types?.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>
      <div className="pokemon-list">
        {!visiblePokemons?.length ? (
          <div>There are no pokemons with such type.</div>
        ) : (
          visiblePokemons?.map((pokemon: PokemonType) => (
            <PokemonItem
              key={pokemon.name}
              pokemon={pokemon}
              setChosenPokemon={setChosenPokemon}
            />
          ))
        )}
        {isFetching ? <div>Fetching more Pokemons...</div> : null}
      </div>
      <button
        className="load-more-button"
        onClick={() => setPage((page) => page + 1)}
      >
        Load More
      </button>
    </div>
  );
};

export default PokemonList;
