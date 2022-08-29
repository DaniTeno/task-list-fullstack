import { useContext } from "react";
import { userContext } from "../context/UserProvider";

export const useUserContext = () => useContext(userContext)
