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
