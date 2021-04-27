import React from "react";
import ReactDOM from "react-dom";
import { LoadingView } from "../src/client/components/LoadingView";

describe("loading view", () => {
  it("renders loading view", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    ReactDOM.render(<LoadingView />, container);

    expect(container.innerHTML).toMatchSnapshot();
  });
});
