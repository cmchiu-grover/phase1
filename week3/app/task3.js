// 暫時 comment 導覽列

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
      var p_tag = document.createElement("p");
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

// 監聽窗口大小變更
// window.addEventListener("resize", () => {
//   getSpotList(
//     "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-1"
//   );
// });
