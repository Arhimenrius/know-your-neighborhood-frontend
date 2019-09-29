import * as React from 'react';
import { CircleMarker, Popup, Tooltip } from 'react-leaflet';
import ICircleMarker from '../../DataTypes/ICircleMarker';

export default function (props: {element: ICircleMarker}) {
    const { element } = props;

    return (
        <CircleMarker
            center={[element.lat, element.lon]}
            radius={element.radius}
            color={element.color}
            fillColor={element.fillColor}
        >
            {element.popup && <Popup>{element.popup}</Popup>}
            {element.tooltip && <Tooltip>{element.tooltip}</Tooltip>}
        </CircleMarker>
    );
}
