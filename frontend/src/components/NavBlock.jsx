import React from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { useContext} from 'react';
import { useTranslation } from 'react-i18next';

const NavBlock = () => {
    const { t } = useTranslation();
    const { logout } = useContext(AuthContext);
    return (
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
                <a className="navbar-brand" href="/">{t('chat')}</a>
                <button type="button" className="btn btn-primary" onClick={() => logout()}>{t('buttonExit')}</button>
            </div>
        </nav>
    )
};

export default NavBlock;