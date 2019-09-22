import * as React from 'react';

interface ComponentProps {
    dataToDisplay: {};
}

export default (props: ComponentProps) => (
    <div id="search-results">{JSON.stringify(props)}</div>
);
