import * as React from 'react';
import KYNMap from '../components/KYNMap';
import SearchForm from '../components/Search/SearchForm';
import SearchResults from '../components/Search/SearchResults';
import IExpectedResponse from '../DataTypes/IExpectedResponse';
import ISelectedAddressInformation from '../DataTypes/ISelectedAddressInformation';

interface ComponentState {
    checkAddress: ISelectedAddressInformation | null;
    targetAddress: ISelectedAddressInformation | null;
    searchResults: IExpectedResponse | null;
}

export default class Map extends React.Component<{}, ComponentState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            checkAddress: null,
            targetAddress: null,
            searchResults: null,
        };
        this.handleOnSearchResultsReceived = this.handleOnSearchResultsReceived.bind(this);
    }

    handleOnSearchResultsReceived(
        checkAddress: ISelectedAddressInformation,
        targetAddress: ISelectedAddressInformation,
        searchResultsPromise: Promise<IExpectedResponse>,
    ) {
        searchResultsPromise.then((searchResults: IExpectedResponse) => this.setState(() => ({
            checkAddress,
            targetAddress,
            searchResults,
        })));
    }

    render() {
        const { checkAddress, targetAddress, searchResults } = this.state;

        return (
            <div className="map-container">
                <SearchForm onSearchResultsReceived={this.handleOnSearchResultsReceived}/>
                <SearchResults dataToDisplay={searchResults ? searchResults.results : null}/>
                <KYNMap
                    checkAddress={checkAddress}
                    targetAddress={targetAddress}
                    drawable={searchResults ? searchResults.drawable : null}
                />
            </div>
        );
    }
}
