import React from "react";
import ReactDOM from "react-dom";
import { ErrorView } from "../src/client/components/ErrorView";

describe("error view", () => {
  it("renders error view", () => {
    const error = jest.fn();
    const container = document.createElement("div");
    document.body.appendChild(container);

    ReactDOM.render(<ErrorView error={error} />, container);

    expect(container.innerHTML).toMatchSnapshot();
  });
});
