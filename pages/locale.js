import React from "react";
import Link from 'next/link';
import Head from 'next/head'
import { getLocale, getLocalesNearby } from '../utils/locales'
import { capitalize } from '../utils'
import StaticMap from '../components/map/static-map';
import PageList from '../components/page-list.js';
import ErrorPage from 'next/error'
import store from '../utils/store'


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
            <>
                <Head>
                    <title>{`${capitalize(locale.name)} | NKBY`}</title>
                </Head>
                <h1>{locale.name}</h1>
                <StaticMap currentLocale={locale} localesNearby={localesNearby}/>
                <PageList pages={locale.pages} />
                <h2 id="nearby-locales">Närliggande adresser</h2>
                <ol className="nearby-list">
                    {localesNearby.map(({id, name, numberOfPages}, i) => {
                        return (
                            <li key={i} className="nearby-list--item">
                                <Link prefetch href={`/locale?id=${id}`} as={`/locale/${id}`} >
                                    <a>{name} ({numberOfPages})</a>
                                </Link>
                            </li>
                        )
                    })}
                </ol>

                <Link href="/">
                    <a aria-label="tillbaka till kartan" className="back-btn">Tillbaka</a>
                </Link>
            </>
        )

    }
}

Locale.getInitialProps = async function (context) {
    const { id } = context.query;
    const locale = await getLocale(id);

    if(locale){
        const localesNearby = await getLocalesNearby(id, 9);

        return { locale, localesNearby }
    }

    return { error: 404 }
};

export default Locale;