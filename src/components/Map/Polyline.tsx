import * as React from 'react';
import { Polygon, Popup, Tooltip } from 'react-leaflet';
import IPolyline from '../../DataTypes/IPolyline';

export default function (props: {element: IPolyline}) {
    const { element } = props;

    return (
        <Polygon
            positions={element.coordinates}
            color={element.color}
            fillColor={element.fillColor}
        >
            {element.popup && <Popup>{element.popup}</Popup>}
            {element.tooltip && <Tooltip>{element.tooltip}</Tooltip>}
        </Polygon>
    );
}
