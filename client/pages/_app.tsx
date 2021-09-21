import '../styles/globals.css'
import type { AppProps } from 'next/app'
import useAuthorizationCheck from '../Hooks/useAuthorizationCheck';
import LoadingPage from '../Components/UI/loadingPage';

function MyApp({ Component, pageProps }: AppProps) {
  const authStatus = useAuthorizationCheck();

  if (authStatus === null) {
    return <LoadingPage/>
  }

  return <Component {...pageProps} authStatus={authStatus} />;
}
export default MyApp;