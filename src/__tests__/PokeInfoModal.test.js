import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import PokeInfoModal from "../components/PokeInfoModal";
import { getPokemonDetails } from "../api/pokemonService";
import "@testing-library/jest-dom";

jest.mock("../api/pokemonService");

const mockPokemon = {
  id: 1,
  name: "bulbasaur",
  image:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
};

const mockDetails = {
  types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
  abilities: [
    { ability: { name: "overgrow" } },
    { ability: { name: "chlorophyll" } },
  ],
  forms: [{ name: "bulbasaur" }],
  moves: [
    { move: { name: "tackle" } },
    { move: { name: "growl" } },
    { move: { name: "leech seed" } },
    { move: { name: "vine whip" } },
    { move: { name: "poison powder" } },
    { move: { name: "razor leaf" } },
  ],
};

describe("PokeInfoModal", () => {
  beforeEach(() => {
    getPokemonDetails.mockResolvedValue(mockDetails);
  });

  test("renders PokeInfoModal component", async () => {
    await act(async () => {
      render(<PokeInfoModal pokemon={mockPokemon} onClose={jest.fn()} />);
    });

    await waitFor(() =>
      expect(screen.getByText(/#1 bulbasaur/i)).toBeInTheDocument()
    );
    expect(screen.getByAltText(/bulbasaur sprite/i)).toBeInTheDocument();
    expect(screen.getByText(/grass/i)).toBeInTheDocument();
    const poisonElements = screen.getAllByText(/poison/i);
    expect(poisonElements.length).toBeGreaterThan(0);
    expect(screen.getByText(/Abilities:/i)).toBeInTheDocument();
    expect(screen.getByText(/overgrow/i)).toBeInTheDocument();
    expect(screen.getByText(/chlorophyll/i)).toBeInTheDocument();
    expect(screen.getByText(/Forms:/i)).toBeInTheDocument();
    const bulbasaurElements = screen.getAllByText(/bulbasaur/i);
    expect(bulbasaurElements.length).toBeGreaterThan(0);
    expect(screen.getByText(/Moves:/i)).toBeInTheDocument();
    expect(screen.getByText(/tackle/i)).toBeInTheDocument();
    expect(screen.getByText(/growl/i)).toBeInTheDocument();
  });

  test("shows more moves when 'Show More' is clicked", async () => {
    await act(async () => {
      render(<PokeInfoModal pokemon={mockPokemon} onClose={jest.fn()} />);
    });

    await waitFor(() =>
      expect(screen.getByText(/#1 bulbasaur/i)).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText(/Show More/i));

    expect(screen.getByText(/poison powder/i)).toBeInTheDocument();
    expect(screen.getByText(/razor leaf/i)).toBeInTheDocument();
    expect(screen.getByText(/Show Less/i)).toBeInTheDocument();
  });

  test("calls onClose when close button is clicked", async () => {
    const onClose = jest.fn();
    await act(async () => {
      render(<PokeInfoModal pokemon={mockPokemon} onClose={onClose} />);
    });

    await waitFor(() =>
      expect(screen.getByText(/#1 bulbasaur/i)).toBeInTheDocument()
    );

    fireEvent.click(screen.getByLabelText(/Close modal/i));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("shows error message when details fail to load", async () => {
    getPokemonDetails.mockRejectedValueOnce(
      new Error("Failed to load Pokémon details.")
    );
    await act(async () => {
      render(<PokeInfoModal pokemon={mockPokemon} onClose={jest.fn()} />);
    });

    await waitFor(() =>
      expect(
        screen.getByText(/Failed to load Pokémon details./i)
      ).toBeInTheDocument()
    );
  });
});
