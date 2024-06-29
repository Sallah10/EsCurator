import React from 'react'
import './mainBody.css'
import { FaHeart, FaShareAlt, FaBookmark } from 'react-icons/fa';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.min.css';
import axios from 'axios';
// import { useParams } from 'react-router-dom';
import navArrow from '../../assets/Arrow.png'
// import painting from '../../assets/Painting 2.png'

// https://art-reccommendation-api.onrender.com/art_works/?format=api'
const mainBody = () => {
    const [artworks, setArtworks] = React.useState([]);
    const [liked, setLiked] = React.useState(false);
    const [bookmarked, setBookmarked] = React.useState(false);

    const handleLike = () => setLiked(!liked);
    const handleBookmark = () => setBookmarked(!bookmarked); 

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
      //   spaceBetween: 10,
      //   navigation: {
      //     nextEl: '.swiper-button-next',
      //     prevEl: '.swiper-button-prev',
      //   },
      // });
    }, []);  
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <>
      <div className='title' >
        <h1>Featured Paintings</h1>
        <img className='arrow' src={navArrow} alt="navArrow" />
      </div>
      <div className='body'>
        <div 
          className='card'
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)}
        >
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
            <SwiperSlide> */}
              {/* <img src={painting} alt="Artwork" /> */}
              <img src={artworks.art_image} alt={artworks.title} />
              {isHovered && (
                    <div className="overlay">
                        <button className={`icon-btn ${liked ? 'liked' : ''}`} onClick={handleLike}><FaHeart /></button>
                        {/* <button className="icon-btn"><FaShareAlt /></button> */}
                        <button className={`icon-btn ${bookmarked ? 'bookmarked' : ''}`} onClick={handleBookmark}><FaBookmark /></button>
                    </div>
                )}
              <h2>Art Name</h2>
              <h3>Artists Name</h3>
              <h4>Date</h4>
            {/* </SwiperSlide>
          </Swiper> */}
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
