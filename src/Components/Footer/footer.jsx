import React from 'react'
import './footer.css'
import logo from '../../assets/5.png'

const footer = () => {
  return (
    <>
      <div className='footers'>
        <img src={logo} alt="logo" />
        <div className='paragh'>
          <p className='bg-black-700'> &copy; 2024 ESCURATOR</p>
          <p> Terms and conditon </p>
        </div>
      </div>
      
    </>
  )
}

export default footer