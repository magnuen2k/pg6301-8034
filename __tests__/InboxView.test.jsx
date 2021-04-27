import React from "react";
import { InboxView } from "../src/client/components/InboxView";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import { UserContext } from "../src/client/contexts/context";
import { MemoryRouter } from "react-router-dom";
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

it("renders inbox view with a reply function", async () => {
  const user = jest.fn();
  const data = [{ mid: 1, from: "test", status: true }];
  const reply = jest.fn();
  const deleteMessage = jest.fn();
  const container = await renderForTest(
    <InboxView data={data} onReply={reply} onDelete={deleteMessage} />,
    user
  );
  expect(container.querySelectorAll("button").length).toBe(3);
});
