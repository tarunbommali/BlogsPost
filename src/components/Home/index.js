import React from 'react';
import BlogItem from '../BlogItem';
import './index.css'
import { useBlogContext } from '../../context/BlogContext';


const Home = () => {
    const { blogList } = useBlogContext();
    return (
        <div className="home-container">
            <ul className="blog-list">
                <h1 className='bloglist-view-title'>#ShortQuickReads</h1>
                {
                    blogList.map(blog => (
                        <BlogItem blogDetails={blog} key={blog.id} />
                    ))
                }
            </ul>
        </div>
    );
};

export default Home;
