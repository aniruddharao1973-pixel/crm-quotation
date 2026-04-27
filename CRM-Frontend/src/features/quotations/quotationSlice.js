// src/features/quotations/quotationSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

/* =========================================================
   ✅ HELPERS
========================================================= */
const normalize = (res) => res?.data?.data || res?.data;

// ✅ ENSURE ITEM SNAPSHOT CONSISTENCY
const normalizeQuotation = (q) => {
  if (!q) return q;

  return {
    ...q,
    items: (q.items || []).map((it) => ({
      ...it,

      category: it.category || it.item?.category || null,
      make: it.make || it.item?.make || null,
      mfgPartNo: it.mfgPartNo || it.item?.mfgPartNo || null,
      uom: it.uom || it.item?.uom || null,

      // ✅ NEW: normalize subItems
      subItems: it.subItems || [],

      // selectedSubItems: (it.subItems || []).map((sub) => ({
      //   ...sub,
      //   id: sub.itemId || sub.id,

      //   // ✅ ADD THESE
      //   sku: sub.sku || "",
      //   category: sub.category || null,

      //   qty: sub.quantity,
      //   price: sub.price,
      //   discount: sub.discount,
      // })),
      selectedSubItems: (it.subItems || []).map((sub) => {
        const qty = Number(sub.quantity || 0);
        const price = Number(sub.price || 0);
        const discount = Number(sub.discount || 0);

        const lineTotal = qty * price * (1 - discount / 100);

        return {
          ...sub,
          id: sub.itemId || sub.id,

          // 🔥 ADD THESE (FINAL FIX)
          sku: sub.sku || "",
          category: sub.category || null,
          make: sub.make || null,
          mfgPartNo: sub.mfgPartNo || null,
          uom: sub.uom || null,

          qty,
          price,
          discount,
          lineTotal,
        };
      }),
    })),
  };
};

/* =========================================================
   ✅ FETCH ALL
========================================================= */
export const fetchQuotations = createAsyncThunk(
  "quotations/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/quotations");
      return normalize(res);
    } catch (err) {
      return rejectWithValue(err.response?.data || "Fetch failed");
    }
  },
);

/* =========================================================
   ✅ FETCH ONE (NEW)
========================================================= */
export const fetchQuotationById = createAsyncThunk(
  "quotations/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.get(`/quotations/${id}`);
      return normalize(res);
    } catch (err) {
      return rejectWithValue(err.response?.data || "Fetch failed");
    }
  },
);

/* =========================================================
   ✅ CREATE
========================================================= */
export const createQuotation = createAsyncThunk(
  "quotations/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/quotations", data);
      return normalize(res);
    } catch (err) {
      return rejectWithValue(err.response?.data || "Create failed");
    }
  },
);

/* =========================================================
   ✅ DELETE (NEW)
========================================================= */
export const deleteQuotation = createAsyncThunk(
  "quotations/delete",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/quotations/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Delete failed");
    }
  },
);

export const updateQuotation = createAsyncThunk(
  "quotations/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/quotations/${id}`, data);
      return normalize(res);
    } catch (err) {
      return rejectWithValue(err.response?.data || "Update failed");
    }
  },
);

/* =========================================================
   ✅ SLICE
========================================================= */
const quotationSlice = createSlice({
  name: "quotations",

  initialState: {
    list: [],
    selected: null, // 🔥 NEW (for detail page)
    loading: false,
    error: null,
  },

  reducers: {
    clearQuotationError: (state) => {
      state.error = null;
    },
    clearSelectedQuotation: (state) => {
      state.selected = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ================= FETCH ALL ================= */
      .addCase(fetchQuotations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuotations.fulfilled, (state, action) => {
        state.loading = false;
        state.list = Array.isArray(action.payload)
          ? action.payload.map(normalizeQuotation)
          : [];
      })
      .addCase(fetchQuotations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= FETCH ONE ================= */
      .addCase(fetchQuotationById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuotationById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = normalizeQuotation(action.payload);
      })
      .addCase(fetchQuotationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= CREATE ================= */
      .addCase(createQuotation.pending, (state) => {
        state.loading = true;
      })
      .addCase(createQuotation.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(normalizeQuotation(action.payload));
      })
      .addCase(createQuotation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateQuotation.fulfilled, (state, action) => {
        const updated = normalizeQuotation(action.payload);

        // update list
        state.list = state.list.map((q) => (q.id === updated.id ? updated : q));

        // update selected (important for edit screen)
        if (state.selected?.id === updated.id) {
          state.selected = updated;
        }
      })

      /* ================= DELETE ================= */
      .addCase(deleteQuotation.fulfilled, (state, action) => {
        state.list = state.list.filter((q) => q.id !== action.payload);
      });
  },
});

export const { clearQuotationError, clearSelectedQuotation } =
  quotationSlice.actions;

export default quotationSlice.reducer;
