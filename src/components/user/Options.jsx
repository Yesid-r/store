import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Cookies from 'js-cookie';

const Options = () => {
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
        navigate(`/setting/${user._id}`);
        closeMenu();
    };

    const handleOrders = () => {
        navigate('/ordenes');
    }

        return (
            <div className="drop-down w-48 overflow-hidden bg-white rounded-md shadow absolute top-12 right-3">
                <ul>
                    <li
                        onClick={handleSetting}
                        className="px-3 py-3 text-sm font-medium flex items-center space-x-2 hover:bg-slate-400"
                    >
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </span>
                        <span>Ajustes</span>
                    </li>
                    <li
                        onClick={handleOrders}
                        className="px-3 py-3 text-sm font-medium flex items-center space-x-2 hover:bg-slate-400"
                    >
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </span>
                        <span>Ordenes</span>
                    </li>
                    <li className="px-3 py-3 text-sm font-medium flex items-center space-x-2 hover:bg-slate-400">
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </span>
                        <span onClick={logout}>Cerrar sesion</span>
                    </li>
                </ul>
            </div>
        )
    }

    export default Options