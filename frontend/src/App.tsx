import { useEffect, useState } from "react";
import MovieList from "./components/MovieList";
import MovieForm from "./components/MovieForm";
import MovieFilter from "./components/MovieFilter";
import MovieSort from "./components/MovieSort";
import type { Movie } from "./types/Movie";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [activeFilter, setActiveFilter] = useState<"watched" | "watchlist">("watched");
  const [showForm, setShowForm] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"date" | "rating">("date");

  //Hämta alla filmer när sidan öppnas
  useEffect(() => {
    //async för att vänta på api utan att blockera webbläsaren
    async function getMovies() {
      const response = await fetch("http://127.0.0.1:8000/movies");
      const data: Movie[] = await response.json();

      setMovies(data);
    }

    getMovies();
  }, []);

  //Lägg till en film
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
      //Skapar ett js objekt som omvandlas till json
      body: JSON.stringify({
        title,
        genre,
        status,
        watched_date,
        rating,
      }),
    })

    //Om ok omvandlas svaret till ett js-objekt och sparas i variabeln newMovie och följer Movie interfacen
    if (response.ok) {
      const newMovie: Movie = await response.json();

      //Uppdaterar filmlistan genom att kopiera de gamla filmerna och skapa en ny array
      setMovies((previousMovies) => [...previousMovies, newMovie]);
      setActiveFilter(status);
      setShowForm(false);
    }
  }

  //Ta bort en film
  async function deleteMovie(id: number) {
    const response = await fetch(`http://127.0.0.1:8000/movies/${id}`, {
      method: "DELETE",
    })

    //Om ok skapas en ny array med uppdaterade filmer
    if (response.ok) {
      const data = await response.json();

      console.log(data.message)

      setMovies((previousMovies) =>
        previousMovies.filter((movie) => movie.id !== id)
      )
    }
  }

  //Markera eller avmarkera en genre
  function toggleGenre(genre: string) {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(
        selectedGenres.filter((item) => item !== genre)
      );
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  }

  //Filtrera efter status och valda genrer
  const filteredMovies = movies.filter((movie) => {
    const matchesStatus = movie.status === activeFilter;

    const matchesGenre =
      selectedGenres.length === 0 ||
      selectedGenres.includes(movie.genre);

    return matchesStatus && matchesGenre;
  })

  //Sortera bara filmer under Har sett
  if (activeFilter === "watched") {
    filteredMovies.sort((a, b) => {
      if (sortBy === "date") {
        return (b.watched_date ?? "").localeCompare(a.watched_date ?? "");
      }

      //-1 För att filmer utan betyg ska hamna längst ner
      return (b.rating ?? -1) - (a.rating ?? -1);
    })
  }

  return (
    <>
      <header>
        <h1>MovieDiary</h1>
      </header>

      <main>
        <button
          className={`add-movie-btn ${showForm ? "cancel-btn" : ""}`}
          onClick={() => setShowForm(!showForm)}>
          {showForm ? "Avbryt" : "+ Lägg till ny film"}
        </button>

        {showForm && <MovieForm onAdd={addMovie} />}

        <nav>
          <button
            className={activeFilter === "watched" ? "active" : ""}
            onClick={() => setActiveFilter("watched")}
          >
            Har sett
          </button>

          <button
            className={activeFilter === "watchlist" ? "active" : ""}
            onClick={() => setActiveFilter("watchlist")}
          >
            Vill se
          </button>
        </nav>

        <div className="filter-container">
          {/* Sortering visas bara under "Har sett" */}
          {activeFilter === "watched" && (
            <MovieSort
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          )}

          {/* Genrefilter visas på båda flikarna */}
          <MovieFilter
            selectedGenres={selectedGenres}
            onToggleGenre={toggleGenre}
            onClear={() => setSelectedGenres([])}
          />
        </div>
       

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
