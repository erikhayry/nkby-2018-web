import locales from '../data/locales.json';
import fetch from 'isomorphic-unfetch';

function sortByName(a, b){
    if(a < b){
        return -1
    }

    if(a > b){
        return 1
    }

    return 0;
}

// Convert Degress to Radians
function Deg2Rad(deg) {
    return deg * Math.PI / 180;
}

function PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
    lat1 = Deg2Rad(lat1);
    lat2 = Deg2Rad(lat2);
    lon1 = Deg2Rad(lon1);
    lon2 = Deg2Rad(lon2);
    let R = 6371; // km
    let x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
    let y = (lat2 - lat1);

    return Math.sqrt(x * x + y * y) * R;
}

export async function getLocalesNearby(currentLocaleId, {lng: currentLocaleLng, lat: currentLocaleLat}, numbersOfResults = 10){
    const locales = await getLocales();
    return locales
        .filter(locale => locale.position && locale.id !== currentLocaleId)
        .map(locale => {
            const {lng, lat} = locale.position;
            const dif = PythagorasEquirectangular(currentLocaleLng, currentLocaleLat, lng, lat);

            return {
                ...locale,
                dif
            }
        })
        .sort((localeA, localeB) => {
            return localeA.dif - localeB.dif
        })
        .splice(0, numbersOfResults)
}

export async function getLocales() {
    const localesJson = await fetch('http://localhost:3000/api/locales')
    const locales = await localesJson.json()

    return locales;
}

export async function getLocale(id){
    const localeJson = await fetch(`http://localhost:3000/api/locale/${id}`)
    const locale = await localeJson.json()

    return locale;
}

export function sortLocalesByName(locales){
    return locales.sort(({name: name1}, {name: name2}) => {
        return sortByName(name1, name2)
    })
}

export function sortPagesByTitle(pages){
    return pages
        .sort(({title: title1}, {title: title2}) => {
            return sortByName(title1, title2)
        })
}

export function getMinMax(type) {
    const filteredLocales = getLocales()
        .filter(locale => locale.position);

    const max = Math.max(...filteredLocales.map(({position}) => position[type]));

    const min = Math.min(...filteredLocales.map(({position}) => position[type]))

    return {max, min}
}