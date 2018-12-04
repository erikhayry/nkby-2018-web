import Link from 'next/link'
import { getLocale, getLocalesNearby } from '../utils/locales'
import StaticMap from '../components/map/static-map';
import PageList from '../components/page-list.js';
import ErrorPage from 'next/error'

const Locale = ({error, locale = {}, localesNearby = []}) => {
    if (error) {
        return <ErrorPage statusCode={error} />
    }
    return (
        <>
            <h1>{locale.name}</h1>
            <StaticMap currentLocale={locale} localesNearby={localesNearby}/>
            <a href="#nearby-locales" aria-label="Gå till lista med närliggande adresser">Närliggande adresser</a>

            <PageList pages={locale.pages} />

            <h2 id="nearby-locales">Närliggande adresser</h2>
            <ol>
                {localesNearby.map(({id, name, numberOfPages}, i) => {
                    return (
                        <li key={i}>
                            <Link prefetch href={`?locale=${id}`} as={`/locale/${id}`} >
                                <a>{name} [{numberOfPages}]</a>
                            </Link>
                        </li>
                    )
                })}
            </ol>

            <Link href="/">
                <a aria-label="tillbaka till kartan">Tillbaka</a>
            </Link>
        </>
    )
};

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