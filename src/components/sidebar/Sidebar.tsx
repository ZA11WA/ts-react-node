import React, { ReactNode, useState } from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  IconButton,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SideBarItem from "@/components/sidebar/SideBarItem";

import { useUserContext } from "@/utils/UserContext";
import { useRouter } from "next/router";

interface SideBarProps {
  children: ReactNode;
}

const Sidebar = ({ children }: SideBarProps) => {
  const userContext = useUserContext();

  const router = useRouter();

  const [navSize, changeNavSize] = useState("large");

  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <>
      <Flex
        pos="sticky"
        left="5"
        h="100vh"
        mr={navSize === "small" ? 9 : "50px"}
        w={navSize === "small" ? "75px" : "200px"}
        flexDir="column"
        justifyContent="space-between">
        <Flex
          p={"5%"}
          flexDir={"column"}
          alignItems={navSize === "small" ? "none" : "flex-start"}
          as={"nav"}>
          <Flex
            w={"100%"}
            flexDir={navSize === "small" ? "column" : "row"}
            justifyContent={"space-between"}
            alignItems={navSize === "small" ? "center" : "none"}>
            <IconButton
              aria-label={"Sidebar"}
              background={"none"}
              mt={5}
              _hover={{ background: "none" }}
              icon={<MenuIcon />}
              onClick={() => {
                navSize === "small"
                  ? changeNavSize("large")
                  : changeNavSize("small");
              }}
            />
            <Box cursor={"pointer"} onClick={toggleColorMode}>
              <IconButton
                mt={5}
                aria-label={"Zmień motyw"}
                icon={
                  colorMode == "light" ? <SunIcon /> : <MoonIcon />
                }></IconButton>
            </Box>
          </Flex>
          <SideBarItem
            navSize={navSize}
            title={"Dashboard"}
            icon={<DashboardIcon />}
            active={false}
            onClick={() => {
              router.push("/dashboard");
            }}
          />
          <SideBarItem
            navSize={navSize}
            title={"Bills"}
            icon={<AccountBalanceWalletIcon />}
            active={false}
            onClick={() => {
              router.push("/bills");
            }}
          />
          <SideBarItem
            navSize={navSize}
            title={"Schedule"}
            icon={<ScheduleIcon />}
            active={false}
            onClick={() => {
              router.push("/schedule");
            }}
          />
          <SideBarItem
            navSize={navSize}
            title={"Admin"}
            icon={<AdminPanelSettingsIcon />}
            active={false}
            onClick={() => {
              router.push("/admin");
            }}
          />
          <SideBarItem
            navSize={navSize}
            title={"Logout"}
            icon={<LogoutIcon />}
            active={false}
            onClick={() => {
              router.push("/logout");
            }}
          />
        </Flex>
        <Flex
          p={"5%"}
          w={"100%"}
          flexDir={"column"}
          alignItems={navSize === "small" ? "center" : "flex-start"}
          mb={4}>
          <Divider display={navSize === "small" ? "none" : "flex"} />
          <Flex
            borderRadius={"15px"}
            p={1}
            mt={4}
            alignItems={"center"}
            cursor={"pointer"}
            _hover={{ background: "#AEC8CA" }}>
            <Avatar size={"sm"} />
            <Flex
              flexDir={"column"}
              ml={3}
              display={navSize === "small" ? "none" : "flex"}>
              <Heading as={"h3"} size={"sm"}>
                {userContext.user?.firstName + " " + userContext.user?.lastName}
              </Heading>
              <Text fontSize={"12px"}>{userContext.user?.email}</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex w={"100%"}>{children}</Flex>
    </>
  );
};

export default Sidebar;
