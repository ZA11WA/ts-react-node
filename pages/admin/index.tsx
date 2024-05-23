import React, { useEffect, useState } from "react";
import { useUserContext } from "@/utils/UserContext";
import { useRouter } from "next/router";
import SidebarWrapper from "@/components/sidebar/SidebarWrapper";
import {
  Button,
  Flex,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddUserModal from "@/components/AddEditUserModal/AddEditUserModal";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  closeDeleteModal,
  closeModal,
  openAddModal,
  openDeleteModal,
  openEditModal,
} from "@/redux/features/usersSlice";
import { deleteUserThunk, listUsersThunk } from "@/redux/thunks/usersThunk";

const Admin = () => {
  const userContext = useUserContext();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.users.users);

  const user = useAppSelector((state) => state.users.user);

  const createUserStatus = useAppSelector(
    (state) => state.users.createUserStatus
  );

  const editUserStatus = useAppSelector((state) => state.users.editUserStatus);

  const isDeleteModalOpen = useAppSelector(
    (state) => state.users.isDeleteModalOpen
  );

  useEffect(() => {
    dispatch(listUsersThunk({ token: userContext.token }));
  }, []);

  useEffect(() => {
    if (createUserStatus === "succeeded")
      dispatch(listUsersThunk({ token: userContext.token }));
  }, [createUserStatus]);

  useEffect(() => {
    if (editUserStatus === "succeeded")
      dispatch(listUsersThunk({ token: userContext.token }));
  }, [editUserStatus]);

  const openAddUserModal = () => {
    dispatch(openAddModal());
  };

  const openEditUserModal = (user: any) => {
    dispatch(openEditModal({ ...user }));
  };

  const closeUserModal = () => {
    dispatch(closeModal());
  };

  const onClickOpenDelete = (user: any) => {
    dispatch(openDeleteModal({ ...user }));
  };

  const onClickCloseDelete = () => {
    dispatch(closeDeleteModal());
  };

  if (
    userContext.token &&
    userContext.isTokenGivesAuth(userContext.token, ["USER"])
  ) {
    return (
      <SidebarWrapper>
        <Flex gap={2} direction="column">
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize={32}>Admin</Text>
          </Flex>
          <Flex justifyContent="end">
            <Button colorScheme="blue" mr={4} onClick={openAddUserModal}>
              Add User
            </Button>
          </Flex>
          <Flex justifyContent="center">
            <Table variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Surname</Th>
                  <Th>Login</Th>
                  <Th>Email</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map((user, index) => (
                  <Tr key={index}>
                    <Td>{user.firstName}</Td>
                    <Td>{user.lastName}</Td>
                    <Td>{user.login}</Td>
                    <Td>{user.email}</Td>
                    <Td>
                      <Button
                        onClick={() => openEditUserModal(user)}
                        colorScheme="green"
                        mr={2}>
                        <EditIcon />
                      </Button>
                      <Button
                        onClick={() => onClickOpenDelete(user)}
                        colorScheme="red">
                        <DeleteIcon />
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Flex>
        </Flex>
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={onClickCloseDelete}
          onConfirm={() => {
            if (user?.uuid) {
              dispatch(
                deleteUserThunk({ token: userContext.token, uuid: user.uuid })
              );
            }
          }}
          title="Delete User"
          message="Are you sure you want to delete this user?"
        />
        <AddUserModal onClose={closeUserModal} />
      </SidebarWrapper>
    );
  } else {
    router.push("/logout");
    return <Spinner />;
  }
};

export default Admin;
