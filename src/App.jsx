import { useEffect, useState } from 'react'
import Search from './Components/Search'
import MovieCard from './Components/moviecard'

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setStatus('');
    
    try {
      let url;
      if (query.trim()) {
        const encodedQuery = encodeURIComponent(query.trim());
        url = `${API_BASE_URL}/search/movie?query=${encodedQuery}`;
      } else {
        url = `${API_BASE_URL}/trending/movie/day`;
      }
      
      console.log('Fetching from URL:', url);
      
      const response = await fetch(url, API_OPTIONS);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Search results:', data.results?.length, 'movies found');
      
      if (data.results && data.results.length > 0) {
        setMovies(data.results);
        setStatus('success');
      } else if (query.trim()) {
        setMovies([]);
        setStatus('no-results');
      } else {
        setMovies(data.results || []);
        setStatus('success');
      }
      
    } catch (error) {
      console.error('Error fetching movies:', error);
      setStatus('error');
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load effect
  useEffect(() => {
    fetchMovies();
  }, []);

  // Custom debounce effect for search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchMovies(searchTerm);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <main className="min-h-screen bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('/BG.png')"}}>
      
      <div className="wrapper">
        
        <header>
          <img src='/hero.png' alt='Company Logo' className='logo' />
          <h1>
            Find <span className='text-gradient'>Movie </span>You'll enjoy without the hassle
          </h1>
        </header>
        
        <img src='/hero.png' alt='Hero Banner' />

        <div className="search">
          <Search 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
          />
          
          {/* Debug info */}
          <p className="text-white text-xs mt-1">
            Search: "{searchTerm}" | Status: {status} | Loading: {isLoading ? 'Yes' : 'No'}
          </p>
          
          {/* Search Term Display */}
          {searchTerm && (
            <p className="text-yellow-400 text-sm mt-2">
              Searching for: "{searchTerm}"
            </p>
          )}
          
          {/* Loading State */}
          {isLoading && (
            <p className="text-blue-400 font-bold mt-4">
              {searchTerm ? 'Searching for movies...' : 'Loading trending movies...'}
            </p>
          )}
          
          {/* Error State */}
          {status === 'error' && !isLoading && (
            <p className="text-red-500 font-bold mt-4">
              Failed to fetch movies. Please try again.
            </p>
          )}
          
          {/* No Results State */}
          {status === 'no-results' && !isLoading && (
            <p className="text-red-500 font-bold mt-4">
              This movie doesn't exist. Try searching for something else.
            </p>
          )}
          
          {/* Success State with Movie Cards */}
          {status === 'success' && !isLoading && (
            <>
              <p className="text-green-500 font-bold mt-4">
                {searchTerm 
                  ? `Found ${movies.length} movies for "${searchTerm}"` 
                  : `Showing ${movies.length} trending movies`
                }
              </p>
              
              {/* Movie Grid */}
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6'>
                {movies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </>
          )}
        </div>
        
      </div>
    </main>
  );
}

export default App
