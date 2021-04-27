import React from "react";
import ReactDOM from "react-dom";
import { UserContext } from "../src/client/contexts/context";
import { MemoryRouter } from "react-router-dom";
import { act, Simulate } from "react-dom/test-utils";
import { Inbox } from "../src/client/components/Inbox";

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
  getInbox: async () => {
    return [
      { mid: 1, from: "test", status: true },
      { mid: 2, from: "test", status: true },
    ];
  },
  sendMessage: async () => {
    return 201;
  },
  getUsersToMessage: async () => {
    return [{ username: "test", firstName: "test" }];
  },
};

describe("Inbox view", () => {
  it("renders inbox on dom", async () => {
    const user = jest.fn();
    const container = await renderForTest(
      <Inbox messageApi={messageApi} />,
      user
    );
    expect(container.innerHTML).toMatchSnapshot();
  });
  it("clicks on send message", async () => {
    const user = jest.fn();
    const container = await renderForTest(
      <Inbox messageApi={messageApi} />,
      user
    );

    expect(container.querySelector("button").textContent).toEqual(
      "Send new message"
    );
    Simulate.click(container.querySelector("button"));
    expect(container.querySelector("button").textContent).toEqual(
      "Return to inbox"
    );
  });
});
