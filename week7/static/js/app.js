window.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
  }
});

function fillContent(event) {
  event.preventDefault();

  const messageContent = document.getElementById("content");

  if (messageContent.value.trim() === "") {
    alert("請先輸入內容再送出...");
    return;
  }

  const form = document.querySelector(".content");

  if (form) {
    form.submit();
  } else {
    console.error("錯誤");
  }
}

function checkDelete(event) {
  let text = "是否刪除這則留言？";
  if (!confirm(text)) {
    event.preventDefault();
  }
}

async function searchMemberName() {
  let username = document.getElementById("inputUserName").value;

  url = "/api/member?username=" + username;

  let fetchPromise = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  let JSON = await fetchPromise.json();
  console.log("JSON is...");
  console.log(JSON);
  let text_div = document.getElementById("showUsername");
  if (!JSON.data) {
    console.log("name is...null");
    text_div.innerText = "無此會員";
  } else {
    let name = JSON.data.name;
    console.log("name is...");
    console.log(name);
    text_div.innerText = `${name}`;
  }
}

async function updateMemberName() {
  let new_name = document.getElementById("inputNewName").value;

  obj = { name: new_name };
  json_data = JSON.stringify(obj);

  const url = "/api/member";
  let text_div = document.getElementById("updatedMessage");
  try {
    await fetch(url, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json_data,
    });
    text_div.innerText = "更新成功";
    updateMemberPage();
  } catch (error) {
    text_div.innerText = "更新失敗";
  }
}

async function updateMemberPage() {
  try {
    let response = await fetch("/member", {
      method: "GET",
      credentials: "include",
    });
    let text = await response.text();

    let parser = new DOMParser();
    let new_member_html = parser.parseFromString(text, "text/html");

    let new_name = new_member_html.querySelector(".welcome_area p").innerText;
    document.querySelector(".welcome_area p").innerText = new_name;

    let new_messages_area =
      new_member_html.querySelector(".message_area").innerHTML;
    document.querySelector(".message_area").innerHTML = new_messages_area;
  } catch (error) {
    console.error(error);
  }
}
