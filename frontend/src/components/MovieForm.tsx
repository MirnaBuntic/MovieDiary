import { useState } from "react";

interface MovieFormProps {
  onAdd: (
    title: string,
    genre: string,
    status: "watched" | "watchlist",
    watched_date: string | null,
    rating: number | null
  ) => void;
}

function MovieForm({ onAdd }: MovieFormProps) {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("Action");
  const [status, setStatus] = useState<"watched" | "watchlist">("watched");
  const [watchedDate, setWatchedDate] = useState("");
  const [rating, setRating] = useState("");

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    onAdd(
      title,
      genre,
      status,
      status === "watched" ? watchedDate || null : null,
      status === "watched" && rating !== "" ? Number(rating) : null
    );

    setTitle("");
    setWatchedDate("");
    setRating("");
  }

  return (
    <form className="add-movie-form" onSubmit={handleSubmit}>
      <h2>Lägg till en film</h2>

      <label>
        Titel
        <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
        />
      </label>

      <label>
        Genre
        <select
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
        >
            <option value="Action">Action</option>
            <option value="Komedi">Komedi</option>
            <option value="Drama">Drama</option>
            <option value="Skräck">Skräck</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Thriller">Thriller</option>
            <option value="Animation">Animation</option>
        </select>
      </label>

      <label>
        Status
        <select
            value={status}
            onChange={(event) =>
            setStatus(event.target.value as "watched" | "watchlist")
            }
        >
            <option value="watched">Har sett</option>
            <option value="watchlist">Vill se</option>
        </select>
      </label>

      {status === "watched" && (
        <>
          <label>
            Datum
            <input
                type="date"
                value={watchedDate}
                onChange={(event) => setWatchedDate(event.target.value)}
            />
          </label>

          <label>
            Betyg (0-10)
            <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={rating}
                onChange={(event) => setRating(event.target.value)}
            />
          </label>
        </>
      )}

      <button type="submit">Lägg till film</button>
    </form>
  )
}

export default MovieForm;
