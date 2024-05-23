import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { useRouter } from "next/router";
import "core-js/stable/atob";
import { toast } from "react-toastify";

interface ReceiptProviderProps {
  children: ReactNode;
}

interface Receipt {
  uuid?: string;
  title: string;
  description?: string;
  creationDate: string;
  totalAmount: number;
  fileId?: string;
}

interface ReceiptContextType {
  receipts: Receipt[];
  selectedReceipt: Receipt | null;
  setReceipts: (receipts: Receipt[]) => void;
  addReceipt: (receipt: Receipt) => void;
  updateReceipt: (receipt: Receipt) => void;
  deleteReceipt: (uuid: string) => void;
  selectReceipt: (receipt: Receipt | null) => void;
}

const ReceiptContext = createContext<ReceiptContextType | null>(null);

const ReceiptProvider = ({ children }: ReceiptProviderProps) => {
  const router = useRouter();
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);

  const addReceipt = (newReceipt: Receipt) => {
    setReceipts((prevReceipts) => [...prevReceipts, newReceipt]);
    toast.success("Receipt has been added");
  };

  const updateReceipt = (updatedReceipt: Receipt) => {
    setReceipts((prevReceipts) =>
      prevReceipts.map((receipt) =>
        receipt.uuid === updatedReceipt.uuid ? updatedReceipt : receipt
      )
    );
    toast.success("Receipt has been modified");
  };

  const deleteReceipt = (uuid: string) => {
    setReceipts((prevReceipts) =>
      prevReceipts.filter((receipt) => receipt.uuid !== uuid)
    );
    toast.success("Receipt has been removed");
  };

  const selectReceipt = (receipt: Receipt | null) => {
    setSelectedReceipt(receipt);
  };

  const value = useMemo(
    () => ({
      receipts,
      selectedReceipt,
      setReceipts,
      addReceipt,
      updateReceipt,
      deleteReceipt,
      selectReceipt,
    }),
    [receipts, selectedReceipt]
  );

  return (
    <ReceiptContext.Provider value={value}>{children}</ReceiptContext.Provider>
  );
};

const useReceiptContext = () => {
  const context = useContext(ReceiptContext);
  if (!context) throw new Error("First provide ReceiptContext");
  return context;
};

export { useReceiptContext, ReceiptContext, ReceiptProvider };
