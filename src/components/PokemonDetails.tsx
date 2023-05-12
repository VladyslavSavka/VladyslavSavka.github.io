import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useGetPokemonByIdQuery } from "../services/pokemonAPI";

interface Props {
  pokemonId: null | number;
}

const PokemonDetails: React.FC<Props> = ({ pokemonId }) => {
  const { data: pokemon } = useGetPokemonByIdQuery(pokemonId ?? skipToken);

  return !pokemonId ? null : (
    <div className="pokemon-details">
      <img
        className="pokemon-details__image"
        src={pokemon?.imageUrl}
        alt={pokemon?.name}
      />
      <div className="pokemon-details__name">
        {pokemon?.name} #{pokemonId}
      </div>
      <div className="pokemon-details__table">
        <div className="pokemon-details__table-row">
          <p>Type</p>
          <p>{pokemon?.types.join(" ")}</p>
        </div>
        <div className="pokemon-details__table-row">
          <p>Attack</p>
          <p>{pokemon?.attack}</p>
        </div>
        <div className="pokemon-details__table-row">
          <p>Defense</p>
          <p>{pokemon?.defense}</p>
        </div>
        <div className="pokemon-details__table-row">
          <p>HP</p>
          <p>{pokemon?.hp}</p>
        </div>
        <div className="pokemon-details__table-row">
          <p>SP Attack</p>
          <p>{pokemon?.spAttack}</p>
        </div>
        <div className="pokemon-details__table-row">
          <p>SP Defense</p>
          <p>{pokemon?.spDefense}</p>
        </div>
        <div className="pokemon-details__table-row">
          <p>Speed</p>
          <p>{pokemon?.speed}</p>
        </div>
        <div className="pokemon-details__table-row">
          <p>Weight</p>
          <p>{pokemon?.weight}</p>
        </div>
        <div className="pokemon-details__table-row">
          <p>Total moves</p>
          <p>{pokemon?.totalMoves}</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
