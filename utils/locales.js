import fetch from 'isomorphic-unfetch';

function getOrigin() {
    if(typeof document !== 'undefined'){
        return document.location.origin
    } else {
        return `http://localhost:3000`
    }
}

function sortByName(a, b){
    if(a < b){
        return -1
    }

    if(a > b){
        return 1
    }

    return 0;
}

async function get(url) {
    const origin = getOrigin();
    const localesJson = await fetch(`${origin}/api/${url}`);

    return await localesJson.json();
}

export async function getLocalesNearby(currentLocaleId, numbersOfResults = 10){
    return get(`locales-nearby/${currentLocaleId}?numbersOfResults=${numbersOfResults}`);
}

export async function getLocales() {
    return get(`locales`);
}

export async function getLocale(id){
    const locale = await get(`locale/${id}`)

    return {id, ...locale};
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