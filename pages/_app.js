import App, { Container } from 'next/app';
import { appWithInitialization } from '../lib/appWithInitialization';


class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps: { ...pageProps, user: ctx.user, token: ctx.token } };
    }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <Container>
                <Component {...pageProps} />
            </Container>
        );
    }
}

export default appWithInitialization(MyApp);
