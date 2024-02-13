import React from 'react';
import './index.css'

const BlogItem = ({ blogDetails }) => {

    const { title, publishedDate, content, id } = blogDetails;
    return (
        <li className='blogitem-view' key={id}>
            <h1 className='blogitem-title'>{title}</h1>
            <span className='published-on'>Published on: {publishedDate}</span>
            <hr className='hr' />
            <p>{content}</p>
        </li>
    )

};

export default BlogItem;
