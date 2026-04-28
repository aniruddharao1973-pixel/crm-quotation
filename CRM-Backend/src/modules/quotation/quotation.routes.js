// src/modules/quotation/quotation.routes.js

import express from "express";
import {
  createQuotationController,
  getQuotationsController,
  getQuotationByIdController,
  getQuotationHistoryController, // 🔥 NEW
  updateQuotationController,
  deleteQuotationController,
} from "./quotation.controller.js";

const router = express.Router();

/* ================= CREATE ================= */
router.post("/", createQuotationController);

/* ================= GET ALL ================= */
router.get("/", getQuotationsController);

/* ================= GET HISTORY ================= */
// 🔥 IMPORTANT: place BEFORE "/:id"
router.get("/history/:quotationNo", getQuotationHistoryController);

/* ================= GET ONE ================= */
router.get("/:id", getQuotationByIdController);

/* ================= UPDATE ================= */
router.put("/:id", updateQuotationController);

/* ================= DELETE ================= */
router.delete("/:id", deleteQuotationController);

export default router;
