import Document, { Head, NextScript, Main } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="se">
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />
            <meta name="description" content="Ett sökverktyg för nykarlebyvyer.nu. Hitta och läs om historiska platser och personer i Nykarleby" />
            <script src="https://cdn.polyfill.io/v2/polyfill.min.js" />
            <link href="https://fonts.googleapis.com/css?family=Playfair+Display" rel="stylesheet" ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
