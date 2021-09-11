import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Provider } from "next-auth/client";

import theme from "../styles/theme";
import AppLayout from "../layouts/AppLayout";
import { Page } from "../types/page";

type Props = AppProps & {
  Component: Page;
};

const MyApp: React.FC<Props> = (props) => {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Provider
      options={{
        clientMaxAge: 0,
        keepAlive: 0,
      }}
      session={pageProps.session}
    >
      <Head>
        <title>Levi9 questionnaire</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppLayout>{getLayout(<Component {...pageProps} />)}</AppLayout>
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
