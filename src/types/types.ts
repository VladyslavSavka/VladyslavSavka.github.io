export type Pokemon = {
  name: string;
  url: string;
  details: {
    imageUrl: string;
    types: string[];
    id: number;
  };
};

export type PokemonDetailsResponse = {
  stats: { stat: { name: string }; base_stat: number }[];
  types: { type: { name: string } }[];
  sprites: { front_default: string };
  weight: number;
  moves: {}[];
  name: string;
};

export type Type = {
  name: string;
};

export type PokemonDetails = {
  imageUrl: string;
  name: string;
  types: string[];
  attack: number;
  hp: number;
  defense: number;
  spAttack: number;
  spDefense: number;
  speed: number;
  weight: number;
  totalMoves: number;
};
