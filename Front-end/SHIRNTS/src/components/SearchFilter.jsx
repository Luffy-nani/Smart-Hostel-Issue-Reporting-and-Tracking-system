import { useState } from "react";
import "./SearchFilter.css";

const SearchFilter = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({ type: "", status: "" });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch && onSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilter = { ...filter, [name]: value };
    setFilter(updatedFilter);
    onFilter && onFilter(updatedFilter);
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
          <option value="Water">Water</option>
          <option value="Electricity">Electricity</option>
          <option value="Internet">Internet</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Other">Other</option>
        </select>

        <select
          name="status"
          value={filter.status}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
          <option value="In Progress">In Progress</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;