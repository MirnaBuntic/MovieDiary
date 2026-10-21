export interface Movie {
    id: number;
    title: string;
    genre: string;
    status: "watched" | "watchlist";
    watched_date: string | null;
    rating: number | null;
}