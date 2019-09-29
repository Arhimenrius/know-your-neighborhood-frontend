export default interface ICircleMarker {
    type: string;
    lat: number;
    lon: number;
    color?: string;
    fillColor?: string;
    radius: number;
    popup?: string;
    tooltip?: string;
}
