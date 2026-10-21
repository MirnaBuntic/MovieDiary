export interface Movie {
    id: number;
    title: string;
    genre: string;
    status: "watched" | "watchlist";
    watchedDate: string | null;
    rating: number | null;
}