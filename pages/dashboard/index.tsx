import { useUserContext } from "@/utils/UserContext";
import { Card, Flex, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import SidebarWrapper from "@/components/sidebar/SidebarWrapper";

const Dashboard = () => {
  const userContext = useUserContext();
  const router = useRouter();
  if (
    userContext.token &&
    userContext.isTokenGivesAuth(userContext.token, ["USER"])
  ) {
    return (
      <SidebarWrapper>
        <Flex>
          <Text fontSize={32}>Welcome, {userContext.user?.firstName}</Text>
        </Flex>
        <Flex
          w={"100%"}
          h={"100vh"}
          alignItems={"center"}
          justifyContent={"center"}>
          <Card
            mt={2}
            mr={2}
            w={"100%"}
            h={"100%"}
            p={3}
            boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}>
            Aktywne zadania
          </Card>
          <Card
            w={"100%"}
            h={"100%"}
            mt={2}
            ml={2}
            p={3}
            boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}>
            Należności
          </Card>
        </Flex>
      </SidebarWrapper>
    );
  } else {
    router.push("/logout");
    return <Spinner />;
  }
};

export default Dashboard;
