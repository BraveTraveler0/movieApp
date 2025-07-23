const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search"> 
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <img 
            src="/search.png" 
            alt="Search" 
            className="h-5 w-5 text-gray-400"
          />
        </div>
        
        {/* Input Field */}
        <input
          type="text"
          placeholder="Search through thousands of movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-3 py-3 rounded-lg border-2 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-600 text-white bg-transparent placeholder-gray-400"
        />
      </div>
    </div>
  )
}

export default Search
