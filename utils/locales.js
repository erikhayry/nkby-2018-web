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

export async function getLocalesNearby(currentLocaleId, numbersOfResults = 10){
    const localesJson = await fetch(`http://localhost:3000/api/locales-nearby/${currentLocaleId}?numbersOfResults=${numbersOfResults}`);
    const locales = await localesJson.json()

    return locales;
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