export default interface IMarker {
    type: string;
    lat: number;
    lon: number;
    icon?: string;
    markerColor?: string;
    popup?: string;
    tooltip?: string;
}
