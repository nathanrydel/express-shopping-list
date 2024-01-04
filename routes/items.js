"use strict";

const express = require("express");

const db = require("../fakeDb");
const { BadRequestError } = require("../middleware/expressErrors");
const router = new express.Router();

/**
 * GET /items: return list list of shopping items
*/

router.get("/", function (req, res, next) {
  return res.json(db);
});

/**
 * POST /items: accept JSON body, add item, and return it
*/

router.post("/", function (req, res, next) {
  if (req.body === undefined) {
    throw new BadRequestError();
  }

  let newItem = req.body;
  db.items.push(newItem);

  return res.status(201).json({ added: req.body });
});

/**
 * GET /items/:name: return single item
*/

router.get("/:name", function (req, res, next) {
  const items = db.items;
  for(const item of items) {
    if(item.name === `${req.params.name}`) {
      return res.json(item);
    }
  }
  return next();
})

/**
 * PATCH /items/:name: accept JSON body, modify item, return it
*/

router.patch("/:name", function (req, res, next) {
  const items = db.items;
  //TODO: Handle badrequest (no data in body)

  for(let i=0; i<db.items.length; i++) {
    if(db.items[i].name === `${req.params.name}`) {
      db.items[i] = req.body;
      return res.json({"updated": db.items[i]});
    }
  }
  return next();
})


module.exports = router;