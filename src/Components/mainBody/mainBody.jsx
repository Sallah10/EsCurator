import React from "react";
import "./mainBody.css";
import { FaHeart, FaBookmark } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { InfinitySpin } from 'react-loader-spinner';
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";
import navArrow from "../../assets/Arrow.png";

const MainBody = () => {
  const [artworks, setArtworks] = React.useState([]);
  const [liked, setLiked] = React.useState({});
  const [bookmarked, setBookmarked] = React.useState({});
  const [loadingImages, setLoadingImages] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true); // New global loading state

  React.useEffect(() => {
    const fetchArtworks = async () => {
      try {
        setIsLoading(true); // Start loading
        const response = await axios.get(
          "/api/art_works"
        );
        setArtworks(response.data);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      } finally {
        setIsLoading(false); // Stop loading whether success or error
      }
    };

    fetchArtworks();
  }, []);
  const handleLike = (id) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
    handleInteraction(id, "like");
  };

  const handleBookmark = (id) => {
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
    handleInteraction(id, "bookmark");
  };

  const handleInteraction = (id, type) => {
    const payload = {
      artworkId: id,
      interactionType: type,
      timestamp: new Date().toISOString(),
    };

    axios
      .post("/api/interactions", payload)
      .then((response) => {
        console.log("Interaction recorded:", response.data);
      })
      .catch((error) => {
        console.error("Error recording interaction:", error);
      });
  };

  const handleImageLoad = (id) => {
    setLoadingImages((prev) => ({ ...prev, [id]: false }));
  };

  const handleImageError = (id) => {
    setLoadingImages((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <>
      <div className="title">
        <h1>Featured Paintings</h1>
        <img
          className="arrow"
          src={navArrow}
          alt="navArrow"
          onClick={() => Swiper.current?.slideNext()}
        />
      </div>
      <div className="body">
        {isLoading ? (
          <div className="global-spinner">
            <InfinitySpin
              visible={true}
              width="200"
              color="#16a085"
              ariaLabel="infinity-spin-loading"
            />
            <p>Loading artworks...</p>
          </div>
        ) : (
          <div className="card">
            <Swiper
              direction="horizontal"
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                768: { slidesPerView: 3, spaceBetween: 30 },
                0: { slidesPerView: 1, spaceBetween: 10 },
              }}
            >
              {artworks.map((artwork) => (
                <SwiperSlide key={artwork.id}>
                  <div className="artwork-Card">
                    {loadingImages[artwork.id] && (
                      <div className="spinner">
                        <InfinitySpin
                          visible={true}
                          width="200"
                          color="#16a085"
                          ariaLabel="infinity-spin-loading"
                        />
                      </div>
                    )}
                    <img
                      src={artwork.art_image}
                      alt={artwork.art_title}
                      onLoad={() => handleImageLoad(artwork.id)}
                      onError={() => handleImageError(artwork.id)}
                      style={{ display: loadingImages[artwork.id] ? "none" : "block" }}
                    />
                    <h2>{artwork.art_title}</h2>
                    <h3>{artwork.artiste}</h3>
                    <h4>{new Date().toLocaleDateString()}</h4>
                    <div className="overlay">
                      <button
                        className={`icon-btn ${liked[artwork.id] ? "liked" : ""}`}
                        onClick={() => handleLike(artwork.id)}
                      >
                        <FaHeart />
                      </button>
                      <button
                        className={`icon-btn ${bookmarked[artwork.id] ? "bookmarked" : ""}`}
                        onClick={() => handleBookmark(artwork.id)}
                      >
                        <FaBookmark />
                      </button>
                  </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </>
  );
};

export default MainBody;
{/* <h2>{artwork.art_title}</h2>
                  <h3>{artwork.artiste}</h3>
                  <h4>{new Date().toLocaleDateString()}</h4>
                  <div className="overlay">
                    <button
                      className={`icon-btn ${liked[artwork.id] ? "liked" : ""}`}
                      onClick={() => handleLike(artwork.id)}
                    >
                      <FaHeart />
                    </button>
                    <button
                      className={`icon-btn ${bookmarked[artwork.id] ? "bookmarked" : ""}`}
                      onClick={() => handleBookmark(artwork.id)}
                    >
                      <FaBookmark />
                    </button>
                  </div> */}