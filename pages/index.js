import React from "react"
import Map from '../components/map';
import LocalesList from '../components/locales-list';
import { getLocales } from '../utils/locales'
import store from '../utils/store'
import Head from 'next/head'

class App extends React.PureComponent {
    onZoomChanged(zoom){
        store.set('zoom', zoom)
    }

    onDragEnd(position){
        store.set('position', position)
    }

    render() {
        const { locales } = this.props;
        const visitedLocales = store.get('visited-locales') || [];
        const zoom = store.get('zoom');
        const position = store.get('position');

        return (
            <>
                <Head>
                    <title>Start | NKBY</title>
                </Head>
                <Map
                    locales={locales}
                    visitedLocales={visitedLocales}
                    zoom={zoom}
                    position={position}
                    style={{height: '500px'}}
                    onDragEnd={this.onDragEnd}
                    onZoomChanged={this.onZoomChanged}
                />
                <LocalesList locales={locales}  />
            </>
        )
    }
}

App.getInitialProps = async function (context) {
    const {req = {}} = context;
    const {headers = {}} = req;
    const locales = await getLocales(headers.host);

    return { locales, skipToContentCopy: 'Gå till lista med gatunamn' }
};

export default App