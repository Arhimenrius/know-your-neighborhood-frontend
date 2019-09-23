import * as React from 'react';
import Select from 'react-select';
import { ValueType } from 'react-select/src/types';

interface ComponentProps {
    displayMoreOptions: boolean;
    onServicesToDisplayChanged: (services: string[]) => void;
    onOtherOptionChanged: (optionName: string, value: string|boolean|null) => void;
}

export default class MoreOptionsInputs extends React.Component<ComponentProps> {
    private inputsWithCheckedAttribute = ['checkbox', 'radio'];

    private servicesToDisplaySelectName = 'services-to-display';

    private showPublicTransportConnectionInputName= 'show-public-transport-connection';

    constructor(props: ComponentProps) {
        super(props);
        this.handleOnServicesToDisplayChange = this.handleOnServicesToDisplayChange.bind(this);
        this.handleOnOtherOptionChange = this.handleOnOtherOptionChange.bind(this);
    }

    handleOnServicesToDisplayChange(values: ValueType<{ label: string; value: string }>) {
        if (!Array.isArray(values)) {
            throw new Error('Unexpected value passed after updating services to display');
        }
        const { onServicesToDisplayChanged } = this.props;

        const listOfValues:{ label: string; value: string }[] = values;

        onServicesToDisplayChanged(
            listOfValues.map((value: { label: string; value: string }) => value.value),
        );
    }

    handleOnOtherOptionChange(
        event: {target: {type: string, name: string, value: string|null, checked: boolean|null}},
    ) {
        const { target } = event;
        const { onOtherOptionChanged } = this.props;
        if (this.inputsWithCheckedAttribute.includes(target.type)) {
            onOtherOptionChanged(target.name, target.checked);
        } else {
            onOtherOptionChanged(target.name, target.value);
        }
    }

    render() {
        const { displayMoreOptions } = this.props;

        return (
            <div className={`selection-extra-options ${displayMoreOptions ? '' : 'd-none'}`}>
                <Select
                    placeholder="Select services to display"
                    id={this.servicesToDisplaySelectName}
                    name={this.servicesToDisplaySelectName}
                    isMulti
                    options={[
                        { label: 'Test', value: 'test' },
                        { label: 'Test1', value: 'test1' },
                        { label: 'Test2', value: 'test2' },
                        { label: 'Test3', value: 'test3' },
                        { label: 'Test4', value: 'test4' },
                        { label: 'Test5', value: 'test5' },
                        { label: 'Test6', value: 'test6' },
                        { label: 'Test7', value: 'test7' },
                        { label: 'Test8', value: 'test8' },
                    ]}
                    closeMenuOnSelect={false}
                    onChange={this.handleOnServicesToDisplayChange}
                />
                <div className="custom-control custom-checkbox my-1 mr-sm-2">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id={this.showPublicTransportConnectionInputName}
                        name={this.showPublicTransportConnectionInputName}
                        onChange={this.handleOnOtherOptionChange}
                    />
                    <label className="custom-control-label" htmlFor={this.showPublicTransportConnectionInputName}>
                        Show public transport connection quality
                    </label>
                </div>
            </div>
        );
    }
}
