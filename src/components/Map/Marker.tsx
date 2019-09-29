/* eslint-disable global-require */
import * as React from 'react';
import { Marker, Popup, Tooltip } from 'react-leaflet';
import * as L from 'leaflet';
import IMarker from '../../DataTypes/IMarker';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.min';


function generateIcon(icon?: string, markerColor?: string) {
    L.Icon.Default.imagePath = '.';

    return L.AwesomeMarkers.icon({
        icon,
        prefix: 'fa',
        markerColor: markerColor as 'red' | 'darkred' | 'orange' | 'green' | 'darkgreen'
            | 'blue' | 'purple' | 'darkpurple' | 'cadetblue',
    });
}

export default function (props: {element: IMarker}) {
    const { element } = props;

    return (
        <Marker
            icon={generateIcon(element.icon, element.markerColor)}
            position={[element.lat, element.lon]}
        >
            {element.popup && <Popup>{element.popup}</Popup>}
            {element.tooltip && <Tooltip>{element.tooltip}</Tooltip>}
        </Marker>
    );
}
