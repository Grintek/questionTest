import React from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import {blue} from "@material-ui/core/colors";
import './_navigator.scss';

export default function Navigation() {
    const sty = {background: blue[100], paddingTop: 10, paddingBottom: 10};
    return(
        <div>
        <Toolbar style={sty}>
            <Button href="/home" className="navButton" color="default" style={{backgroundColor: blue[800], marginRight: 3}}>Home</Button>
            <Button href="/manager" className="navButton" color="default" style={{backgroundColor: blue[800], marginRight: 3}}>Manage List</Button>
            <Button href="/test" className="navButton" color="default" style={{backgroundColor: blue[800], marginRight: 3}}>Perform Test</Button>
        </Toolbar>
        </div>

    );
}