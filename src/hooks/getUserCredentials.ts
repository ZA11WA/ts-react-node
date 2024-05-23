import axios from "axios";
import { User } from "@/utils/UserContext";

const getUserToken = async (
  token: string,
  login: string
): Promise<User | null> => {
  try {
    const { data } = await axios.get(`/v1/user/login?login=${login}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return null;
  }
};

export default getUserToken;
