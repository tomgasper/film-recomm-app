import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../../App";
import { mockAPICall } from "../../utils/mockBackend";

jest.mock("../../utils/mockBackend");

const createApiResponse = (data) => {
    return new Promise((resolve, reject) => {
        const dataJSON = JSON.stringify(data);
        const res = new Response(dataJSON);
        return resolve(res);
    })
};

const successfulGET1 = () => {
    const data = {
        id: "123",
        imageURL: "https://example.com/image.png",
        title: "Example Film",
        summary: "An example film summary.",
        rating: 8.5,
    }
    return createApiResponse(data);
};

const successfulGET2 = () => {
    const data = {
        id: "456",
        imageURL: "https://example.com/image.png",
        title: "Another film",
        summary: "Another example film summary.",
        rating: 3.5,
    }
    return createApiResponse(data);
};

const successfulGET3 = () => {
    const data = {
        id: "_RECERROR_01",
        imageURL: "",
        title: "",
        summary: "",
        rating: -1,
    }
    return createApiResponse(data);
};

const unsuccessfulPUT = () => {
    const data = {
        id: "_RECERROR_01",
        imageURL: "",
        title: "",
        summary: "",
        rating: -1,
    }
    return createApiResponse(data);
};


beforeEach(() => {
    mockAPICall.mockImplementation( successfulGET1 )   
})

describe("App", () => {
  test("should display movie details after fetching data", async () => {
    render(<App />);

    // Wait for data to be fetched and displayed
    await waitFor(() => {
        // Assert that all movie details are displayed
        expect(screen.queryByTestId("recommendation-card")).toBeInTheDocument()

        expect(screen.getByText("Example Film")).toBeInTheDocument();
        expect(screen.getByText("An example film summary.")).toBeInTheDocument();
        expect(screen.getByText("accept")).toBeInTheDocument();
        expect(screen.getByText("reject")).toBeInTheDocument();
    });

    // Click on "Accept" button
    mockAPICall.mockImplementation( successfulGET2 );
    userEvent.click(screen.getByText("accept"));

    // Wait for server response and check if new data is fetched and displayed
    await waitFor(() => 
    {
        expect(screen.queryByTestId("recommendation-card")).toBeInTheDocument();
        expect(screen.getByText("Another film")).toBeInTheDocument();
        expect(screen.getByText("Another example film summary.")).toBeInTheDocument();
        expect(screen.getByText("accept")).toBeInTheDocument();
        expect(screen.getByText("reject")).toBeInTheDocument();
    });

    // Mock the response to simulate the end of recommendations
    userEvent.click(screen.getByText("reject"));
    mockAPICall.mockImplementation( successfulGET3 );

    // Wait for server response and check if "NoRecommendationCard" is displayed
    await waitFor(
    () => {
        expect(screen.queryByTestId("norecommendation-card")).toBeInTheDocument();
        expect(screen.getByText("We ran out of recommendations for you! Check again later!")).toBeInTheDocument();
  })})

  test("should display same film details", async () => {
    render(<App />);

    // Wait for data to be fetched and displayed
    await waitFor(() => {
        // Assert that all movie details are displayed
        expect(screen.queryByTestId("recommendation-card")).toBeInTheDocument()
        expect(screen.getByText("Example Film")).toBeInTheDocument();
        expect(screen.getByText("An example film summary.")).toBeInTheDocument();
        expect(screen.getByText("accept")).toBeInTheDocument();
        expect(screen.getByText("reject")).toBeInTheDocument();
    });

    // Click on "Accept" button
    mockAPICall.mockImplementation( unsuccessfulPUT );
    userEvent.click(screen.getByText("accept"));

    // Wait for server response and check if new data is fetched and displayed
    await waitFor(() => 
    {
        expect(screen.queryByTestId("recommendation-card")).toBeInTheDocument();
        expect(screen.getByText("Example Film")).toBeInTheDocument();
        expect(screen.getByText("An example film summary.")).toBeInTheDocument();
        expect(screen.getByText("accept")).toBeInTheDocument();
        expect(screen.getByText("reject")).toBeInTheDocument();
    });
    })

});