import React, { useState } from "react";
import Logout from '../components/Logout';

const Header = (props) => {
    return (
        <div className="header">
            <h2>e1RM</h2>
            <button className="headerBtn">Account</button>
            <Logout />
        </div>
    );
}

export default Header;