import type { Movie } from "../types/Movie";

interface MovieListProps {
  movies: Movie[];
  title: string;
}

function MovieList({ movies, title }: MovieListProps) {
  return (
    <section>
      <h2>{title}</h2>

        {movies.map((movie) => (
            <article key={movie.id}>
                <h3>{movie.title}</h3>
                <p>Genre: {movie.genre}</p>

                {movie.status === "watched" && (
                    <>
                        <p>Datum: {movie.watchedDate}</p>
                        <p>Betyg: {movie.rating}/10</p>
                    </>
                )}
            </article>
        ))}
     
    </section>
  )
}

export default MovieList;