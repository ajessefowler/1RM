import React, { useState } from "react";
import Logout from '../components/Logout';

const Header = (props) => {
    return (
        <div className="header">
            <Logout />
            <h2>e1RM</h2>
            <button className="headerBtn">Account</button>
        </div>
    );
}

export default Header;