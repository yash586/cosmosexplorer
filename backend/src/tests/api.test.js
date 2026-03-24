import request from "supertest";
import { app } from "../app.js";

/**
 * API Integration Tests
 * Tests core endpoints return expected responses
 */
describe("Health Check", () => {
  test("GET /health returns 200", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});

describe("APOD API", () => {
  test("GET /api/apod returns success", async () => {
    const res = await request(app).get("/api/apod");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  }, 15000);

  test("GET /api/apod with date returns image", async () => {
    const res = await request(app)
      .get("/api/apod")
      .query({ date: "2024-01-01" });
    expect(res.status).toBe(200);
    expect(res.body.data.date).toBe("2024-01-01");
  }, 15000);
});

describe("Asteroids API", () => {
  test("GET /api/asteroids returns stats", async () => {
    const res = await request(app).get("/api/asteroids");
    expect(res.status).toBe(200);
    expect(res.body.data.stats).toBeDefined();
    expect(res.body.data.asteroids).toBeInstanceOf(Array);
  }, 15000);
});

describe("Discover API", () => {
  test("GET /api/discover returns items", async () => {
    const res = await request(app)
      .get("/api/discover")
      .query({ query: "mars" });
    expect(res.status).toBe(200);
    expect(res.body.data.items).toBeInstanceOf(Array);
  }, 15000);
});
