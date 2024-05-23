import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  createUserThunk,
  editUserThunk,
  editUserWithPasswordThunk,
} from "@/redux/thunks/usersThunk";
import { useUserContext } from "@/utils/UserContext";

const AddEditUserModal = ({ onClose }: any) => {
  const userContext = useUserContext();

  const { control, handleSubmit, reset, setValue, watch } = useForm();

  const dispatch = useAppDispatch();

  const [passwordChanged, setPasswordChanged] = useState<boolean>(false);

  const isModalOpen = useAppSelector((state) => state.users.isModalOpen);

  const selectedUser = useAppSelector((state) => state.users.user);

  const passwordWatch = watch("password");

  const onSubmit = (data: any) => {
    if (selectedUser) {
      if (passwordChanged) {
        dispatch(
          editUserWithPasswordThunk({
            token: userContext.token,
            userData: {
              firstName: data.firstName,
              lastName: data.lastName,
              login: data.login,
              email: data.email,
              password: data.password,
              uuid: selectedUser.uuid,
            },
          })
        );
      } else {
        dispatch(
          editUserThunk({
            token: userContext.token,
            userData: {
              uuid: selectedUser.uuid,
              firstName: data.firstName,
              lastName: data.lastName,
              login: data.login,
              email: data.email,
            },
          })
        );
      }
    } else {
      dispatch(createUserThunk({ token: userContext.token, userData: data }));
    }
  };

  useEffect(() => {
    if (isModalOpen) reset();
    if (selectedUser) {
      setValue("firstName", selectedUser.firstName);
      setValue("lastName", selectedUser.lastName);
      setValue("login", selectedUser.login);
      setValue("email", selectedUser.email);
      setValue("password", "**********");
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (selectedUser) {
      if (passwordWatch !== "" && passwordWatch !== "**********") {
        setPasswordChanged(true);
      } else {
        setPasswordChanged(false);
      }
    } else {
      setPasswordChanged(false);
    }
  }, [passwordWatch]);

  const handlePasswordClick = () => {
    if (!passwordChanged && selectedUser) {
      setValue("password", "");
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{selectedUser ? "Edit User" : "Add User"}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                render={({ field }) => <Input {...field} />}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Last Name</FormLabel>
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                render={({ field }) => <Input {...field} />}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Username</FormLabel>
              <Controller
                name="login"
                control={control}
                defaultValue=""
                render={({ field }) => <Input {...field} />}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => <Input {...field} />}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    type="password"
                    {...field}
                    onClick={handlePasswordClick}
                  />
                )}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              {selectedUser ? "Edit" : "Add"}
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddEditUserModal;
