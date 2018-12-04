/* eslint-env node */
const express = require('express');
const next = require('next');
require('dotenv').config();
const api = require('./api.js')

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
    .prepare()
    .then(() => {
        const server = express();

        server.get('/api/locales', (req, res) => {
            res.json(api.getLocales());
        });

        server.get('/api/locales-nearby/:id', (req, res) => {
            const { id } = req.params;
            const { numbersOfResults } = req.query;
            const localesNearby = api.getLocalesNearby(id, numbersOfResults);

            if (!localesNearby) {
                res.status(404).json([])
            }

            res.json(localesNearby);
        });

        server.get('/api/locale/:id', (req, res) => {
            const { id } = req.params;
            const locale = api.getLocale(id);

            if (!locale) {
                res.status(404).json([])
            }

            res.json(locale);
        });

        server.get('/locale/:id', (req, res) => {
            const { id } = req.params;

            app.render(req, res, '/locale', { id, ...req.query })
        });

        server.get('/om', (req, res) => {
            app.render(req, res, '/about', req.query)
        });

        server.get('*', (req, res) => handle(req, res));

        server.listen(port, err => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`);
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
