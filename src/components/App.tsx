import { useState } from "react";
import "./App.css";
import PokemonDetails from "./PokemonDetails";
import PokemonList from "./PokemonList";

function App() {
  const [chosenPokemon, setChosenPokemon] = useState<null | number>(null);

  return (
    <div className="App">
      <header className="site-header">Pokedex</header>
      <div className="container">
        <PokemonList setChosenPokemon={setChosenPokemon} />
        <PokemonDetails pokemonId={chosenPokemon} />
      </div>
    </div>
  );
}

export default App;
