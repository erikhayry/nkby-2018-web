const webpack = require('webpack');

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
}}

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
        return babelConf;
    }

    const withSass = require('@zeit/next-sass');

    return withSass({
        babelConf,
        ...styleConfig
    })
};