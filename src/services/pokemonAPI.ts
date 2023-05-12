import { capitaliseFirstLetter } from "./../helpers/helpers";
import { PokemonDetails, PokemonDetailsResponse, Type } from "./../types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Pokemon } from "../types/types";

// Define the base URL for the PokeAPI
const baseUrl = "https://pokeapi.co/api/v2";

// Define the API endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getPokemonTypes: builder.query<Type[], void>({
      query: () => "/type?limit=999",
      transformResponse: (response: { results: Type[] }) => {
        return response.results;
      },
    }),
    getPokemonById: builder.query<PokemonDetails, number | null>({
      query: (id) => `/pokemon/${id}`,
      transformResponse: (response: PokemonDetailsResponse) => {
        return {
          imageUrl: response.sprites.front_default,
          name: capitaliseFirstLetter(response.name),
          types: response.types.map(
            (type: { type: { name: string } }) => type.type.name
          ),
          attack: response.stats.find((stat) => stat?.stat?.name === "attack")
            ?.base_stat as number,
          hp: response.stats.find((stat) => stat?.stat?.name === "hp")
            ?.base_stat as number,
          defense: response.stats.find((stat) => stat?.stat?.name === "defense")
            ?.base_stat as number,
          spAttack: response.stats.find(
            (stat) => stat?.stat?.name === "special-attack"
          )?.base_stat as number,
          spDefense: response.stats.find(
            (stat) => stat?.stat?.name === "special-defense"
          )?.base_stat as number,
          speed: response.stats.find((stat) => stat?.stat?.name === "speed")
            ?.base_stat as number,
          weight: response.weight,
          totalMoves: response.moves.length,
        };
      },
    }),
    getPokemonList: builder.query<Pokemon[], number>({
      query: (page) => `/pokemon?offset=${(page - 1) * 12}&limit=12`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCashe, responseData) => {
        console.log(currentCashe, responseData);
        return [...currentCashe, ...responseData];
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      transformResponse: async (response: { results: Pokemon[] }) => {
        const promises = response.results.map(async (pokemon) => {
          const detailResponse = await fetch(pokemon.url);
          const detailData = await detailResponse.json();
          return {
            ...pokemon,
            name: capitaliseFirstLetter(pokemon.name),
            details: {
              id: detailData.id,
              imageUrl: detailData.sprites.front_default,
              types: detailData.types.map(
                (type: { type: { name: string } }) => type.type.name
              ),
            },
          };
        });
        return Promise.all(promises).then((res) => res);
      },
    }),
  }),
});

// Export the API endpoints for use in our application
export const {
  useGetPokemonTypesQuery,
  useGetPokemonByIdQuery,
  useGetPokemonListQuery,
} = pokemonApi;
