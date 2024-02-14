import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { FaGoogle } from 'react-icons/fa';

import './index.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const handleLogin = async () => {
        try {
            setError(null); // Reset error state
            await signInWithEmailAndPassword(getAuth(), email, password);
        } catch (error) {
            setError(error.message); // Set error message from Firebase
            console.error(error);
        }
    };

    const handleSignUp = async () => {
        try {
            setError(null); // Reset error state
            await createUserWithEmailAndPassword(getAuth(), email, password);
        } catch (error) {
            setError(error.message); // Set error message from Firebase
            console.error(error);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setError(null); // Reset error state
            const provider = new GoogleAuthProvider();
            await signInWithPopup(getAuth(), provider);
        } catch (error) {
            setError(error.message); // Set error message from Firebase
            console.error(error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='login-container'>
            {user ? (
                <div>
                    <p>Welcome, {user.email}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div className='form-container'>
                    <h1 className='form-header'>Get Started</h1>
                    <div className='input-field-container'>
                        <label htmlFor='email' className='label-text'>Email</label>
                        <input type='text' id='email' className='label-input' placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='input-field-container'>
                        <label htmlFor='password' className='label-text'>Password</label>
                        <input type='password' id='password' className='label-input' placeholder="Password..." value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    {error && <p className='err-msg'>{error}</p>}

                    <div className='sign-btn-container'>
                        <button className='btn sign' onClick={handleLogin}>Sign In</button>
                        <button className='btn sign' onClick={handleSignUp}>Sign Up</button>
                    </div>
                </div>
            )}
            <button className='google-button' onClick={handleGoogleLogin}>
                <div className='google-sign-btn-container'>
                    <FaGoogle className='google-icon' />
                    Continue with Google
                </div>
            </button>
        </div>
    );
};

export default Login;
