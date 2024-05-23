import React, { useEffect } from "react";
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
import AddBillModal from "@/components/AddBillModal/AddBillModal";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";
import { useReceiptContext } from "@/utils/ReceiptContext";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  listReceiptsThunk,
  deleteReceiptThunk,
} from "@/redux/thunks/receiptsThunk";
import {
  openAddModal,
  openEditModal,
  closeModal,
  openDeleteModal,
  closeDeleteModal,
} from "@/redux/features/receiptSlice";

const Admin = () => {
  const userContext = useUserContext();
  const receiptContext = useReceiptContext();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const receipts = useAppSelector((state) => state.receipts.receipts);
  const isModalOpen = useAppSelector((state) => state.receipts.isModalOpen);
  const isDeleteModalOpen = useAppSelector((state) => state.receipts.isDeleteModalOpen);
  const selectedReceipt = useAppSelector((state) => state.receipts.receipt);

  useEffect(() => {
    if (userContext.token) {
      dispatch(listReceiptsThunk({ token: userContext.token }));
    }
  }, [userContext.token]);

  const openAddBillModal = () => {
    dispatch(openAddModal());
  };

  const closeAddBillModal = () => {
    dispatch(closeModal());
  };

  const handleOpenEditModal = (receipt: any) => {
    dispatch(openEditModal(receipt));
  };

  const handleOpenDeleteModal = (receipt: any) => {
    dispatch(openDeleteModal(receipt));
  };

  const closeDeleteModalHandler = () => {
    dispatch(closeDeleteModal());
  };

  const handleDeleteReceipt = () => {
    if (selectedReceipt) {
      dispatch(deleteReceiptThunk({ token: userContext.token, uuid: selectedReceipt.uuid }));
      closeDeleteModalHandler();
    }
  };

  if (typeof window !== 'undefined') {
    if (
      userContext.token &&
      userContext.isTokenGivesAuth(userContext.token, ["USER"])
    ) {
      return (
        <SidebarWrapper>
          <Flex gap={2} direction="column">
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize={32}>Receipts</Text>
            </Flex>
            <Flex justifyContent="end">
              <Button colorScheme="blue" mr={4} onClick={openAddBillModal}>
                Add Receipt
              </Button>
            </Flex>
            <Flex justifyContent="center">
              <Table variant="striped" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th>Title</Th>
                    <Th>Description</Th>
                    <Th>Total Amount</Th>
                    <Th>Creation Date</Th>
                    <Th>File</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {receipts.map((receipt) => (
                    <Tr key={receipt.uuid}>
                      <Td>{receipt.title}</Td>
                      <Td>{receipt.description}</Td>
                      <Td>{receipt.totalAmount}</Td>
                      <Td>{receipt.creationDate}</Td>
                      <Td>{receipt.fileId}</Td>
                      <Td>
                        <Button onClick={() => handleOpenEditModal(receipt)} colorScheme="green" mr={2}>
                          <EditIcon />
                        </Button>
                        <Button onClick={() => handleOpenDeleteModal(receipt)} colorScheme="red">
                          <DeleteIcon />
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Flex>
          </Flex>
          <AddBillModal isOpen={isModalOpen} onClose={closeAddBillModal} />
          <ConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={closeDeleteModalHandler}
            onConfirm={handleDeleteReceipt}
            title="Delete Receipt"
            description="Are you sure you want to delete this receipt?"
          />
        </SidebarWrapper>
      );
    } else {
      router.push("/logout");
      return <Spinner />;
    }
  } else {
    return <Spinner />;
  }
};

export default Admin;
