"use strict";

const express = require("express");

const db = require("../fakeDb");
const router = new express.Router();

/**
 * GET /items: return list list of shopping items
*/

router.get("/", function (req, res, next) {
  return res.json(db);
});


module.exports = router;