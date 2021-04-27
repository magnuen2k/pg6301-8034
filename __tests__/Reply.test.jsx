import React from "react";
import { act, Simulate } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import { UserContext } from "../src/client/contexts/context";
import { MemoryRouter } from "react-router-dom";
import { Reply } from "../src/client/components/Reply";
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

describe("reply view", () => {
  // Find out how to mock useLocation
  /* it("renders reply view", async () => {
    const replyToMessage = jest.fn();

    const container = await renderForTest(
      <Reply messageApi={replyToMessage} />
    );

    expect(container.innerHTML).toMatchSnapshot();
  });*/
});
