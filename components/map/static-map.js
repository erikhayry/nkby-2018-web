const style = 'feature:administrative%7Celement:labels.text.fill%7Ccolor:0x444444&style=feature:landscape%7Ccolor:0xf2f2f2&style=feature:poi%7Cvisibility:off&style=feature:road%7Csaturation:-100%7Clightness:45&style=feature:road.arterial%7Celement:labels.icon%7Cvisibility:off&style=feature:road.highway%7Cvisibility:simplified&style=feature:transit%7Cvisibility:off&style=feature:water%7Ccolor:0xb6dae0%7Cvisibility:on'

function getLaballedMarker({position}, label){
    return `&markers=color:gray|label:${label + 1}|${position.lat},${position.lng}`
}

function getVisible({position}){
    return `${position.lat},${position.lng}`
}

export default (props) => {
    const {currentLocale = {}, localesNearby = []} = props;
    const { position } = currentLocale;

    let markers = position ? `&markers=${position.lat},${position.lng}` : '';
    //markers = localesNearby.map(getLaballedMarker).join('') + markers;

    const visible = localesNearby.map(getVisible).join('|');
    const center = position ? `${position.lat},${position.lng}` : `63.5217687,22.5216011`;

    return (
        <img
            className="map--small"
            src={`https://maps.googleapis.com/maps/api/staticmap?center=${center}&style=${style}&size=200x200${markers}&visible=${visible}&key=${process.env.GOOGLE_STATIC_MAPS_API}`}
            alt={`Karta med ${currentLocale.name} markerad och de närliggande adressserna ${localesNearby.map(({name}) => name).join(',')}`}
        />
    )
}