export default interface IAddressData {
    name: string,
    postalcode: string,
    localadmin: string,
    coordinates: {lat: number, lon: number}
}
