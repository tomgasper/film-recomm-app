import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Card from "../Card"
import { FilmContext } from "../../context/FilmContext";

test("Card shows default value", () => {
    render(<Card />);

    expect(screen.getByTestId("film-title").textContent).toBe("");
    expect(screen.getByTestId("film-summary").textContent).toBe("");
    expect(screen.getByTestId("rating").textContent).toBe("");
})

const customRender = (ui, {providerProps, ...renderOptions}) =>
{
    return render(
        <FilmContext.Provider {...providerProps}>{ui}</FilmContext.Provider>,
        renderOptions,
    )
}

test("Card shows values from provider", () =>{
    const providerProps = {
        value:
            {
                filmContext: {
                    imageURL: "",
                    title: "Sample film",
                    summary: "Sample summary"
                }
            }
    }

    customRender(<Card />, {providerProps});

    expect(screen.getByTestId("film-title").textContent).toBe("Sample film");
    expect(screen.getByTestId("film-summary").textContent).toBe("Sample summary");
})