import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Rating from "../Rating/Rating";

const ratingTests = [
    { rating: 0, expectedStars: 0 },
    { rating: 0.7, expectedStars: 1 },
    { rating: 3.0, expectedStars: 3 },
    { rating: 7.4, expectedStars: 7 },
    { rating: 14.5, expectedStars: 10 },
  ];
  
  ratingTests.map(({ rating, expectedStars }) => {
    test(`Passed rating of ${rating}`, async () => {
      const { container } = render(<Rating rating={rating} />);

      await waitFor(() => {
        const renderedStars = container.querySelectorAll("[data-testid='star']");
        expect(renderedStars.length).toBe(expectedStars);
      });
    });
  });
  