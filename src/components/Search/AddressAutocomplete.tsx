/* eslint-disable jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events */
import * as React from 'react';

interface ComponentProps {
    addressesToDisplay: {
        name: string,
        postalcode: string,
        localadmin: string,
        coordinates: {lat: number, lon: number}
    }[];
    addressType: string
    onAddressPicked: CallableFunction;
}

interface AddressData {
    name: string,
    postalcode: string,
    localadmin: string,
    coordinates: {lat: number, lon: number}
}

export default class AddressAutocomplete extends React.Component<ComponentProps> {
    constructor(props: ComponentProps) {
        super(props);
        this.handleOnAddressPicked = this.handleOnAddressPicked.bind(this);
    }

    private handleOnAddressPicked(event: {currentTarget: {getAttribute: CallableFunction}}) {
        const clickedElement = event.currentTarget.getAttribute('data-key');
        const { addressType, addressesToDisplay, onAddressPicked } = this.props;
        const address = addressesToDisplay[clickedElement];
        onAddressPicked(
            addressType,
            {
                text: `${address.name}, ${address.postalcode} ${address.localadmin}`,
                coordinates: address.coordinates,
            },
        );
    }

    private renderAddress(
        key: number,
        address: AddressData,
    ) {
        return (
            <li
                data-key={key}
                key={key}
                onClick={this.handleOnAddressPicked}
            >
                {`${address.name}, ${address.postalcode} ${address.localadmin}`}
            </li>
        );
    }

    public render() {
        const { addressesToDisplay } = this.props;
        const addressesList = addressesToDisplay.map((
            address: AddressData,
            key: number,
        ) => this.renderAddress(key, address));

        return (
            <div>
                <ul className="address-autocomplete-list">
                    {addressesList}
                    {' '}
                </ul>
            </div>
        );
    }
}
