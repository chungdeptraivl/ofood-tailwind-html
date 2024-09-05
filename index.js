const images = [
  "./images/s1.png",
  "./images/s2.png",
  "./images/s3.png",
  "./images/s4.png",
];

const carouselTrack = document.querySelector(".carousel-track");
const dotsContainer = document.querySelector(".carousel .flex.items-center");
let currentIndex = 0;
let slideInterval;

images.forEach((imgSrc, index) => {
  const imgElement = document.createElement("img");
  imgElement.src = imgSrc;
  imgElement.alt = `Slide ${index + 1}`;
  imgElement.className =
    "rounded-[32px] aspect-[3.63] object-cover object-center w-full";
  carouselTrack.appendChild(imgElement);

  const dot = document.createElement("button");
  dot.className = "w-4 h-4 bg-white cursor-pointer rounded-full";
  dot.addEventListener("click", () => goToSlide(index));
  dotsContainer.appendChild(dot);
});

const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const dots = dotsContainer.querySelectorAll("button");

function updateSlidePosition() {
  const slideWidth = carouselTrack.children[0].clientWidth;
  carouselTrack.style.transform = `translateX(${-slideWidth * currentIndex}px)`;

  dots.forEach((dot) => dot.classList.remove("bg-black"));
  dots[currentIndex].classList.add("bg-black");
}

function goToSlide(index) {
  currentIndex = index;
  updateSlidePosition();
  resetSlideInterval();
}

function goToNextSlide() {
  currentIndex = (currentIndex + 1) % images.length;
  updateSlidePosition();
}

function goToPrevSlide() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateSlidePosition();
}

function startSlideInterval() {
  slideInterval = setInterval(goToNextSlide, 5000);
}

function resetSlideInterval() {
  clearInterval(slideInterval);
  startSlideInterval();
}

prevButton.addEventListener("click", goToPrevSlide);
nextButton.addEventListener("click", goToNextSlide);

updateSlidePosition();
startSlideInterval();
