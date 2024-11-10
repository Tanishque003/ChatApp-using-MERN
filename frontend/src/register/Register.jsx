import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const navigate = useNavigate();
    const { setAuthUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [inputData, setInputData] = useState({
        fullname: '',
        username: '',
        email: '',
        password: '',
        confpassword: '',
        gender: ''
    });

    const handleInput = (e) => {
        setInputData({
            ...inputData,
            [e.target.id]: e.target.value
        });
    };

    const selectGender = (selectedGender) => {
        setInputData((prev) => ({
            ...prev,
            gender: selectedGender === inputData.gender ? '' : selectedGender
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (inputData.password !== inputData.confpassword) {
            setLoading(false);
            return toast.error("Passwords don't match");
        }

        try {
            const response = await axios.post(`/api/auth/register`, inputData);
            const data = response.data;

            if (!data.success) {
                setLoading(false);
                toast.error(data.message);
                return;
            }

            toast.success(data.message);
            localStorage.setItem('chatapp', JSON.stringify(data));
            setAuthUser(data);
            setLoading(false);
            navigate('/login');
        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className='flex flex-col items-center justify-center w-full min-h-screen bg-gray-100'>
            <div className='w-full max-w-md p-8 rounded-lg shadow-lg bg-white'>
                {/* Page description */}
                <h1 className='text-4xl font-bold text-center text-blue-600 mb-4'>Register for Chats</h1>
                <p className='text-center text-gray-600 mb-6'>
                    Join our chat community and connect with friends, family, and new people instantly. 
                    Experience secure and real-time messaging on our easy-to-use platform!
                </p>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label htmlFor='fullname' className='block text-gray-700 font-semibold mb-1'>Full Name</label>
                        <input
                            id='fullname'
                            type='text'
                            value={inputData.fullname}
                            onChange={handleInput}
                            placeholder='Enter your full name'
                            required
                            className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
                        />
                    </div>
                    <div>
                        <label htmlFor='username' className='block text-gray-700 font-semibold mb-1'>Username</label>
                        <input
                            id='username'
                            type='text'
                            value={inputData.username}
                            onChange={handleInput}
                            placeholder='Choose a username'
                            required
                            className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
                        />
                    </div>
                    <div>
                        <label htmlFor='email' className='block text-gray-700 font-semibold mb-1'>Email</label>
                        <input
                            id='email'
                            type='email'
                            value={inputData.email}
                            onChange={handleInput}
                            placeholder='Enter your email address'
                            required
                            className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
                        />
                    </div>
                    <div>
                        <label htmlFor='password' className='block text-gray-700 font-semibold mb-1'>Password</label>
                        <input
                            id='password'
                            type='password'
                            value={inputData.password}
                            onChange={handleInput}
                            placeholder='Enter a secure password'
                            required
                            className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
                        />
                    </div>
                    <div>
                        <label htmlFor='confpassword' className='block text-gray-700 font-semibold mb-1'>Confirm Password</label>
                        <input
                            id='confpassword'
                            type='password'
                            value={inputData.confpassword}
                            onChange={handleInput}
                            placeholder='Confirm your password'
                            required
                            className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
                        />
                    </div>
                    <div className='flex gap-4 mt-2'>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                value="male"
                                checked={inputData.gender === 'male'}
                                onChange={() => selectGender('male')}
                                className="form-radio"
                            />
                            <span className="ml-2 text-gray-700">Male</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                value="female"
                                checked={inputData.gender === 'female'}
                                onChange={() => selectGender('female')}
                                className="form-radio"
                            />
                            <span className="ml-2 text-gray-700">Female</span>
                        </label>
                    </div>
                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full py-2 mt-6 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-150'>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
                <p className='text-center text-gray-600 mt-4'>
                    Already have an account?{" "}
                    <Link to='/login' className='text-blue-600 hover:underline'>Login here</Link>.
                </p>
            </div>
        </div>
    );
};

export default Register;
