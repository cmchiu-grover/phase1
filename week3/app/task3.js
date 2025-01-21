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
