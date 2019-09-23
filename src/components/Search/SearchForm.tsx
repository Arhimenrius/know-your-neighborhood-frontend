import * as React from 'react';
import AddressesInputs from './AddressesInputs';

interface ISearchData {
    checkAddress: string;
    targetAddress: string;
    detailsToDisplay: string[];
}

interface ComponentState {
    searchData: ISearchData;
    displayMoreOptions: boolean
}

interface ExpectedProps {
    onSearchResultsReceived: CallableFunction;
}

export default class SearchForm extends React.Component<ExpectedProps, ComponentState> {
    private checkAddressInputName = 'check-address';

    private targetAddressInputName = 'target-address';

    constructor(props: ExpectedProps) {
        super(props);
        this.state = {
            searchData: { checkAddress: '', targetAddress: '', detailsToDisplay: [] },
            displayMoreOptions: false,
        };

        this.handleOnAddressChange = this.handleOnAddressChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleOnChangeMoreOptions = this.handleOnChangeMoreOptions.bind(this);
    }

    handleOnSubmit(event: {preventDefault: CallableFunction}) {
        const { onSearchResultsReceived } = this.props;
        const { searchData } = this.state;
        onSearchResultsReceived(
            fetch(`https://jsonplaceholder.typicode.com/todos/${searchData.checkAddress}`)
                .then(response => response.json())
                .then(json => { console.log(json); return json; }),
        );
        event.preventDefault();
    }

    handleOnAddressChange(addressType: string, value: string): void {
        switch (addressType) {
            case this.checkAddressInputName:
                this.setState((prevState: Readonly<ComponentState>) => ({
                    searchData: { ...prevState.searchData, checkAddress: value },
                }));
                break;
            case this.targetAddressInputName:
                this.setState((prevState: Readonly<ComponentState>) => ({
                    searchData: { ...prevState.searchData, targetAddress: value },
                }));
                break;
            default:
                break;
        }
    }

    handleOnChangeMoreOptions(event: {target: {checked: boolean}}) {
        const { target } = event;
        const { checked } = target;

        this.setState(() => ({
            displayMoreOptions: checked,
        }));
    }

    render() {
        const { displayMoreOptions } = this.state;

        return (
            <div id="search-container" className="bg-dark clearfix">
                <form onSubmit={this.handleOnSubmit}>
                    <div className="selection-container">
                        <AddressesInputs
                            checkAddressInputName={this.checkAddressInputName}
                            targetAddressInputName={this.targetAddressInputName}
                            onAddressValueChange={this.handleOnAddressChange}
                            displayTargetAddress={false}
                        />
                        <div className={`selection-extra-options ${displayMoreOptions ? '' : 'd-none'}`}>
                            Test content
                        </div>
                    </div>
                    <div className="options-container">
                        <div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <div className="form-check">
                                <label className="form-check-label" htmlFor="more-options">
                                    <input className="form-check-input" type="checkbox" value="" id="more-options" onChange={this.handleOnChangeMoreOptions} />
                                    More options
                                </label>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
