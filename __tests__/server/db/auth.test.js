const { createGoogleUser } = require("../../../src/server/db/auth");

describe("testing auth db service", () => {
  it("add a google user to db if username exists", () => {
    const ok = createGoogleUser("test", "account", "test@account.com");
    expect(ok).toBe(false);
  });
  it("add a new google user to db", () => {
    const ok = createGoogleUser("unique", "account", "unique@account.com");
    expect(ok).toBe(true);
  });
});
