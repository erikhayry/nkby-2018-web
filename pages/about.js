import Link from 'next/link'

class About extends React.PureComponent {
    render() {
        return (
            <>
                <h1>Om nkby</h1>
                <p>All data här hämtad från <a href="http://nykarlebyvyer.nu/" target="_blank">nykarlebyvyer.nu</a> och sidan skulle inte vara möjlig utan Fredrik Liljeströms fantastiska jobb</p>
                <p>Den är kodad av Erik Portin och designad av <a href="https://www.ellenportin.com/" target="_blank">Ellen Portin</a></p>

                <Link href="/">
                    <a aria-label="tillbaka till kartan">Tillbaka</a>
                </Link>
            </>
        )
    }
}

export default About