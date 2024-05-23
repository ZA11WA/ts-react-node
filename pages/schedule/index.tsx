import { useUserContext } from "@/utils/UserContext";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import SidebarWrapper from "@/components/sidebar/SidebarWrapper";

const Schedule = () => {
  const userContext = useUserContext();
  const router = useRouter();
  if (
    userContext.token &&
    userContext.isTokenGivesAuth(userContext.token, ["USER"])
  ) {
    return (
      <SidebarWrapper>
        <Flex>
          <Text fontSize={32}>Schedule</Text>
        </Flex>
      </SidebarWrapper>
    );
  } else {
    router.push("/logout");
    return <Spinner />;
  }
};

export default Schedule;
