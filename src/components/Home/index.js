import React from 'react';
import BlogItem from '../BlogItem';
import './index.css'

const Home = () => {
    return (
        <div className="home-container">
            <ul className="blog-list">
                <BlogItem />
            </ul>
        </div>
    );
};

export default Home;
