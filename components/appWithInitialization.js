import React from 'react';
import ReactGA from 'react-ga';
import * as Sentry from '@sentry/browser';
import Link from 'next/link';

export const appWithInitialization = App => {
  return class AppWithUser extends React.Component {
    static async getInitialProps(appContext) {
      let appProps = {};
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps.call(App, appContext);
      }

      return {
        ...appProps,
      };
    }

    componentDidMount() {
        document.documentElement.className = "js";
        const isDev = process.env.NODE_ENV !== 'production';
        if (!isDev) {
            ReactGA.initialize('UA-129661075-1', {
                debug: true,
                titleCase: false
            });
            Sentry.init({
                dsn: 'https://89980de6a8aa466695ae8186dba70f9b@sentry.io/1305873'
            });
        }
    }

    render() {
      return <>
        <a href="#main">Gå direkt till innehåll</a>
        <nav>
            <Link href="/about" as="/om">
                <a aria-label="om sidan">Om</a>
            </Link>
        </nav>
        <App {...this.props} role="main"/>
      </>
    }
  };
};
