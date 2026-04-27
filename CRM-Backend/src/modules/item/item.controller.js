// src/modules/item/item.controller.js

import {
  createItemService,
  getItemsService,
  getItemByIdService,
  updateItemService,
  deleteItemService,
} from "./item.service.js";

/* ================= CREATE ================= */
export const createItem = async (req, res) => {
  try {
    const {
      category, // ✅ NEW
      sku,
      name,
      description,
      basePrice,
      make,
      mfgPartNo,
      uom,
      defaultRemarks,
      parentId,
    } = req.body;

    // ✅ BASIC VALIDATION
    if (!name) {
      // ✅ SKU not mandatory anymore
      return res.status(400).json({
        message: "SKU and Item Name are required",
      });
    }

    const item = await createItemService({
      category: category || null,

      parentId: parentId || null, // ✅ NEW

      sku,
      name,
      description,
      basePrice,
      make,
      mfgPartNo,
      uom,
      defaultRemarks,
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET ALL ================= */
export const getItems = async (req, res) => {
  try {
    const items = await getItemsService();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET ONE ================= */
export const getItemById = async (req, res) => {
  try {
    console.log("🔥 ITEM API HIT");
    console.log("👉 PARAM ID:", req.params.id);

    const item = await getItemByIdService(req.params.id);

    console.log("👉 DB RESULT:", item);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= UPDATE ================= */
export const updateItem = async (req, res) => {
  try {
    const {
      category, // ✅ NEW
      sku,
      name,
      description,
      basePrice,
      make,
      mfgPartNo,
      uom,
      defaultRemarks,
      parentId,
    } = req.body;

    const item = await updateItemService(req.params.id, {
      category: category || null,

      parentId: parentId !== undefined ? parentId : undefined,

      sku,
      name,
      description,
      basePrice,
      make,
      mfgPartNo,
      uom,
      defaultRemarks,
    });

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= DELETE ================= */
export const deleteItem = async (req, res) => {
  try {
    await deleteItemService(req.params.id);
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
