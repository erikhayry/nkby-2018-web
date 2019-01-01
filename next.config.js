//const locales = require('./api/locales.json');

//const exportPathMap = async function (defaultPathMap) {
//    const localePaths = {};
//
//    Object.keys(locales)
//        .forEach(key => {
//                localePaths[`/locale/${key}`] = {
//                    page: '/locale',
//                    query: { id: key }
//                }
//            }
//        );
//
//    return {
//        ...localePaths,
//        '/': { page: '/' },
//        '/om': { page: '/about' },
//    }
//};

const styleConfig = {
    cssModules: true,
    cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: '[name]_[local]_[hash:base64:5]'
    }
};

const babelConf =  {webpack: config => {
    config.plugins.push(
        new webpack.EnvironmentPlugin({
            GOOGLE_MAPS_API: '',
            GOOGLE_STATIC_MAPS_API: '',
        })
    );

    return config;
}};


const nextConfig = {
    workboxOpts: {
        swDest: 'static/service-worker.js',
        runtimeCaching: [
            {
                urlPattern: /_next\/static$/,
                handler: 'cacheFirst',
                options: {
                    cacheName: 'static-resources',
                    cacheableResponse: {statuses: [0, 200]}
                }
            },
            {
                urlPattern: /api/,
                handler: 'networkFirst',
                options: {
                    cacheableResponse: {
                        statuses: [0, 200],
                        headers: {'x-test': 'true'}
                    }
                }
            },
            {
                urlPattern: /(localhost|nkby\.now\.sh|dev-nkby\.now\.sh)/i,
                handler: 'staleWhileRevalidate',
                options: {
                    cacheableResponse: {statuses: [0, 200]},
                    plugins: []
                }
            }
        ],
    },
};

const { PHASE_PRODUCTION_SERVER } =
    process.env.NODE_ENV === 'development'
        ? {} // We're never in "production server" phase when in development mode
        : !process.env.NOW_REGION
        ? require('next/constants') // Get values from `next` package when building locally
        : require('next-server/constants'); // Get values from `next-server` package when building on now v2

module.exports = (phase, { defaultConfig }) => {
    console.log('NODE_ENV', process.env.NODE_ENV)
    console.log('NOW_REGION', process.env.NOW_REGION)
    console.log('phase', phase)
    if (phase === PHASE_PRODUCTION_SERVER) {
        // Config used to run in production.
        return {};
    }

    const webpack = require('webpack');
    const withSass = require('@zeit/next-sass');
    const withOffline = require('next-offline')


    return withOffline(withSass({
        ...nextConfig,
        babelConf,
        ...styleConfig
    }))
};