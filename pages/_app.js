import 'bootstrap/dist/css/bootstrap.css'
import { SSRProvider } from '@react-aria/ssr';
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return <SSRProvider><Component {...pageProps} />  </SSRProvider>
}

export default MyApp
