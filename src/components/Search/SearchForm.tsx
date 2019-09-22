import * as React from 'react';
import AddressesInputs from './AddressesInputs';

interface ISearchData {
    checkAddress: string;
    targetAddress: string;
    detailsToDisplay: string[];
}

interface ComponentState {
    searchData: ISearchData;
}

interface ExpectedProps {
    onSearchResultsReceived: CallableFunction;
}

export default class SearchForm extends React.Component<ExpectedProps, ComponentState> {
    private checkAddressInputName = 'check-address';

    private targetAddressInputName = 'target-address';

    constructor(props: ExpectedProps) {
        super(props);
        this.state = { searchData: { checkAddress: '', targetAddress: '', detailsToDisplay: [] } };

        this.handleOnAddressChange = this.handleOnAddressChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
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

    render() {
        return (
            <div id="search-container">
                <form onSubmit={this.handleOnSubmit}>
                    <AddressesInputs
                        checkAddressInputName={this.checkAddressInputName}
                        targetAddressInputName={this.targetAddressInputName}
                        onAddressValueChange={this.handleOnAddressChange}
                        displayTargetAddress={false}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}
