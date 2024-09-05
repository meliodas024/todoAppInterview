import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('authToken');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">To Do App</Link>
        <div>
          {isLoggedIn ? (
            <>
              {location.pathname === '/login' ? (
                <Link to="/register" className="mr-4 hover:underline">Registrarse</Link>
              ) : location.pathname === '/register' ? (
                <Link to="/login" className="mr-4 hover:underline">Iniciar sesión</Link>
              ) : (
                <>
                  <Link to="/tasks" className="mr-4 hover:underline">Tareas</Link>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
                  >
                    Logout
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              {location.pathname === '/login' ? (
                <Link to="/register" className="mr-4 hover:underline">Registrarse</Link>
              ) : location.pathname === '/register' ? (
                <Link to="/login" className="mr-4 hover:underline">Iniciar sesión</Link>
              ) : (
                <>
                  <Link to="/login" className="mr-4 hover:underline">Iniciar sesión</Link>
                  <Link to="/register" className="mr-4 hover:underline">Registrarse</Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
