import fetch from 'isomorphic-unfetch';

function getOrigin(host) {
    //is client
    if(!host && typeof document !== 'undefined'){
        const origin = document.location.origin;

        //is dev : is prod
        return origin.indexOf('localhost') > -1 ? `http://localhost:3001` : origin
    } else if(host && host.indexOf('localhost') > -1){

        //is dev server
        return `http://localhost:3001`;
    }

    //is prod server
    return host ? `https://${host}` : `http://localhost:3001`
}

function sortByName(a, b){
    const specials = ['å', 'ä'];
    const index_a = specials.indexOf(a[0]);
    const index_b = specials.indexOf(b[0]);

    if(index_a > -1 && index_b > -1){
        return index_a - index_b;
    }

    if(a < b){
        return -1
    }

    if(a > b){
        return 1
    }

    return 0;
}

async function get(host, url) {
    try {
        const origin = getOrigin(host);
        const localesJson = await fetch(`${origin}/api/${url}`);

        if(localesJson.status === 200){
            return await localesJson.json();
        }

        return undefined;
    } catch(error) {
        console.error(error);
    }
}

export async function getLocalesNearby(host, currentLocaleId, numbersOfResults = 10){
    return get(host, `locales-nearby/${encodeURI(currentLocaleId)}?numbersOfResults=${numbersOfResults}`);
}

export async function getLocales(host) {
    return get(host, `locales`);
}

export async function getStatistics(host) {
    return get(host, `statistics`);
}

export async function getLocale(host, id){
    const locale = await get(host, `locale/${encodeURI(id)}`);

    if(locale){
        return {id, ...locale};
    }

    return undefined;
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