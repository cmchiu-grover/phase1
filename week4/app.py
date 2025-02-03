from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse
import uvicorn

app = FastAPI()

templates = Jinja2Templates(directory="templates")

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/signin")
def signin(username: str = Form(...), password: str = Form(...)):
    return RedirectResponse(url="/member", status_code=303)
    

@app.get("/member")
def member_page(request: Request):
    return templates.TemplateResponse("member.html", {"request": request})

if __name__ == '__main__':
    uvicorn.run("app:app", reload = True)