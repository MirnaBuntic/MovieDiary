
import { useEffect, useState } from "react";
import MovieList from "./components/MovieList";
import MovieForm from "./components/MovieForm";
import type { Movie } from "./types/Movie";

// Genrer som användaren kan filtrera efter
const genres = [
  "Action",
  "Komedi",
  "Drama",
  "Skräck",
  "Sci-Fi",
  "Thriller",
  "Animation"
];

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [activeFilter, setActiveFilter] = useState<"watched" | "watchlist">("watched");
  const [showForm, setShowForm] = useState(false);

  // Genrefiltrering och sortering
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"date" | "rating">("date");

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

  // Markera eller avmarkera en genre
  function toggleGenre(genre: string) {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(
        selectedGenres.filter((item) => item !== genre)
      );
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  }

  // Filtrera efter status och valda genrer
  const filteredMovies = movies.filter((movie) => {
    const matchesStatus = movie.status === activeFilter;

    const matchesGenre =
      selectedGenres.length === 0 ||
      selectedGenres.includes(movie.genre);

    return matchesStatus && matchesGenre;
  });

  // Sortera endast filmer under "Har sett"
  if (activeFilter === "watched") {
    filteredMovies.sort((a, b) => {
      if (sortBy === "date") {
        return (b.watched_date ?? "").localeCompare(a.watched_date ?? "");
      }

      return (b.rating ?? -1) - (a.rating ?? -1);
    });
  }

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

        {/* Genrefilter för båda flikarna */}
        <section>
          <h3>Filtrera efter genre</h3>

          {genres.map((genre) => (
            <label key={genre}>
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre)}
                onChange={() => toggleGenre(genre)}
              />
              {genre}
            </label>
          ))}

          <button onClick={() => setSelectedGenres([])}>
            Rensa filter
          </button>
        </section>

        {/* Sortering endast för sedda filmer */}
        {activeFilter === "watched" && (
          <label>
            Sortera efter
            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value as "date" | "rating")
              }
            >
              <option value="date">Senast sedd</option>
              <option value="rating">Högsta betyg</option>
            </select>
          </label>
        )}

        <MovieList
          movies={filteredMovies}
          title={activeFilter === "watched" ? "Har sett" : "Vill se"}
          onDelete={deleteMovie}
        />
      </main>
    </>
  );
}

export default App;
