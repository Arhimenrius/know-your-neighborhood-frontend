import * as React from 'react';
import AddressAutocomplete from './AddressAutocomplete';
import IAddressData from '../../DataTypes/IAddressData';

interface ComponentProps {
    displayTargetAddress: boolean;
    onAddressValueChange: CallableFunction,
    checkAddressInputName: string,
    targetAddressInputName: string,
}

interface ComponentState {
    checkAddress: string;
    targetAddress: string;
    checkAddressesToDisplay: IAddressData[];
    targetAddressesToDisplay: IAddressData[];

    [name: string]: string | object;
}

export default class AddressesInputs extends React.Component<ComponentProps, ComponentState> {
    private readonly checkAddressStateName = 'checkAddress';

    private readonly targetAddressStateName = 'targetAddress';

    private readonly addressesToDisplayStateSuffix = 'esToDisplay';

    constructor(props: ComponentProps) {
        super(props);
        this.state = {
            checkAddress: '',
            targetAddress: '',
            checkAddressesToDisplay: [],
            targetAddressesToDisplay: [],
        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnUpdatedCoordinates = this.handleOnUpdatedCoordinates.bind(this);
    }

    private handleOnChange(event: {target: {name: string, value: string}}) {
        const { name: addressType, value } = event.target;
        this.setState(() => {
            const addressToChange: {[addressType: string]: string} = {};
            addressToChange[addressType] = value;

            return addressToChange;
        });

        if (value.length > 3) {
            fetch(`https://api.digitransit.fi/geocoding/v1/search?text=${value}&size=5`)
                .then(response => response.json())
                .then(json => this.setState(() => {
                    const addressToChange: {[addressType: string]: object} = {};
                    if (Object.prototype.hasOwnProperty.call(json, 'features') && Array.isArray(json.features)) {
                        addressToChange[addressType + this.addressesToDisplayStateSuffix] = json.features.map(
                            (
                                feature: {
                                    properties: {
                                        name: string,
                                        postalcode: string,
                                        localadmin: string
                                    },
                                    geometry: {
                                        coordinates: Array<number>,
                                    }
                                },
                            ) => {
                                const { properties, geometry } = feature;
                                const { name, postalcode, localadmin } = properties;
                                return {
                                    name,
                                    postalcode,
                                    localadmin,
                                    coordinates: {
                                        lat: geometry.coordinates[1],
                                        lon: geometry.coordinates[0],
                                    },
                                };
                            },
                        );
                    }
                    return addressToChange;
                }));
        }
    }

    private handleOnUpdatedCoordinates(
        addressType: string,
        result: {text: string, coordinates: {lat: number, lon: number}},
    ) {
        this.setState(() => {
            const addressToChange: {[addressTypeCoordinates: string]: {}} = {};
            addressToChange[addressType] = result.text;
            addressToChange[addressType + this.addressesToDisplayStateSuffix] = {};

            const { onAddressValueChange } = this.props;
            onAddressValueChange(addressType, result);

            return addressToChange;
        });
    }

    private renderCheckAddressOnly() {
        const { checkAddressInputName } = this.props;
        const { checkAddress, checkAddressesToDisplay } = this.state;

        return (
            <div className="address-inputs">
                <input
                    type="text"
                    value={checkAddress}
                    name={checkAddressInputName}
                    className="form-control"
                    id="check-address"
                    placeholder="Check address"
                    onChange={this.handleOnChange}
                />
                {Object.keys(checkAddressesToDisplay).length
                    ? (
                        <AddressAutocomplete
                            addressType={this.checkAddressStateName}
                            addressesToDisplay={checkAddressesToDisplay}
                            onAddressPicked={this.handleOnUpdatedCoordinates}
                        />
                    )
                    : null}
            </div>
        );
    }

    private renderCheckAndTargetAddress() {
        const { checkAddressInputName, targetAddressInputName } = this.props;

        const {
            checkAddress,
            targetAddress,
            checkAddressesToDisplay,
            targetAddressesToDisplay,
        } = this.state;

        return (
            <div className="address-inputs">
                <input
                    type="text"
                    value={checkAddress}
                    name={checkAddressInputName}
                    className="form-control"
                    id="check-address"
                    placeholder="Check address"
                    onChange={this.handleOnChange}
                    required
                />
                {Object.keys(checkAddressesToDisplay).length
                    ? (
                        <AddressAutocomplete
                            addressType={this.checkAddressStateName}
                            addressesToDisplay={checkAddressesToDisplay}
                            onAddressPicked={this.handleOnUpdatedCoordinates}
                        />
                    )
                    : null}
                <input
                    type="text"
                    value={targetAddress}
                    name={targetAddressInputName}
                    className="form-control"
                    id="target-address"
                    placeholder="Target address"
                    onChange={this.handleOnChange}
                    required
                />
                {Object.keys(targetAddressesToDisplay).length
                    ? (
                        <AddressAutocomplete
                            addressType={this.targetAddressStateName}
                            addressesToDisplay={targetAddressesToDisplay}
                            onAddressPicked={this.handleOnUpdatedCoordinates}
                        />
                    )
                    : null}
            </div>
        );
    }

    public render() {
        const { displayTargetAddress } = this.props;

        return displayTargetAddress
            ? this.renderCheckAndTargetAddress()
            : this.renderCheckAddressOnly();
    }
}
