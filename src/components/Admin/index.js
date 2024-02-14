import React, { useState, useEffect } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'; // Import updateDoc for Firestore update
import { db } from '../../config/firebase';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useBlogContext } from '../../context/BlogContext';
import './index.css';

const Admin = () => {
    const [newBlogTitle, setNewBlogTitle] = useState('');
    const [newBlogContent, setNewBlogContent] = useState('');
    const [editMode, setEditMode] = useState(false); // State to track edit mode
    const [editBlogId, setEditBlogId] = useState(''); // State to store the ID of the blog being edited
    const { blogList, setBlogList } = useBlogContext();

    useEffect(() => {
        const fetchBlogList = async () => {
            try {
                const data = await getDocs(collection(db, 'Blogs'));
                const filteredData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setBlogList(filteredData);
            } catch (error) {
                console.error('Error fetching blog list:', error);
            }
        };
        fetchBlogList();
    }, [setBlogList]);

    const addNewBlog = async () => {
        try {
            const trimmedTitle = newBlogTitle.trim();
            if (!trimmedTitle) {
                throw new Error("Warning! Your blog is feeling lonely without a title. Let's give it some love! ❤️");
            }

            if (!newBlogContent || newBlogContent.trim().split(" ").length < 50) {
                throw new Error("Oops! Looks like you forgot to spice up your blog with some content. Let's add some flavor! 🌶️");
            }
            const genrateCurrentDateAndTime = new Date();
            const newBlog = {
                title: newBlogTitle,
                content: newBlogContent,
                publishedDate: genrateCurrentDateAndTime.toLocaleString()
            };

            if (editMode) { // Update existing blog if in edit mode
                await updateDoc(doc(db, 'Blogs', editBlogId), newBlog);
                setEditMode(false); // Exit edit mode after saving changes
            } else { // Add new blog if not in edit mode
                const docRef = await addDoc(collection(db, "Blogs"), newBlog);
                setBlogList(prevList => [...prevList, { id: docRef.id, ...newBlog }]);
            }

            setNewBlogTitle('');
            setNewBlogContent('');
        } catch (error) {
            console.error('Error adding/editing blog:', error.message);
            alert(error.message);
        }
    };

    const editBlog = (id) => {
        const blogToEdit = blogList.find(blog => blog.id === id);
        if (blogToEdit) {
            setNewBlogTitle(blogToEdit.title);
            setNewBlogContent(blogToEdit.content);
            setEditMode(true);
            setEditBlogId(id);
        }
    };

    const cancelEdit = () => {
        setNewBlogTitle('');
        setNewBlogContent('');
        setEditMode(false);
        setEditBlogId('');
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
            <div className='form-page'>
                <form className='post-container' onSubmit={e => {
                    e.preventDefault();
                    addNewBlog();
                }}>
                    <h2>{editMode ? 'Edit Blog Post' : 'Add New Blog Post'}</h2> {/* Display appropriate heading based on edit mode */}
                    <div className='input-container'>
                        <label htmlFor='title' className='label-text'>Title</label>
                        <input type='text' className='input-field' value={newBlogTitle} onChange={e => setNewBlogTitle(e.target.value)} placeholder='Enter blog title...' />
                    </div>
                    <div className='input-container'>
                        <label htmlFor='content' className='label-text'>Content</label>
                        <textarea value={newBlogContent} className='input-field content-field' onChange={e => setNewBlogContent(e.target.value)} placeholder='Enter content with minimum 50 words to unleash your creativity...' />
                    </div>
                    <div>
                        <button type="submit" className='action-button'>{editMode ? 'Save Changes' : 'Add Blog'}</button> {/* Display appropriate button text based on edit mode */}
                        {editMode && <button type="button" className='action-button' onClick={cancelEdit}>Cancel</button>} {/* Display cancel button in edit mode */}
                    </div>
                </form>
            </div>

            <ul className='bloglist-container'>
                {blogList.length !== 0 && <h1 className='previous-blog-title'>#ThrowbackQuickReads</h1>}
                {blogList.map(blog => (
                    <li className='admin-blogitem' key={blog.id}>
                        <div className='title-container'>
                            <div className='title-date-container'>
                                <h1 className='admin-blog-title'>{blog.title}</h1>
                                <span className='admin-blog-posted-date'>Published on: {blog.publishedDate}</span>
                            </div>
                            <div className='admin-title-buttons-container'>
                                <button className='edit-btn' type='button' onClick={() => editBlog(blog.id)}>
                                    <FaEdit className='icon' />
                                </button>
                                <button onClick={() => deleteBlog(blog.id)} type='button' className='del-btn'>
                                    <FaTrash className='icon' />
                                </button>
                            </div>
                        </div>
                        <hr className='hr' /> <p className='blog-content'>{blog.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Admin;
