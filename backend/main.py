from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlmodel import SQLModel, Session, create_engine, select
from pathlib import Path
from models import Song
import os
import uvicorn  # Needed for dynamic port launch

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # You can add your Render frontend URL here too
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
                "src": f"/music/{song.filename}"  # ✅ Relative path (will use current domain)
            }
            for song in songs
        ]

# ✅ Add this block to support Render dynamic port binding
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
