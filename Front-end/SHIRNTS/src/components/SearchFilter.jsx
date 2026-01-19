import { useState } from "react";
import "./SearchFilter.css";

const SearchFilter = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({ type: "", status: "" });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilter = { ...filter, [name]: value };
    setFilter(updatedFilter);
    onFilter(updatedFilter);
  };

  return (
    <div className="search-filter-container">
      <input
        type="text"
        placeholder="Search complaints by title..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />

      <div className="filter-controls">
        <select
          name="type"
          value={filter.type}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="">All Types</option>
          <option value="maintenance">Maintenance</option>
          <option value="cleaning">Cleaning</option>
          <option value="other">Other</option>
        </select>

        <select
          name="status"
          value={filter.status}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="resolved">Resolved</option>
          <option value="inprogress">In Progress</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;
