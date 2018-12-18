import Link from 'next/link'
import Head from 'next/head'
import { getStatistics, getLocales } from '../utils/api'
import LocalesList from '../components/locales-list';
import {Doughnut} from 'react-chartjs-2';

const CHART_OPTIONS = {
    responsive: true,
        legend: {
            display: false
        },
    title: {
        display: false
    },
    animation: {
        animateScale: true,
            animateRotate: true
    }
};

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

                    <h3>Sidor</h3>
                    <Doughnut data={{
                        datasets: [{
                            data: [numberOfPages, totalNumberOfPages],
                            backgroundColor: [
                                'rgba(0,0,0,0.5)',
                                'rgba(0,0,0,0.1)',
                            ],
                            borderWidth: 0
                        }],
                        labels: [
                            'Antal sidor',
                            'Totala antalet sidor'
                        ]
                    }} options={CHART_OPTIONS}/>

                    <h3>Bilder</h3>
                    <Doughnut data={{
                        datasets: [{
                            data: [numberOfImages, totalNumberOfImages],
                            backgroundColor: [
                                'rgba(0,0,0,0.5)',
                                'rgba(0,0,0,0.1)',
                            ],
                            borderWidth: 0
                        }],
                        labels: [
                            'Antal bilder',
                            'Totala antalet bilder'
                        ]
                    }} options={CHART_OPTIONS}/>

                    <h3>Platser</h3>

                    <div>{numberOfLocales}</div>
                    <div>antalet platser på kartan</div>

                    <h2>Mest omskrivna platser</h2>
                    <LocalesList locales={topLocales} withABCNav={false}  />
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