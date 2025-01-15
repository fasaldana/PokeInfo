import axios from "axios";

export const getPokemonList = async (offset, limit = 12) => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  const pokemonDetails = await Promise.all(
    response.data.results.map(async (p) => {
      const pokeDetails = await axios.get(p.url);
      return {
        id: pokeDetails.data.id,
        name: pokeDetails.data.name,
        types: pokeDetails.data.types.map((type) => type.type.name),
        image: pokeDetails.data.sprites.front_default,
      };
    })
  );
  return pokemonDetails;
};

export const searchPokemonByName = async (query) => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`
  );
  return {
    id: response.data.id,
    name: response.data.name,
    types: response.data.types.map((type) => type.type.name),
    image: response.data.sprites.front_default,
  };
};

export const getPokemonDetails = async (id) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return response.data;
};
