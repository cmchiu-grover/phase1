// app1
function findAndPrint(messages, currentStation) {
  // your code here
  let green_line = {
    green_line_id: [
      { station: "Songshan", id: 0 },
      { station: "Nanjing Sanmin", id: 1 },
      { station: "Taipei Arena", id: 2 },
      { station: "Nanjing Fuxing", id: 3 },
      { station: "Songjiang Nanjing", id: 4 },
      { station: "Zhongshan", id: 5 },
      { station: "Beimen", id: 6 },
      { station: "Ximen", id: 7 },
      { station: "Xiaonanmen", id: 8 },
      { station: "Chiang Kai-Shek Memorial Hall", id: 9 },
      { station: "Guting", id: 10 },
      { station: "Taipower Building", id: 11 },
      { station: "Gongguan", id: 12 },
      { station: "Wanlong", id: 13 },
      { station: "Jingmei", id: 14 },
      { station: "Dapinglin", id: 15 },
      { station: "Qizhang", id: 16 },
      { station: "Xiaobitan", id: 17 },
      { station: "Xindian City Hall", id: 18 },
      { station: "Xindian", id: 19 },
    ],
    green_line_distance: [
      {
        station: "Songshan",
        distance: [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 17, 18,
        ],
      },
      {
        station: "Nanjing Sanmin",
        distance: [
          1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 16, 17,
        ],
      },
      {
        station: "Taipei Arena",
        distance: [
          2, 1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 15, 16,
        ],
      },
      {
        station: "Nanjing Fuxing",
        distance: [
          3, 2, 1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 14, 15,
        ],
      },
      {
        station: "Songjiang Nanjing",
        distance: [
          4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 13, 14,
        ],
      },
      {
        station: "Zhongshan",
        distance: [
          5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13,
        ],
      },
      {
        station: "Beimen",
        distance: [
          6, 5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 12,
        ],
      },
      {
        station: "Ximen",
        distance: [
          7, 6, 5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11,
        ],
      },
      {
        station: "Xiaonanmen",
        distance: [8, 7, 6, 5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 10],
      },
      {
        station: "Chiang Kai-Shek Memorial Hall",
        distance: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 8, 9],
      },
      {
        station: "Guting",
        distance: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 6, 7, 7, 8],
      },
      {
        station: "Taipower Building",
        distance: [
          11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 6, 6, 7,
        ],
      },
      {
        station: "Gongguan",
        distance: [
          12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 5, 6,
        ],
      },
      {
        station: "Wanlong",
        distance: [
          13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 4, 5,
        ],
      },
      {
        station: "Jingmei",
        distance: [
          14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 1, 2, 3, 3, 4,
        ],
      },
      {
        station: "Dapinglin",
        distance: [
          15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 1, 2, 2, 3,
        ],
      },
      {
        station: "Qizhang",
        distance: [
          16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 1, 1, 2,
        ],
      },
      {
        station: "Xiaobitan",
        distance: [
          17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 2, 3,
        ],
      },
      {
        station: "Xindian City Hall",
        distance: [
          17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 2, 0, 1,
        ],
      },
      {
        station: "Xindian",
        distance: [
          18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 3, 1, 0,
        ],
      },
    ],
  };

  // 創建字典，紀錄 messages 中，人名與所在站點
  let name_station = {};

  for (name in messages) {
    let i = 0;
    let temp_message = messages[name];
    for (let i = 0; i < green_line.green_line_id.length; i++) {
      if (temp_message.includes(green_line.green_line_id[i]["station"])) {
        //   console.log(temp_message);
        //   console.log(green_line.green_line_id[i]["station"]);
        name_station[name] = green_line.green_line_id[i]["station"];
      }
    }
  }

  // 查詢各人名與其所在站點，距離 current_station 的距離
  let name_arr = [];
  let distance_arr = [];
  let temp_station_id;
  let temp_distance;
  for (name in name_station) {
    //   console.log("現在是：" + name);
    name_arr.push(name);
    for (let i = 0; i < green_line.green_line_id.length; i++) {
      if (green_line.green_line_id[i]["station"] == name_station[name]) {
        temp_station_id = green_line.green_line_id[i]["id"];
        break;
      }
    }

    //   console.log("找到站點 ID：" + temp_station_id);

    for (let i = 0; i < green_line.green_line_distance.length; i++) {
      if (green_line.green_line_distance[i]["station"] == currentStation) {
        temp_distance =
          green_line.green_line_distance[i]["distance"][temp_station_id];
        distance_arr.push(temp_distance);
        break;
      }
    }

    // console.log(name + ":" + temp_distance);
  }

  // 開始找距離最近的
  let min_number_name = [name_arr[0]];
  let min_number = distance_arr[0];
  for (j = 1; j < name_arr.length; j++) {
    if (distance_arr[j] < min_number) {
      min_number = distance_arr[j];
      min_number_name.splice(0, min_number_name.length);
      min_number_name.push(name_arr[j]);
    } else if (distance_arr[j] == min_number) {
      min_number_name.push(name_arr[j]);
    } else {
      continue;
    }
  }

  min_number_name.forEach((element) => {
    console.log(element);
  });
}
const messages = {
  Bob: "I'm at Ximen MRT station.",
  Mary: "I have a drink near Jingmei MRT station.",
  Copper: "I just saw a concert at Taipei Arena.",
  Leslie: "I'm at home near Xiaobitan station.",
  Vivian: "I'm at Xindian station waiting for you.",
};
findAndPrint(messages, "Wanlong"); // print Mary
findAndPrint(messages, "Songshan"); // print Copper
findAndPrint(messages, "Qizhang"); // print Leslie
findAndPrint(messages, "Ximen"); // print Bob
findAndPrint(messages, "Xindian City Hall"); // print Vivian
// =====================================================================
// app 2
// your code here, maybe
function sortByPrice(consultants, criteria) {
  return consultants.sort((a, b) => {
    if (a[criteria] < b[criteria]) {
      return -1;
    } else if (a[criteria] > b[criteria]) {
      return 1;
    } else {
      return 0;
    }
  });
}

