import Link from 'next/link'
import Head from 'next/head'

class About extends React.PureComponent {
    render() {
        return (
            <>
                <Head>
                    <title>Om | NKBY</title>
                </Head>
                <div className="about">
                    <h1>Om nkby</h1>
                    <p>All data här hämtad från <a href="http://nykarlebyvyer.nu/" target="_blank">nykarlebyvyer.nu</a> och sidan skulle inte vara möjlig utan Fredrik Liljeströms fantastiska jobb</p>
                    <p>Den är kodad av Erik Portin och designad av <a href="https://www.ellenportin.com/" target="_blank">Ellen Portin</a></p>
                </div>
                <Link href="/">
                    <a aria-label="tillbaka till kartan" className="back-btn">Tillbaka</a>
                </Link>
            </>
        )
    }
}

export default About