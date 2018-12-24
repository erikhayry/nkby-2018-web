import App, { Container } from 'next/app';
import { appWithInitialization } from '../components/appWithInitialization';
import { PageTransition } from 'next-page-transitions';

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

    render() {
        const { Component, pageProps, isLoading } = this.props;

        return (
            <Container>
                <main id="main" className={`main ${isLoading ? 'is-loading' : ''}`}>
                    <PageTransition timeout={0} classNames="page-transition">
                        <Component {...pageProps} />
                    </PageTransition>
                </main>
            </Container>
        );
    }
}

export default appWithInitialization(MyApp);
