// import { useState } from 'react'
import Nav from './Components/Nav/nav'
import MainBody from './Components/mainBody/mainBody'
import About from './Components/About/about'
import Footer from './Components/Footer/footer'
import ArtistProfile from './Components/ArtistProfile/ArtistProfile'
import './App.css'

function App() {

  return (
    <>
      <Nav />
      <MainBody/>
      <About/>
      <Footer/>
      {/* <ArtistProfile/> */}
    </>
  )
}

export default App
