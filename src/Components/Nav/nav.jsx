// eslint-disable-next-line no-unused-vars
import React from 'react'
import logo from '../../assets/5.png'
import search from '../../assets/Union.png'
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import './nav.css'

// const nav = ({onSearchChange}) => {
const nav = () => {
  return (
    <>
      <nav >
        <div className='logo'>
          <img src={logo} alt="Logo" />
        </div>
        <div className='navbar'>
          <a href="">Home</a>
          <a href="">Artists</a>
          <a href="">Collections</a>
          {/* <Link to="/artist-profile">Artist Bio</Link> */}
          {/* <a href="">Login</a>  //for user authentication
          <a href="">SignUp</a> */}
          <div className="search-container">
                <input
                    type="text"
                    placeholder="Search artworks..."
                    // onChange={onSearchChange}
                    className="search-input"
                />
                <img src={search} alt="search button" />
            </div>
          
        </div>
      </nav>
    </>
  )
}

export default nav   
// Ensure the `NavBar` component allows navigation to the artist bio page:

// ```jsx
// // src/components/NavBar.js
// import React from 'react';
// import { Link } from 'react-router-dom';

// const NavBar = ({ onSearchChange }) => {
//     return (
//         <nav>
//             <Link to="/">Home</Link>
//             <Link to="/artists/1">Artist Bio</Link> {/* Example link to an artist */}
//             <input 
//                 type="text" 
//                 placeholder="Search artworks..." 
//                 onChange={onSearchChange}
//                 style={{
//                     transition: "all 0.3s ease",
//                     padding: "8px",
//                     borderRadius: "4px",
//                     border: "1px solid #ccc",
//                 }}
//                 onFocus={(e) => e.target.style = {
//                     boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//                     transform: "scale(1.1)",
//                 }}
//                 onBlur={(e) => e.target.style = {
//                     boxShadow: "none",
//                     transform: "scale(1)",
//                 }}
//             />
//         </nav>
//     );
// };

// export default NavBar;

