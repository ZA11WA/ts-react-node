import { createSlice } from "@reduxjs/toolkit";
import {
  createUserThunk,
  deleteUserThunk,
  editUserThunk,
  editUserWithPasswordThunk,
  listUsersThunk,
} from "../thunks/usersThunk";
import { User } from "@/utils/UserContext";

interface IUsersSlice {
  users: User[];
  user: User | null;
  isModalOpen: boolean;
  isDeleteModalOpen: boolean;
  getUsersStatus: string;
  createUserStatus: string;
  editUserStatus: string;
  deleteUserStatus: string;
}

const initialState: IUsersSlice = {
  users: [],
  user: null,
  isModalOpen: false,
  isDeleteModalOpen: false,
  getUsersStatus: "",
  createUserStatus: "",
  editUserStatus: "",
  deleteUserStatus: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    openAddModal: (state) => {
      state.isModalOpen = true;
    },
    openEditModal: (state, { payload }) => {
      state.user = payload;
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.user = null;
    },
    openDeleteModal: (state, { payload }) => {
      state.user = payload;
      state.isDeleteModalOpen = true;
    },
    closeDeleteModal: (state) => {
      state.isDeleteModalOpen = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listUsersThunk.pending, (state) => {
        state.getUsersStatus = "loading";
      })
      .addCase(listUsersThunk.fulfilled, (state, { payload }) => {
        state.users = payload;
        state.getUsersStatus = "succeeded";
      })
      .addCase(listUsersThunk.rejected, (state) => {
        state.getUsersStatus = "failed";
      });
    builder
      .addCase(createUserThunk.pending, (state) => {
        state.createUserStatus = "loading";
      })
      .addCase(createUserThunk.fulfilled, (state) => {
        state.isModalOpen = false;
        state.createUserStatus = "succeeded";
      })
      .addCase(createUserThunk.rejected, (state) => {
        state.createUserStatus = "failed";
      });
    builder
      .addCase(editUserThunk.pending, (state) => {
        state.editUserStatus = "loading";
      })
      .addCase(editUserThunk.fulfilled, (state, action) => {
        state.isModalOpen = false;
        state.user = null;
        state.editUserStatus = "succeeded";
      })
      .addCase(editUserThunk.rejected, (state, action) => {
        state.editUserStatus = "failed";
      });
    builder
      .addCase(editUserWithPasswordThunk.pending, (state) => {
        state.editUserStatus = "loading";
      })
      .addCase(editUserWithPasswordThunk.fulfilled, (state, action) => {
        state.isModalOpen = false;
        state.user = null;
        state.editUserStatus = "succeeded";
      })
      .addCase(editUserWithPasswordThunk.rejected, (state, action) => {
        state.editUserStatus = "failed";
      });
    builder
      .addCase(deleteUserThunk.pending, (state) => {
        state.deleteUserStatus = "loading";
      })
      .addCase(deleteUserThunk.fulfilled, (state, { payload }) => {
        state.users = state.users.filter(
          (item) => item.uuid !== state.user?.uuid
        );
        state.isDeleteModalOpen = false;
        state.user = null;
        state.deleteUserStatus = "succeeded";
      })
      .addCase(deleteUserThunk.rejected, (state) => {
        state.deleteUserStatus = "failed";
      });
  },
});

export const {
  openAddModal,
  openEditModal,
  closeModal,
  openDeleteModal,
  closeDeleteModal,
} = usersSlice.actions;

export default usersSlice.reducer;
