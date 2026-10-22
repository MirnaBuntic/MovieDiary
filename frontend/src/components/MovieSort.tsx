interface MovieSortProps {
  sortBy: "date" | "rating";
  onSortChange: (sort: "date" | "rating") => void;
}

function MovieSort({ sortBy, onSortChange }: MovieSortProps) {
  return (
    <label>
      Sortera efter
      <select
        value={sortBy}
        onChange={(event) =>
          onSortChange(event.target.value as "date" | "rating")
        }
      >
        <option value="date">Senast sedd</option>
        <option value="rating">Högsta betyg</option>
      </select>
    </label>
  )
}

export default MovieSort;
