from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse
import uvicorn
from typing import Annotated
from starlette.middleware.sessions import SessionMiddleware
from starlette.exceptions import HTTPException


app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key="w5a:mB7t6WZNCw.")

templates = Jinja2Templates(directory="templates")

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/", response_class=HTMLResponse)
async def home_page(request: Request):
    page_name = "歡迎光臨，請輸入帳號密碼"
    return templates.TemplateResponse("index.html", {
        "request": request, 
        "page_name":page_name
        })


@app.post("/signin")
def signin(request: Request, username: Annotated[str, Form()], password: Annotated[str, Form()]):
    members_db = {"username": "test", "password":"test"}
    
    if username == '' or password == '':
        return RedirectResponse(url="/error?message=請輸入帳號或密碼", status_code=303)
    
    elif (username == members_db.get("username")) & (password == members_db.get("password")):
        request.session["user"] = username
        return RedirectResponse(url="/member", status_code=303)
    
    else:
        return RedirectResponse(url="/error?message=帳號、或密碼輸入錯誤", status_code=303)   


@app.get("/signin")
def signin_redirect():
    return RedirectResponse(url="/")


@app.get("/member")
async def member_page(request: Request):
    page_name = "歡迎光臨，這是會員頁"
    user = request.session.get("user")
    if not user:
        return RedirectResponse(url="/")  
    return templates.TemplateResponse("member.html", {
        "request": request, 
        "page_name": page_name
        })


@app.get("/signout")
def signout(request: Request):
    request.session.pop("user", None)  
    return RedirectResponse(url="/")


@app.get("/error", response_class=HTMLResponse)
async def error_page(request: Request, message: str):
    page_name = "失敗頁面"
    return templates.TemplateResponse("error.html", {
        "request": request, 
        "message": message, 
        "page_name": page_name
        })


@app.get("/square/{num}", response_class=HTMLResponse)
async def cul_page(request: Request, num: str):
    try:
        num = int(num)
        if num <= 0:
            return RedirectResponse(url="/error?message=請輸入正整數", status_code=303)
    except:
        return RedirectResponse(url="/error?message=請輸入正整數", status_code=303)
    
    page_name = "正整數平方計算結果"
    square_ans = num ** 2
    return templates.TemplateResponse("square.html", {
        "request": request,
        "page_name": page_name,
        "square_ans": square_ans
    })


@app.exception_handler(HTTPException)
async def not_found(request: Request, exc: HTTPException):
    if exc.status_code == 404:
        page_name = "錯誤頁面"
        message = "您造訪了錯誤的頁面（404 not found）"
        return templates.TemplateResponse("404.html", {
            "request": request, 
            "page_name": page_name, 
            "message": message}, status_code=404)
    
    return HTMLResponse(content="發生錯誤", status_code=exc.status_code)

if __name__ == '__main__':
    uvicorn.run("main:app", reload = True)