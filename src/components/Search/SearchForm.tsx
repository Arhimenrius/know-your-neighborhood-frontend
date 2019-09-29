import * as React from 'react';
import AddressesInputs from './AddressesInputs';
import MoreOptionsInputs from './MoreOptionsInputs';
import ICircle from '../../DataTypes/ICircle';
import ICircleMarker from '../../DataTypes/ICircleMarker';
import IMarker from '../../DataTypes/IMarker';
import IPolyline from '../../DataTypes/IPolyline';
import IPolygon from '../../DataTypes/IPolygon';

interface ISearchData {
    checkAddress: {text: string, coordinates: {lat: number | null, lon: number | null}};
    targetAddress: {text: string, coordinates: {lat: number | null, lon: number | null}};
    servicesToDisplay: string[];
    otherOptions: {[optionName: string]: boolean | string | null}
}

interface ComponentState {
    searchData: ISearchData;
    displayMoreOptions: boolean

}

interface ExpectedProps {
    onSearchResultsReceived: CallableFunction;
}

export default class SearchForm extends React.Component<ExpectedProps, ComponentState> {
    // private readonly optionsRequiringTargetAddress = [
    //     'show-public-transport-connection',
    // ];

    private readonly checkAddressInputName = 'checkAddress';

    private readonly targetAddressInputName = 'targetAddress';

    constructor(props: ExpectedProps) {
        super(props);
        this.state = {
            searchData: {
                checkAddress: {
                    text: '',
                    coordinates: {
                        lat: null,
                        lon: null,
                    },
                },
                targetAddress: {
                    text: '',
                    coordinates: {
                        lat: null,
                        lon: null,
                    },
                },
                servicesToDisplay: [],
                otherOptions: {},
            },
            displayMoreOptions: false,
        };

        this.handleOnAddressChange = this.handleOnAddressChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleOnChangeMoreOptions = this.handleOnChangeMoreOptions.bind(this);
        this.handleOnServicesToDisplayChanged = this.handleOnServicesToDisplayChanged.bind(this);
        this.handleOnOtherOptionChanged = this.handleOnOtherOptionChanged.bind(this);
    }

    private handleOnAddressChange(
        addressType: string,
        value: {text: string, coordinates: {lat: number, lon: number}},
    ): void {
        switch (addressType) {
            case this.checkAddressInputName:
                this.setState((prevState: Readonly<ComponentState>) => ({
                    searchData: {
                        ...prevState.searchData,
                        checkAddress: value,
                    },
                }));
                break;
            case this.targetAddressInputName:
                this.setState((prevState: Readonly<ComponentState>) => ({
                    searchData: {
                        ...prevState.searchData,
                        targetAddress: value,
                    },
                }));
                break;
            default:
                break;
        }
    }

    private handleOnServicesToDisplayChanged(services: string[]): void {
        this.setState((prevState: Readonly<ComponentState>) => ({
            searchData: {
                ...prevState.searchData,
                servicesToDisplay: services,
            },
        }));
    }

    private handleOnOtherOptionChanged(optionName: string, value: string | boolean | null): void {
        this.setState((prevState: Readonly<ComponentState>) => {
            const { otherOptions } = prevState.searchData;
            otherOptions[optionName] = value;

            return {
                searchData: {
                    ...prevState.searchData,
                    otherOptions,
                },
            };
        });
    }

    private handleOnChangeMoreOptions(event: {target: {checked: boolean}}) {
        const { target } = event;
        const { checked } = target;

        this.setState(() => ({
            displayMoreOptions: checked,
        }));
    }

    private handleOnSubmit(event: {preventDefault: CallableFunction}) {
        const { onSearchResultsReceived } = this.props;
        const { searchData } = this.state;

        // const params: {[paramName: string]: number | null} = {
        //     checkAddressLat: searchData.checkAddress.coordinates.lat,
        //     checkAddressLon: searchData.checkAddress.coordinates.lon,
        //     targetAddressLat: searchData.targetAddress.coordinates.lat,
        //     targetAddressLon: searchData.targetAddress.coordinates.lon,
        // };

        onSearchResultsReceived(
            searchData.checkAddress,
            searchData.targetAddress,
            Promise.resolve({
                results: [
                    {
                        'Group 1': {
                            'Information 11': 'value 11',
                            'Information 12': 'value 12',
                            'Information 13': 'value 13',
                        },
                    },
                    {
                        'Group 2': {
                            'Information 21': 'value 21',
                            'Information 22': 'value 22',
                            'Information 23': 'value 23',
                        },
                    },
                ],
                drawable: [
                    {
                        type: 'Circle',
                        lat: 60.20,
                        lon: 24.95,
                        color: 'blue',
                        popup: 'Dummy text',
                        tooltip: 'Dummy tooltip',
                        radius: 500,
                    } as ICircle,
                    {
                        type: 'CircleMarker',
                        lat: 60.19,
                        lon: 24.97,
                        fillColor: 'red',
                        popup: 'Dummy text',
                        tooltip: 'Dummy tooltip',
                        radius: 10,
                    } as ICircleMarker,
                    {
                        type: 'Marker',
                        lat: 60.21,
                        lon: 24.96,
                        popup: 'Dummy text',
                        tooltip: 'Dummy tooltip',
                        radius: 500,
                    } as IMarker,
                    {
                        type: 'Polyline',
                        coordinates: [[60.31, 25], [60.31, 24.99], [60.33, 24.99]],
                        color: 'orange',
                        popup: 'Dummy text',
                        tooltip: 'Dummy tooltip',
                    } as IPolyline,
                    {
                        type: 'Polygon',
                        coordinates: [[60.3, 25.1], [60.3, 25.12], [60.32, 25.12]],
                        color: 'purple',
                        popup: 'Dummy text',
                        tooltip: 'Dummy tooltip',
                    } as IPolygon,
                ],
            }),
            // fetch('https://jsonplaceholder.typicode.com/todos?'
            //     + `${Object.keys(params)
            //         .map((paramName: string) => `${paramName}=${params[paramName]}`)
            //         .join('&')}`)
            //     .then(response => response.json())
            //     .then(json => json),
        );
        event.preventDefault();
    }

    private shouldTargetAddressBeDisplayed(): boolean {
        // const { searchData } = this.state;
        // let optionFound = false;
        // this.optionsRequiringTargetAddress.forEach((option: string) => {
        //     if (Object.prototype.hasOwnProperty.call(searchData.otherOptions, option)
        //         && searchData.otherOptions[option]
        //     ) {
        //         optionFound = true;
        //     }
        // });

        // return optionFound;
        return true;
    }

    public render() {
        const { displayMoreOptions } = this.state;

        return (
            <div id="search-container" className="bg-dark clearfix">
                <form onSubmit={this.handleOnSubmit}>
                    <div className="selection-container">
                        <AddressesInputs
                            checkAddressInputName={this.checkAddressInputName}
                            targetAddressInputName={this.targetAddressInputName}
                            onAddressValueChange={this.handleOnAddressChange}
                            displayTargetAddress={this.shouldTargetAddressBeDisplayed()}
                        />
                        <MoreOptionsInputs
                            displayMoreOptions={displayMoreOptions}
                            onServicesToDisplayChanged={this.handleOnServicesToDisplayChanged}
                            onOtherOptionChanged={this.handleOnOtherOptionChanged}
                        />
                    </div>
                    <div className="options-container">
                        <div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            {/* <div className="form-check">
                                <label className="form-check-label" htmlFor="more-options">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="more-options"
                                        onChange={this.handleOnChangeMoreOptions}
                                    />
                                    More options
                                </label>
                            </div> */}
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
