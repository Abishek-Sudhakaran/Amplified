import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { BrowserRouter as Router, Link } from "react-router-dom";
import AdbIcon from '@material-ui/icons/Adb';
import { appBarStyles } from './Styles'


export default function Layout(props) {
    const classes = appBarStyles();

    return (
        <Router>
            <AppBar
                position="sticky"
                classes={{ root: classes.root }}
            >
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/employees" className={classes.link} >
                            Employees
                         </Link>
                    </Typography>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <AdbIcon fontSize={'large'} />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {props.children}
        </Router>
    );
}

