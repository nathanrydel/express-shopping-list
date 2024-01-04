"use strict";

const request = require("supertest");
const app = require("../app");

const db = require("../fakeDb");

const item = { name: "popsicle", price: 1.99 };

beforeEach(function () {
  db.items.push(item);
});

afterEach(function () {
  db.items = [];
});

/**
 * GET /items/:name: return single item
 */

describe("GET /items", function () {
  test("Get the array of the items from the db", async function () {
    const resp = await request(app).get("/items");

    expect(resp.body).toEqual({ items: [{ name: "popsicle", price: 1.99 }] });
  });
});