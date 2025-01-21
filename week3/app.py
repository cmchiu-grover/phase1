# 抓取 url 資料 - spot
import urllib.request
response_spot = urllib.request.urlopen('https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-1')

# 將 url 資料轉為 JSON
import json
data_spot = json.load(response_spot)
data_spot_dict = data_spot.get('data')
data_spot_results = data_spot_dict.get('results')

# 抓取 url 資料 - mrt
response_mrt = urllib.request.urlopen('https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-2')

# 將 url 資料轉為 JSON
data_mrt = json.load(response_mrt)
data_mrt_dict = data_mrt.get('data')

# 記錄 spot 在哪一站
for i in range(len(data_spot_results)):
    counter = 0
    for j in range(len(data_mrt_dict)):
        # 用 SERIAL_NO 串接資料
        if (data_mrt_dict[j].get('SERIAL_NO')) == data_spot_results[i].get('SERIAL_NO'):
            data_spot_results[i].update({'MRT':data_mrt_dict[j].get('MRT')})
            data_spot_results[i].update({'address':data_mrt_dict[j].get('address')})
            break
        else:
            counter += 1

        if counter == len(data_mrt_dict):
            data_spot_results[i].update({'MRT':"Unknown"})
            data_spot_results[i].update({'address':"Unknown."})


# 將 spot 所需資料存成 csv 檔
import csv
with open('spot.csv', 'w', newline='', encoding='utf-8') as csvfile:
    spot_writer = csv.writer(csvfile, delimiter=',')
    for i in range(len(data_spot_results)):
        spot_writer.writerow((data_spot_results[i].get('stitle'),
                              data_spot_results[i].get('address')[5:8],
                              data_spot_results[i].get('longitude'),
                              data_spot_results[i].get('latitude'),
                              'https' + data_spot_results[i].get('filelist').split('https')[1]))

# 彙整行政區與景點
dist_spot = {}
for i in range(len(data_mrt_dict)):
    if data_spot_results[i].get('MRT') in dist_spot:
        pass
    else:
        dist_spot.update({data_spot_results[i].get('MRT'):[]})

    dist_spot.get(data_spot_results[i].get('MRT')).append(data_spot_results[i].get('stitle'))
    
# 將捷運站與景點資料存成 csv 檔
with open('mrt.csv', 'w', newline='', encoding='utf-8') as file:
    mrt_writer = csv.writer(file)
    for key, values in dist_spot.items():
       mrt_writer.writerow([key] + values)