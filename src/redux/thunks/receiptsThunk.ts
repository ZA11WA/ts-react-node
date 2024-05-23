import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const listReceiptsThunk = createAsyncThunk(
  "receipts/listReceipts",
  async ({ token }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/v1/receipt/all`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createReceiptThunk = createAsyncThunk(
  "receipts/createReceipt",
  async ({ token, receiptData }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/v1/receipt/create`, receiptData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Receipt has been added");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editReceiptThunk = createAsyncThunk(
  "receipts/editReceipt",
  async ({ token, receiptData }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/v1/receipt/update`, receiptData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Receipt has been modified");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteReceiptThunk = createAsyncThunk(
  "receipts/deleteReceipt",
  async ({ token, uuid }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/v1/receipt/delete?uuid=${uuid}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Receipt has been removed");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getReceiptThunk = createAsyncThunk(
  "receipts/getReceipt",
  async ({ token, uuid }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/v1/receipt/one?uuid=${uuid}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
