import React from "react";
import ReactDOM from "react-dom";
import { UserContext } from "../src/client/contexts/context";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { Notification } from "../src/client/components/Notification";

async function renderForTest(child, user) {
  const container = document.createElement("div");
  await act(async () => {
    await ReactDOM.render(<MemoryRouter>{child}</MemoryRouter>, container);
  });
  return container;
}

describe("notifiation view", () => {
  it("renders notification view", async () => {
    const notify = ["new message"];

    const container = await renderForTest(<Notification notify={notify} />);

    expect(container.innerHTML).toMatchSnapshot();
  });
});
