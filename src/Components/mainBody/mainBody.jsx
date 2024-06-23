import React from 'react'
import './mainBody.css'
import { FaHeart, FaShareAlt, FaBookmark } from 'react-icons/fa';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.min.css';
import navArrow from '../../assets/Arrow.png'
import painting from '../../assets/Painting 2.png'


const mainBody = () => {
  // const [liked, setLiked] = React.useState(false);
  // const [bookmarked, setBookmarked] = React.useState(false);

  // const toggleLike = () => setLiked(!liked);
  // const toggleBookmark = () => setBookmarked(!bookmarked);

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  // };
  const [liked, setLiked] = React.useState(false);
    const [bookmarked, setBookmarked] = React.useState(false);

    const handleLike = () => setLiked(!liked);
    const handleBookmark = () => setBookmarked(!bookmarked);

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
              <img src={painting} alt="Artwork" />
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