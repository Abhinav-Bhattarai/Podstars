import axios from "axios";
import React, { useEffect, useState } from "react";

interface AuthorizationDataType {
  error: boolean;
  authStatus: boolean;
}

const GetPersistantData = (): object | null => {
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
    };
    setTimeout(() => {
      setAuthStatus(false);
    }, 1000);
    // CheckAuthorization();
  });

  return auth_status;
};

export default useAuthorizationCheck;
