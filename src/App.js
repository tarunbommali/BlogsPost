import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Admin from './components/Admin';
import Login from './components/Login';
import { BlogContextProvider } from './context/BlogContext'; // Import BlogContextProvider

function App() {
  return (
    <Router>
      <BlogContextProvider> {/* Use BlogContextProvider */}
        <Header />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/write-blog" element={<Admin />} />
        </Routes>
      </BlogContextProvider>
    </Router>
  );
}

export default App;
