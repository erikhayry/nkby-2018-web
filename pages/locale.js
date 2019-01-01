import React from "react";
import ReactGA from 'react-ga';
import Link from 'next/link';
import Head from 'next/head'
import Router from 'next/router'
import { getLocale, getLocalesNearby } from '../utils/api'
import { capitalize } from '../utils'
import StaticMap from '../components/map/static-map';
import PageList from '../components/page-list.js';
import LocalesList from '../components/locales-list';
import ErrorPage from 'next/error'
import store from '../utils/store'

const MAP_HEIGHT = 200;
const MAP_WIDTHS = [640];

class Locale extends React.PureComponent {
    componentDidMount(){
        const { id } = this.props.locale;
        const visitedLocales = store.get('visited-locales') || [];
        if(!visitedLocales.includes(id)){
            store.set('visited-locales', [...visitedLocales, id]);
        }

        if(Router.asPath){
            store.set('current-page',  Router.asPath);
            ReactGA.pageview(Router.asPath);
        }
    }

    componentWillUnmount(){
        store.set('current-page');
    }

    render() {
        const {error, locale = {}, localesNearby = [], isOnline} = this.props;

        if (error) {
            return <ErrorPage statusCode={error} />
        }
        return (
            <>
                <style jsx="true">{`
                  .js .is-online .locale{
                    padding-top: ${MAP_HEIGHT}px;
                  }
                `}</style>
                <div className="locale">
                    <Head>
                        <title>{`${capitalize(locale.name)} | NKBY`}</title>
                    </Head>
                    {isOnline && <div className="locale--map-wrapper" style={{
                        height: MAP_HEIGHT
                    }}>
                        <StaticMap
                            currentLocale={locale}
                            localesNearby={localesNearby}
                            widths={MAP_WIDTHS}
                            height={MAP_HEIGHT}
                            zoom={14}
                            mapClassName="locale--map"
                        />
                    </div>}
                    <div className="locale--content">
                        <h1 className="locale--title">{locale.name}</h1>
                        <PageList pages={locale.pages} className="locale--page-list" />
                        <h2 id="nearby-locales">Närliggande adresser</h2>
                        <LocalesList locales={localesNearby} withABCNav={false} className="locale--nearby-list" />
                        <Link href="/">
                            <a aria-label="tillbaka till kartan" className="back-btn">
                                <span className="visible-hidden">Tillbaka</span>
                            </a>
                        </Link>
                    </div>
                </div>
            </>
        )

    }
}

Locale.getInitialProps = async function (context) {
    const {query, req = {}} = context;
    const {headers = {}} = req;
    const { id } = query;
    const locale = await getLocale(headers.host, id);

    if(locale){
        const localesNearby = await getLocalesNearby(headers.host, id, 9);

        return { locale, localesNearby }
    }

    return { error: 404 }
};

export default Locale;