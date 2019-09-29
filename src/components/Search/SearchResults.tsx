import * as React from 'react';
import IResultGroup from '../../DataTypes/IResultGroup';
import IGroupProperties from '../../DataTypes/IGroupProperties';

interface ComponentProps {
    dataToDisplay: IResultGroup[] | null;
}

const drawGroupProperties = (groupProperties: IGroupProperties) => {
    return (
        <ul>
            {Object.keys(groupProperties)
                .map((property: string) => {
                    return (<li key={property}>{groupProperties[property]}</li>);
                })}
        </ul>
    );
};

const drawGroup = (group: IResultGroup) => {
    const groupName = Object.keys(group)[0];
    const groupProperties = group[groupName];

    return (
        <div className="search-results-group">
            <h1>{groupName}</h1>
            {drawGroupProperties(groupProperties)}
        </div>
    );
};

export default (props: ComponentProps) => {
    const { dataToDisplay } = props;

    if (!dataToDisplay || Object.keys(dataToDisplay).length === 0) {
        return null;
    }

    const groups = dataToDisplay.map((group: IResultGroup) => drawGroup(group));

    return (
        <div id="search-results">
            {groups}
        </div>
    );
};
