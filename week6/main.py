from fastapi import FastAPI, Request, Form
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse, HTMLResponse
from fastapi.exceptions import RequestValidationError
import uvicorn
from typing import Annotated
from starlette.middleware.sessions import SessionMiddleware
from starlette.exceptions import HTTPException
from form import MemberForm, Message, deleteMessage, checkUsername
from werkzeug.security import generate_password_hash, check_password_hash
import os
from dotenv import load_dotenv
from sqlmodel import Session, select
from models import engine



STATIC_DIR = "static"
if not os.path.exists(STATIC_DIR):
    os.makedirs(STATIC_DIR)


load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY", "default_secret")


app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)

templates = Jinja2Templates(directory="templates")

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

# 設定首頁
@app.get('/', response_class=HTMLResponse)
async def index(request: Request):
    user = request.session.get("user")
    if user:
        request.session.pop("user", None)
        return templates.TemplateResponse("index.html", {
            "request": request
            })

    return templates.TemplateResponse("index.html", {
        "request": request
        })

@app.get('/member', response_class=HTMLResponse)
async def index(request: Request):
    user = request.session.get("user")
    username = request.session.get("username")
    member_id = request.session.get("id")
    messages = []
    if user:
        with Session(engine) as session:
            statement = select(Message, MemberForm).join(MemberForm, isouter=True).order_by(Message.time)
            messages = session.exec(statement).all()
        
        messages.reverse()

        return templates.TemplateResponse("member.html", {
        "request": request, 
        "user": user,
        "name": username,
        "id": member_id,
        "messages": messages,
        })

    else:
        return RedirectResponse(url="/", status_code=302)

@app.post("/signup")
async def register_form(
    request: Request,
    name: str = Form(...),
    username: str = Form(...),
    password: str = Form(...),
    ):
    
    password_hash = generate_password_hash(password)

    user_data =  MemberForm(
        name=name,
        username=username,
        password=password_hash,
    )

    if checkUsername(username):
        return RedirectResponse(url="/error?message=帳號重複", status_code=302)


    with Session(engine) as session:
        session.add(user_data)
        session.commit()
    

    request.session["register_key"] = True

    return RedirectResponse(url="/", status_code=302)

@app.post("/signin")
async def signup_form(
    request: Request,
    username: Annotated[str, Form()],
    password: Annotated[str, Form()]
    ):
    with Session(engine) as session:
        existing_user = session.exec(select(MemberForm).where(MemberForm.username == username)).all()


    if not existing_user:
        print("not existing_user")

        return RedirectResponse(url="/error?message=帳號或密碼輸入錯誤", status_code=302)
    
    print(existing_user[0])
    
    if check_password_hash(existing_user[0].password, password):
        print("Signup...")
        request.session["user"] = username
        request.session["id"] = existing_user[0].id
        request.session["username"] = existing_user[0].name
        return RedirectResponse(url="/member", status_code=302)
    else:
        return RedirectResponse(url="/error?message=帳號或密碼輸入錯誤", status_code=302)
        
@app.post("/createMessage")
async def content_form(
    request: Request,
    content: str = Form(...)
    ):

    message_content =  Message(
        member_id=int(request.session.get("id")),
        content=content
    )

    with Session(engine) as session:
        session.add(message_content)
        session.commit()

    return RedirectResponse(url="/member", status_code=302)

@app.get("/signout")
def signout(request: Request):
    request.session.clear()  # 清除 session
    return RedirectResponse(url="/", status_code=302)

@app.get("/success")
def signout(request: Request):
    register_key = request.session.get('register_key')
    if not register_key:
        return RedirectResponse(url="/", status_code=302) 
    
    request.session.pop("register_key", None)
    return templates.TemplateResponse("success.html", {
        "request": request, 
        })

@app.get("/error", response_class=HTMLResponse)
async def error_page(request: Request, message: str):
    return templates.TemplateResponse("error.html", {
        "request": request, 
        "message": message
        })

@app.post("/deleteMessage", response_class=HTMLResponse)
async def delete_button(request: Request, message_id: int = Form(...)):
    
    with Session(engine) as session:
        statement = select(Message, MemberForm).join(MemberForm, isouter=True).where(Message.id == message_id)
        result = session.exec(statement)
        message = result.one_or_none()
    
    if not message:
        return RedirectResponse(url="/member", status_code=302)
    
    user = request.session.get("user")
    
    if message[1].username != user:
        return RedirectResponse(url="/member", status_code=302) 
    deleteMessage(message_id)
    return RedirectResponse(url="/member", status_code=302) 

@app.exception_handler(HTTPException)
async def not_found(request: Request, exc: HTTPException):
    return RedirectResponse(url="/error?message=您造訪了錯誤的頁面", status_code=302)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    return RedirectResponse(url="/error?message=您造訪了錯誤的頁面", status_code=302)

if __name__ == '__main__':
    uvicorn.run("main:app", reload = True)