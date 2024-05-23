import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const listUsersThunk = createAsyncThunk(
  "users/listUsers",
  async ({ token }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/v1/user/`, {
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

export const createUserThunk = createAsyncThunk(
  "users/createUser",
  async ({ token, userData }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/v1/auth/register`, userData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("User has been added");

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editUserThunk = createAsyncThunk(
  "users/editUser",
  async ({ token, userData }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/v1/user/edit/userdto`, userData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("User has been modified");

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editUserWithPasswordThunk = createAsyncThunk(
  "users/editUserWithPassword",
  async ({ token, userData }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/v1/user/edit/user`, userData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("User has been modified");

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteUserThunk = createAsyncThunk(
  "users/deleteUser",
  async ({ token, uuid }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/v1/user/${uuid}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("User has been removed");

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
