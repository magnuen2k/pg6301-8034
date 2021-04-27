const {
  getMessage,
  newMessage,
  getArchive,
  getInbox,
  sentMessages,
} = require("../../../src/server/db/messages");

describe("message db service", () => {
  it("can return a specific message", () => {
    // create new message
    const ok = newMessage("message text", "test2", ["test"]);
    expect(ok).toBe(true);

    // get specific message
    const message = getMessage(1);
    expect(message.from).toContain("test2");
  });
  it("try to do actions without existing", () => {
    // try get archive message
    const archive = getArchive("not existing");
    expect(archive).toBe(false);

    // try get sent messages
    const messages = sentMessages("not existing");
    expect(messages).toBe(false);

    // try get sent messages
    const inbox = getInbox("not existing");
    expect(inbox).toBe(false);

    // create new message
    const message = newMessage("message text", "not existing", ["test"]);
    expect(message).toBe(false);
  });
});
