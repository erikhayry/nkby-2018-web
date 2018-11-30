import App, { Container } from 'next/app';
import { appWithInitialization } from '../lib/appWithInitialization';
import { PageTransition } from 'next-page-transitions'

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
                <PageTransition timeout={300} classNames="page-transition">
                    <Component {...pageProps} />
                </PageTransition>
                <style jsx global>{`
                  .js .page-transition-enter {
                    opacity: 0;
                  }
                  .js .page-transition-enter-active {
                    opacity: 1;
                    transition: opacity 300ms;
                  }
                  .js .page-transition-exit {
                    opacity: 1;
                  }
                  .js .page-transition-exit-active {
                    opacity: 0;
                    transition: opacity 300ms;
                  }
                `}</style>
            </Container>
        );
    }
}

export default appWithInitialization(MyApp);
