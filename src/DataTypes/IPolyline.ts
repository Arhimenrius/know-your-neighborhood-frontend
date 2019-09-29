export default interface IPolyline {
    type: string;
    coordinates: [number, number][]
    color?: string;
    fillColor?: string;
    radius: number;
    popup?: string;
    tooltip?: string;
}
