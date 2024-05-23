import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { useRouter } from "next/router";
import "core-js/stable/atob";
import getUserCredentials from "@/hooks/getUserCredentials";

interface UserProviderProps {
  children: ReactNode;
}

interface DecodedToken {
  Roles: string[];
  sub: string;
  iat: number;
  exp: number;
}

export interface User {
  uuid?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  login?: string;
}

interface UserContextType {
  user: User | null;
  token: string | null;
  setToken: (token: string) => void;
  setUser: (userData: User | null) => void;
  logIn: (newToken: string) => void;
  logOut: () => void;
  decodeToken: (token: string) => DecodedToken;
  isTokenExpired: (token: string) => boolean;
  isTokenGivesAuth: (token: string, neededRoles: string[]) => boolean;
  isUserAuthorized: (neededRoles: string[]) => boolean;
}

const UserContext = createContext<UserContextType | null>(null);
const UserProvider = ({ children }: UserProviderProps) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const logIn = (newToken: string) => {
    getUserCredentials(newToken, decodeToken(newToken).sub).then((res) => {
      if (res) {
        setUser(res);
      } else {
        logOut();
      }
    });
    localStorage.setItem("jwt", newToken);
    router.push("/dashboard");
  };

  const logOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("jwt");
    router.push("/");
  };

  const decodeToken = (tokentodecode: string): DecodedToken => {
    const jwt = require("jsonwebtoken");
    return jwt.decode(tokentodecode);
  };

  const isTokenExpired = (authToken: string): boolean => {
    return decodeToken(authToken).exp * 1000 < new Date().getTime();
  };
  const isTokenGivesAuth = (
    authToken: string,
    authRoles: string[]
  ): boolean => {
    return !isTokenExpired(authToken) && isUserAuthorized(authRoles);
  };

  const isUserAuthorized = (authRoles: string[]): boolean => {
    if (token)
      return authRoles.every((authNeededRole) =>
        decodeToken(token).Roles.includes(authNeededRole)
      );
    return false;
  };

  const value = useMemo(
    () => ({
      token,
      user,
      setToken,
      setUser,
      logIn,
      logOut,
      decodeToken,
      isTokenExpired,
      isTokenGivesAuth,
      isUserAuthorized,
    }),
    [user, token]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("First provide UserContext");
  return context;
};

export { useUserContext, UserContext, UserProvider };
