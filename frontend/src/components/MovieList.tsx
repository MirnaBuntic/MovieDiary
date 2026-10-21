import type { Movie } from "../types/Movie";

interface MovieListProps {
  movies: Movie[];
  title: string;
  onDelete: (id: number) => void;
}

function MovieList({ movies, title, onDelete }: MovieListProps) {
  return (
    <section>
      <h2>{title}</h2>

      {movies.map((movie) => (
        <article key={movie.id}>
          <h3>{movie.title}</h3>
          <p>Genre: {movie.genre}</p>

          {movie.status === "watched" && (
            <>
              <p>Datum: {movie.watched_date}</p>
              <p>Betyg: {movie.rating}/10</p>
            </>
          )}

          <button onClick={() => onDelete(movie.id)}>
            Ta bort
          </button>
        </article>
      ))}
    </section>
  );
}

export default MovieList;
