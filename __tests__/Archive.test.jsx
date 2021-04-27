import React from "react";
import ReactDOM from "react-dom";
import { UserContext } from "../src/client/contexts/context";
import { MemoryRouter } from "react-router-dom";
import { act, Simulate } from "react-dom/test-utils";
import { Archive } from "../src/client/components/Archive";

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

const messageApi = {
  getArchive: async () => {
    return [{ mid: 1, from: "test", status: false }];
  },
};
describe("Archive view", () => {
  it("renders archive on dom", async () => {
    const user = jest.fn();
    const container = await renderForTest(
      <Archive messageApi={messageApi} />,
      user
    );
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h1").textContent).toEqual(
      "'s archived messages"
    );
  });
  it("renders not logged in on archive page", async () => {
    const user = null;
    const container = await renderForTest(
      <Archive messageApi={messageApi} />,
      user
    );
    expect(container.querySelector("div").textContent).toEqual("Please log in");
  });
});
