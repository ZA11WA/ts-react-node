import { Flex, Link, Menu, MenuButton, Text } from "@chakra-ui/react";
import { ReactElement } from "react";

interface SideBarItemProps {
  navSize: string;
  title: string;
  icon: ReactElement;
  active: boolean;
  onClick?: () => void;
}

const SideBarItem = ({
  navSize,
  title,
  icon,
  active,
  onClick,
}: SideBarItemProps) => {
  return (
    <Flex
      onClick={onClick}
      mt={30}
      flexDir={"column"}
      w={"100%"}
      alignItems={navSize === "small" ? "center" : "flex-start"}>
      <Menu placement={"right"}>
        <Link
          backgroundColor={active ? "#AEC8CA" : "none"}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
          w={navSize === "large" ? "100%" : "none"}
          display={"flex"}
          flexDir={"row"}
          justifyContent={"center"}>
          <MenuButton w={"100%"}>
            <Flex>
              {icon}
              <Text ml={2} display={navSize === "small" ? "none" : "flex"}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
};

export default SideBarItem;
