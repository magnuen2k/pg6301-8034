import { Home } from "../src/client/components/Home";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "../src/client/contexts/context";
import { act } from "react-dom/test-utils";

describe("home view", () => {
  it("show home on when logged in dom", () => {
    const user = jest.fn();
    const onSendData = jest.fn();
    const container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(
        <BrowserRouter>
          <UserContext.Provider value={{ user }}>
            <Home onSendData={onSendData} />
          </UserContext.Provider>
        </BrowserRouter>,
        container
      );
    });

    expect(container.innerHTML).toMatchSnapshot();
  });
  it("show home when not logged in", () => {
    const user = null;
    const onSendData = jest.fn();
    const container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(
        <BrowserRouter>
          <UserContext.Provider value={{ user }}>
            <Home onSendData={onSendData} />
          </UserContext.Provider>
        </BrowserRouter>,
        container
      );
    });

    expect(container.querySelector("div").textContent).toEqual(
      "Sign in to use our service!"
    );
  });
});
