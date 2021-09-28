import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Provider } from "next-auth/client";

import theme from "../styles/theme";
import AppLayout from "../layouts/AppLayout";
import { Page } from "../types/page";
import AdminPageGuard from "@components/Admin/Guard";
import AuthGuard from "@components/AuthGuard";

// @TODO typing not really  correct, there is dependency on some props from server which aren't described
type Props = AppProps & {
  Component: Page;
};

const baseProviderOptions = {
  clientMaxAge: 0,
  keepAlive: 0,
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
  let content = React.useMemo(() => {
    return getLayout(<Component {...pageProps} />);
  }, [getLayout, pageProps]);
  if (Component.isAdminPage) {
    content = <AdminPageGuard>{content}</AdminPageGuard>;
  }
  if (Component.requireAuth) {
    content = <AuthGuard>{content}</AuthGuard>;
  }
  return (
    <>
      <Head>
        <title>Levi9 questionnaire</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider options={baseProviderOptions} session={pageProps.session}>
          <AppLayout
            isTimerVisible={pageProps.isTimerVisible}
          >
            {content}
          </AppLayout>
        </Provider>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
