import React from 'react';
import './MovieDetails.css';

const MovieDetails = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-body">
          <img className="modal-poster" src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400x600'} alt={movie.Title} />
          <div className="modal-details">
            <h2>{movie.Title}</h2>
            <div className="meta-info">
              <span>{movie.Year}</span> • <span>{movie.Runtime}</span> • <span>{movie.Rated}</span>
            </div>
            <div className="rating">
              <span className="star">⭐</span>
              <strong>{movie.imdbRating}/10</strong>
            </div>
            <h3>Plot</h3>
            <p>{movie.Plot}</p>
            <h3>Genre</h3>
            <p>{movie.Genre}</p>
            <h3>Director</h3>
            <p>{movie.Director}</p>
            <h3>Cast</h3>
            <p>{movie.Actors}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;