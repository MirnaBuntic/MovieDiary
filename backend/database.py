
import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).parent / "movies.db"


def create_database():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS movies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            genre TEXT NOT NULL,
            status TEXT NOT NULL
                CHECK(status IN ('watched', 'watchlist')),
            watched_date TEXT,
            rating INTEGER
                CHECK(rating BETWEEN 1 AND 10)
        )
    """)

    conn.commit()
    conn.close()
