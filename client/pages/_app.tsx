import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from 'react';
import useAuthorizationCheck, { GetPersistantData } from "../Hooks/useAuthorizationCheck";
import LoadingPage from "../Components/UI/loadingPage";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { StorageType } from "../Interfaces/interface";

const client = new ApolloClient({
  uri: "https://localhost:8080/graphql",
  cache: new InMemoryCache(),
});

// const storage = GetPersistantData();

function MyApp({ Component, pageProps }: AppProps) {
  const [storage, setStorage] = useState<null | StorageType>(null);
  const authStatus = useAuthorizationCheck();

  useEffect(() => {
    const data = GetPersistantData();
    setStorage(data);
  }, []);

  if (authStatus === null) {
    return <LoadingPage />;
  }

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} authStatus={authStatus} storage={storage}/>
    </ApolloProvider>
  );
}
export default MyApp;
