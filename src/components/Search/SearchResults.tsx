import * as React from 'react';

interface ComponentProps {
    dataToDisplay: {};
}

export default (props: ComponentProps) => {
    const { dataToDisplay } = props;
    if (Object.keys(dataToDisplay).length === 0) {
        return null;
    }

    return (<div id="search-results">{JSON.stringify(props)}</div>);
};
