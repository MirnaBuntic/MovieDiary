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
  return (
    <section>
      <h3>Filtrera efter genre</h3>

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

      <button onClick={onClear}>
        Rensa filter
      </button>
    </section>
  )
}

export default MovieFilter;
