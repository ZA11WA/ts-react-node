import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "../theme/fonts";
import React from "react";
import { UserProvider } from "@/utils/UserContext";
import { ReceiptProvider } from "@/utils/ReceiptContext"; // Import the ReceiptProvider
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Provider store={store}>
        <UserProvider>
          <ReceiptProvider> {/* Wrap with ReceiptProvider */}
            <Component {...pageProps} />
            <ToastContainer pauseOnHover={false} position="bottom-right" />
          </ReceiptProvider>
        </UserProvider>
      </Provider>
    </ChakraProvider>
  );
};

export default App;
