import React, { useState, useEffect } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useBlogContext } from '../../context/BlogContext'; // Import the BlogContext
import './index.css';

const Admin = () => {
    const [newBlogTitle, setNewBlogTitle] = useState('');
    const [newBlogContent, setNewBlogContent] = useState('');
    const { blogList, setBlogList } = useBlogContext(); // Use the useBlogContext hook

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
            // Check if content is empty or doesn't have at least 500 words
            if (!newBlogContent || newBlogContent.trim().split(/\s+/).length < 200) {
                throw new Error('Blog content must have at least 200 words.');
            }



            const genrateCurrentDateAndTime = new Date();
            const newBlog = {
                title: newBlogTitle,
                content: newBlogContent,
                publishedDate: genrateCurrentDateAndTime.toLocaleString()
            };

            const docRef = await addDoc(collection(db, "Blogs"), newBlog);

            setNewBlogTitle('');
            setNewBlogContent('');

            setBlogList(prevList => [...prevList, { id: docRef.id, ...newBlog }]);
        } catch (error) {
            console.error('Error adding new blog:', error.message);
            // Display error message
            alert(error.message);
        }
    };

    const deleteBlog = async (id) => {
        try {
            await deleteDoc(doc(db, 'Blogs', id));
            // Update local state by removing the deleted blog item
            setBlogList(prevList => prevList.filter(blog => blog.id !== id));
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    return (
        <div className='admin-dashboard'>
            <div className='form-page'>
                <form className='post-container' onSubmit={(e) => {
                    e.preventDefault(); // Prevent default form submission
                    addNewBlog(); // Call the addNewBlog function on form submission
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

                    <div>
                        <button type="submit" className='add-button'>Add Blog</button>
                    </div>
                </form>
            </div>

            <ul className='bloglist-container'>
                <h1 className='previous-blog-title'>
                    #ThrowbackQuickReads
                </h1>

                {blogList.map((blog) => (
                    <li className='blogitem' key={blog.id}>
                        <div className='title-container'>
                            <h1 className='throwback-blogitem-item-title'>{blog.title}</h1>
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
