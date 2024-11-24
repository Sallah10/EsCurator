/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React from 'react'
import './mainBody.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FaHeart, FaBookmark} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { useSwiper } from 'swiper/react';
import axios from 'axios';
import navArrow from '../../assets/Arrow.png'
// import painting from '../../assets/Painting 2.png'

// https://art-reccommendation-api.onrender.com/art_works/?format=api'
const mainBody = () => {
    const [artworks, setArtworks] = React.useState([]);
    const [liked, setLiked] = React.useState(false);
    const [bookmarked, setBookmarked] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
      handleInteraction('view', true);
    };
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
          console.log(payload)
        });
    }; 
    const SwiperNavButtons = () => {
      const swiper = useSwiper();
    
      return (
        <div className="swiper-nav-btns">
          <button onClick={() => swiper.slidePrev()}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button onClick={() => swiper.slideNext()}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      );
    };

  return (
    <>
      <div className='title' >
        <h1>Featured Paintings</h1>
        <img className='arrow' src={navArrow} alt="navArrow" onClick={() => Swiper.slideNext()}/>
      </div>
      <div className='body'>
        <div 
          className='card'
        >
          <Swiper
                direction="horizontal"
                modules={[Navigation, Pagination]} 
                spaceBetween={50}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                  // when the viewport is >= 640px
                  640: {
                    slidesPerView: 2, // Show 2 slides
                    spaceBetween: 20,
                  },
                  // when the viewport is >= 768px
                  768: {
                    slidesPerView: 3, // Show 3 slides
                    spaceBetween: 30,
                  },
                  // when the viewport is < 640px
                  0: {
                    slidesPerView: 1, // Show 1 slide
                    spaceBetween: 10,
                  },
                }}
            >
              {artworks.map((artwork) => (
                <SwiperSlide key={artwork.id}>
                  <div key={artwork.id} 
                    className='artwork-Card' 
                  >
                    <img src={artwork.art_image} alt={artwork.art_title} />
                    <h2>{artwork.art_title}</h2>
                    <h3>{artwork.artiste}</h3>
                    <h4>{new Date(new Date().toISOString()).toLocaleDateString()}</h4>
                    <div className="overlay">
                      <button className={`icon-btn ${liked ? 'liked' : ''}`} onClick={() => handleLike(artwork.id)}> <FaHeart /></button>
                      <button className={`icon-btn ${bookmarked ? 'bookmarked' : ''}`} onClick={() => handleBookmark(artwork.id)}> <FaBookmark /></button>
                    </div>
                  </div>
                </SwiperSlide> 
            ))}
          </Swiper>
          
        </div>    
      </div> 
    </>
  )
}

export default mainBody

{/* <SwiperNavButtons/> */}
// onMouseEnter={() => setIsHovered(true)} 
                    // onMouseEnter={handleMouseEnter}
                    // onMouseLeave={() => setIsHovered(false)}
                    
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
 {/* onClick={handleLike} 
                  onClick={handleBookmark} === artwork.id ///isHovered  === artwork.id/// isHovered - for hover effect*/}
                  {/* { isHovered === artwork.id && (
                    <div className="overlay">
                      <button className={`icon-btn ${liked ? 'liked' : ''}`} onClick={() => handleLike(artwork.id)}> <FaHeart /></button>
                      <button className="icon-btn"><FaShareAlt /></button>
                      <button className={`icon-btn ${bookmarked ? 'bookmarked' : ''}`} onClick={() => handleBookmark(artwork.id)}> <FaBookmark /></button>
                    </div>
              )} */}