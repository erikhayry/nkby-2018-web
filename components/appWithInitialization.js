import React from 'react';
import ReactGA from 'react-ga';
import * as Sentry from '@sentry/browser';
import Nav from './nav';
import Splash from './splash';
import '../styles/global.scss'

export const appWithInitialization = App => {
    return class AppWithUser extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                isLoading: true
            };

            this.onLoadingEnd = this.onLoadingEnd.bind(this)

        }

        static async getInitialProps(appContext) {
            const {ctx: req} = appContext;
            let appProps = {};
            if (typeof App.getInitialProps === 'function') {
                appProps = await App.getInitialProps.call(App, appContext);

                const {pathname, query} = req;
                let showSplash = true;

                if (req.req) {
                    const cookie = require('cookie');
                    if (req.req.headers && req.req.headers.cookie) {
                        const { splash } = cookie.parse(req.req.headers.cookie);
                        showSplash = splash !== 'false';
                    }
                }

                return {
                    ...appProps,
                    showSplash: showSplash && query.splash !== 'false' && pathname === '/'
                };
            }
        }

        componentDidMount(){
            document.documentElement.className = "js";
            const isDev = process.env.NODE_ENV === 'dev';
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

        onLoadingEnd(){
            this.setState({
                isLoading: false
            })
        }

        render() {
            const {router: {pathname}, pageProps: {skipToContentCopy}, showSplash} = this.props;
            const { isLoading, showBackToTop } = this.state;
            const showContent = !isLoading || !showSplash;

            return (
                <>
                    {!showContent && <Splash onLoadingEnd={this.onLoadingEnd}/>}
                    <a href="#main" className="visible-hidden">{skipToContentCopy || 'Gå direkt till innehåll'}</a>
                    <Nav pathname={pathname} ></Nav>
                    <App {...this.props} isLoading={!showContent} role="main" id="top"/>
                    <a href="#top" className='back-to-top-btn'>
                        <span className="visible-hidden">Tillbaka till toppen</span>
                    </a>
                    <footer className="footer">
                        <div className="footer-inner">
                            Skapad i Stockholm av <a href="" className="footer-inner--name">Ellen Portin</a> och <a href="" className="footer-inner--name">Erik Portin</a> hösten och vintern 2018
                        </div>
                    </footer>
                </>
            )
        }
    };
};
