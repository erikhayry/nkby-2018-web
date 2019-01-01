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

        state = {
            isOnline: true
        };

        componentDidMount(){
            document.documentElement.className = `js`;
            this.setState({isOnline: navigator.onLine});

            window.addEventListener('offline', this.handleIsOffline.bind(this), false);
            window.addEventListener('online', this.handleIsOnline.bind(this), false);
        }

        handleIsOnline() {
            this.setState({isOnline: true})
        }

        handleIsOffline() {
            this.setState({isOnline: false})
        }

        render() {
            const {router: {pathname}, pageProps: {skipToContentCopy} = {}} = this.props;
            const { isOnline } = this.state;

            return (
                <div id="top">
                    <a href="#main" className="visible-hidden" tabIndex="1">{skipToContentCopy || 'Gå direkt till innehåll'}</a>
                    {!isOnline && <div className="offline-message">Du verkar just nu sakna internet. Sidan kommer därför bara fungera delvis</div>}
                    <Nav pathname={pathname} ></Nav>
                    <App {...this.props} isOnline={isOnline} />
                    <BackToTopBtn />
                    <footer className="footer">
                        <div className="footer-inner">
                        </div>
                    </footer>
                </div>
            )
        }
    };
};
