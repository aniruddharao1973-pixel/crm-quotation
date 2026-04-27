// src/features/items/itemSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

/* ================= NORMALIZER ================= */
const normalize = (res) => res?.data?.data || res?.data;

/* ================= CREATE ITEM ================= */
export const createItem = createAsyncThunk(
  "items/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/items", data);
      return normalize(res);
    } catch (err) {
      return rejectWithValue(err.response?.data || "Create item failed");
    }
  },
);

/* ================= FETCH ALL ITEMS ================= */
export const fetchItems = createAsyncThunk(
  "items/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/items");
      return normalize(res);
    } catch (err) {
      return rejectWithValue(err.response?.data || "Fetch items failed");
    }
  },
);

/* ================= UPDATE ITEM ================= */
export const updateItem = createAsyncThunk(
  "items/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/items/${id}`, data);
      return normalize(res);
    } catch (err) {
      return rejectWithValue(err.response?.data || "Update failed");
    }
  },
);

/* ================= DELETE ITEM ================= */
export const deleteItem = createAsyncThunk(
  "items/delete",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/items/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Delete failed");
    }
  },
);

/* ================= HIERARCHY HELPER ================= */
export const buildItemTree = (items) => {
  const map = {};
  const roots = [];

  items.forEach((item) => {
    map[item.id] = { ...item, children: [] };
  });

  items.forEach((item) => {
    if (item.parentId) {
      map[item.parentId]?.children.push(map[item.id]);
    } else {
      roots.push(map[item.id]);
    }
  });

  return roots;
};

/* ================= SLICE ================= */
const itemSlice = createSlice({
  name: "items",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      /* ===== FETCH ===== */
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.list = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== CREATE ===== */
      .addCase(createItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload); // ✅ includes category automatically
      })
      .addCase(createItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== UPDATE ===== */
      .addCase(updateItem.fulfilled, (state, action) => {
        const updateRecursive = (items) =>
          items.map((item) => {
            if (item.id === action.payload.id) {
              return {
                ...item,
                ...action.payload,
                children: item.children || [], // preserve children
              };
            }

            if (item.children?.length) {
              return {
                ...item,
                children: updateRecursive(item.children),
              };
            }

            return item;
          });

        state.list = updateRecursive(state.list);
      })

      /* ===== DELETE ===== */
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.list = state.list.filter((i) => i.id !== action.payload);
      });
  },
});

export default itemSlice.reducer;
