document.addEventListener("DOMContentLoaded", function () {
  const carouselContainer = document.querySelector(".carousel-container");
  const carouselSlides = document.querySelectorAll(".carousel-slide");
  const slideWidth = carouselSlides[0].offsetWidth;
  let currentIndex = 0;

  function goToSlide(index) {
    carouselContainer.style.transform = `translateX(-${slideWidth * index}px)`;
    currentIndex = index;
  }

  function goToNextSlide() {
    if (currentIndex === carouselSlides.length - 1) {
      goToSlide(0);
    } else {
      goToSlide(currentIndex + 1);
    }
  }

  setInterval(goToNextSlide, 3000);
});

document.addEventListener("DOMContentLoaded", function () {
  const carouselContainer = document.querySelector(".carousel-container-promo");
  const carouselSlides = document.querySelectorAll(".carousel-slide-promo");
  const slideWidth = carouselSlides[0].offsetWidth;
  let currentIndex = 0;

  function goToSlide(index) {
    carouselContainer.style.transform = `translateX(-${slideWidth * index}px)`;
    currentIndex = index;
  }

  function goToNextSlide() {
    if (currentIndex === carouselSlides.length - 1) {
      goToSlide(0);
    } else {
      goToSlide(currentIndex + 1);
    }
  }

  setInterval(goToNextSlide, 3000);
});
