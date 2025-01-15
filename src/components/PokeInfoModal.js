import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import colors from "../misc/pokeTypes";
import Loader from "./Loader";
import { getPokemonDetails } from "../api/pokemonService";

const PokeInfoModal = ({ pokemon, onClose }) => {
  const [details, setDetails] = useState(null);
  const [error, setError] = useState("");
  const [showAllMoves, setShowAllMoves] = useState(false);

  const getTypeStyles = (type) => {
    const typeColor = colors[type][0];
    const textColor = colors[type][1];
    return {
      backgroundColor: typeColor,
      color: textColor,
      border: `1px solid ${textColor}`,
    };
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getPokemonDetails(pokemon.id);
        setDetails(data);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
        setError("Failed to load Pokémon details.");
      }
    };

    fetchDetails();
  }, [pokemon.id]);

  const toggleShowAllMoves = () => setShowAllMoves((prev) => !prev);

  if (error) {
    return (
      <div className="flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!details) {
    return <Loader />;
  }

  const firstTypeColor = colors[details.types[0].type.name][0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div
        className="p-5 rounded-lg shadow-xl relative w-11/12 md:w-3/4 max-w-3xl"
        style={{
          background: `linear-gradient(to top, white, ${firstTypeColor})`,
        }}
      >
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-10 right-10 rounded-full text-2xl flex items-center justify-center cursor-pointer"
          aria-label="Close modal"
        >
          ×
        </button>

        <div className="max-h-[80vh] overflow-y-auto pt-8">
          <h1 className="text-3xl font-bold capitalize text-center mb-4">
            #{pokemon.id} {pokemon.name}
          </h1>

          <div className="flex justify-center mb-6">
            <img
              src={pokemon.image}
              alt={`${pokemon.name} sprite`}
              className="w-40 h-40"
            />
          </div>
          <div className="flex justify-center space-x-3 mb-6">
            {details.types.map((type, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded text-white capitalize shadow-md"
                style={getTypeStyles(type.type.name)}
              >
                {type.type.name}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg ml-10">
            <div>
              <h2 className="text-xl font-semibold mb-2">Abilities:</h2>
              {details.abilities.map((ability, index) => (
                <p key={index} className="capitalize">
                  {ability.ability.name}
                </p>
              ))}
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Forms:</h2>
              {details.forms.map((form, index) => (
                <p key={index} className="capitalize">
                  {form.name}
                </p>
              ))}
            </div>
            <div>
              <strong>Moves:</strong>
              <div className="max-h-40 overflow-y-auto">
                {(showAllMoves ? details.moves : details.moves.slice(0, 5)).map(
                  (move, index) => (
                    <p key={index} className="capitalize">
                      {move.move.name}
                    </p>
                  )
                )}
              </div>
              {details.moves.length > 5 && (
                <button
                  onClick={toggleShowAllMoves}
                  className="text-primary underline mt-2"
                >
                  {showAllMoves ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PokeInfoModal.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PokeInfoModal;
