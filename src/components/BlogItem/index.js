import React from 'react';
import { useBlogContext } from '../../context/BlogContext';
import './index.css'

const BlogItem = () => {
    const { blogList } = useBlogContext();
    console.log(blogList, "BlogItem")
    return (
        <ul className='user-bloglist-container bloglist-container'>
            {blogList.map((blog) => (
                <li className='blogitem' key={blog.id}>
                    <div className='title-container'>
                        <h1>{blog.title}</h1>
                    </div>
                    <span className='published-on'>Published on: {blog.publishedDate}</span>
                    <p>{blog.content}</p>
                </li>
            ))}
        </ul>
    );
};

export default BlogItem;
