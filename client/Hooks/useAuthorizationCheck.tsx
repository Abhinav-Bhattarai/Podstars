import axios from "axios";
import { useEffect, useState } from "react";
import { StorageType } from "../Interfaces/interface";

interface AuthorizationDataType {
  error: boolean;
  authStatus: boolean;
}

export const GetPersistantData = (): StorageType | null => {
  const userID = localStorage.getItem("userID");
  const userName = localStorage.getItem("userName");
  if (userID && userName) {
    const config = { userID, userName };
    return config;
  }
  return null;
};

const useAuthorizationCheck = () => {
  const [auth_status, setAuthStatus] = useState<boolean | null>(null);

  useEffect(() => {
    const CheckAuthorization = async () => {
      const PostConfig = GetPersistantData();
      if (PostConfig) {
        const { data }: { data: AuthorizationDataType } = await axios.get(
          "http://localhost:8080/checkAuthorization",
          {
            withCredentials: true
          }
        );
        if (data.error === false) {
          setAuthStatus(data.authStatus);
        } else {
          setAuthStatus(false);
        }
      } else {
        setAuthStatus(false);
      }
    };
    
    CheckAuthorization();
  }, []);

  const ChangeAuthentication = (changeTo: boolean) => {
    setAuthStatus(changeTo);
  }

  return {auth_status, ChangeAuthentication};
};

export default useAuthorizationCheck;
