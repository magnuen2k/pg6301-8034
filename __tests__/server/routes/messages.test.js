const request = require("supertest");
const app = require("../../../src/server/app");

describe("messages API", () => {
  it("can send a message", async () => {
    const agent = request.agent(app);

    let response = await agent
      .post("/api/messages/sendMessage")
      .send({ message: "test", to: ["test"], from: "test2" })
      .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(200);
  });
  it("tries to see empty inbox", async () => {
    // Make sure all requests are in same session
    const agent = request.agent(app);

    // Log in as "test"
    let response = await agent
      .post("/api/auth/signin")
      .send({ username: "test", password: "test" })
      .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(200);

    // Get "test's" inbox
    response = await agent.get("/api/messages/getInbox");
    expect(response.statusCode).toBe(200);
  });
  it("tries to see inbox when not logged in", async () => {
    // Make sure all requests are in same session
    const agent = request.agent(app);

    // Try to get inbox
    let response = await agent.get("/api/messages/getInbox");
    expect(response.statusCode).toBe(400);
  });
  it("can see inbox", async () => {
    // Make sure all requests are in same session
    const agent = request.agent(app);

    // Log in as "test"
    let response = await agent
      .post("/api/auth/signin")
      .send({ username: "test", password: "test" })
      .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(200);

    // Send some messages from "test2" user to "test"
    response = await agent
      .post("/api/messages/sendMessage")
      .send({ message: "test", to: ["test"], from: "test2" })
      .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(200);

    response = await agent
      .post("/api/messages/sendMessage")
      .send({ message: "another one", to: ["test"], from: "test2" })
      .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(200);

    // Get "test's" inbox
    response = await agent.get("/api/messages/getInbox");
    expect(response.statusCode).toBe(200);
  });
  it("replies to a message", async () => {
    // Make sure all requests are in same session
    const agent = request.agent(app);

    // Log in as "test"
    let response = await agent
      .post("/api/auth/signin")
      .send({ username: "test", password: "test" })
      .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(200);

    // Send a message from "test2" user to "test"
    response = await agent
      .post("/api/messages/sendMessage")
      .send({ message: "test", to: ["test"], from: "test2" })
      .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(200);

    // reply to message
    response = await agent
      .post("/api/messages/reply")
      .send({ message: "test", to: ["test2"], from: "test", replyTo_id: 1 })
      .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(200);
  });
  it("get all messages sent from a user", async () => {
    // Make sure all requests are in same session
    const agent = request.agent(app);

    // Log in as "test"
    let response = await agent
      .post("/api/auth/signin")
      .send({ username: "test", password: "test" })
      .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(200);

    // Send some messages from "test" user to "test2"
    response = await agent
      .post("/api/messages/sendMessage")
      .send({ message: "test", to: ["test2"], from: "test" })
      .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(200);
    response = await agent
      .post("/api/messages/sendMessage")
      .send({ message: "another one", to: ["test2"], from: "test" })
      .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(200);

    // reply to message
    response = await agent.get("/api/messages/getUserMessages");

    expect(response.statusCode).toBe(200);
  });
  it("remove a user from the message thread", async () => {
    // Make sure all requests are in same session
    const agent = request.agent(app);

    // Log in as "test"
    let response = await agent
      .post("/api/auth/signin")
      .send({ username: "test", password: "test" })
      .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(200);

    // Send some messages from "test2" user to "test"
    response = await agent
      .post("/api/messages/sendMessage")
      .send({ message: "test", to: ["test"], from: "test2" })
      .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(200);
    response = await agent
      .post("/api/messages/sendMessage")
      .send({ message: "another one", to: ["test"], from: "test2" })
      .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(200);

    // delete a message
    response = await agent.delete("/api/messages/delete/1");

    expect(response.statusCode).toBe(204);
  });
  it("get a users archived messages", async () => {
    // Make sure all requests are in same session
    const agent = request.agent(app);

    // Log in as "test"
    let response = await agent
      .post("/api/auth/signin")
      .send({ username: "test", password: "test" })
      .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(200);

    // Send some messages from "test2" user to "test"
    response = await agent
      .post("/api/messages/sendMessage")
      .send({ message: "test", to: ["test"], from: "test2" })
      .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(200);
    response = await agent
      .post("/api/messages/sendMessage")
      .send({ message: "another one", to: ["test"], from: "test2" })
      .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(200);

    // archive a message
    response = await agent.delete("/api/messages/delete/1");
    expect(response.statusCode).toBe(204);

    // get users archived messages
    response = await agent.get("/api/messages/getArchive");
    expect(response.statusCode).toBe(200);
  });
  it("try to get archived messages when not logged in", async () => {
    // Make sure all requests are in same session
    const agent = request.agent(app);

    // get users archived messages
    let response = await agent.get("/api/messages/getArchive");
    expect(response.statusCode).toBe(400);
  });
  it("try to get all users a user can send messages to", async () => {
    // Make sure all requests are in same session
    const agent = request.agent(app);

    // Log in as "test"
    let response = await agent
      .post("/api/auth/signin")
      .send({ username: "test", password: "test" })
      .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(200);

    response = await agent.get("/api/auth/getUsersToMessage");
    expect(response.statusCode).toBe(200);
  });
});
