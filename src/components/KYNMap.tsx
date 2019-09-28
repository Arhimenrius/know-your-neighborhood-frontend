import * as React from 'react';
import { Map, TileLayer } from 'react-leaflet';

export default class KYNMap extends React.Component {
    constructor(props: {}) {
        super(props);
        this.handleOnContextMenu.bind(this);
    }

    public state = {
        lat: 60.18,
        lng: 24.94,
        zoom: 13,
    };

    private handleOnContextMenu() {
        // @TODO replace this Placeholder
        Array.isArray(this);
    }

    public render() {
        const { lat, lng, zoom } = this.state;
        const position: [number, number] = [lat, lng];

        return (
            <Map className="map" center={position} zoomControl={false} zoom={zoom} onContextMenu={this.handleOnContextMenu}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </Map>
        );
    }
}
