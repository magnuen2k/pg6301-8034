import React from "react";
import { act, Simulate } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import { UserContext } from "../src/client/contexts/context";
import { MemoryRouter } from "react-router-dom";
import { SendMessage } from "../src/client/components/SendMessage";
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

describe("send message view", () => {
  it("renders send message form", async () => {
    const username = "test";
    const onSendMessage = jest.fn();
    const messageApi = {
      getUsersToMessage: async () => ["test"],
    };
    const container = await renderForTest(
      <SendMessage
        username={username}
        onSendMessage={onSendMessage}
        messageApi={messageApi}
      />
    );
    expect(container.innerHTML).toMatchSnapshot();
  });
  it("tries to send message", async () => {
    const username = "test";
    const onSendMessage = jest.fn();
    const messageApi = {
      getUsersToMessage: async () => ["test"],
    };
    const container = await renderForTest(
      <SendMessage
        username={username}
        onSendMessage={onSendMessage}
        messageApi={messageApi}
      />
    );

    // Add a recipient
    Simulate.change(container.querySelector(".addRecipient input"), {
      target: { value: "test" },
    });
    Simulate.submit(container.querySelector(".addRecipient"));

    // Write a message
    Simulate.change(container.querySelector(".sendMessage textarea "), {
      target: { value: "test message" },
    });

    Simulate.submit(container.querySelector(".sendMessage"));

    expect(onSendMessage).toBeCalled();
  });
});
