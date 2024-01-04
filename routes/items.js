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
 * if request body not provided, return 400 error class
*/

router.post("/", function (req, res, next) {
  // Handle missing body data
  if (req.body === undefined) {
    throw new BadRequestError();
  }
  // TODO: Use const here
  let newItem = req.body;
  db.items.push(newItem);
  //TODO: Rather than showing req.body, show newItem to show what has been stored or db.items[db.items.length-1]
  return res.status(201).json({ added: req.body });
});

/**
 * GET /items/:name: return single item
*/

router.get("/:name", function (req, res, next) {
  const items = db.items;
  for (const item of items) {
    if (item.name === `${req.params.name}`) {
      return res.json(item);
    }
  }
  //TODO: .find() functional idiom could be used for the above 40-44
  //TODO: throw a NotFoundError here rather than next(). At the moment this works but would not if other routes added that could catch this.
  return next();
});

/**
 * PATCH /items/:name: accept JSON body, modify item, return it
 *
 * if request body not provided, return 400 error class
 * if :name not found, return next()
*/

router.patch("/:name", function (req, res, next) {
  // Handle missing body data
  if (req.body === undefined) {
    throw new BadRequestError();
  }

  for (let i = 0; i < db.items.length; i++) {
    //TODO: Don't need a template string for req.params.name, it already IS a string
    if (db.items[i].name === `${req.params.name}`) {
      db.items[i] = req.body;
      return res.json({ "updated": db.items[i] });
    }
  }
  //TODO: throw a NotFoundError here rather than next(). At the moment this works but would not if other routes added that could catch this.
  return next();
});


/**
 * DELETE /items/:name: delete item
 */

router.delete("/:name", function (req, res, next) {
  const itemToDelete = req.params.name;

  //TODO: Could use .findIndex functional idiom for the below
  for (let i = 0; i < db.items.length; i++) {
    if (db.items[i].name === itemToDelete) {
      db.items.splice(i, 1);
      return res.json({ message: "Deleted" });
    }
  }
  //TODO: throw a NotFoundError here rather than next(). At the moment this works but would not if other routes added that could catch this.
  return next();
});

module.exports = router;