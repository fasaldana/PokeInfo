import React, { useReducer, useEffect, useCallback } from "react";
import { getPokemonList, searchPokemonByName } from "../api/pokemonService";
import Card from "../components/Card";
import PokeInfoModal from "../components/PokeInfoModal";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import Header from "../components/Header";
import ScrollButton from "../components/ScrollButton";
import { homeReducer, initialState } from "../reducer/homeReducer";

const Home = () => {
  const [state, dispatch] = useReducer(homeReducer, initialState);

  const fetchPokemon = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const newPokemon = await getPokemonList(state.offset);
      dispatch({ type: "SET_POKEMON", payload: newPokemon });
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
      dispatch({ type: "SET_ERROR", payload: "Error fetching Pokémon" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [state.offset]);

  useEffect(() => {
    fetchPokemon();
  }, [state.offset]);

  const searchPokemon = async (query) => {
    dispatch({ type: "SET_ERROR", payload: "" });
    dispatch({ type: "SET_LOADING", payload: true });
    if (!query) {
      dispatch({ type: "RESET_FILTERED_POKEMON" });
      dispatch({ type: "SET_LOADING", payload: false });
      return;
    }
    try {
      const pokemonData = await searchPokemonByName(query);
      dispatch({ type: "SET_FILTERED_POKEMON", payload: [pokemonData] });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Pokémon not found" });
      console.error("Error searching Pokémon:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const loadMorePokemon = () => {
    dispatch({ type: "INCREMENT_OFFSET", payload: 12 });
  };

  const handleCardClick = (pokemon) => {
    dispatch({ type: "SET_SELECTED_POKEMON", payload: pokemon });
  };

  const closeModal = () => {
    dispatch({ type: "SET_SELECTED_POKEMON", payload: null });
  };

  return (
    <div
      className="bg-backSec min-h-screen flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #87ceeb, #ffffff)",
      }}
    >
      <Header />
      <div className="bg-[#198ADA] p-10 flex flex-col items-center md:w-3/5 my-36 w-full">
        <SearchBar onSearch={searchPokemon} />
        {state.error && <span className="text-error">{state.error}</span>}
        <h3 className="text-lg mb-4">Click on a Pokémon to see more info</h3>
        <div className="grid lg:grid-cols-4 gap-4 grid-cols-2">
          {state.filteredPokemon.map((p) => (
            <Card
              key={p.id}
              name={p.name}
              types={p.types}
              image={p.image}
              id={p.id}
              onClick={() => handleCardClick(p)}
            />
          ))}
        </div>

        {state.loading ? (
          <Loader />
        ) : (
          state.hasMore && (
            <button
              className="bg-primary text-white p-3 mt-4"
              onClick={loadMorePokemon}
              disabled={state.loading}
            >
              {state.loading ? "Loading..." : "Load More"}
            </button>
          )
        )}

        {state.selectedPokemon && (
          <PokeInfoModal pokemon={state.selectedPokemon} onClose={closeModal} />
        )}
      </div>
      <ScrollButton />
    </div>
  );
};

export default Home;
