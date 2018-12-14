import React from "react";
import Link from 'next/link';
import Head from 'next/head'
import { getLocale, getLocalesNearby } from '../utils/locales'
import { capitalize } from '../utils'
import StaticMap from '../components/map/static-map';
import PageList from '../components/page-list.js';
import ErrorPage from 'next/error'
import store from '../utils/store'

const MAP_HEIGHT = 200;
const MAP_WIDTH = 640;

class Locale extends React.PureComponent {
    componentDidMount(){
        const { id } = this.props.locale;
        const visitedLocales = store.get('visited-locales') || [];
        if(!visitedLocales.includes(id)){
            store.set('visited-locales', [...visitedLocales, id]);
        }
    }

    render() {
        const {error, locale = {}, localesNearby = []} = this.props;

        if (error) {
            return <ErrorPage statusCode={error} />
        }
        return (
            <div className="locale" style={{
                paddingTop: MAP_HEIGHT
            }}>
                <Head>
                    <title>{`${capitalize(locale.name)} | NKBY`}</title>
                </Head>
                <div className="locale--map-wrapper" style={{
                    height: MAP_HEIGHT
                }}>
                    <StaticMap
                        currentLocale={locale}
                        localesNearby={localesNearby}
                        width={MAP_WIDTH}
                        height={MAP_HEIGHT}
                        zoom={14}
                        mapClassName="locale--map"
                        style={{
                            marginLeft: -MAP_WIDTH/2,
                            width: MAP_WIDTH,
                            height: MAP_HEIGHT,
                        }}
                    />
                </div>
                <div className="locale--content">
                    <h1 className="locale--title">{locale.name}</h1>
                    <PageList pages={locale.pages} />
                    <h2 id="nearby-locales">Närliggande adresser</h2>
                    <ol className="nearby-list locale--nearby-list">
                        {localesNearby.map(({id, name, numberOfPages}, i) => {
                            return (
                                <li key={i} className="nearby-list--item">
                                    <Link prefetch href={`/locale?id=${id}&from=locale:${locale.id}`} >
                                        <a>{name} ({numberOfPages})</a>
                                    </Link>
                                </li>
                            )
                        })}
                    </ol>

                    <Link href="/">
                        <a aria-label="tillbaka till kartan" className="back-btn">Tillbaka</a>
                    </Link>
                </div>
            </div>
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