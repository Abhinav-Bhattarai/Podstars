import axios from "axios";
import React, { useEffect, useState } from "react";
import { StorageType } from "../Interfaces/interface";

interface AuthorizationDataType {
  error: boolean;
  authStatus: boolean;
}

export const GetPersistantData = (): StorageType | null => {
  const userID = localStorage.getItem("userID");
  const userName = localStorage.getItem("userName");
  const authToken = localStorage.getItem('authToken');
  const uid = localStorage.getItem('uid');
  if (userID && userName && authToken && uid) {
    const config = { userID, userName, authToken, uid };
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
        const { data }: { data: AuthorizationDataType } = await axios.post(
          "https://localhost:8080/checkAuthorization",
          PostConfig,
          {
            withCredentials: true
          }
        );
        if (data.error === false) {
          setAuthStatus(data.authStatus);
        }
      }
      setAuthStatus(false);
    };
    
    CheckAuthorization();
  });

  return auth_status;
};

export default useAuthorizationCheck;
