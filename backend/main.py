import sqlite3
from typing import Literal
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from database import create_database, DB_PATH


#Skapa FastAPI-applikationen
app = FastAPI()

#Tillåt React att kommunicera med backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_methods=["GET", "POST", "DELETE"],
    allow_headers=["*"],
)


#Skapa databastabellen om den inte redan finns
create_database()


#Validera information som skickas till API:et
class Movie(BaseModel):
    title: str
    genre: str
    status: Literal["watched", "watchlist"]
    watched_date: str | None = None
    rating: float | None = Field(default=None, ge=0, le=10)


#Hämtar alla filmer
@app.get("/movies")
def get_movies():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row

    try:
        movies = conn.execute(
            "SELECT * FROM movies"
        ).fetchall()

        return [dict(movie) for movie in movies]

    finally:
        conn.close()


#Lägger till en film
@app.post("/movies")
def add_movie(movie: Movie):
    conn = sqlite3.connect(DB_PATH)

    try:
        cursor = conn.execute("""
            INSERT INTO movies (
                title, genre, status, watched_date, rating
            )
            VALUES (?, ?, ?, ?, ?)
        """, (
            movie.title,
            movie.genre,
            movie.status,
            movie.watched_date,
            movie.rating
        ))

        conn.commit()

        movie_id = cursor.lastrowid

        return {
            "id": movie_id,
            "title": movie.title,
            "genre": movie.genre,
            "status": movie.status,
            "watched_date": movie.watched_date,
            "rating": movie.rating  
        }

    finally:
        conn.close()



