import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/styles.scss";
import "../styles/header.scss";
import "../styles/PostDetailContent.scss";

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
import { useMemo } from "react";
import { NextComponentType, NextPageContext } from "next";

import { getTokenFromCookie, getUser } from "../helpers";
import { getCategoriesQuery } from "../graphql-client/queries";

interface MyAppProps extends AppProps {
  Component: NextComponentType<NextPageContext, any, any>;
  pageProps: {
    accessToken: string;
    user: {
      id: string;
      email: string;
    };
    categories: any[];
  };
}

const dispatch = store.dispatch;

function MyApp({ Component, pageProps }: MyAppProps) {
  const { accessToken, user, categories } = pageProps;

  // save accessToken va user vao redux client side
  useMemo(() => {
    dispatch(setAccessTokenRedux(accessToken));
    dispatch(setUserRedux(user));
    dispatch(setCategoriesRedux(categories));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const client = graphqlClient(accessToken);
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
  try {
    console.log("01 _app.tsx");

    // lay data co dinh tu cookie
    const accessToken = getTokenFromCookie(appContext);
    let user = getUser(accessToken);
    dispatch(setAccessTokenRedux(accessToken));
    dispatch(setUserRedux(user));

    // lay data co dinh tu server
    let categoriesList = [];
    const { categories } = store.getState().auth;
    categoriesList = categories;

    if (categoriesList.length === 0) {
      const categoriesData = await queryClient(
        "",
        dispatch,
        getCategoriesQuery
      );
      if (categoriesData) {
        categoriesList = categoriesData.data.getCategories;
        dispatch(setCategoriesRedux(categoriesList));
      }
    }
    return {
      pageProps: {
        ...appProps.pageProps,
        accessToken,
        user,
        categories: categoriesList,
      },
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      pageProps: {
        ...appProps.pageProps,
      },
    };
  }
};

export default wrapper.withRedux(MyApp);
