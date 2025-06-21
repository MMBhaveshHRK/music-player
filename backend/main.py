from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlmodel import SQLModel, Session, create_engine, select
from pathlib import Path
from models import Song
import os
import uvicorn

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://mmbhaveshhrk.github.io"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MUSIC_DIR = Path("static/music")
app.mount("/music", StaticFiles(directory=MUSIC_DIR), name="music")

engine = create_engine("sqlite:///songs.db")

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

@app.get("/api/songs")
def get_songs():
    with Session(engine) as session:
        songs = session.exec(select(Song)).all()
        return [
            {
                "name": song.name,
                "src": f"https://music-player-backend-ap1x.onrender.com/music/{song.filename}"
            }
            for song in songs
        ]

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
