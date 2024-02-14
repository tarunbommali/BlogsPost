import React from 'react';
import BlogItem from '../BlogItem';
import './index.css'
import { useBlogContext } from '../../context/BlogContext';
import { Link } from 'react-router-dom';

const Home = () => {
    const { blogList } = useBlogContext();

    return (
        <div className="home-container">
            <ul className="blog-list">
                <h1 className='bloglist-view-title'>#ShortQuickReads</h1>
                {
                    blogList.length > 0 ? (
                        blogList.map(blog => (
                            <BlogItem blogDetails={blog} key={blog.id} />
                        ))
                    ) : (
                        <p className='empty-list-mgs'>No ShortQuickReads
                            <Link to='/write-blog' className="nav-link"><span className='empty-list-span'> Yet, But You Can Be the First to Share Your Story!</span></Link></p>
                    )
                }
            </ul>
        </div>
    );
};

export default Home;
