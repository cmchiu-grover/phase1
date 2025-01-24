# 所有 import 放這邊
import http.client
from bs4 import BeautifulSoup
from urllib.parse import urlparse
import csv

# 所有 function 放這邊
from module import getExPageUrl, addArticle

# 上一頁 <a class="btn wide">上頁<\a>
# 文章標題 div.class
# 文章推/噓 div.nrec span.h1 f3
# 文章日期 div.date

# 初始設定
or_url = "https://www.ptt.cc/bbs/Lottery/index.html"
parsed_url = urlparse(or_url)
host = parsed_url.netloc
path = parsed_url.path if parsed_url.path else "/"

# 建立 HTTP 連線並取得資料
connection = http.client.HTTPSConnection(host)
connection.request("GET", path)
response = connection.getresponse()

# 檢查回應的狀態碼
if response.status == 200:  # 200 表示成功
    html_content = response.read().decode('utf-8')  # 讀取回應內容，並以 UTF-8 解碼
    
    # 使用 BeautifulSoup 分析 HTML
    soup_target = BeautifulSoup(html_content, "html.parser")
    divs = soup_target.find_all("div")  # 找到所有 <div> 標籤
    
else:
    print(f"無法抓取資料，狀態碼：{response.status}")

# 關閉連線
connection.close()


articles = []


# 爬三頁內容
for i in range(3):
    articles.extend(addArticle(divs))
    print(articles)

    if i == 2:
        break
    else:
        next_page_url = getExPageUrl(soup_target)
        parsed_url = urlparse(next_page_url)
        host = parsed_url.netloc
        path = parsed_url.path if parsed_url.path else "/"

        # 修正 URL 的路徑
        if path.startswith("//"):
            path = path[1:]

        connection = http.client.HTTPSConnection(host)
        connection.request("GET", path)
        response = connection.getresponse()

        # 處理重定向 (301 或 302)
        if response.status in (301, 302):
            redirect_url = response.getheader("Location")  # 取得新的 URL
            redirect_url = "https://www.ptt.cc" + redirect_url
            print(f'舊的 URL: {next_page_url} 不可行')
            print(f"重定向到新的 URL: {redirect_url}")
            print(f'-----------------------------------------------------')

            # 重新解析新的 URL
            new_parsed_url = urlparse(redirect_url)
            new_host = new_parsed_url.netloc
            new_path = new_parsed_url.path

            # 建立新的連線，重新請求
            connection = http.client.HTTPSConnection(new_host)
            connection.request("GET", new_path)
            response = connection.getresponse()

        if response.status == 200:  # 200 表示成功
            html_content = response.read().decode('utf-8')  # 讀取回應內容，並以 UTF-8 解碼
            # print("成功抓取到 HTML 資料！")
    
            soup_target = BeautifulSoup(html_content, "html.parser")
            divs = soup_target.find_all("div")  # 找到所有 <div> 標籤

        else:
            print(f"無法抓取下一頁的資料，狀態碼：{response.status}")
            break
        
        connection.close()

# 開始輸出 csv
with open('articles.csv', 'w', newline='', encoding='utf-8') as csvfile:
    articles_csv = csv.writer(csvfile, delimiter=',')
    for i in range(len(articles)):
        articles_csv.writerow((articles[i].get('title'),
                              articles[i].get('num'),
                              articles[i].get('publish_time')))
