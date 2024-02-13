import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';

const BlogContext = createContext();

export const useBlogContext = () => useContext(BlogContext);

export const BlogContextProvider = ({ children }) => {
    const [blogList, setBlogList] = useState([]);

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

        fetchBlogList().catch(error => console.error('Error in fetchBlogList:', error));
    }, []);

    const addNewBlog = async (newBlogData) => {
        try {
            // Add new blog to Firestore
            // Wait for Firestore operation to complete
            // Assuming newBlogData is an object containing blog data
            // Update local state with the new blog item
            setBlogList(prevList => [...prevList, newBlogData]);
        } catch (error) {
            console.error('Error adding new blog:', error);
        }
    };

    return (
        <BlogContext.Provider value={{ blogList, setBlogList, addNewBlog }}>
            {children}
        </BlogContext.Provider>
    );
};
