import React from 'react'

const MovieCard = ({ movie }) => {
  // TMDB image base URL
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
  
  return (
    <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors">
      {/* Movie Poster */}
      {movie?.poster_path && (
        <img 
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-64 object-cover rounded-lg mb-3"
        />
      )}
      
      <h2 className="text-xl font-bold text-white mb-2">
        {movie?.title || 'Movie Title'}
      </h2>
      
      <p className="text-gray-300 text-sm mb-2 line-clamp-3">
        {movie?.overview || 'Movie description...'}
      </p>
      
      {/* All Movie Info on One Line */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-yellow-400">⭐ {movie?.vote_average?.toFixed(1) || '0.0'}</span>
        <span className="text-gray-400">•</span>
        <span className="text-gray-400">{movie?.release_date?.split('-')[0] || 'N/A'}</span>
        <span className="text-gray-400">•</span>
        <span className="text-gray-400">{movie?.original_language?.toUpperCase() || 'N/A'}</span>
        <span className="text-gray-400">•</span>
        <span className="text-gray-400">Pop: {movie?.popularity?.toFixed(0) || 'N/A'}</span>
      </div>
    </div>
  )
}

export default MovieCard