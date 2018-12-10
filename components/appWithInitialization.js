import React from 'react';
import ReactGA from 'react-ga';
import * as Sentry from '@sentry/browser';
import Link from 'next/link';
import '../styles/global.scss'

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
                debug: false,
                titleCase: false
            });
            Sentry.init({
                dsn: 'https://89980de6a8aa466695ae8186dba70f9b@sentry.io/1305873'
            });
        }
    }

    render() {
      const {router: {pathname}, clientWidth,  pageProps: {skipToContentCopy}} = this.props;

      return <>
        <a href="#main" className="visible-hidden">{skipToContentCopy || 'Gå direkt till innehåll'}</a>
        <nav className="main-nav">
            {pathname !== '/about' && <Link href="/about" as="/om">
                <a aria-label="information om sidan">Om</a>
            </Link>}
            <br/>
            {pathname !== '/' && <Link href="/">
                <a aria-label="startsida med karta">Startsidan</a>
            </Link>}
        </nav>
        <App {...this.props} role="main"/>
      </>
    }
  };
};
