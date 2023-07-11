import "../styles/globals.css";
import Layout from "../module/layout/layout.tsx";
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  );
}

export default MyApp;
