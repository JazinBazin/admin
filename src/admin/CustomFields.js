import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    headline: {
        fontSize: '1.2em',
        display: "inline-block",
        minWidth: '12rem',
    },
    rota: {
        minWidth: '3em'
    }
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
    if (description && description.length > maxchars)
        description = description.slice(0, maxchars) + "…";
    return <span>{description}</span>
}

export const RotaField = ({ source, record = {} }) => {
    const classes = useStyles();
    if (record[source])
        return <div className={classes.rota}>{record[source]} НР</div>
    else return null;
}