function sortByRate(consultants, criteria) {
  return consultants.sort((a, b) => {
    if (a[criteria] > b[criteria]) {
      return -1;
    } else if (a[criteria] < b[criteria]) {
      return 1;
    } else {
      return 0;
    }
  });
}

function book(consultants, hour, duration, criteria) {
  // your code here
  // your code here
  // console.log("開始");
  let cslt_dict_len = consultants.length;
  let cslt_dict_counter = 0;
  for (i = 0; i < cslt_dict_len; i++) {
    if (consultants[i]["name"] != undefined) {
      cslt_dict_counter += 1;
    } else {
      break;
    }
  }
  // console.log(cslt_dict_len);
  // console.log(cslt_dict_counter);
  // 第一次執行時啟動
  if (cslt_dict_len == cslt_dict_counter) {
    let consultants_price_rank = Object.assign([], consultants);
    let consultants_rate_rank = Object.assign([], consultants);
    sortByPrice(consultants_price_rank, "price");
    sortByRate(consultants_rate_rank, "rate");
    let cslt_r_r = [];
    let cslt_p_r = [];

    // 創排行
    for (i = 0; i < consultants_price_rank.length; i++) {
      cslt_r_r.push(consultants_rate_rank[i]["name"]);
      cslt_p_r.push(consultants_price_rank[i]["name"]);
    }

    // 設定顧問時間表
    name_id = {};
    for (i = 0; i < cslt_r_r.length; i++) {
      name_id[consultants[i]["name"]] = i + cslt_r_r.length;
      tmep_json = {};
      tmep_json[consultants[i]["name"]] = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      ];
      consultants.push(tmep_json);
    }

    consultants.push(cslt_r_r); // consultants 倒數第三項為 rate rank
    consultants.push(cslt_p_r); // consultants 倒數第二項為 price rank
    consultants.push(name_id); // consultants 最後一項為 consultant 的 schedule 的 index
  }

  let hour_end = hour + duration;
  let temp_consultant;

  if (criteria == "price") {
    let counter = 0;
    while (counter < consultants[consultants.length - 2].length) {
      temp_consultant = consultants[consultants.length - 2][counter];
      let temp_arr = consultants[
        consultants[consultants.length - 1][temp_consultant]
      ][temp_consultant].slice(hour, hour_end);

      let found = temp_arr.find((e) => e == 0);
      if (found == undefined) {
        for (j = hour; j < hour_end; j++) {
          consultants[consultants[consultants.length - 1][temp_consultant]][
            temp_consultant
          ][j] = 0;
        }
        break;
      } else {
        counter += 1;
      }
    }

    if (counter == consultants[consultants.length - 2].length) {
      console.log("No Service");
    } else {
      console.log(temp_consultant);
    }
  } else if (criteria == "rate") {
    let counter = 0;
    while (counter < consultants[consultants.length - 3].length) {
      temp_consultant = consultants[consultants.length - 3][counter];
      let temp_arr = consultants[
        consultants[consultants.length - 1][temp_consultant]
      ][temp_consultant].slice(hour, hour_end);

      let found = temp_arr.find((e) => e == 0);
      if (found == undefined) {
        for (j = hour; j < hour_end; j++) {
          consultants[consultants[consultants.length - 1][temp_consultant]][
            temp_consultant
          ][j] = 0;
        }
        break;
      } else {
        counter += 1;
      }
    }

    if (counter == consultants[consultants.length - 3].length) {
      console.log("No Service");
    } else {
      console.log(temp_consultant);
    }
  } else {
    console.log("criteria 輸入錯誤");
  }

  // console.log(consultants.length);
}
const consultants = [
  { name: "John", rate: 4.5, price: 1000 },
  { name: "Bob", rate: 3, price: 1200 },
  { name: "Jenny", rate: 3.8, price: 800 },
];
book(consultants, 15, 1, "price"); // Jenny
book(consultants, 11, 2, "price"); // Jenny
book(consultants, 10, 2, "price"); // John
book(consultants, 20, 2, "rate"); // John
book(consultants, 11, 1, "rate"); // Bob
book(consultants, 11, 2, "rate"); // No Service
book(consultants, 14, 3, "price"); // John
// =====================================================================
// app 3
function func(...data) {
  // your code here
  let middle_name_data = [];
  for (i = 0; i < data.length; i++) {
    if (data[i].length > 3) {
      middle_name_data.push(data[i][2]);
    } else {
      middle_name_data.push(data[i][1]);
    }
  }

  let temp_mid_name = Object.assign([], middle_name_data);
  //   console.log(middle_name_data);
  //   console.log(temp_mid_name);

  let counter = 0;
  let fasle_counter = 0;

  for (let i = 0; i < middle_name_data.length; i++) {
    temp_mid_name.splice(i, 1);
    if (temp_mid_name.includes(middle_name_data[i])) {
      temp_mid_name.splice(i, 0, middle_name_data[i]);
      fasle_counter += 1;
    } else {
      counter = i;
      break;
    }
  }

  if (fasle_counter == data.length) {
    console.log("沒有");
  } else {
    console.log(data[counter]);
  }
}
func("彭大牆", "陳王明雅", "吳明"); // print 彭大牆
func("郭靜雅", "王立強", "郭林靜宜", "郭立恆", "林花花"); // print 林花花
func("郭宣雅", "林靜宜", "郭宣恆", "林靜花"); // print 沒有
func("郭宣雅", "夏曼藍波安", "郭宣恆"); // print 夏曼藍波安
// =====================================================================
// app 4
function getNumber(index) {
  // your code here
  let ans = 0;
  for (i = 1; i < index + 1; i++) {
    if (i % 3 == 0) {
      ans -= 1;
    } else {
      ans += 4;
    }
  }

  console.log(ans);
}
getNumber(1); // print 4
getNumber(5); // print 15
getNumber(10); // print 25
getNumber(30); // print 70
