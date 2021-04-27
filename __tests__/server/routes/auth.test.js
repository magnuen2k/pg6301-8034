const request = require("supertest");
const app = require("../../../src/server/app");

let counter = 0;

describe("auth tests", () => {
  it("Test fail login", async () => {
    const response = await request(app)
      .post("/api/auth/signin")
      .send({ username: "foo_" + counter++, password: "bar" })
      .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(401);
  });

  it("Test create user", async () => {
    const username = "foo_" + counter++;

    // using agent to make sure all requests is in same session
    const agent = request.agent(app);

    let response = await agent
      .post("/api/auth/signup")
      .send({ username, password: "bar" })
      .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(201);

    response = await agent.get("/api/auth/getuser");

    expect(response.statusCode).toBe(200);
  });
  it("tries to sign up", async () => {
    const response = await request(app)
      .post("/api/auth/signup")
      .send({ username: "foo_" + counter++, password: "bar" })
      .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(201);
  });
  it("tries to sign up existing user", async () => {
    const response = await request(app)
      .post("/api/auth/signup")
      .send({ username: "test", password: "test" })
      .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(400);
  });
  it("tries to sign in", async () => {
    const response = await request(app)
      .post("/api/auth/signin")
      .send({ username: "test", password: "test" })
      .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(200);
  });
  it("tries to sign out", async () => {
    //first sign in
    const agent = request.agent(app);
    let response = await agent
      .post("/api/auth/signin")
      .send({ username: "test", password: "test" })
      .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(200);

    response = await agent.get("/api/auth/signout");

    expect(response.statusCode).toBe(200);
  });
});
