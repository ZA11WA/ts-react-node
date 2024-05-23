import { extendTheme } from "@chakra-ui/react";

import "@fontsource/poppins";

const theme = extendTheme({
  fonts: {
    body: "Poppins, sans-serif",

    heading: "Poppins, sans-" + "serif",
  },
});

export default theme;
