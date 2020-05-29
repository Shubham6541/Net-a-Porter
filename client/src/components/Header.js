import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const Header = () => {
    return (
        <div>
            <AppBar>
                <Toolbar style={{backgroundColor: '#696969'}}>
                    <Typography variant="h4">Net-a-Porter</Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
