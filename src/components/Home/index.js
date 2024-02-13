import React from 'react';
import BlogItem from '../BlogItem';
import './index.css'
import { useBlogContext } from '../../context/BlogContext';


const Home = () => {
    const { blogList } = useBlogContext();
    return (
        <div className="home-container">
            <ul className="blog-list">
                {
                    blogList.map((blog, index) => (
                        <BlogItem blogDetails={blog} id={index} />
                    ))
                }
            </ul>
        </div>
    );
};

export default Home;
