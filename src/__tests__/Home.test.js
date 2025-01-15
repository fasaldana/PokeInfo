import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../pages/Home";
import { getPokemonList, searchPokemonByName } from "../api/pokemonService";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("../api/pokemonService");

const mockPokemonList = [
  {
    id: 1,
    name: "bulbasaur",
    types: ["grass", "poison"],
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  },
  {
    id: 2,
    name: "ivysaur",
    types: ["grass", "poison"],
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
  },
];

describe("Home", () => {
  beforeEach(() => {
    getPokemonList.mockResolvedValue(mockPokemonList);
    searchPokemonByName.mockResolvedValue(mockPokemonList[0]);
  });

  test("renders Home component", async () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    expect(
      screen.getByText(/Click on a Pokémon to see more info/i)
    ).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText(/ivysaur/i)).toBeInTheDocument()
    );
  });

  test("searches for a Pokémon", async () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Search by name or number/i), {
      target: { value: "bulbasaur" },
    });
    fireEvent.click(screen.getByText(/Search/i));

    await waitFor(() =>
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument()
    );
  });

  test("shows error message when Pokémon not found", async () => {
    searchPokemonByName.mockRejectedValueOnce(new Error("Pokémon not found"));

    render(
      <Router>
        <Home />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Search by name or number/i), {
      target: { value: "unknown" },
    });
    fireEvent.click(screen.getByText(/Search/i));

    await waitFor(() =>
      expect(screen.getByText(/Pokémon not found/i)).toBeInTheDocument()
    );
  });
});
