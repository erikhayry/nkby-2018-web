const style = 'feature:administrative%7Celement:labels.text.fill%7Ccolor:0x444444&style=feature:landscape%7Ccolor:0xf2f2f2&style=feature:poi%7Cvisibility:off&style=feature:road%7Csaturation:-100%7Clightness:45&style=feature:road.arterial%7Celement:labels.icon%7Cvisibility:off&style=feature:road.highway%7Cvisibility:simplified&style=feature:transit%7Cvisibility:off&style=feature:water%7Ccolor:0xb6dae0%7Cvisibility:on'
const GOOGLE_STATIC_MAPS_API = 'AIzaSyB5WG8EHKBFUTaKS3GBshdehUuYs44I61Q';
const MARKER_IMAGE = 'http://nkby.now.sh/static/images/markers/marker-small.png';

function getSrc(position, width, height, zoom){
    let markers = position ? `&markers=icon:${MARKER_IMAGE}?dl=1|${position.lat},${position.lng}` : '';
    const center = position ? `${position.lat},${position.lng}` : `63.5217687,22.5216011`;

    return `https://maps.googleapis.com/maps/api/staticmap?center=${center}&zoom=${zoom}&style=${style}&size=${width}x${height}&${markers}&scale=2&key=${GOOGLE_STATIC_MAPS_API}`
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
    const {currentLocale = {}, widths = [], height = 200, zoom = '', mapClassName = '', style = {}} = props;
    const { position } = currentLocale;
    const defaultWidth = widths[0];

    return (
        <>
            <style jsx="true">{`
              ${getStyle(mapClassName, defaultWidth, widths)}
            `}</style>
            <img
                className={`map--small ${mapClassName}`}
                src={getSrc(position, defaultWidth, height, zoom)}
                alt={`Karta över Nykarleby med ${currentLocale.name} markerad`}
                height={height}
                style={style}
            />
        </>
    )
}