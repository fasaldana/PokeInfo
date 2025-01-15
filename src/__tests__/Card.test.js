import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Card from "../components/Card";
import "@testing-library/jest-dom";

const mockPokemon = {
  id: 1,
  name: "bulbasaur",
  image:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
};

describe("Card", () => {
  test("renders Card component", () => {
    render(<Card {...mockPokemon} onClick={jest.fn()} />);

    expect(screen.getByText(/N° 1/i)).toBeInTheDocument();
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByAltText(/bulbasaur sprite/i)).toBeInTheDocument();
  });

  test("calls onClick when the card is clicked", () => {
    const handleClick = jest.fn();
    render(<Card {...mockPokemon} onClick={handleClick} />);

    fireEvent.click(screen.getByAltText(/bulbasaur sprite/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("applies hover effects", () => {
    render(<Card {...mockPokemon} onClick={jest.fn()} />);

    const cardElement =
      screen.getByAltText(/bulbasaur sprite/i).parentElement.parentElement
        .parentElement;
    expect(cardElement).toHaveClass("hover:shadow-xl");
    expect(cardElement).toHaveClass("transition-shadow");
    expect(cardElement).toHaveClass("duration-300");
  });
});
