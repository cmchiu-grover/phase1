document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (event) {
      const checkbox = document.getElementById("agree");
      if (!checkbox.checked) {
        alert("請先勾選同意條款。");
        event.preventDefault();
      }
    });
  }
});

function numConfirm(event) {
  event.preventDefault();

  const numInput = document.getElementById("num");
  const numValue = numInput.value.trim();

  if (numValue === "" || isNaN(numValue) || parseInt(numValue) <= 0) {
    alert("請輸入正整數");
    event.preventDefault();
    return;
  }

  window.location.href = "/square/" + numValue;
}
