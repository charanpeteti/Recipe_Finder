import React, { useState } from "react";

function SortOptions({ onSortChange }) {
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    onSortChange(event.target.value);
  };

  return (
    <div className="sort-options">
      <select value={sortOrder} onChange={handleSortChange}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}

export default SortOptions;
