import { getColorFromString } from "../helpers/helpers";
import { Pokemon as PokemonType } from "../types/types";

interface Props {
  setChosenPokemon: (newVal: number) => void;
  pokemon: PokemonType;
}

const PokemonItem: React.FC<Props> = ({ pokemon, setChosenPokemon }) => {
  const onPokemonClick = () => setChosenPokemon(pokemon.details?.id);
  return (
    <div className="pokemon-card" onClick={onPokemonClick}>
      <img
        className="pokemon-image"
        src={pokemon.details?.imageUrl}
        alt={pokemon.name}
      />
      <div className="pokemon-name">{pokemon.name}</div>
      <div className="pokemon-types">
        {pokemon.details?.types.map((type) => (
          <div
            key={type}
            style={{ backgroundColor: getColorFromString(type) }}
            className="pokemon-type"
          >
            {type}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonItem;
