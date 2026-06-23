export function SearchBar({ searchText, onSearchChange }) {
  return (
    <label className="search-box">
      <span>Search</span>
      <input
        aria-label="Search tasks"
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search Tasks"
        type="search"
        value={searchText}
      />
    </label>
  );
}
