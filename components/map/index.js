import React from "react"
import ReactGA from 'react-ga';
import MapRenderer from './map-renderer';
import ErrorBoundary from '../error-boundary'
import Router from 'next/router'

const GOOGLE_MAPS_API = 'AIzaSyCFy3CNUN5wD31kqxr6fuBPmlSHMh9hcsw';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.onMapMounted = this.onMapMounted.bind(this);
        this.setLocation = this.setLocation.bind(this);
        this.setActiveMarker = this.setActiveMarker.bind(this);
        this.onZoomChanged = this.onZoomChanged.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.handleMarkerEvent = this.handleMarkerEvent.bind(this);
    }

    state = {
        userPosition: undefined,
        zoom: undefined,
        center: undefined,
        isLoading: ''
    };

    onMapMounted(map){
        this.ref = map;
    }

    onZoomChanged(){
        if(this.props.onZoomChanged){
            this.props.onZoomChanged(this.ref.getZoom())
        }
    }

    onDragEnd(){
        if(this.props.onDragEnd){
            this.props.onDragEnd({
                    lat: this.ref.getCenter().lat(),
                    lng: this.ref.getCenter().lng()
                })
        }
    }

    handleMarkerEvent(id){
        ReactGA.event({
            category: 'user',
            action: `marker:${id}`
        });
        Router.push({
            pathname: '/locale',
            query: {id},
        })
    }

    setActiveMarker(id){
        this.setState({activeMarker: id})
    }

    setLocation(){
        this.setState({isLoading: 'Söker din plats'});
        ReactGA.event({
            category: 'user',
            action: 'find me'
        });
        navigator.geolocation.getCurrentPosition((position) => {
            if(this.ref){
                this.ref.panTo({lat: position.coords.latitude, lng: position.coords.longitude})
            }
            this.setState({
                userPosition: {lat: position.coords.latitude, lng: position.coords.longitude},
                isLoading: ''
            })
        });
    }

    render(){
        const {userPosition, activeMarker, isLoading} = this.state;
        const {
            locales,
            currentLocale,
            visitedLocales,
            style = {},
            options,
            showFindMeButton,
            enableUserInteractions,
            zoom,
            position
        } = this.props;

        return (
            <ErrorBoundary>
                <MapRenderer
                    onMapMounted={this.onMapMounted}
                    onZoomChanged={this.onZoomChanged}
                    onDragEnd={this.onDragEnd}
                    locales={locales}
                    visitedLocales={visitedLocales}
                    activeMarker={activeMarker}
                    currentLocale={currentLocale}
                    isLoading={isLoading}
                    handleMarkerEvent={this.handleMarkerEvent}
                    setLocation={this.setLocation}
                    setActiveMarker={this.setActiveMarker}
                    userPosition={userPosition}
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API}&v=3.exp&librarie=geometry,drawing,places`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100vh`, width: '100%', ...style }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    options={options}
                    showFindMeButton={showFindMeButton}
                    enableUserInteractions={enableUserInteractions}
                    zoom={zoom}
                    position={position}
                />
            </ErrorBoundary>
        )
    }
}

export default Map;