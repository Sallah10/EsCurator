import React from 'react'
import logo from '../../assets/5.png'
import search from '../../assets/Union.png'
import './nav.css'


const nav = ({onSearchChange}) => {
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
          {/* <a href="">Login</a>  //for user authentication
          <a href="">SignUp</a> */}
          <div className="search-container">
                <input
                    type="text"
                    placeholder="Search artworks..."
                    onChange={onSearchChange}
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