import "../styles/globals.scss";
import Layout from "../module/layout/layout.tsx";
import { useRouter } from "next/router";
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const path = router.asPath;
  console.log(path);
  if (path === "/login")
    return (
      <div>
        <Component {...pageProps} />
      </div>
    );
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
