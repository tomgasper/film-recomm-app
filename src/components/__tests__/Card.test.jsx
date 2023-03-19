import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Card from "../Card"

test("renders recommendation card with film info", async () => {
    const filmInfo = {
        id: "123456",
        title: "Test Film",
        summary: "Some description.",
        rating: 5.1,
        imageURL: "https://www.example.com/shawshank-redemption.jpg",
        };
    const shownAllRecommendations = false;
    
    render(<Card filmInfo={filmInfo} shownAllRecommendations={shownAllRecommendations} />);
    
    const cardContainer = screen.getByTestId("recommendation-card");
    expect(cardContainer).toBeInTheDocument();
    
    const imageDisplay = screen.getByTestId("image-display");
    expect(imageDisplay).toBeInTheDocument();
    expect(imageDisplay).toHaveAttribute("src", filmInfo.imageURL);
    
    const filmTitle = screen.getByTestId("film-title");
    expect(filmTitle).toBeInTheDocument();
    expect(filmTitle).toHaveTextContent(filmInfo.title);
    
    const filmDescription = screen.getByTestId("film-summary");
    expect(filmDescription).toBeInTheDocument();
    expect(filmDescription).toHaveTextContent(filmInfo.summary);
    
    await waitFor(() => {
        const rating = screen.getAllByTestId("star");
        expect(rating).toHaveLength(5);
      });
    
    const acceptButton = screen.getByTestId("button-accept");
    expect(acceptButton).toBeInTheDocument();
    
    const rejectButton = screen.getByTestId("button-reject");
    expect(rejectButton).toBeInTheDocument();
    });

test("renders no recommendation card", async () => {
    const filmInfo = {
        id: "123456",
        title: "Test Film",
        summary: "Some description.",
        rating: 5.1,
        imageURL: "https://www.example.com/shawshank-redemption.jpg",
        };
    const shownAllRecommendations = true;
    
    render(<Card filmInfo={filmInfo} shownAllRecommendations={shownAllRecommendations} />);
    
    const cardContainer = screen.getByTestId("norecommendation-card");
    expect(cardContainer).toBeInTheDocument();
    expect(cardContainer).toHaveTextContent("We ran out of recommendations for you! Check again later!");
    
    const imageDisplay = screen.getByTestId("img-sadface");
    expect(imageDisplay).toBeInTheDocument();
});