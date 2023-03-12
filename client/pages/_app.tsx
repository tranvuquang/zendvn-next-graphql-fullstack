import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/styles.scss";
import "../styles/header.scss";

import { store, wrapper } from "../app/store";
import Head from "next/head";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import App, { AppContext, AppProps } from "next/app";
import { setAccessTokenRedux, setUserRedux } from "../features/auth/authSlice";
import { graphqlClient } from "../graphql-client/config";
import { ApolloProvider } from "@apollo/client";
import { useMemo } from "react";
import { NextComponentType, NextPageContext } from "next";

import { getTokenFromCookie, getUser } from "../helpers";

interface MyAppProps extends AppProps {
  Component: NextComponentType<NextPageContext, any, any>;
  pageProps: {
    accessToken: string;
    user: {
      id: string;
      email: string;
    };
  };
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const { accessToken, user } = pageProps;

  // save accessToken va user vao redux client side
  useMemo(() => {
    store.dispatch(setAccessTokenRedux(accessToken));
    store.dispatch(setUserRedux(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const client = graphqlClient(accessToken);
  return (
    <ApolloProvider client={client}>
      <hr />
      <div id="root">
        <Head>
          <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, minimum-scale=1, maximum-scale=1"
          />
          <meta name="keywords" content="HTML5 Template" />
          <meta name="description" content="Cộng đồng chế ảnh ZendVN" />
          <meta name="author" content="etheme.com" />
          <link rel="icon" href="/favicon.ico" />
          <title>Cộng đồng chế ảnh ZendVN</title>
        </Head>
        <Header />
        <main>
          <Component {...pageProps} />;
        </main>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const accessToken = getTokenFromCookie(appContext);
  const user = getUser(accessToken);

  // save accessToken va user vao redux server side
  store.dispatch(setAccessTokenRedux(accessToken));
  store.dispatch(setUserRedux(user));
  return {
    pageProps: {
      ...appProps.pageProps,
      accessToken,
      user,
    },
  };
};

export default wrapper.withRedux(MyApp);
