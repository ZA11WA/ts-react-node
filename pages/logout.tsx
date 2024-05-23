import { useUserContext } from "@/utils/UserContext";
import { useEffect } from "react";

const Logout = () => {
  const userCtx = useUserContext();

  useEffect(() => {
    userCtx.logOut();
  }, [userCtx]);

  return <> </>;
};

export default Logout;
