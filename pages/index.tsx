"use client";

import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Heading,
  IconButton,
  Input,
  Spinner,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useUserContext } from "@/utils/UserContext";
import getUserToken from "@/hooks/getUserToken";
import getUserCredentials from "@/hooks/getUserCredentials";

export interface LoginCredentials {
  login: string;
  password: string;
}

const Home = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const [loginCred, setLoginCred] = useState<LoginCredentials>({
    login: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const userContext = useUserContext();

  useEffect(() => {
    const tokenFromCookie = localStorage.getItem("jwt");

    if (tokenFromCookie) {
      userContext.setToken(tokenFromCookie);
      getUserCredentials(
        tokenFromCookie,
        userContext.decodeToken(tokenFromCookie).sub,
      ).then((res) => {
        if (res) {
          userContext.logIn(tokenFromCookie);
        }
      });
    } else {
      setIsLoading(false);
    }
  }, [userContext]);
  const userLogin = () => {
    if (loginCred)
      getUserToken(loginCred).then((res) => {
        if (res != null) {
          userContext.setToken(res.token);
          userContext.logIn(res.token);
        }
      });
  };

  {
    return isLoading ? (
      <Spinner />
    ) : (
      <Flex height={"100vh"} alignItems={"center"} justifyContent={"center"}>
        <Card
          shadow={
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;"
          }
          pl={10}
          pr={10}
          pt={4}
          pb={4}
        >
          <CardHeader>
            <Flex
              width={"100%"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Heading>
                <Text fontSize={"md"}>Witaj w RAM!</Text>
              </Heading>
              <Box
                top={2}
                right={2}
                cursor={"pointer"}
                onClick={toggleColorMode}
              >
                <IconButton
                  aria-label={"Zmień motyw"}
                  icon={colorMode == "light" ? <SunIcon /> : <MoonIcon />}
                ></IconButton>
              </Box>
            </Flex>
            <br />
            <Text>Zaloguj się, aby kontynuować.</Text>
          </CardHeader>
          <Divider />
          <CardBody>
            <Text fontWeight={"bold"} mb={1}>
              Login
            </Text>
            <Input
              placeholder={"Login"}
              variant={"filled"}
              mb={"20px"}
              type={"text"}
              value={loginCred?.login}
              onChange={(e) =>
                setLoginCred({ ...loginCred, login: e.target.value })
              }
            />
            <Text fontWeight={"bold"} mb={1}>
              Hasło
            </Text>
            <Input
              placeholder={"Hasło"}
              variant={"filled"}
              type={"password"}
              value={loginCred?.password}
              onChange={(e) =>
                setLoginCred({ ...loginCred, password: e.target.value })
              }
            />
            <Flex mt={"30px"} width={"100%"} justifyContent={"space-evenly"}>
              <Button
                colorScheme={"blue"}
                width={"100%"}
                onClick={() => userLogin()}
              >
                Zaloguj
              </Button>
            </Flex>
          </CardBody>
        </Card>
      </Flex>
    );
  }
};

export default Home;
