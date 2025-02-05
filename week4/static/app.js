document.addEventListener("DOMContentLoaded", function () {
  const signinForm = document.querySelector("#signin");
  if (signinForm) {
    signinForm.addEventListener("submit", function (event) {
      const checkbox = document.getElementById("agree");
      if (!checkbox.checked) {
        alert("請先勾選同意條款。");
        event.preventDefault();
      }
    });
  }

  const squareForm = document.querySelector("#square");
  if (squareForm) {
    squareForm.addEventListener("submit", function (event) {
      const numInput = document.getElementById("num");
      const numValue = numInput.value.trim();

      if (!/^[1-9]\d*$/.test(numValue)) {
        alert("請輸入正整數！");
        event.preventDefault();
      } else {
        event.preventDefault();
        window.location.href = `/square/${numValue}`;
      }
    });
  }
});
