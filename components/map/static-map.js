const style = 'feature:administrative%7Celement:labels.text.fill%7Ccolor:0x444444&style=feature:landscape%7Ccolor:0xf2f2f2&style=feature:poi%7Cvisibility:off&style=feature:road%7Csaturation:-100%7Clightness:45&style=feature:road.arterial%7Celement:labels.icon%7Cvisibility:off&style=feature:road.highway%7Cvisibility:simplified&style=feature:transit%7Cvisibility:off&style=feature:water%7Ccolor:0xb6dae0%7Cvisibility:on'
const GOOGLE_STATIC_MAPS_API = 'AIzaSyB5WG8EHKBFUTaKS3GBshdehUuYs44I61Q';

function getLaballedMarker({position}, label){
    return `&markers=color:gray|label:${label + 1}|${position.lat},${position.lng}`
}

function getVisible({position}){
    return `${position.lat},${position.lng}`
}

function getSrc(position, localesNearby, width, height, zoom){
    let markers = position ? `&markers=icon:https://www.dropbox.com/s/ajc92ltaq1rzprf/marker.png?dl=1|${position.lat},${position.lng}` : '';
    //markers = localesNearby.map(getLaballedMarker).join('') + markers;
    //const visible = localesNearby.map(getVisible).join('|');

    const center = position ? `${position.lat},${position.lng}` : `63.5217687,22.5216011`;

    return `https://maps.googleapis.com/maps/api/staticmap?center=${center}&zoom=${zoom}&style=${style}&size=${width}x${height}&scale=2&${markers}&key=${GOOGLE_STATIC_MAPS_API}`
}

function getSrcSet(position, localesNearby, widths, height, zoom){
    return widths.map(width => `${getSrc(position, localesNearby, width, height, zoom)} ${width}w`).join(',')
}

function getStyle(mapClassName, defaultWidth, widths){

    const defaultStyle = `
        .${mapClassName}{
            width: ${defaultWidth}px;
            margin-left: -${defaultWidth/2}px;
         } 
    `;

    const mediaQueries = widths
        .filter(width => width !== defaultWidth)
        .map(width => {
            return `
              @media (min-width: ${width}px) {
                .${mapClassName}{
                    width: ${width}px;
                    margin-left: -${width/2}px;
                } 
              }  
            `
        })
        .join('');

    return defaultStyle + mediaQueries

}

export default (props) => {
    const {currentLocale = {}, localesNearby = [], widths = [], height = 200, zoom = '', mapClassName = '', style = {}} = props;
    const { position } = currentLocale;
    const defaultWidth = widths[0]

    return (
        <>
            <style jsx>{`
              ${getStyle(mapClassName, defaultWidth, widths)}
            `}</style>
            <img
                className={`map--small ${mapClassName}`}
                src={getSrc(position, localesNearby, defaultWidth, height, zoom)}
                alt={`Karta över Nykarleby med ${currentLocale.name} markerad`}
                height={height}
                style={style}
            />
        </>
    )
}