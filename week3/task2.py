# 所有 import 放這邊
import requests
from bs4 import BeautifulSoup
import locale
from datetime import datetime
import csv

# 上一頁 <a class="btn wide">上頁<\a>
# 文章標題 div.class
# 文章推/噓 div.nrec span.h1 f3
# 文章日期 div.date

# 所有 function 放這邊
def getArticleDate(url):
    url = "https://www.ptt.cc/" + url
    re = requests.get(url)
    soup_target = BeautifulSoup(re.text, "html.parser")
    spans = (soup_target.find_all("span", {"class":"article-meta-value"}))
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

# 初始設定
or_url = "https://www.ptt.cc/bbs/Lottery/index.html"
re = requests.get(or_url)
soup_target = BeautifulSoup(re.text, "html.parser")
divs = soup_target.find_all("div")


articles = []

# 爬三頁內容
for i in range(3):

    # 開始爬蟲
    articles.extend(addArticle(divs))
    # print(articles)

    # 如果爬到第三頁，就不要再爬
    if i == 2:
        break
    else:
        # 取得下一頁的網址
        url = getExPageUrl(soup_target)
        re = requests.get(url)
        soup_target = BeautifulSoup(re.text, "html.parser")
        divs = soup_target.find_all("div")

# 開始輸出 csv
with open('articles.csv', 'w', newline='', encoding='utf-8') as csvfile:
    articles_csv = csv.writer(csvfile, delimiter=',')
    for i in range(len(articles)):
        articles_csv.writerow((articles[i].get('title'),
                              articles[i].get('num'),
                              articles[i].get('publish_time')))
