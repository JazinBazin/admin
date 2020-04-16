import React from 'react';
import Card from '@material-ui/core/Card';;
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    card: {
        background: 'url("static/dashboard.png") no-repeat center',
        backgroundSize: 'cover',
        height: "55em"
    },
    header: {
        textAlign: "center"
    },
});

export default () => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardHeader className={classes.header} title='Система хранения результатов научных трудов Военного инновационного технополиса "ЭРА"' />
        </Card>
    );
}