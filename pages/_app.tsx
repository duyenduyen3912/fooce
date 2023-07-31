import "../styles/globals.scss";
import Layout from "../module/layout/layout";
import { useRouter } from "next/router";
import {QueryClientProvider, QueryClient} from 'react-query'
// import { Router } from "react-router-dom";
// export const history = createBrowserHistory();

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const path = router.asPath;

  if (path === "/login")
    return (
      <div>
        <Component {...pageProps} />
      </div>
    );
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
      
 
  );
}

export default MyApp;
