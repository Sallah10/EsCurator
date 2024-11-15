// import { useState } from 'react'
import Nav from './Components/Nav/nav'
import MainBody from './Components/mainBody/mainBody'
import About from './Components/About/about'
import Footer from './Components/Footer/footer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArtistProfile from './Components/ArtistProfile/ArtistProfile'
import './App.css'

function App() {

  return (
    <>
      <Nav />
      <MainBody/>
      {/* <About/> */}
      <Footer/>
      {/* <Router>
        <div className="App">
          <Nav/>
          <Routes>
            <Route path="/" exact component={<MainBody/>} />
            <Route path="/artist-profile" component={<ArtistProfile/>} /> 
          </Routes>
        </div>
      </Router> */}
      {/* <ArtistProfile/> */}
    </>
  )
}

export default App
// Update `App.js` to include routing for the artist bio page:

//    ```jsx
//    // src/App.js
//    import React from 'react';
//    import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//    import NavBar from './components/NavBar';
//    import ArtistBio from './components/ArtistBio';
//    import Home from './components/Home'; // Assuming you have a Home component

//    const App = () => {
//        return (
//            <Router>
//                <div className="App">
//                    <NavBar />
//                    <Switch>
//                        <Route path="/" exact component={Home} />
//                        <Route path="/artists/:artistId" component={ArtistBio} />
//                    </Switch>
//                </div>
//            </Router>
//        );
//    };

//    export default App;
