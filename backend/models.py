from sqlmodel import SQLModel, Field

class Song(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    filename: str
