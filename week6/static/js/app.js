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
  event.preventDefault();
  let text = "是否刪除這則留言？";
  if (confirm(text) == true) {
    return true;
  } else {
    event.preventDefault();
  }
}
