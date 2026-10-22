import type { Movie } from "../types/Movie";

//Props från app.tsx
interface MovieListProps {
  movies: Movie[];
  title: string;
  onDelete: (id: number) => void;
}

function MovieList({ movies, title, onDelete }: MovieListProps) {
  return (
    <section className="movie-list">
      <div className="movie-list-header">
        <h2>{title}</h2>
        <span>{movies.length} {movies.length === 1 ? "film" : "filmer"}</span>
      </div>

      {movies.map((movie) => (
        <article className="movie-in-list" key={movie.id}>
          <div className="movie-top">
            <div className="movie-info">
              <h3>{movie.title}</h3>

              <p>
                {movie.genre}
                {movie.status === "watched" && movie.watched_date && (
                  <> · {movie.watched_date}</>
                )}
              </p>
            </div>

            {movie.status === "watched" && movie.rating !== null && (
              <span className="movie-rating">{movie.rating}/10</span>
            )}
          </div>

          <button
            className="movie-delete-btn"
            onClick={() => onDelete(movie.id)}
          >
            <i className="fa-regular fa-trash-can" aria-hidden="true"></i>
            Ta bort
          </button>
        </article>
      ))}
    </section>
  );
}

export default MovieList;
