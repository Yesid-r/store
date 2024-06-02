import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { API_URL } from '../utils/constants';

const ProfileUser = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [updatedUser, setUpdatedUser] = useState({ ...user });
  const [alert, setAlert] = useState({ message: '', success: false });
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/users/${user._id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.status) {
          setUserData(data.dataUser);
        } else {
          throw new Error(data.message || 'Error al obtener datos');
        }
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user._id]);

  const handleUpdate = () => {

    fetch(`${API_URL}/users/${user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          
          updateUser(data.userUpdated);
          setAlert({ message: 'Datos actualizados correctamente', success: true });
        } else {
          setAlert({ message: 'Error al actualizar datos', success: false });
        }
      })
      .catch((error) => {
        setAlert({ message: 'Error de red', success: false });
        console.error('Error al actualizar datos:', error);
      });
    if (isLoading) {
      return <div>Cargando...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }
  };


  return (
    <div className=" bg-white p-3 shadow-sm rounded-sm">
      <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
        <span className="text-green-500">
          <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </span>
        <span className="tracking-wide">About</span>
      </div>
      <div className="text-gray-700">
        {
          userData && (<div className="grid md:grid-cols-2 text-sm">
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">First Name</div>
              <div className="px-4 py-2">{userData.name}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Last Name</div>
              <div className="px-4 py-2">{userData.lastname}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Email</div>
              <div className="px-4 py-2">
                <a className="text-blue-800" href={`mailto:${userData.email}`}>{userData.email}</a>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Phone</div>
              <div className="px-4 py-2">{userData.phone}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Role</div>
              <div className="px-4 py-2">{userData.role}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Created At</div>
              <div className="px-4 py-2">{userData.createdAt}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Updated At</div>
              <div className="px-4 py-2">{userData.updatedAt}</div>
            </div>
          </div>)
        }

      </div>
      <button
        className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
        onClick={handleUpdate}
      >
        Update Information
      </button>
      {alert.message && (
        <div
          className={`${alert.success ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
            } border-t-4 border rounded-b text-teal-900 px-4 py-3 shadow-md absolute top-0 mt-16 right-0`}
          role="alert"
        >
          <div className="flex">
            <div>
              <p className="text-sm">{alert.message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileUser;
