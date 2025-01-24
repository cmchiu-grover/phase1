// 暫時 comment 導覽列

// 讓整個網站的 Enter 鍵禁止使用
window.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
  }
});

// 防止 FORM 內部的 BUTTON 交出表單
let allButtons = document.querySelectorAll("button");
allButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

let menuList = document.getElementById("menuList");

function toggleMenu() {
  if ((menuList.style.display = "none")) {
    menuList.style.display = "block";
  } else {
    menuList.style.display = "none";
  }
}

function closeMenu() {
  if ((menuList.style.display = "block")) {
    menuList.style.display = "none";
  } else {
    menuList.style.display = "block";
  }
}

let fetchPromise = fetch(
  "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-1"
);

let getSpotList = async (url) => {
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    let JSON = await response.json();
    let spot_list = JSON.data.results;
    let figures = document.querySelectorAll("figure");
    let text_item = document.querySelectorAll("div.text");

    for (i = 0; i < figures.length && i < spot_list.length; i++) {
      const figure = figures[i];
      let img = "https://" + spot_list[i].filelist.split("https://")[1];
      figure.style.backgroundImage = `url(${img})`;
    }

    for (i = 0; i < text_item.length && i < spot_list.length; i++) {
      let div_text = text_item[i];
      let p_tag = document.createElement("p");
      let title = spot_list[i].stitle;
      p_tag.textContent = `${title}`;
      div_text.appendChild(p_tag);
    }
  } catch (e) {
    console.error("There was a problem with the fetch operation:", e);
  }
};

getSpotList(
  "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-1"
);

let moreSpotList = async (url, n) => {
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    let JSON = await response.json();
    let spot_list = JSON.data.results;
    let figures = document.querySelectorAll("figure");
    let text_item = document.querySelectorAll("div.text");

    for (let i = n; i < figures.length && i < spot_list.length; i++) {
      const figure = figures[i];
      let img = "https://" + spot_list[i].filelist.split("https://")[1];
      figure.style.backgroundImage = `url(${img})`;
    }

    for (let i = n; i < text_item.length && i < spot_list.length; i++) {
      let div_text = text_item[i];
      let p_tag = document.createElement("p");
      let title = spot_list[i].stitle;
      p_tag.textContent = `${title}`;
      div_text.appendChild(p_tag);
    }
  } catch (e) {
    console.error("There was a problem with the fetch operation:", e);
  }
};

// 監聽窗口大小變更
// window.addEventListener("resize", () => {
//   getSpotList(
//     "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-1"
//   );
// });

// 開始製作 button 功能
let moreButton = document.getElementById("loadMore");

moreButton.addEventListener("click", async function () {
  // 紀錄有多少 div.text
  let text_item = document.querySelectorAll("div.text");
  let n = text_item.length;
  console.log(`現在有 ${n} 個 div.text`);

  // 計算資料需要多少個 boxes
  let response = await fetch(
    "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-1"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  let JSON = await response.json();
  let spot_list = JSON.data.results;
  console.log(`長度為${spot_list.length}`);

  // 計算要創造幾個 boxes
  let m = 0;
  if (spot_list.length - n == 0) {
    // 如果沒有新資料，結束函數執行
    window.alert("資料已索取結束！");
    console.log("資料已索取結束！");
    return; // 直接結束函數執行
  } else if (spot_list.length - n > 10) {
    m += 10;
  } else {
    m = spot_list.length - n;
  }

  console.log(`m 的值為：${m}`);

  // 找到要添加的 article
  let article = document.querySelector("article");
  let new_bigbox_area = document.createElement("div");

  new_bigbox_area.className = "bigbox_area";

  // 創建新的 bigbox_area
  article.appendChild(new_bigbox_area);

  // 找出所有的 bigbox_area
  let bigbox_area = document.querySelectorAll(".bigbox_area");
  // 抓最後一個 bigbox_area
  let counter = bigbox_area.length - 1;

  if (m < 10) {
    let lastbigbox_area = bigbox_area[bigbox_area.length - 1]; // 獲取最後一個 div.container
    lastbigbox_area.id = "lastOne";
    lastbigbox_area.style.height = "200px"; // 設定高度為 200px
  }

  // 創建 m 個 div
  for (let i = 0; i < m; i++) {
    let newDiv;

    // 根據條件決定 div 的類型
    if (i === 0 || i === 5) {
      // 第 1 和第 6 個 div 使用 bigbox1 結構
      newDiv = document.createElement("div");
      newDiv.className = "bigbox1";

      // 創建 figure 元素
      const figure = document.createElement("figure");

      // 創建 star div 和加入 icon
      const starDiv = document.createElement("div");
      starDiv.className = "star";
      const starIcon = document.createElement("span");
      starIcon.className = "fa fa-star checked";
      starDiv.appendChild(starIcon); // 加入 star icon 到 starDiv

      // 創建 text div
      const textDiv = document.createElement("div");
      textDiv.className = "text";

      // 將 starDiv 和 textDiv 加入 figure
      figure.appendChild(starDiv);
      figure.appendChild(textDiv);

      // 將 figure 加入 newDiv
      newDiv.appendChild(figure);
    } else {
      // 其他 div 使用 bigbox 結構
      newDiv = document.createElement("div");
      newDiv.className = "bigbox";

      // 創建 figure 元素
      const figure = document.createElement("figure");

      // 創建 star div 和加入 icon
      const starDiv = document.createElement("div");
      starDiv.className = "star";
      const starIcon = document.createElement("span");
      starIcon.className = "fa fa-star checked";
      starDiv.appendChild(starIcon); // 加入 star icon 到 starDiv

      // 創建 text div
      const textDiv = document.createElement("div");
      textDiv.className = "text";

      // 將 starDiv 和 textDiv 加入 figure
      figure.appendChild(starDiv);
      figure.appendChild(textDiv);

      // 將 figure 加入 newDiv
      newDiv.appendChild(figure);
    }

    // 將新創建的 div 加入容器中
    bigbox_area[counter].appendChild(newDiv);
  }

  console.log(`將從第 ${n + 1} 個開始生成`);
  moreSpotList(
    "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-1",
    n
  );
});
