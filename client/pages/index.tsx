import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import LoadingPage from "../Components/UI/loadingPage";

export interface NextPageProps {
  authStatus: boolean;
}

const Home: NextPage<NextPageProps> = ({ authStatus }) => {
  const router = useRouter();
  useEffect(() => {
    if (authStatus) {
      router.replace("/m");
      return;
    }
    router.replace("/home");
  }, [router, authStatus]);

  return <LoadingPage />;
};

export default Home;