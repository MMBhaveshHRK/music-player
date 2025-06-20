from sqlmodel import SQLModel, Session, create_engine, select
from models import Song
from pathlib import Path

MUSIC_DIR = Path("static/music")
engine = create_engine("sqlite:///songs.db")

def populate():
    SQLModel.metadata.create_all(engine)

    with Session(engine) as session:
        for file in MUSIC_DIR.glob("*.mp3"):
            # Check if song already exists
            existing = session.exec(select(Song).where(Song.filename == file.name)).first()
            if not existing:
                song = Song(name=file.stem.replace("-", " ").title(), filename=file.name)
                session.add(song)
        session.commit()
        print("✅ Songs added to DB without duplicates.")

if __name__ == "__main__":
    populate()
