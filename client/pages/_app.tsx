import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from 'react';
import useAuthorizationCheck, { GetPersistantData } from "../Hooks/useAuthorizationCheck";
import LoadingPage from "../Components/UI/loadingPage";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { StorageType } from "../Interfaces/interface";
import { useRouter } from "next/dist/client/router";

const client = new ApolloClient({
  uri: "https://localhost:8080/graphql",
  cache: new InMemoryCache(),
});

// const storage = GetPersistantData();

function MyApp({ Component, pageProps }: AppProps) {
  const [storage, setStorage] = useState<null | StorageType>(null);
  const router = useRouter();
  const {auth_status, ChangeAuthentication} = useAuthorizationCheck();

  useEffect(() => {
    const data = GetPersistantData();
    setStorage(data);
  }, []);

  const ChangeAuthenticationStatus = (changeTo: boolean) => ChangeAuthentication(changeTo);

  if (auth_status === null) {
    return <LoadingPage />;
  }

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} authStatus={auth_status} storage={storage}/>
    </ApolloProvider>
  );
}
export default MyApp;