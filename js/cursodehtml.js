let carouselImages = document.querySelectorAll(".carousel-image");
let currentIndex = 0;

setInterval(function() {
  carouselImages[currentIndex].style.display = "none";
  currentIndex = (currentIndex + 1) % carouselImages.length;
  carouselImages[currentIndex].style.display = "block";
}, 1000);

document.querySelectorAll(".botonesprincipal").forEach(function(element) {
  element.addEventListener("mouseenter", function() {
    this.style.boxShadow = "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)";
    this.style.transform = "translateY(-30px)";
  });
  element.addEventListener("mouseleave", function() {
    this.style.boxShadow = "none";
    this.style.transform = "none";
  });
});
