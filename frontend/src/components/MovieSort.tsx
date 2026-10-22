
import { useState } from "react";

interface MovieSortProps {
  sortBy: "date" | "rating";
  onSortChange: (sort: "date" | "rating") => void;
}

function MovieSort({ sortBy, onSortChange }: MovieSortProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleSort(sort: "date" | "rating") {
    onSortChange(sort);
    setIsOpen(false);
  }

  return (
    <div className="movie-sort">
      <button
        type="button"
        className="movie-sort-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="sort-label">Sortera efter</span>

        <span className="sort-value">
          {sortBy === "date" ? "Senast sedd" : "Högsta betyg"}
          <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
        </span>
      </button>

      {isOpen && (
        <div className="movie-sort-dropdown">
          <button type="button" onClick={() => handleSort("date")}>
            Senast sedd
          </button>

          <button type="button" onClick={() => handleSort("rating")}>
            Högsta betyg
          </button>
        </div>
      )}
    </div>
  );
}

export default MovieSort;
