import React from 'react';
import './index.css';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const isWriteBlogPage = location.pathname === '/write-blog' || location.pathname === '/login';

    return (
        <div className='header'>

            <Link to="/" className='nav-link'>
                <h1 className='blogs-title'> Quick Reads</h1>
            </Link>
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
