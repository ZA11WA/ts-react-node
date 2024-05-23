import Sidebar from "@/components/sidebar/Sidebar";
import { Card, Flex, useColorMode } from "@chakra-ui/react";
import { ReactNode } from "react";

interface SidebarWrapperProps {
  children: ReactNode;
}

const SidebarWrapper = ({ children }: SidebarWrapperProps) => {
  const { colorMode } = useColorMode();

  return (
    <Flex background={colorMode === "light" ? "gray.200" : "gray.900"}>
      <Sidebar>
        <Flex
          textColor={"blue"}
          w={"100%"}
          background={colorMode === "light" ? "gray.100" : "gray.800"}
          justifyContent={"center"}
          alignItems={"center"}>
          <Card w={"99%"} h={"98vh"} p={8} overflow={"hidden"}>
            {children}
          </Card>
        </Flex>
      </Sidebar>
    </Flex>
  );
};

export default SidebarWrapper;
