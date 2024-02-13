import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Admin from './components/Admin';
import Login from './components/Login';
import { BlogContextProvider } from './context/BlogContext';
import { FaArrowCircleUp } from 'react-icons/fa'; // Import the required icon
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBackToTop: false
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if (window.pageYOffset > 0) {
      this.setState({ showBackToTop: true });
    } else {
      this.setState({ showBackToTop: false });
    }
  };

  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  render() {
    const { showBackToTop } = this.state;

    return (
      <Router>
        <BlogContextProvider>
          <div className='app-container'>
            <Header />
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/write-blog' element={<Admin />} />
              <Route exact path='/login' element={<Login />} />
            </Routes>
            {showBackToTop && (
              <button
                className='back-to-top-btn'
                onClick={this.scrollToTop}
              >
                <FaArrowCircleUp size={48} />
              </button>
            )}
            <div className='footer-section'>
              <p className='copyright'>
                Thanks for visiting and happy coding!
              </p>
              <p>Together, let's level up our learning game. <a href='https://www.instagram.com/disistarun/' rel='noreferrer' target='_blank'>instagram</a></p>

            </div>
          </div>
        </BlogContextProvider>
      </Router>
    );
  }
}

export default App;
