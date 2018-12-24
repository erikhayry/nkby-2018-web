export function capitalize(string = '') {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function parseImageSrc(src){
    if(src){
        return `https://www.nykarlebyvyer.nu/${src.replace('../../../', '')}`;
    }

    return undefined;
}