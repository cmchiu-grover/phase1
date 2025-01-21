
# app 1

def find_and_print(messages, current_station):

    # 設定各站點 id
    green_line_id = {"Songshan":0,
    "Nanjing Sanmin":1,
    "Taipei Arena":2,
    "Nanjing Fuxing":3,
    "Songjiang Nanjing":4,
    "Zhongshan":5,
    "Beimen":6,
    "Ximen":7,
    "Xiaonanmen":8,
    "Chiang Kai-Shek Memorial Hall":9,
    "Guting":10,
    "Taipower Building":11,
    "Gongguan":12,
    "Wanlong":13,
    "Jingmei":14,
    "Dapinglin":15,
    "Qizhang":16,
    "Xiaobitan":17,
    "Xindian City Hall":18,
    "Xindian":19
    }

    # 設定各站點間的距離
    green_line_distance = {"Songshan":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,17,18],
    "Nanjing Sanmin":[1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,16,17],
    "Taipei Arena":[2,1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,15,16],
    "Nanjing Fuxing":[3,2,1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,14,15],
    "Songjiang Nanjing":[4,3,2,1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,13,14],
    "Zhongshan":[5,4,3,2,1,0,1,2,3,4,5,6,7,8,9,10,11,12,12,13],
    "Beimen":[6,5,4,3,2,1,0,1,2,3,4,5,6,7,8,9,10,11,11,12],
    "Ximen":[7,6,5,4,3,2,1,0,1,2,3,4,5,6,7,8,9,10,10,11],
    "Xiaonanmen":[8,7,6,5,4,3,2,1,0,1,2,3,4,5,6,7,8,9,9,10],
    "Chiang Kai-Shek Memorial Hall":[9,8,7,6,5,4,3,2,1,0,1,2,3,4,5,6,7,8,8,9],
    "Guting":[10,9,8,7,6,5,4,3,2,1,0,1,2,3,4,5,6,7,7,8],
    "Taipower Building":[11,10,9,8,7,6,5,4,3,2,1,0,1,2,3,4,5,6,6,7],
    "Gongguan":[12,11,10,9,8,7,6,5,4,3,2,1,0,1,2,3,4,5,5,6],
    "Wanlong":[13,12,11,10,9,8,7,6,5,4,3,2,1,0,1,2,3,4,4,5],
    "Jingmei":[14,13,12,11,10,9,8,7,6,5,4,3,2,1,0,1,2,3,3,4],
    "Dapinglin":[15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0,1,2,2,3],
    "Qizhang":[16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0,1,1,2],
    "Xiaobitan":[17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0,2,3],
    "Xindian City Hall":[17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,2,0,1],
    "Xindian":[18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,3,1,0]
        }
        
    # 創建字典，紀錄 messages 中，人名與所在站點
    name_station ={}
    for name in messages:
        temp_message = messages.get(name)
        for station in green_line_id:
            if station in temp_message:
                name_station.update({name:station})
                break
    
    # 查詢各人名與其所在站點，距離 current_station 的距離 
    name_station_distance = {}
    for key in name_station:
        # 從 green_line_id 取得車站 id 
        temp_station_id = green_line_id.get(name_station.get(key)) 

        # 取得 current_station 與該人位於的站，間的距離
        temp_distance = green_line_distance.get(current_station)[temp_station_id]

        # 紀錄距離
        name_station_distance.update({key:temp_distance})

    # 開始找距離最近的       
    min_number_name = []
    min_number = name_station_distance.get(list(name_station_distance.keys())[0])
    min_number_name.append(list(name_station_distance.keys())[0])
    for j in range(1, len(name_station_distance)):
        if name_station_distance.get(list(name_station_distance.keys())[j]) < min_number:
            min_number = name_station_distance.get(list(name_station_distance.keys())[j])
            min_number_name.clear()
            min_number_name.append(list(name_station_distance.keys())[j])
        elif name_station_distance.get(list(name_station_distance.keys())[j]) == min_number:
            min_number_name.append(list(name_station_distance.keys())[j])
        else:
            continue

    for name in min_number_name:
        print(name)


messages={ 
 "Leslie":"I'm at home near Xiaobitan station.", 
 "Bob":"I'm at Ximen MRT station.", 
 "Mary":"I have a drink near Jingmei MRT station.", 
 "Copper":"I just saw a concert at Taipei Arena.", 
 "Vivian":"I'm at Xindian station waiting for you." 
} 
find_and_print(messages, "Wanlong") # print Mary 
find_and_print(messages, "Songshan") # print Copper 
find_and_print(messages, "Qizhang") # print Leslie 
find_and_print(messages, "Ximen") # print Bob 
find_and_print(messages, "Xindian City Hall") # print Vivian



# ============================================================

# app 2


