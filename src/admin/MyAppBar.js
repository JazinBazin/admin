import React from 'react';
import { AppBar } from 'react-admin';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    homeIcon: {
        color: "white"
    }
});

const MyAppBar = props => {
    const classes = useStyles();
    return (
        <AppBar {...props}>
            <Typography
                variant="h6"
                color="inherit"
                className={classes.title}
                id="react-admin-title"
            />
            <Link to="/home">
                <IconButton className={classes.homeIcon}>
                    <HomeIcon />
                </IconButton>
            </Link>
        </AppBar>
    );
};

export default MyAppBar;