import "@/styles/globals.css";
import * as dotenv from "dotenv";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
dotenv.config();

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BACKEND_URL,
  cache: new InMemoryCache(),
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
