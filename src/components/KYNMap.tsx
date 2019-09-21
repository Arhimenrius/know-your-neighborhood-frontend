import * as React from 'react';
import { Map, TileLayer } from 'react-leaflet';

export default class KYNMap extends React.Component {
    public state = {
        lat: 60.18,
        lng: 24.94,
        zoom: 13,
    };

    render() {
        const { lat, lng, zoom } = this.state;
        const position: [number, number] = [lat, lng];

        return (
            <Map className="map" center={position} zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </Map>
        );
    }
}
