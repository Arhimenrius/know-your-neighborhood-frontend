import * as React from 'react';

interface ExpectedProps {
    displayTargetAddress: boolean;
    onAddressValueChange: CallableFunction,
    checkAddressInputName: string,
    targetAddressInputName: string,
}

export default class AddressesInputs extends React.Component<ExpectedProps> {
    constructor(props: ExpectedProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event: {target: {name: string, value: string}}) {
        const { name, value } = event.target;
        const { onAddressValueChange } = this.props;
        onAddressValueChange(name, value);
    }

    renderCheckAddressOnly() {
        const { checkAddressInputName } = this.props;
        return (
            <div className="address-inputs">
                <input type="text" name={checkAddressInputName} className="form-control" id="check-address" placeholder="Check address" onChange={this.onChange} />
            </div>
        );
    }

    renderCheckAndTargetAddress() {
        const { checkAddressInputName, targetAddressInputName } = this.props;
        return (
            <div className="address-inputs">
                <input type="text" name={checkAddressInputName} className="form-control" id="check-address" placeholder="Check address" onChange={this.onChange} />
                <input type="text" name={targetAddressInputName} className="form-control" id="target-address" placeholder="Target address" onChange={this.onChange} />
            </div>
        );
    }

    render() {
        const { displayTargetAddress } = this.props;

        return displayTargetAddress === true
            ? this.renderCheckAndTargetAddress()
            : this.renderCheckAddressOnly();
    }
}
