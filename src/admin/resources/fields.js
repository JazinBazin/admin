import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    headline: {
        fontSize: '1.2em',
        display: "inline-block",
        minWidth: '15rem',
    },
});

export const HeadlineField = ({ source, record = {} }) => {
    const classes = useStyles();
    return (
        <div className={classes.headline}>
            {record[source]}
        </div>
    );
}

export const DescriptionField = ({ source, maxchars = 300, record = {} }) => {
    let description = record[source];
    if (description.length > maxchars)
        description = description.slice(0, maxchars) + "…";
    return <span>{description}</span>
}

export const AuthorField = ({ record = {} }) => (
    <span>{record.lastName} {record.firstName} {record.middleName}</span>
);