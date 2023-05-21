(function () {
  const openBurger = document.querySelector(".burger");
  const overlay = document.querySelector(".overlay");
  const closeBnt = document.querySelector(".overlay__link");


  openBurger.addEventListener("click", e => {
    e.preventDefault();
    overlay.style.display = "flex";
  });

  closeBnt.addEventListener("click", e => {
    e.preventDefault();
    overlay.style.display = "none";
  })

  const body = document.body;

  if (body.style.width >= 747 + "px") {
    overlay.style.display = "none";
  }
})()