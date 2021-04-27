import { Nav } from "../src/client/components/Nav";
import React from "react";
import ReactDOM from "react-dom";
import { UserContext } from "../src/client/contexts/context";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { act, Simulate } from "react-dom/test-utils";

async function renderForTest(child, user) {
  const container = document.createElement("div");
  await act(async () => {
    await ReactDOM.render(
      <UserContext.Provider value={{ user }}>
        <MemoryRouter>{child}</MemoryRouter>
      </UserContext.Provider>,
      container
    );
  });
  return container;
}

describe("Nav view", () => {
  it("shows nav on om", async () => {
    const user = jest.fn();
    const container = await renderForTest(<Nav />, user);

    expect(container.innerHTML).toMatchSnapshot();
  });
  it("shows nav when user not logged in", async () => {
    const user = null;
    const container = await renderForTest(<Nav />, user);
    expect(container.querySelectorAll("a")[4].textContent).toEqual("Sign In");
  });
  it("sign user out", async () => {
    const user = jest.fn();
    const signOut = jest.fn();
    const container = await renderForTest(<Nav authApi={{ signOut }} />, user);
    Simulate.click(container.querySelector("#signOut"));

    expect(signOut).toBeCalled();
  });
});
