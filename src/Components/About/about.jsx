/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import './about.css'


const about = () => {
  return (
    <>
      <div className='about'>
        <h1>About EsCurator</h1>
        <h2>Where Art Meets Discovery</h2>
        <p>
          At EsCurator, we believe art is a transformative experience, a journey that ignites emotions, expands perspectives, and enriches our lives. But navigating the boundless world of artistic expression can feel daunting, fear not art explorer! We're here to guide you.
        </p>
        <h2>What does EsCurator have to offer?</h2>
        <div className='segments'>
          <div className='segment segment1'>
            <h3>Your Personalized Curator</h3>
            <p>
              Imagine having a knowledgeable art expert whispering recommendations in your ear, pointing you towards hidden gems and artists who resonate with your unique taste. <br /> That's the magic of our innovative <span className='recommender'>recommendation system</span>, it's not just a search engine; it's your personal curator, fueled by cutting-edge technology. 
            </p>
          </div>
          <div className='segment'>
            <h3>Join the Conversation</h3>
            <p>Art thrives on connection. Share your discoveries, delve into discussions around the artwork, and connect with fellow art enthusiasts. <br /> Together, let's create a space where artistic exploration flourishes.</p>
          </div>
        </div>
        <div className='segment2'>
            <h3>More Than Just Recommendations</h3>
            <p>Our mission extends beyond algorithms. We're passionate about fostering a vibrant art community. Whether you're a seasoned collector or a curious newcomer, EsCurator offers a platform to:
              <ul>
                <li><span className='recommender'>Uncover the Unexpected: </span><br /> Step outside your comfort zone and discover artistic movements you never knew existed.</li>
                <li><span className='recommender'>Refine Your Palette: </span><br /> Immerse yourself in diverse styles, mediums, and historical periods, allowing your artistic preferences to flourish. </li>
                <li><span className='recommender'>Build a Collection You Love: </span><br /> Curate a personal art gallery filled with pieces that speak to your soul, igniting joy and inspiration.</li>
              </ul>    
            </p>
          </div>
        <p className='closure'>
          Embark on Your Artistic Odyssey Today!  
          Become a member and unlock the power of personalized recommendations. Explore the vast collection, engage with the community, and let your artistic journey begin!
        </p>
      </div>
    </>
    
  )
}

export default about