import os
from dotenv import load_dotenv
from sqlmodel import SQLModel, create_engine


load_dotenv()  # 讀取 .env 檔案

MySQL_DB_URL = os.getenv("MySQL_DB_URL")
engine = create_engine(MySQL_DB_URL)

# 初始化資料表
SQLModel.metadata.create_all(engine)


