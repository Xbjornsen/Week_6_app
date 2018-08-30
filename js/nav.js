var toggle = document.getElementById("wrap");
var list = document.getElementById("list");

toggle.addEventListener("click", function() {
  list.classList.toggle("display");
});