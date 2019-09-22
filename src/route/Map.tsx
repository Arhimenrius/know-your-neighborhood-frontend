import * as React from 'react';
import KYNMap from '../components/KYNMap';
import SearchForm from '../components/Search/SearchForm';
import SearchResults from '../components/Search/SearchResults';

interface MapState {
    searchResults: {};
}

export default class Map extends React.Component<{}, MapState> {
    constructor(props: {}) {
        super(props);
        this.state = { searchResults: {} };
        this.handleOnSearchResultsReceived = this.handleOnSearchResultsReceived.bind(this);
    }

    handleOnSearchResultsReceived(searchResultsPromise: Promise<{}>) {
        searchResultsPromise.then((searchResults: {}) => this.setState(() => ({
            searchResults,
        })));
    }

    render() {
        const { searchResults } = this.state;
        return (
            <div className="map-container">
                <SearchForm onSearchResultsReceived={this.handleOnSearchResultsReceived} />
                <SearchResults dataToDisplay={searchResults} />
                <KYNMap />
            </div>
        );
    }
}
