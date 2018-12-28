import React from 'react';
import ReactGA from 'react-ga';
import Nav from './nav';
import BackToTopBtn from './back-to-top-btn';
import '../styles/global.scss'
import * as Sentry from '@sentry/browser';

const isDev = process.env.NODE_ENV !== 'production';
if(!isDev){
    ReactGA.initialize('UA-129661075-1', {
        debug: false,
        titleCase: false
    });
    
    Sentry.init({
        debug: false,
        dsn: 'https://89980de6a8aa466695ae8186dba70f9b@sentry.io/1305873'
    });
}

export const appWithInitialization = App => {
    return class AppWithInitialization extends React.Component {
        static async getInitialProps(appContext) {
            let appProps = {};
            if (typeof App.getInitialProps === 'function') {
                appProps = await App.getInitialProps.call(App, appContext);

                return {
                    ...appProps
                };
            }
        }

        componentDidMount(){
            document.documentElement.className = "js";
        }

        render() {
            const {router: {pathname}, pageProps: {skipToContentCopy} = {}} = this.props;

            return (
                <>
                    <a href="#main" className="visible-hidden" tabIndex="1">{skipToContentCopy || 'Gå direkt till innehåll'}</a>
                    <Nav pathname={pathname} ></Nav>
                    <App {...this.props} role="main" id="top"/>
                    <BackToTopBtn />
                    <footer className="footer">
                        <div className="footer-inner">
                            Skapad i Stockholm av <a href="https://www.ellenportin.com/" target="_blank" className="footer-inner--name">Ellen Portin</a> och <a href="https://github.com/erikportin" target="_blank" className="footer-inner--name">Erik Portin</a> hösten och vintern 2018
                        </div>
                    </footer>
                </>
            )
        }
    };
};
