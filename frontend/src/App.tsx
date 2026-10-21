import { useEffect, useState } from "react";
import MovieList from "./components/MovieList";
import type { Movie } from "./types/Movie";


function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [activeFilter, setActiveFilter] = useState<"watched" | "watchlist">("watched");

  useEffect(() => {
    async function getMovies() {
      const response = await fetch("http://127.0.0.1:8000/movies");
      const data: Movie[] = await response.json();

      setMovies(data);
    }

    getMovies();
  }, []);

  async function deleteMovie(id: number) {
  const response = await fetch(`http://127.0.0.1:8000/movies/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
      setMovies(movies.filter((movie) => movie.id !== id));
    }
  }

  const filteredMovies = movies.filter(
    (movie) => movie.status === activeFilter
  );

  return (
    <main>
      <h1>MovieDiary</h1>
      <p>Min filmkatalog</p>

      <nav>
        <button onClick={() => setActiveFilter("watched")}>
          Har sett
        </button>

        <button onClick={() => setActiveFilter("watchlist")}>
          Vill se
        </button>
      </nav>

      <MovieList
        movies={filteredMovies}
        title={activeFilter === "watched" ? "Har sett" : "Vill se"}
        onDelete={deleteMovie}
      />
    </main>
  )
}

export default App;