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
 * Test GET /items/:name: return single item
 */

describe("GET /items", function () {
  test("Get the array of the items from the db", async function () {
    const resp = await request(app).get("/items");

    expect(resp.body).toEqual({ items: [{ name: "popsicle", price: 1.99 }] });
  });
});

/**
 * Test POST /items: accept JSON body, add item, and return it
 * if request body not provided, return 400 error class
 */

describe("POST /items", function () {
  test("Successful post of new item to db and return json", async function () {
    const resp = await request(app)
      .post("/items")
      .send({name: "pickles", price: 1.99});
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      added: {name: "pickles", price: 1.99}
    });
    expect(db.items.length).toEqual(2);
  });

  test("Unsuccessful post with an empty body", async function() {
    const resp = await request(app).post("/items").send();
    expect(resp.statusCode).toEqual(400);
    expect(resp.body).toEqual({ error: {message: "Bad Request", status: 400}});
  });
});