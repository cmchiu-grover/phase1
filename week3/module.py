# 所有 import 放這邊
import http.client
from bs4 import BeautifulSoup
from urllib.parse import urlparse
import locale
from datetime import datetime

# 所有 function 放這邊
def getArticleDate(url):
    # 連線設定
    url = "https://www.ptt.cc/" + url
    parsed_url = urlparse(url)
    host = parsed_url.netloc
    path = parsed_url.path if parsed_url.path else "/"

    # 建立 HTTP 連線並取得資料
    connection = http.client.HTTPSConnection(host)
    connection.request("GET", path)
    response = connection.getresponse()

# 處理重定向 (301 或 302)
    if response.status in (301, 302):  # 如果是重定向狀態碼
        redirect_url = response.getheader("Location")  # 取得新的 URL
        redirect_url = "https://www.ptt.cc" + redirect_url
        print(f'舊的 URL: {url} 不可行')
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


    # 檢查回應的狀態碼
    if response.status == 200:  # 200 表示成功
        html_content = response.read().decode('utf-8')  # 讀取回應內容，並以 UTF-8 解碼
        # print("成功抓取到 HTML 資料！")
        
        # 使用 BeautifulSoup 分析 HTML
        soup_target = BeautifulSoup(html_content, "html.parser")
        # 找到所有 <spans> 標籤
        spans = (soup_target.find_all("span", {"class":"article-meta-value"}))  
        
    else:
        print(f"無法抓取資料，狀態碼：{response.status}")
    
    # 關閉連線
    connection.close()


    # 分析網頁後，只抓第4個 <span>
    counter = 0
    for sapn in spans:
        if counter == 3:
            date = (sapn.text)
            # print(date)
            return date
        else:
            counter += 1

def getExPageUrl(soup_target):
    achors = (soup_target.find_all("a", {"class":"btn wide"}))
    for a in achors:
        if a.text =="‹ 上頁":
            exPageUrl = "https://www.ptt.cc/" + a["href"]
            print(exPageUrl)
            return exPageUrl
    
def getDateTime(item):
    return item.get("publish_time")

def createDict(title, num, publish_time, article_num):
    articleDict = {}
    articleDict.update({
        'title': title,
        'num': num,
        'publish_time': publish_time,
        'article_num': article_num
        })
    return articleDict

def getArticleNumber(item):
    return item.get("article_num")

def convertArticleDate(date):
    # 設置為英文環境
    locale.setlocale(locale.LC_TIME, 'en_US.UTF-8')

    # 使用 strptime 方法轉換字串為 datetime 物件
    time_obj = datetime.strptime(date, "%a %b %d %H:%M:%S %Y")

    
    # 顯示結果
    return time_obj

def addArticle(divs):
    article_list = []
    counter = 0
    for div in divs:
        try:
            if div.attrs.get('class')[0] == 'r-ent':
                title = div.find("div", {"class":"title"}).text.replace("\n","")
                title = title.replace("\t","")
                # print(title)
                num_count = (div.find("div", {"class":"nrec"}).text)
                if num_count == '':
                    num_count = 0
                else:
                    num_count = int(num_count)
                
                # print(num_count)
                try:
                    link = div.find("a")["href"]
                    date = getArticleDate(link)
                    # date = convertArticleDate(date)
                    # print(date)
                except:
                    link = ''
                    date = ''

                
                article_list.append(createDict(title, num_count, date, counter))
                counter += 1
            elif div.attrs.get('class')[0] == 'r-list-sep':
                break
            else:
                pass
        except:
            pass
    article_list.sort(key=getArticleNumber, reverse=True)
    return article_list
