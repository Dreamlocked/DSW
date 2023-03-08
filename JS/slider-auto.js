document.addEventListener("DOMContentLoaded", function() {
  const carousel = document.querySelector("#carouselExampleIndicators");
  setInterval(function() {
    carousel.classList.add("carousel-item");
    carousel.classList.remove("carousel-ite");
  }, 2000);
});
