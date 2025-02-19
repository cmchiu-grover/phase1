from typing import Optional, Annotated, List
from pydantic import BaseModel, EmailStr, ConfigDict
from pydantic.functional_validators import BeforeValidator
from sqlmodel import Field, Session, SQLModel, create_engine, select, TIMESTAMP, text, Column
from datetime import datetime
from models import engine


class LoginForm(BaseModel):
    username: str
    password: str

class MemberForm(SQLModel, table=True):
    __tablename__ = 'member'

    id: int = Field(default=None, primary_key=True)
    name: str = Field(max_length=64, index=False, nullable=False)
    username: str = Field(max_length=255, index=True, nullable=False)
    password: str = Field(..., nullable=False)
    time: datetime = Field(sa_column=Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=text("CURRENT_TIMESTAMP"),
    ))

    __table_args__ = {'extend_existing': True}


class Message(SQLModel, table=True):
    __tablename__ = 'message'

    # columns
    id: int = Field(default=None, primary_key=True)
    member_id: str = Field(foreign_key="member.id", index=True, nullable=False)
    content: str = Field(max_length=255, unique=False, nullable=False)
    like_count: int = Field(default=0)  # 預設值為 1
    time: datetime = Field(sa_column=Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=text("CURRENT_TIMESTAMP"),
    ))

    __table_args__ = {'extend_existing': True}

def deleteMessage(message_id, member_id):
    message_id = int(message_id)
    member_id = int(member_id)

    with Session(engine) as session:
        statement = select(Message).where(Message.id == message_id)
        results = session.exec(statement)
        message = results.one()
        if message.member_id == member_id:
            session.delete(message)
            session.commit()
        else:
            return

def checkUsername(new_username):
    try:
        with Session(engine) as session:
            statement = select(MemberForm).where(MemberForm.username == new_username)
            results = session.exec(statement)
            existing_username = results.one()

        return existing_username
    except:
        return