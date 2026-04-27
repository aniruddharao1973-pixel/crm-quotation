// src/modules/item/item.routes.js

import express from "express";
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} from "./item.controller.js";

const router = express.Router();

/* ================= CREATE ================= */
router.post("/", createItem);

/* ================= READ ================= */
router.get("/", getItems);
router.get("/:id", getItemById);

/* ================= UPDATE ================= */
router.put("/:id", updateItem);

/* ================= DELETE ================= */
router.delete("/:id", deleteItem);

export default router;