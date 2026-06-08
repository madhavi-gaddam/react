import { Search } from "lucide-react";

export function SearchBar({ searchText, onSearchChange }) {
  return (
    <label className="search-box">
      <Search size={18} />
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
