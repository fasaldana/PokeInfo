export const initialState = {
  pokemon: [],
  filteredPokemon: [],
  offset: 0,
  loading: false,
  hasMore: true,
  error: "",
  selectedPokemon: null,
};

export const homeReducer = (state, action) => {
  switch (action.type) {
    case "SET_POKEMON":
      return {
        ...state,
        pokemon: [...state.pokemon, ...action.payload],
        filteredPokemon: [...state.filteredPokemon, ...action.payload],
      };
    case "SET_FILTERED_POKEMON":
      return { ...state, filteredPokemon: action.payload, hasMore: false };
    case "RESET_FILTERED_POKEMON":
      return { ...state, filteredPokemon: state.pokemon, hasMore: true };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_SELECTED_POKEMON":
      return { ...state, selectedPokemon: action.payload };
    case "SET_HAS_MORE":
      return { ...state, hasMore: action.payload };
    case "INCREMENT_OFFSET":
      return { ...state, offset: state.offset + action.payload };
    default:
      return state;
  }
};
