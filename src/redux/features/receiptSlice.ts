import { createSlice } from "@reduxjs/toolkit";
import {
  listReceiptsThunk,
  createReceiptThunk,
  editReceiptThunk,
  deleteReceiptThunk,
  getReceiptThunk,
} from "../thunks/receiptsThunk";
import { Receipt } from "@/utils/ReceiptContext";

interface IReceiptsSlice {
  receipts: Receipt[];
  receipt: Receipt | null;
  isModalOpen: boolean;
  isDeleteModalOpen: boolean;
  getReceiptsStatus: string;
  createReceiptStatus: string;
  editReceiptStatus: string;
  deleteReceiptStatus: string;
}

const initialState: IReceiptsSlice = {
  receipts: [],
  receipt: null,
  isModalOpen: false,
  isDeleteModalOpen: false,
  getReceiptsStatus: "",
  createReceiptStatus: "",
  editReceiptStatus: "",
  deleteReceiptStatus: "",
};

const receiptsSlice = createSlice({
  name: "receipts",
  initialState,
  reducers: {
    openAddModal: (state) => {
      state.isModalOpen = true;
    },
    openEditModal: (state, { payload }) => {
      state.receipt = payload;
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.receipt = null;
    },
    openDeleteModal: (state, { payload }) => {
      state.receipt = payload;
      state.isDeleteModalOpen = true;
    },
    closeDeleteModal: (state) => {
      state.isDeleteModalOpen = false;
      state.receipt = null;
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(listReceiptsThunk.fulfilled, (state, { payload }) => {
        state.receipts = payload;
        state.getReceiptsStatus = "succeeded";
      })
      .addCase(listReceiptsThunk.rejected, (state) => {
        state.getReceiptsStatus = "failed";
      });
    builder
      .addCase(createReceiptThunk.pending, (state) => {
        state.createReceiptStatus = "loading";
      })
      .addCase(createReceiptThunk.fulfilled, (state) => {
        state.isModalOpen = false;
        state.createReceiptStatus = "succeeded";
      })
      .addCase(createReceiptThunk.rejected, (state) => {
        state.createReceiptStatus = "failed";
      });
    builder
      .addCase(editReceiptThunk.pending, (state) => {
        state.editReceiptStatus = "loading";
      })
      .addCase(editReceiptThunk.fulfilled, (state, action) => {
        state.isModalOpen = false;
        state.receipt = null;
        state.editReceiptStatus = "succeeded";
      })
      .addCase(editReceiptThunk.rejected, (state, action) => {
        state.editReceiptStatus = "failed";
      });
    builder
      .addCase(deleteReceiptThunk.pending, (state) => {
        state.deleteReceiptStatus = "loading";
      })
      .addCase(deleteReceiptThunk.fulfilled, (state, { payload }) => {
        state.receipts = state.receipts.filter(
          (item) => item.uuid !== state.receipt?.uuid
        );
        state.isDeleteModalOpen = false;
        state.receipt = null;
        state.deleteReceiptStatus = "succeeded";
      })
      .addCase(deleteReceiptThunk.rejected, (state) => {
        state.deleteReceiptStatus = "failed";
      });
  },
});

export const {
  openAddModal,
  openEditModal,
  closeModal,
  openDeleteModal,
  closeDeleteModal,
} = receiptsSlice.actions;

export default receiptsSlice.reducer;
