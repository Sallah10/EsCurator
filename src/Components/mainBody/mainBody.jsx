import React from 'react'
import './mainBody.css'
import { FaHeart, FaShareAlt, FaBookmark, FaBook } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import axios from 'axios';
// import { useParams } from 'react-router-dom';
import navArrow from '../../assets/Arrow.png'
// import painting from '../../assets/Painting 2.png'

// https://art-reccommendation-api.onrender.com/art_works/?format=api'
const mainBody = () => {
    const [artworks, setArtworks] = React.useState([]);
    const [liked, setLiked] = React.useState(false);
    const [bookmarked, setBookmarked] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);

    const handleLike = (id) => {
      setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
      handleInteraction(id, 'like');
    };
  
    const handleBookmark = (id) => {
      setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
      handleInteraction(id, 'bookmark');
    };

    React.useEffect(() => {
      const fetchArtworks = async () => {
        try {
          const response = await axios.get('https://art-reccommendation-api.onrender.com/art_works');
          setArtworks(response.data);
        } catch (error) {
          console.error('Error fetching artworks:', error);
        }
      };
  
      fetchArtworks();
      // new Swiper('.swiper-container', {
      //   slidesPerView: 3,
      //   spaceBetween: 50,
      //   navigation: {
      //     nextEl: '.swiper-button-next',
      //     prevEl: '.swiper-button-prev',
      //   },
      // });
    }, []);  
    const handleInteraction = (id, type) => {
      const payload = {
        artworkId: artworks.id,
        interactionType: type,
        timestamp: new Date().toISOString(),
      };
  
      axios.post('https://art-reccommendation-api.onrender.com/interactions', payload)
        .then(response => {
          console.log('Interaction recorded:', response.data);
        })
        .catch(error => {
          console.error('Error recording interaction:', error);
        });
    };  
  return (
    <>
      <div className='title' >
        <h1>Featured Paintings</h1>
        <img className='arrow' src={navArrow} alt="navArrow" />
      </div>
      <div className='body'>
        <div 
          className='card'
          onMouseEnter={() => handleInteraction('view')}
          // onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)}
        >
          <Swiper
                // spaceBetween={50}
                // slidesPerView={1}
                // breakpoints={{
                //     640: {
                //         slidesPerView: 2,
                //     },
                //     1024: {
                //         slidesPerView: 3,
                //     },
                // }}
                // loop={true}
                direction="horizontal" 
                spaceBetween={50}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                // loop
                // loopAdditionalSlides={2}
            >
              {/* <img src={painting} alt="Artwork" /> */}
              {/* <SwiperSlide key={artwork.id}>
              <div className="artwork-card">
              <img src={artwork.image_url} alt={artwork.title} className="artwork-image" />
              <h2>{artwork.title}</h2>
              <p>{artwork.artist}</p>
              <p>{new Date(artwork.date_added).toLocaleDateString()}</p> 
            </div>
            </SwiperSlide> */}
              {/* {isHovered && (
                    <div className="overlay">
                        <button className={`icon-btn ${liked ? 'liked' : ''}`} onClick={handleLike}><FaHeart /></button>
                        <button className="icon-btn"><FaShareAlt /></button>
                        <button className={`icon-btn ${bookmarked ? 'bookmarked' : ''}`} onClick={handleBookmark}><FaBookmark /></button>
                    </div>
                )} */}
              {artworks.map((artwork) => (
                <SwiperSlide key={artwork.id}>
                  <div key={artwork.id} className='eachCard' 
                  onMouseEnter={() => setIsHovered(true)} 
                  onMouseLeave={() => setIsHovered(false)}>
                    <img src={artwork.art_image} alt={artwork.art_title} />
                    <h2>{artwork.art_title}</h2>
                    <h3>{artwork.artiste}</h3>
                    <h4>{new Date(new Date().toISOString()).toLocaleDateString()}</h4>
                  </div>
                  {/* onClick={handleLike} 
                  onClick={handleBookmark} */}
                  {isHovered  === artwork.id && (
                    <div className="overlay">
                      <button className={`icon-btn ${liked ? 'liked' : ''}`} onClick={() => handleLike(artwork.id)}> <FaHeart /></button>
                      <button className="icon-btn"><FaShareAlt /></button>
                      <button className={`icon-btn ${bookmarked ? 'bookmarked' : ''}`} onClick={() => handleBookmark(artwork.id)}> <FaBookmark /></button>
                    </div>
              )}
                </SwiperSlide> 
            ))}
          </Swiper>
        </div>    
      </div> 
      {/* <Swiper
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
                loop={true}
            >
                {filteredArtworks.map(artwork => (
                    <SwiperSlide key={artwork.id}>
                        <ArtworkCard artwork={artwork} />
                    </SwiperSlide>
                ))}
            </Swiper> */}
    </>
  )
}

export default mainBody
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.min.css';
// import ArtworkCard from './components/ArtworkCard';
// import NavBar from './components/NavBar';

// const App = () => {
//     const [artworks, setArtworks] = useState([]);
//     const [recommendedArtworks, setRecommendedArtworks] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');

//     const userId = 1;  // Replace with actual user ID from authentication

//     useEffect(() => {
//         axios.get('/api/artworks/')
//             .then(response => {
//                 setArtworks(response.data);
//             })
//             .catch(error => {
//                 console.error('There was an error fetching the artworks!', error);
//             });

//         axios.get(`/api/recommendations/${userId}/`)
//             .then(response => {
//                 setRecommendedArtworks(response.data);
//             })
//             .catch(error => {
//                 console.error('There was an error fetching the recommendations!', error);
//             });
//     }, []);

//     const handleSearchChange = (event) => {
//         setSearchTerm(event.target.value);
//     };

//     const filteredArtworks = artworks.filter(artwork =>
//         artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         artwork.artist.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div className="App">
//             <NavBar onSearchChange={handleSearchChange} />
//             <h1>Art Curator</h1>
//             <h2>Recommended for you</h2>
//             <Swiper
//                 spaceBetween={20}
//                 slidesPerView={1}
//                 breakpoints={{
//                     640: {
//                         slidesPerView: 2,
//                     },
//                     1024: {
//                         slidesPerView: 3,
//                     },
//                 }}
//                 loop={true}
//             >
//                 {recommendedArtworks.map(artwork => (
//                     <SwiperSlide key={artwork.id}>
//                         <ArtworkCard artwork={artwork} userId={userId} />
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//             <h2>All Artworks</h2>
//             <Swiper
//                 spaceBetween={20}
//                 slidesPerView={1}
//                 breakpoints={{
//                     640: {
//                         slidesPerView: 2,
//                     },
//                     1024: {
//                         slidesPerView: 3,
//                     },
//                 }}
//                 loop={true}
//             >
//                 {filteredArtworks.map(artwork => (
//                     <SwiperSlide key={artwork.id}>
//                         <ArtworkCard artwork={artwork} userId={userId} />
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//         </div>
//     );
// };

// export default App;
