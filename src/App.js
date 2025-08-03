import React, { useState, useEffect } from 'react';
import './App.css';
import MovieCard from './MovieCard';
import MovieDetails from './MovieDetails';
import SearchIcon from './search.svg'; 

const API_URL = 'https://www.omdbapi.com?apikey=68afd1d5'; 

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  const handleMovieClick = async (imdbID) => {
    setIsLoading(true);
    
    const response = await fetch(`${API_URL}&i=${imdbID}`);
    const data = await response.json();

    if (data.Response === "True") {
      setSelectedMovie(data);
    } else {
      console.error("API Error:", data.Error);
    }
    setIsLoading(false);
  };
  
  const closeModal = () => {
    setSelectedMovie(null);
  };

  useEffect(() => {
    searchMovies('Avengers');
  }, []);

  useEffect(() => {
  }, [selectedMovie]);

  return (
    <div className="app">
      <h1>Movieista</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => { if (e.key === 'Enter') { searchMovies(searchTerm); } }}
        />
        <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard
              movie={movie}
              key={movie.imdbID}
              onClick={() => handleMovieClick(movie.imdbID)}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
      {selectedMovie && (
        <MovieDetails movie={selectedMovie} onClose={closeModal} />
      )}
      {isLoading && !selectedMovie && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
};

export default App;