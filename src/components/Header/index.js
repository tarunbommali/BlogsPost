import React from 'react';
import './index.css';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const isWriteBlogPage = location.pathname === '/write-blog';

    return (
        <div className='header'>
            <h1>Quick Reads</h1>
            <div>
                {isWriteBlogPage ? (
                    <Link className='nav-link' to="/" >Read Articles</Link>
                ) : (
                    <Link className='nav-link' to='/write-blog' >Write Blog</Link>
                )}
            </div>
        </div>
    );
}

export default Header;
