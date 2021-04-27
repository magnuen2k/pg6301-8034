import React from "react";
import ReactDOM from "react-dom";
import { UserContext } from "../src/client/contexts/context";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { Outbox } from "../src/client/components/Outbox";

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
  getUserMessages: async () => {
    return [{ mid: 1, from: "test", status: false }];
  },
};

describe("Outbox view", () => {
  it("renders outbox on dom", async () => {
    const user = jest.fn();
    const container = await renderForTest(
      <Outbox messageApi={messageApi} />,
      user
    );
    expect(container.innerHTML).toMatchSnapshot();
  });
  it("renders not logged in on outbox page", async () => {
    const user = null;
    const container = await renderForTest(
      <Outbox messageApi={messageApi} />,
      user
    );
    expect(container.querySelector("div").textContent).toEqual("Please log in");
  });
});
