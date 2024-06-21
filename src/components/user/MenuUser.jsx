import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AuthContext } from '../../context/AuthContext';
import Options from './Options';

const MenuUser = () => {
    const navigate = useNavigate();
    const { user, dispatch } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const logout = () => {
        console.log(`logout`);
        Cookies.remove('accessToken', { path: '/' });
        console.log(`cookies removed ${Cookies.get('accessToken')}`);
        dispatch({ type: 'LOGOUT' });
        navigate('/');
    };

    const handleSetting = () => {
        navigate('/setting');
        closeMenu();
    };

    const handleWish = () => {
        navigate('/ordenes');
        closeMenu();
    };

    return (
        <div className="relative">
            <div
                className="h-10 w-10 hover:ring-4 user cursor-pointer rounded-full bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')]"
                onClick={toggleMenu}
            ></div>

            {isMenuOpen && (
                <Options/>
            )}
        </div>
    );
};

export default MenuUser;
