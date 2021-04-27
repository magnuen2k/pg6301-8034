import { Auth } from "../src/client/components/Auth";
import React from "react";
import ReactDOM from "react-dom";
import { UserContext } from "../src/client/contexts/context";
import { MemoryRouter } from "react-router-dom";
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

describe("Auth view", () => {
  it("toggles auth views on dom", async () => {
    const signUp = jest.fn();
    const signIn = jest.fn();

    // Here we want to test how the view looks when you are not logged in
    const user = null;
    const container = await renderForTest(
      <Auth authApi={{ signIn, signUp }} />,
      user
    );
    expect(container.innerHTML).toMatchSnapshot();

    // Expect form "mode" to be for login
    expect(container.querySelector("#switch").textContent).toEqual(
      "Dont have an account yet? Sign Up"
    );

    // Simulate clicking on sign up
    Simulate.click(container.querySelector("#switch"));

    // Expect form "mode" to be for sign up
    expect(container.querySelector("#switch").textContent).toEqual(
      "Already have an account? Sign In"
    );
  });
  it("tries to log in", async () => {
    const signUp = jest.fn();
    const signIn = jest.fn();

    // Here we want to test how the view looks when you are not logged in
    const user = null;
    const container = await renderForTest(
      <Auth authApi={{ signIn, signUp }} />,
      user
    );
    // Simulate signing in (should send in api functions)
    Simulate.change(container.querySelector("input[name='username']"), {
      target: { value: "user" },
    });
    Simulate.change(container.querySelector("input[name='password']"), {
      target: { value: "password" },
    });

    // simulate click on button instead?
    //Simulate.click(container.querySelector("#submitBtn"));
    Simulate.submit(container.querySelector("form"));
    expect(signIn).toBeCalled();
  });
  it("tries to sign up", async () => {
    const signUp = jest.fn();
    const signIn = jest.fn();

    // Here we want to test how the view looks when you are not logged in
    const user = null;
    const container = await renderForTest(
      <Auth authApi={{ signIn, signUp }} />,
      user
    );

    // Simulate clicking on sign up
    Simulate.click(container.querySelector("#switch"));
    // Simulate signing up (should send in api functions)
    Simulate.change(container.querySelector("input[name='username']"), {
      target: { value: "user" },
    });
    Simulate.change(container.querySelector("input[name='password']"), {
      target: { value: "password" },
    });

    // simulate click on button instead?
    //Simulate.click(container.querySelector("#submitBtn"));
    Simulate.submit(container.querySelector("form"));
    expect(signUp).toBeCalled();
  });
});
