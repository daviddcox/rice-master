from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
  pass
db = SQLAlchemy(model_class=Base)

class User(db.Model):
  id: Mapped[int] = mapped_column(primary_key=True)
  username: Mapped[str] = mapped_column(unique=True)
  password: Mapped[str]

  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username
    }