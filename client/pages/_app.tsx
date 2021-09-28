import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import useAuthorizationCheck, {
  GetPersistantData,
} from "../Hooks/useAuthorizationCheck";
import LoadingPage from "../Components/UI/loadingPage";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { StorageType } from "../Interfaces/interface";

const link = createHttpLink({
  uri: "http://localhost:8080/graphql",
  credentials: "include",
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

// const storage = GetPersistantData();

function MyApp({ Component, pageProps }: AppProps) {
  const [storage, setStorage] = useState<null | StorageType>(null);
  const { auth_status, ChangeAuthentication } = useAuthorizationCheck();

  useEffect(() => {
    const data = GetPersistantData();
    setStorage(data);
  }, []);

  const ChangeAuthenticationStatus = (changeTo: boolean) =>
    ChangeAuthentication(changeTo);

  if (auth_status === null) {
    return <LoadingPage />;
  }

  return (
    <ApolloProvider client={client}>
      <Component
        {...pageProps}
        authStatus={auth_status}
        storage={storage}
        ChangeAuthentication={ChangeAuthenticationStatus}
      />
    </ApolloProvider>
  );
}
export default MyApp;
