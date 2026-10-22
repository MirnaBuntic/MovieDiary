
import { useState } from "react";

const genres = [
  "Action",
  "Komedi",
  "Drama",
  "Skräck",
  "Sci-Fi",
  "Thriller",
  "Animation"
]

interface MovieFilterProps {
  selectedGenres: string[];
  onToggleGenre: (genre: string) => void;
  onClear: () => void;
}

function MovieFilter({
  selectedGenres,
  onToggleGenre,
  onClear
}: MovieFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="movie-filter">
      <button
        type="button"
        className="movie-filter-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="genre-label">Genre</span>

        <span className="genre-value">
          {selectedGenres.length === 0
            ? "Alla genrer"
            : `${selectedGenres.length} genrer valda`}

          <i className="fa-solid fa-sliders" aria-hidden="true"></i>
        </span>
      </button>

      {isOpen && (
        <div className="movie-filter-dropdown">
          <h3>Välj genrer</h3>

          {genres.map((genre) => (
            <label key={genre}>
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre)}
                onChange={() => onToggleGenre(genre)}
              />
              {genre}
            </label>
          ))}

          <button type="button" onClick={onClear}>
            Rensa filter
          </button>
        </div>
      )}
    </div>
  )
}

export default MovieFilter;
