document.querySelectorAll(".js-category-btn").forEach((button) => {
  button.addEventListener("click", function () {
    buttonMenu = document.querySelectorAll(".js-category-btn");
    buttonMenu.forEach((element) => {
      element.classList.remove("actif");
    });

    button.classList.add("actif");
  });
});
