import React, { useEffect, useState } from 'react'
import instance from '../services/axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
        navigate('/tasks');
        }
    }, [navigate]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await instance.post('/login', { email, password });
            localStorage.setItem('authToken', response.data.token);
            toast.success('Inicio de sesión exitoso!');
            window.location.href = '/tasks';
        } catch (err) {
            if (err.response && err.response.data && err.response.data.detail) {
                toast.error('Error de autenticación: ' + err.response.data.detail);
            } else if (err.response && err.response.data) {
                toast.error('Error de autenticación: Credenciales Incorrectas');
            } else {
                toast.error('Error de autenticación: No se pudo conectar al servidor.');
            }
        }
    };


    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-4 mx-auto md:h-screen lg:py-0">
                <a className="flex items-center mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
                    To Do App!
                </a>
                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Iniciar Sesión
                        </h1>
                        <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo Electronico</label>
                                <input autoComplete='off' type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <button type="submit" class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Iniciar Sesión</button>
                            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                No tiene una cuenta aún? <a href="/register" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Registrese</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
