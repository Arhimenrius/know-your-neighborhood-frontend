import * as React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { DrawableElement } from '../DataTypes/DrawableElement';
import ISelectedAddressInformation from '../DataTypes/ISelectedAddressInformation';
import Polygon from './Map/Polygon';
import IPolygon from '../DataTypes/IPolygon';
import Polyline from './Map/Polyline';
import Marker from './Map/Marker';
import Circle from './Map/Circle';
import CircleMarker from './Map/CircleMarker';
import IPolyline from '../DataTypes/IPolyline';
import IMarker from '../DataTypes/IMarker';
import ICircle from '../DataTypes/ICircle';
import ICircleMarker from '../DataTypes/ICircleMarker';

interface ComponentProps {
    checkAddress: ISelectedAddressInformation | null;
    targetAddress: ISelectedAddressInformation | null;
    drawable: DrawableElement[] | null
}

export default class KYNMap extends React.Component<ComponentProps> {
    private readonly markerType = 'Marker';

    private readonly circleType = 'Circle';

    private readonly circleMarkerType = 'CircleMarker';

    private readonly polylineType = 'Polyline';

    private readonly polygonType = 'Polygon';

    constructor(props: ComponentProps) {
        super(props);
        this.handleOnContextMenu.bind(this);
    }

    public state = {
        lat: 60.18,
        lng: 24.94,
        zoom: 13,
    };

    private drawDrawable() {
        const { drawable } = this.props;

        if (Array.isArray(drawable)) {
            return drawable.map((element: DrawableElement) => {
                switch (element.type) {
                    case this.polygonType:
                        return (<Polygon element={element as IPolygon}/>);
                    case this.polylineType:
                        return (<Polyline element={element as IPolyline}/>);
                    case this.markerType:
                        return (<Marker element={element as IMarker}/>);
                    case this.circleType:
                        return (<Circle element={element as ICircle}/>);
                    case this.circleMarkerType:
                        return (<CircleMarker element={element as ICircleMarker}/>);
                    default:
                        return null;
                }
            });
        }
        return null;
    }

    private handleOnContextMenu() {
        //  @TODO replace this Placeholder
        Array.isArray(this);
    }

    public render() {
        const { lat, lng, zoom } = this.state;
        const position: [number, number] = [lat, lng];
        const { checkAddress, targetAddress } = this.props;

        return (
            <Map
                className="map"
                center={position}
                zoomControl={false}
                zoom={zoom}
                onContextMenu={this.handleOnContextMenu}
            >
                {checkAddress && (
                    <Marker element={{
                        type: 'Marker',
                        lat: checkAddress.coordinates.lat,
                        lon: checkAddress.coordinates.lon,
                        tooltip: checkAddress.text,
                        popup: checkAddress.text,
                        icon: 'home',
                        markerColor: 'blue',
                    } as IMarker}
                    />
                )}
                {targetAddress && (
                    <Marker element={{
                        type: 'Marker',
                        lat: targetAddress.coordinates.lat,
                        lon: targetAddress.coordinates.lon,
                        tooltip: targetAddress.text,
                        popup: targetAddress.text,
                        icon: 'bullseye',
                        markerColor: 'red',
                    } as IMarker}
                    />
                )}
                {this.drawDrawable()}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </Map>
        );
    }
}
