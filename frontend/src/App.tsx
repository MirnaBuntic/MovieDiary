import { useState } from "react";
import MovieList from "./components/MovieList";
import type { Movie } from "./types/Movie";

const movies: Movie[] = [
  {
    id:1,
    title: "Spider-man: homecoming",
    genre: "Action",
    status: "watched",
    watchedDate: "2026-07-7",
    rating: 7,
  },
  {
    id:2,
    title: "Limitless",
    genre: "Thriller",
    status: "watched",
    watchedDate: "2026-04-23",
    rating: 8,
  },
  {
    id:3,
    title: "Scooby-Doo",
    genre: "Animation",
    status: "watchlist",
    watchedDate: null,
    rating: null,
  }
]

function App() {
  const [activeFilter, setActiveFilter] = useState<
    "watched" | "watchlist"
  >("watched")

  const filteredMovies = movies.filter(
    (movie) => movie.status === activeFilter
  )

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
      />
    </main>
  )
}

export default App;