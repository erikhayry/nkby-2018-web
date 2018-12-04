import Link from 'next/link'
import { getLocale, getLocalesNearby } from '../utils/locales'
import StaticMap from '../components/map/static-map';
import Map from '../components/map';
import PageList from '../components/page-list.js';

const Locale = ({currentLocale = {}, localesNearby = []}) => {
    return (
        <>
            <h1>{currentLocale.name}</h1>
            <noscript>
                <StaticMap currentLocale={currentLocale} localesNearby={localesNearby}/>
                <a href="#nearby-locales" aria-label="Gå till lista med närliggande adresser">Närliggande adresser</a>
            </noscript>
            <Map
                position={currentLocale.position}
                locales={[currentLocale]}
                style={{height: '200px', width: '200px'}}
                options={{
                    fullscreenControl: false,
                    locationControl: false,
                    zoomControl: false,
                    draggable: false,
                }}
                showFindMeButton={false}
                enableUserInteractions={false}
            />

            <PageList pages={currentLocale.pages} />

            <noscript>
                <h2 id="nearby-locales">Närliggande adresser</h2>
                <ol>
                    {localesNearby.map(({id, name, numberOfPages}, i) => {
                        return (
                            <li key={i}>
                                <Link prefetch href={`/?locale=${id}`} as={`/locale/${id}`} >
                                    <a>{name} [{numberOfPages}]</a>
                                </Link>
                            </li>
                        )
                    })}
                </ol>
            </noscript>

            <Link href="/">
                <a aria-label="tillbaka till kartan">Tillbaka</a>
            </Link>
        </>
    )
};

Locale.getInitialProps = async function (context) {
    const { id } = context.query;
    const locale = await getLocale(id);
    const localesNearby = await getLocalesNearby(id, 9);

    return { currentLocale: locale, localesNearby }
};

export default Locale;