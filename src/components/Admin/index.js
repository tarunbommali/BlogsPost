import React, { useState, useEffect } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useBlogContext } from '../../context/BlogContext';

import './index.css';

const Admin = () => {
    const [newBlogTitle, setNewBlogTitle] = useState('');
    const [newBlogContent, setNewBlogContent] = useState('');
    const [newPublishedDate, setPublishedDate] = useState('');
    const { blogList, setBlogList } = useBlogContext();

    useEffect(() => {
        const fetchBlogList = async () => {
            try {
                const data = await getDocs(collection(db, 'Blogs'));
                const filteredData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setBlogList(filteredData);
            } catch (error) {
                console.error('Error fetching blog list:', error);
            }
        };

        fetchBlogList();
    }, [setBlogList]);

    const addNewBlog = async () => {
        try {
            const newBlog = {
                title: newBlogTitle,
                content: newBlogContent,
                publishedDate: newPublishedDate
            };

            const docRef = await addDoc(collection(db, "Blogs"), newBlog);

            setNewBlogTitle('');
            setNewBlogContent('');
            setPublishedDate('');

            setBlogList(prevList => [...prevList, { id: docRef.id, ...newBlog }]);
        } catch (error) {
            console.error('Error adding new blog:', error);
        }
    };

    const deleteBlog = async (id) => {
        try {
            await deleteDoc(doc(db, 'Blogs', id));
            setBlogList(prevList => prevList.filter(blog => blog.id !== id));
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    return (
        <div className='admin-dashboard'>
            <form className='post-container' onSubmit={(e) => {
                e.preventDefault();
                addNewBlog();
            }}>
                <h2>Add New Blog Post</h2>
                <div className='input-container'>
                    <label htmlFor='title' className='label-text'>Title</label>
                    <input type='text' className='label-input' value={newBlogTitle} onChange={(e) => setNewBlogTitle(e.target.value)} placeholder='Enter blog title here...' />
                </div>
                <div className='input-container'>
                    <label htmlFor='content' className='label-text'>Content</label>
                    <textarea value={newBlogContent} className='label-input content-input' onChange={(e) => setNewBlogContent(e.target.value)} placeholder='Enter the blog content here...' />
                </div>
                <div className='input-container'>
                    <label htmlFor='links' className='label-text'>Published Date</label>
                    <input type='date' className='label-input' value={newPublishedDate} onChange={(e) => setPublishedDate(e.target.value)} />
                </div>
                <div>
                    <button type="submit" className='add-button'>Add Blog</button>
                </div>
            </form>

            <ul className='bloglist-container'>
                {blogList.map((blog) => (
                    <li className='blogitem' key={blog.id}>
                        <div className='title-container'>
                            <h1>{blog.title}</h1>
                            <div className='btn-container'>
                                <button className='edit-btn' type='button'><FaEdit size={28} /></button>
                                <button onClick={() => deleteBlog(blog.id)} type='button' className='del-btn'><FaTrash size={28} /></button>
                            </div>
                        </div>
                        <span className='published-on'>Published on: {blog.publishedDate}</span>
                        <p>{blog.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Admin;
