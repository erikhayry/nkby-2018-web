import Document, { Head, NextScript, Main } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <html lang="se">
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
                <meta name="description" content="Ett sökverktyg för nykarlebyvyer.nu. Hitta och läs om historiska platser och personer i Nykarleby" />
                <link href="https://fonts.googleapis.com/css?family=Playfair+Display" rel="stylesheet" />

                <link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon" />
                <link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
                <link rel="apple-touch-icon" href="/static/custom_icon.png" />
                <link rel="apple-touch-icon" href="/static/touch-icon-iphone.png" />
                <link rel="apple-touch-icon" sizes="152x152" href="/static/touch-icon-ipad.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/static/touch-icon-iphone-retina.png" />
                <link rel="apple-touch-icon" sizes="167x167" href="/static/touch-icon-ipad-retina.png" />

                <meta name="apple-mobile-web-app-title" content="nkby" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black" />
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
            </html>
        );
    }
}
