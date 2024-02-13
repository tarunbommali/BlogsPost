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

        fetchBlogList();
    }, []);

    return (
        <BlogContext.Provider value={{ blogList }}>
            {children}
        </BlogContext.Provider>
    );
};
