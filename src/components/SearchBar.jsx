const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="my-8 flex items-center">
      <label className="mr-4">Enter Project Id:</label>
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search by Project ID"
        className="px-4 py-2 w-40 md:w-56 lg:w-64 xl:w-72 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
      />
    </div>
  );
};

export default SearchBar;
