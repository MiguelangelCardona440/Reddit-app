function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search Post"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      {searchTerm && <button onClick={() => setSearchTerm("")}>Clear</button>}
    </div>
  );
}

export default SearchBar;
