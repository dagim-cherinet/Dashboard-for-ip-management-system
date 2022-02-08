const bars = [...document.querySelectorAll(".svg-bar")];
const toolBar = document.querySelector(".tool-bar");
const container = document.querySelector(".container");
bars.map((map) => {
  map.addEventListener("click", () => {
    console.log("button clicked");
    container.classList.toggle("hide");
  });
});
