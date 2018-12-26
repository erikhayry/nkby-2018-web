import Document, { Head, NextScript, Main } from 'next/document';

export default class MyDocument extends Document {
    render() {
        var ieMessage = `<!--[if IE]>
                  <div className="ie-info">
                       För tillfället stöds inte din webbläsare (Internet Explorer). <br/>
                       Välj en annan webbläsare eller stäng av javascript för att sidan skall fungera.
                   </div>
                <![endif]-->`;

        return (
            <html lang="se">
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
                <meta name="description" content="Ett sökverktyg för nykarlebyvyer.nu. Hitta och läs om historiska platser och personer i Nykarleby" />
                <link href="https://fonts.googleapis.com/css?family=Playfair+Display" rel="stylesheet" />
                <link rel="manifest" href="/static/manifest.json" />

                <link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon" />
                <link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
                <link rel="apple-touch-icon" href="/static/icons/Icon-29x29@2x.png" />
                <link rel="apple-touch-icon" href="/static/icons/Icon-40x40@2x.png" />
                <link rel="apple-touch-icon" sizes="152x152" href="/static/icons/Icon-76x76@2x.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/static/icons/Icon-60x60@3x.png" />
                <link rel="apple-touch-icon" sizes="167x167" href="/static/icons/Icon-83.5@2x.png" />

                <link rel="apple-touch-startup-image" href="/static/splash/LaunchImage-568h@2x~iphone_640x1136.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href="/static/splash/LaunchImage-750@2x~iphone6-portrait_750x1334.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href="/static/splash/LaunchImage-1242@3x~iphone6s-portrait_1242x2208.png" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href="/static/splash/LaunchImage-1125@3x~iphoneX-portrait_1125x2436.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href="/static/splash/LaunchImage-Portrait@2x~ipad_1536x2048.png" media="(min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href="/static/splash/LaunchImage-Portrait@2x~ipad_1668x2224.png" media="(min-device-width: 834px) and (max-device-width: 834px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href="/static/splash/LaunchImage-Portrait@2x~ipad_2048x2732.png" media="(min-device-width: 1024px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)" />

                <meta name="apple-mobile-web-app-title" content="nkby" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black" />
            </Head>
            <body>
            <div dangerouslySetInnerHTML= {{__html: ieMessage}} />
            <Main />
            <NextScript />
            </body>
            </html>
        );
    }
}
