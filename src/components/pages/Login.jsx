import React, { useContext, useState } from 'react'
import { API_URL } from '../utils/constants';
import { AuthContext } from '../../context/AuthContext';
import Cookies from 'js-cookie';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState(null);
    const [data, setData] = useState({});
    const { dispatch } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            console.log(data);
            setData(data);
            setAlert(data.message);
            

            setTimeout(() => {
                setAlert(null);
            }, 3000);
            if (data.success) {
                Cookies.set('accessToken', data.token, { expires: 1, path: '/' });

                dispatch({type: 'LOGIN_SUCCESS', payload: data.data})
                window.location.href = "/";
            }
        } catch (error) {
            setAlert(error.message);
            setTimeout(() => {
                setAlert(null);
            }, 3000);
        }
    };

    return (
        <div className="bg-white flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="flex justify-center h-screen ">


                <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6 rounded-lg shadow-md border border-gray-300">
                    <div className="flex-1">
                        <div className="text-center">
                            <h2 className="text-4xl font-bold text-center text-gray-700 ">UPTC STORE</h2>
                            <p className="mt-3 text-gray-500" >Sigin</p>
                        </div>
                        {alert && (
                            <div
                                className={`${data.success
                                        ? "bg-green-100 border-t border-b border-green-500 text-green-700"
                                        : "bg-red-100 border-t border-b border-red-500 text-red-700"
                                    } px-4 py-3`}
                                role="alert"
                            >
                                <p className="font-bold">{data.success ? "Success" : "Error"}</p>
                                <p className="text-sm">{alert}</p>
                            </div>
                        )}
                        <div className="mt-8 ">
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm text-gray-600 ">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="example@example.com"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md   focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label htmlFor="password" className="text-sm text-gray-600 ">Contraseña</label>
                                    </div>

                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Your Password"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div className="mt-6">
                                    <button
                                        className="w-full  items-center justify-center   px-8 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500 flex"
                                        type="submit"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </form>

                            <p className="mt-6 text-sm text-center text-gray-400">no tienes una cuenta? <a href="/register" className="text-blue-500 focus:outline-none focus:underline hover:underline">Sign Up</a>.</p>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="border-b w-1/5 lg:w-1/4"></span>
                                <a href="#" className="text-xs text-center text-gray-500 first-letter:uppercase">or </a>
                                <span className="border-b w-1/5 lg:w-1/4"></span>
                            </div>
                            <a href="#" className="flex items-center justify-center mt-4 bg-gray-50 text-white rounded-lg shadow-md hover:bg-gray-200">
                                <div className="px-4 py-3">
                                    <svg className="h-6 w-6" viewBox="0 0 40 40">
                                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                                        <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                                        <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                                    </svg>
                                </div>
                                <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">Sign in with Google</h1>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login