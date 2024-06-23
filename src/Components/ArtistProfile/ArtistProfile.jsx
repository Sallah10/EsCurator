// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import ArtworkCard from './ArtworkCard';

const ArtistProfile = () => {
    // const { artistId } = useParams();
    // const [artist, setArtist] = useState(null);
    // const [artworkData, setArtworkData] = useState({
    //     title: '',
    //     image_url: '',
    //     genre: '',
    //     description: ''
    // });

    // useEffect(() => {
    //     axios.get(`/api/artists/${artistId}/`)
    //         .then(response => {
    //             setArtist(response.data);
    //         })
    //         .catch(error => {
    //             console.error('There was an error fetching the artist data!', error);
    //         });
    // }, [artistId]);

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setArtworkData(prevState => ({
    //         ...prevState,
    //         [name]: value
    //     }));
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     axios.post('/api/upload_artwork/', {
    //         ...artworkData,
    //         artist: artistId
    //     })
    //     .then(response => {
    //         // Refresh artist data after upload
    //         setArtist(prevState => ({
    //             ...prevState,
    //             artworks: [...prevState.artworks, response.data]
    //         }));
    //         // Clear form
    //         setArtworkData({
    //             title: '',
    //             image_url: '',
    //             genre: '',
    //             description: ''
    //         });
    //     })
    //     .catch(error => {
    //         console.error('There was an error uploading the artwork!', error);
    //     });
    // };

  return (
    <div>  {artist && (
      <div>
          <h1>{artist.user.username}</h1>
          <p>{artist.bio}</p>
          {/* <h2>Artworks</h2>
          <div className="artworks">
              {artist.artworks.map(artwork => (
                  <ArtworkCard key={artwork.id} artwork={artwork} />
              ))}
          </div> */}
          <h2>Upload New Artwork</h2>
          <form onSubmit={handleSubmit}>
              <input
                  type="text"
                  name="title"
                  value={artworkData.title}
                  onChange={handleInputChange}
                  placeholder="Title"
                  required
              />
              <input
                  type="text"
                  name="image_url"
                  value={artworkData.image_url}
                  onChange={handleInputChange}
                  placeholder="Image URL"
                  required
              />
              <input
                  type="text"
                  name="genre"
                  value={artworkData.genre}
                  onChange={handleInputChange}
                  placeholder="Genre"
              />
              <textarea
                  name="description"
                  value={artworkData.description}
                  onChange={handleInputChange}
                  placeholder="Description"
              />
              <button type="submit">Upload Artwork</button>
          </form>
      </div>
  )}
</div>
  )
};

export default ArtistProfile;