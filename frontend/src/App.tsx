
import { useEffect, useState } from "react";
import MovieList from "./components/MovieList";
import MovieForm from "./components/MovieForm";
import type { Movie } from "./types/Movie";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [activeFilter, setActiveFilter] = useState<"watched" | "watchlist">("watched");
  const [showForm, setShowForm] = useState(false);

  // Hämta alla filmer från backend
  useEffect(() => {
    async function getMovies() {
      const response = await fetch("http://127.0.0.1:8000/movies");
      const data: Movie[] = await response.json();

      setMovies(data);
    }

    getMovies();
  }, []);

  // Lägg till en film
  async function addMovie(
    title: string,
    genre: string,
    status: "watched" | "watchlist",
    watched_date: string | null,
    rating: number | null
  ) {
    const response = await fetch("http://127.0.0.1:8000/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        genre,
        status,
        watched_date,
        rating,
      }),
    });

    if (response.ok) {
      const newMovie: Movie = await response.json();

      setMovies((previousMovies) => [...previousMovies, newMovie]);
      setActiveFilter(status);
      setShowForm(false);
    }
  }

  // Ta bort en film
  async function deleteMovie(id: number) {
    const response = await fetch(`http://127.0.0.1:8000/movies/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setMovies((previousMovies) =>
        previousMovies.filter((movie) => movie.id !== id)
      );
    }
  }

  // Filtrera filmer efter status
  const filteredMovies = movies.filter(
    (movie) => movie.status === activeFilter
  );

  return (
    <>
      <header>
        <h1>MovieDiary</h1>
        <p>Min filmkatalog</p>
      </header>

      <main>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Avbryt" : "Lägg till ny film"}
        </button>

        {showForm && <MovieForm onAdd={addMovie} />}

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
    </>
  )
}

export default App;
