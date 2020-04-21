import React from 'react';
import Card from '@material-ui/core/Card';;
import { Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    card: {
        background: 'url("static/dashboard.png") no-repeat center',
        backgroundSize: 'cover',
        height: "55em"
    },
    header: {
        textAlign: "center",
        marginTop: "1em",
        fontSize: "1.8em",
        fontFamily: "ProximaNova"
    },
});

export default () => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <Typography variant="h5" component="h5" className={classes.header}>
                Система хранения результатов научных трудов Военного инновационного технополиса "ЭРА"
            </Typography>
        </Card>
    );
}