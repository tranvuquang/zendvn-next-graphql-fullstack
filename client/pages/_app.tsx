import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/styles.scss";
import "../styles/header.scss";

import { store, wrapper } from "../app/store";
import Head from "next/head";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import App, { AppContext, AppProps } from "next/app";
import {
  setAccessTokenRedux,
  setCategoriesRedux,
  setUserRedux,
} from "../features/auth/authSlice";
import { graphqlClient, queryClient } from "../graphql-client/config";
import { ApolloProvider } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { NextComponentType, NextPageContext } from "next";

import { getTokenFromCookie, getUser } from "../helpers";
import { useAppDispatch } from "../app/hooks";
import { getCategoriesQuery, getUserQuery } from "../graphql-client/queries";

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
  const dispatch = useAppDispatch();
  const { accessToken, user } = pageProps;

  // save accessToken va user vao redux server va client side
  useMemo(() => {
    dispatch(setAccessTokenRedux(accessToken));
    dispatch(setUserRedux(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get public data va user data vao redux client side
  useEffect(() => {
    (async () => {
      try {
        const categoriesData = await queryClient(
          "",
          dispatch,
          getCategoriesQuery
        );
        if (categoriesData) {
          dispatch(setCategoriesRedux(categoriesData.data.getCategories))
        }
        if (accessToken) {
          const userData = await queryClient(
            accessToken,
            dispatch,
            getUserQuery,
            {
              id: user.id,
            }
          );
          if (userData) {
            dispatch(setUserRedux(user));
          }
        }
      } catch (error: any) {
        console.log(error.message);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const client = graphqlClient(pageProps.accessToken);
  return (
    <ApolloProvider client={client}>
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
  console.log("01 _app.tsx")
  const accessToken = getTokenFromCookie(appContext);
  const user = getUser(accessToken);

  // save accessToken va user vao redux pageProps
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
