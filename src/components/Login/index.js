import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../../config/firebase';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(getAuth(), email, password);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(getAuth(), email, password);
        } catch (error) {
            console.error(error);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(getAuth(), googleProvider);
        } catch (error) {
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
        <div>
            {user ? (
                <div>
                    <p>Welcome, {user.email}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <input type='text' placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type='password' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div className='sign-btn-container'>
                        <button onClick={handleLogin}>Sign In</button>
                        <button onClick={handleSignUp}>Sign Up</button>
                    </div>
                    <button onClick={handleGoogleLogin}>Sign In with Google</button>
                </div>
            )}
            <Link to="/"><button>Back to Home</button></Link>
        </div>
    );
};

export default Login;