# your code here, maybe 
def get_name(e):
    return e["name"]

def get_rate(e):
    return e["rate"]

def get_price(e):
    return e["price"]

def book(consultants, hour, duration, criteria):

    cslt_dict_len = len(consultants)
    cslt_dict_counter = 0
    for i in range(cslt_dict_len):
        if list(consultants[i])[0] == "name":
            cslt_dict_counter += 1
        else:
            break
    
    
    if cslt_dict_len == cslt_dict_counter:
        # 第一次執行時使用
        # 創建排行
        consultants_rate_rank = consultants.copy()
        consultants_price_rank = consultants.copy()

        consultants_rate_rank.sort(key=get_rate, reverse = True)
        consultants_price_rank.sort(key=get_price, reverse = False)

        cslt_r_r = []
        cslt_p_r = []

        for i in range(len(consultants_rate_rank)):
            cslt_r_r.append(get_name(consultants_rate_rank[i]))
            cslt_p_r.append(get_name(consultants_price_rank[i]))


        # 統一有空的時間
        
        # 看有多少顧問，設定時間表
        
        name_id = {}
        for i in range(cslt_dict_len):
            consultants.append({get_name(consultants[i]):[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}) 
            name_id.update({get_name(consultants[i]) : cslt_dict_len})
            cslt_dict_len += 1
        
        consultants.append(name_id)
        consultants.insert(cslt_dict_len, cslt_r_r)
        consultants.insert(cslt_dict_len + 1, cslt_p_r)

        # consultants 最後一項為 consu. 的 schedule 的 index
        # consultants 倒數第二項為 price rank
        # consultants 倒數第三項為 rate rank
        
    
    hour_end = hour + duration
    if criteria == "price":
        counter = 0
        while counter < len(consultants[-2]):
            temp_consultant = consultants[-2][counter]
            if (0 in consultants[consultants[-1].get(temp_consultant)].get(temp_consultant)[hour:hour_end]) == False:
                for i in range(hour,hour_end):
                    consultants[consultants[-1].get(temp_consultant)].get(temp_consultant)[i] = 0
                break
            else:
                counter += 1
                
        
        if counter == len(consultants[-2]):
            print("No Service")
        else:
            print(temp_consultant)

    elif criteria == "rate":
        counter = 0
        while counter < len(consultants[-3]):
            temp_consultant = consultants[-3][counter]
            if (0 in consultants[consultants[-1].get(temp_consultant)].get(temp_consultant)[hour:hour_end]) == False:
                for i in range(hour,hour_end):
                    consultants[consultants[-1].get(temp_consultant)].get(temp_consultant)[i] = 0
                break
            else:
                counter += 1
                
        
        if counter == len(consultants[-3]):
            print("No Service")
        else:
            print(temp_consultant)

    else:
        print("criteria 輸入錯誤")



 # your code here 


consultants=[ 
 {"name":"John", "rate":4.5, "price":1000}, 
{"name":"Bob", "rate":3, "price":1200}, 
{"name":"Jenny", "rate":3.8, "price":800} 
] 
book(consultants, 15, 1, "price") # Jenny 
book(consultants, 11, 2, "price") # Jenny 
book(consultants, 10, 2, "price") # John 
book(consultants, 20, 2, "rate") # John 
book(consultants, 11, 1, "rate") # Bob 
book(consultants, 11, 2, "rate") # No Service 
book(consultants, 14, 3, "price") # John 

# ============================================================

# app 3

def func(*data):
    middle_name_data = []
    for name in data:
        if len(name) > 3:
            middle_name_data.append(name[2])
        else:
            middle_name_data.append(name[1])

    # print(middle_name_data)
    temp_mid_name = middle_name_data.copy()

    counter = 0
    fasle_counter = 0
    for i in range(len(middle_name_data)):
        del temp_mid_name[i]
        if middle_name_data[i] in temp_mid_name:
            temp_mid_name.insert(i, middle_name_data[i])
            fasle_counter += 1
        else:
            counter = i
            break

    if fasle_counter == len(data):
        print("沒有")
    else:
        print(data[counter])  






 # your code here 
func("彭大牆", "陳王明雅", "吳明") # print 彭大牆 
func("郭靜雅", "王立強", "郭林靜宜", "郭立恆", "林花花") # print 林花花 
func("郭宣雅", "林靜宜", "郭宣恆", "林靜花") # print 沒有 
func("郭宣雅", "夏曼藍波安", "郭宣恆") # print 夏曼藍波安

# ============================================================

# app 4

def get_number(index):
    ans = 0
    for i in range(1, index + 1):
        if i % 3 == 0:
            ans -= 1
        else:
            ans += 4

    print(ans)
 # your code here 
get_number(1) # print 4 
get_number(5) # print 15 
get_number(10) # print 25 
get_number(30) # print 70