import React from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { useContext} from 'react';



const NavBlock = () => {
    const { logout } = useContext(AuthContext);
    return (
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
                <a className="navbar-brand" href="/">Hexlet Chat</a>
                <button type="button" className="btn btn-primary" onClick={() => logout()}>Выйти</button>
            </div>
        </nav>
    )
};

export default NavBlock;