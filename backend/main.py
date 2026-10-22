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


#Anropar funktionen så att databastabellen finns innan api börjar användas
create_database()


#Validera information som skickas till API:et för att begränsa felaktig input
class Movie(BaseModel):
    title: str
    genre: str
    status: Literal["watched", "watchlist"]
    watched_date: str | None = None
    rating: float | None = Field(default=None, ge=0, le=10)


#Endpoints

#Hämtar alla filmer
@app.get("/movies")
def get_movies():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row #Retunerar row-object som gör det mer översiktligt istället för tuples

    try:
        movies = conn.execute(
            "SELECT * FROM movies"
        ).fetchall()

        return [dict(movie) for movie in movies]

    #Databasanslutningarna stängs även om de skulle misslyckas
    finally:
        conn.close()


#Lägger till en film
@app.post("/movies")
def add_movie(movie: Movie):
    conn = sqlite3.connect(DB_PATH)

    try:
        # ? är en platshållare som skickar användarens värde separat från själva sql-koden
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


#Tar bort en film
@app.delete("/movies/{movie_id}")
def delete_movie(movie_id: int):
    conn = sqlite3.connect(DB_PATH)

    try:
        conn.execute(
            "DELETE FROM movies WHERE id = ?",
            (movie_id,)
        )

        conn.commit()

        return {"message": "Borttagning genomförd"}

    finally:
        conn.close()
