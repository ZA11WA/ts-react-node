import axios from "axios";
import { LoginCredentials } from "../../pages";

export interface TokenObject {
  token: string;
}

const getUserToken = async (
  loginCredentials: LoginCredentials,
): Promise<TokenObject | null> => {
  try {
    const { data } = await axios.post(
      "/v1/auth/authenticate",
      loginCredentials,
      {
        headers: { "Content-Type": "application/json" },
      },
    );
    return data;
  } catch (error) {
    return null;
  }
};

export default getUserToken;
