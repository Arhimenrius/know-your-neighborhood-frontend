import * as React from 'react';
import { Circle, Popup, Tooltip } from 'react-leaflet';
import ICircle from '../../DataTypes/ICircle';

export default function (props: {element: ICircle}) {
    const { element } = props;

    return (
        <Circle
            center={[element.lat, element.lon]}
            radius={element.radius}
            color={element.color}
            fillColor={element.fillColor}
        >
            {element.popup && <Popup>{element.popup}</Popup>}
            {element.tooltip && <Tooltip>{element.tooltip}</Tooltip>}
        </Circle>
    );
}
