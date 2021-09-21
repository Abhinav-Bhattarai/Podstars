import "../styles/globals.css";
import type { AppProps } from "next/app";
import useAuthorizationCheck from "../Hooks/useAuthorizationCheck";
import LoadingPage from "../Components/UI/loadingPage";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://localhost:8080/graphql",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  const authStatus = useAuthorizationCheck();

  if (authStatus === null) {
    return <LoadingPage />;
  }

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} authStatus={authStatus} />
    </ApolloProvider>
  );
}
export default MyApp;
