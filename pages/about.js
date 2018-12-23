import Link from 'next/link'
import Head from 'next/head'
import { getStatistics, getLocales } from '../utils/api'
import LocalesList from '../components/locales-list';

class About extends React.PureComponent {
    render() {
        const {statistics: {numberOfPages, totalNumberOfPages, numberOfImages, totalNumberOfImages, numberOfLocales} = {}, locales = []} = this.props;
        const topLocales = locales
                            .sort((pagesA, pagesB) => pagesB.numberOfPages - pagesA.numberOfPages)
                            .slice(0, 10);

        return (
            <>
                <Head>
                    <title>Om | NKBY</title>
                </Head>
                <div className="about">
                    <h1>Om nkby</h1>
                    <p>All data här hämtad från <a href="http://nykarlebyvyer.nu/" target="_blank">nykarlebyvyer.nu</a> och sidan skulle inte vara möjlig utan Fredrik Liljeströms fantastiska jobb</p>
                    <p>Den är kodad av Erik Portin och designad av <a href="https://www.ellenportin.com/" target="_blank">Ellen Portin</a></p>

                    <h2>Statistik</h2>

                    <div className="about--numbers">
                        <div className="about--large-primary">{numberOfPages}</div>
                        <div className="about--large-primary-copy">Antal sidor</div>
                        <div className="about--large-secondary">{totalNumberOfPages}</div>
                        <div className="about--large-secondary-copy">Toala antalet sidor på <a href="http://nykarlebyvyer.nu/" target="_blank">nykarlebyvyer.nu</a></div>
                    </div>

                    <div className="about--numbers">
                        <div className="about--large-primary">{numberOfImages}</div>
                        <div className="about--large-primary-copy">Antal bilder</div>
                        <div className="about--large-secondary">{totalNumberOfImages}</div>
                        <div className="about--large-secondary-copy">Totala antalet bilder på <a href="http://nykarlebyvyer.nu/" target="_blank">nykarlebyvyer.nu</a></div>
                    </div>

                    <div className="about--numbers">
                        <div className="about--large-primary">{numberOfLocales}</div>
                        <div className="about--large-primary-copy">Antalet platser markerade på kartan</div>
                    </div>

                    <div className="about--numbers">
                        <h2>Mest omskrivna platser</h2>
                        <LocalesList locales={topLocales} withABCNav={false}  />
                    </div>
                </div>

                <Link href="/">
                    <a aria-label="tillbaka till kartan" className="back-btn">
                        <span className="visible-hidden">Tillbaka</span>
                    </a>
                </Link>
            </>
        )
    }
}

About.getInitialProps = async function (context) {
    const {req = {}} = context;
    const {headers = {}} = req;
    const statistics = await getStatistics(headers.host);
    const locales = await getLocales(headers.host);

    return { statistics, locales }
};

export default About