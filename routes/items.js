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

router.post("/", function (req, res, next) {
  if (req.body === undefined) {
    throw new BadRequestError();
  }

  let newItem = req.body;
  db.items.push(newItem);

  return res.status(201).json({ added: req.body });
});

module.exports = router;