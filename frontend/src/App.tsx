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
  }
]

function App() {
  return (
    <main>
      <h1>MovieDiary</h1>
      <p>Min filmkatalog</p>

      <MovieList movies={movies}/>
    </main>
  )
}

export default App;